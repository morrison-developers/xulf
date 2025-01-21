import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GrillItemForm from './GrillItemForm';
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
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    mockOnAdd.mockClear();
  });

  it('should render all input fields', () => {
    render(<GrillItemForm onAdd={mockOnAdd} />);

    expect(screen.getByPlaceholderText('Item Name')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /temperature/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /thickness/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add item/i })).toBeInTheDocument();
  });

  it('should update state when inputs change', () => {
    render(<GrillItemForm onAdd={mockOnAdd} />);

    const nameInput = screen.getByPlaceholderText('Item Name');
    const temperatureSelect = screen.getByRole('combobox', { name: /temperature/i });
    const thicknessSelect = screen.getByRole('combobox', { name: /thickness/i });

    fireEvent.change(nameInput, { target: { value: 'Test Steak' } });
    fireEvent.change(temperatureSelect, { target: { value: 'rare' } });
    fireEvent.change(thicknessSelect, { target: { value: '1.5' } });

    expect(nameInput).toHaveValue('Test Steak');
    expect(temperatureSelect).toHaveValue('rare');
    expect(thicknessSelect).toHaveValue('1.5');
  });

  it('should call onAdd with the correct item when the form is submitted', () => {
    render(<GrillItemForm onAdd={mockOnAdd} />);

    const nameInput = screen.getByPlaceholderText('Item Name');
    const temperatureSelect = screen.getByRole('combobox', { name: /temperature/i });
    const thicknessSelect = screen.getByRole('combobox', { name: /thickness/i });
    const submitButton = screen.getByRole('button', { name: /add item/i });

    fireEvent.change(nameInput, { target: { value: 'Test Steak' } });
    fireEvent.change(temperatureSelect, { target: { value: 'mediumRare' } });
    fireEvent.change(thicknessSelect, { target: { value: '1.25' } });

    fireEvent.click(submitButton);

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(mockOnAdd).toHaveBeenCalledWith({
      id: 'mocked-uuid',
      name: 'Test Steak',
      cookTime: 11,
      flipTime: 6,
      targetTemp: 'mediumRare',
      state: 'before-grill',
    });
  });
});
