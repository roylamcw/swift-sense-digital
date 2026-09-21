import TrackedLink from "./TrackedLink";
import { blueprint } from "../lib/product-catalog";

export default function TransformationBlueprint() {
  return (
    <section id="blueprint-service" className="blueprint-section section" aria-labelledby="blueprint-title">
      <div className="frame">
        <div className="section-heading" data-reveal="">
          <div><p className="eyebrow">02 / Our flagship engagement</p><h2 id="blueprint-title">Your business.<br /><span>A clear AI direction.</span></h2></div>
          <p>Start with a comprehensive view of your business. We assess the opportunities, test the assumptions and prioritise the improvements worth pursuing.</p>
        </div>
        <div className="blueprint-offer" data-reveal="">
          <div><h3>{blueprint.name}</h3><p>A practical assessment, prioritised roadmap and implementation-ready scope, built around your business goals and your team’s capacity.</p></div>
          <div className="blueprint-fee"><strong>From {blueprint.price}</strong><span>One-off engagement · Typically {blueprint.duration.toLowerCase()}</span></div>
        </div>
        <div className="blueprint-deliverables">
          {blueprint.deliverables.map((item, index) => (
            <article key={item.title} data-reveal=""><span className="blueprint-index">0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>
          ))}
        </div>
        <div className="blueprint-boundary"><p>{blueprint.boundary}</p><TrackedLink href="#contact" eventName="primary_contact_cta_click" eventProperties={{ location: "blueprint_flagship" }} className="button">Discuss your Blueprint <span aria-hidden="true">↗</span></TrackedLink></div>
        <details className="blueprint-sample">
          <summary>Explore an illustrative roadmap <span className="disclosure" aria-hidden="true" /></summary>
          <div className="sample-content">
            <p className="sample-note">Illustrative only. This is a fictional example of the structure, not a client project, a fixed scope or a promise of results. Your priorities and estimates follow discovery.</p>
            <div className="sample-roadmap">
              <article><span className="eyebrow">Assess / Customer enquiries</span><h4>Understand where follow-up slows down.</h4><p>Map incoming enquiries, handoffs and current response times. Compare a process change with a connected lead system.</p><p><strong>Decision:</strong> choose an improvement using expected value, effort and readiness.</p></article>
              <article><span className="eyebrow">Scope / Repetitive administration</span><h4>Define a bounded first implementation.</h4><p>Document inputs, tool options, access requirements, human review, costs and acceptance criteria.</p><p><strong>Decision:</strong> approve a scope, owner and budget before building.</p></article>
              <article><span className="eyebrow">Sequence / Team adoption</span><h4>Plan how people will use it.</h4><p>Set out staff involvement, training, baseline measurements and review points before expanding to the next workflow.</p><p><strong>Decision:</strong> assess usage, time saved and quality against the baseline.</p></article>
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}
