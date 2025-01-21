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
        <GrillItemForm onAdd={handleAddGrillItem} />
        <div>
          <h2>Active Items</h2>
          <ul>
            {state.activeGrillItems.length === 0 && <li>No active grill items</li>}
            {state.activeGrillItems.map((item) => {
              console.log('[UI] Rendering active item:', item);
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      </div>
    </StyledPage>
  );
}
