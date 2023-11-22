<template>
  <div class="box">
    <div ref="chart" class="scatterchart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import * as XLSX from 'xlsx';

export default {
  data() {
    return {
      myChart: null,
      excelData: [] // Store Excel data here
    };
  },
  mounted() {


    // Wait for a longer time to ensure that the chart container has been rendered
    setTimeout(() => {
      this.readExcelData();
    }, 0);
  },
  methods: {
    readExcelData() {
      // Assuming your Excel file is named 'your_excel_file.xlsx' and is in the public directory
      const filePath = 'chanliang.xlsx';

      // Fetch the Excel file
      fetch(filePath)
        .then(response => response.arrayBuffer())
        .then(data => {
          const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });

          // Assuming your data is in the first sheet of the Excel file
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          // Convert Excel data to an array of arrays
          this.excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });


          // After reading data, initialize and render the chart
          this.initChart();
        })

    },
    initChart() {
      const chartDom = this.$refs.chart;
      this.myChart = echarts.init(chartDom);

      const option = {
        toolbox:{
          feature:{
            dataZoom:{
              show:false
            }
          }
        },
        tooltip: {
          trigger: 'axis', // Display tooltip when hovering over the series
          axisPointer: {
            type: 'cross' , // Display a crosshair pointer
           label:{
              show:false
           }


          },

        },

        legend: { // Configure the legend
      data: this.excelData[0].slice(1).map(year => `Year ${year}`),
      textStyle: {
        color: 'white'
      },
      top:'10px',
    },
        xAxis: {
          type: 'category',
          name:'播种日期',
          nameGap:10,
          nameRotate:90,
          axisLine:{
            lineStyle:{
              color:'white'
            }
          },
          axisLabel:{
            textStyle:{
              color:'white'
            }
          },
          splitLine:{
            lineStyle:{
              color:'rgba(255,255,255,0.3)'
            }
          },
          data: this.excelData.slice(1).map(row => row[0]) // Assuming the first column contains the dates
        },
        yAxis: {
          name:'TAGP(kg/ha)',
          axisLine:{
            lineStyle:{
              color:'white'
            }
          },
          axisLabel:{
            textStyle:{
              color:'white'
            }
          },
          splitLine:{
            lineStyle:{
              color:'rgba(255,255,255,0.3)'
            }
          },
          type: 'value'
        },
        series: []
      };
        const colors = ['rgb(255,255,255)', 'rgb(0,234,255)', 'rgba(0, 0, 255, 0.7)', 'rgb(248,78,255)', 'yellow'];
      // Use this.excelData to populate your series data
      for (let i = 1; i < this.excelData[0].length; i++) {
        const seriesData = this.excelData.slice(1).map(row => {
          return {
            name: `Year ${this.excelData[0][i]}`,
            value: row[i]
          };
        });



        option.series.push({
          name: `Year ${this.excelData[0][i]}`,
          type: 'scatter',
          symbolSize: 5,
          itemStyle:{
            color:colors[i - 1]
          },
          data: seriesData
        });
      }


      this.myChart.setOption(option);

      // 添加事件监听器
    }
  },
  beforeDestroy() {
    if (this.myChart) {
      this.myChart.dispose();
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  height: 100%;
  width: 100%;
  position: relative;
  .scatterchart {
    height: 100%;
    width: 100%;
    position: relative;
    margin-left: 1%;
    top: 13%;
    padding-bottom: 4%;
  }
}
</style>
