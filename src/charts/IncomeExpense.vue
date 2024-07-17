<template>
  <div class="chart-coantainer" :style="containerStyle">
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, BarChart, LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide, onMounted } from "vue";
import { color } from "echarts";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  BarChart,
  GridComponent,
  ToolboxComponent,
  LineChart,
]);

export default {
  components: {
    VChart,
  },
  props: {
    containerStyle:{
      type:Object,
      required:false,
      default:{background:'#faf0e6'}
    },
    title: {
      type: Object,
      required: false,
      default: {},
    },
    grid: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    tooltip: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    toolbox: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    legend: {
      type: Object,
      required: false,
      default: () => ({
        data: [],
      }),
    },
    xAxis: {
      type: Object,
      required: false,
    },
    yAxis: {
      type: Object,
      required: false,
    },
    series: {
      type: Array,
      required: true,
      default: [],
    },
    color: {
      type: Array,
      required: false,
      default: [],
    },
  },
  setup(props) {
    provide(THEME_KEY, "#e4dee5");

    const option = ref({});

    onMounted(() => {
      let tooltip = props.tooltip;
      let toolbox = props.toolbox;
      let legend = props.legend;
      let xAxis = props.xAxis;
      let yAxis = props.yAxis;
      let series = props.series;
      let color = props.color;
      let grid = props.grid;
      let title = props.title;
      let combine;
      if (color.length > 0)
        combine = {
          grid,
          tooltip,
          toolbox,
          legend,
          xAxis,
          yAxis,
          series,
          color,
          title,
        };
      else
        combine = {
          grid,
          tooltip,
          toolbox,
          legend,
          xAxis,
          yAxis,
          series,
          title,
        };
      setTimeout(()=>{
        option.value = combine;
      },300)
    });

    return {
      option,
    };
  },
};
</script>

<style scoped>
.chart-coantainer {
  height: 80%;
  width: 80%;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.3rem rgba(0, 0, 0, 0.7);
  background: #faf0e6;
}
</style>
