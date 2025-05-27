export function firstOrUndefined<T>(items: T[]): T | undefined {
  if (items.length === 0){
      return;
  }
  return items[0];
}
