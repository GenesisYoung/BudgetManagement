<script>
import IncomeExpense from "../charts/IncomeExpense.vue";
import PlansProgress from "../charts/PlansProgress.vue";
export default {
  async beforeMount() {
    const response = await fetch('/public/test/dashboard.json');
    const result = await response.json();
    const surplus=result.Income.series.IncomeData.map((income,idx)=>{
      return income-result.Expense.series.ExpenseData[idx]
    })

    this.all.xAxis[0].data=result.xAxisData
    this.all.series[0].data=result.Income.series.IncomeData
    this.all.series[1].data=result.Expense.series.ExpenseData
    this.all.series[2].data=surplus

    this.income.xAxis[0].data=result.xAxisData
    this.income.series[0].data=result.Income.series.IncomeData

    this.expense.xAxis[0].data=result.xAxisData
    this.expense.series[0].data=result.Expense.series.ExpenseData

    this.surplus.xAxis[0].data=result.xAxisData
    this.surplus.series[0].data=surplus

    this.$store.state.fullChartOption=this.all
    this.$store.state.incomeChartOption=this.income
    this.$store.state.expenseChartOption=this.expense
    this.$store.state.surplusChartOption=this.surplus

    this.incomeExpense=this.$store.state.fullChartOption

    this.$store.state.plans=result.plans
    this.dataReady=true
  },
  methods: {
    toogleChart(number) {
      console.log("toogleChart", number);
      if (number == 0) {
        this.incomeExpense = this.$store.state.fullChartOption;
      } else if (number == 1) {
        this.incomeExpense = this.$store.state.incomeChartOption;
      } else if (number == 2) {
        this.incomeExpense = this.$store.state.expenseChartOption;
      } else {
        this.incomeExpense = this.$store.state.surplusChartOption;
      }
      this.loadkey++;
    },
  },
  components: {
    IncomeExpense,
    PlansProgress,
  },
  data() {
    return {
      dataReady:false,
      loadkey: 1,
      incomeExpense: {},

      all: {
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
          data: ["Income", "Expense", "Surplus"],
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
          {
            type: "value",
            axisLabel: {
              formatter: function (value) {
                return value / 1000 + "k";
              },
            },
          },
          {
            type: "value",
            name: "Surplus",
            position: "right",
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#C65BCF",
              },
            },
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
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return "$" + value;
              },
            },
            itemStyle: {
              color: "#946da7",
            },
            data: [],
          },
          {
            name: "Expense",
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return "$" + value;
              },
            },
            itemStyle: {
              color: "#AD88C6",
            },
            data: [],
          },
          {
            name: "Surplus",
            type: "line",
            tooltip: {
              valueFormatter: function (value) {
                return "$" + value;
              },
            },
            itemStyle: {
              color: "#C65BCF",
            },
            yAxisIndex: 2,
            data: [],
          },
        ],
      },

      income: {
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
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return "$" + value;
              },
            },
            itemStyle: {
              color: "#946da7",
            },
            data: [],
          },
        ],
      },

      expense: {
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
            type: "bar",
            tooltip: {
              valueFormatter: function (value) {
                return "$" + value;
              },
            },
            itemStyle: {
              color: "#AD88C6",
            },
            data: [],
          },
        ],
      },

      surplus: {
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
          data: ["Surplus"],
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
            name: "Surplus",
            position: "right",
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#C65BCF",
              },
            },
            axisLabel: {
              formatter: function (value) {
                return value / 1000 + "k";
              },
            },
          },
        ],
        series: [
          {
            name: "Surplus",
            type: "line",
            tooltip: {
              valueFormatter: function (value) {
                return "$" + value;
              },
            },
            itemStyle: {
              color: "#C65BCF",
            },
            // yAxisIndex: 2,
            data: [],
          },
        ],
      },

    };
  },
  computed:{
    plans(){
      return this.$store.state.plans
    }
  }
};
</script>

<template>
  <div class="dashboard" v-if="dataReady">
    <div class="income-expense">
      <income-expense
        :grid="incomeExpense.grid"
        :legend="incomeExpense.legend"
        :series="incomeExpense.series"
        :toolbox="incomeExpense.toolbox"
        :tooltip="incomeExpense.tooltip"
        :xAxis="incomeExpense.xAxis"
        :yAxis="incomeExpense.yAxis"
        :key="loadkey"
      ></income-expense>
      <div class="btns">
        <button class="all" @click="toogleChart(0)">
          <font-awesome-icon :icon="['fas', 'fa-house']" />
          <div class="caption">all</div>
        </button>
        <button class="income" @click="toogleChart(1)">
          <font-awesome-icon :icon="['fas', 'fa-wallet']" />
          <div class="caption">income</div>
        </button>
        <button class="expense" @click="toogleChart(2)">
          <font-awesome-icon :icon="['fas', 'fa-credit-card']" />
          <div class="caption">expense</div>
        </button>
        <button class="surplus" @click="toogleChart(3)">
          <font-awesome-icon :icon="['fas', 'fa-sack-dollar']" />
          <div class="caption">surplus</div>
        </button>
      </div>
    </div>
    <div class="budget-plans">
      <h2>budget plans</h2>
      <div class="list-container">
        <plans-progress
          v-for="plan in plans"
          :id="plan.id"
          :key="plan.id"
          :name="plan.name"
          :current="plan.current"
          :target="plan.target"
          :beginDate="plan.beginDate"
        ></plans-progress>
      </div>
    </div>
  </div>
  <div class="dashboard" v-else>
    <h2>Loading...</h2>
  </div>
</template>

<style scoped>
.dashboard {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
}
.income-expense {
  width: 65%;
  height: 80%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  z-index: 2;
}
.budget-plans {
  position: relative;
  width: 25%;
  height: 80%;
  justify-content: center;
  flex-wrap: wrap;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.3rem rgba(0, 0, 0, 0.7);
  background: #faf0e6;
  overflow: hidden;
  z-index: 2;

}
.income,
.expense,
.surplus,
.all {
  text-transform: capitalize;
  border: 0px;
  margin: 1rem;
  font-size: 0.75rem;
  padding: 0.1rem;
  width: 3rem;
  height: 3rem;
  border-radius: 70%;
  border: 0.25rem solid #91679f;
  background: #e2dae1;
  color: #5b3674;
  position: relative;
}
.caption {
  /* position: absolute; */
  font-size: 0.45rem;
}
.btns {
  width: 100%;
  margin-top: 1.25rem;
}
@media (max-width: 760px) {
  .dashboard{
    align-content: space-around;
  }
  .income-expense,.budget-plans{
    width: 100%;
    height: 45%;
  }
  .income,
  .expense,
  .surplus,
  .all {
    width: 2rem;
    height: 2rem;
    font-size: 0.15rem;
  }
  .caption{
    display: none;
  }
  .budget-plans {
    margin-top: 2rem;
  }
  h2 {
    right: 15% !important;
    top: 60% !important;
  }
}
h2 {
  color: wheat;
  font-family: Georgia, "Times New Roman", Times, serif;
  padding: 0.75rem;
  right: 5%;
  top: 17%;
  border-radius: 1rem;
  z-index: 999;
  background: #ad88c6;
}
/* .margin{
  height: 4rem;
} */
.list-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-bottom: 5rem;
}
</style>
