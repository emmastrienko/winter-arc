<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3R4d3FmbDB6OTZoZnQ3ZmR4Z2c0MmI4NzZxd25weGwydHJsMmt3OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/19S5OnlvTz1KzQB2Jv/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 26: Graph Algorithms (BFS, DFS, TopoSort)

> *"Social networks, dependency bundlers, and package managers (npm, pip) are directed graphs. Kahn's algorithm resolves their build order."*

---

## 1. Graph Representations
- **Adjacency List**: `Map<Node, Node[]>` (optimal for sparse graphs).
- **Adjacency Matrix**: 2D array (optimal for dense graphs).

---

## 2. Topological Sort (Kahn's In-Degree Algorithm)
Orders directed acyclic graph (DAG) vertices linearly:
1. Compute in-degree for every vertex.
2. Push all vertices with in-degree 0 into a queue.
3. While queue is not empty: pop vertex $u$, append to order, decrement neighbors' in-degree. If neighbor reaches 0, push to queue.
4. If output length < total vertices, a cycle exists!

---

## 3. Further Reading
- [Kahn's Topological Sort Algorithm](https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm)
