"use client";

import { useEffect, useRef, useState } from "react";

const workflow = [
  { n: "01", t: "Pick your product", d: "Jacket, bag, sneakers…", img: "/Demo/Jacket.jpg" },
  { n: "02", t: "Describe the look", d: "One sentence is enough", img: "/campaigns/tokyo-night.jpg" },
  { n: "03", t: "Get the campaign", d: "Photo + caption, ready to post", img: "/campaigns/quiet-luxury.jpg" },
];

const collections = [
  { label: "Tokyo Night", tag: "Neon · cinematic", img: "/campaigns/tokyo-night.jpg", metric: "Live · 4 channels · +18%" },
  { label: "Urban Street", tag: "Raw · expressive", img: "/campaigns/urban-street.jpg", metric: "Planning · 3 creatives A/B" },
  { label: "Quiet Luxury", tag: "Soft · elevated", img: "/campaigns/quiet-luxury.jpg", metric: "Testing · +24% vs benchmark" },
  { label: "Summer Escape", tag: "Sunlit · free", img: "/campaigns/summer-escape.jpg", metric: "Live · localised per store" },
];

const tools = [
  { n: "01", t: "Product Screenshot", d: "Text to packshot. One sentence in, a studio photo out.", href: "/studio" },
  { n: "02", t: "Virtual Try-On", d: "Person + garment, one photorealistic photo.", href: "/studio" },
  { n: "03", t: "Campaign", d: "Concept, image and caption + hashtags in one click.", href: "/studio" },
  { n: "04", t: "Dashboard", d: "Performance, channels and AI recommendations.", href: "/studio/dashboard" },
  { n: "05", t: "Knowledge Base", d: "Search past campaigns. Reuse what worked.", href: "/studio/knowledge" },
];

const pillars = [
  { name: "Nord Storia", tag: "Brand & Media Strategy", body: "Brand positioning, guidelines, communication strategy, campaign planning, creative direction, social, digital and performance marketing, media operations." },
  { name: "VyIQ AI & Enterprise Solutions", tag: "Campaign Intelligence", body: "AI-powered campaign intelligence, workflow automation, business dashboards, knowledge management, performance analysis and intelligent recommendations." },
  { name: "VyIQ × Nord Storia AI Studio", tag: "Generative AI", body: "Campaign concepts, branded visual production with Muse Image, creative adaptation and marketing content development." },
  { name: "TVIQ Technology Solutions", tag: "Digital Platforms", body: "Digital platforms, enterprise applications, system integration and centralised operational management." },
  { name: "Robotics & IoT", tag: "Connected Experiences", body: "Extend campaign experiences into physical retail, connected stores and interactive customer experiences." },
];

const useCases = [
  {
    title: "Multi-brand & multi-product businesses",
    body: "One integrated ecosystem across brands, products, locations, segments and channels — brand guidelines translated into daily campaigns, creative production connected to performance execution.",
  },
  {
    title: "Retail & multi-location networks",
    body: "Centralised brand and campaign management while each store runs localised promotions. Compare stores, test messages, replicate what wins.",
  },
  {
    title: "Large enterprises",
    body: "Coordinated marketing across business units, products and segments. Built on TVQ's experience with Viettel IDC and Viettel Digital as operating references.",
  },
];

const index = [
  { n: "01", t: "Inside the studio", href: "#mock" },
  { n: "02", t: "The platform", href: "#platform" },
  { n: "03", t: "Ecosystem across TVQ", href: "#ecosystem" },
  { n: "04", t: "How it works", href: "#how" },
  { n: "05", t: "Collections", href: "#collections" },
  { n: "06", t: "Try the tools", href: "#tools" },
  { n: "07", t: "Book a demo", href: "#demo" },
];

function Star({ className = "" }: { className?: string }) {
  return (
    <svg className={`spin-star ${className}`} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path d="M50 4 58 42 96 50 58 58 50 96 42 58 4 50 42 42Z" fill="currentColor" />
    </svg>
  );
}

export default function LandingPage() {
  const [sent, setSent] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", company: "" });
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll(".reveal");
    if (!els?.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="landing" ref={rootRef}>
      <nav className="cover-nav" aria-label="Primary">
        <a className="cover-logo" href="/">
          <svg className="ns-mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><path d="M50 4 58 42 96 50 58 58 50 96 42 58 4 50 42 42Z" fill="currentColor"/><path d="M50 22 54 46 78 50 54 54 50 78 46 54 22 50 46 46Z" fill="#a8bfc9"/></svg>
          NORD STORIA<span className="cover-r">®</span>
        </a>
        <ul>
          <li><a href="#platform">Platform</a></li>
          <li><a href="#mock">Studio</a></li>
          <li><a href="#ecosystem">Ecosystem</a></li>
          <li><a href="#collections">Work</a></li>
          <li><a href="#demo">Demo</a></li>
        </ul>
        <a className="cover-cta" href="/studio">Launch Studio →</a>
      </nav>

      {/* Cover hero */}
      <header className="cover" id="top">
        <div className="cover-grid">
          <div className="cover-copy">
            <p className="cover-kicker reveal">VyIQ × Nord Storia — AI Media Intelligence Studio</p>
            <h1 className="reveal">
              Your product.<br /><em>One campaign.</em>
            </h1>
            <p className="cover-intro reveal">
              Upload a product, type a look — get a <b>campaign photo with caption in minutes</b>.
              No shoot, no agency, no templates.
            </p>
            <div className="cover-actions reveal">
              <a className="btn solid" href="/studio">Create yours →</a>
              <a className="btn ghost" href="#demo">Book a demo</a>
            </div>
            <div className="needs reveal">
              <p className="needs-k">What you get</p>
              <ul>
                <li>Product Screenshot</li>
                <li>Virtual Try-On</li>
                <li>Campaign</li>
                <li>Dashboard</li>
                <li>Knowledge Base</li>
              </ul>
            </div>
          </div>
          <figure className="cover-media reveal">
            <img src="/campaigns/tokyo-night.jpg" alt="Tokyo Night campaign — sculpted jacket under neon city light" />
            <span className="media-badge" aria-hidden="true">
              <Star />
            </span>
            <figcaption className="media-caption">
              <span>Tokyo Night — Live · 4 channels · +18%</span>
              <i>Made in VyIQ Studio</i>
            </figcaption>
          </figure>
        </div>
        <div className="cover-meta reveal">
          <div><span>Ecosystem</span>Integrated AI Marketing &amp; Campaign Management</div>
          <div><span>Engine</span>Muse Image (Meta) · Generative visual production</div>
          <div><span>Studio</span>VyIQ × Nord Storia — v2.0 · 2026</div>
        </div>
      </header>

      {/* Index */}
      <div className="landing-index reveal" aria-label="Page index">
        {index.map((i) => (
          <a href={i.href} key={i.n}><span className="t">{i.n} — {i.t}</span><span className="n">↗</span></a>
        ))}
      </div>

      {/* Marquee */}
      <div className="brand-marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k}>
              {"CREATE MANAGE MONITOR OPTIMISE —".split(" ").filter(Boolean).map((w, wi) => (
                <span key={wi}>{w}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* App UI simulation */}
      <section className="block" id="mock">
        <div className="label reveal">01 — Inside the studio</div>
        <h2 className="sec reveal">One workspace.<br /><em>Product to campaign.</em></h2>
        <p className="lead reveal">A live simulation of the studio — the real one runs at /studio with Muse Image behind it.</p>
        <div className="app-mock reveal" role="img" aria-label="Simulated VyIQ studio interface: sidebar navigation, product picker, generation controls and campaign stage">
          <div className="mock-chrome" aria-hidden="true">
            <span /><span /><span />
            <em>app.vyiq.studio</em>
          </div>
          <div className="mock-body">
            <div className="mock-sidebar" aria-hidden="true">
              <p className="mock-side-title">Workspace</p>
              {["Product", "Try-On", "Campaign", "Dashboard", "Knowledge"].map((item, i) => (
                <span className={i === 0 ? "mock-nav mock-nav-active" : "mock-nav"} key={item}>{item}</span>
              ))}
              <span className="mock-user">TVQ team</span>
            </div>
            <div className="mock-main" aria-hidden="true">
              <div className="mock-controls">
                <p className="mock-label">Product</p>
                <div className="mock-chips">
                  <span className="mock-chip mock-on">Jacket</span>
                  <span className="mock-chip">Bag</span>
                  <span className="mock-chip">Sneakers</span>
                </div>
                <p className="mock-label">Concept</p>
                <div className="mock-chips">
                  <span className="mock-chip mock-on">Tokyo Night</span>
                  <span className="mock-chip">Urban</span>
                  <span className="mock-chip">Luxury</span>
                </div>
                <p className="mock-label">Prompt</p>
                <p className="mock-prompt">Oversized jacket, neon city night, cinematic…</p>
                <span className="mock-generate">Generate campaign →</span>
              </div>
              <div className="mock-stage">
                <img src="/campaigns/urban-street.jpg" alt="" className="mock-stage-img" />
                <p className="mock-stage-tag">CAMPAIGN DRAFT · 9:16</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform narrative */}
      <section className="block dark" id="platform">
        <div className="label reveal">02 — The platform</div>
        <h2 className="sec reveal">Fragmented marketing,<br /><em>into one operation.</em></h2>
        <p className="lead reveal">
          VyIQ: AI Media Intelligence Studio is an AI-powered platform that helps businesses create,
          manage, monitor and optimise marketing campaigns in one integrated environment.
        </p>
        <div className="story-grid">
          <div className="story-col reveal">
            <p className="story-k">The problem</p>
            <p className="story-body">
              Businesses operate across multiple brands, products, locations, segments and channels.
              Yet marketing is often fragmented: brand guidelines are not consistently translated into
              daily campaigns, creative production is disconnected from performance execution, and
              monitoring relies on separate reports and manual coordination — so brand consistency
              slips, large campaigns are hard to coordinate, and performance never becomes improvement.
            </p>
          </div>
          <div className="story-col reveal">
            <p className="story-k">The approach</p>
            <p className="story-body">
              VyIQ connects the entire process — from brand strategy and communication planning to
              creative production, campaign execution, performance marketing, monitoring and
              optimisation. Guidelines, visual direction and campaign frameworks are translated into
              daily activity, so campaigns across products, channels, teams and locations stay aligned
              with one strategy.
            </p>
          </div>
          <div className="story-col reveal">
            <p className="story-k">Continuous optimisation</p>
            <p className="story-body">
              Beyond end-of-campaign reports: teams observe progress in real time, evaluate creative
              effectiveness, test audiences, messages, channels and promotions, and adjust direction
              based on measurable results. Historical insights are reused to improve future planning
              and reduce repetitive work.
            </p>
          </div>
          <div className="story-col reveal">
            <p className="story-k">The goal</p>
            <p className="story-body">
              Transform fragmented marketing into a consistent, measurable, continuously optimised
              operation — every brand, campaign, store and business unit working toward shared
              objectives, with a clear view of execution quality and business impact.
            </p>
          </div>
        </div>
      </section>

      {/* Ecosystem across TVQ */}
      <section className="block" id="ecosystem">
        <div className="label reveal">03 — An Integrated Ecosystem Across TVQ</div>
        <h2 className="sec reveal">One ecosystem.<br /><em>Every capability.</em></h2>
        <div className="eco-rows reveal">
          {pillars.map((p, i) => (
            <article className="eco-row" key={p.name}>
              <span className="eco-n">{String(i + 1).padStart(2, "0")}</span>
              <div className="eco-body">
                <p className="eco-tag">{p.tag}</p>
                <h3>{p.name}</h3>
                <p>{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="block" id="usecases">
        <div className="label reveal">04 — Who it serves</div>
        <h2 className="sec reveal">Built for<br /><em>complex operations.</em></h2>
        <div className="story-grid">
          {useCases.map((u) => (
            <div className="story-col reveal" key={u.title}>
              <p className="story-k">Use case</p>
              <h3 className="story-h">{u.title}</h3>
              <p className="story-body">{u.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="block dark" id="how">
        <div className="label reveal">05 — How it works</div>
        <h2 className="sec reveal">Three steps.<br /><em>Minutes, not weeks.</em></h2>
        <div className="workflow-grid">
          {workflow.map((s) => (
            <article className="workflow-card reveal" key={s.n}>
              <img src={s.img} alt="" loading="lazy" className="workflow-img" />
              <p className="workflow-n">{s.n}</p>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="block" id="collections">
        <div className="label reveal">06 — Made with VyIQ</div>
        <h2 className="sec reveal">Collections you can<br /><em>make today.</em></h2>
        <div className="visual-grid">
          {collections.map((c) => (
            <article className="visual-card reveal" key={c.label}>
              <img src={c.img} alt={`${c.label} — ${c.tag}`} className="visual-img" loading="lazy" />
              <div className="visual-copy">
                <p className="visual-label">{c.label} — {c.tag}</p>
                <h3 className="visual-title">{c.label}</h3>
                <p className="visual-metric">{c.metric}</p>
                <a className="visual-link" href="/studio">Make yours →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="block" id="tools">
        <div className="label reveal">07 — Try the tools</div>
        <h2 className="sec reveal">Five tools.<br /><em>One studio.</em></h2>
        <div className="tools-grid">
          {tools.map((t) => (
            <a className="tool reveal" key={t.n} href={t.href}>
              <span className="tool-cat">{t.n} — Live in studio</span>
              <h3>{t.t}</h3>
              <p>{t.d}</p>
              <span className="tool-cta">Open →</span>
            </a>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="block" id="metrics">
        <div className="label reveal">08 — Proof in numbers</div>
        <h2 className="sec reveal">Every campaign<br /><em>leaves a number.</em></h2>
        <div className="gates-grid">
          <div className="gate-card reveal"><p className="gnum">4</p><h3>Channels live per drop</h3><p className="who">Meta · TikTok · Google · CRM</p></div>
          <div className="gate-card reveal"><p className="gnum">+18–24%</p><h3>Lift vs benchmark</h3><p className="who">A/B tested creative variants</p></div>
          <div className="gate-card reveal"><p className="gnum">−60%</p><h3>Replay time</h3><p className="who">Knowledge base reuse</p></div>
          <div className="gate-card reveal"><p className="gnum">100%</p><h3>On-brand output</h3><p className="who">Guidelines enforced by Muse Image kit</p></div>
        </div>
      </section>

      {/* Demo signup */}
      <section className="block dark landing-signup" id="demo">
        <div className="signup-copy">
          <div className="label reveal">09 — Book a demo</div>
          <h2 className="sec reveal">See your product<br /><em>in a campaign.</em></h2>
          <p className="lead reveal">Bring one product. We run it through the studio live — you leave with a campaign concept and a plan to scale it.</p>
        </div>
        {sent ? (
          <div className="signup-done reveal" role="status">
            <p className="signup-done-title">✓ Request received</p>
            <p>We'll reach out at {lead.email || "your email"} within one working day.</p>
          </div>
        ) : (
          <form className="signup-form reveal" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <label>
              Name
              <input required value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} placeholder="Nguyễn An" autoComplete="name" />
            </label>
            <label>
              Work email
              <input required type="email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} placeholder="an@company.com" autoComplete="email" />
            </label>
            <label>
              Company
              <input value={lead.company} onChange={(e) => setLead({ ...lead, company: e.target.value })} placeholder="Company / brand" autoComplete="organization" />
            </label>
            <button type="submit" className="btn solid">Show me my campaign →</button>
            <p className="signup-fine">Or try the studio yourself: <a href="/studio">/studio</a></p>
          </form>
        )}
      </section>

      <section className="tagline-band tagline-band--light" aria-label="Tagline">
        <p className="tagline-big">Kể chuyện phương Bắc. <span>Bằng ngôn ngữ hiện đại.</span></p>
        <p className="tagline-en">Cold stories, told bright. — Nord Storia® thuộc Công ty Tâm Việt Quang</p>
      </section>

      <footer className="cover-footer">
        <a className="big-mail" href="mailto:hello@nordstoria.com">hello@nordstoria.com ↗</a>
        <div className="footer-meta">
          <span>© Nord Storia® · VyIQ 2026</span>
          <span>Strategy → creative → execution → optimisation.</span>
        </div>
      </footer>
    </main>
  );
}
