import Agency from './app/agency';
import Agent from './app/agent';
import Hierarches from './app/hierarchy.json';
import Plans from './app/plans.json';
import Rates from './app/agents_rate.json';

const H1 = Hierarches["H1"];
const Bob = new Agent("Bob", {"H1": H1});
const agents = [];
Bob.addHierarchy("H2", Hierarches["H2"]);
agents.push(Bob);

const theAgency = new Agency(agents, Plans, Rates);

console.log("Sale 1:");
theAgency.calculateAgentCommissions("Bob", "H1", 100000, "A");
console.log("Sale 2:")
theAgency.calculateAgentCommissions("Bob", "H2", 100000, "B");