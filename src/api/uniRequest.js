/*
 * @Author: your name
 * @Date: 2021-04-15 23:13:21
 * @LastEditTime: 2021-05-21 14:06:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\api\uniRequest.js
 */
// const baseUrl = 'http://localhost:3000'
const baseUrl = 'http://www.fungming.xyz:3000'
const request = (
    obj
  ) => {
    return new Promise((resolve, reject) => {
        uni.request({
            method: obj.method || 'GET',
            url: baseUrl + obj.url,
            data: obj.data || {},
            header: obj.header || {},
            dataType: 'json',         
        }).then((response) => {
            setTimeout(function() {
                uni.hideLoading();
            }, 200);
            let [error, res] = response;		
            resolve(res.data);
        }).catch(error => {
            let [err, res] = error;
            reject(err)
        })
    });
}

export default request