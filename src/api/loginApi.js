/*
 * @Author: your name
 * @Date: 2021-04-24 16:28:16
 * @LastEditTime: 2021-04-24 17:11:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\api\login.js
 */
import request from './uniRequest'

export default {
  getUserOpenId(query) {
    return request({
      url: '/login/getUserOpenId?code=' + query,
      method: 'GET'
    })
  },
  getAccessToken() {
    return request({
      url: '/login/getAccessToken',
      method: 'GET'
    })
  }
}