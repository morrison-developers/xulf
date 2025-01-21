import { CookData } from "../types/grill-types";

export const cookData: CookData = {
  steak: {
    temperatures: {
      rare: {
        times: {
          0.75: [4, 2],
          1: [5, 3],
          1.25: [5, 4],
          1.5: [6, 4],
          1.75: [7, 5],
        },
      },
      mediumRare: {
        times: {
          0.75: [5, 3],
          1: [6, 4],
          1.25: [6, 5],
          1.5: [7, 5],
          1.75: [8, 6],
        },
      },
      medium: {
        times: {
          0.75: [5, 4],
          1: [6, 5],
          1.25: [7, 5],
          1.5: [7, 6],
          1.75: [8, 7],
        },
      },
      mediumWell: {
        times: {
          0.75: [6, 4],
          1: [7, 5],
          1.25: [8, 6],
          1.5: [9, 7],
          1.75: [10, 8],
        },
      },
      well: {
        times: {
          0.75: [7, 5],
          1: [8, 6],
          1.25: [9, 7],
          1.5: [10, 8],
          1.75: [11, 9],
        },
      },
    },
    defaultThickness: 1, // Default thickness in inches
  },
};
