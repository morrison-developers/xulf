export interface GrillItem {
  id: string;
  name: string;
  cookTime: number; // total cook time in seconds
  flipTime: number; // midpoint of cooktime
  targetTemp: TargetTemp;
  state: GrillState;
}

export type TargetTemp = 'rare' | 'mediumRare' | 'medium' | 'mediumWell' | 'well';
export type GrillState = 'before-grill' | 'first-side' | 'second-side' | 'done';

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

