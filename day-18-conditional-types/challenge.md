# Day 18 Stretch Challenge: URL Template Route Parameter Parser

Implement a type-level parser:
`type ExtractParams<Path extends string>` that extracts route parameters from `"/users/:userId/posts/:postId"` into `{ userId: string; postId: string }`.
