import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GrillItemForm from './GrillItemForm';
import { GrillContext } from '../../context/GrillContext';
import { jest } from '@jest/globals';

// Mock crypto.randomUUID
beforeEach(() => {
  if (!global.crypto.randomUUID) {
    Object.defineProperty(global.crypto, 'randomUUID', {
      value: jest.fn().mockReturnValue('mocked-uuid'),
    });
  }
});

describe('GrillItemForm', () => {
  const mockDispatch = jest.fn();
  const mockContextValue = {
    handleAddGrillItem: jest.fn(),
    dispatch: mockDispatch,
    state: {
      activeGrillItems: [],
      completedGrillItems: [],
      cookingMode: false,
      totalCookTime: 0,
      readyToCook: false,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithContext = () => {
    return render(
      <GrillContext.Provider value={mockContextValue}>
        <GrillItemForm />
      </GrillContext.Provider>
    );
  };

  it('should render all input fields and buttons', () => {
    renderWithContext();

    expect(screen.getByPlaceholderText('Item Name')).toBeInTheDocument();
    expect(screen.getByLabelText(/Temperature/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Thickness/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Item/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset/i })).toBeInTheDocument();
  });

  it('should update form state when inputs change', () => {
    renderWithContext();

    const nameInput = screen.getByPlaceholderText('Item Name');
    const temperatureSelect = screen.getByLabelText(/Temperature/i);
    const thicknessSelect = screen.getByLabelText(/Thickness/i);

    fireEvent.change(nameInput, { target: { value: 'Test Steak' } });
    fireEvent.change(temperatureSelect, { target: { value: 'rare' } });
    fireEvent.change(thicknessSelect, { target: { value: '1.5' } });

    expect(nameInput).toHaveValue('Test Steak');
    expect(temperatureSelect).toHaveValue('rare');
    expect(thicknessSelect).toHaveValue('1.5');
  });

  it('should dispatch ADD_ITEM when the form is submitted', () => {
    renderWithContext();
  
    const nameInput = screen.getByPlaceholderText('Item Name');
    const temperatureSelect = screen.getByLabelText(/Temperature/i);
    const thicknessSelect = screen.getByLabelText(/Thickness/i);
    const addButton = screen.getByRole('button', { name: /Add Item/i });
  
    // Fill the form inputs
    fireEvent.change(nameInput, { target: { value: 'Test Steak' } });
    fireEvent.change(temperatureSelect, { target: { value: 'mediumRare' } });
    fireEvent.change(thicknessSelect, { target: { value: '1.25' } });
  
    // Ensure the button is enabled
    expect(addButton).not.toBeDisabled();
  
    // Submit the form
    fireEvent.click(addButton);
  
    // Assert that the ADD_ITEM action was dispatched
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_ITEM',
      payload: {
        id: 'mocked-uuid',
        name: 'Test Steak',
        cookTime: 11, // Example, ensure matches your cookData
        flipTime: 6,  // Example, ensure matches your cookData
        targetTemp: 'mediumRare',
        state: 'waiting',
      },
    });
  });

  it('should disable the Add Item button if the form is incomplete', () => {
    renderWithContext();
  
    const nameInput = screen.getByPlaceholderText('Item Name');
    const addButton = screen.getByRole('button', { name: /Add Item/i });
  
    // Initially, the button should be disabled
    expect(addButton).toBeDisabled();
  
    // Fill in the Name field
    fireEvent.change(nameInput, { target: { value: 'Test Steak' } });
  
    // Now the button should be enabled
    expect(addButton).not.toBeDisabled();
  
    // Clear the Name field
    fireEvent.change(nameInput, { target: { value: '' } });
  
    // The button should be disabled again
    expect(addButton).toBeDisabled();
  });

  it('should disable the Reset button if no items are active', () => {
    renderWithContext();

    const resetButton = screen.getByRole('button', { name: /Reset/i });

    expect(resetButton).toBeDisabled();
  });
});
