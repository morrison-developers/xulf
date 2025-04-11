export interface FunctionConnection {
  from: string; // node id
  to: string;   // node id
  type: 'event' | 'action'; // optional: use to differentiate
}
