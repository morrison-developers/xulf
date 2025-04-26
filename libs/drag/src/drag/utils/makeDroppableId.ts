export function makeDroppableId(targetId: string | null, position: 'inside' | 'above' | 'below') {
  return `${targetId ?? 'root'}-${position}`;
}
