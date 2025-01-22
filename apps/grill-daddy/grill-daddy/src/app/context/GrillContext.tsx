'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { GrillItem } from '../registry';
import { calculateStartTimes } from '../utils/grillUtils';

type GrillState = {
  activeGrillItems: GrillItem[];
  completedGrillItems: GrillItem[];
  cookingMode: boolean; // Indicates if cooking mode is active
  totalCookTime: number; // Tracks the maximum cook time of all items
};

type GrillAction =
  | { type: 'ADD_ITEM'; payload: GrillItem }
  | { type: 'MARK_DONE'; payload: string }
  | { type: 'LOAD_STATE'; payload: GrillState }
  | { type: 'START_COOKING' }
  | { type: 'END_COOKING' }
  | { type: 'RESET' }
  | { type: 'FLIP_ITEM'; payload: string }
  | { type: 'COMPLETE_ITEM'; payload: string }
  | { type: 'REMOVE_ITEM'; payload: string };

const initialState: GrillState = {
  activeGrillItems: [],
  completedGrillItems: [],
  cookingMode: false,
  totalCookTime: 0,
};

const grillReducer = (state: GrillState, action: GrillAction): GrillState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newTotalCookTime = Math.max(
        state.totalCookTime,
        action.payload.cookTime
      );

      // Recalculate wait times for all items
      const updatedItems = calculateStartTimes(
        [...state.activeGrillItems, action.payload],
        newTotalCookTime
      );

      return {
        ...state,
        activeGrillItems: updatedItems,
        totalCookTime: newTotalCookTime,
      };
    }
    case 'REMOVE_ITEM': {
      const updatedItems = state.activeGrillItems.filter((item) => item.id !== action.payload);

      const newTotalCookTime =
        updatedItems.length > 0
          ? Math.max(...updatedItems.map((item) => item.cookTime))
          : 0;

      const recalculatedItems = calculateStartTimes(updatedItems, newTotalCookTime);

      return {
        ...state,
        activeGrillItems: recalculatedItems,
        totalCookTime: newTotalCookTime,
      };
    }
    case 'FLIP_ITEM': {
      // Transition item to the `time-to-flip` phase
      return {
        ...state,
        activeGrillItems: state.activeGrillItems.map((item) =>
          item.id === action.payload
            ? { ...item, state: 'time-to-flip' }
            : item
        ),
      };
    }
    case 'COMPLETE_ITEM': {
      // Transition item to `time-to-remove` phase
      return {
        ...state,
        activeGrillItems: state.activeGrillItems.map((item) =>
          item.id === action.payload
            ? { ...item, state: 'time-to-remove' }
            : item
        ),
      };
    }
    case 'MARK_DONE': {
      // Mark the item as fully completed
      return {
        ...state,
        activeGrillItems: state.activeGrillItems.map((item) =>
          item.id === action.payload ? { ...item, state: 'done' } : item
        ),
      };
    }
    case 'LOAD_STATE':
      return {
        ...action.payload,
        cookingMode: action.payload.cookingMode ?? false,
      };
    case 'START_COOKING':
      return {
        ...state,
        cookingMode: true,
      };
    case 'END_COOKING':
      return {
        ...state,
        cookingMode: false,
      };
    case 'RESET':
      return initialState;
    default:
      console.warn('[Reducer] Unknown action type:', (action as any).type);
      return state;
  }
};


export const GrillContext = createContext<{
  state: GrillState;
  dispatch: React.Dispatch<GrillAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

type GrillProviderProps = {
  children: ReactNode;
};

export const GrillProvider: React.FC<GrillProviderProps> = ({ children }: GrillProviderProps) => {
  const [state, dispatch] = useReducer(grillReducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  // Ensure localStorage is only accessed on the client
  useEffect(() => {
    const savedState = localStorage.getItem('grillState');
    if (savedState) {
      dispatch({ type: 'LOAD_STATE', payload: JSON.parse(savedState) });
    }
    setIsHydrated(true); // Signal that hydration is complete
  }, []);

  // Save state to localStorage whenever it updates
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('grillState', JSON.stringify(state));
    }
  }, [state, isHydrated]);

  // Only render children when hydration is complete
  if (!isHydrated) {
    return null; // Or a loading spinner
  }

  return <GrillContext.Provider value={{ state, dispatch }}>{children}</GrillContext.Provider>;
};

export const useGrill = () => {
  const context = useContext(GrillContext);
  if (!context) {
    throw new Error('useGrill must be used within a GrillProvider');
  }

  const { state, dispatch } = context;

  const onFlip = (id: string) => {
    console.log('[GrillContext] Flipping item:', id);
    dispatch({ type: 'FLIP_ITEM', payload: id });
  };

  const onComplete = (id: string) => {
    console.log('[GrillContext] Completing item:', id);
    dispatch({ type: 'COMPLETE_ITEM', payload: id });
  };

  const handleAddGrillItem = (item: GrillItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  return { state, dispatch, onFlip, onComplete, handleAddGrillItem };
};

