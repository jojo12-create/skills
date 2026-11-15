/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique : `npm run build` produit le dossier `out/`, hébergeable partout (GitHub Pages, Netlify, OVH...).
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
