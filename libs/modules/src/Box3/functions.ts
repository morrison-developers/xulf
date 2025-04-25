import type { FunctionMeta } from '../types';

/**
 * Function graph metadata for the Box3 module.
 *
 * - `inputs`: functions this module can respond to (e.g. open a modal)
 * - `outputs`: functions this module can trigger (e.g. onClick event)
 *
 * Each can optionally include `config` to customize the behavior or connection.
 */
export const functionMeta: FunctionMeta = {
  inputs: [
    {
      name: 'exampleInput',
      type: 'action', // this module receives this trigger
      config: [
        {
          name: 'target',
          type: 'string',
          label: 'Target Module ID',
        },
      ],
    },
  ],
  outputs: [
    {
      name: 'exampleOutput',
      type: 'event', // this module triggers this output
      config: [
        {
          name: 'target',
          type: 'string',
          label: 'Target Module ID',
        },
      ],
    },
  ],
};
