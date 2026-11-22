import type { Metadata } from "next";
import { CoverHeader } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Ecosystem — VyIQ × Nord Storia",
  description: "Nord Storia, VyIQ AI, TVIQ Technology and Robotics & IoT — one ecosystem.",
};

const pillars = [
  { n: "01", name: "Nord Storia", tag: "Brand & Media Strategy", body: "Brand positioning, guidelines, communication strategy, campaign planning, creative direction, social, digital and performance marketing, media operations." },
  { n: "02", name: "VyIQ AI & Enterprise Solutions", tag: "Campaign Intelligence", body: "AI-powered campaign intelligence, workflow automation, business dashboards, knowledge management, performance analysis and intelligent recommendations." },
  { n: "03", name: "VyIQ × Nord Storia AI Studio", tag: "Generative AI", body: "Campaign concepts, branded visual production with Muse Image, creative adaptation and marketing content development." },
  { n: "04", name: "TVIQ Technology Solutions", tag: "Digital Platforms", body: "Digital platforms, enterprise applications, system integration and centralised operational management." },
  { n: "05", name: "Robotics & IoT", tag: "Connected Experiences", body: "Extend campaign experiences into physical retail, connected stores and interactive customer experiences." },
];

export default function EcosystemPage() {
  return (
    <main className="landing">
      <CoverHeader />
      <section className="block">
        <div className="label">An Integrated Ecosystem Across TVQ</div>
        <h2 className="sec">One ecosystem.<br /><em>Every capability.</em></h2>
        <p className="lead">
          Together, these capabilities create a unified approach to brand management
          and marketing operations — connecting strategy, creative production,
          execution, monitoring, experimentation and continuous improvement.
        </p>
        <div className="eco-rows">
          {pillars.map((p) => (
            <article className="eco-row" key={p.n}>
              <span className="eco-n">{p.n}</span>
              <div className="eco-body">
                <p className="eco-tag">{p.tag}</p>
                <h3>{p.name}</h3>
                <p>{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <footer className="cover-footer">
        <div className="footer-meta"><span>© VyIQ × Nord Storia 2026</span><span><a href="/">← Back to landing</a></span></div>
      </footer>
    </main>
  );
}
