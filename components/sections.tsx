/*
 * Les blocs de la page d'accueil. Aucun texte ici : tout vient de content/site.ts.
 * Les classes (wrap, grid, span-*, btn, rows, frame...) sont celles du kit (public/assets/system.css),
 * à garder telles quelles pour conserver la grille, les hauteurs d'écran et les animations.
 */
import { Fragment } from 'react';
import type { Photo } from '@/content/site';
import { site } from '@/content/site';

const Arrow = () => (
  <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
    <path className="m-arrow__stem" d="M1 6h8" />
    <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
  </svg>
);

const Chevron = () => (
  <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Img({ photo, className, eager, sizes }: { photo: Photo; className?: string; eager?: boolean; sizes?: string }) {
  return (
    <img
      className={className}
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={sizes ?? '(max-width: 1023px) 100vw, 50vw'}
      width={photo.width}
      height={photo.height}
      alt={photo.alt}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      data-source={photo.source}
      data-subject={photo.subject}
      style={photo.position ? ({ objectPosition: photo.position, '--ly-pos': photo.position } as React.CSSProperties) : undefined}
    />
  );
}

function Logo() {
  const { brand } = site;
  return (
    <a className="nav__logo" href="#top">
      {brand.logo ? (
        <img src={brand.logo} alt="" height={28} />
      ) : (
        <span className="mark mark--initial" aria-hidden="true">
          {brand.initial}
        </span>
      )}
      {brand.name}
    </a>
  );
}

/** Texte avec un passage entre ** ** mis en valeur. */
function withStrong(text: string) {
  return text.split(/\*\*(.+?)\*\*/).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>));
}

/* ------------------------------------------------------------------ Navigation (nav-mega) */
export function Nav() {
  const { nav, primaryAction } = site;
  const [first, ...rest] = nav.links;
  return (
    <header className="nav">
      <div className="wrap nav__bar">
        <a className="skip-link" href="#top">
          Aller au contenu
        </a>
        <Logo />
        <nav className="nav__links" aria-label="Principale">
          <div className="nav__item">
            <a className="nav__link" href={first.href}>
              {first.label} <Chevron />
            </a>
            <div className="nav__menu">
              <div className="wrap grid">
                {nav.menu.map((col) => (
                  <div className="menu-col span-3" key={col.group}>
                    <p className="t-label">{col.group}</p>
                    {col.items.map((item) => (
                      <a href={item.href} key={item.href}>
                        {item.label}
                        <span>{item.hint}</span>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {rest.map((l) => (
            <div className="nav__item" key={l.href}>
              <a className="nav__link" href={l.href}>
                {l.label}
              </a>
            </div>
          ))}
        </nav>
        <div className="nav__actions">
          <a className="btn btn--primary" href={primaryAction.href}>
            {primaryAction.label}
          </a>
        </div>
        <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ Héros (split) */
export function Hero() {
  const { hero, primaryAction } = site;
  return (
    <section className="hero hero--split" data-enter aria-labelledby="hero-h">
      <div className="wrap">
        <div className="hero-text grid hero__grid">
          <div className="hero__text span-5">
            <h1 id="hero-h">{hero.title}</h1>
            <p className="hero__lead">{hero.lead}</p>
            <div className="btn-row">
              <a className="btn btn--primary" href={primaryAction.href}>
                {primaryAction.label}
                <Arrow />
              </a>
              <a className="btn btn--secondary" href={hero.secondaryAction.href}>
                {hero.secondaryAction.label}
              </a>
            </div>
          </div>
          <div className="hero__media span-6 start-7">
            <Img photo={hero.photo} eager sizes="(max-width: 639px) 560px, (max-width: 1279px) 900px, 1100px" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Prestations (services-list) */
export function Services() {
  const { services } = site;
  return (
    <section className="section" id={services.id} style={{ '--hm': 2 } as React.CSSProperties} aria-labelledby={`${services.id}-h`}>
      <div className="wrap">
        <div className="grid grid--top fill">
          <div className="span-5">
            <div className="section-head">
              <h2 id={`${services.id}-h`}>
                {services.title} <span className="muted">{services.titleMuted}</span>
              </h2>
            </div>
            <ul className="rows">
              {services.items.map((s) => (
                <li key={s.name}>
                  <span className="rows__name">{s.name}</span>
                  <p>{s.line}</p>
                  <span className="rows__value">{services.priceLabel}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="frame frame--photo frame--fill span-6 start-7">
            <Img photo={services.photo} className="frame__img" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Phrase forte (moment word-highlight) */
export function Statement() {
  const { statement } = site;
  return (
    <section className="section statement" id={statement.id} data-moment="word-highlight" aria-label={statement.label}>
      <div className="wrap">
        <p className="t-label">{statement.label}</p>
        <p className="mo-wh__text">{withStrong(statement.text)}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Atelier (photo-pair sur bande sombre) */
export function Workshop() {
  const { workshop } = site;
  return (
    <section className="section ground-inverse" id={workshop.id} aria-labelledby={`${workshop.id}-h`}>
      <div className="wrap">
        <div className="section-head">
          <h2 id={`${workshop.id}-h`}>
            {workshop.title} <span className="muted">{workshop.titleMuted}</span>
          </h2>
          <p>{workshop.line}</p>
        </div>
        <div className="grid fill pair">
          {workshop.photos.map((p) => (
            <div className="frame frame--photo span-6" key={p.src}>
              <Img photo={p} className="frame__img" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Devis (booking-form) */
export function Quote() {
  const { quote, primaryAction } = site;
  return (
    <section className="section g2m" id={quote.id} aria-labelledby={`${quote.id}-h`}>
      <div className="wrap">
        <div className="grid grid--top">
          <div className="span-5 stack-4">
            <h2 id={`${quote.id}-h`}>{quote.title}</h2>
            <p className="t-lead">{quote.line}</p>
            <div className="panel steps-panel">
              <div className="dg" data-diagram="">
                <script
                  type="application/json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      layout: 'timeline',
                      alt: quote.stepsAlt,
                      ground: 'none',
                      motion: { pulse: 'none' },
                      steps: quote.steps,
                    }),
                  }}
                />
              </div>
            </div>
          </div>
          <div className="span-6 start-7 form-card">
            <form
              className="form"
              action={`mailto:${quote.mailto}`}
              method="post"
              encType="text/plain"
              data-endpoint={quote.endpoint}
              data-sent={quote.sentMessage}
              noValidate
            >
              {quote.fields.map((f) => (
                <div className="field" key={f.id}>
                  <label htmlFor={`f-${f.id}`}>{f.label}</label>
                  <input
                    id={`f-${f.id}`}
                    name={f.id}
                    type={f.type}
                    autoComplete={f.autocomplete}
                    inputMode={f.type === 'email' ? 'email' : undefined}
                    required
                    aria-describedby={`f-${f.id}-err`}
                  />
                  <p className="field__error" id={`f-${f.id}-err`} hidden>
                    {f.error}
                  </p>
                </div>
              ))}
              <div className="btn-row">
                <button className="btn btn--primary" type="submit">
                  {primaryAction.label}
                </button>
              </div>
              <p className="form__status" role="status" data-form-status></p>
              <p className="t-small muted">{quote.replyLine}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Bas de page (close + footer-visit) */
export function Footer() {
  const { footer, brand, primaryAction, nav } = site;
  return (
    <footer className="footer closing footer--visit g2m" id="contact" aria-labelledby="close-h">
      <div className="wrap">
        <div className="closing__cta close--word">
          <div className="section-head--split">
            <div>
              <h2 id="close-h">{footer.closeTitle}</h2>
              <p className="t-lead">{footer.closeLine}</p>
            </div>
            <a className="btn btn--primary" href={primaryAction.href}>
              {primaryAction.label}
              <Arrow />
            </a>
          </div>
        </div>
        <div className="closing__links">
          <div className="grid">
            <div className="span-6 stack-4">
              <address className="footer__address">{footer.address}</address>
              <p>
                <a className="link" href={footer.mapHref}>
                  {footer.mapLabel}
                </a>
              </p>
            </div>
            <div className="span-6 start-7 stack-4">
              <h3>{footer.hoursTitle}</h3>
              <dl className="hours">
                {footer.hours.map((h) => (
                  <Fragment key={h.day}>
                    <dt>{h.day}</dt>
                    <dd>{h.value}</dd>
                  </Fragment>
                ))}
              </dl>
            </div>
          </div>
          <nav className="footer__nav" aria-label="Bas de page">
            {nav.links.slice(0, 3).map((l) => (
              <a href={l.href} key={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="footer__legal">
            <span>
              &copy; {brand.year} {brand.name}
            </span>
            {footer.credits.list.length ? (
              <a className="credits" href="/credits/">
                {footer.credits.label}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ Barre d'action (téléphone) */
export function ActionBar() {
  const { primaryAction } = site;
  return (
    <nav className="actionbar" aria-label="Action rapide">
      <a className="btn btn--primary" href={primaryAction.href}>
        {primaryAction.label}
      </a>
    </nav>
  );
}
