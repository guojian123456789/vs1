<template>
  <div class="box">
    <!-- 保留日期选择器 -->
    <input type="date" v-model="selectedDate" @change="updateChart" class="selectdate" />

    <div ref="chart" class="linechart"></div>
    <div class="legend-container">
      <!-- ECharts 图例插槽 -->
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import * as XLSX from 'xlsx';

export default {
  data() {
    return {
       colors: ['#FF5733', '#33FF57', '#5733FF', '#FF336E', '#33B8FF', '#D633FF', '#FFD633', '#3386FF', '#33FFC1', '#FFB133','#FFB737'],

      dataList: [], // 从 Excel 中读取的数据
      selectedDate: "2023-08-15", // 选中的日期
      chart: null, // echarts 实例
      option: {
        grid: {},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
          formatter: function (params) {
            let content = params[0].name + '<br/>';
            params.forEach(function (item) {
              content += item.marker + ' ' + item.seriesName + ': ' + item.data + '<br/>';
            });
            return content;
          },
        },
        legend: {
          data: [], // 图例数据
          textStyle: {
            color: 'white',
          },
          width: '74%',
          left: '18%',
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: 'white',
            },
          },
          axisLabel: {
            textStyle: {
              color: 'white',
            },
          },
          data: [], // 横坐标数据
          axisPointer: {
            type: 'shadow',
          },
        },
        yAxis: [
          {
            type: 'value',
            name: '光合有效辐射和太阳辐射',
            axisLine: {
              lineStyle: {
                color: 'white',
              },
            },
            axisLabel: {
              textStyle: {
                color: 'white',
              },
            },
          },
          {
            type: 'value',
            name: '其他数据',
            axisLine: {
              lineStyle: {
                color: 'white',
              },
            },
            axisLabel: {
              textStyle: {
                color: 'white',
              },
            },
          },
        ],
        series: [], // 折线图数据
      },
    };
  },
  mounted() {
    // 在组件加载后直接加载 Excel 表
    this.loadExcelData().then(() => {
      this.initChart();
      this.updateChart();
    });
  },
  methods: {
    // 加载 Excel 数据的方法
    async loadExcelData() {
      const excelFilePath = 'qixiang.xlsx'; // 替换成你的 Excel 文件路径

      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
         const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { raw: false });


          const formattedRows = rows.map((item) => ({
            ...item,
            日期: this.formatDate(item.日期),
          }));

          this.dataList = formattedRows;
          resolve();
        };

        // 通过 Fetch API 或其他方式获取文件内容
        fetch(excelFilePath)
          .then(response => response.arrayBuffer())
          .then(data => {
            reader.readAsBinaryString(new Blob([data]));
          })
          .catch(error => {

            reject(error);
          });
      });
    },

    formatDate(dateString) {
      // 根据日期的实际格式进行转换，这里假设是 MM/DD/YY
      const [month, day, year] = dateString.split('/');
      const century = year > 50 ? '19' : '20'; // 假设 50 年以后是 20 世纪
      return `${century}${year}-${month}-${day}`;
    },

    initChart() {
  // 初始化 echarts 实例
  this.chart = echarts.init(this.$refs.chart);


  // 获取对应日期内的时间列表
  const timeList = Array.from(new Set(this.dataList.map(item => item.时间)))
    .filter(time => typeof time === 'string')
    .sort((a, b) => this.compareTimes(a,b));

  const dataForSelectedDate = this.getDataForSelectedDate();

  const xAxisData = timeList.map(time => {
    const hours = time.split(":")[0];
    const minutes = time.split(":")[1];
    const seconds = time.split(":")[2];
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  });
    const seriesData = dataForSelectedDate.map((columnData) => {
  const columnName = columnData.name;

  return {
    name: columnName,
    type: 'line',
    data: xAxisData.map(time => {
      const dataPoint = this.findDataPointForTime(dataForSelectedDate, time);
      return dataPoint ? dataPoint[columnName] : null;
    }),
    yAxisIndex: columnName.includes('光合有效辐射, μmol/m2/s') || columnName.includes('太阳辐射, W/m2)') ? 0 : 1,
    symbolSize:8,

  };
});
  // 打印一些调试信息


  // 更新图表数据
  this.option.legend.data = dataForSelectedDate.map(columnData => columnData.name);
this.option.series = seriesData;

  this.option.xAxis = {
    type: 'category',
    name: '时间',

    axisLine: {
      lineStyle: {
        color: 'white',
      },
    },
    axisLabel: {
      show: false,
      textStyle: {
        color: 'white',
      },
      interval: Math.ceil(xAxisData.length / 32), // 添加这一行，确保刻度标签显示所有数据
      rotate: 0, // 添加这一行，使刻度标签旋转，防止重叠
    },
    data: xAxisData,
    axisPointer: {
      type: 'shadow',
      label: {
        show: false
      },
      snap:true,
    },
  };

  this.option.yAxis = [
    {
      type: 'value',
      name: '光合有效辐射\n及太阳辐射',
      axisLine: {
        lineStyle: {
          color: 'white',
        },
      },
      axisLabel: {
        textStyle: {
          color: 'white',
        },
      },
      axisPointer: {
        label: {
          show: false
        }
      },
      splitLine:{
            lineStyle:{
              color:'rgba(255,255,255,0.3)'
            }
          }
    },
    {
      type: 'value',
      name: '其他',
      axisLine: {
        lineStyle: {
          color: 'white',
        },
      },
      axisLabel: {
        textStyle: {
          color: 'white',
        },
      },
      axisPointer: {
        label: {
          show: false
        }
      },
      splitLine:{
            lineStyle:{
              color:'rgba(255,255,255,0.3)'
            }
          }
    },
  ];

  this.option.series = dataForSelectedDate.map((columnData, index) => {
    const columnName = columnData.name;
    const color = this.colors[index];
    console.log(this.colors);

    return {
      name: columnName,
      type: 'line',
      data: columnData.data,
      yAxisIndex: columnName.includes('光合有效辐射, μmol/m2/s') || columnName.includes('太阳辐射, W/m2)') ? 0 : 1,
      symbolSize:1,
       itemStyle: {
      color: color,
    },
      areaStyle: {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: color, // 渐变起点颜色
      },
      {
        offset: 1,
        color: 'rgba(0, 0, 0, 0)', // 渐变终点颜色
      },
    ]),
  },
    };
  });

  // 打印一些调试信息


  // 渲染图表
  this.chart.setOption(this.option);
},


    formatTime(timeString) {
      // 防御性检查，确保 timeString 是一个字符串
      if (typeof timeString !== 'string') {
        return '';
      }

      // 格式化时间为 00:00:00 格式
      const [hour, minute, second] = timeString.split(':');
      return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}`;
    },

    updateChart() {
      if (this.chart) {
        // 根据选中的日期获取对应的数据
        const dataForSelectedDate = this.getDataForSelectedDate();
        console.log('选中日期的图表数据:', dataForSelectedDate);

        // 更新图表数据
        this.option.legend.data = dataForSelectedDate.map(columnData => columnData.name);
        this.option.series = dataForSelectedDate;

        // 渲染图表
        this.chart.setOption(this.option);
      } else {
        console.error('Chart instance is null or undefined.');
        // 在这里可能添加一些处理逻辑，例如重新初始化图表
        // this.initChart();
      }
    },

    getDataForSelectedDate() {
      // 根据选中的日期筛选数据
      const filteredData = this.dataList.filter((item) => {
        // 将日期和时间拼接为一个完整的日期时间字符串
        const dateTimeString = `${item.日期} ${item.时间}`;
        return dateTimeString === `${this.selectedDate} ${item.时间}`;
      });

      console.log('筛选后的数据:', filteredData);


      // 检查 filteredData 不为空
      if (filteredData.length === 0) {
        return [];
      }

      // 获取从风向到雨的列名
      const columnNames = Object.keys(filteredData[0]).slice(2, 13);
      console.log('columnNames:', columnNames);
console.log('this.colors:', this.colors);

      // 构建图表数据格式
      const seriesData = columnNames.map((columnName) => {
        return {
          name: columnName,
          type: 'line',
          data: filteredData.map((item) => item[columnName]),
          yAxisIndex: columnName === '光合有效辐射, μmol/m2/s' || columnName === '太阳辐射, W/m2' ? 0 : 1, // 光合有效辐射和太阳辐射使用第一个 Y 轴，其他使用第二个 Y 轴
        };
      });

      return seriesData;
    },
    findDataPointForTime(dataForSelectedDate, time) {
  return dataForSelectedDate.find(dataPoint => dataPoint.时间 === time);
},

    compareTimes(timeA, timeB) {
  const parseTime = time => {
    const [hours, minutes, seconds] = time.split(':').map(part => part.padStart(2, '0'));
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds));
    return date;
  };

  const parsedTimeA = parseTime(timeA);
  const parsedTimeB = parseTime(timeB);

  // 比较时间
  if (parsedTimeA < parsedTimeB) {
    return -1;
  } else if (parsedTimeA > parsedTimeB) {
    return 1;
  } else {
    return 0;
  }
},
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  position: relative;
  .linechart {
    position: absolute;
    height: 100%;
    width: 100%;
    margin-top: 8%;
    margin-left: 0;
    z-index: 1;
    padding-bottom: 1%;
  }
  .selectdate {
    position: absolute;
    margin-left: 2%;
    margin-top: 7%;
    z-index: 2;
    height: 7%;
    width: 17%;
  }
}
</style>
