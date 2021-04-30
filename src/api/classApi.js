/*
 * @Author: your name
 * @Date: 2021-03-01 18:12:08
 * @LastEditTime: 2021-04-30 15:20:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\api\classApi.js
 */
// import {request} from './request'
import request from './uniRequest'

export default {
  addClass(params) {
    return request({
      url: '/class/addClass',
      method: 'POST',
      data: params
    })
  },
  joinClass(params) {
    return request({
      url: '/class/joinClass',
      method: 'POST',
      data: params
    })
  },
  checkPassword(params) {
    return request({
      url: '/class/checkPassword',
      method: 'POST',
      data: params
    })
  }
}
