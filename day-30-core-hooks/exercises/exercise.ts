export function areDepsEqual(prev: any[], next: any[]): boolean {
  // TODO: Implement areDepsEqual
  if (prev.length !== next.length) {
    return false;
  }
  for (let i = 0; i < prev.length; i++) {
    if (!Object.is(prev[i], next[i])) {
      return false;
    }
  }
  return true;
}

export class MockHookRunner {
  // TODO: Implement mock hook runner
  private state: any[] = [];
  private index = 0;

  startRender(): void {
    this.index = 0;
  }

  useState<T>(initial: T): [T, (next: T) => void] {
    const currentIndex = this.index;
    if (this.state[currentIndex] === undefined) {
      this.state[currentIndex] = initial;
    }
    const setter = (nextVal: T) => {
      this.state[currentIndex] = nextVal;
    };
    this.index++;
    return [this.state[currentIndex], setter];
  }
}
