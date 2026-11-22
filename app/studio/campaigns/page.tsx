import type { Metadata } from "next";
import { CoverHeader } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Campaigns — VyIQ Studio",
  description: "Plan, execute and monitor integrated campaigns.",
};

const campaigns = [
  { n: "01", name: "Tokyo Night — Signature Drop", status: "Live", detail: "4 channels · 12 stores · +18% vs benchmark", tone: "glacier", href: "/studio" },
  { n: "02", name: "Quiet Luxury — Core Collection", status: "Testing", detail: "3 creatives A/B · winner emerging on paid social", tone: "amber", href: "/studio/insights" },
  { n: "03", name: "Urban Street — Drop 02", status: "Planning", detail: "Guidelines applied · draft assets in Muse Image", tone: "muted", href: "/studio/assets" },
  { n: "04", name: "Summer Escape — Regional Rollout", status: "Live", detail: "Localised per store · compare to replicate winners", tone: "glacier", href: "/studio/dashboard" },
];

export default function CampaignsPage() {
  return (
    <main className="landing">
      <CoverHeader />
      <section className="block">
        <div className="label">Campaigns — Plan, execute, monitor</div>
        <h2 className="sec">Integrated campaigns,<br /><em>end to end.</em></h2>
        <p className="lead">
          Campaign concepts, creative direction, content production, social media,
          digital advertising, performance marketing and promotions — coordinated
          across teams, agencies, branches, retail stores and digital channels.
        </p>
        <div className="eco-rows">
          {campaigns.map((c) => (
            <a className="eco-row" href={c.href} key={c.n} style={{ textDecoration: "none", color: "inherit" }}>
              <span className="eco-n">{c.n}</span>
              <div className="eco-body">
                <p className="eco-tag">{c.name}</p>
                <h3 style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <i className={`status-dot status-${c.tone}`} />
                  {c.status}
                </h3>
                <p>{c.detail}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
      <footer className="cover-footer">
        <div className="footer-meta"><span>© VyIQ × Nord Storia 2026</span><span><a href="/studio">← Back to Studio</a></span></div>
      </footer>
    </main>
  );
}
