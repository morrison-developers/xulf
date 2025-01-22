// src/utils/grillUtils.ts
import { GrillItem, CookData } from '../types/grill-types';

export const calculateStartTimes = (items: GrillItem[], maxCookTime: number): GrillItem[] => {
  return items.map((item) => {
    const waitToStart = maxCookTime - item.cookTime; // Calculate wait time based on the new max cook time
    return {
      ...item,
      waitToStart: Math.max(0, waitToStart), // Ensure no negative wait times
    };
  });
};

export const getCookingTimes = (item: GrillItem, cookData: CookData) => {
  const { targetTemp, thickness = 1 } = item;

  const tempData = cookData.steak.temperatures[targetTemp as keyof typeof cookData.steak.temperatures];
  if (!tempData) {
    throw new Error(`No temperature data found for targetTemp: ${targetTemp}`);
  }

  const times = tempData.times[thickness];
  if (!times) {
    throw new Error(`No cook times found for thickness: ${thickness}`);
  }

  const [preFlipTime, postFlipTime] = times; // Already in minutes
  const totalCookTime = preFlipTime + postFlipTime;

  return {
    flipTime: preFlipTime, // Return in minutes
    postFlipTime: postFlipTime, // Return in minutes
    cookTime: totalCookTime, // Return in minutes
  };
};