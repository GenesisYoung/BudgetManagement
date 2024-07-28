<template>
  <pop-window backUrl="/plans">
    <template #title>
      {{ plan.name }}
    </template>
    <template #content>
      <form action="#" @submit.prevent="submitPlan()">
        <div class="mb-3 row">
          <label for="name" class="col-sm-3 col-form-label">Name:</label>
          <div class="col-sm-9">
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="plan.name"
              placeholder="plan name(if not filled, will be named as default name)"
            />
          </div>
          <div class="padding"></div>
          <label for="target" class="col-sm-3 col-form-label">target:</label>
          <div class="col-sm-9">
            <input
              type="text"
              class="form-control"
              id="target"
              v-model="plan.target"
              @change="validateNumber()"
            />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="description" class="col-sm-3 form-label"
            >description:</label
          >
          <div class="col-sm-9">
            <textarea
              class="form-control col-sm-4"
              id="description"
              rows="6"
              v-model="plan.description"
              placeholder="Write something about what this plans for, exact plan for that, and anything ablout it~"
            ></textarea>
          </div>
        </div>
        <div class="btn-container">
          <button class="btn btn-primary">submit</button>
        </div>
      </form>
    </template>
  </pop-window>
</template>

<script>
import PopWindow from "@/components/PopWindow.vue";

export default {
  components: {
    PopWindow,
  },
  data() {
    return {
      title: "",
      target: 0,
      plan: {},
    };
  },
  computed: {
    planId() {
      return this.$route.params.id;
    },
  },
  methods: {
    validateNumber() {
      debugger;
      if (isNaN(this.plan.target)) {
        this.plan.target = 0;
      }
    },
    submitPlan() {
      if (!this.plan.id) {
        const request = {
          budgetId: null,
          budgetName: this.plan.name,
          budgetTarget: this.plan.target,
          budgetCurrent: 0,
          description: this.plan.description,
          beginDate: new Date(),
          accountId: this.$getCookie("userId"),
          isFinished: 0,
        };
        this.axios
          .post("http://localhost:8080/budgetPlan/addPlan", request, {
            "Content-Type": "application/json",
          })
          .then((response) => {
            if (response.data.data) {
              this.fetchList().then(() => {
                this.$store.state.updateBudgetPlan++;
                this.$router.push("/plans");
              });
            }
          });
      } else {
        this.updatePlan();
      }
    },
    updatePlan() {
      const request = {
        budgetId: this.planId,
        budgetName: this.plan.name,
        budgetTarget: this.plan.target,
        budgetCurrent: this.plan.current,
        description: this.plan.description,
        beginDate: this.plan.beginDate,
        accountId: this.$getCookie("userId"),
        isFinished: 0,
      };
      this.axios
        .post("http://localhost:8080/budgetPlan/updatePlan", request, {
          "Content-Type": "application/json",
        })
        .then((response) => {
          if (response.data.data) {
            this.fetchList().then(() => {
              this.$store.state.updateBudgetPlan++;
              this.$router.push("/plans");
            });
          }
        });
    },
    async fetchList() {
      const planId = this.$route.params.id;
      const plans = this.$store.state.editPlans;
      debugger;
      if (planId != "add") {
        let plan = plans.filter((item) => {
          return item.id === parseInt(planId);
        });
        plan = plan[0];
        if (plan) {
          this.title = plan.name;
          this.plan = plan;
        }
      } else {
        this.title = "";
        this.plan = {
          target: 0,
          description: "",
        };
      }
    },
  },
  async beforeMount() {
    this.fetchList();
  },
};
</script>

<style scoped>
* {
  text-align: left;
}
.padding {
  height: 1rem;
}
textarea {
  text-indent: 2em;
  resize: none;
  overflow: auto;
  color: wheat;
}
input {
  color: wheat;
}
input:focus,
textarea:focus {
  color: #b1afff;
}
.btn {
  text-transform: capitalize;
}
.btn-container {
  text-align: center;
}
label {
  text-align: left;
  font-size: 1rem;
}
textarea {
  text-transform: none;
}
</style>
