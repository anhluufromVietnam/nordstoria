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

export default function LandingPage() {
  return (
    <main className="landing">
      <header className="landing-nav">
        <a className="landing-brand" href="/">
          <span className="landing-mark" aria-hidden="true">✳</span>
          <span>VyIQ<span className="landing-brand-light"> AI Media Intelligence Studio</span></span>
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
        <p className="landing-eyebrow">★ Integrated AI Marketing &amp; Campaign Management Ecosystem</p>
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

      <footer className="landing-footer">
        <span>© VyIQ × Nord Storia 2026</span>
        <span>An intelligent creative experience — strategy → creative → execution → monitoring → optimisation.</span>
      </footer>
    </main>
  );
}
