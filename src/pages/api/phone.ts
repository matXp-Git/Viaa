import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  const phone = import.meta.env.CONTACT_PHONE;

  if (!phone) {
    return new Response(JSON.stringify({ error: 'Numéro non configuré.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ phone }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
