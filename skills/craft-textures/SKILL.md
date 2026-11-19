---
name: craft-textures
description: Crée des textures et motifs artisanaux en code (SVG, canvas, CSS) - imprimés et motifs répétés sans raccord visible, rendu broderie (points, fils, satin, remplissage), rendu gravure (hachures, taille-douce, pointillé, à partir d'une photo ou d'un dessin), grain de matière (papier, lin, cuir, toile). Prépare aussi des fichiers propres pour la fabrication - impression textile, machine à broder, découpe et gravure laser. À utiliser dès qu'on demande une texture, un imprimé, un motif répété, un effet brodé, cousu, gravé, estampé, tissé, ou un fichier pour brodeuse ou laser. Triggers - texture, seamless pattern, print, textile, embroidery, stitch, engraving, etching, hatching, laser, broderie, gravure, imprimé, motif.
---

# Textures artisanales : imprimés, broderie, gravure

Ce skill fait deux choses différentes, et il faut savoir laquelle avant d'écrire une ligne :

| Cible | Ce qui compte | Livrable |
|---|---|---|
| **Écran** (site, hero, illustration) | L'illusion de la matière, la performance | SVG, canvas, CSS, ou image pré-rendue |
| **Fabrication** (tissu, brodeuse, laser) | Les contraintes physiques de la machine | SVG vectoriel propre, en mm, prêt pour le logiciel du métier |

Un rendu « brodé » pour l'écran n'est pas un fichier de broderie, et un fichier laser n'est pas joli à l'écran. Si la demande ne dit pas la cible, la déduire du contexte (un site → écran) ; poser la question seulement si un fichier de fabrication est en jeu.

## Démarche

1. **Cible** : écran ou fabrication. Pour la fabrication, demander la machine ou le procédé, la taille finale en mm et la matière.
2. **Technique** : choisir une seule technique dominante (imprimé, broderie, gravure, grain). Les mélanges se font par couches, jamais dans le même tracé.
3. **Palette** : la fixer avant le motif. Peu de couleurs, nommées, car chaque couleur est un fil, un écran d'impression ou une passe.
4. **Construire** en vectoriel ou procédural, avec une graine aléatoire fixe pour pouvoir régénérer le même résultat.
5. **Vérifier** avec la liste de contrôle en fin de document.

Pour les algorithmes génératifs (bruit, champs de flux, Voronoï), s'appuyer sur `algorithmic-art` ou `genart-ops` s'ils sont installés. Pour animer une texture, voir `animate` et `animation-performance`.

## Imprimés et motifs répétés

La règle unique du raccord : **tout élément qui dépasse un bord de la tuile doit être redessiné, identique, décalé d'une tuile de l'autre côté.** Un élément qui touche un coin apparaît donc quatre fois.

```js
// Tuile SVG sans raccord. `motifs` : [{x, y, r}] dans une tuile de côté `size`.
function seamlessTile(motifs, size, draw) {
  let out = '';
  for (const m of motifs) {
    for (const dx of [-size, 0, size]) {
      for (const dy of [-size, 0, size]) {
        const x = m.x + dx, y = m.y + dy;
        // ne garder que les copies qui touchent réellement la tuile
        if (x + m.r < 0 || x - m.r > size || y + m.r < 0 || y - m.r > size) continue;
        out += draw({ ...m, x, y });
      }
    }
  }
  return out;
}
```

Utilisation dans un `<pattern patternUnits="userSpaceOnUse" width="size" height="size">`.

Types de répétition, du plus mécanique au plus naturel :

- **Droit** (grille) : lisible, géométrique. La grille se voit vite.
- **Demi-saut** (half-drop) : une colonne sur deux descend d'une demi-tuile. Le standard du textile, il casse les alignements. En SVG : tuile de largeur `2 × w`, le motif de droite décalé de `h / 2`.
- **Brique** : même idée, décalage horizontal une ligne sur deux.
- **Miroir** : effet kaléidoscope, à réserver aux ornements.

Pour qu'un imprimé ne paraisse pas « tamponné » : varier taille et rotation des motifs dans la tuile, répartir les masses pour qu'aucune ligne vide ou zone dense ne traverse la tuile, et faire une tuile assez grande pour que la répétition ne se lise pas au premier regard.

**Pour l'impression** : dimensions de la tuile en cm réels, 150 à 300 dpi à taille finale si l'image est en pixels, couleurs en aplats séparés (une couleur = un écran en sérigraphie, donc en limiter le nombre), et un fichier de la tuile seule plus un aperçu en 3 × 3.

## Broderie

### Vocabulaire des points

- **Point droit** (running stitch) : une ligne de petits segments. Contours, détails fins.
- **Point de bourdon** (satin) : des fils parallèles serrés, perpendiculaires à la direction de la forme. Lettres, bordures, tiges. Brillant, car les fils sont longs.
- **Point de remplissage** (tatami, fill) : rangées de points courts décalés en quinconce, selon un angle. Grandes surfaces. Mat.

### Rendu à l'écran

Ce qui crée l'illusion, par ordre d'importance :

1. **Chaque point est un trait court à bouts ronds**, jamais un aplat. Un bourdon se dessine fil par fil.
2. **La direction des fils suit la forme** et change d'une zone à l'autre. Deux zones voisines de même couleur mais d'angles différents se distinguent par la lumière : c'est la signature de la broderie.
3. **Légère irrégularité** : quelques pour cent de variation sur l'angle, la longueur et la position. Sans elle, le rendu est vectoriel et froid.
4. **Le fil a un volume** : un reflet clair au centre du trait (second trait plus fin et plus clair par-dessus) et une ombre portée très courte sur le tissu.
5. **Le tissu existe** : un fond tissé (deux hachures croisées fines, ou `feTurbulence` étiré) et non une couleur plate.

```js
// Point de bourdon le long d'un segment (x1,y1)-(x2,y2), largeur `w`, en SVG.
// `rand` : fonction pseudo-aléatoire à graine, retourne [0,1).
function satinStitches(x1, y1, x2, y2, w, color, rand, spacing = 1.1) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / len, uy = (y2 - y1) / len; // direction de la forme
  const nx = -uy, ny = ux;                          // normale : direction des fils
  let out = '';
  for (let d = 0; d <= len; d += spacing) {
    const j = (rand() - 0.5) * 0.25 * spacing;      // irrégularité
    const h = (w / 2) * (0.96 + rand() * 0.08);
    const cx = x1 + ux * (d + j), cy = y1 + uy * (d + j);
    const a = `${(cx - nx * h).toFixed(2)},${(cy - ny * h).toFixed(2)}`;
    const b = `${(cx + nx * h).toFixed(2)},${(cy + ny * h).toFixed(2)}`;
    out += `<path d="M${a} L${b}" stroke="${color}" stroke-width="${spacing}" stroke-linecap="round"/>`;
    out += `<path d="M${a} L${b}" stroke="#fff" stroke-opacity=".22" stroke-width="${(spacing * 0.3).toFixed(2)}" stroke-linecap="round"/>`;
  }
  return out;
}
```

Pour une courbe, découper le tracé en petits segments et recalculer la normale à chaque pas. Pour un remplissage, tracer des rangées parallèles de segments de 3 à 4 unités, chaque rangée décalée d'un tiers de point par rapport à la précédente.

Au-delà de quelques milliers de traits, pré-rendre en image : un SVG de 20 000 `<path>` ralentit la page.

### Pour une vraie machine à broder

Dire clairement ce qui est possible : les formats machine (DST, PES, JEF…) sortent d'un logiciel de **digitalisation**. Le bon livrable est un **SVG vectoriel propre, en mm**, à ouvrir dans Ink/Stitch (extension libre d'Inkscape) ou le logiciel de la brodeuse, accompagné d'une fiche des points. Si Python et la bibliothèque `pyembroidery` sont disponibles, on peut écrire directement un fichier machine à partir d'une liste de points ; sinon, ne pas le promettre.

Repères de conception, à confirmer avec la machine et le tissu :

- Bourdon : largeur d'environ 1,5 à 7 mm. Plus étroit, le fil ne tient pas ; plus large, les fils flottent et s'accrochent : passer au remplissage.
- Point droit : longueur d'environ 2 à 4 mm.
- Détails de moins de 1 mm et texte de moins de 4 à 5 mm de haut : illisibles une fois brodés.
- Une forme par couleur de fil, formes fermées, sans chevauchements inutiles. Viser 6 à 8 couleurs au plus.
- Indiquer pour chaque forme le type de point et l'angle des fils.
- Le tissu se resserre sous le fil : prévoir des formes légèrement plus larges dans le sens des points (compensation de traction).

## Gravure

### Rendu taille-douce à l'écran

Principe : **aucun gris, uniquement des lignes.** La valeur vient de l'épaisseur et de la densité des traits.

- **Ligne renflée** : des lignes parallèles dont l'épaisseur grossit dans les zones sombres. C'est l'effet « billet de banque », le plus reconnaissable.
- **Hachures croisées** : une seconde famille de lignes, à 30–60° de la première, ajoutée seulement dans les ombres. Une troisième dans les noirs profonds.
- **Les lignes suivent le volume** : courbes sur une joue, droites sur un ciel. Des lignes toutes droites aplatissent le sujet.
- **Pointillé** pour les transitions douces (peau, ciel clair).
- Une seule encre (noir, sépia, bleu nuit) sur un papier légèrement teinté et grainé.

À partir d'une photo, sur canvas : lire la luminance, puis tracer des lignes dont la largeur en dépend.

```js
// `lum(x, y)` retourne la luminance [0 = noir, 1 = blanc] de la photo.
// Retourne des polygones SVG : une ligne renflée par rangée.
function engraveLines(width, height, lum, { gap = 6, maxW = 4.5, step = 3, wave = 0 } = {}) {
  let out = '';
  for (let y0 = gap / 2; y0 < height; y0 += gap) {
    const top = [], bottom = [];
    for (let x = 0; x <= width; x += step) {
      const y = y0 + Math.sin(x * 0.02) * wave;
      const yy = Math.min(height - 1, Math.max(0, y));
      const w = Math.max(0.15, maxW * (1 - lum(Math.min(x, width - 1), yy)));
      top.push(`${x},${(y - w / 2).toFixed(2)}`);
      bottom.unshift(`${x},${(y + w / 2).toFixed(2)}`);
    }
    out += `<polygon points="${top.concat(bottom).join(' ')}"/>`;
  }
  return out;
}
```

Régler `gap` selon la taille d'affichage : trop serré, l'image devient grise ; trop large, elle devient illisible. Augmenter le contraste de la photo avant de l'échantillonner. Pour les hachures croisées, relancer avec un repère tourné et un seuil (`lum < 0.4`).

### Pour une découpe ou gravure laser

Trois opérations, à séparer par calque ou par couleur de trait :

- **Découpe** : tracé vectoriel, la machine traverse la matière.
- **Marquage** (gravure vectorielle) : tracé vectoriel à faible puissance, un trait fin.
- **Gravure tramée** (raster) : des aplats ou une image, balayés ligne par ligne.

Règles du fichier :

- Unités en mm, document à la taille réelle.
- Traits de découpe très fins, sans remplissage. Les conventions de couleur et d'épaisseur varient selon l'atelier : **demander celles de la machine** au lieu d'en supposer.
- Textes convertis en tracés. Formes de découpe fermées.
- **Aucun tracé en double** : deux lignes superposées sont brûlées deux fois.
- Tenir compte du trait de coupe (de l'ordre de 0,1 à 0,2 mm, selon machine et matière) pour les assemblages.
- Éviter les détails plus fins que le faisceau et les ponts trop étroits qui cassent.
- Pour une gravure tramée de photo : niveaux de gris, contraste renforcé, tramage. Les hachures vectorielles de la section précédente donnent souvent un meilleur résultat sur bois et cuir.

Pour un traceur ou un burin (un outil qui suit des lignes), remplir les zones par des hachures à trait simple, jamais par des aplats.

## Grain de matière (écran)

Recettes légères, par ordre de coût :

- **Bruit en image** : une petite tuile de grain (PNG ou WebP, 200 à 400 px) répétée en `background`, mélangée avec `mix-blend-mode: multiply` ou `overlay` à faible opacité. Le moins cher, à préférer.
- **`feTurbulence`** : papier (`fractalNoise`, fréquence élevée), lin ou toile (fréquences x et y très différentes), marbre (`turbulence`, fréquence basse).
- **Relief** : `feTurbulence` suivi de `feDiffuseLighting` pour un cuir, un papier gaufré, un plâtre.

```html
<filter id="papier" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n"/>
  <feDiffuseLighting in="n" surfaceScale="1.2" lighting-color="#fff" result="l">
    <feDistantLight azimuth="45" elevation="60"/>
  </feDiffuseLighting>
  <feComposite in="l" in2="SourceGraphic" operator="arithmetic" k1="1" k2="0" k3="0" k4="0"/>
</filter>
```

Les filtres SVG sont recalculés à chaque redessin. Ne pas les poser sur une grande zone animée ou qui défile : pré-rendre la texture en image. Désactiver toute animation de texture sous `prefers-reduced-motion`.

## Liste de contrôle

Écran :

- [ ] Le motif affiché en 3 × 3 ne montre ni couture ni alignement parasite.
- [ ] Lisible à 100 % et crédible à 400 % (les fils et les traits restent des fils et des traits).
- [ ] Même graine, même résultat.
- [ ] Nombre d'éléments SVG raisonnable, sinon pré-rendu en image.
- [ ] Le texte posé sur la texture garde un contraste suffisant.

Fabrication :

- [ ] Taille réelle et unités en mm.
- [ ] Nombre de couleurs compté et listé (fils, écrans ou passes).
- [ ] Aucun détail sous la taille minimale du procédé.
- [ ] Tracés fermés, sans doublons, textes vectorisés.
- [ ] Les valeurs dépendantes de la machine sont signalées comme « à confirmer » et non présentées comme sûres.
