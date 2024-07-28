<template>
  <div class="main-container">
    <!-- <div class="income-expense"> -->
    <div class="income" v-if="!incomeNoData">
      <income-expense
        :grid="incomeOption.grid"
        :legend="incomeOption.legend"
        :series="incomeOption.series"
        :toolbox="incomeOption.toolbox"
        :tooltip="incomeOption.tooltip"
        :xAxis="incomeOption.xAxis"
        :yAxis="incomeOption.yAxis"
        :containerStyle="{
          background: '#B3E2A7',
        }"
      ></income-expense>
    </div>
    <div class="income no-data" v-else>No data available!</div>
    <div class="expense" v-if="!expenseNoData">
      <income-expense
        :grid="expenseOption.grid"
        :legend="expenseOption.legend"
        :series="expenseOption.series"
        :toolbox="expenseOption.toolbox"
        :tooltip="expenseOption.tooltip"
        :xAxis="expenseOption.xAxis"
        :yAxis="expenseOption.yAxis"
        :containerStyle="{
          background: '#FFA27F',
        }"
      ></income-expense>
    </div>
    <div class="expense no-data" v-else>No data available!</div>
    <!-- </div> -->
    <!-- <div class="expense-budget"> -->
    <div class="expense-chart" v-if="!dailyNoData">
      <income-expense
        :title="dailyOption.title"
        :tooltip="dailyOption.tooltip"
        :legend="dailyOption.legend"
        :toolbox="dailyOption.toolbox"
        :series="dailyOption.series"
      ></income-expense>
    </div>
    <div class="expense-chart no-data" v-else>No data available!</div>
    <div class="data">
      <div class="data-form shadow">
        <div class="change-form mb-2">
          <button
            class="btn text-capitalize change"
            @click.stop.prevent="toogleForm()"
          >
            {{ formName }}
          </button>
        </div>
        <div>
          <div class="term">budget period:<br />{{ period }}</div>
          <div class="total">budget:{{ currencyType + residual }}</div>
          <div
            class="add-expense row mt-2 display-flex justify-content-center flex-wrap"
          >
            <!-- expense form -->
            <div
              class="col-12 row display-flex justify-content-center flex-wrap"
              v-if="formName === 'set income'"
            >
              <div class="mb-3 col-12">
                <button
                  class="btn text-capitalize withdraw"
                  @click.stop.prevent="toogleWithdraw()"
                >
                  withdraw
                </button>
              </div>
              <div class="col-4 input">
                <input type="text" class="form-control" v-model="expense" />
              </div>
              <div class="col-5 mb-2 button">
                <button
                  @click.stop.prevent="addExpense()"
                  class="btn text-capitalize add"
                >
                  add expense
                </button>
              </div>
            </div>
            <!-- income form -->
            <div
              class="col-12 row display-flex justify-content-center flex-wrap"
              v-else
            >
              <div class="mb-3 col-12">
                <button
                  class="btn text-capitalize incomeBtn"
                  @click.stop.prevent="toogleChange()"
                >
                  change income
                </button>
              </div>
              <div class="col-4 input">
                <input type="text" class="form-control" v-model="income" />
              </div>
              <div class="col-5 mb-2 button">
                <button
                  @click.stop.prevent="addIncome()"
                  class="btn text-capitalize add"
                >
                  add income
                </button>
              </div>
            </div>

            <div class="col-8 input">
              <input
                type="text"
                class="form-control new-tag"
                v-model="newTag"
              />
            </div>
            <div class="col-4 button">
              <button class="btn add-new-tag" @click.stop.prevent="addTag()">
                add tag
              </button>
            </div>
            <div class="tags mt-2">
              <div
                @click="chooseTag($event)"
                class="tag tag-acive"
                tag-value="Other"
              >
                #other
              </div>
              <div
                @click="chooseTag($event)"
                class="tag"
                v-for="tag in tags"
                :key="tag"
                :tag-value="tag"
              >
                #{{ tag }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
    <withdraw-form
      v-if="withdraw"
      @closeWithdraw="toogleWithdraw()"
    ></withdraw-form>
  </div>
</template>

<script>
import IncomeExpense from "@/charts/IncomeExpense.vue";
import WithdrawForm from "@/components/WithdrawForm.vue";
export default {
  components: {
    IncomeExpense,
    WithdrawForm,
  },
  async beforeMount() {
    let response = await fetch("/public/test/money.json");
    let result = await response.json();
    const tags = result.periodicBudget.tags.filter((tag) => {
      return tag != "Other";
    });
    this.dailyOption.series[0].data = result.dailyOption.series.data;
    this.period = result.periodicBudget.period;
    this.totalBudget = result.periodicBudget.totalBudget;
    this.currencyType = result.periodicBudget.currencyType;
    this.residual = result.periodicBudget.residual;
    this.tags = tags;

    response = await fetch("/public/test/dashboard.json");
    result = await response.json();
    this.incomeOption.xAxis[0].data = result.xAxisData;
    this.incomeOption.series[0].data = result.Income.series.IncomeData;

    this.expenseOption.xAxis[0].data = result.xAxisData;
    this.expenseOption.series[0].data = result.Expense.series.ExpenseData;
    let screenWidth = window.outerWidth;
    if (screenWidth <= 480) {
      this.dailyOption.series[0].radius = ["20", "40"];
    }
    window.addEventListener("resize", () => {
      screenWidth = window.outerWidth;
      if (screenWidth <= 480) {
        this.dailyOption.series[0].radius = ["20", "40"];
      } else {
        this.dailyOption.series[0].radius = ["40", "70"];
      }
    });
  },
  methods: {
    chooseTag(e) {
      const active = document.querySelector(".tag-acive");
      active.classList.remove("tag-acive");
      e.target.classList.add("tag-acive");
    },
    addExpense() {
      if (this.expense > this.residual) {
        this.expense = 0;
        this.$store.state.promptMsg = "out of the budget!";
        this.$store.state.promptStatus = true;
      } else {
        this.residual -= this.expense;
      }
    },
    addIncome() {
      this.residual = parseFloat(this.residual) + parseFloat(this.income);
    },
    addTag() {
      const exist = this.tags.filter((tag) => {
        return tag.trim() === this.newTag;
      });
      if (this.newTag.trim() != "" && exist.length === 0) {
        this.tags.unshift(this.newTag);
      }
      this.newTag = "";
    },
    toogleWithdraw() {
      this.withdraw = !this.withdraw;
    },
    toogleChange() {
      this.change = !this.change;
    },
    toogleForm() {
      if (this.formName === "set income") this.formName = "set expense";
      else this.formName = "set income";
    },
  },
  data() {
    return {
      incomeNoData: true,
      expenseNoData: true,
      dailyNoData: true,
      dailyOption: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Period Budget",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
                color: "#846298",
              },
            },
            labelLine: {
              show: false,
            },
            data: [],
          },
        ],
      },
      incomeOption: {
        currency: "$",
        grid: {
          left: "10%", // Distance from the left edge of the container
          right: "10%",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
          // Custom formatter function to align data
          formatter: function (params) {
            let result = `${params[0].name}<br/>`;
            params.forEach((param) => {
              result += `<div style="text-align: left;font-size:1rem;">${param.marker} ${param.seriesName}: $${param.value}</div>`;
            });
            return result;
          },
        },
        toolbox: {
          feature: {
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["Income"],
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: function (value) {
                return value / 1000 + "k";
              },
            },
          },
        ],
        series: [
          {
            name: "Income",
            type: "line",
            tooltip: {
              valueFormatter: function (value) {
                return currency + value;
              },
            },
            itemStyle: {
              color: "#059212",
            },
            data: [],
          },
        ],
      },
      expenseOption: {
        currency: "$",
        grid: {
          left: "10%", // Distance from the left edge of the container
          right: "10%",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
          // Custom formatter function to align data
          formatter: function (params) {
            let result = `${params[0].name}<br/>`;
            params.forEach((param) => {
              result += `<div style="text-align: left;font-size:1rem;">${param.marker} ${param.seriesName}: $${param.value}</div>`;
            });
            return result;
          },
        },
        toolbox: {
          feature: {
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["Expense"],
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: function (value) {
                return value / 1000 + "k";
              },
            },
          },
        ],
        series: [
          {
            name: "Expense",
            type: "line",
            tooltip: {
              valueFormatter: function (value) {
                return currency + value;
              },
            },
            itemStyle: {
              color: "#E4003A",
            },
            data: [],
          },
        ],
      },
      period: "",
      totalBudget: 0,
      currencyType: "$",
      formName: "set expense",
      residual: 0,
      expense: 0,
      income: 0,
      tags: [],
      newTag: "",
      withdraw: false,
      change: false,
    };
  },
  computed: {
    currency() {
      return this.$store.state.currency;
    },
  },
};
</script>

<style scoped>
.no-data {
  font-family: Georgia, "Times New Roman", Times, serif;
  color: #180161;
}
input {
  text-align: left;
}
.add-new-tag {
  text-transform: capitalize;
  color: wheat;
  background: #83a2ff;
}
.add-new-tag:active {
  color: wheat;
}
.add-tag {
  width: 100%;
}
input {
  color: wheat !important;
}
.withdraw,
.incomeBtn {
  background: #6c946f;
  color: wheat;
}
.withdraw:active,
.incomeBtn:active {
  color: white;
}
.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
}
/* .income-expense {
  height: 50%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
}
.expense-budget {
  height: 50%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
} */
.expense-chart,
.data {
  height: 45vh;
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  overflow: auto;
}
.income,
.expense {
  width: 50%;
  height: 45vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.data-form {
  width: 80%;
  height: 80%;
  padding: 1rem;
  border-radius: 0.75rem;
  background: #846298;
  overflow: auto;
}
.term,
.total {
  color: wheat;
  font-size: 0.75rem;
}
.change {
  background: #bb9ab1;
  color: wheat;
}
.change:active {
  color: white;
}
.add {
  color: white;
  background: #ffa823;
}
.tags {
  display: flex;
  padding: 0 1rem;
  justify-items: flex-start;
  flex-wrap: wrap;
}
.tag {
  font-size: 0.75rem;
  color: white;
  background: #7776b3;
  display: inline-block;
  padding: 0.5rem;
  border-radius: 0.75rem;
  text-transform: capitalize;
  margin: 0.2rem 0.45rem;
}
.tag-acive {
  background: #5a639c !important;
}
@media (max-width: 760px) {
  .expense-chart,
  .data {
    width: 100%;
  }
  .data {
    height: auto;
  }
  .income,
  .expense {
    width: 100%;
    height: 45vh;
    display: flex;
    justify-content: center;
    align-content: center;
  }
  .input {
    width: 60% !important;
  }
  .button {
    width: 30% !important;
  }
  .add,
  .add-new-tag {
    font-size: 0.55rem !important;
  }
}
</style>
