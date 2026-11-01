# Day 32 Stretch Challenge: Optimistic Mutation Pipeline with Rollback

Implement `optimisticMutate({ queryKey, updateFn, rollbackFn, networkFn })` guaranteeing rollback to cache snapshot if `networkFn` fails.
