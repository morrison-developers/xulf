import { useMemo } from 'react';
import { Timeline } from '../index';

export interface EstimatorInputs {
  projectFeatures: string[];
  timeline: Timeline;
  projectGoals: string;
}

export function useEstimator({
  projectFeatures,
  timeline,
  projectGoals,
}: EstimatorInputs) {
  return useMemo(() => {
    let baseWeeks = 1;
    let baseCost = 2000;

    const featureCostMap: Record<string, number> = {
      'Dashboard': 1500,
      'Real-time': 1000,
      'CMS': 1000,
      'E-commerce': 1500,
      'Auth': 800,
      'Booking System': 1000,
      'Payments': 1000,
      'Subscriptions': 1000,
    };

    const featureWeekMap: Record<string, number> = {
      'Dashboard': 1,
      'Real-time': 1,
      'CMS': 1,
      'E-commerce': 1,
      'Auth': 0.5,
      'Booking System': 1,
      'Payments': 1,
      'Subscriptions': 1,
    };

    projectFeatures.forEach((feature) => {
      baseCost += featureCostMap[feature] || 300;
      baseWeeks += featureWeekMap[feature] || 0.5;
    });

    if (timeline === 'asap') {
      baseCost += 1000; // rush fee
    }

    const estimatedTimeline =
      baseWeeks <= 2 ? '1–2 weeks' :
      baseWeeks <= 4 ? '2–4 weeks' : '4–8+ weeks';

    const startingPrice = `$${Math.round(baseCost / 100) * 100}`;

    const milestones = [
      { title: 'Discovery', desc: 'We map your goal budget.' },
      { title: 'Design + Dev', desc: 'Build in weekly sprints, with real-time previews.' },
      { title: 'Review + Polish', desc: 'Feedback rounds and obsessive refinement.' },
      { title: 'Launch + Support', desc: 'Deploy, handoff or ongoing retainer — gives product studio vibes.' },
    ];

    if (projectFeatures.includes('CMS')) {
      milestones.splice(2, 0, {
        title: 'Content Modeling',
        desc: 'We configure a structured CMS and editable regions.',
      });
    }

    if (projectFeatures.includes('Auth')) {
      milestones.splice(1, 0, {
        title: 'User Access',
        desc: 'We implement login, roles, and permissions.',
      });
    }

    return {
      estimatedTimeline,
      startingPrice,
      summary: 'Includes: 4 milestone check-ins, 2 rounds of revisions, full code handoff.',
      milestones,
    };
  }, [projectFeatures, timeline]);
}
