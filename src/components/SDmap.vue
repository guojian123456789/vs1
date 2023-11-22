<template>
  <div class="box">
    <div class="controls">
      <div class="location-select">
        <select v-model="selectedLocation" class="selectlocationtoolbar">
          <option value="">选择位置</option>
          <option v-for="location in Object.keys(mapData)" :key="location">{{ location }}</option>
        </select>
<!--        <div class="location-info" v-if="selectedLocation">-->
        <div class="location-info" v-if="false">
          <h3>位置信息</h3>
          <p>位置名称:{{ selectedLocation }}</p>
          <p>相关值:{{ mapData[selectedLocation] }}</p>
        </div>
      </div>
    </div>
    <!-- 地图容器 -->
    <div ref="chart" class="sd-map-container"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
import $ from 'jquery';

export default {
  data() {
    return {
      selectedLocation: '', // 用于存储用户选择的位置
      highlightedLocation: '', // 用于存储高亮的位置
      mapData: {
        '济南市': 4546,
        '青岛市': 5555,
        '淄博市': 7854,
        '枣庄市': 9999,
        '东营市': 8888,
        '烟台市': 7777,
        '潍坊市': 6666,
        '济宁市': 5555,
        '泰安市': 4444,
        '威海市': 3333,
        '日照市': 2222,
        '临沂市': 1111,
        '德州市': 1234,
        '聊城市': 5678,
        '滨州市': 9876,
        '菏泽市': 5432,
      },
    };
  },
  mounted() {
    // 使用CDN链接引入的ECharts库
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js';
    script.async = true;
    script.onload = () => {
      // 等待ECharts库加载完成后再初始化图表
      this.loadMapData(); // 调用加载地图数据的方法
    };

    document.head.appendChild(script);
  },
  watch: {
    selectedLocation: function () {
      this.highlightLocation();
    },
  },
  methods: {
    loadMapData() {
      const myChart = echarts.init(this.$refs.chart);
      myChart.showLoading();

      const self = this;
      $.get('shandong.json', function (geoJson) {
        myChart.hideLoading();
        echarts.registerMap('SD', geoJson);
        self.initChart();
      });
    },
    initChart() {
      const myChart = echarts.init(this.$refs.chart);

      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} (m)',
          show:false,
        },
        toolbox: {
          show: false,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        visualMap: {
          min: 800,
          max: 10000,
          text: ['High', 'Low'],
          left: '80%',
          top: '70%',
          realtime: false,
          calculable: true,
          inRange: {
            color: ['#33ffff', '#33a0ff', '#0055ff'],
          },
          show:false
        },
        series: [
          {
            name: '山东test',
            type: 'map',
            map: 'SD',
            label: {
              show: true,
            },
            data: Object.keys(this.mapData).map((locationName) => ({
              name: locationName,
              value: this.mapData[locationName],
            })),
            // 修改高亮颜色
            itemStyle: {
              emphasis: {
                areaColor: '#f8ed07', // 例如 '#FF5733'
              },
            },
          },
        ],
      });
    },
    highlightLocation() {
      const myChart = echarts.getInstanceByDom(this.$refs.chart);
      if (myChart) {
        if (this.highlightedLocation) {
          myChart.dispatchAction({
            type: 'mapUnSelect',
            name: this.highlightedLocation,
          });
        }

        if (this.selectedLocation) {
          myChart.dispatchAction({
            type: 'mapSelect',
            name: this.selectedLocation,
          });
          this.highlightedLocation = this.selectedLocation;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* 样式可以根据需要进行调整 */
.box {
  padding-top: 4%;
  .location-select {
    display: flex;
    align-items: flex-start;
    height: 3%;
  }
  .controls {
    margin: 10px;
  }
  .location-info {
    margin-left: 1%;
    position: relative;
    z-index: 2;

  }
  .sd-map-container {
    position: relative;
    height: 800px;
    width: 120%;
    margin-top: -23%;
    left: -10%;
    z-index: 1;
  }
  .selectlocationtoolbar {
    position: relative;
    z-index: 2;
    margin-left: 1%;
    background-color: #a5d8ff; /* 背景颜色 */
    color: #333; /* 字体颜色 */
    border: 1px solid #cccccc; /* 边框样式 */
    border-radius: 4px; /* 圆角边框 */
    padding: 5px 10px; /* 内边距 */
    height: 3%;
    width: 13%;
  }
}
</style>
