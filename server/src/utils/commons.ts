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

export function promiseMapTo<T>(value: T): (data: any) => T {
  return function () {
    return value;
  };
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function encodeToBase64(value: string): string {
  return Buffer.from(value).toString('base64');
}
