'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { GrillItem } from '../registry';
import { calculateStartTimes } from '../utils/grillUtils';

type GrillState = {
  activeGrillItems: GrillItem[];
  completedGrillItems: GrillItem[];
  cookingMode: boolean; // Indicates if cooking mode is active
  readyToCook: boolean; // Indicates if the grill is ready to start cooking
  totalCookTime: number; // Tracks the maximum cook time of all items
};

type GrillAction =
  | { type: 'ADD_ITEM'; payload: GrillItem }
  | { type: 'MARK_DONE'; payload: string }
  | { type: 'LOAD_STATE'; payload: GrillState }
  | { type: 'START_COOKING' }
  | { type: 'END_COOKING' }
  | { type: 'RESET' }
  | { type: 'SET_READY_TO_COOK' }
  | { type: 'FLIP_ITEM'; payload: string }
  | { type: 'COMPLETE_ITEM'; payload: string }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'SET_COOKING_MODE'; payload: boolean }
  | { type: 'UPDATE_TIMERS' };

const initialState: GrillState = {
  activeGrillItems: [],
  completedGrillItems: [],
  cookingMode: false,
  readyToCook: false,
  totalCookTime: 0,
};

const grillReducer = (state: GrillState, action: GrillAction): GrillState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem = {
        ...action.payload,
        remainingTime: action.payload.cookTime, // Initial remaining time
        startTime: null, // Timer not started yet
      };

      const newTotalCookTime = Math.max(state.totalCookTime, newItem.remainingTime);

      const updatedItems = calculateStartTimes(
        [...state.activeGrillItems, newItem],
        newTotalCookTime
      );

      return {
        ...state,
        activeGrillItems: updatedItems,
        totalCookTime: newTotalCookTime,
        readyToCook: updatedItems.length > 0, // Set readyToCook if items exist
      };
    }
    case 'REMOVE_ITEM': {
      const updatedItems = state.activeGrillItems.filter((item) => item.id !== action.payload);

      const newTotalCookTime =
        updatedItems.length > 0
          ? Math.max(...updatedItems.map((item) => item.remainingTime || 0))
          : 0;

      const recalculatedItems = calculateStartTimes(updatedItems, newTotalCookTime);

      return {
        ...state,
        activeGrillItems: recalculatedItems,
        totalCookTime: newTotalCookTime,
        readyToCook: recalculatedItems.length > 0, // Update readyToCook status
      };
    }
    case 'SET_READY_TO_COOK': {
      return {
        ...state,
        readyToCook: true,
      };
    }
    case 'FLIP_ITEM': {
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
      return {
        ...state,
        activeGrillItems: state.activeGrillItems.map((item) =>
          item.id === action.payload ? { ...item, state: 'done' } : item
        ),
      };
    }
    case 'LOAD_STATE': {
      return {
        ...action.payload,
        cookingMode: action.payload.cookingMode ?? false,
        readyToCook: action.payload.activeGrillItems.length > 0, // Set readyToCook based on loaded items
      };
    }
    case 'START_COOKING': {
      const startTime = Date.now();
      return {
        ...state,
        cookingMode: true,
        readyToCook: false, // Clear readyToCook when cooking starts
        activeGrillItems: state.activeGrillItems.map((item) => ({
          ...item,
          startTime: startTime,
        })),
      };
    }
    case 'END_COOKING': {
      return {
        ...state,
        cookingMode: false,
        readyToCook: true,
        activeGrillItems: state.activeGrillItems.map((item) => ({
          ...item,
          remainingTime: 0, // Reset remaining time
          startTime: null,  // Clear start time
          isComplete: false, // Reset completion status if applicable
        })),
      };
    }
    case 'SET_COOKING_MODE': {
      return { ...state, cookingMode: action.payload };
    }
    case 'UPDATE_TIMERS': {
      const currentTime = Date.now();
      return {
        ...state,
        activeGrillItems: state.activeGrillItems.map((item) => {
          if (!item.startTime) return item;
          const elapsedTime = (currentTime - item.startTime) / 1000;
          const newRemainingTime = Math.max(item.cookTime - elapsedTime, 0);
          return {
            ...item,
            remainingTime: newRemainingTime,
          };
        }),
      };
    }
    case 'RESET': {
      return initialState;
    }
    default: {
      console.warn('[Reducer] Unknown action type:', (action as GrillAction).type);
      return state;
    }
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

  // Timer synchronization
  useEffect(() => {
    if (state.cookingMode) {
      const interval = setInterval(() => {
        dispatch({ type: 'UPDATE_TIMERS' });
      }, 1000); // Update every second

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [state.cookingMode]);

  // Rehydrate state from localStorage on load
  useEffect(() => {
    const savedState = localStorage.getItem('grillState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      const currentTime = Date.now();

      // Recalculate remaining time
      parsedState.activeGrillItems = parsedState.activeGrillItems.map((item: GrillItem) => {
        if (!item.startTime) return item;
        const elapsedTime = (currentTime - item.startTime) / 1000;
        const newRemainingTime = Math.max(item.cookTime - elapsedTime, 0);
        return {
          ...item,
          remainingTime: newRemainingTime,
        };
      });

      dispatch({ type: 'LOAD_STATE', payload: parsedState });
    }
    setIsHydrated(true);
  }, []);

  // Persist state to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('grillState', JSON.stringify(state));
    }
  }, [state, isHydrated]);

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

  const onComplete = (id: string) => {
    dispatch({ type: 'COMPLETE_ITEM', payload: id });
  };

  const handleAddGrillItem = (item: GrillItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  return { state, dispatch, onComplete, handleAddGrillItem };
};
