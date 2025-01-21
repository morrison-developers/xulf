'use client';

import styled from 'styled-components';
import GrillItemForm from './Components/GrillItemForm/GrillItemForm';
import { GrillItem } from './registry';
import { useGrill } from './context/GrillContext';

const StyledPage = styled.div`
  .page {
  }
`;


export default function Index() {
  const { state, dispatch } = useGrill();
  
  const handleAddGrillItem = (item: GrillItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    console.log('[handleAddGrillItem] Dispatching ADD_ITEM:', item);
  };

  return (
    <StyledPage>
      <div>
        <h1>Grill Items</h1>

        {!state.cookingMode ? (
          // Grill item form only available before cooking starts
          <GrillItemForm onAdd={handleAddGrillItem} />
        ) : (
          <p>Cooking mode is active! Timers are running...</p>
        )}

        <h2>Active Items</h2>
        <ul>
          {state.activeGrillItems.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              {/* Add timer functionality here */}
            </li>
          ))}
        </ul>

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
