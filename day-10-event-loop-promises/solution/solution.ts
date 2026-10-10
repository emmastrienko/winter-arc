export function myPromiseAll<T>(promises: Array<T | Promise<T>>): Promise<T[]> {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }
    const results: T[] = new Array(promises.length);
    let completed = 0;

    promises.forEach((p, idx) => {
      Promise.resolve(p)
        .then((val) => {
          results[idx] = val;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

export function myPromiseAllSettled<T>(
  promises: Array<T | Promise<T>>
): Promise<Array<{ status: 'fulfilled'; value: T } | { status: 'rejected'; reason: any }>> {
  return new Promise((resolve) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }
    const results = new Array(promises.length);
    let settledCount = 0;

    promises.forEach((p, idx) => {
      Promise.resolve(p)
        .then((value) => {
          results[idx] = { status: 'fulfilled', value };
        })
        .catch((reason) => {
          results[idx] = { status: 'rejected', reason };
        })
        .finally(() => {
          settledCount++;
          if (settledCount === promises.length) {
            resolve(results);
          }
        });
    });
  });
}
