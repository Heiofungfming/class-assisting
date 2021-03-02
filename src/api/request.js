/*
 * @Author: your name
 * @Date: 2021-03-01 17:55:39
 * @LastEditTime: 2021-03-01 18:09:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\api\request.js
 */
import axios from 'axios'

export function request (config) {
  // 创建axios实例
  const instance =  axios.create({
    baseURL: 'http://localhost:3000',
    timeOut: null
  })

  // 2. axios拦截器
  // 2.1 请求拦截器
  instance.interceptors.request.use(config => {
    return config
  })

  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  // 3. 发送真正的网络请求
  return instance(config)
}