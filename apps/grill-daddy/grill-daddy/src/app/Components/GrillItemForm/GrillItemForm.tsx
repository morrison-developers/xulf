import React, { useState } from 'react';
import styled from 'styled-components';
import { GrillItem, TargetTemp } from '../../types/grill-types';
import { cookData } from '../../data/cookData';
import { useGrill } from '../../context/GrillContext';

const StyledGrillItemForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 300px;

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  input, select, button {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  button {
    cursor: pointer;
    background-color: #4caf50;
    color: white;
    font-weight: bold;
  }

  button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }

  .error {
    color: red;
    font-weight: bold;
  }
`;

export const GrillItemForm = () => {
  const { handleAddGrillItem, state, dispatch } = useGrill();
  const [formState, setFormState] = useState({
    name: '',
    temperature: 'medium' as TargetTemp,
    thickness: 1,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof typeof formState, value: string | number) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    setError(null); // Clear errors on change
  };

  const handleSubmit = () => {
    const { name, temperature, thickness } = formState;

    if (!name.trim()) {
      setError('Name cannot be empty.');
      return;
    }

    const temperatureData = cookData.steak.temperatures[temperature];
    if (!temperatureData) {
      setError('Invalid temperature selection.');
      return;
    }

    const thicknessTimes = temperatureData.times[thickness as number];
    if (!thicknessTimes) {
      setError('Invalid thickness selection.');
      return;
    }

    const cookTime = thicknessTimes[0] + thicknessTimes[1];
    const flipTime = thicknessTimes[0];

    const newItem: GrillItem = {
      id: crypto.randomUUID(),
      name: name.trim(),
      cookTime,
      flipTime,
      targetTemp: temperature,
      state: 'waiting',
    };

    handleAddGrillItem(newItem);
    setFormState({
      name: '',
      temperature: 'medium' as TargetTemp,
      thickness: 1,
    });
    setError(null);
  };

  const handleReset = () => {
    if (state.activeGrillItems.length === 0) {
      setError('No items to reset.');
      return;
    }

    dispatch({ type: 'RESET' });
    setError(null);
  };

  return (
    <StyledGrillItemForm>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission behavior
          handleSubmit(); // Explicitly call handleSubmit
        }}
      >
        {error && <p className="error">{error}</p>}

        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={formState.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Item Name"
          aria-label="Name"
        />

        <label htmlFor="temperature">Temperature:</label>
        <select
          id="temperature"
          value={formState.temperature}
          onChange={(e) => handleChange('temperature', e.target.value)}
          aria-label="Temperature"
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
          aria-label="Thickness"
        >
          {Object.keys(cookData.steak.temperatures[formState.temperature].times).map((thick) => (
            <option key={thick} value={thick}>
              {thick} inches
            </option>
          ))}
        </select>

        <button type="submit" disabled={!formState.name.trim()}>
          Add Item
        </button>
        <button
          type="button"
          role="button"
          onClick={handleReset}
          disabled={state.activeGrillItems.length === 0}
        >
          Reset
        </button>
      </form>
    </StyledGrillItemForm>
  );
};

export default GrillItemForm;