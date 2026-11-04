export function sortAndFilterGrid(
  rows: any[],
  query: string,
  sortKey: string,
  sortOrder: "asc" | "desc",
): any[] {
  // TODO: Implement sortAndFilterGrid
  let filtered = rows;
  if (query.trim()) {
    const q = query.toLowerCase();
    filtered = rows.filter((r) =>
      Object.values(r).some((val) => String(val).toLowerCase().includes(q)),
    );
  }

  return [...filtered].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
}
