<script>
import BudgetPlan from "../components/BudgetPlan.vue";
import { RouterView } from "vue-router";
export default {
  components: {
    BudgetPlan,
  },
  async beforeMount() {
    this.fetData();
  },
  updated() {
    this.fetData();
  },
  data() {
    return {
      plans: [],
      dataFetched: false,
      countSign: 1,
      page: 1,
      hasData: false,
      total: 0,
    };
  },
  methods: {
    lastPlan() {
      this.page--;
      this.fetData();
    },
    nextPlan() {
      this.page++;
      this.fetData();
    },
    async fetData() {
      const id = this.$getCookie("userId");
      const page = this.page;
      this.axios
        .get(
          "http://localhost:8080/budgetPlan/fetchBudgetPlans?page=" +
            page +
            "&id=" +
            id
        )
        .then((response) => {
          this.$store.state.editPlans = response.data.data;
          this.plans = this.$store.state.editPlans;
          if (this.plans.length > 0) {
            this.hasData = true;
            this.total = this.plans[0].total;
          } else this.hasData = false;
          this.dataFetched = true;
        });
    },
    async deletePlan(id) {
      this.axios
        .get("http://localhost:8080/budgetPlan/deletePlan?id=" + id)
        .then((response) => {
          if (response.data.data) {
            this.fetData();
          }
        });
    },
    addPlan() {
      const currentPath = this.$route.path;
      this.$router.push(`${currentPath}/plan/add`);
    },
  },
  computed: {
    lastValidate() {
      return this.page <= 1;
    },
    nextValidate() {
      return this.total == this.page;
    },
    updateKey() {
      return this.$store.state.updateBudgetPlan;
    },
  },
};
</script>
<template>
  <div
    class="plans-container"
    v-if="dataFetched"
    :sign="countSign"
    :change="updateKey"
  >
    <h2 id="title">budget plans</h2>
    <div class="add-container">
      <button
        :class="{ btn: true, 'prev-page': true, inactive: lastValidate }"
        :disabled="lastValidate"
        @click="lastPlan()"
      >
        Last plan
      </button>
      <button class="add-plan btn" @click="addPlan()">Add Plan</button>
      <button
        :class="{ btn: true, 'next-page': true, inactive: lastValidate }"
        :disabled="nextValidate"
        @click="nextPlan()"
      >
        Next plan
      </button>
    </div>
    <div class="data-panel" v-if="hasData">
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
    <div class="data-panel no-data" v-else>no budget plans yet</div>
    <div class="edit-panel">
      <RouterView></RouterView>
    </div>
  </div>
  <div class="loading" v-else>
    <h3>Loading...</h3>
  </div>
</template>

<style scoped>
.no-data {
  margin-top: 5%;
  color: #5b3674;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.btn {
  margin: 0 0.75rem !important;
}
.add-plan {
  background: #694f8e;
  color: wheat;
}
.prev-page,
.next-page {
  font-size: 0.75rem;
  color: #b692c2;
}
.add-container {
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}
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
  overflow: hidden;
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
