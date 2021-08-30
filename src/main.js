import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import axios from 'axios'
// 导入表格树
import TreeTable from 'vue-table-with-tree-grid'
axios.defaults.baseURL = 'http://47.106.142.199:8889/api/private/v1/'
// axios请求拦截器
// 在request 拦截器中, 展示进度条 NProgress.start()
// 请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
axios.interceptors.request.use(config => {
  NProgress.start()
  // 为请求对象，添加Token验证的AUthorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必需返回config
  return config
})

// response 拦截器中,  隐藏进度条NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
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
