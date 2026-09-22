import TrackedLink from "./TrackedLink";

const opportunities = [
  { rank: "01", title: "Weekly reporting draft", value: "Medium", effort: "Low–medium", readiness: "Reliable input data", action: "Pilot first" },
  { rank: "02", title: "Internal knowledge assistant", value: "High", effort: "Medium", readiness: "Clean SOPs and access rules", action: "Prepare first" },
  { rank: "03", title: "Enquiry triage", value: "Medium", effort: "Medium", readiness: "Approved FAQs and handoff", action: "Sequence next" },
] as const;

export default function BlueprintSample() {
  return (
    <section className="blueprint-preview" aria-labelledby="sample-title">
      <div className="sample-heading">
        <div><p className="eyebrow">Inside a Blueprint / Illustrative extract</p><h3 id="sample-title">See how the decisions take shape.</h3></div>
        <span className="sample-stamp">SAMPLE<br />01 / 02</span>
      </div>
      <p className="sample-context">A fictional SME wants to reduce recurring administration. The first decision is which workflow is ready for a bounded pilot.</p>
      <div className="sample-table-scroll" role="region" aria-label="Illustrative opportunity matrix; scroll horizontally on smaller screens" tabIndex={0}>
        <table className="sample-matrix">
          <caption>Opportunity priorities — illustrative assumptions</caption>
          <thead><tr><th scope="col">Opportunity</th><th scope="col">Expected value</th><th scope="col">Effort</th><th scope="col">Start when</th><th scope="col">Decision</th></tr></thead>
          <tbody>{opportunities.map((item) => <tr key={item.rank}><th scope="row"><span>{item.rank}</span>{item.title}</th><td>{item.value}</td><td>{item.effort}</td><td>{item.readiness}</td><td><span className="sample-decision">{item.action}</span></td></tr>)}</tbody>
        </table>
      </div>
      <ol className="sample-phases" aria-label="Illustrative implementation sequence">
        <li><span>Phase 01</span><strong>Validate the starting point.</strong><p>Confirm baseline, owners and data access.</p></li>
        <li><span>Phase 02</span><strong>Pilot one reporting draft.</strong><p>Keep a human responsible for checking every report.</p></li>
        <li><span>Phase 03</span><strong>Review before expanding.</strong><p>Compare quality, time and staff adoption with the baseline.</p></li>
      </ol>
      <div className="sample-brief"><p className="eyebrow">One implementation brief / Reporting draft</p><p><strong>Inputs:</strong> agreed reporting data. <strong>Owner:</strong> the reporting lead. <strong>Acceptance checks:</strong> figures trace to sources, missing data is flagged and a reviewer approves the draft.</p></div>
      <div className="sample-download"><p>Fictional example, not client results or a fixed scope. Ratings are assumptions; benefits and costs need validation. Implementation is quoted separately.</p><TrackedLink href="/SSD-Illustrative-AI-Blueprint.pdf" eventName="blueprint_sample_download" eventProperties={{ location: "blueprint_sample" }} className="text-link" download>Download the sample PDF <span aria-hidden="true">↓</span></TrackedLink></div>
    </section>
  );
}
