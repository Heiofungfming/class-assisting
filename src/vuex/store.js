import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tabbarList: [
      {
        iconPath: "/static/image/tabbar/homepage.png",
        selectedIconPath: "/static/image/tabbar/homepage_fill.png",
        text: '首页',
        // count: 2,
        // isDot: true,
        customIcon: false,
        pagePath: "/pages/home/index"
      },
      {
        iconPath: "/static/image/tabbar/addition.png",
        selectedIconPath: "/static/image/tabbar/addition_fill.png",
        text: '发布',
        midButton: true,
        customIcon: false,
        pagePath: "/pages/add/index"
      },
      {
        iconPath: "/static/image/tabbar/mine.png",
        selectedIconPath: "/static/image/tabbar/mine_fill.png",
        text: '我的',
        // count: 23,
        // isDot: false,
        customIcon: false,
        pagePath: "/pages/self/index"
      },
    ]
  }
})

export default store