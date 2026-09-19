import Image from "next/image";
import LeadForm from "./components/LeadForm";
import TrackedLink from "./components/TrackedLink";
import JourneyExplorer from "./components/JourneyExplorer";
import HomeMotion from "./components/HomeMotion";
import { leadResponsePrice, productFaqs, waitlistProducts } from "./lib/product-catalog";
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
            <a href="#products">What we do</a>
            <a href="#concept-demos">Explore concepts</a>
            <a href="#founder">Our perspective</a>
          </nav>
          <TrackedLink href="#contact" eventName="primary_contact_cta_click" eventProperties={{ location: "header" }} className="button button-small header-cta">Let’s talk <span aria-hidden="true">↗</span></TrackedLink>
          <details className="mobile-menu">
            <summary aria-label="Toggle navigation"><span className="menu-label">Menu</span><span className="menu-lines" aria-hidden="true" /></summary>
            <nav aria-label="Mobile navigation">
              <a href="#products">What we do <span aria-hidden="true">↗</span></a>
              <a href="#concept-demos">Explore concepts <span aria-hidden="true">↗</span></a>
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
            <p className="eyebrow hero-eyebrow"><span className="status-dot" /> AI transformation for growing SMEs</p>
            <h1 id="hero-title">Business first.<br /><span>AI enabled.</span><br />Results driven.</h1>
            <p className="hero-description">Unlock your business’s potential through practical AI, better systems and modern technology.</p>
            <div className="hero-actions">
              <TrackedLink href="#contact" eventName="primary_contact_cta_click" eventProperties={{ location: "hero" }} className="button">Start a conversation <span aria-hidden="true">↗</span></TrackedLink>
              <a href="#products" className="text-link">Explore what we do <span aria-hidden="true">↓</span></a>
            </div>
            <p className="hero-note">A clearer direction. A practical next step.</p>
          </div>
          <div className="hero-art">
            <div className="art-caption"><span>THE SPACE TO GROW</span><span aria-hidden="true">↗</span></div>
            <Image className="sculpture-image" src="/images/ssd-unlock-sculpture.webp" width={1122} height={1402} sizes="(max-width: 760px) 100vw, 49vw" preload alt="Ivory and blue architectural ribbons opening into an arch, representing unlocked potential." />
            <div className="art-signature"><span className="tiny-cross" aria-hidden="true">+</span><span>Unlock<br /><strong>potential.</strong></span><span className="signature-line" aria-hidden="true" /></div>
          </div>
        </section>
        <div className="promise-strip frame" aria-label="Our focus">
          <p>Built around your next<br /><strong>business improvement.</strong></p>
          <a href="#products"><span>01</span> Clearer websites <span className="strip-arrow" aria-hidden="true">↗</span></a>
          <a href="#journey"><span>02</span> Better lead journeys <span className="strip-arrow" aria-hidden="true">↗</span></a>
          <a href="#process"><span>03</span> More useful systems <span className="strip-arrow" aria-hidden="true">↗</span></a>
        </div>

        <section className="section frame introduction" aria-labelledby="intro-title">
          <p className="eyebrow" data-reveal="">01 / Where we can help</p>
          <div className="section-heading" data-reveal="">
            <h2 id="intro-title">Good businesses have<br /><span className="muted-word">room to grow.</span></h2>
            <p>Sometimes the next step is a clearer website. Sometimes it is a faster response or a better way of working. We start with what is holding your business back.</p>
          </div>
          <div className="problem-grid">
            <article data-reveal=""><span className="problem-icon" aria-hidden="true">↗</span><h3>Interest without enquiries.</h3><p>Your website needs a clear offer and a simple path from browsing to a useful conversation.</p><a className="text-link" href="#website-service">Make the next step clear <span aria-hidden="true">↗</span></a></article>
            <article data-reveal=""><span className="problem-icon" aria-hidden="true">↔</span><h3>Leads losing momentum.</h3><p>Enquiries need context and a clear follow-up process, so opportunities do not sit waiting in an inbox.</p><a className="text-link" href="#response-service">Improve the enquiry journey <span aria-hidden="true">↗</span></a></article>
            <article data-reveal=""><span className="problem-icon" aria-hidden="true">⌁</span><h3>Ideas without a direction.</h3><p>Technology becomes useful when it fits your priorities, your budget and your team’s capacity.</p><a className="text-link" href="#blueprint-service">Find a practical starting point <span aria-hidden="true">↗</span></a></article>
          </div>
        </section>

        <section id="products" className="services section" aria-labelledby="products-title">
          <div className="frame">
            <div className="section-heading" data-reveal="">
              <div><p className="eyebrow">02 / What we do</p><h2 id="products-title">Practical ways<br /><span className="muted-word">to move forward.</span></h2></div>
              <p>Start with the improvement your business needs most. Expand when the first useful system is working.</p>
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
              <details id="blueprint-service" className="service-item" open>
                <summary><span className="service-number">03</span><span className="service-name">Transformation Blueprint<small>Turn business priorities into a practical roadmap</small></span><span className="service-price">From S$8,000<small>Four weeks</small></span><span className="disclosure" aria-hidden="true" /></summary>
                <div className="service-content"><p>A practical business review that identifies where AI, systems and process improvements can create measurable operational value.</p><ul><li>Business priorities</li><li>Operational bottlenecks</li><li>Practical roadmap</li></ul><TrackedLink href="#contact" eventName="primary_contact_cta_click" eventProperties={{ location: "blueprint_product" }} className="text-link">Discuss your priorities <span aria-hidden="true">↗</span></TrackedLink></div>
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
            <div className="journey-copy" data-reveal=""><p className="eyebrow">03 / What better can look like</p><h2 id="journey-title">From enquiry<br />to opportunity.</h2><p>See how a clearer customer journey can connect interest, context and human follow-up.</p><p className="journey-instruction"><span aria-hidden="true">↗</span> Select a stage to explore the journey.</p><TrackedLink href="#contact" eventName="primary_contact_cta_click" eventProperties={{ location: "journey" }} className="text-link">Explore your bottleneck <span aria-hidden="true">↗</span></TrackedLink></div>
            <JourneyExplorer />
          </div>
        </section>

        <section id="concept-demos" className="section frame portfolio" aria-labelledby="portfolio-title">
          <div className="section-heading" data-reveal=""><div><p className="eyebrow">04 / Explore the possibilities</p><h2 id="portfolio-title">Different businesses.<br /><span className="muted-word">Distinct journeys.</span></h2></div><p>Explore five working concepts, each shaped around a different business and customer experience.</p></div>
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

        <section id="founder" className="perspective-section" aria-labelledby="founder-title">
          <div className="frame perspective-layout">
            <div className="perspective-image" data-reveal=""><Image src="/images/ssd-workshop.webp" width={1536} height={1024} sizes="(max-width: 760px) 100vw, 47vw" alt="Illustrative workshop showing people arranging notes and mapping a workflow together." /><span className="image-label">A HUMAN-CENTRED APPROACH</span></div>
            <div className="perspective-copy" data-reveal=""><p className="eyebrow">05 / Our perspective</p><h2 id="founder-title">Technology should<br /><span className="muted-word">amplify people.</span></h2><p>Swift Sense Digital is built around a simple belief: start with the commercial problem, then apply technology where it is useful.</p><p>Founder CW Lam brings company-wide leadership experience across sales and marketing, operations, finance, HR, team building and P&L.</p><div className="founder-signoff"><span className="founder-monogram">CW</span><div><strong>CW Lam</strong><span>Founder, Swift Sense Digital</span></div></div><div className="founder-facts"><div><strong>12 years</strong><span>Total professional experience</span></div><div><strong>40% YoY</strong><span>Growth delivered in a leadership role</span></div></div><p className="founder-qualification">General Manager · Master’s degree<br />Figures describe the founder’s professional experience.</p></div>
          </div>
        </section>

        <section id="process" className="section frame process" aria-labelledby="process-title">
          <div className="section-heading" data-reveal=""><div><p className="eyebrow">06 / How we work</p><h2 id="process-title">Clarity first.<br /><span className="muted-word">Then progress.</span></h2></div><p>Keep the work focused on what will help the business move forward. Build around the team, and improve with real feedback.</p></div>
          <ol className="process-list"><li data-reveal=""><span className="process-index">01</span><div><h3>Understand.</h3><p>Review the business objective, current customer journey and where the team is losing time or opportunities.</p></div></li><li data-reveal=""><span className="process-index">02</span><div><h3>Prioritise.</h3><p>Choose the product and scope that best supports revenue, delivery reliability and customer experience.</p></div></li><li data-reveal=""><span className="process-index">03</span><div><h3>Build and improve.</h3><p>Implement the agreed system, measure the enquiry journey and refine based on real customer feedback.</p></div></li></ol>
          <div className="capability-strip"><div className="document-symbol" aria-hidden="true">SSD<span>↙</span></div><div><h3>A one-page introduction.</h3><p>Our services, working approach and contact details in one place.</p></div><TrackedLink href="/SSD-One-Page-Capability-Statement-v1.2.pdf" eventName="capability_statement_download" eventProperties={{ location: "capability_statement" }} className="text-link" download>Download capability statement <span aria-hidden="true">↓</span></TrackedLink></div>
        </section>

        <section id="faq" className="faq-section section" aria-labelledby="faq-title"><div className="frame faq-layout"><div><p className="eyebrow">07 / Before we begin</p><h2 id="faq-title">A few useful<br /><span className="muted-word">answers.</span></h2><a href="#contact" className="text-link">Have another question? <span aria-hidden="true">↗</span></a></div><div className="faq-list">
          {productFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span className="disclosure" aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}
        </div></div></section>

        <section id="contact" className="contact-section section" aria-labelledby="contact-title"><div className="frame contact-layout"><div className="contact-copy" data-reveal=""><p className="eyebrow">08 / Your next chapter</p><h2 id="contact-title">What could<br />work <span>better?</span></h2><p>Tell us where your business is heading and what is getting in the way. We’ll help you find a practical next step.</p><div className="contact-routes"><TrackedLink href="mailto:chunwai@swiftsensedigital.com" eventName="email_link_click" eventProperties={{ location: "contact" }}>chunwai@swiftsensedigital.com <span aria-hidden="true">↗</span></TrackedLink><TrackedLink href="https://wa.me/6592371516" target="_blank" rel="noopener noreferrer" eventName="whatsapp_link_click" eventProperties={{ location: "contact" }}>WhatsApp <span aria-hidden="true">↗</span></TrackedLink><a href="tel:+6592371516">+65 9237 1516 <span aria-hidden="true">↗</span></a></div><p className="contact-note">Prefer a conversation? Email, call or WhatsApp works too.</p></div><div className="contact-form-panel"><p className="eyebrow">Start a conversation</p><h3>Tell us a little about your business.</h3><LeadForm /></div></div></section>
      </main>
      <footer className="site-footer"><div className="frame"><div className="footer-top"><a href="#top" className="wordmark" aria-label="Swift Sense Digital home"><Image src="/images/ssd-brand-mark.webp" width={34} height={40} alt="" /><span>Swift Sense<small>DIGITAL</small></span></a><p>AI Transformation Consultancy<br />for Growing SMEs</p><a href="https://www.linkedin.com/company/swiftsensedigital/" target="_blank" rel="noopener noreferrer" className="text-link">LinkedIn <span aria-hidden="true">↗</span></a><a href="#top" className="back-top" aria-label="Back to top">↑</a></div><div className="footer-motto">Unlock potential<span>.</span></div><div className="footer-bottom"><p>© 2026 Swift Sense Digital. All rights reserved.</p><nav aria-label="Footer navigation"><a href="#products">Products</a><a href="#concept-demos">Concepts</a><a href="#founder">Founder</a><a href="#process">Process</a><a href="#faq">FAQ</a><a href="#contact">Contact</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/data-deletion">Data deletion</a></nav></div></div></footer>
    </div>
  );
}
