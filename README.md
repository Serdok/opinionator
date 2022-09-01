# Opinionator

A governor contract to give an opinion on something. The value of the proposal becomes the de-facto truth.


### Local tests

```shell
yarn run serve # This will create 20 accounts

# In another terminal
# This will create a `proposals.json` file containing all the created proposals.
yarn hardhat run scripts/propose.ts --network localhost 
yarn hardhat run scipts/vote.ts --network localhost
yarn hardhat run scripts/endVote.ts --network localhost
yarn hardhat run scripts/queue-and-execute --network localhost
```
