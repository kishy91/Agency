const log = (message) => process.env.NODE_ENV === "test" ? function() {} : console.log(message);

class Agency {
    constructor(agents = [], plans = {}, rates = {}) {
        this.agents = agents;
        this.plans = plans;
        this.rates = rates;
        this.totalProfit = 0;
    }

    calculateAgentCommissions(agentName, hierKey, amount, plan) {
        this.totalProfit = 0;

        const agent = this.agents.find(obj => obj.name === agentName);
        if (!agent) {
            throw new Error(`No agent found for ${agentName}`);
        }
        
        const selectedPlan = this.plans[plan];
        if (!plan) {
            throw new Error(`No plan found for ${plan}`);
        }
        
        const hierarchy = agent.getHierarchyByKey(hierKey);
        let agentsCommission = [];
        let commission = 0;

        for (let i = 0; i < hierarchy.length; i++) {
            const planRate = !selectedPlan[i] ? 0 : selectedPlan[i]
            const agentId = hierarchy[i];
            const agentRate = this.rates[agentId];
            const agentProfit = Math.round(planRate * agentRate * amount);
            this.totalProfit += agentProfit;
            log(`Agent ${agentId} made ${planRate} * ${agentRate} * ${amount} = $${agentProfit}`);

            let obj = {};
            obj[agentId] = agentProfit;
            agentsCommission.push(obj);
        }
        log(`Total commission collected is $${this.totalProfit}`);

        return agentsCommission;
    }

    getTotalProfit() {
        return this.totalProfit;
    }

}

export default Agency;