import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useGrill } from '../../context/GrillContext';
import GrillItemPreview from './GrillItemPreview';

// Mocking the context to isolate component logic
jest.mock('../../context/GrillContext', () => ({
  useGrill: jest.fn(),
}));

describe('GrillItemPreview', () => {
  const mockDispatch = jest.fn();
  const mockState = {
    activeGrillItems: [
      {
        id: '1',
        name: 'Steak',
        targetTemp: 'mediumRare',
        cookTime: 10,
      },
      {
        id: '2',
        name: 'Chicken',
        targetTemp: 'wellDone',
        cookTime: 15,
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useGrill as jest.Mock).mockReturnValue({
      state: mockState,
      dispatch: mockDispatch,
    });
  });

  it('should render successfully', () => {
    const { baseElement } = render(<GrillItemPreview />);
    expect(baseElement).toBeTruthy();
  });

  it('should display all grill items with name and target temperature', () => {
    render(<GrillItemPreview />);

    // Check item names and temperatures
    expect(screen.getByText('Steak')).toBeInTheDocument();
    expect(screen.getByText('Medium rare')).toBeInTheDocument();
    expect(screen.getByText('Chicken')).toBeInTheDocument();
    expect(screen.getByText('Well done')).toBeInTheDocument();
  });

  it('should call dispatch with the correct action when an item is deleted', () => {
    render(<GrillItemPreview />);

    // Click delete button for the first item
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    // Assert that dispatch is called with REMOVE_ITEM action
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_ITEM',
      payload: '1',
    });
  });

  it('should display a message if no items are on the grill', () => {
    // Mock state with no items
    (useGrill as jest.Mock).mockReturnValue({
      state: { activeGrillItems: [] },
      dispatch: mockDispatch,
    });

    render(<GrillItemPreview />);

    // Check for "no items" message
    expect(screen.getByText('No items added yet. Add some items to get started!')).toBeInTheDocument();
  });
});