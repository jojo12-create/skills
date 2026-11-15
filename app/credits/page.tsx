import type { Metadata } from 'next';
import { site } from '@/content/site';

const { credits } = site.footer;

export const metadata: Metadata = {
  title: `${credits.title} : ${site.brand.name}`,
  description: `Auteurs et licences des photographies du site ${site.brand.name}.`,
};

export default function Credits() {
  return (
    <main id="top" className="credits-page">
      <div className="wrap stack-4">
        <p>
          <a className="link" href="/">
            {site.brand.name}
          </a>
        </p>
        <h1>{credits.title}</h1>
        <ul>
          {credits.list.map((c) => (
            <li key={c.file}>
              <a href={c.file}>{c.author}</a>, <a href={c.licenseUrl}>{c.license}</a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
