'use client';

import { useEffect } from 'react';
import { useGrill } from '../context/GrillContext';
import { useRouter } from 'next/navigation';
import { GrillItemCard } from '../registry';
import { cookData } from '../registry';
import styled from 'styled-components';

const CookingContainer = styled.div`
  max-width: 40em;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  button {
    margin: 0.5rem;
  }
`;

export default function Cooking() {
  const { state, dispatch, onComplete } = useGrill();
  const router = useRouter();

  useEffect(() => {
    if (state.cookingMode || !state.readyToCook) {
      dispatch({ type: 'SET_COOKING_MODE', payload: false });
      dispatch({ type: 'SET_READY_TO_COOK' });
    }
  }, []);

  const handleStartCooking = () => {
    dispatch({ type: 'START_COOKING' });
  };

  const handleEndCooking = () => {
    dispatch({ type: 'END_COOKING' }); // Dispatch state update
    router.push('/dashboard'); // Redirect explicitly
  };

  return (
    <CookingContainer>
      {!state.cookingMode ? (
        <button onClick={handleStartCooking}>Start Cooking</button>
      ) : (
        <button onClick={handleEndCooking}>End Cooking</button>
      )}
      <button disabled>Enter Demo Mode (Coming Soon)</button>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {state.activeGrillItems.map((item) => (
          <GrillItemCard
            key={item.id}
            item={item}
            cookingMode={state.cookingMode}
            onComplete={onComplete} // Allow marking items as complete
            cookData={cookData}
            onRemove={() => console.log('removed')} // Disable onRemove in cookingMode
          />
        ))}
      </div>
    </CookingContainer>
  );
}