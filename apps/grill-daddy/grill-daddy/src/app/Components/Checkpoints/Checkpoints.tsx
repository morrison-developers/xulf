import React from 'react';
import styled from 'styled-components';

import { GrillState } from '../../registry';

interface CheckpointsProps {
  map: {
    currentPhase: GrillState;
    remainingTime: number;
    cookTimes: { phase: GrillState; time: number }[];
  };
}

const StyledCheckpoints = styled.ul`
  height: 150px; /* Fixed height */
  overflow-y: auto; /* Allow scrolling if necessary */
  margin: 0;
  padding: 0;
  list-style: none; /* Remove bullet points */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center; /* Center align content */
`;

const StyledCheckpointItem = styled.li`
  display: flex;
  justify-content: space-between; /* Align text and time */
  width: 80%; /* Adjust width for consistent alignment */
  padding: 5px 0; /* Add spacing between items */
  font-size: 14px; /* Keep it readable but clean */
`;

const StyledPhaseLabel = styled.span`
  flex: 1;
  text-align: left;
  font-weight: bold;
`;

const StyledTimeLabel = styled.span`
  flex: 1;
  text-align: right;
`;

const Checkpoints: React.FC<CheckpointsProps> = ({ map }) => {
  const { currentPhase, remainingTime, cookTimes } = map;

  // Filter out phases that have already been passed
  const visiblePhases = cookTimes.filter((phase) => {
    const phaseOrder: GrillState[] = [
      'waiting',
      'before-grill',
      'first-side',
      'time-to-flip',
      'second-side',
      'time-to-remove',
      'done',
    ];
    return phaseOrder.indexOf(phase.phase) >= phaseOrder.indexOf(currentPhase);
  });

  return (
    <StyledCheckpoints>
      {visiblePhases.map((phase, index) => (
        <StyledCheckpointItem key={index}>
          <StyledPhaseLabel>{phase.phase}:</StyledPhaseLabel>
          <StyledTimeLabel>
            {phase.phase === currentPhase ? formatTime(remainingTime) : formatTime(phase.time)}
          </StyledTimeLabel>
        </StyledCheckpointItem>
      ))}
    </StyledCheckpoints>
  );
};

const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, '0'); // Ensure two digits for minutes
  const seconds = (timeInSeconds % 60)
    .toString()
    .padStart(2, '0'); // Ensure two digits for seconds
  return `${minutes}:${seconds}`;
};

export default Checkpoints;
