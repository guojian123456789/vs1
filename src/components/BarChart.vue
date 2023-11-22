<script src="../../vue.config.js"></script>
<template>
  <div class="box">
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <div ref="chart" class="barchart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    // 基于准备好的 DOM，初始化 ECharts 实例
    this.chart = echarts.init(this.$refs.chart);

    // 图表配置
    const option = {
      tooltip: {
        top:'20%',
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',

        },

      },
      legend: {
        top:'4%',
        width:'80%',
        textStyle:{
          color:'white',
        }

      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,

      },
      xAxis: [
        {
          type: 'category',
          name:'月份',
          nameRotate:90,
          data: ['3月', '4月','5月','6月','7月','8月','9月'],
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
          splitLine:{
            lineStyle:{
              color:'rgba(255,255,255,0.3)'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name:'面积\n(×10^7 ㎡)',
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
          splitLine:{
            lineStyle:{
              color:'rgba(255,255,255,0.3)'
            }
          }

        }
      ],
      series: [
        {
          name: '长势较差的冬小麦',
          type: 'bar',
          stack:'bad',
          emphasis: {
            focus: 'series'
          },
          data: [16.77603, 11.56631, 12.59062, 14.78893,null , null, null],
          itemStyle:{
            normal:{
              color:'rgba(0,94,255,0.75)',
              barBorderRadius:[5,5,0,0]
            },

          }
        },
        {
          name: '长势一般的冬小麦',
          type: 'bar',
           stack: 'or',
          emphasis: {
            focus: 'series'
          },
          data: [10.7723300, 12.71645, 11.72213, 11.09627,null ,null ,null ],
          itemStyle:{
            normal:{
              color:'rgba(0,174,255,0.75)',
              barBorderRadius:[5,5,0,0]
            }
          }
        },
        {
          name: '长势较好的冬小麦',
          type: 'bar',
           stack: 'good',
          emphasis: {
            focus: 'series'
          },
          data: [5.56232, 8.82773, 8.79793, 7.23449, null,null ,null ],
          itemStyle:{
            normal:{
              color:'rgba(0,247,255,0.75)',
              barBorderRadius:[5,5,0,0]
            }
          }
        },

        {
          name: '长势较差的玉米',
          type: 'bar',
          stack: 'bad',
          data: [null, null, null, 15.04301, 4.64689, 3.47553, 15.74071],
          itemStyle:{
            normal:{
              color:'rgba(255,114,88,0.75)',
              barBorderRadius:[5,5,0,0]
            }
          },
          emphasis: {
            focus: 'series'
          },

        },
        {
          name: '长势一般的玉米',
          type: 'bar',
           stack: 'or',
          emphasis: {
            focus: 'series'
          },
          data: [null, null,null , 14.38569, 16.86162, 15.18113, 14.78592],
          itemStyle:{
            normal:{
              color:'rgba(255,200,151,0.73)',
              barBorderRadius:[5,5,0,0]
            }
          }
        },
        {
          name: '长势较好的玉米',
          type: 'bar',
           stack: 'good',
          emphasis: {
            focus: 'series'
          },
          data: [null,null , null, 9.64008, 17.56051, 20.42946, 8.55953],
          itemStyle:{
            normal:{
              color:'rgba(255,213,0,0.69)',
              barBorderRadius:[5,5,0,0]
            }
          }
        },

      ]
    };

    this.chart.setOption(option);
  }
};
</script>
<style lang="scss" scoped>
  .box{
    width: 100%;
    height: 100%;
    .barchart{
      position: relative;
      height: 100%;
      width: 97%;
      padding-top:7%;
      padding-left: 0.5%;
      padding-bottom: 1%;

    }
  }
</style>