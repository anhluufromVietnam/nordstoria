import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assets — VyIQ Studio",
  description: "Creative assets produced with Muse Image.",
};

export default function AssetsPage() {
  return (
    <main className="landing">
      <header className="landing-nav">
        <a className="landing-brand" href="/"><svg className="ns-mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="M50 4 58 42 96 50 58 58 50 96 42 58 4 50 42 42Z" fill="#101012"/><path d="M50 22 54 46 78 50 54 54 50 78 46 54 22 50 46 46Z" fill="#2036f5"/></svg><span>VyIQ Studio</span></a>
        <nav className="landing-nav-links">
          <a href="/studio">Studio</a><a href="/studio/dashboard">Dashboard</a><a href="/studio/assets">Assets</a><a href="/">← Landing</a>
        </nav>
      </header>
      <section className="landing-section">
        <p className="landing-kicker">Assets</p>
        <h2>Generated with <em>Muse Image.</em></h2>
        <p className="landing-section-lead">
          Product shots, try-on results and campaign edits. Generated in the
          <a href="/studio"> Studio →</a> and automatically stamped with the
          VyIQ × Nord Storia brand identity.
        </p>
        <div className="app-grid">
          <article className="app-card"><h3>Product shots</h3><p>Text-to-image catalogue photography, 1:1. <a href="/studio">Generate →</a></p></article>
          <article className="app-card"><h3>Try-on results</h3><p>Person + garment composition. <a href="/studio">Try on →</a></p></article>
          <article className="app-card"><h3>Campaign edits</h3><p>Editorial transformation, 16:9, with auto captions. <a href="/studio">Create campaign →</a></p></article>
          <article className="app-card"><h3>Brand stamp</h3><p>Compass-star mark + wordmark composited on every output (Pillow).</p></article>
        </div>
      </section>
      <footer className="landing-footer"><span>© VyIQ × Nord Storia 2026</span><span><a href="/studio">← Back to Studio</a></span></footer>
    </main>
  );
}
