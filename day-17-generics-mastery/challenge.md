# Day 17 Stretch Challenge: Type-Safe Event Bus with Generic Payload Registry

Build an `EventBus<Events>` where `Events` is an interface mapping event names to payload types, ensuring `.emit(event, payload)` and `.on(event, handler)` are strictly checked.
