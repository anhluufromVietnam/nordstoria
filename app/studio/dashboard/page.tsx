import type { Metadata } from "next";
import { CoverHeader } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Dashboard — VyIQ AI Media Intelligence Studio",
  description: "Campaign dashboard: performance, insights and recommendations.",
};

const kpis = [
  { v: "12", t: "Active campaigns", who: "3 brands · 8 locations" },
  { v: "48", t: "Assets this week", who: "Produced with Muse Image" },
  { v: "+24%", t: "Top insight lift", who: "Quiet Luxury · paid social" },
  { v: "5", t: "Live A/B tests", who: "Audience · message · channel" },
];

const next = [
  { t: "Create a new campaign", d: "Studio", href: "/studio", n: "01" },
  { t: "Keep every drop on-brand", d: "Brand guidelines", href: "/studio/brands", n: "02" },
  { t: "Reuse historical wins", d: "Knowledge base", href: "/studio/knowledge", n: "03" },
  { t: "API keys, models and team", d: "Settings", href: "/studio/settings", n: "04" },
];

export default function DashboardPage() {
  return (
    <main className="landing">
      <CoverHeader />
      <section className="block dash-head">
        <div className="label">Dashboard — Performance intelligence</div>
        <h2 className="sec">Campaign performance<br /><em>at a glance.</em></h2>
        <p className="lead">
          Consolidated performance across campaigns, channels and locations — with
          AI-generated insights and recommendations, not just end-of-campaign reports.
        </p>
        <div className="gates-grid">
          {kpis.map((k) => (
            <div className="gate-card" key={k.v}>
              <p className="gnum">{k.v}</p>
              <h3>{k.t}</h3>
              <p className="who">{k.who}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="block dark">
        <div className="label">Live signals</div>
        <h2 className="sec">What the AI<br /><em>says now.</em></h2>
        <div className="eco-rows">
          <article className="eco-row">
            <span className="eco-n">→</span>
            <div className="eco-body">
              <p className="eco-tag">Recommendation</p>
              <h3>Shift 15% budget: TikTok &gt; Meta</h3>
              <p>“Quiet Luxury” outperforms benchmark by 24% on paid social. Its creative pattern is ready to replicate in the next drop.</p>
            </div>
          </article>
          <article className="eco-row">
            <span className="eco-n">→</span>
            <div className="eco-body">
              <p className="eco-tag">Experiment</p>
              <h3>Winners surface automatically</h3>
              <p>Five live tests on audience, message and channel. Leading variant: Urban 25–34, evening flights.</p>
            </div>
          </article>
          <article className="eco-row">
            <span className="eco-n">→</span>
            <div className="eco-body">
              <p className="eco-tag">Stores</p>
              <h3>Stores 04 and 11 lead conversion</h3>
              <p>Their local promotion pattern is queued for the playbook — one click to replicate across the network.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="block">
        <div className="label">Next steps</div>
        <h2 className="sec">Where to go<br /><em>from here.</em></h2>
        <div className="landing-index">
          {next.map((i) => (
            <a href={i.href} key={i.n}><span className="t">{i.n} — {i.t}</span><span className="n">{i.d} ↗</span></a>
          ))}
        </div>
      </section>
      <footer className="cover-footer">
        <div className="footer-meta"><span>© VyIQ × Nord Storia 2026</span><span><a href="/">← Back to landing</a></span></div>
      </footer>
    </main>
  );
}
