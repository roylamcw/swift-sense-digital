"use client";

import { useState } from "react";
import Image from "next/image";

const stages = [
  {
    name: "Capture",
    title: "A better first conversation.",
    description: "Give visitors a clear next step and capture the details your team needs to respond.",
    label: "Enquiry captured",
    detail: "Business need · Service interest · Contact details",
  },
  {
    name: "Understand",
    title: "Useful context, from the start.",
    description: "Bring the customer's needs together so your team can understand the enquiry before following up.",
    label: "Context organised",
    detail: "Customer objective · Current challenge · Relevant service",
  },
  {
    name: "Follow up",
    title: "People take the next step.",
    description: "Give your team the context to review the opportunity and recommend a practical next action.",
    label: "Ready for human follow-up",
    detail: "Review the need · Agree the scope · Move forward",
  },
] as const;

export default function JourneyExplorer() {
  const [active, setActive] = useState(0);
  const stage = stages[active];

  return (
    <div className="journey-explorer" data-stage={active}>
      <div className="journey-controls" role="group" aria-label="Explore the enquiry journey">
        {stages.map((item, index) => (
          <button
            key={item.name}
            type="button"
            className="journey-tab"
            aria-pressed={active === index}
            aria-controls="journey-description"
            onClick={() => setActive(index)}
          >
            <span className="journey-number" aria-hidden="true">0{index + 1}</span>
            {item.name}
            <span className="journey-tab-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <div className="journey-visual" aria-hidden="true">
        <div className="journey-line" />
        <div className="journey-endpoint journey-source"><span>↗</span><small>Customer</small></div>
        <div className="journey-core"><span className="journey-core-mark"><Image src="/images/ssd-brand-mark.webp" width={34} height={40} alt="" className="journey-brand" /></span><small>A clearer journey</small></div>
        <div className="journey-endpoint journey-destination"><span>✓</span><small>Your team</small></div>
        <div className="journey-signal" key={active}><span className="signal-dot" />{stage.label}</div>
      </div>
      <div id="journey-description" className="journey-description" role="status" aria-live="polite" aria-atomic="true">
        <div><p className="eyebrow">0{active + 1} / The next useful step</p><h3>{stage.title}</h3></div>
        <div><p>{stage.description}</p><p className="journey-detail">{stage.detail}</p></div>
      </div>
      <p className="journey-disclaimer">Illustrative workflow. The final system is scoped around your business.</p>
    </div>
  );
}
