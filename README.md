# node thread

## Explanation 
Because of it's a simulation of threading we can't read specific message and set it as strict "value". Otherwise it will be 
rewritten by others messages that randomly created. At the beginning I thought we can detect small amount of messages and 
set them in a batch, but seems we need to create a non-blocking solution for `Confirm` method. So I choose the `map`.


## Improvement
The structure was refactored. Each class was moved to a separate file. Created module `index.ts` to easily import from `src`.
Unfortunately, the `@src` wasn't implemented, but it's doable. Unit and integration tests must be implemented.
