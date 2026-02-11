# Nihongo - WaniKani pour les Francophones

Un systeme de repetition espacee (SRS) pour les francophones qui apprennent les kanji et le vocabulaire japonais.

## Fonctionnalites

- Apprentissage des radicaux, kanji et vocabulaire
- Mnemoniques en francais pour faciliter la memorisation
- Systeme SRS (Spaced Repetition System) pour optimiser l'apprentissage
- Progression par niveaux
- Statistiques de progression detaillees
- Audio pour les lectures japonaises

## Demarrage rapide

### Prerequis

- Node.js 18+
- PostgreSQL (local ou Supabase)

### Installation

1. Clonez le depot et installez les dependances :

```bash
git clone <repo-url>
cd nihongo
npm install
```

2. Configurez les variables d'environnement :

```bash
cp .env.example .env
```

Editez `.env` avec vos parametres :
- `DATABASE_URL` - URL de connexion PostgreSQL
- `AUTH_SECRET` - Cle secrete pour NextAuth (generez avec `openssl rand -base64 32`)

3. Initialisez la base de donnees :

```bash
npm run db:push
npm run db:seed
```

4. Lancez le serveur de developpement :

```bash
npm run dev
```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Scripts disponibles

```bash
npm run dev          # Serveur de developpement
npm run build        # Build de production
npm run start        # Demarrer en production
npm run db:push      # Appliquer le schema Prisma
npm run db:seed      # Peupler la base de donnees
npm run db:studio    # Interface Prisma Studio
```

## Deploiement

### Vercel

1. Connectez votre depot a Vercel
2. Ajoutez les variables d'environnement dans les parametres Vercel
3. Deployez !

### Base de donnees avec Supabase

1. Creez un projet sur [Supabase](https://supabase.com)
2. Copiez l'URL de connexion PostgreSQL
3. Ajoutez-la comme `DATABASE_URL` dans vos variables d'environnement

## Structure du projet

```
nihongo/
├── src/
│   ├── app/           # Pages et routes API (Next.js App Router)
│   ├── components/    # Composants React
│   ├── lib/           # Utilitaires (auth, db, srs)
│   └── types/         # Types TypeScript
├── prisma/
│   ├── schema.prisma  # Schema de base de donnees
│   └── seed.ts        # Donnees initiales
└── public/            # Fichiers statiques
```

## Systeme SRS

Le systeme de repetition espacee utilise 10 etapes :

| Etape | Nom | Intervalle |
|-------|-----|------------|
| 0 | Verrouille | - |
| 1 | Apprenti 1 | 4 heures |
| 2 | Apprenti 2 | 8 heures |
| 3 | Apprenti 3 | 1 jour |
| 4 | Apprenti 4 | 2 jours |
| 5 | Guru 1 | 1 semaine |
| 6 | Guru 2 | 2 semaines |
| 7 | Maitre | 1 mois |
| 8 | Illumine | 4 mois |
| 9 | Brule | Complete |

## Licence

MIT
