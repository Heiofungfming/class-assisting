/*
 * @Author: your name
 * @Date: 2021-03-03 23:43:20
 * @LastEditTime: 2021-05-05 15:13:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\api\jobApi.js
 */
// import {request} from './request'
import request from './uniRequest'

export default {

// ----------------个人作业API----------------------
  addJob(params) {
    return request({
      url: '/job/addJob',
      method: 'POST',
      data: params
    })
  },
  deleteFile(params) {
    return request({
      url: '/job/deleteFile',
      method: 'POST',
      data: params
    })
  },
  getJobLists(query) {
    return request({
      url: '/job/getJobLists?studentId=' + query,
      method: 'GET'
    })
  },
  getJob(query) {
    return request({
      url: '/job/getJob?id=' + query,
      method: 'GET'
    })
  },
  doneJob(params) {
    return request({
      url: '/job/doneJob',
      method: 'POST',
      data: params
    })
  },
  deleteJob(params) {
    return request({
      url: '/job/deleteJob',
      method: 'POST',
      data: params
    })
  },
  updateJob(params) {
    return request({
      url: '/job/updateJob',
      method: 'POST',
      data: params
    })
  },

// ----------------班级作业API----------------------
  addClassJob(params) {
    return request({
      url: '/classJob/addJob',
      method: 'POST',
      data: params
    })
  },
  getClassJobLists(query) {
    return request({
      url: '/classJob/getJobLists?className=' + query,
      method: 'GET'
    })
  },
  updateClassJob(params) {
    return request({
      url: '/job/updateClassJob',
      method: 'POST',
      data: params
    })
  },
}
