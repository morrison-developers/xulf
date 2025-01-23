import React from 'react';
import { render } from '@testing-library/react';
import Checkpoints from './Checkpoints';

describe('Checkpoints', () => {
  it('should render successfully', () => {
    const map = {
      currentPhase: 'first-side' as const, // Ensure this matches the GrillState type
      remainingTime: 300,
      cookTimes: [
        { phase: 'waiting' as const, time: 120 },
        { phase: 'first-side' as const, time: 300 },
        { phase: 'second-side' as const, time: 180 },
      ],
    };

    const { baseElement } = render(<Checkpoints map={map} />);
    expect(baseElement).toBeTruthy();
  });
});
