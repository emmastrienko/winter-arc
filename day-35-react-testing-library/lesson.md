<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.tenor.com/Jz6HSaznUm4AAAAM/haikyuu-hinata.gif)
<!-- WINTER ARC BANNER END -->

# Day 35: Week 5 Review & Mini-Project: Accessible Data Grid

> *"Test components the way users interact with them. Never test internal state; test visible output and accessible roles."*

---

## 1. Guiding Principles of React Testing Library
1. Query by Role first (`getByRole('button', { name: /save/i })`).
2. Query by Text or Label (`getByLabelText`, `getByText`).
3. Only use `getByTestId` as an absolute last resort.
4. Use `@testing-library/user-event` over `fireEvent` to simulate realistic browser dispatch events.

---

## 2. Further Reading
- [Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles/)
