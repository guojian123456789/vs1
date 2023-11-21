<template>
  <div>
    <div ref="chart" class="linechart"></div>
    <TimeSelect @timeChange="updateChart" />
  </div>
</template>

<script>
import * as echarts from 'echarts';
import TimeSelect from '@/components/TimeSelect';

export default {
  data() {
    return {
      myChart: null,
      selectedTime: 'Time 1',
      timeData: {
        'Time 1': [150, 230, 224, 218, 135, 147, 260],
        'Time 2': [120, 180, 200, 190, 160, 140, 210],
        'Time 3': [111, 222, 456, 212, 117, 332, 387],
      },
    };
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.chart);
    this.updateChart(this.selectedTime);
  },
  methods: {
    updateChart(newValue) {
      // 使用传递的选定时间来更新折线图数据
      this.selectedTime = newValue;
      const data = this.timeData[newValue];
      const option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLabel: {
            textStyle: {
              color: 'white',
            },
          },
          axisLine: {
            lineStyle: {
              color: 'white',
            },
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: 'white',
            },
          },
          axisLine: {
            lineStyle: {
              color: 'white',
            },
          },
        },
        series: [
          {
            data: data,
            type: 'line',
          },
        ],
        toolbox:{
          show:false,
          feature:{
            dataZoom:{
              yAxislndex:'none'
            },
            dataView:{readOnly:false},
            magicType:{type:['line','bar']},
            restore:{},
            saveAsImage:{}
          }
        },
        tooltip:{
          trigger:'axis'

        },
      };
      this.myChart.setOption(option);
    },
  },
  beforeDestroy() {
    if (this.myChart) {
      this.myChart.dispose();
    }
  },
  components: {
    TimeSelect,
  },
};
</script>

<style lang="scss" scoped>
.linechart {
  height: 100%;
  width: 110%;
  position: absolute;
  top: 30px;
  left: -20px;

}
</style>
