export class Range {
  constructor(public start: number, public end: number, public step: number = 1) {
    // TODO: Implement Range
  }
  *[Symbol.iterator](): Iterator<number> {
    for(let i = this.start; i <= this.end; i += this.step) {
      yield i;
    }
  }
}

export async function* takeAsync<T>(source: AsyncIterable<T>, count: number): AsyncGenerator<T> {
  // TODO: Implement takeAsync
  let taken = 0;
  for await (const item of source) {
    if (taken >= count) break;
    yield item;
    taken++;
  }
}
