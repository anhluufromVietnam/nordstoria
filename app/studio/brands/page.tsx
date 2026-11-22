import type { Metadata } from "next";
import { CoverHeader } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Brands — VyIQ Studio",
  description: "Brand guidelines and visual direction for consistent campaigns.",
};

const brands = [
  { n: "01", name: "Nord Storia®", tag: "Master brand", body: "Palette: Ivory · Ink · International Blue · Mist. Type: Syne Viet / Space Grotesk / Space Mono. Voice: confident, aspirational, minimal — cold stories, told bright." },
  { n: "02", name: "VyIQ", tag: "Intelligence", body: "AI Media Intelligence Studio. Mark: eight-pointed compass star, always stamped on generated media." },
  { n: "03", name: "Brand guardrails", tag: "Enforced per generation", body: "No text in images, no watermark, studio backgrounds, commercial catalogue quality. Checked by the pipeline, not by memory." },
  { n: "04", name: "Multi-brand", tag: "Local execution", body: "Central brand and campaign management with localised execution per store, branch and business unit." },
];

const swatches = [
  { c: "#101012", n: "Obsidian" },
  { c: "#2036F5", n: "Nordic Blue" },
  { c: "#A8BFC9", n: "Glacier Mist" },
  { c: "#EFEBE3", n: "Bone White" },
];

export default function BrandsPage() {
  return (
    <main className="landing">
      <CoverHeader />
      <section className="block">
        <div className="label">Brands — Guidelines as data</div>
        <h2 className="sec">Brand consistency,<br /><em>by default.</em></h2>
        <p className="lead">
          Brand guidelines, communication principles, visual direction, content
          standards and campaign frameworks — translated into every campaign
          across products, channels, teams and locations.
        </p>
        <div className="rm-swatches" style={{ background: "var(--ink)", padding: 18, marginBottom: 26 }} aria-label="Brand palette">
          {swatches.map((s) => (
            <span key={s.c} title={s.n} style={{ background: s.c, width: 48, height: 48, border: "1px solid rgba(239,235,227,.3)" }} />
          ))}
        </div>
        <div className="eco-rows">
          {brands.map((b) => (
            <article className="eco-row" key={b.n}>
              <span className="eco-n">{b.n}</span>
              <div className="eco-body">
                <p className="eco-tag">{b.tag}</p>
                <h3>{b.name}</h3>
                <p>{b.body}</p>
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
