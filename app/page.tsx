import Image from "next/image";
import LeadForm from "./components/LeadForm";
import TrackedLink from "./components/TrackedLink";
import JourneyExplorer from "./components/JourneyExplorer";
import HomeMotion from "./components/HomeMotion";
import TransformationBlueprint from "./components/TransformationBlueprint";
import { blueprint, leadResponsePrice, productFaqs, transformationPartnershipPrice, waitlistProducts } from "./lib/product-catalog";
import { FAQSchema } from "./faq-schema";
import "./home.css";

export default function Home() {
  return (
    <div className="ssd-site" id="top">
      <HomeMotion />
      <FAQSchema />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className="site-header">
        <div className="frame header-inner">
          <a href="#top" className="wordmark" aria-label="Swift Sense Digital home">
            <Image src="/images/ssd-brand-mark.webp" width={34} height={40} alt="" />
            <span>Swift Sense<small>DIGITAL</small></span>
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#blueprint-service">The Blueprint</a>
            <a href="#products">Our solutions</a>
            <a href="#founder">Our perspective</a>
          </nav>
          <TrackedLink href="#contact" eventName="primary_contact_cta_click" eventProperties={{ location: "header" }} className="button button-small header-cta">Discuss your AI priorities <span aria-hidden="true">↗</span></TrackedLink>
          <details className="mobile-menu">
            <summary aria-label="Toggle navigation"><span className="menu-label">Menu</span><span className="menu-lines" aria-hidden="true" /></summary>
            <nav aria-label="Mobile navigation">
              <a href="#blueprint-service">The Blueprint <span aria-hidden="true">↗</span></a>
              <a href="#products">Our solutions <span aria-hidden="true">↗</span></a>
              <a href="#founder">Our perspective <span aria-hidden="true">↗</span></a>
              <a href="#process">How we work <span aria-hidden="true">↗</span></a>
              <a href="#faq">Your questions <span aria-hidden="true">↗</span></a>
              <a href="#contact">Discuss your AI priorities <span aria-hidden="true">↗</span></a>
            </nav>
          </details>
        </div>
      </header>

      <main id="main-content">
        <section className="hero frame" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="status-dot" /> Your AI transformation partner</p>
            <h1 id="hero-title">Focus on your<br />business.<br /><span>Move forward<br />with AI.</span></h1>
            <p className="hero-description">We help SMEs assess, plan and implement practical AI improvements—with less research, trial and error, and coordination falling on you.</p>
            <div className="hero-actions">
              <TrackedLink href="#contact" eventName="primary_contact_cta_click" eventProperties={{ location: "hero" }} className="button">Discuss your AI priorities <span aria-hidden="true">↗</span></TrackedLink>
              <a href="#blueprint-service" className="text-link">Explore the Blueprint <span aria-hidden="true">↓</span></a>
            </div>
            <p className="hero-note">Led by CW Lam · Experience across business, operations and finance.</p>
          </div>
          <div className="hero-art">
            <div className="art-caption"><span>THE SPACE TO GROW</span><span aria-hidden="true">↗</span></div>
            <Image className="sculpture-image" src="/images/ssd-unlock-sculpture.webp" width={1122} height={1402} sizes="(max-width: 760px) 100vw, 49vw" preload alt="Ivory and blue architectural ribbons opening into an arch, representing unlocked potential." />
            <div className="art-signature"><span className="tiny-cross" aria-hidden="true">+</span><span>Unlock<br /><strong>potential.</strong></span><span className="signature-line" aria-hidden="true" /></div>
          </div>
        </section>
        <div className="promise-strip frame" aria-label="Our focus">
          <p>From a clear direction<br /><strong>to practical progress.</strong></p>
          <a href="#blueprint-service"><span>01</span> Plan your transformation <span className="strip-arrow" aria-hidden="true">↗</span></a>
          <a href="#products"><span>02</span> Implement the priorities <span className="strip-arrow" aria-hidden="true">↗</span></a>
          <a href="#partnership"><span>03</span> Keep moving forward <span className="strip-arrow" aria-hidden="true">↗</span></a>
        </div>

        <section className="section frame introduction" aria-labelledby="intro-title">
          <p className="eyebrow" data-reveal="">01 / Start with the work</p>
          <div className="section-heading" data-reveal="">
            <h2 id="intro-title">Where does your<br /><span className="muted-word">team lose time?</span></h2>
            <p>Across industries, recurring work can absorb the time needed to grow. These are possible starting points; your priorities come from discovery.</p>
          </div>
          <div className="problem-grid">
            <article data-reveal=""><span className="problem-icon" aria-hidden="true">01</span><h3>Preparing the same reports.</h3><p>Explore drafting routine summaries from agreed data, with source checks and a person approving the final report.</p></article>
            <article data-reveal=""><span className="problem-icon" aria-hidden="true">02</span><h3>Finding internal answers.</h3><p>Explore easier access to approved procedures and company knowledge, with clear ownership and access controls.</p></article>
            <article data-reveal=""><span className="problem-icon" aria-hidden="true">03</span><h3>Following up enquiries.</h3><p>Explore consistent capture, qualification and handoff so the right person receives the context to respond.</p></article>
          </div>
        </section>

        <TransformationBlueprint />

        <section id="process" className="section frame process" aria-labelledby="process-title">
          <div className="section-heading" data-reveal=""><div><p className="eyebrow">03 / From planning to progress</p><h2 id="process-title">Clarity first.<br /><span className="muted-word">Then progress.</span></h2></div><p>Choose the stages your business needs. Each has a separate scope and fee; individual solutions are also available directly.</p></div>
          <ol className="process-list">
            <li data-reveal=""><span className="process-index">01</span><div><h3>Assess and plan.</h3><p className="process-fee">From {blueprint.price} one-off</p><p>The Blueprint sets priorities, expected costs and an implementation-ready scope.</p></div></li>
            <li data-reveal=""><span className="process-index">02</span><div><h3>Implement agreed improvements.</h3><p className="process-fee">Quoted by project</p><p>Build the agreed improvements, with clear acceptance criteria, staff involvement and handover.</p></div></li>
            <li data-reveal=""><span className="process-index">03</span><div><h3>Support adoption and review.</h3><p className="process-fee">From {transformationPartnershipPrice}/month</p><p>Choose an optional partnership for coordination, adoption support and progress reviews.</p></div></li>
          </ol>
          <div id="partnership" className="partnership-panel" data-reveal="">
            <div><p className="eyebrow">Ongoing AI transformation partnership</p><h3>A partner beyond the plan.</h3><p>Keep SSD involved as your external transformation lead. Agree the priorities, coordination, adoption support and review rhythm that your business needs.</p></div>
            <div><p className="partnership-price"><strong>From {transformationPartnershipPrice}<span>/month</span></strong></p><p className="partnership-terms">Optional monthly engagement. Scope, capacity and final fee agreed after discovery.</p><p>Implementation projects, third-party costs and routine technical care are scoped separately. Your team provides an internal decision-maker and agreed participation.</p><TrackedLink href="#contact" eventName="primary_contact_cta_click" eventProperties={{ location: "ongoing_partnership" }} className="text-link">Discuss your AI priorities <span aria-hidden="true">↗</span></TrackedLink></div>
          </div>
          <div className="capability-strip"><div className="document-symbol" aria-hidden="true">SSD<span>↙</span></div><div><h3>A one-page introduction.</h3><p>Our services, working approach and contact details in one place.</p></div><TrackedLink href="/SSD-One-Page-Capability-Statement-v1.2.pdf" eventName="capability_statement_download" eventProperties={{ location: "capability_statement" }} className="text-link" download>Download capability statement <span aria-hidden="true">↓</span></TrackedLink></div>
        </section>

        <section id="founder" className="perspective-section" aria-labelledby="founder-title">
          <div className="frame founder-layout">
            <div className="founder-intro" data-reveal="">
              <p className="eyebrow">04 / The person behind SSD</p>
              <h2 id="founder-title">Business experience.<br /><span className="muted-word">Personal ownership.</span></h2>
              <div className="founder-signoff"><span className="founder-monogram">CW</span><div><strong>CW Lam</strong><span>Founder, Swift Sense Digital</span></div></div>
              <p>My interest in AI starts with the realities of running a business: serving clients, organising people, managing costs and making improvements stick.</p>
              <p>I bring that operating perspective to SSD, helping you decide where AI is useful and what it will take to put it to work.</p>
              <p className="founder-qualification">12 years of professional experience · General management · Master’s degree</p>
            </div>
            <div className="founder-experience" data-reveal="">
              <p className="eyebrow">Selected experience / Event Secret Service</p>
              <article><span>01 / Commercial priorities</span><h3>Reconnect growth with delivery.</h3><p>As General Manager, CW reviewed three years of client and revenue history, re-engaged key clients and expanded services into new verticals, alongside strengthening the capacity to deliver.</p></article>
              <article><span>02 / People and processes</span><h3>Build the organisation behind the work.</h3><p>CW helped rebuild the company structure, recruit team members and rework operating processes, connecting commercial activity with the people and support needed for execution.</p></article>
              <article><span>03 / Financial oversight</span><h3>Bring costs into the decision.</h3><p>Alongside wider management responsibilities, CW took a hands-on role in finance and P&amp;L management, bringing commercial and operational considerations into the same conversation.</p></article>
              <p className="experience-note">These examples describe CW’s management experience at Event Secret Service. They are not SSD client engagements or claims of AI-generated results.</p>
            </div>
          </div>
        </section>

        <section id="products" className="services section" aria-labelledby="products-title">
          <div className="frame">
            <div className="section-heading" data-reveal="">
              <div><p className="eyebrow">05 / Individual solutions</p><h2 id="products-title">The right solution.<br /><span className="muted-word">For the right priority.</span></h2></div>
              <p>These solutions can support your transformation roadmap or solve a clear need on their own. You do not need to purchase a Blueprint first.</p>
            </div>
            <div className="service-list">
              <details id="website-service" className="service-item">
                <summary><span className="service-number">01</span><span className="service-name">Business Growth Website<small>A clearer path from interest to enquiry</small></span><span className="service-price">From S$1,500<small>7–10 working days</small></span><span className="disclosure" aria-hidden="true" /></summary>
                <div className="service-content"><p>A conversion-focused website for growing SMEs that need clearer positioning, stronger calls to action and a reliable enquiry journey.</p><ul><li>Clear offer structure</li><li>Mobile-first enquiry path</li><li>SEO and analytics foundations</li></ul><TrackedLink href="#contact" eventName="primary_contact_cta_click" eventProperties={{ location: "website_product" }} className="text-link">Discuss your website <span aria-hidden="true">↗</span></TrackedLink></div>
              </details>
              <details id="response-service" className="service-item">
                <summary><span className="service-number">02</span><span className="service-name">Lead Response System<small>More context. Better follow-up.</small></span><span className="service-price">From {leadResponsePrice}<small>15 working days</small></span><span className="disclosure" aria-hidden="true" /></summary>
                <div className="service-content"><p>A lead handling system designed to help your team capture enquiries, understand intent and respond with better context.</p><ul><li>Enquiry capture</li><li>Lead context</li><li>Response workflow</li></ul><div className="solution-demo"><p className="eyebrow">Explore an illustrative enquiry journey</p><JourneyExplorer /></div><TrackedLink href="#contact" eventName="primary_contact_cta_click" eventProperties={{ location: "response_product" }} className="text-link">Discuss your lead journey <span aria-hidden="true">↗</span></TrackedLink></div>
              </details>

            </div>
            <p className="scope-note">Starting prices and typical delivery timeframes are a guide. Final scope and fees are confirmed after discovery. WhatsApp is outside the Lead Response System’s base scope.</p>
            <div className="waitlist-heading" id="waitlist"><p className="eyebrow">In development / Waitlist open</p><p>Register interest in these standalone products. No launch date or access is confirmed.</p></div>
            <div className="waitlist-compact">
              {waitlistProducts.map((product) => (
                <article className="waitlist-row" key={product.slug} id={`${product.slug}-product`}>
                  <div><h3>{product.name}</h3><p>{product.subtitle}</p></div>
                  <p className="waitlist-row-price">From {product.price}</p>
                  <TrackedLink href={`/waitlist/${product.slug}`} eventName="waitlist_cta_click" eventProperties={{ product: product.slug, location: "products" }} className="text-link">Join waitlist <span aria-hidden="true">↗</span><span className="sr-only"> for {product.name}</span></TrackedLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="concept-demos" className="section frame portfolio compact-portfolio" aria-labelledby="portfolio-title">
          <div className="section-heading" data-reveal=""><div><p className="eyebrow">06 / Selected website concepts</p><h2 id="portfolio-title">Explore the<br /><span className="muted-word">possibilities.</span></h2></div><p>Working demonstrations of individual solutions. Fictional concepts, not client projects or evidence of results.</p></div>
          <div className="concept-list">
            <TrackedLink href="https://ssd-events-demo.roylamcw.chatgpt.site" target="_blank" rel="noopener noreferrer" eventName="concept_demo_click" eventProperties={{ demo: "Luma Events", location: "portfolio" }} className="concept-row"><span className="concept-index">01</span><span className="concept-name">Luma Events<small>Events &amp; experiences</small></span><span className="concept-journey">Discover · Enquire · Brief</span><span className="concept-open">Explore concept <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></span></TrackedLink>
            <TrackedLink href="https://ssd-tuition-demo.roylamcw.chatgpt.site" target="_blank" rel="noopener noreferrer" eventName="concept_demo_click" eventProperties={{ demo: "Brightward Learning", location: "portfolio" }} className="concept-row"><span className="concept-index">02</span><span className="concept-name">Brightward Learning<small>Tuition &amp; enrichment</small></span><span className="concept-journey">Explore · Compare · Trial</span><span className="concept-open">Explore concept <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></span></TrackedLink>
          </div>
          <details className="more-concepts"><summary>Three more concepts <span className="disclosure" aria-hidden="true" /></summary><div className="more-concepts-links">
            <TrackedLink href="https://ssd-restaurant-demo.roylamcw.chatgpt.site" target="_blank" rel="noopener noreferrer" eventName="concept_demo_click" eventProperties={{ demo: "Restaurant", location: "portfolio" }} className="text-link">Restaurant <span aria-hidden="true">↗</span><span className="sr-only"> fictional concept (opens in a new tab)</span></TrackedLink>
            <TrackedLink href="https://ssd-staffing-demo.roylamcw.chatgpt.site" target="_blank" rel="noopener noreferrer" eventName="concept_demo_click" eventProperties={{ demo: "Part-Time Staffing", location: "portfolio" }} className="text-link">Part-Time Staffing <span aria-hidden="true">↗</span><span className="sr-only"> fictional concept (opens in a new tab)</span></TrackedLink>
            <TrackedLink href="https://ssd-property-demo.roylamcw.chatgpt.site" target="_blank" rel="noopener noreferrer" eventName="concept_demo_click" eventProperties={{ demo: "Property Investment", location: "portfolio" }} className="text-link">Property Investment <span aria-hidden="true">↗</span><span className="sr-only"> fictional concept (opens in a new tab)</span></TrackedLink>
          </div></details>
        </section>

        <section id="faq" className="faq-section section" aria-labelledby="faq-title"><div className="frame faq-layout"><div><p className="eyebrow">07 / Before we begin</p><h2 id="faq-title">A few useful<br /><span className="muted-word">answers.</span></h2><a href="#contact" className="text-link">Have another question? <span aria-hidden="true">↗</span></a></div><div className="faq-list">
          {productFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span className="disclosure" aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}
        </div></div></section>

        <section id="contact" className="contact-section section" aria-labelledby="contact-title"><div className="frame contact-layout"><div className="contact-copy" data-reveal=""><p className="eyebrow">08 / Your next step</p><h2 id="contact-title">What could<br />work <span>better?</span></h2><p>Start with one business bottleneck. You do not need to choose a tool or know the solution.</p><ol className="contact-next"><li><strong>Share the context.</strong><span>Tell CW what takes time and what you would like to improve.</span></li><li><strong>Discuss the priorities.</strong><span>Explore the workflow, your team’s capacity and whether SSD can help.</span></li><li><strong>Agree the next step.</strong><span>Review a proposed scope and fee before committing to an engagement.</span></li></ol><div className="contact-routes"><TrackedLink href="mailto:chunwai@swiftsensedigital.com" eventName="email_link_click" eventProperties={{ location: "contact" }}>chunwai@swiftsensedigital.com <span aria-hidden="true">↗</span></TrackedLink><TrackedLink href="https://wa.me/6592371516" target="_blank" rel="noopener noreferrer" eventName="whatsapp_link_click" eventProperties={{ location: "contact" }}>WhatsApp <span aria-hidden="true">↗</span></TrackedLink><a href="tel:+6592371516">+65 9237 1516 <span aria-hidden="true">↗</span></a></div><p className="contact-note">Prefer a conversation? Email, call or WhatsApp works too.</p></div><div className="contact-form-panel"><p className="eyebrow">Start a conversation</p><h3>What is slowing your business down?</h3><LeadForm compact /></div></div></section>
      </main>
      <footer className="site-footer"><div className="frame"><div className="footer-top"><a href="#top" className="wordmark" aria-label="Swift Sense Digital home"><Image src="/images/ssd-brand-mark.webp" width={34} height={40} alt="" /><span>Swift Sense<small>DIGITAL</small></span></a><p>Your AI transformation partner<br />for growing SMEs</p><a href="https://www.linkedin.com/company/swiftsensedigital/" target="_blank" rel="noopener noreferrer" className="text-link">LinkedIn <span aria-hidden="true">↗</span></a><a href="#top" className="back-top" aria-label="Back to top">↑</a></div><div className="footer-motto">Unlock potential<span>.</span></div><div className="footer-bottom"><p>© 2026 Swift Sense Digital. All rights reserved.</p><nav aria-label="Footer navigation"><a href="#blueprint-service">Blueprint</a><a href="#products">Solutions</a><a href="#concept-demos">Concepts</a><a href="#founder">Founder</a><a href="#process">Process</a><a href="#faq">FAQ</a><a href="#contact">Contact</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/data-deletion">Data deletion</a></nav></div></div></footer>
    </div>
  );
}
