export function throttle<T extends (...args: any[]) => void>(fn: T, limit: number): T {
  let inThrottle = false;
  return function (...args: any[]) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  } as T;
}
