export interface GrillItem {
  id: string;
  name: string;
  cookTime: number; // total cook time in seconds
  flipTime: number; // midpoint of cooktime
  targetTemp: number;
  state: GrillState;
}

export type GrillState = 'before-grill' | 'first-side' | 'second-side' | 'done'