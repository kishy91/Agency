# Agency Runnable Solution

This is a runnable solution verified by a test suite that handles a calculation for each agent's commission along with total commission given a policy amount, an agent's hierarchy, and a commission plan. This solution was designed to be maintainable, flexible, and scalable to allow for further expansion of handling future scenarios.

## Instructions

You will need Node version >= 8.

To gather all dependencies:

```
npm install
```

To generate log file:

```
npm run start
```

To run test suite (tests passed will appear on terminal):

```
npm run test
```

## Use Cases

1. If a new agent object is instantiated and wants to add a hierarchy that that agent is already listed as a super agent in, there are multiple ways to handle it:

- Truncate the hierarchy at the spot of where the agent is and follow it from there as usual

   * Example: If Super Agent A is instantiated as an agent object (akin to Bob) and wants to use hierarchy H1, then agent object A would have hierarchy A -> C.

- Return an error saying this particular cannot use a hierarchy that the agent is listed as a super agent in
- Return an error saying a super agent cannot be instantiated as an agent (akin to Bob)

2. If a commission plan has a list of distributions that is longer than the amount of agents in a particular hierarchy, there are multiple ways to handle that:

- Take the remaining distributions that are not allocated to a particular agent and redistribute them equally amongst the agents

  * Example: Plan C is [40%, 30%, 20%, 10%] but Hierarchy H3 only has two total agents: Agent Mark -> Super Agent T. The 20% and 10% aren't allocated so 20% + 10% = 30% would be equally distributed to Agent Mark -> Super Agent T so they would each get 55% and 45%, respectively.

- Take the remaining distributions that are not allocated to a particular agent and redistribute them proportional to what the agents distributions would have been amongst themselves.

  * Example: Plan C is [40%, 30%, 20%, 10%] but Hierarchy H3 only has two total agents: Agent Mark -> Super Agent T. The 20% and 10% aren't allocated so 20% + 10% = 30% and the total amount allocated currently for Mark and Super Agent T is 40% + 30% = 70%. The 30% would be distributed such that Agent Mark would get (40%/70%) * 30% + 40% = ~57.143% and Super Agent T would get (30%/70%) * 30% + 30% = ~42.157%.

- Take the remaining distributions that are not allocated to a particular agent and do not allocate them at all (seems unlikely since commissions would be lost but technically still possible)
