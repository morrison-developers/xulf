import React, { useState } from 'react';
import { GrillItem, GrillState } from '../../registry'

import styled from 'styled-components';

const StyledGrillItemForm = styled.div`
  color: pink;
`;

export const GrillItemForm = ({ onAdd }: { onAdd: (item: GrillItem) => void }) => {
  const [formState, setFormState] = useState({
    name: '',
    cookTime: 0,
    flipTime: 0,
    targetTemp: 0,
  });

  const handleChange = (field: keyof typeof formState, value: string | number) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const newItem: GrillItem = {
      id: crypto.randomUUID(),
      name: formState.name,
      cookTime: formState.cookTime,
      flipTime: formState.flipTime,
      targetTemp: formState.targetTemp,
      state: 'before-grill',
    };
    onAdd(newItem);
  }

  return (
    <StyledGrillItemForm>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={formState.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Item Name"
        />
        <input
          type="number"
          value={formState.cookTime}
          onChange={(e) => handleChange('cookTime', Number(e.target.value))}
          placeholder="Cook Time (s)"
        />
        <input
          type="number"
          value={formState.flipTime}
          onChange={(e) => handleChange('flipTime', Number(e.target.value))}
          placeholder="Flip Time (s)"
        />
        <input
          type="number"
          value={formState.targetTemp}
          onChange={(e) => handleChange('targetTemp', Number(e.target.value))}
          placeholder="Target Temp (°F)"
        />
        <button onClick={handleSubmit}>Add Item</button>
      </form>
    </StyledGrillItemForm>
  )
}

export default GrillItemForm;
