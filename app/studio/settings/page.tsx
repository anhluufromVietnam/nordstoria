import type { Metadata } from "next";
import { CoverHeader } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Settings — VyIQ Studio",
  description: "Studio settings: API, models and team.",
};

const config = [
  { n: "01", k: "Image model", v: "muse-image-1.0", d: "via Meta Model API (MODEL_API_KEY). Override with MUSE_IMAGE_MODEL." },
  { n: "02", k: "Text model", v: "muse-spark-1.3", d: "Captions and insights. Override with MUSE_TEXT_MODEL." },
  { n: "03", k: "Backend", v: "FastAPI :8001", d: "TryON/main.py. Next.js proxies via BACKEND_URL." },
  { n: "04", k: "Team", v: "Per campaign", d: "Internal teams, external agencies, regional branches and retail stores." },
];

export default function SettingsPage() {
  return (
    <main className="landing">
      <CoverHeader />
      <section className="block">
        <div className="label">Settings — Studio configuration</div>
        <h2 className="sec">Studio<br /><em>configuration.</em></h2>
        <div className="eco-rows">
          {config.map((c) => (
            <article className="eco-row" key={c.n}>
              <span className="eco-n">{c.n}</span>
              <div className="eco-body">
                <p className="eco-tag">{c.k}</p>
                <h3>{c.v}</h3>
                <p>{c.d}</p>
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
