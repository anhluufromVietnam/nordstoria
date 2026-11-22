import type { Metadata } from "next";
import { CoverHeader } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Insights — VyIQ Studio",
  description: "AI-powered campaign intelligence, insights and recommendations.",
};

const insights = [
  { n: "01", k: "Creative effectiveness", h: "Creative C wins on click-through", d: "Quiet Luxury creative C: +24% CTR. Replicate its composition — negative space, single subject, 1:1 crop — in the next drop." },
  { n: "02", k: "Audience", h: "Evening flights outperform", d: "Urban segments 25–34 respond 31% better after 18:00. Reschedule delivery windows and re-test Monday." },
  { n: "03", k: "Channel mix", h: "Shift 15% budget to social", d: "Paid social CAC is 12% below target; search is saturated. AI recommends reallocating before the next flight." },
  { n: "04", k: "Store comparison", h: "Two stores set the pattern", d: "Stores 04 and 11 lead conversion. Their local promotion pattern is captured for the playbook." },
];

export default function InsightsPage() {
  return (
    <main className="landing">
      <CoverHeader />
      <section className="block dark">
        <div className="label">Insights — AI campaign intelligence</div>
        <h2 className="sec">From reports<br /><em>to recommendations.</em></h2>
        <p className="lead">
          Observe campaign progress in real time, evaluate creative and communication
          effectiveness, test audiences, messages, channels and promotions — and
          adjust direction based on measurable results.
        </p>
        <div className="eco-rows">
          {insights.map((i) => (
            <article className="eco-row" key={i.n}>
              <span className="eco-n">{i.n}</span>
              <div className="eco-body">
                <p className="eco-tag">{i.k}</p>
                <h3>{i.h}</h3>
                <p>{i.d}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <footer className="cover-footer">
        <div className="footer-meta"><span>© VyIQ × Nord Storia 2026</span><span><a href="/studio">← Back to Studio</a></span></div>
      </footer>
    </main>
  );
}
