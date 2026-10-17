export class InMemoryRepository<T extends { id: string }> {
  private items = new Map<string, T>();

  async save(item: T): Promise<void> {
    this.items.set(item.id, item);
  }

  async findById(id: string): Promise<T | null> {
    return this.items.get(id) ?? null;
  }

  async findAll(): Promise<T[]> {
    return Array.from(this.items.values());
  }
}

export function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}
