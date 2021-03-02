/*
 * @Author: your name
 * @Date: 2021-03-01 18:12:08
 * @LastEditTime: 2021-03-01 20:01:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\api\classApi.js
 */
import {request} from './request'

export default {
  addClass(params) {
    return request({
      url: '/class/addClass',
      method: 'POST',
      data: params
    })
  }
}
