/**
 * LE SEUL FICHIER À MODIFIER POUR UN NOUVEAU CLIENT.
 *
 * Tout ce qui s'affiche sur le site vient d'ici : nom, couleurs, polices, textes, photos, liens.
 * Les composants (dossier components/) ne contiennent aucun texte propre au client.
 *
 * Le contenu ci-dessous est une DÉMONSTRATION : « Atelier Vercane » est un nom inventé, et
 * les photos sont des images libres de droits (Wikimedia Commons) qui tiennent la place de
 * celles du client. Remplacez tout avant la mise en ligne. Voir README.md, « Adapter à un client ».
 */

export type Photo = {
  src: string;
  /** Plusieurs tailles du même fichier, pour les écrans haute définition (facultatif). */
  srcSet?: string;
  width: number;
  height: number;
  /** Ce que montre la photo, en une phrase (lu par les lecteurs d'écran). */
  alt: string;
  /** Cadrage dans le cadre : "50% 50%" = centré. */
  position?: string;
  /** Provenance : "client" pour les photos du client, "library-057" ou "stand-in" pour une photo provisoire. */
  source: string;
  subject: string;
};

export type Link = { label: string; href: string };

export const site = {
  /* ------------------------------------------------------------------ Identité */
  brand: {
    name: 'Atelier Vercane',
    /** Lettre affichée dans le carré du logo tant que le client n'a pas de logo SVG. */
    initial: 'V',
    /** Chemin d'un logo SVG dans public/ (ex. "/assets/logo.svg"). Vide = carré + nom. */
    logo: '',
    year: 2026,
  },

  /** Langue du site (attribut lang) et méta-données de partage. */
  meta: {
    lang: 'fr',
    title: 'Atelier Vercane : ferronnerie d’art sur mesure à Lyon',
    description:
      'Garde-corps, portails, escaliers et mobilier en acier, dessinés sur place puis forgés et posés par un atelier de la Croix-Rousse.',
    /** Domaine définitif du client, pour la balise canonical. Vide tant qu'il n'est pas connu. */
    canonical: '',
    shareImage: '/share.jpg',
  },

  /* ------------------------------------------------------------------ Apparence */
  theme: {
    /** Couleurs : fond, surface, texte, gris, accent (bouton principal, liens, focus). */
    bg: '#ffffff',
    surface: '#f2f2f2',
    ink: '#0a0a0a',
    muted: '#6b6b6b',
    accent: '#d92b21',
    accentInk: '#ffffff',
    /** Bande sombre (une section en milieu de page). */
    invBg: '#000000',
    invSurface: '#010101',
    invInk: '#ffffff',
    invMuted: '#868686',
    /** Polices Google Fonts : titre et texte. */
    fontsHref:
      'https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400..700&family=Red+Hat+Text:wght@400..600&display=swap',
    fontDisplay: '"Red Hat Display", system-ui, sans-serif',
    fontText: '"Red Hat Text", system-ui, sans-serif',
    displayTracking: '-0.025em',
    displayTrackingXl: '-0.035em',
    /** Coins : "sharp" (4/6/8), "soft" (8/12/20), "round" (10/16/24). */
    radius: 'soft',
    /** Style des boutons : "solid", "tonal", "block", "arrow", "pill". */
    buttons: 'solid',
  },

  /* ------------------------------------------------------------------ Action principale */
  /** Le même libellé partout : barre de navigation, héros, formulaire, bas de page. */
  primaryAction: { label: 'Demander un devis', href: '#devis' },

  /* ------------------------------------------------------------------ Navigation */
  nav: {
    /** Le premier lien ouvre un panneau au survol, avec les colonnes ci-dessous. */
    links: [
      { label: 'Prestations', href: '#prestations' },
      { label: 'Méthode', href: '#methode' },
      { label: 'Atelier', href: '#atelier' },
      { label: 'Contact', href: '#contact' },
    ] as Link[],
    menu: [
      {
        group: 'Fabrication',
        items: [{ label: 'Prestations', href: '#prestations', hint: 'Garde-corps, portails, escaliers' }],
      },
      {
        group: 'Projet',
        items: [
          { label: 'Méthode', href: '#methode', hint: 'De la visite à la pose' },
          { label: 'Atelier', href: '#atelier', hint: 'Forge et finition à Lyon' },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ Héros (premier écran) */
  hero: {
    /** Le titre nomme le métier et le lieu, en 2 à 8 mots. */
    title: 'Ferronnerie d’art sur mesure à Lyon',
    lead:
      'Garde-corps, portails, escaliers et mobilier en acier, dessinés chez vous puis forgés et posés par notre atelier de la Croix-Rousse, dans le 4e arrondissement.',
    secondaryAction: { label: 'Voir les prestations', href: '#prestations' } as Link,
    photo: {
      src: '/assets/img/photo-m19113721-1800.webp',
      srcSet:
        '/assets/img/photo-m19113721-1200.webp 1200w, /assets/img/photo-m19113721-1800.webp 1800w, /assets/img/photo-m19113721-2400.webp 2400w',
      width: 1800,
      height: 1200,
      alt: 'Un forgeron tient à la pince une barre d’acier rougie sur l’enclume et lève le marteau',
      position: '64% 50%',
      source: 'library-057',
      subject: 'hands',
    } as Photo,
  },

  /* ------------------------------------------------------------------ Prestations */
  services: {
    id: 'prestations',
    title: 'Nos prestations.',
    titleMuted: 'Chaque pièce est dessinée pour son lieu.',
    items: [
      { name: 'Garde-corps et rampes', line: 'Pour un escalier, une mezzanine ou un balcon, en acier brut, ciré ou peint.' },
      { name: 'Portails et grilles', line: 'Battants ou coulissants, avec ou sans motorisation.' },
      { name: 'Escaliers', line: 'Droits, en quart tournant ou hélicoïdaux, marches en bois ou en acier.' },
      { name: 'Mobilier', line: 'Tables, étagères et piètements aux mesures de la pièce.' },
    ],
    /** Affiché à droite de chaque ligne. Mettez un prix (« dès 950 € ») si le client en donne. */
    priceLabel: 'Sur devis',
    photo: {
      src: '/assets/img/photo-m19113729-1200.webp',
      width: 1200,
      height: 1791,
      alt: 'Deux avant-bras abattent le marteau sur une barre incandescente tenue à la pince',
      position: '50% 62%',
      source: 'library-057',
      subject: 'hands',
    } as Photo,
  },

  /* ------------------------------------------------------------------ Phrase forte (animée au défilement) */
  statement: {
    id: 'methode',
    label: 'Méthode',
    /** 12 à 40 mots. Le passage entre ** ** passe en couleur d'accent. */
    text:
      'Chaque projet commence par une visite et un dessin à l’échelle. Rien ne part à la forge avant votre accord, et c’est **la même équipe** qui fabrique puis pose la pièce.',
  },

  /* ------------------------------------------------------------------ Atelier (bande sombre, deux photos) */
  workshop: {
    id: 'atelier',
    title: 'L’atelier de la Croix-Rousse.',
    titleMuted: 'Forge, découpe et finition sous le même toit.',
    line: 'Les pièces sont mises en forme à chaud, assemblées puis traitées contre la rouille avant de quitter l’atelier.',
    photos: [
      {
        src: '/assets/img/photo-m94781083-1200.webp',
        width: 1200,
        height: 1791,
        alt: 'Une main tient la pince au-dessus d’un rivet tout juste forgé sur la table de l’enclume',
        position: '50% 45%',
        source: 'library-057',
        subject: 'hands',
      },
      {
        src: '/assets/img/photo-m130857602-1200.webp',
        width: 1200,
        height: 902,
        alt: 'Une enclume cerclée d’une chaîne sur un billot de chêne, marteaux et pinces rangés au mur',
        position: '55% 50%',
        source: 'library-057',
        subject: 'detail',
      },
    ] as Photo[],
  },

  /* ------------------------------------------------------------------ Formulaire de devis */
  quote: {
    id: 'devis',
    title: 'Demande de devis',
    line: 'Décrivez la pièce, le lieu et les mesures si vous les avez. Nous revenons vers vous pour fixer une visite.',
    /** Ce qui se passe après l'envoi, dans l'ordre. */
    /** Schéma des étapes (fixe). `label` en 1 à 3 mots, `sub` en quelques mots. */
    steps: [
      { label: 'Visite', sub: 'Relevé des mesures' },
      { label: 'Dessin', sub: 'Prix ferme' },
      { label: 'Fabrication', sub: 'À l’atelier' },
      { label: 'Pose', sub: 'Même équipe' },
    ],
    stepsAlt: 'Les quatre étapes d’un projet : visite et relevé, dessin et prix ferme, fabrication à l’atelier, pose par la même équipe.',
    /**
     * Adresse du service de formulaire du client (Formspree, Basin, Getform...).
     * Vide = le formulaire ouvre la messagerie vers `mailto` (adresse provisoire en .example).
     */
    endpoint: '',
    mailto: 'atelier@vercane.example',
    sentMessage: 'Votre demande de devis est envoyée. Nous vous répondons par e-mail.',
    replyLine: 'Nous vous répondons par e-mail.',
    fields: [
      { id: 'name', label: 'Nom', type: 'text', autocomplete: 'name', error: 'Écrivez votre nom.' },
      { id: 'email', label: 'E-mail', type: 'email', autocomplete: 'email', error: 'Écrivez une adresse e-mail avec un @, comme nom@exemple.fr.' },
      { id: 'city', label: 'Ville du chantier', type: 'text', autocomplete: 'address-level2', error: 'Écrivez la ville où la pièce sera posée.' },
      { id: 'project', label: 'Votre projet', type: 'text', autocomplete: 'off', error: 'Décrivez la pièce en quelques mots.' },
    ],
  },

  /* ------------------------------------------------------------------ Bas de page */
  footer: {
    closeTitle: 'Votre projet en acier',
    closeLine: 'Une visite, un dessin, puis un prix ferme avant toute fabrication.',
    /** Rue et quartier seulement : pas de numéro ni de code postal. */
    address: 'Croix-Rousse, Lyon',
    /** Lien OpenStreetMap. « Voir le quartier » sans rue, « Itinéraire » avec une rue. */
    mapLabel: 'Voir le quartier',
    mapHref: 'https://www.openstreetmap.org/search?query=Croix-Rousse%20Lyon',
    hoursTitle: 'Horaires',
    hours: [
      { day: 'Visites et atelier', value: 'Sur rendez-vous' },
      { day: 'Zone d’intervention', value: 'Métropole de Lyon' },
    ],
    lede: 'Ferronnerie d’art sur mesure à Lyon.',
    /** Crédits des photos provisoires (une ligne en bas de page + la page /credits). Videz `list` quand toutes les photos sont celles du client. */
    credits: {
      label: 'Photos via Wikimedia Commons',
      title: 'Crédits photo',
      list: [
        { author: 'Jorge Royan', file: 'https://commons.wikimedia.org/wiki/File:Vintage_smith%27s_workshop_-_0169.jpg', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/' },
        { author: 'Jorge Royan', file: 'https://commons.wikimedia.org/wiki/File:Vintage_smith%27s_workshop_-_0180.jpg', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/' },
        { author: 'Kritzolina', file: 'https://commons.wikimedia.org/wiki/File:Newly_made_nail_01.jpg', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' },
        { author: 'Kleseus', file: 'https://commons.wikimedia.org/wiki/File:Anvil,_northern_German_type_with_upsetting_block.jpg', license: 'CC0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' },
      ],
    },
  },
};

export type Site = typeof site;
