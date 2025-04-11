// In @xulf/essentials
export const functionRegistry = {
  buttonOverlay: [
    {
      id: 'onClick',
      label: 'Button Click',
      type: 'output', // source of connection
      config: [
        {
          name: 'target',
          type: 'string',
          label: 'Target Module ID',
        },
      ],
    },
  ],
  modal: [
    {
      id: 'open',
      label: 'Open Modal',
      type: 'input', // accepts connection
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
