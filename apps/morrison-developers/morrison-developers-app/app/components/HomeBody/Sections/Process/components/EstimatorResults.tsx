import { useEstimator, Timeline } from '../index';

export interface EstimatorInputs {
  projectFeatures: string[];
  timeline: Timeline;
  projectGoals: string;
}

export function EstimatorResults({ projectFeatures, timeline, projectGoals }: EstimatorInputs) {
  const { estimatedTimeline, startingPrice, summary, milestones } = useEstimator({
    projectFeatures,
    timeline,
    projectGoals,
  });

  return (
    <div className="estimator-results">
      <div className="process-steps">
        <h3>Our Process</h3>
        <ol>
          {milestones.map((m, i) => (
            <li key={i}>
              <strong>{m.title}</strong>
              <p>{m.desc}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="estimator-summary">
        <p>
          Estimated timeline: <strong>{estimatedTimeline}</strong>
          <br />
          Starting at: <strong>{startingPrice}</strong>
        </p>
        <p>{summary}</p>
      </div>
    </div>
  );
}
