export interface EventBinding {
  event: string; // e.g. "onClick"
  targetModuleId: string;
  action: string; // e.g. "openModal"
  params?: Record<string, any>;
}

export interface LogicConnection {
  from: {
    moduleId: string;
    event: string;
  };
  to: {
    moduleId: string;
    action: string;
  };
}

/**
 * Reverse mapping of logic connections.
 * For a given target module ID, shows the source module IDs and events that affect it.
 */
export type WiringMap = Record<
  string, // targetModuleId
  {
    input: string; // sourceModuleId
    event: string; // event on source module (e.g. "onClick")
  }[]
>;