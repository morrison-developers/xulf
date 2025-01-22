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
        onComplete={mockOnComplete}
        onRemove={mockOnRemove}
        cookingMode={true}
      />
    );
  
    expect(screen.getByText(/steak/i)).toBeInTheDocument();
  
    // Wait for DOM updates to reflect the expected phase
    act(() => {
      jest.advanceTimersByTime(0);
    });
  
    expect(screen.getByText('Phase: time-to-flip')).toBeInTheDocument();
  });

  it('calls onRemove when the remove button is clicked', () => {
    render(
      <GrillItemCard
        item={{ ...testItem, state: 'done' }}
        cookData={cookData}
        onComplete={mockOnComplete}
        onRemove={mockOnRemove}
        cookingMode={false}
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
        onComplete={mockOnComplete}
        onRemove={mockOnRemove}
        cookingMode={true}
      />
    );
  
    expect(screen.getByText(/Cooking complete!/i)).toBeInTheDocument();
    expect(screen.getByText(/Remove Item/i)).toBeInTheDocument();
  });

  it('transitions phases correctly during cooking', () => {
    jest.useFakeTimers();
  
    render(
      <GrillItemCard
        item={{ ...testItem, state: 'waiting', waitToStart: 1 }}
        cookData={cookData}
        onComplete={mockOnComplete}
        onRemove={mockOnRemove}
        cookingMode={true}
      />
    );
  
    act(() => {
      jest.advanceTimersByTime(60000);
    });

    expect(screen.getByText(/Ready to add to the grill!/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Add to Grill/i));

    act(() => {
      jest.advanceTimersByTime(testItem.flipTime * 1000);
    });

    expect(screen.getByText(/Time to flip!/i)).toBeInTheDocument();
    jest.useRealTimers();
  });
});
