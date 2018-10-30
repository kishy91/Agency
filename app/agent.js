class Agent {
    constructor(name = "", hierarchies = {}) {
        this.name = name;

        /*
            Each agent will have its own copy of the hierarchy.
            This ensures that different agents can use the same hierarchy
            but have their own references to them.
        */
        this.hierarchies = JSON.parse(JSON.stringify(hierarchies));

        this.adjustHierarchies();
    }

    adjustHierarchies() {
        for (const hier in this.hierarchies) {
            this.hierarchies[hier].unshift(this.name);
        }
    }

    addHierarchy(key, obj) {
        const hierObj = JSON.parse(JSON.stringify(obj));
        hierObj.unshift(this.name);
        this.hierarchies[key] = hierObj;
    }

    removeHierarchy(key) {
        if (this.hierarchies[key]) {
            delete this.hierarchies[key];
        } else {
            throw new Error(`No such hierarchy, ${key}`);
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