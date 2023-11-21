import Vue from 'vue'
import App from './App.vue'
import 'echarts';
import ECharts from 'vue-echarts';
Vue.component('ECharts',ECharts);
Vue.config.productionTip = false
import dataV from '@jiaminghi/data-view'

Vue.use(dataV)
new Vue({
  render: h => h(App),
}).$mount('#app')
