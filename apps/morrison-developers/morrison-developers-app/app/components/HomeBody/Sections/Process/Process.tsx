'use client';

import React, { useState } from 'react';
import '../sections.css';
import './process.css';
import { EstimatorForm, EstimatorResults, Timeline } from './index';

type ProjectType =
  | 'portfolio'
  | 'ecommerce'
  | 'landing'
  | 'webapp'
  | 'internal';

export default function Process() {
  const [projectType, setProjectType] = useState<ProjectType>('portfolio');
  const [timeline, setTimeline] = useState<Timeline>('asap');
  const [projectGoals, setProjectGoals] = useState<string>('');
  const [projectFeatures, setProjectFeatures] = useState<string[]>([]);

  return (
    <div className="homebody-component process-mvp">
      <EstimatorForm
        projectType={projectType}
        setProjectType={setProjectType}
        projectFeatures={projectFeatures}
        setProjectFeatures={setProjectFeatures}
        timeline={timeline}
        setTimeline={setTimeline}
        projectGoals={projectGoals}
        setProjectGoals={setProjectGoals}
      />

      <EstimatorResults
        projectFeatures={projectFeatures}
        timeline={timeline}
        projectGoals={projectGoals}
      />
    </div>
  );
}
