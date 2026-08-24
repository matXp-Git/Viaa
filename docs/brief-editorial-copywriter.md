# Format des articles éditoriaux — Brief Copywriter

Document de référence à transmettre à un rédacteur externe pour produire des articles compatibles avec l'espace éditorial du site — sans intervention développeur.

- **Destinataire** — Copywriter
- **Format de livraison** — Markdown (`.md`)
- **Longueur cible** — 900–1400 mots

---

## 01 — Le principe

Chaque article est un unique fichier texte. Pas de back-office, pas de mise en page à faire : le gabarit du site s'applique automatiquement dès que le fichier respecte la structure ci-dessous.

Le fichier commence par un bloc d'informations (le **frontmatter**, entre deux lignes `---`) puis le texte de l'article en **Markdown** — une syntaxe texte très simple : `##` pour un titre, `**mot**` pour du gras, `>` pour une citation. Rien de plus technique n'est demandé au rédacteur.

> Un exemple complet et déjà publié fait référence : *« Déchets diffus : pourquoi ils échappent aux dispositifs de propreté classiques »* (`src/content/editorial/dechets-diffus-dernier-kilometre.md`). En cas de doute sur un point de structure, ce fichier prime sur toute reformulation de ce brief.

---

## 02 — Les champs (frontmatter)

Chaque champ ci-dessous doit apparaître dans le bloc d'en-tête du fichier, dans cet ordre, avec ces noms exacts.

| Champ | Requis | Description | Exemple |
|---|---|---|---|
| `title` | Oui | Titre de l'article. Devient le H1 de la page. | Déchets diffus : pourquoi ils… |
| `excerpt` | Oui | Chapo, 1–2 phrases. Affiché sur la page listing et en secours si `metaDescription` absente. | Bretelles, ronds-points… |
| `coverImage` | Oui | Chemin du visuel principal (voir section Visuels). | `./cover.jpg` |
| `coverImageAlt` | Oui | Texte alternatif de l'image (accessibilité + SEO image). | Opérateur Viia Pick en intervention de nuit |
| `secondaryImage` | Non | Visuel secondaire, inséré en fin d'article. | `./equipe.jpg` |
| `secondaryImageAlt` | Si `secondaryImage` | Alt du visuel secondaire. | Équipe en briefing |
| `date` | Oui | Date de publication, format ISO. | 2026-09-15 |
| `category` | Oui | Une seule catégorie (liste fermée — voir ci-dessous). | Environnement |
| `author` | Non | Par défaut « Viia ». À ne modifier que sur consigne. | Viia |
| `metaTitle` | Non | Titre SEO si différent du `title` affiché. 50–60 caractères. | — |
| `metaDescription` | Oui | 150–160 caractères. Ce que Google affiche sous le lien. | — |
| `keywords` | Non | 3–6 expressions de thématisation interne (pas la balise meta obsolète). | `["déchets diffus", "collecte fine"]` |
| `canonicalUrl` | Non | Uniquement si l'article est republié depuis / vers une autre URL. | — |
| `draft` | Non | `true` pour masquer l'article tant qu'il n'est pas validé. | true |

### Catégories disponibles

Utiliser exclusivement l'une de ces valeurs (cohérence du filtrage à venir) : **Environnement**, **Réglementation**, **Terrain**, **Collectivités**, **Acteurs privés**. Besoin d'une nouvelle catégorie → nous consulter avant livraison.

---

## 03 — Gabarit à copier

À dupliquer tel quel pour chaque nouvel article, puis à compléter.

```md
---
title: "Titre de l'article"
excerpt: "Une à deux phrases de résumé, percutantes, qui donnent envie de lire la suite."
coverImage: ./nom-du-fichier.jpg
coverImageAlt: "Description factuelle de l'image"
secondaryImage: ./nom-du-second-fichier.jpg
secondaryImageAlt: "Description factuelle de l'image"
date: 2026-01-01
category: "Environnement"
metaDescription: "150 à 160 caractères qui résument l'article pour Google."
keywords: ["mot-clé 1", "mot-clé 2", "mot-clé 3"]
draft: true
---

## Premier titre de section

Texte du premier paragraphe…
```

---

## 04 — Corps de l'article

Tout ce qui suit le second `---` est le texte, en Markdown.

### Structure

- **3 à 5 intertitres `##`** — chacun introduit une idée complète, formulable seule (pertinent pour le SEO comme pour être cité par une IA).
- Des **`###`** en sous-niveau si une section a besoin d'être découpée davantage — jamais plus de deux niveaux.
- **1 citation maximum** par article (`> ` en début de ligne), réservée à une phrase de synthèse forte.
- Listes à puces autorisées pour énumérer (jamais pour remplacer un paragraphe argumenté).
- **Gras** (`**mot**`) sur 2–3 expressions clés par article maximum — pas plus, sous peine de perdre son effet.

### Longueur

**900 à 1400 mots**, hors frontmatter. En dessous, l'article est trop mince pour le SEO ; au-dessus, il dilue le sujet — mieux vaut le couper en deux articles liés.

### Ouverture

Le premier paragraphe doit répondre à la question du titre **en une ou deux phrases**, avant tout développement — c'est ce paragraphe qu'un moteur de recherche ou une IA générative reprend en premier.

---

## 05 — Visuels

Deux images par article : une de couverture (obligatoire), une secondaire (facultative, insérée en fin d'article).

**Image de couverture**
- Ratio — 4:5 (portrait)
- Dimensions min. — 1600 × 2000 px
- Format — JPG ou PNG
- Poids max. — 3 Mo

**Image secondaire**
- Ratio — 3:2 (paysage)
- Dimensions min. — 1600 × 1067 px
- Format — JPG ou PNG
- Poids max. — 3 Mo

### Contenu des visuels

Terrain réel ou mise en situation crédible — opérateurs, équipement, zones d'intervention. Pas de banque d'images génériques, pas de photo studio. Ambiance cohérente avec le reste du site : lumière naturelle, souvent en fin de journée ou de nuit.

---

## 06 — Ton & voix

La marque parle par les faits, jamais par l'auto-qualification.

**À privilégier**
- Mesurable, documenté, concret
- Terrain, précis, adapté
- Des faits et des chiffres plutôt que des adjectifs
- Phrases courtes, voix active

**À éviter**
- « Leader », « expert reconnu », « acteur majeur »
- « Solution innovante », « révolutionner »
- « Zéro émission / zéro nuisance » sans donnée vérifiable
- Toute affirmation invérifiable sur la marque

> Règle éditoriale : ne pas dire que Viia est performante — montrer les données. Ne pas dire que Viia est engagée — décrire ce qui est fait.

---

## 07 — SEO / GEO

Optimisé à la fois pour le référencement classique (Google) et pour être cité par les moteurs génératifs (ChatGPT, Perplexity, AI Overviews).

1. **Un sujet, une intention de recherche.** Chaque article répond à une seule question — pas un tour d'horizon fourre-tout.
2. **Le mot-clé principal dans le titre et le premier paragraphe.** Naturellement, jamais forcé.
3. **Chaque intertitre formulable seul.** Un moteur IA cite des passages isolés, hors contexte — chaque section doit se suffire.
4. **Des chiffres et faits vérifiables.** C'est ce qui rend un contenu citable plutôt que paraphrasable.
5. **`metaDescription` unique et écrite pour donner envie de cliquer.** 150–160 caractères, pas un simple copié du chapo.
6. **Pas de duplication entre articles.** Deux articles ne doivent jamais cibler le même mot-clé principal.

---

## 08 — Livraison

Un fichier `.md` par article, nommé en minuscules avec tirets, sans accents.

- **Nom de fichier** — `mots-cles-du-titre.md` (ex : `dechets-diffus-dernier-kilometre.md`)
- **Encodage** — UTF-8, apostrophes typographiques (’) acceptées et même préférées
- **Images** — livrées à part, nommées à l'identique du chemin renseigné dans `coverImage` / `secondaryImage`
- **Statut par défaut** — `draft: true` ; on repasse à `false` après relecture interne

---

*Viia — Brief éditorial technique — à jour du gabarit espace éditorial en production*
