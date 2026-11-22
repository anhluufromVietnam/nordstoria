import type { Metadata } from "next";
import { CoverHeader } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Knowledge — VyIQ Studio",
  description: "Searchable knowledge base from historical campaigns.",
};

const playbooks = [
  { n: "01", tag: "Playbook", h: "Evening launches", d: "Social-first, 18:00 flight, short copy, 3 creatives. Avg. lift +21%." },
  { n: "02", tag: "Pattern", h: "Studio product shots", d: "Seamless background, 1:1, soft key light. Best as try-on source images." },
  { n: "03", tag: "Pattern", h: "Campaign edits", d: "16:9 editorial transformation, keep person and pose. Used by Tokyo Night & Quiet Luxury." },
  { n: "04", tag: "Playbook", h: "Store replication", d: "Capture the winning local promotion, roll out with localised copy per store." },
];

export default function KnowledgePage() {
  return (
    <main className="landing">
      <CoverHeader />
      <section className="block dark">
        <div className="label">Knowledge Base — Reuse what worked</div>
        <h2 className="sec">What worked,<br /><em>searchable.</em></h2>
        <p className="lead">
          Historical campaign insights, playbooks and creative patterns — reused
          to improve future planning and reduce repetitive work. Replay time −60%.
        </p>
        <div className="eco-rows">
          {playbooks.map((p) => (
            <article className="eco-row" key={p.n}>
              <span className="eco-n">{p.n}</span>
              <div className="eco-body">
                <p className="eco-tag">{p.tag}</p>
                <h3>{p.h}</h3>
                <p>{p.d}</p>
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
