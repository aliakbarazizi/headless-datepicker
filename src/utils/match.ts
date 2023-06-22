export function match<
  T extends PropertyKey,
  Map extends { [key in T]: (value: key) => any },
>(
  value: T,
  map: Map,
): Map extends { [key in T]: (value: key) => infer Return } ? Return : never {
  if (value in map) {
    const callback: any = map[value];
    return typeof callback === 'function' ? callback(value) : callback;
  }
  throw new Error('Invalid match value');
}
