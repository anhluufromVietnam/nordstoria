import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VyIQ — AI Media Intelligence Studio",
  description:
    "VyIQ: AI Media Intelligence Studio. AI-powered platform to create, manage, monitor and optimize marketing campaigns in one integrated environment.",
};

const capabilities = [
  {
    title: "Creative Production",
    body: "Generative AI for campaign concepts, branded visual production, creative adaptation and marketing content — powered by Muse Image.",
  },
  {
    title: "Campaign Management",
    body: "Campaign concepts, creative direction, content production, social media, digital advertising, performance marketing and promotions — coordinated in one place.",
  },
  {
    title: "Performance Intelligence",
    body: "Consolidated campaign performance, AI-generated insights and recommendations, and measurable continuous optimisation — not just end-of-campaign reports.",
  },
  {
    title: "Brand Consistency",
    body: "Brand guidelines, communication principles, visual direction and campaign frameworks so every product, channel, team and location stays on-brand.",
  },
  {
    title: "Knowledge Base",
    body: "A searchable knowledge base from historical campaigns. Reuse what worked, reduce repetitive work, make faster data-driven decisions.",
  },
  {
    title: "Experimentation",
    body: "Test audiences, messages, channels and creatives — then adjust campaign direction based on measurable results.",
  },
];

const ecosystem = [
  {
    name: "Nord Storia",
    tag: "Brand & Media Strategy",
    body: "Brand positioning, guidelines, communication strategy, campaign planning, creative direction, social, digital and performance marketing, media operations.",
  },
  {
    name: "VyIQ AI & Enterprise Solutions",
    tag: "Campaign Intelligence",
    body: "AI-powered campaign intelligence, workflow automation, business dashboards, knowledge management, performance analysis and intelligent recommendations.",
  },
  {
    name: "VyIQ × Nord Storia AI Studio",
    tag: "Generative AI",
    body: "Campaign concepts, branded visual production with Muse Image, creative adaptation and marketing content development.",
  },
  {
    name: "TVIQ Technology Solutions",
    tag: "Digital Platforms",
    body: "Digital platforms, enterprise applications, system integration and centralised operational management.",
  },
  {
    name: "Robotics & IoT",
    tag: "Connected Experiences",
    body: "Extend campaign experiences into physical retail, connected stores and interactive customer experiences.",
  },
];

const useCases = [
  {
    title: "Multi-Brand & Multi-Product Businesses",
    body: "One integrated ecosystem across brands, products, locations, segments and channels.",
  },
  {
    title: "Retail & Multi-Location Networks",
    body: "Centralised brand and campaign management with localised store execution. Compare stores, test messages, replicate what wins.",
  },
  {
    title: "Large Enterprises",
    body: "Coordinated marketing across business units, products, services and customer segments — from telecom to technology at scale.",
  },
];

const campaigns = [
  { id: "tokyo", label: "01 — Tokyo Night", title: "Signature Drop", metric: "Live · 4 channels · +18%", note: "Neon · cinematic", caption: "Command the Tokyo Night in the sculpted jacket by VyIQ × Nord Storia AI Studio.", img: "/campaigns/tokyo-night.jpg" },
  { id: "urban", label: "02 — Urban Street", title: "Drop 02", metric: "Planning · 3 creatives A/B", note: "Raw · expressive", caption: "Own the city in motion with VyIQ × Nord Storia AI Studio sneakers.", img: "/campaigns/urban-street.jpg" },
  { id: "luxury", label: "03 — Quiet Luxury", title: "Core Collection", metric: "Testing · +24% vs benchmark", note: "Soft · elevated", caption: "True elegance whispers, never shouts. This necklace from VyIQ × Nord Storia AI Studio defines quiet power.", img: "/campaigns/quiet-luxury.jpg" },
  { id: "summer", label: "04 — Summer Escape", title: "Regional Rollout", metric: "Live · localised per store", note: "Sunlit · free", caption: "Own every escape with the perfect summer bag by VyIQ × Nord Storia AI Studio.", img: "/campaigns/summer-escape.jpg" },
];

export default function LandingPage() {
  return (
    <main className="landing">
      <header className="landing-nav">
        <a className="landing-brand" href="/">
          <svg className="ns-mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
            <g fill="none" stroke="currentColor" strokeWidth="4">
              <path d="M50 2 L50 98 M2 50 L98 50 M16 16 L84 84 M84 16 L16 84"/>
            </g>
            <circle cx="50" cy="50" r="10" fill="currentColor"/>
          </svg>
          <span className="ns-wordmark">NORD STORIA<sup>®</sup><small className="ns-sub">VYIQ AI STUDIO</small></span>
        </a>
        <nav className="landing-nav-links" aria-label="Primary">
          <a href="#capabilities">Capabilities</a>
          <a href="#ecosystem">Ecosystem</a>
          <a href="#usecases">Use cases</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <div className="landing-nav-cta">
          <a className="landing-btn landing-btn-ghost" href="/studio">Sign in</a>
          <a className="landing-btn landing-btn-dark" href="/studio">Launch Studio →</a>
        </div>
      </header>

      <section className="landing-hero">
        <p className="landing-eyebrow">Integrated AI Marketing &amp; Campaign Management Ecosystem</p>
        <h1>
          Create. Manage. Monitor.
          <br />
          <em>Optimise campaigns — in one place.</em>
        </h1>
        <p className="landing-lead">
          VyIQ: AI Media Intelligence Studio is an AI-powered platform that helps businesses
          create, manage, monitor and optimise marketing campaigns in one integrated
          environment. It automates creative production and media operations, consolidates
          campaign performance data, and uses AI to generate actionable insights and
          recommendations. It also builds a searchable knowledge base from historical
          campaigns — helping teams make faster, data-driven decisions and reduce reliance
          on fragmented agency workflows.
        </p>
        <div className="landing-hero-cta">
          <a className="landing-btn landing-btn-dark landing-btn-lg" href="/studio">Launch Studio →</a>
          <a className="landing-btn landing-btn-ghost landing-btn-lg" href="#ecosystem">Explore the ecosystem</a>
        </div>
        <p className="landing-note">Powered by Muse Image (Meta) for generative visual production.</p>
      </section>

      <section className="landing-visual" aria-label="Campaign visuals">
        <div className="visual-grid">
          {campaigns.map((c) => (
            <article className="visual-card" key={c.id}>
              <img src={c.img} alt={`${c.label} — ${c.title}`} className="visual-img" loading="lazy" />
              <div className="visual-copy">
                <p className="visual-label">{c.label}</p>
                <h3 className="visual-title">{c.title}</h3>
                <p className="visual-meta">{c.note}</p>
                <p className="visual-metric">{c.metric}</p>
                <p className="visual-caption">{c.caption}</p>
                <a className="visual-link" href="/studio">Mở campaign trong Studio →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section" id="capabilities">
        <p className="landing-kicker">Capabilities</p>
        <h2>Everything from strategy <em>to optimisation.</em></h2>
        <div className="landing-grid-3">
          {capabilities.map((c) => (
            <article className="landing-card" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-section-alt" id="ecosystem">
        <p className="landing-kicker">An Integrated Ecosystem Across TVQ</p>
        <h2>One ecosystem. <em>Every capability.</em></h2>
        <p className="landing-section-lead">
          Nord Storia strategy, VyIQ intelligence, the VyIQ × Nord Storia AI Studio,
          TVIQ technology, and Robotics &amp; IoT — combined into a unified approach to
          brand management and marketing operations.
        </p>
        <div className="landing-grid-3">
          {ecosystem.map((e) => (
            <article className="landing-card" key={e.name}>
              <p className="landing-card-tag">{e.tag}</p>
              <h3>{e.name}</h3>
              <p>{e.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section" id="usecases">
        <p className="landing-kicker">Use cases</p>
        <h2>Built for <em>complex operations.</em></h2>
        <div className="landing-grid-3">
          {useCases.map((u) => (
            <article className="landing-card" key={u.title}>
              <h3>{u.title}</h3>
              <p>{u.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-section-alt" id="pricing">
        <p className="landing-kicker">Getting started</p>
        <h2>From fragmented marketing <em>to a measurable operation.</em></h2>
        <p className="landing-section-lead">
          Launch the studio, generate your first campaign with Muse Image, and let every
          brand, campaign, store and business unit work toward shared objectives —
          with a clear view of execution quality and business impact.
        </p>
        <div className="landing-hero-cta">
          <a className="landing-btn landing-btn-dark landing-btn-lg" href="/studio">Start creating →</a>
          <a className="landing-btn landing-btn-ghost landing-btn-lg" href="/studio/dashboard">View dashboard</a>
        </div>
      </section>

      <div className="brand-marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>NORD STORIA</span><span>VYIQ AI STUDIO</span><span>COLD STORIES, TOLD BRIGHT</span>
          <span>NORD STORIA</span><span>VYIQ AI STUDIO</span><span>COLD STORIES, TOLD BRIGHT</span>
        </div>
      </div>

      <section className="tagline-band">
        <p className="tagline-big">Kể chuyện phương Bắc. <span>Bằng ngôn ngữ hiện đại.</span></p>
        <p className="tagline-en">Cold stories, told bright. — Nord Storia® thuộc Công ty Tâm Việt Quang</p>
      </section>

      <footer className="landing-footer landing-footer-big">
        <a className="big-mail" href="mailto:hello@nordstoria.com">hello@nordstoria.com ↗</a>
        <div className="footer-meta">
          <span>© Nord Storia® · VyIQ 2026</span>
          <span>An intelligent creative experience — strategy → creative → execution → monitoring → optimisation.</span>
          <span>Ý tưởng trước. Trang trí sau. · Made with intent, not templates.</span>
        </div>
      </footer>
    </main>
  );
}
