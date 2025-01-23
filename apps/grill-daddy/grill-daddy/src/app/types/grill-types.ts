export interface GrillItem {
  id: string;
  name: string;
  cookTime: number; // total cook time in seconds
  flipTime: number; // midpoint of cooktime
  targetTemp: TargetTemp;
  state: GrillState;
  thickness?: number; // Thickness in inches, optional
  startTime?: number | null;
  waitToStart?: number;
  remainingTime?: number;
}

export type TargetTemp = 'rare' | 'mediumRare' | 'medium' | 'mediumWell' | 'well';
export type GrillState =
  | 'waiting'        // Timer counting down until waitToStart reaches 0
  | 'before-grill'   // User is prompted to add the item to the grill
  | 'first-side'     // Timer for cooking the first side is active
  | 'time-to-flip'   // User is prompted to flip the item
  | 'second-side'    // Timer for cooking the second side is active
  | 'time-to-remove' // User is prompted to remove the item
  | 'done';          // Item is removed and marked as complete


export type CookTimes = {
  [thickness: number]: [number, number];
};

export type TemperatureData = {
  times: CookTimes;
};

export type CookData = {
  [item: string]: {
    temperatures: {
      [temp in TargetTemp]: {
        times: {
          [thickness: number]: [number, number]; // [pre-flip time, post-flip time]
        };
      };
    };
    defaultThickness?: number; // Default thickness for the item
  };
};

