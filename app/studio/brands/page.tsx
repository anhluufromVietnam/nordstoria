import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brands — VyIQ Studio",
  description: "Brand guidelines and visual direction for consistent campaigns.",
};

export default function BrandsPage() {
  return (
    <main className="landing">
      <header className="landing-nav">
        <a className="landing-brand" href="/"><svg className="ns-mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" strokeWidth="4"><path d="M50 2 L50 98 M2 50 L98 50 M16 16 L84 84 M84 16 L16 84"/></g><circle cx="50" cy="50" r="10" fill="currentColor"/></svg><span>VyIQ Studio</span></a>
        <nav className="landing-nav-links">
          <a href="/studio">Studio</a><a href="/studio/dashboard">Dashboard</a><a href="/studio/brands">Brands</a><a href="/studio/campaigns">Campaigns</a><a href="/">← Landing</a>
        </nav>
      </header>
      <section className="landing-section">
        <p className="landing-kicker">Brands</p>
        <h2>Brand consistency, <em>by default.</em></h2>
        <p className="landing-section-lead">
          Brand guidelines, communication principles, visual direction, content
          standards and campaign frameworks — translated into every campaign
          across products, channels, teams and locations.
        </p>
        <div className="app-grid">
          <article className="app-card"><h3>Nord Storia®</h3><p>Palette: Ivory · Ink · International Blue · Mist. Type: Playfair / DM Sans / DM Mono. Voice: confident, aspirational, minimal.</p></article>
          <article className="app-card"><h3>VyIQ</h3><p>AI Media Intelligence Studio. Mark: eight-pointed compass star. Always stamped on generated media.</p></article>
          <article className="app-card"><h3>Brand guardrails</h3><p>No text in images, no watermark, studio backgrounds, commercial catalogue quality. Enforced per generation.</p></article>
          <article className="app-card"><h3>Multi-brand</h3><p>Central brand and campaign management with localised execution per store, branch and business unit.</p></article>
        </div>
      </section>
      <footer className="landing-footer"><span>© VyIQ × Nord Storia 2026</span><span><a href="/studio">← Back to Studio</a></span></footer>
    </main>
  );
}
