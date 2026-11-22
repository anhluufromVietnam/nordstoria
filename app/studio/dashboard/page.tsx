import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — VyIQ AI Media Intelligence Studio",
  description: "Campaign dashboard: performance, insights and recommendations.",
};

const nav = [
  { href: "/studio", label: "Studio" },
  { href: "/studio/dashboard", label: "Dashboard" },
  { href: "/studio/campaigns", label: "Campaigns" },
  { href: "/studio/brands", label: "Brands" },
  { href: "/studio/insights", label: "Insights" },
  { href: "/studio/knowledge", label: "Knowledge" },
  { href: "/studio/assets", label: "Assets" },
  { href: "/", label: "← Landing" },
];

export default function DashboardPage() {
  return (
    <main className="landing">
      <header className="landing-nav">
        <a className="landing-brand" href="/">
          <svg className="ns-mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" strokeWidth="4"><path d="M50 2 L50 98 M2 50 L98 50 M16 16 L84 84 M84 16 L16 84"/></g><circle cx="50" cy="50" r="10" fill="currentColor"/></svg>
          <span>VyIQ Studio</span>
        </a>
        <nav className="landing-nav-links" aria-label="Studio">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
      </header>
      <section className="landing-section">
        <p className="landing-kicker">Dashboard</p>
        <h2>Campaign performance <em>at a glance.</em></h2>
        <p className="landing-section-lead">
          Consolidated performance across campaigns, channels and locations — with
          AI-generated insights and recommendations, not just end-of-campaign reports.
        </p>
        <div className="app-grid">
          <article className="app-card"><h3>Active campaigns</h3><p><b>12</b> running across 3 brands · 8 locations. <a href="/studio/campaigns">Manage →</a></p></article>
          <article className="app-card"><h3>Creative output</h3><p><b>48</b> assets produced this week with Muse Image. <a href="/studio/assets">View assets →</a></p></article>
          <article className="app-card"><h3>Top insight</h3><p>“Quiet Luxury” outperforms by 24% on paid social. Recommendation: shift 15% budget and reuse the creative pattern.</p></article>
          <article className="app-card"><h3>A/B experiments</h3><p><b>5</b> live tests on audience, message and channel. Winners auto-surface here. <a href="/studio/insights">Explore insights →</a></p></article>
        </div>
      </section>
      <section className="landing-section landing-section-alt">
        <h2>Next steps</h2>
        <div className="app-grid">
          <article className="app-card"><h3>New campaign</h3><p>Create a campaign in the <a href="/studio">Studio →</a></p></article>
          <article className="app-card"><h3>Brand guidelines</h3><p>Keep every campaign on-brand. <a href="/studio/brands">Review brands →</a></p></article>
          <article className="app-card"><h3>Knowledge base</h3><p>Reuse historical wins. <a href="/studio/knowledge">Search knowledge →</a></p></article>
          <article className="app-card"><h3>Settings</h3><p>API keys, models and team. <a href="/studio/settings">Open settings →</a></p></article>
        </div>
      </section>
      <footer className="landing-footer"><span>© VyIQ × Nord Storia 2026</span><span><a href="/">← Back to landing</a></span></footer>
    </main>
  );
}
