/*
 * type: service (gabarit vitrine, contenu de démonstration)
 * deal: hero split, nav nav-mega, close close-photo -> close-word sans nom (aucune photo libre pour le bas de page),
 *       footer footer-visit, rhythm dark-band, buttons solid, mark initial, palette white-signal-red, type red-hat
 * moments: word-highlight dans #methode
 */
import { ActionBar, Footer, Hero, Nav, Quote, Services, Statement, Workshop } from '@/components/sections';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Services />
        <Statement />
        <Workshop />
        <Quote />
      </main>
      <Footer />
      <ActionBar />
    </>
  );
}
