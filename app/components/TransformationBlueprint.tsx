import TrackedLink from "./TrackedLink";
import { blueprint } from "../lib/product-catalog";
import BlueprintSample from "./BlueprintSample";

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
        <div className="blueprint-boundary"><p>{blueprint.boundary}</p><TrackedLink href="#contact" eventName="primary_contact_cta_click" eventProperties={{ location: "blueprint_flagship" }} className="button">Discuss your AI priorities <span aria-hidden="true">↗</span></TrackedLink></div>
        <BlueprintSample />
      </div>
    </section>
  );
}
