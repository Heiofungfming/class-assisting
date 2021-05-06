/*
 * @Author: your name
 * @Date: 2021-05-06 17:18:38
 * @LastEditTime: 2021-05-06 17:22:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\api\docApi.js
 */

import request from './uniRequest'

export default {
  getDocLists(params) {
    return request({
      url: '/doc/getDocLists',
      method: 'POST',
      data: params
    })
  }
}

