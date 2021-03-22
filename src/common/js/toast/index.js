/*
 * @Author: your name
 * @Date: 2021-03-21 20:47:45
 * @LastEditTime: 2021-03-21 20:55:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\common\js\toast\index.js
 */
const obj = {}

obj.install = function (Vue) {
  Vue.prototype.$showToast = function (message) {
      uni.showToast({
        title: message,
        icon: 'none'
      });
  }
}

export default obj