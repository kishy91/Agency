class Agent {
    constructor(name = "", hierarchies = {}) {
        this.name = name;

        /*
            Each agent will have its own copy of the hierarchy.
            This ensures that different agents can use the same hierarchy
            but have their own references to them.
        */
        this.hierarchies = JSON.parse(JSON.stringify(hierarchies));

        for (const hier in this.hierarchies) {
            this.adjustHierarchies(hier);
        }
    }

    adjustHierarchies(hier) {
        this.hierarchies[hier].unshift(this.name);
    }

    addHierarchy(key, obj) {
        if (this.hierarchies[key]) {
            throw new Error(`Hierarchy ${key} already exists`);
        }
        const hierObj = JSON.parse(JSON.stringify(obj));
        this.hierarchies[key] = hierObj;
        this.adjustHierarchies(key);
    }

    removeHierarchy(key) {
        if (this.hierarchies[key]) {
            delete this.hierarchies[key];
        } else {
            throw new Error(`No such hierarchy ${key}`);
        }
    }

    getHierarchyByKey(key) {
        if (this.hierarchies[key]) {
            return this.hierarchies[key];
        } 
        throw new Error(`No such hierarchy ${key}`);
    }

    getAllHierarchies() {
        return this.hierarchies;
    }

}

export default Agent;