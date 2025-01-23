// GrillItemCard.tsx
import React, { useState, useEffect } from 'react';

import { GrillItem, CookData, Checkpoints, GrillState } from '../../registry';
import { getCookingTimes } from '../../utils/grillUtils';

import styled, { keyframes, css } from 'styled-components';

const wiggle = keyframes`
  0% { transform: rotate(0deg); }
  70% { transform: rotate(0deg); }
  75% { transform: rotate(-2deg); }
  80% { transform: rotate(2deg); }
  85% { transform: rotate(-1.5deg); }
  90% { transform: rotate(1.5deg); }
  95% { transform: rotate(-1deg); }
  100% { transform: rotate(0deg); }
`;


const StyledGrillItem = styled.div<{
  isDone: boolean;
  isPromptPhase: boolean;
  timeInPrompt: number;
}>`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  background: ${({ isDone, isPromptPhase, timeInPrompt }) =>
    isDone
      ? '#d4edda'
      : isPromptPhase
      ? `rgba(255, 0, 0, ${Math.min(timeInPrompt / 60, 1)})`
      : 'white'};
  width: 50%;
  max-width: 40em;
  text-align: center;
  color: ${({ isPromptPhase, timeInPrompt }) =>
    isPromptPhase && timeInPrompt >= 60 ? 'white' : 'black'};
  animation: ${({ isPromptPhase }) =>
    isPromptPhase
      ? css`
          ${wiggle} 1s ease-in-out 0s infinite alternate;
        `
      : 'none'};
  cursor: pointer; /* Makes the card clickable */

  .progress-bar {
    background: #eee;
    border-radius: 8px;
    overflow: hidden;
    margin: 10px 0;
    height: 16px;
    width: 100%;

    .progress {
      background: #4caf50;
      height: 100%;
      transition: width 0.3s;
    }
  }
`;

interface GrillItemCardProps {
  item: GrillItem;
  cookData: CookData;
  cookingMode: boolean;
  onComplete: (id: string) => void;
  onRemove: (id: string) => void;
}

const GrillItemCard: React.FC<GrillItemCardProps> = ({
  item,
  cookData,
  cookingMode,
  onComplete,
  onRemove,
}) => {
  const [remainingTime, setRemainingTime] = useState((item.waitToStart || 0) * 60);
  const [currentPhase, setCurrentPhase] = useState(item.state || 'waiting');
  const [isDone, setIsDone] = useState(item.state === 'done');
  const [timeInPrompt, setTimeInPrompt] = useState(0);

  const { flipTime, cookTime } = getCookingTimes(item, cookData);

  const isPromptPhase = ['before-grill', 'time-to-flip', 'time-to-remove'].includes(currentPhase);

  const map = {
    currentPhase,
    remainingTime,
    cookTimes: [
      { phase: 'waiting' as GrillState, time: (item.waitToStart || 0) * 60 },
      { phase: 'first-side' as GrillState, time: flipTime * 60 },
      { phase: 'second-side' as GrillState, time: (cookTime - flipTime) * 60 },
    ],
  };

  useEffect(() => {
    let promptTimer: NodeJS.Timeout | null = null;

    if (isPromptPhase) {
      promptTimer = setInterval(() => {
        setTimeInPrompt((prev) => prev + 1);
      }, 1000);
    } else {
      setTimeInPrompt(0);
    }

    return () => {
      if (promptTimer) clearInterval(promptTimer);
    };
  }, [isPromptPhase]);

  useEffect(() => {
    if (!cookingMode) return;

    // Check if the current timer is finished and transition state
    if (remainingTime <= 0) {
      switch (currentPhase) {
        case 'waiting':
          setCurrentPhase('before-grill');
          setRemainingTime(flipTime * 60);
          break;
        case 'first-side':
          setCurrentPhase('time-to-flip');
          setRemainingTime((cookTime - flipTime) * 60);
          break;
        case 'second-side':
          setCurrentPhase('time-to-remove');
          setRemainingTime(0); // No more timer
          break;
        default:
          break;
      }
    }

    const timer = setInterval(() => {
      setRemainingTime((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [cookingMode, currentPhase, remainingTime]);

  const handleAddToGrill = () => {
    setCurrentPhase('first-side');
    setRemainingTime(flipTime * 60);
  };

  const handleNextPhase = () => {
    if (currentPhase === 'time-to-flip') {
      setCurrentPhase('second-side');
      setRemainingTime((cookTime - flipTime) * 60);
    } else if (currentPhase === 'time-to-remove') {
      setCurrentPhase('done');
      setIsDone(true);
      onComplete(item.id);
    }
  };
  
  const invisibleText = (
    <p style={{ visibility: 'hidden', height: '1em' }}>Placeholder text</p>
  );

  const renderPhase = () => {
    const promptText = (text: string, color: string) => (
      <p style={{ color, fontWeight: 'bold', marginTop: '16px' }}>{text}</p>
    );
  
    switch (currentPhase) {
      case 'waiting':
        return (
          <div>
            {invisibleText}
            {promptText('Waiting to start...', 'black')}
          </div>
        );
      case 'before-grill':
        return (
          <div>
            {promptText('Ready to add to the grill!', 'red')}
          </div>
        );
      case 'first-side':
        return (
          <div>
            {invisibleText}
            {promptText('Cooking first side...', 'black')}
          </div>
        );
      case 'time-to-flip':
        return (
          <div>
            {promptText('Time to flip!', 'orange')}
          </div>
        );
      case 'second-side':
        return (
          <div>
            {invisibleText}
            {promptText('Cooking second side...', 'black')}
          </div>
        );
      case 'time-to-remove':
        return (
          <div>
            {promptText('Time to remove!', 'green')}
          </div>
        );
      case 'done':
        return (
          <div>
            {promptText('Cooking complete! Remove the item from the grill.', 'black')}
          </div>
        );
      default:
        return null;
      }
    };
  return (
    <StyledGrillItem
      isDone={isDone}
      isPromptPhase={isPromptPhase}
      timeInPrompt={timeInPrompt}
      onClick={() => {
        if (isPromptPhase) {
          // Handle the alarm acknowledgment
          if (currentPhase === 'before-grill') handleAddToGrill();
          if (currentPhase === 'time-to-flip' || currentPhase === 'time-to-remove') handleNextPhase();
        }
      }}
    >
      <h3>{item.name}</h3>
      <p>Phase: {currentPhase}</p>
      <div className="progress-bar">
      <div
        className="progress"
        role="progressbar"
        style={{
          width: `${
            currentPhase === 'waiting'
              ? (((item.waitToStart || 0) * 60 - remainingTime) / ((item.waitToStart || 0) * 60)) * 100
              : currentPhase === 'first-side'
              ? ((flipTime * 60 - remainingTime) / (flipTime * 60)) * 100
              : currentPhase === 'second-side'
              ? ((cookTime * 60 - remainingTime) / (cookTime * 60)) * 100
              : 0
          }%`,
        }}
      />
      </div>
      <Checkpoints map={map} />
      {renderPhase()}
    </StyledGrillItem>
  );
};

export default GrillItemCard;
