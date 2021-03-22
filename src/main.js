/*
 * @Author: your name
 * @Date: 2021-01-19 21:32:23
 * @LastEditTime: 2021-03-21 20:51:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\main.js
 */
import Vue from 'vue'
import App from './App'
import uView from "uview-ui"
import store from './vuex/store'
import toast from './common/js/toast'

Vue.config.productionTip = false

Vue.use(uView)
Vue.use(toast)

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
