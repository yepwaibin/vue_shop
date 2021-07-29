import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
// 导入表格树
import TreeTable from 'vue-table-with-tree-grid'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// axios请求拦截器
axios.interceptors.request.use(config => {
  // 为请求对象，添加Token验证的AUthorization字段
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必需返回config
  return config
})
// 组件全局注册 表格树
Vue.component('tree-table', TreeTable)
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
