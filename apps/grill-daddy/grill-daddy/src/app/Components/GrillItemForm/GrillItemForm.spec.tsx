import { render, screen, fireEvent } from '@testing-library/react';
import GrillItemForm from './GrillItemForm';

// Mock `crypto.randomUUID` globally
beforeAll(() => {
  Object.defineProperty(global, 'crypto', {
    value: {
      randomUUID: jest.fn(() => 'mocked-uuid'),
    },
    writable: true,
  });
});

describe('GrillItemForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GrillItemForm onAdd={() => {}} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render all input fields', () => {
    render(<GrillItemForm onAdd={() => {}} />);
    
    expect(screen.getByPlaceholderText('Item Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Cook Time (s)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Flip Time (s)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Target Temp (°F)')).toBeInTheDocument();
  });

  it('should update state when inputs change', () => {
    render(<GrillItemForm onAdd={() => {}} />);
    
    const nameInput = screen.getByPlaceholderText('Item Name');
    const cookTimeInput = screen.getByPlaceholderText('Cook Time (s)');
    const flipTimeInput = screen.getByPlaceholderText('Flip Time (s)');
    const targetTempInput = screen.getByPlaceholderText('Target Temp (°F)');

    fireEvent.change(nameInput, { target: { value: 'Burger 1' } });
    fireEvent.change(cookTimeInput, { target: { value: '300' } });
    fireEvent.change(flipTimeInput, { target: { value: '150' } });
    fireEvent.change(targetTempInput, { target: { value: '160' } });

    expect(nameInput).toHaveValue('Burger 1');
    expect(cookTimeInput).toHaveValue(300);
    expect(flipTimeInput).toHaveValue(150);
    expect(targetTempInput).toHaveValue(160);
  });

  it('should call onAdd with the correct item when the form is submitted', () => {
    const mockOnAdd = jest.fn(); // Mock the onAdd function
    render(<GrillItemForm onAdd={mockOnAdd} />);

    const nameInput = screen.getByPlaceholderText('Item Name');
    const cookTimeInput = screen.getByPlaceholderText('Cook Time (s)');
    const flipTimeInput = screen.getByPlaceholderText('Flip Time (s)');
    const targetTempInput = screen.getByPlaceholderText('Target Temp (°F)');
    const submitButton = screen.getByText('Add Item');

    fireEvent.change(nameInput, { target: { value: 'Burger 1' } });
    fireEvent.change(cookTimeInput, { target: { value: '300' } });
    fireEvent.change(flipTimeInput, { target: { value: '150' } });
    fireEvent.change(targetTempInput, { target: { value: '160' } });

    fireEvent.click(submitButton);

    expect(mockOnAdd).toHaveBeenCalledWith({
      id: 'mocked-uuid', // Since we mocked crypto.randomUUID
      name: 'Burger 1',
      cookTime: 300,
      flipTime: 150,
      targetTemp: 160,
      state: 'before-grill',
    });
  });
});
