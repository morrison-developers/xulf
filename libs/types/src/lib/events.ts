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
