import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaigns — VyIQ Studio",
  description: "Plan, execute and monitor integrated campaigns.",
};

export default function CampaignsPage() {
  return (
    <main className="landing">
      <header className="landing-nav">
        <a className="landing-brand" href="/"><span className="landing-mark" aria-hidden="true">✳</span><span>VyIQ Studio</span></a>
        <nav className="landing-nav-links">
          <a href="/studio">Studio</a><a href="/studio/dashboard">Dashboard</a><a href="/studio/campaigns">Campaigns</a><a href="/studio/brands">Brands</a><a href="/studio/insights">Insights</a><a href="/">← Landing</a>
        </nav>
      </header>
      <section className="landing-section">
        <p className="landing-kicker">Campaigns</p>
        <h2>Integrated campaigns, <em>end to end.</em></h2>
        <p className="landing-section-lead">
          Campaign concepts, creative direction, content production, social media
          management, digital advertising, performance marketing and promotional
          activities — coordinated across internal teams, agencies, regional
          branches, retail stores and digital channels.
        </p>
        <div className="app-grid">
          <article className="app-card"><h3>Tokyo Night — Signature</h3><p>Status: Live · 4 channels · 12 stores. Performance +18% vs benchmark. <a href="/studio">Open in Studio →</a></p></article>
          <article className="app-card"><h3>Quiet Luxury — Core</h3><p>Status: Testing · 3 creatives A/B. Winner emerging on paid social. <a href="/studio/insights">View insights →</a></p></article>
          <article className="app-card"><h3>Urban Street — Drop 02</h3><p>Status: Planning. Brand guidelines applied. Draft assets in Muse Image. <a href="/studio/assets">Assets →</a></p></article>
          <article className="app-card"><h3>Summer Escape — Regional</h3><p>Status: Live · localised per store. Compare store performance to replicate winners.</p></article>
        </div>
      </section>
      <footer className="landing-footer"><span>© VyIQ × Nord Storia 2026</span><span><a href="/studio">← Back to Studio</a></span></footer>
    </main>
  );
}
