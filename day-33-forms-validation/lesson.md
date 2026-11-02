<!-- WINTER ARC BANNER START -->
![Winter Arc](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmEwM2cyZzh2Z3hteTVtc3plcjN2ZHZ3NXNzemE2M211d3RyMmM1OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/wVRM3ItKfEsmc/giphy.gif)
<!-- WINTER ARC BANNER END -->

# Day 33: Form Architecture & Validation

> *"Controlled inputs re-render the entire component on every keystroke. Uncontrolled inputs with field refs deliver smooth 60fps performance."*

---

## 1. Controlled vs Uncontrolled Inputs
- **Controlled**: `value={state}` + `onChange`. High render cost on large forms without debouncing.
- **Uncontrolled (React Hook Form pattern)**: DOM holds state; React registers refs and listens only on blur/submit or dirty states.

---

## 2. Further Reading
- [React Hook Form](https://react-hook-form.com/)
