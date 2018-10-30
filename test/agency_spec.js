import {assert, should, expect} from 'chai';
import Agency from '../app/agency';
import Agent from '../app/agent';
import Hierarches from '../app/hierarchy.json';
import Plans from '../app/plans.json';
import Rates from '../app/agents_rate.json';

const H1 = Hierarches["H1"];
const Bob = new Agent("Bob", {"H1": H1});
const agents = [];
const plans = Plans;
const rates = Rates;
agents.push(Bob);
const theAgency = new Agency(agents, plans, rates);

describe("Agency should be create with", () => {

    it("proper agents", () => {
        const agentList = theAgency.agents;

        expect(agentList.length).to.equal(1);
        expect(agentList[0].name).to.equal("Bob");
    });

    it("proper plans", () => {
        expect(Object.keys(plans).length).to.equal(2);
        expect(plans["A"].length).to.equal(2);
        expect(plans["B"].length).to.equal(3);
    });

    it("proper rates", () => {
        expect(Object.keys(rates).length).to.equal(6);
        expect(rates["Bob"]).to.equal(0.02);
        expect(rates["A"]).to.equal(0.0325);
        expect(rates["C"]).to.equal(0.0225);
        expect(rates["D"]).to.equal(0.0275);
        expect(rates["X"]).to.equal(0.025);
        expect(rates["Z"]).to.equal(0.0175);
    });

});

describe("Agency should calculate commissions", () => {

    it("for each individual agent for Sale 1", () => {
        const agentsCommission = theAgency.calculateAgentCommissions("Bob", "H1", 100000, "A");
        expect(agentsCommission[0]["Bob"]).to.equal(1000);
        expect(agentsCommission[1]["X"]).to.equal(125);
        expect(agentsCommission[2]["A"]).to.equal(0);
        expect(agentsCommission[3]["C"]).to.equal(0);
    });

    it("for net profit for Sale 1", () => {
        theAgency.calculateAgentCommissions("Bob", "H1", 100000, "A");
        expect(theAgency.getTotalProfit()).to.equal(1125);
    });

    it("for each individual agent for Sale 2", () => {
        Bob.addHierarchy("H2", Hierarches["H2"]);
        const agentsCommission = theAgency.calculateAgentCommissions("Bob", "H2", 100000, "B");
        expect(agentsCommission[0]["Bob"]).to.equal(1400);
        expect(agentsCommission[1]["A"]).to.equal(260);
        expect(agentsCommission[2]["X"]).to.equal(100);
        expect(agentsCommission[3]["D"]).to.equal(0);
        expect(agentsCommission[4]["Z"]).to.equal(0);
    });

    it("for net profit for Sale 2", () => {
        theAgency.calculateAgentCommissions("Bob", "H2", 100000, "B");
        expect(theAgency.getTotalProfit()).to.equal(1760);
    });

});

describe("Agency should throw error if", () => {

    it ("agent is not found by name", () => {
        expect(function () {
            theAgency.calculateAgentCommissions("Jack", "H2", 100000, "B");
        }).to.throw(Error);
    });

    it("plan is not found by key", () => {
        expect(function () {
            theAgency.calculateAgentCommissions("Bob", "H3", 100000, "B");
        }).to.throw(Error);
    });

});