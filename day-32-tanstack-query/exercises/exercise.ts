export class QueryCache {
  private cache = new Map<string, { data: any; isStale: boolean }>();

  setQueryData(key: string, data: any): void {
    // TODO: Implement setQueryData
    this.cache.set(key, { data, isStale: false });
  }

  getQueryData(key: string): any {
    return this.cache.get(key)?.data;
  }

  isStale(key: string): boolean {
    return this.cache.get(key)?.isStale || false;
  }

  invalidateQueries(key: string): void {
    if (this.cache.has(key)) {
      this.cache.set(key, { ...this.cache.get(key)!, isStale: true });
    }
  }
  
}
