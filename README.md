# skills

**Skills de design pour Claude Code** : voir [`skills/`](skills/) (22 skills : Emil Kowalski, Impeccable, Taste Skill), avec leur origine et leurs licences dans [`skills/README.md`](skills/README.md).
Pour les utiliser dans un projet : copier les dossiers voulus dans `.claude/skills/` du projet, ou dans `~/.claude/skills/` pour tous les projets.

---

## Gabarit de site vitrine (Next.js)

Gabarit de site vitrine réutilisable (Next.js, export statique), pour des entreprises de tous secteurs.
Le contenu livré est une **démonstration** : « Atelier Vercane », un atelier de ferronnerie fictif à Lyon.

## Lancer le site

```bash
npm install
```

```bash
npm run dev
```

Ouvre http://localhost:3000. Pour produire le site final (dossier `out/`, à déposer chez n'importe quel hébergeur statique) :

```bash
npm run build
```

## Adapter à un client

Tout le contenu est dans **`content/site.ts`** : nom, couleurs, polices, textes, photos, liens, formulaire.
Les composants (`components/sections.tsx`) ne contiennent aucun texte propre au client.

1. **Identité** : `brand` (nom, initiale du logo ou chemin d'un logo SVG), `meta` (titre, description, domaine).
2. **Apparence** : `theme` (couleurs, polices Google Fonts, coins, style des boutons). Pas de violet.
3. **Textes** : `hero`, `services`, `statement`, `workshop`, `quote`, `footer`.
4. **Photos** : déposer les fichiers dans `public/assets/img/`, puis mettre à jour `src`, `width`, `height`, `alt`
   et `source: 'client'`. Une photo n'est utilisée qu'une seule fois sur la page.
5. **Formulaire** : renseigner `quote.endpoint` avec l'adresse d'un service de formulaire (Formspree, Basin...).
   Sans adresse, le bouton ouvre la messagerie vers `quote.mailto`.
6. **Crédits** : quand toutes les photos sont celles du client, vider `footer.credits.list` (la ligne et la page `/credits` disparaissent).
7. Remplacer `public/favicon.svg` et `public/share.jpg` (image de partage, 1440x900, capture du premier écran).

À ne pas inventer : avis, clients, chiffres, récompenses. L'adresse se limite à la rue et au quartier (sans numéro ni code postal).

## À remplacer avant une vraie mise en ligne

- Les 4 photos (forge, enclume) sont des photos libres de Wikimedia Commons qui tiennent la place de celles du client.
- L'adresse e-mail `atelier@vercane.example` est provisoire.
- `meta.canonical` : domaine du client.

## Comment c'est construit

- **Design** : skills `design-taste-frontend`, `impeccable` et `emil-design-eng` dans [`skills/`](skills/) (à copier dans `.claude/skills/` pour les activer).
  `PRODUCT.md` décrit le produit pour ces skills.
- **Kit** : `public/assets/` contient le système (grille, typographie, boutons, animations) copié depuis
  `design-taste-frontend`. Ne pas modifier ces fichiers ; le CSS propre au site est dans `public/assets/site.css`.
- **Scripts du kit** chargés après l'hydratation de React (`strategy="afterInteractive"` dans `app/layout.tsx`),
  sinon React efface les modifications qu'ils apportent à la page (menu mobile, animations).
- **Contrôle** : vérifié par le contrôle final du skill (`GATE: PASS`), la vérification de mise en page à 1440, 1024, 820, 768 et 390 px, et le contrôle de performance.
