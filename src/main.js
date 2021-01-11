import Vue from 'vue'
import App from './App'
import uView from "uview-ui"
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(uView)
Vue.use(Vuex)
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
