/*
 * @Author: your name
 * @Date: 2021-02-02 11:54:05
 * @LastEditTime: 2021-02-02 17:32:34
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
      if (index === 1) {
        this.showAddWork = true
      } else 
      return true
    },
    addJob(index) {
        uni.navigateTo({
          url: `/pages/add/addJob?pageType=${index}`
        })
    }
  }
}

export default mixins