export function myPromiseAll<T>(promises: Array<T | Promise<T>>): Promise<T[]> {
  // TODO: Implement myPromiseAll
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }
    const results: T[] = new Array(promises.length);
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (value) => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        },
        (reason) => {
          reject(reason);
        },
      );
    });
  });
}

export function myPromiseAllSettled<T>(
  promises: Array<T | Promise<T>>,
): Promise<
  Array<{ status: "fulfilled"; value: T } | { status: "rejected"; reason: any }>
> {
  // TODO: Implement myPromiseAllSettled
  return new Promise((resolve) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }

    const results: Array<
      { status: "fulfilled"; value: T } | { status: "rejected"; reason: any }
    > = new Array(promises.length);
    let completed = 0;
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(
          (value) => {
            results[index] = { status: "fulfilled", value };
          },
          (reason) => {
            results[index] = { status: "rejected", reason };
          },
        )
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        });
    });
  });
}
