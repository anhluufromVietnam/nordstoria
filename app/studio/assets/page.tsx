import type { Metadata } from "next";
import { CoverHeader } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Assets — VyIQ Studio",
  description: "Creative assets produced with Muse Image.",
};

const types = [
  { n: "01", name: "Product shots", tag: "1:1 packshot", href: "/studio", d: "Text-to-image catalogue photography on seamless backgrounds — the studio-quality base for every campaign." },
  { n: "02", name: "Try-on results", tag: "Person + garment", href: "/studio", d: "One photorealistic composition: your model wearing your product, pose and light preserved." },
  { n: "03", name: "Campaign edits", tag: "16:9 editorial", href: "/studio", d: "Editorial transformation with auto captions and hashtags, ready for Meta, TikTok and CRM." },
  { n: "04", name: "Brand stamp", tag: "Automatic", href: "/studio/brands", d: "Compass-star mark + wordmark composited on every output — identity travels with the asset." },
];

export default function AssetsPage() {
  return (
    <main className="landing">
      <CoverHeader />
      <section className="block">
        <div className="label">Assets — Generated with Muse Image</div>
        <h2 className="sec">Every asset,<br /><em>on-brand.</em></h2>
        <p className="lead">
          Product shots, try-on results and campaign edits — generated in the
          Studio and automatically stamped with the VyIQ × Nord Storia brand identity.
        </p>
        <div className="eco-rows">
          {types.map((t) => (
            <a className="eco-row" href={t.href} key={t.n} style={{ textDecoration: "none", color: "inherit" }}>
              <span className="eco-n">{t.n}</span>
              <div className="eco-body">
                <p className="eco-tag">{t.tag}</p>
                <h3>{t.name}</h3>
                <p>{t.d}</p>
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
