export function areDepsEqual(prev: any[], next: any[]): boolean {
  if (prev.length !== next.length) return false;
  for (let i = 0; i < prev.length; i++) {
    if (!Object.is(prev[i], next[i])) return false;
  }
  return true;
}

export class MockHookRunner {
  private states: any[] = [];
  private index = 0;

  startRender(): void {
    this.index = 0;
  }

  useState<T>(initial: T): [T, (next: T) => void] {
    const currentIndex = this.index;
    if (this.states[currentIndex] === undefined) {
      this.states[currentIndex] = initial;
    }
    const setter = (nextVal: T) => {
      this.states[currentIndex] = nextVal;
    };
    this.index++;
    return [this.states[currentIndex], setter];
  }
}
