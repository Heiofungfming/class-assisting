/*
 * @Author: your name
 * @Date: 2021-04-16 22:08:03
 * @LastEditTime: 2021-04-30 15:11:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\api\studentApi.js
 */

import request from './uniRequest'

export default {
  addStudent(params) {
    return request({
      url: '/student/addStudent',
      method: 'POST',
      data: params
    })
  },
  updateAddClass(params) {
    return request({
      url: '/student/updateAddClass',
      method: 'POST',
      data: params
    })
  },
  updateAddJob(params) {
    return request({
      url: '/student/updateAddJob',
      method: 'POST',
      data: params
    })
  },
  updateJoinClass(params) {
    return request({
      url: '/student/updateJoinClass',
      method: 'POST',
      data: params
    })
  }
}