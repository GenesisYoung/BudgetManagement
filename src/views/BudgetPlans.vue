<script>
import BudgetPlan from "../components/BudgetPlan.vue";
import { RouterView } from "vue-router";
export default {
  components: {
    BudgetPlan,
  },
  async beforeMount() {
    const response = await fetch("/public/test/dashboard.json");
    const result = await response.json();
    this.$store.state.plans = result.plans;
    this.plans = this.$store.state.plans;
    this.dataFetched = true;
  },
  data() {
    return {
      plans: [],
      dataFetched: false,
      countSign:1
    };
  },
  methods: {
    deletePlan(id) {
      if (this.$store.state.plans)
        this.$store.state.plans = this.$store.state.plans.filter((plan) => {
          return plan.id != id;
        });
      this.plans=this.$store.state.plans
    }
  },
};
</script>
<template>
  <div class="plans-container" v-if="dataFetched" :sign="countSign">
    <h2 id="title">budget plans</h2>
    <div class="data-panel">
      <budget-plan
        v-for="plan in plans"
        :key="plan.id"
        :id="plan.id"
        :name="plan.name"
        :current="plan.current"
        :target="plan.target"
        :beginDate="plan.beginDate"
        :description="plan.description"
        @deletePlan="deletePlan"
      ></budget-plan>
    </div>
    <div class="edit-panel">
      <RouterView></RouterView>
    </div>
  </div>
  <div class="loading" v-else>
    <h3>Loading...</h3>
  </div>
</template>

<style scoped>
.loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.plans-container {
  /* margin-top: 1rem; */
  border-radius: 0.5rem;
  padding: 1rem 2.5rem;
  box-shadow: 0 0.25rem 0.3rem rgba(0, 0, 0, 0.7);
  background: #faf0e6;
  height: 100%;
  width: 75%;
  display: flex;
  justify-content: center;
  position: relative;
  flex-wrap: wrap;
  justify-items: flex-start;
}
h3 {
  color: wheat;
  font-family: Georgia, "Times New Roman", Times, serif;
  padding: 0.75rem;
  right: 5%;
  top: 17%;
  border-radius: 1rem;
  z-index: 999;
  background: #ad88c6;
}
h2 {
  font-family: "Playfair Display";
  color: #946da7;
  width: 100%;
  height: 20%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.plans-container {
  width: 100%;
  padding: 1rem 0;
}
.data-panel {
  width: 90%;
  height: 80%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: auto;
}
.plan-container {
  width: 100%;
}
</style>
