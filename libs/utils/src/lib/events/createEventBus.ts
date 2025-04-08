type EventCallback = (payload?: any) => void;

export function createEventBus() {
  const listeners: Record<string, EventCallback[]> = {};

  return {
    on(event: string, callback: EventCallback) {
      listeners[event] ??= [];
      listeners[event].push(callback);
    },
    off(event: string, callback: EventCallback) {
      listeners[event] = (listeners[event] ?? []).filter(cb => cb !== callback);
    },
    emit(event: string, payload?: any) {
      for (const cb of listeners[event] ?? []) {
        cb(payload);
      }
    },
    clear() {
      Object.keys(listeners).forEach(key => delete listeners[key]);
    },
  };
}
