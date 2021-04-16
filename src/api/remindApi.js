/*
 * @Author: your name
 * @Date: 2021-04-06 18:19:46
 * @LastEditTime: 2021-04-16 10:41:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\api\remindApi.js
 */
// import {request} from './request'
import request from './uniRequest'

export default {

// ----------------通知API----------------------
  addRemind(params) {
    return request({
      url: '/remind/addRemind',
      method: 'POST',
      data: params
    })
  },
  deleteFile(params) {
    return request({
      url: '/remind/deleteFile',
      method: 'POST',
      data: params
    })
  },
  getRemindLists() {
    return request({
      url: '/remind/getRemindLists',
      method: 'GET'
    })
  },
  getRemind(query) {
    return request({
      url: '/remind/getRemind?id=' + query,
      method: 'GET'
    })
  },
  doneRemind(params) {
    return request({
      url: '/remind/doneRemind',
      method: 'POST',
      data: params
    })
  },
  deleteRemind(params) {
    return request({
      url: '/remind/deleteRemind',
      method: 'POST',
      data: params
    })
  }
}