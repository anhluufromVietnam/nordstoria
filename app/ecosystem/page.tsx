import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecosystem — VyIQ × Nord Storia",
  description: "Nord Storia, VyIQ AI, TVIQ Technology and Robotics & IoT — one ecosystem.",
};

export default function EcosystemPage() {
  return (
    <main className="landing">
      <header className="landing-nav">
        <a className="landing-brand" href="/"><span className="landing-mark" aria-hidden="true">✳</span><span>VyIQ Ecosystem</span></a>
        <nav className="landing-nav-links">
          <a href="/">Home</a><a href="/ecosystem">Ecosystem</a><a href="/studio">Studio</a>
        </nav>
      </header>
      <section className="landing-section">
        <p className="landing-kicker">TVQ Ecosystem</p>
        <h2>Strategy, intelligence, studio, <em>technology.</em></h2>
        <div className="app-grid">
          <article className="app-card"><h3>Nord Storia</h3><p>Brand &amp; Media Strategy — positioning, guidelines, campaign planning, creative direction, digital &amp; performance marketing, media operations.</p></article>
          <article className="app-card"><h3>VyIQ AI &amp; Enterprise Solutions</h3><p>Campaign intelligence, workflow automation, dashboards, knowledge management, performance analysis, recommendations.</p></article>
          <article className="app-card"><h3>VyIQ × Nord Storia AI Studio</h3><p>Generative AI: concepts, branded visuals (Muse Image), creative adaptation, content development.</p></article>
          <article className="app-card"><h3>TVIQ Technology + Robotics &amp; IoT</h3><p>Enterprise platforms, system integration, connected stores and interactive retail experiences.</p></article>
        </div>
      </section>
      <footer className="landing-footer"><span>© VyIQ × Nord Storia 2026</span><span><a href="/">← Back to landing</a></span></footer>
    </main>
  );
}
