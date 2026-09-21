import Image from "next/image";
import LeadForm from "./components/LeadForm";
import TrackedLink from "./components/TrackedLink";
import JourneyExplorer from "./components/JourneyExplorer";
import HomeMotion from "./components/HomeMotion";
import TransformationBlueprint from "./components/TransformationBlueprint";
import { leadResponsePrice, productFaqs, transformationPartnershipPrice, waitlistProducts } from "./lib/product-catalog";
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
          <TrackedLink href="#contact" eventName="primary_contact_cta_click" eventProperties={{ location: "header" }} className="button button-small header-cta">Let’s talk <span aria-hidden="true">↗</span></TrackedLink>
          <details className="mobile-menu">
            <summary aria-label="Toggle navigation"><span className="menu-label">Menu</span><span className="menu-lines" aria-hidden="true" /></summary>
            <nav aria-label="Mobile navigation">
              <a href="#blueprint-service">The Blueprint <span aria-hidden="true">↗</span></a>
              <a href="#products">Our solutions <span aria-hidden="true">↗</span></a>
              <a href="#founder">Our perspective <span aria-hidden="true">↗</span></a>
              <a href="#process">How we work <span aria-hidden="true">↗</span></a>
              <a href="#faq">Your questions <span aria-hidden="true">↗</span></a>
              <a href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
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
              <TrackedLink href="#contact" eventName="primary_contact_cta_click" eventProperties={{ location: "hero" }} className="button">Discuss your business <span aria-hidden="true">↗</span></TrackedLink>
              <a href="#blueprint-service" className="text-link">Explore the Blueprint <span aria-hidden="true">↓</span></a>
            </div>
            <p className="hero-note">Business first. AI enabled. Results driven.</p>
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
          <p className="eyebrow" data-reveal="">01 / Where we can help</p>
          <div className="section-heading" data-reveal="">
            <h2 id="intro-title">AI is on your agenda.<br /><span className="muted-word">Your time is already full.</span></h2>
            <p>You know there is potential. Finding the right tools, testing them and making them work together takes time and ownership. We help turn that intention into a practical plan and agreed action.</p>
          </div>
          <div className="problem-grid">
            <article data-reveal=""><span className="problem-icon" aria-hidden="true">↗</span><h3>Too many possibilities.</h3><p>Which opportunities will help your business, and which can wait? Start with your priorities, workflows and team.</p><a className="text-link" href="#blueprint-service">Find a clear direction <span aria-hidden="true">↗</span></a></article>
            <article data-reveal=""><span className="problem-icon" aria-hidden="true">↔</span><h3>Another task on the list.</h3><p>Your people already have full workloads. Adoption needs dedicated attention, clear ownership and follow-through.</p><a className="text-link" href="#process">See how we work <span aria-hidden="true">↗</span></a></article>
            <article data-reveal=""><span className="problem-icon" aria-hidden="true">⌁</span><h3>Progress needs a partner.</h3><p>Bring in business understanding and practical AI support to help coordinate the work and keep improvements moving.</p><a className="text-link" href="#partnership">Explore ongoing support <span aria-hidden="true">↗</span></a></article>
          </div>
        </section>

        <TransformationBlueprint />

        <section id="process" className="section frame process" aria-labelledby="process-title">
          <div className="section-heading" data-reveal=""><div><p className="eyebrow">03 / From planning to progress</p><h2 id="process-title">Clarity first.<br /><span className="muted-word">Then progress.</span></h2></div><p>Begin with the Blueprint, implement agreed priorities and keep reviewing progress. Each stage has a clear scope, owner and fee.</p></div>
          <ol className="process-list">
            <li data-reveal=""><span className="process-index">01</span><div><h3>Assess and plan.</h3><p>The Blueprint establishes the business priorities, opportunities, expected costs and a phased implementation scope.</p></div></li>
            <li data-reveal=""><span className="process-index">02</span><div><h3>Implement agreed improvements.</h3><p>Approve a separately quoted project with defined deliverables, acceptance criteria, staff involvement and handover.</p></div></li>
            <li data-reveal=""><span className="process-index">03</span><div><h3>Support adoption and review.</h3><p>Continue through a separately scoped monthly partnership to coordinate priorities, support adoption and review results.</p></div></li>
          </ol>
          <div id="partnership" className="partnership-panel" data-reveal="">
            <div><p className="eyebrow">Ongoing AI transformation partnership</p><h3>A partner beyond the plan.</h3><p>Keep SSD involved as your external transformation lead. Agree the priorities, coordination, adoption support and review rhythm that your business needs.</p></div>
            <div><p className="partnership-price"><strong>From {transformationPartnershipPrice}<span>/month</span></strong></p><p className="partnership-terms">Optional monthly engagement. Scope, capacity and final fee agreed after discovery.</p><p>Implementation projects, third-party costs and routine technical care are scoped separately. Your team provides an internal decision-maker and agreed participation.</p><TrackedLink href="#contact" eventName="primary_contact_cta_click" eventProperties={{ location: "ongoing_partnership" }} className="text-link">Discuss ongoing support <span aria-hidden="true">↗</span></TrackedLink></div>
          </div>
          <div className="capability-strip"><div className="document-symbol" aria-hidden="true">SSD<span>↙</span></div><div><h3>A one-page introduction.</h3><p>Our services, working approach and contact details in one place.</p></div><TrackedLink href="/SSD-One-Page-Capability-Statement-v1.2.pdf" eventName="capability_statement_download" eventProperties={{ location: "capability_statement" }} className="text-link" download>Download capability statement <span aria-hidden="true">↓</span></TrackedLink></div>
        </section>

        <section id="founder" className="perspective-section" aria-labelledby="founder-title">
          <div className="frame perspective-layout">
            <div className="perspective-image" data-reveal=""><Image src="/images/ssd-workshop.webp" width={1536} height={1024} sizes="(max-width: 760px) 100vw, 47vw" alt="Illustrative workshop showing people arranging notes and mapping a workflow together." /><span className="image-label">A HUMAN-CENTRED APPROACH</span></div>
            <div className="perspective-copy" data-reveal=""><p className="eyebrow">04 / Business experience, applied</p><h2 id="founder-title">Technology should<br /><span className="muted-word">amplify people.</span></h2><p>Good transformation starts with understanding how a business actually runs. We connect commercial priorities with practical AI and process improvements.</p><p>Founder CW Lam brings company-wide leadership experience across sales and marketing, operations, finance, HR, team building and P&L.</p><div className="founder-signoff"><span className="founder-monogram">CW</span><div><strong>CW Lam</strong><span>Founder, Swift Sense Digital</span></div></div><div className="founder-facts"><div><strong>12 years</strong><span>Total professional experience</span></div><div><strong>40% YoY</strong><span>Growth delivered in a leadership role</span></div></div><p className="founder-qualification">General Manager · Master’s degree<br />Figures describe the founder’s professional experience.</p></div>
          </div>
        </section>

        <section id="products" className="services section" aria-labelledby="products-title">
          <div className="frame">
            <div className="section-heading" data-reveal="">
              <div><p className="eyebrow">05 / Individual solutions</p><h2 id="products-title">The right solution.<br /><span className="muted-word">For the right priority.</span></h2></div>
              <p>These solutions can support your transformation roadmap or solve a clear need on their own. You do not need to purchase a Blueprint first.</p>
            </div>
            <div className="service-list">
              <details id="website-service" className="service-item" open>
                <summary><span className="service-number">01</span><span className="service-name">Business Growth Website<small>A clearer path from interest to enquiry</small></span><span className="service-price">From S$1,500<small>7–10 working days</small></span><span className="disclosure" aria-hidden="true" /></summary>
                <div className="service-content"><p>A conversion-focused website for growing SMEs that need clearer positioning, stronger calls to action and a reliable enquiry journey.</p><ul><li>Clear offer structure</li><li>Mobile-first enquiry path</li><li>SEO and analytics foundations</li></ul><TrackedLink href="#contact" eventName="primary_contact_cta_click" eventProperties={{ location: "website_product" }} className="text-link">Discuss your website <span aria-hidden="true">↗</span></TrackedLink></div>
              </details>
              <details id="response-service" className="service-item" open>
                <summary><span className="service-number">02</span><span className="service-name">Lead Response System<small>More context. Better follow-up.</small></span><span className="service-price">From {leadResponsePrice}<small>15 working days</small></span><span className="disclosure" aria-hidden="true" /></summary>
                <div className="service-content"><p>A lead handling system designed to help your team capture enquiries, understand intent and respond with better context.</p><ul><li>Enquiry capture</li><li>Lead context</li><li>Response workflow</li></ul><TrackedLink href="#contact" eventName="primary_contact_cta_click" eventProperties={{ location: "response_product" }} className="text-link">Discuss your lead journey <span aria-hidden="true">↗</span></TrackedLink></div>
              </details>

            </div>
            <p className="scope-note">Starting prices and typical delivery timeframes are a guide. Final scope and fees are confirmed after discovery. WhatsApp is outside the Lead Response System’s base scope.</p>
            <div className="waitlist-heading" id="waitlist"><p className="eyebrow">In development / Join the waitlist</p><h3>What’s coming next.</h3><p>Two standalone products. Register your interest and we’ll contact you about availability.</p></div>
            <div className="waitlist-grid">
              {waitlistProducts.map((product) => (
                <article className="waitlist-card" key={product.slug} id={`${product.slug}-product`}>
                  <span className="waitlist-badge">Waitlist open</span>
                  <h3>{product.name}</h3>
                  <p className="waitlist-subtitle">{product.subtitle}</p>
                  <p>{product.description}</p>
                  <ul aria-label="Planned focus">{product.focus.map((item) => <li key={item}>{item}</li>)}</ul>
                  <p className="waitlist-price">From {product.price}</p>
                  <TrackedLink href={`/waitlist/${product.slug}`} eventName="waitlist_cta_click" eventProperties={{ product: product.slug, location: "products" }} className="button">Register for waitlist <span aria-hidden="true">↗</span><span className="sr-only"> for {product.name}</span></TrackedLink>
                  <p className="waitlist-note">In development. No launch date or access confirmed.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="journey" className="journey-section section" aria-labelledby="journey-title">
          <div className="frame journey-layout">
            <div className="journey-copy" data-reveal=""><p className="eyebrow">06 / One implementation example</p><h2 id="journey-title">From enquiry<br />to opportunity.</h2><p>Enquiry handling is one example of what an agreed implementation can improve. Your Blueprint may identify different priorities across the business.</p><p className="journey-instruction"><span aria-hidden="true">↗</span> Select a stage to explore the journey.</p><TrackedLink href="#contact" eventName="primary_contact_cta_click" eventProperties={{ location: "journey" }} className="text-link">Explore your bottleneck <span aria-hidden="true">↗</span></TrackedLink></div>
            <JourneyExplorer />
          </div>
        </section>

        <section id="concept-demos" className="section frame portfolio" aria-labelledby="portfolio-title">
          <div className="section-heading" data-reveal=""><div><p className="eyebrow">07 / Explore the possibilities</p><h2 id="portfolio-title">Different businesses.<br /><span className="muted-word">Distinct journeys.</span></h2></div><p>Explore five working concepts, each shaped around a different business and customer experience.</p></div>
          <p className="concept-disclaimer">Fictional concept demonstrations. These are not client projects, testimonials or evidence of client results.</p>
          <div className="featured-concepts">
            <TrackedLink className="concept-poster event-poster" href="https://ssd-events-demo.roylamcw.chatgpt.site" target="_blank" rel="noopener noreferrer" eventName="concept_demo_click" eventProperties={{ demo: "Luma Events", location: "portfolio" }} aria-label="Explore the Luma Events fictional concept (opens in a new tab)">
              <div className="poster-top"><span>EVENTS & EXPERIENCES</span><span>CONCEPT / 01</span></div>
              <div className="poster-title">Luma<span>Events.</span></div>
              <div className="poster-orbit" aria-hidden="true"><span /></div>
              <div className="poster-bottom"><p>From the first impression<br />to a structured event brief.</p><span className="round-arrow" aria-hidden="true">↗</span></div>
            </TrackedLink>
            <TrackedLink className="concept-poster learning-poster" href="https://ssd-tuition-demo.roylamcw.chatgpt.site" target="_blank" rel="noopener noreferrer" eventName="concept_demo_click" eventProperties={{ demo: "Brightward Learning", location: "portfolio" }} aria-label="Explore the Brightward Learning fictional concept (opens in a new tab)">
              <div className="poster-top"><span>TUITION & ENRICHMENT</span><span>CONCEPT / 02</span></div>
              <div className="poster-title">Brightward<span>Learning.</span></div>
              <div className="learning-lines" aria-hidden="true"><i /><i /><i /></div>
              <div className="poster-bottom"><p>From programme discovery<br />to a confident trial request.</p><span className="round-arrow" aria-hidden="true">↗</span></div>
            </TrackedLink>
          </div>
          <div className="concept-list">
            <TrackedLink href="https://ssd-restaurant-demo.roylamcw.chatgpt.site" target="_blank" rel="noopener noreferrer" eventName="concept_demo_click" eventProperties={{ demo: "Restaurant", location: "portfolio" }} className="concept-row"><span className="concept-index">03</span><span className="concept-name">Restaurant<small>F&B</small></span><span className="concept-journey">Discover · Decide · Reserve</span><span className="concept-open">Explore concept <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></span></TrackedLink>
            <TrackedLink href="https://ssd-staffing-demo.roylamcw.chatgpt.site" target="_blank" rel="noopener noreferrer" eventName="concept_demo_click" eventProperties={{ demo: "Part-Time Staffing", location: "portfolio" }} className="concept-row"><span className="concept-index">04</span><span className="concept-name">Part-Time Staffing<small>Staffing & recruitment</small></span><span className="concept-journey">Request · Match · Mobilise</span><span className="concept-open">Explore concept <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></span></TrackedLink>
            <TrackedLink href="https://ssd-property-demo.roylamcw.chatgpt.site" target="_blank" rel="noopener noreferrer" eventName="concept_demo_click" eventProperties={{ demo: "Property Investment", location: "portfolio" }} className="concept-row"><span className="concept-index">05</span><span className="concept-name">Property Investment<small>Property services</small></span><span className="concept-journey">Explore · Understand · Enquire</span><span className="concept-open">Explore concept <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></span></TrackedLink>
          </div>
          <div className="portfolio-next"><p>The most useful conversation starts with <strong>your business.</strong></p><TrackedLink href="#contact" eventName="primary_contact_cta_click" eventProperties={{ location: "portfolio" }} className="text-link">Discuss your customer journey <span aria-hidden="true">↗</span></TrackedLink></div>
        </section>

        <section id="faq" className="faq-section section" aria-labelledby="faq-title"><div className="frame faq-layout"><div><p className="eyebrow">08 / Before we begin</p><h2 id="faq-title">A few useful<br /><span className="muted-word">answers.</span></h2><a href="#contact" className="text-link">Have another question? <span aria-hidden="true">↗</span></a></div><div className="faq-list">
          {productFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span className="disclosure" aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}
        </div></div></section>

        <section id="contact" className="contact-section section" aria-labelledby="contact-title"><div className="frame contact-layout"><div className="contact-copy" data-reveal=""><p className="eyebrow">09 / Your next chapter</p><h2 id="contact-title">What could<br />work <span>better?</span></h2><p>Tell us what your business does, where time is being lost and what you want to improve. You do not need to know which AI tool or solution you need.</p><div className="contact-routes"><TrackedLink href="mailto:chunwai@swiftsensedigital.com" eventName="email_link_click" eventProperties={{ location: "contact" }}>chunwai@swiftsensedigital.com <span aria-hidden="true">↗</span></TrackedLink><TrackedLink href="https://wa.me/6592371516" target="_blank" rel="noopener noreferrer" eventName="whatsapp_link_click" eventProperties={{ location: "contact" }}>WhatsApp <span aria-hidden="true">↗</span></TrackedLink><a href="tel:+6592371516">+65 9237 1516 <span aria-hidden="true">↗</span></a></div><p className="contact-note">Prefer a conversation? Email, call or WhatsApp works too.</p></div><div className="contact-form-panel"><p className="eyebrow">Start a conversation</p><h3>Tell us a little about your business.</h3><LeadForm /></div></div></section>
      </main>
      <footer className="site-footer"><div className="frame"><div className="footer-top"><a href="#top" className="wordmark" aria-label="Swift Sense Digital home"><Image src="/images/ssd-brand-mark.webp" width={34} height={40} alt="" /><span>Swift Sense<small>DIGITAL</small></span></a><p>Your AI transformation partner<br />for growing SMEs</p><a href="https://www.linkedin.com/company/swiftsensedigital/" target="_blank" rel="noopener noreferrer" className="text-link">LinkedIn <span aria-hidden="true">↗</span></a><a href="#top" className="back-top" aria-label="Back to top">↑</a></div><div className="footer-motto">Unlock potential<span>.</span></div><div className="footer-bottom"><p>© 2026 Swift Sense Digital. All rights reserved.</p><nav aria-label="Footer navigation"><a href="#blueprint-service">Blueprint</a><a href="#products">Solutions</a><a href="#concept-demos">Concepts</a><a href="#founder">Founder</a><a href="#process">Process</a><a href="#faq">FAQ</a><a href="#contact">Contact</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/data-deletion">Data deletion</a></nav></div></div></footer>
    </div>
  );
}
