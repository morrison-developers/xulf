'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { GrillItem } from '../registry';

type GrillState = {
  activeGrillItems: GrillItem[];
  completedGrillItems: GrillItem[];
};

type GrillAction =
  | { type: 'ADD_ITEM'; payload: GrillItem }
  | { type: 'MARK_DONE'; payload: string }
  | { type: 'LOAD_STATE'; payload: GrillState };

const initialState: GrillState = {
  activeGrillItems: [],
  completedGrillItems: [],
};

const grillReducer = (state: GrillState, action: GrillAction): GrillState => {
  console.log('[Reducer] Action received:', action);
  switch (action.type) {
    case 'ADD_ITEM':
      console.log('[Reducer] Adding item to activeGrillItems:', action.payload);
      return {
        ...state,
        activeGrillItems: [...state.activeGrillItems, action.payload],
      };
    case 'MARK_DONE':
      const item = state.activeGrillItems.find((item) => item.id === action.payload);
      if (!item) return state;
      return {
        activeGrillItems: state.activeGrillItems.filter((item) => item.id !== action.payload),
        completedGrillItems: [...state.completedGrillItems, { ...item, state: 'done' }],
      };
    case 'LOAD_STATE':
      console.log('[Reducer] Loading state from localStorage:', action.payload);
      return action.payload;
    default:
      console.warn('[Reducer] Unknown action type:', (action as any).type); // Use `as any` here
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
    const savedState = localStorage.getItem("grillState");
    if (savedState) {
      console.log("[GrillProvider] Loaded state from localStorage:", JSON.parse(savedState));
      dispatch({ type: "LOAD_STATE", payload: JSON.parse(savedState) });
    }
    setIsHydrated(true); // Signal that hydration is complete
  }, []);

  // Save state to localStorage whenever it updates
  useEffect(() => {
    if (isHydrated) {
      console.log("[GrillProvider] State updated. Saving to localStorage:", state);
      localStorage.setItem("grillState", JSON.stringify(state));
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
  console.log('[useGrill] Context accessed:', context);
  return context;
};
