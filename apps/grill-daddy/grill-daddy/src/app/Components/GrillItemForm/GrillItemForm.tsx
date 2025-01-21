import React, { useState } from 'react';
import styled from 'styled-components';
import { GrillItem, TargetTemp } from '../../types/grill-types';
import { cookData } from '../../data/cookData';
import { useGrill } from '../../context/GrillContext';

const StyledGrillItemForm = styled.div`
  color: pink;
`;

export const GrillItemForm = ({ onAdd }: { onAdd: (item: GrillItem) => void }) => {
  const { dispatch } = useGrill();
  const [formState, setFormState] = useState({
    name: '',
    temperature: 'medium' as TargetTemp,
    thickness: 1,
  });

  const handleChange = (field: keyof typeof formState, value: string | number) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const { temperature, thickness } = formState;

    // Validate temperature and thickness
    const temperatureData = cookData.steak.temperatures[temperature];
    if (!temperatureData) {
      alert('Invalid temperature selection.');
      return;
    }

    const thicknessTimes = temperatureData.times[thickness as number];
    if (!thicknessTimes) {
      alert('Invalid thickness selection.');
      return;
    }

    const cookTime = thicknessTimes[0] + thicknessTimes[1];

    const newItem: GrillItem = {
      id: crypto.randomUUID(),
      name: formState.name || 'Unnamed Item',
      cookTime,
      flipTime: thicknessTimes[0],
      targetTemp: temperature,
      state: 'before-grill',
    };

    onAdd(newItem);

    // Reset form state
    setFormState({
      name: '',
      temperature: 'medium' as TargetTemp,
      thickness: 1,
    });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' }); // Dispatch the RESET action to clear submitted items
  };

  return (
    <StyledGrillItemForm>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={formState.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Item Name"
        />

        <label htmlFor="temperature">Temperature:</label>
        <select
          id="temperature"
          value={formState.temperature}
          onChange={(e) => handleChange('temperature', e.target.value)}
        >
          {Object.keys(cookData.steak.temperatures).map((temp) => (
            <option key={temp} value={temp}>
              {temp}
            </option>
          ))}
        </select>

        <label htmlFor="thickness">Thickness:</label>
        <select
          id="thickness"
          value={formState.thickness}
          onChange={(e) => handleChange('thickness', parseFloat(e.target.value))}
        >
          {Object.keys(cookData.steak.temperatures[formState.temperature].times).map((thick) => (
            <option key={thick} value={thick}>
              {thick} inches
            </option>
          ))}
        </select>
        <button onClick={handleSubmit}>Add Item</button>
        <button onClick={handleReset}>Reset</button>
      </form>
    </StyledGrillItemForm>
  );
};

export default GrillItemForm;
