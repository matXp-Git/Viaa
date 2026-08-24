import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const CONTACT_DESTINATION = 'fabien.deschamps@yahoo.es'; // TEST — limite Resend (domaine non vérifié) : cible fabien@matxup.com une fois un domaine vérifié sur resend.com/domains
const SEND_FROM = 'Viia Pick <onboarding@resend.dev>'; // à remplacer par un domaine vérifié avant mise en ligne

const PROFILE_LABELS: Record<string, string> = {
  collectivite: 'Une collectivité',
  prive: 'Un acteur privé',
  autre: 'Autre',
};

async function verifyTurnstile(token: string | undefined, remoteIp: string | null) {
  const secretKey = import.meta.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) return false;
  if (!token) return false;

  const body = new URLSearchParams({ secret: secretKey, response: token });
  if (remoteIp) body.set('remoteip', remoteIp);

  const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });
  const outcome = await verifyRes.json();
  return outcome.success === true;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Service d'envoi non configuré." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await request.formData();

  // Honeypot : ce champ est invisible pour un humain, seul un bot le remplit.
  if (data.get('company')?.toString().trim()) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const turnstileToken = data.get('cf-turnstile-response')?.toString();
  let remoteIp: string | null = null;
  try {
    remoteIp = clientAddress;
  } catch {
    remoteIp = null;
  }

  const humanVerified = await verifyTurnstile(turnstileToken, remoteIp);
  if (!humanVerified) {
    return new Response(JSON.stringify({ error: 'Vérification anti-robot échouée.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const name = data.get('name')?.toString().trim();
  const email = data.get('email')?.toString().trim();
  const profile = data.get('profile')?.toString() ?? 'autre';
  const message = data.get('message')?.toString().trim();

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Champs manquants.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: SEND_FROM,
    to: CONTACT_DESTINATION,
    replyTo: email,
    subject: `Nouveau contact — ${PROFILE_LABELS[profile] ?? 'Autre'} — ${name}`,
    text: `Nom : ${name}\nEmail : ${email}\nProfil : ${PROFILE_LABELS[profile] ?? 'Autre'}\n\nMessage :\n${message}`,
  });

  if (error) {
    console.error('Resend error:', error);
    return new Response(JSON.stringify({ error: "Échec de l'envoi." }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
