import { render, screen, fireEvent, act } from '@testing-library/react';
import GrillItemCard from './GrillItem';
import { GrillItem, cookData } from '../../registry';

// Extract cookTime and flipTime from cookData
const getTestCookTimes = (name: string, targetTemp: string, thickness: number) => {
  const itemData = cookData[name.toLowerCase()];
  if (!itemData) throw new Error(`No cook data found for ${name}`);
  
  const tempData = itemData.temperatures[targetTemp as keyof typeof itemData.temperatures]?.times[thickness];
  if (!tempData) throw new Error(`No times found for ${targetTemp} at thickness ${thickness}`);
  
  const [flipTime, cookTime] = tempData;
  return { flipTime: flipTime * 60, cookTime: cookTime * 60 }; // Convert to seconds
};

// Define test item dynamically
const { flipTime, cookTime } = getTestCookTimes('steak', 'medium', 1);

const testItem: GrillItem = {
  id: '1',
  name: 'steak',
  targetTemp: 'medium',
  state: 'first-side',
  thickness: 1,
  flipTime, // Use calculated value
  cookTime, // Use calculated value
};

describe('GrillItemCard', () => {
  const mockOnFlip = jest.fn();
  const mockOnComplete = jest.fn();
  const mockOnRemove = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the item name, phase, and progress bar', () => {
    render(
      <GrillItemCard
        item={testItem}
        cookData={cookData}
        onFlip={mockOnFlip}
        onComplete={mockOnComplete}
        onRemove={mockOnRemove}
      />
    );

    expect(screen.getByText(/steak/i)).toBeInTheDocument();
    expect(screen.getByText('Phase: first-side')).toBeInTheDocument();
    expect(screen.getByText(`Time Left: ${flipTime}s`)).toBeInTheDocument(); // Dynamically calculate
  });

  it('calls onFlip when flip time is reached', () => {
    jest.useFakeTimers();

    render(
      <GrillItemCard
        item={testItem}
        cookData={cookData}
        onFlip={mockOnFlip}
        onComplete={mockOnComplete}
        onRemove={mockOnRemove}
      />
    );

    act(() => {
      jest.advanceTimersByTime(flipTime * 1000); // Simulate flip time
    });

    expect(mockOnFlip).toHaveBeenCalledWith(testItem.id);
    jest.useRealTimers();
  });

  it('calls onComplete when cooking is complete', () => {
    jest.useFakeTimers();
  
    render(
      <GrillItemCard
        item={testItem}
        cookData={cookData}
        onFlip={mockOnFlip}
        onComplete={mockOnComplete}
        onRemove={mockOnRemove}
      />
    );
  
    act(() => {
      jest.advanceTimersByTime(cookTime); // Simulate full cook time
    });
  
    expect(mockOnComplete).toHaveBeenCalledWith(testItem.id);
    jest.useRealTimers();
  });

  it('calls onRemove when the remove button is clicked', () => {
    render(
      <GrillItemCard
        item={{ ...testItem, state: 'done' }}
        cookData={cookData}
        onFlip={mockOnFlip}
        onComplete={mockOnComplete}
        onRemove={mockOnRemove}
      />
    );
    // simulate done
    const removeButton = screen.getByText(/Remove Item/i);
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledWith(testItem.id);
  });

  it('displays "Cooking complete" message and persists when cooking is done', () => {
    render(
      <GrillItemCard
        item={{ ...testItem, state: 'done' }}
        cookData={cookData}
        onFlip={mockOnFlip}
        onComplete={mockOnComplete}
        onRemove={mockOnRemove}
      />
    );
  
    expect(screen.getByText(/Cooking complete!/i)).toBeInTheDocument();
    expect(screen.getByText(/Remove Item/i)).toBeInTheDocument();
  });
});
