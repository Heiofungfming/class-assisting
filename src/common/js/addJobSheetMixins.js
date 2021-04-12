/*
 * @Author: your name
 * @Date: 2021-02-02 11:54:05
 * @LastEditTime: 2021-04-09 20:25:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\common\js\addJobSheetMixins.js
 */
let mixins = {
  data () {
    return {
      showAddWork: false,
      sheetList: [
        { text: '班级作业' },
        { text: '个人作业' }
      ]
    }
  },
  methods: {
    switchAdd(index) {
      if (index === 1 && this.currentTag === 0) {
        this.showAddWork = true
      } else if (index === 1 && this.currentTag === 1) {
        uni.navigateTo({
          url: '/pages/add/addRemind?pageType=0'
        })
      }else if (index === 1 && this.currentTag === 2) {
        console.log('文件')
      } else {
        return true
      }
      // return true
    },
    addJob(index) {
        uni.navigateTo({
          url: `/pages/add/addJob?pageType=${index}`
        })
    }
  }
}

export default mixins