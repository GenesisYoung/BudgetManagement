import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state() {
    return {
      // settings
      settingId: 0,
      periodStart: "10",
      currency: "$",
      autoAllocation: 1,
      allocationRule: 1,
      levelAlpha: 50,
      levelBeta: 30,
      levelSigma: 20,
      accountId: 0,
      // auto
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
      promptBackground: "#ff8080",
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
  plugins: [createPersistedState()],
});

export default store;
