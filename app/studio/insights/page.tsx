import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights — VyIQ Studio",
  description: "AI-powered campaign intelligence, insights and recommendations.",
};

export default function InsightsPage() {
  return (
    <main className="landing">
      <header className="landing-nav">
        <a className="landing-brand" href="/"><svg className="ns-mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="M50 4 58 42 96 50 58 58 50 96 42 58 4 50 42 42Z" fill="#101012"/><path d="M50 22 54 46 78 50 54 54 50 78 46 54 22 50 46 46Z" fill="#2036f5"/></svg><span>VyIQ Studio</span></a>
        <nav className="landing-nav-links">
          <a href="/studio">Studio</a><a href="/studio/dashboard">Dashboard</a><a href="/studio/insights">Insights</a><a href="/studio/campaigns">Campaigns</a><a href="/">← Landing</a>
        </nav>
      </header>
      <section className="landing-section">
        <p className="landing-kicker">Insights</p>
        <h2>From reports <em>to recommendations.</em></h2>
        <p className="landing-section-lead">
          Observe campaign progress, evaluate creative and communication
          effectiveness, test audiences, messages, channels and promotions — and
          adjust direction based on measurable results.
        </p>
        <div className="app-grid">
          <article className="app-card"><h3>Creative effectiveness</h3><p>Quiet Luxury creative C wins on click-through (+24%). Replicate its composition in next drop.</p></article>
          <article className="app-card"><h3>Audience</h3><p>Urban segments 25–34 respond 31% better after 18:00. Reschedule to evening flights.</p></article>
          <article className="app-card"><h3>Channel mix</h3><p>Paid social CAC is 12% below target; search is saturated. Shift 15% budget to social.</p></article>
          <article className="app-card"><h3>Store comparison</h3><p>Stores 04 and 11 lead conversion. Capture their local promotion pattern for the playbook.</p></article>
        </div>
      </section>
      <footer className="landing-footer"><span>© VyIQ × Nord Storia 2026</span><span><a href="/studio">← Back to Studio</a></span></footer>
    </main>
  );
}
