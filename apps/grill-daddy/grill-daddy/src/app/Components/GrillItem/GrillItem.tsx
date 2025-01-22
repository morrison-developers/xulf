import React, { useState, useEffect } from 'react';
import { useTimer } from 'react-use-precision-timer';

import { GrillItem, CookData } from '../../registry';
import { getCookingTimes } from '../../utils/grillUtils';
import { useGrill } from '../../context/GrillContext';

import styled from 'styled-components';

const StyledGrillItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  background: ${(props: { isDone: boolean }) => (props.isDone ? '#d4edda' : 'white')};
  width: 300px;
  text-align: center;

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

  .flip-alert, .done-alert {
    color: red;
    font-weight: bold;
  }

  .done-alert {
    margin-top: 10px;
  }
`;

interface GrillItemCardProps {
  item: GrillItem;
  cookData: CookData;
  cookingMode: boolean;
  onFlip: (id: string) => void;
  onComplete: (id: string) => void;
  onRemove: (id: string) => void;
}

const GrillItemCard: React.FC<GrillItemCardProps> = ({
  item,
  cookData,
  cookingMode,
  onFlip,
  onComplete,
  onRemove,
}) => {
  const [remainingTime, setRemainingTime] = useState((item.waitToStart || 0) * 60);
  const [currentPhase, setCurrentPhase] = useState(item.state || 'waiting');
  const [isDone, setIsDone] = useState(item.state === 'done');

  const { flipTime, cookTime } = getCookingTimes(item, cookData);
  const { state } = useGrill();

  // Timers for each phase
  const waitTimer = useTimer({ delay: (item.waitToStart || 0) * 60000 }, () => {});
  const flipTimer = useTimer({ delay: flipTime * 60000 }, () => {});
  const postFlipTimer = useTimer({ delay: (cookTime - flipTime) * 60000 }, () => {});

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
    flipTimer.start();
  };

  const handleNextPhase = () => {
    if (currentPhase === 'time-to-flip') {
      setCurrentPhase('second-side');
      setRemainingTime((cookTime - flipTime) * 60);
      postFlipTimer.start();
    } else if (currentPhase === 'time-to-remove') {
      setCurrentPhase('done');
      setIsDone(true);
      onComplete(item.id);
    }
  };

  const renderPhase = () => {
    switch (currentPhase) {
      case 'waiting':
        return <p>Waiting to start: {formatTime(remainingTime)}</p>;
      case 'before-grill':
        return (
          <div>
            <p style={{ color: 'red', fontWeight: 'bold' }}>Ready to add to the grill!</p>
            <button onClick={handleAddToGrill}>Add to Grill</button>
          </div>
        );
      case 'first-side':
        return <p>Side 1 Timer: {formatTime(remainingTime)}</p>;
      case 'time-to-flip':
        return (
          <div>
            <p style={{ color: 'orange', fontWeight: 'bold' }}>Time to flip!</p>
            <button onClick={handleNextPhase}>Flip Item</button>
          </div>
        );
      case 'second-side':
        return <p>Side 2 Timer: {formatTime(remainingTime)}</p>;
      case 'time-to-remove':
        return (
          <div>
            <p style={{ color: 'green', fontWeight: 'bold' }}>Time to remove!</p>
            <button onClick={handleNextPhase}>Remove Item</button>
          </div>
        );
      case 'done':
        return (
          <div>
            <p className="done-alert">Cooking complete! Remove the item from the grill.</p>
            <button onClick={() => onRemove(item.id)}>Remove Item</button>
          </div>
        );
      default:
        return null;
    }
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <StyledGrillItem isDone={isDone}>
      <h3>{item.name}</h3>
      <p>Phase: {currentPhase}</p>
      <div className="progress-bar">
      <div
        className="progress"
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
      <ul>
        <li>
          <strong>Wait to Start:</strong> {formatTime((item.waitToStart || 0) * 60)}
        </li>
        <li>
          <strong>First Side:</strong> {formatTime(flipTime * 60)}
        </li>
        <li>
          <strong>Second Side:</strong> {formatTime((cookTime - flipTime) * 60)}
        </li>
        <li>
          <strong>Total Time:</strong> {formatTime(state.totalCookTime * 60)}
        </li>
      </ul>
      {renderPhase()}
    </StyledGrillItem>
  );
};

export default GrillItemCard;
