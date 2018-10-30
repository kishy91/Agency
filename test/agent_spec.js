import {assert, should, expect} from 'chai';
import Agency from '../app/agency';
import Agent from '../app/agent';
import Hierarches from '../app/hierarchy.json';
import Plans from '../app/plans.json';
import Rates from '../app/agents_rate.json';

const H1 = Hierarches["H1"];
const Bob = new Agent("Bob", {"H1": H1});
const bobsHierarchies = Bob.getAllHierarchies();

describe("Agent should be create with", () => {

    it("proper name", () => {
        expect(Bob.name).to.equal("Bob");
    });

    it("proper hierarchies", () => {
        expect(Object.keys(bobsHierarchies).length).to.equal(1);
        expect(Bob.getAllHierarchies()).to.deep.equal({"H1": ["Bob", "X", "A", "C"]});
    });

    it("adjusted hierarches for Joe and Bob", () => {
        Bob.removeHierarchy("H1");
        expect(H1).to.deep.equal(["X", "A", "C"]);
        const Joe = new Agent("Joe", {"H1": H1});
        expect(Joe.getAllHierarchies()).to.deep.equal({"H1": ["Joe", "X", "A", "C"]});
        Joe.removeHierarchy("H1");
        Bob.addHierarchy("H1", H1);
    });

});

describe("Agent Bob should be able to", () => {

    it("get all hierarchies", () => {
        expect(Object.keys(bobsHierarchies).length).to.equal(1);
        expect(Bob.getAllHierarchies()).to.deep.equal({"H1": ["Bob", "X", "A", "C"]});
    });

    it("get hierarchy by key", () => {
        expect(Bob.getHierarchyByKey("H1")).to.deep.equal(["Bob", "X", "A", "C"]);
    });

    it("add a hierarchy", () => {
        expect(Object.keys(bobsHierarchies).length).to.equal(1);
        Bob.addHierarchy("H2", Hierarches["H2"]);
        expect(Object.keys(bobsHierarchies).length).to.equal(2);
        expect(Bob.getHierarchyByKey("H2")).to.deep.equal(["Bob", "A", "X", "D", "Z"]);
        expect(Bob.getAllHierarchies()).to.deep.equal({"H1": ["Bob", "X", "A", "C"], "H2": ["Bob", "A", "X", "D", "Z"]});
    });

    it("remove a hierarchy", () => {
        expect(Object.keys(bobsHierarchies).length).to.equal(2);
        expect(Bob.getAllHierarchies()).to.deep.equal({"H1": ["Bob", "X", "A", "C"], "H2": ["Bob", "A", "X", "D", "Z"]});
        Bob.removeHierarchy("H2");
        expect(Object.keys(bobsHierarchies).length).to.equal(1);
        expect(Bob.getHierarchyByKey("H1")).to.deep.equal(["Bob", "X", "A", "C"]);
        const h2 = Hierarches["H2"];
        expect(h2).to.deep.equal(["A", "X", "D", "Z"]);
    });

});

describe("Agent should throw error if", () => {

    it ("finding a hierarchy that doesn't exist", () => {
        expect(function () {
            Bob.getHierarchyByKey("H3"); 
        }).to.throw(Error);
    });

    it ("removing a hierarchy that doesn't exist", () => {
        expect(function () {
            Bob.removeHierarchy("H3"); 
        }).to.throw(Error);
    });

});