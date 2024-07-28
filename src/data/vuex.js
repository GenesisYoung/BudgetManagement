import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      // settings
      periodStart: "10",
      currency: "$",
      // dashboard chart options
      fullChartOption: {},
      incomeChartOption: {},
      expenseChartOption: {},
      surplusChartOption: {},
      // budegt plans
      plans: [],
      editPlans: [],
      // prompt message
      promptMsg: "defalt alert!",
      promptStatus: false,
      promptCount: 1,
      dashboardPageAlpha: 1,
      dashboardPageBeta: 1,
      // update key
      updateBudgetPlan: 1,
    };
  },
  getters: {
    fullChart(state) {
      return state.fullChartOption;
    },
    incomeChart(state) {
      return state.incomeChartOption;
    },
    expenseChart(state) {
      return state.expenseChartOption;
    },
    surplusChart(state) {
      return state.surplusChartOption;
    },
    plans: (state) => (from, to) => {
      return state.plans.slice(from, to);
    },
  },
  mutations: {
    updatePlan(state, id, plan) {
      state.plans.forEach((item, index) => {
        if (item.id === id) state.plans[index] = plan;
      });
    },
    deletePlan(state, id) {
      state.plans.forEach((item, index) => {
        if (item.id === id) state.plans.splice(index, 1);
      });
    },
    addPlan(state, plan) {
      state.plans.push(plan);
    },
  },
});

export default store;
