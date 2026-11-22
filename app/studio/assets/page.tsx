import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assets — VyIQ Studio",
  description: "Creative assets produced with Muse Image.",
};

export default function AssetsPage() {
  return (
    <main className="landing">
      <header className="landing-nav">
        <a className="landing-brand" href="/"><span className="landing-mark" aria-hidden="true">✳</span><span>VyIQ Studio</span></a>
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
