/*
 * @Author: your name
 * @Date: 2021-01-19 21:32:23
 * @LastEditTime: 2021-03-04 11:38:32
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\common\js\mixins.js
 */
let mixins = {
  data() {
    return {
      circleStyle: {
        marginTop: '20px',
        width: '326px',
        color: '#5677FC'
      },
      squareStyle: {
        marginTop: '20px',
        width: '326px',
        background: '#5677FC',
        color: 'white'
      },
      defaultHover: {
        color: '#5677FC',
        borderColor: '#5677FC'
      },
      labelStyle: {
        color: '#8a8a8a',
        fontWeight: '600'
      }
    }
  }
}

export default mixins