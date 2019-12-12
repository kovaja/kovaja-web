/**
 * Side effect for promise chain. Returned functin:
 * Takes resolved data, calls given side effect function with that data and returns the resolved data.
 */
export function promiseTap<T>(sideEffect: (data: T) => void): (data: T) => T {
  return function (data: T) {
    sideEffect(data);

    return data;
  };
}
