import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge — VyIQ Studio",
  description: "Searchable knowledge base from historical campaigns.",
};

export default function KnowledgePage() {
  return (
    <main className="landing">
      <header className="landing-nav">
        <a className="landing-brand" href="/"><svg className="ns-mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="M50 4 58 42 96 50 58 58 50 96 42 58 4 50 42 42Z" fill="#101012"/><path d="M50 22 54 46 78 50 54 54 50 78 46 54 22 50 46 46Z" fill="#2036f5"/></svg><span>VyIQ Studio</span></a>
        <nav className="landing-nav-links">
          <a href="/studio">Studio</a><a href="/studio/dashboard">Dashboard</a><a href="/studio/knowledge">Knowledge</a><a href="/">← Landing</a>
        </nav>
      </header>
      <section className="landing-section">
        <p className="landing-kicker">Knowledge Base</p>
        <h2>What worked, <em>searchable.</em></h2>
        <p className="landing-section-lead">
          Historical campaign insights, playbooks and creative patterns — reused
          to improve future planning and reduce repetitive work.
        </p>
        <div className="app-grid">
          <article className="app-card"><h3>Search</h3><p><input className="delivery-input" placeholder="e.g. luxury evening social" aria-label="Search knowledge" /></p></article>
          <article className="app-card"><h3>Playbook: Evening launches</h3><p>Social-first, 18:00 flight, short copy, 3 creatives. Avg. lift +21%.</p></article>
          <article className="app-card"><h3>Pattern: Studio product shots</h3><p>Seamless background, 1:1, soft key light. Best for try-on source images.</p></article>
          <article className="app-card"><h3>Pattern: Campaign edits</h3><p>16:9 editorial transformation, keep person and pose. Used by Tokyo Night &amp; Quiet Luxury.</p></article>
        </div>
      </section>
      <footer className="landing-footer"><span>© VyIQ × Nord Storia 2026</span><span><a href="/studio">← Back to Studio</a></span></footer>
    </main>
  );
}
