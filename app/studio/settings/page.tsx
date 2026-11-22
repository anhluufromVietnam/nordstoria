import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings — VyIQ Studio",
  description: "Studio settings: API, models and team.",
};

export default function SettingsPage() {
  return (
    <main className="landing">
      <header className="landing-nav">
        <a className="landing-brand" href="/"><svg className="ns-mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="M50 4 58 42 96 50 58 58 50 96 42 58 4 50 42 42Z" fill="#101012"/><path d="M50 22 54 46 78 50 54 54 50 78 46 54 22 50 46 46Z" fill="#2036f5"/></svg><span>VyIQ Studio</span></a>
        <nav className="landing-nav-links">
          <a href="/studio">Studio</a><a href="/studio/dashboard">Dashboard</a><a href="/studio/settings">Settings</a><a href="/">← Landing</a>
        </nav>
      </header>
      <section className="landing-section">
        <p className="landing-kicker">Settings</p>
        <h2>Studio <em>configuration.</em></h2>
        <div className="app-grid">
          <article className="app-card"><h3>Image model</h3><p>muse-image-1.0 via Meta Model API (MODEL_API_KEY). Override with MUSE_IMAGE_MODEL.</p></article>
          <article className="app-card"><h3>Text model</h3><p>muse-spark-1.3 for captions and insights. Override with MUSE_TEXT_MODEL.</p></article>
          <article className="app-card"><h3>Backend</h3><p>FastAPI on :8001 (TryON/main.py). Next.js proxies via BACKEND_URL.</p></article>
          <article className="app-card"><h3>Team</h3><p>Internal teams, external agencies, regional branches and retail stores — managed per campaign.</p></article>
        </div>
      </section>
      <footer className="landing-footer"><span>© VyIQ × Nord Storia 2026</span><span><a href="/studio">← Back to Studio</a></span></footer>
    </main>
  );
}
