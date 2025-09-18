export { default as EstimatorForm } from './components/EstimatorForm';
export { EstimatorResults } from './components/EstimatorResults';
export { useEstimator } from './hooks/useEstimator'
export type { EstimatorInputs } from './hooks/useEstimator'

export const timelineLabels = [
  'asap',
  '1 week',
  '2 weeks',
  '1 month',
  '2+ months',
] as const;

export type Timeline = (typeof timelineLabels)[number];