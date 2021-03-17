/*
 * @Author: your name
 * @Date: 2021-03-03 23:43:20
 * @LastEditTime: 2021-03-03 23:49:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\api\jobApi.js
 */
import {request} from './request'

export default {
  addJob(params) {
    return request({
      url: '/job/addJob',
      method: 'POST',
      data: params
    })
  }
}
