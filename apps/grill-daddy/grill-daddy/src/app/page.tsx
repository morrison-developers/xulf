'use client';

import GrillItemForm from './Components/GrillItemForm/GrillItemForm';
import { GrillItem, GrillItemCard, cookData } from './registry';
import { useGrill } from './context/GrillContext';

import styled from 'styled-components';

const StyledPage = styled.div`
  .page {
  }
`;


export default function Index() {
  const { state, onFlip, dispatch, onComplete } = useGrill();
  
  const handleAddGrillItem = (item: GrillItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  return (
    <StyledPage>
      <div>
        <h1>Grill Dashboard</h1>

        {!state.cookingMode ? (
          // Grill item form only available before cooking starts
          <GrillItemForm />
        ) : (
          <p>Cooking mode is active! Timers are running...</p>
        )}

        <h2>Active Items</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {state.activeGrillItems.map((item) => (
            <GrillItemCard
              key={item.id}
              item={item}
              onFlip={onFlip}
              cookingMode={state.cookingMode}
              onComplete={onComplete}
              cookData={cookData}
              onRemove={handleRemove}
            />
          ))}
        </div>

        {state.cookingMode && (
          <div>
            <h2>Cooking Mode Active</h2>
            <p>Timers will run for each item.</p>
          </div>
        )}
        {state.cookingMode ?
          <button onClick={() => dispatch({ type: 'END_COOKING' })}>
            Cancel Cooking
          </button>
          :
          <button onClick={() => dispatch({ type: 'START_COOKING' })}>
            Start Cooking
          </button>
        }
      </div>
    </StyledPage>
  );
}
