<template>
	<view class="content">
    <view class="content_header">
      <view style="width: 100%;">
        <tabs :list="tabList"
          :is-scroll="false"
          :current="currentTag"
          height="160"
          bar-width="100"
          bar-height="100"
          bg-color="#5677FC"
          active-color="#fff"
          inactive-color="#fff"
          @change="change"></tabs>
      </view>
      <u-dropdown ref="uDropdown"
        active-color="#5677FC"
        style="background:#fff;"
        v-show="currentTag === 0">
        <u-dropdown-item v-model="jobType" :title="jobTypeTitle" :options="jobOption" @change="changeJob"></u-dropdown-item>
        <u-dropdown-item v-model="doneType" :title="doneTypeTitle" :options="doneOption" @change="changeDone"></u-dropdown-item>
      </u-dropdown>
      <u-dropdown ref="uDropdown"
        active-color="#5677FC"
        style="background:#fff;"
        v-show="currentTag === 1">
        <u-dropdown-item v-model="remindType" :title="remindTypeTitle" :options="remindOption" @change="changeRemind"></u-dropdown-item>
        <u-dropdown-item v-model="endType" :title="endTypeTitle" :options="endOption" @change="changeEnd"></u-dropdown-item>
      </u-dropdown>
      <u-dropdown ref="uDropdown"
        active-color="#5677FC"
        style="background:#fff;"
        v-show="currentTag === 2">
        <u-dropdown-item v-model="docType" :title="docTypeTitle" :options="docOption" @change="changeDoc"></u-dropdown-item>
        <!-- <u-dropdown-item v-model="doneType" :title="doneTypeTitle" :options="doneOption" @change="changeDone"></u-dropdown-item> -->
      </u-dropdown>
    </view>
    <view class="content_body">
      <template v-if="currentTag === 0">
        <u-swipe-action
          btn-width="180"
          class="content_item" 
          v-for="(item, index) in jobLists" 
          :key="item._id"
          :index = index
          @click="swiperClick"
          :options="item.isDone ?  doneOptions : options">
          <u-card :title="item.course"
            padding="20"
            margin="0"
            :thumb="item.hasOwnProperty('isDone') ? thumbSrc1 : thumbSrc"
            thumb-width="50"
            @click="getJobDetail(index)">
            <view class="" slot="body">
              <view class="u-body-item u-flex u-row-between">
                <view class="u-body-item-content">{{item.detail}}</view>
                <image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" mode="aspectFill"></image>
              </view>
            </view>
            <view class="u-flex u-row-between" slot="foot">
              <view class="end_time_text">
                <u-icon size="34"
                  name="time-copy"
                  custom-prefix="custom-icon"
                  class="u-m-r-5"></u-icon>
                <span>截止时间：{{item.endTime}}</span>
              </view>
              <view v-if="item.isDone">
                <u-tag text="已完成" mode="light" type="warning"/>
              </view>
              <view v-else>
                <u-tag v-if="showTagType(item.endTime)" text="未完成" mode="light" type="primary"/>
                <u-tag v-else text="已截止" mode="light" type="error"/>
              </view>
            </view>
          </u-card>
        </u-swipe-action>
      </template>
      <template v-else-if="currentTag === 1">
        <u-swipe-action
          btn-width="180"
          class="content_item" 
          v-for="(item, index) in remindLists" 
          :key="item._id"
          :index = index
          @click="remindSwiperClick"
          :options="item.isDone ?  doneOptions : options">
          <u-card :title="item.tag"
            padding="20"
            margin="0"
            :thumb="thumbSrc2"
            thumb-width="50"
            @click="getRemindDetail(index)">
            <view class="" slot="body">
              <view class="u-body-item u-flex u-row-between">
                <view class="u-body-item-content">{{item.detail}}</view>
                <image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" mode="aspectFill"></image>
              </view>
            </view>
            <view class="u-flex u-row-between" slot="foot">
              <view class="end_time_text">
                <u-icon size="34"
                  name="time-copy"
                  custom-prefix="custom-icon"
                  class="u-m-r-5"></u-icon>
                <span>截止时间：{{item.endTime}}</span>
              </view>
              <u-tag v-if="showTagType(item.endTime)" text="进行中" mode="light" type="primary"/>
              <u-tag v-else text="已截止" mode="light" type="error"/>
            </view>
          </u-card>
        </u-swipe-action>
      </template>

      <template v-else>
        <view class="doc-box">
          <view class="doc-item" v-for="(item, index) in selectedDocList" :key="index">
            <u-icon size="80"
              :name="item.fileExt === 'docx' ? 'doc' : item.fileExt"
              custom-prefix="custom-icon"
              :color="filecolor(item.fileExt)"
              class="u-m-r-5"></u-icon>
            <view class="doc-item-content">
              <view class="doc-item-title">{{item.name}}</view>
              <view class="doc-item-ext">
                <view class="doc-item-size">{{item.size}}</view>
                <view>{{item.date}}</view>
              </view>
            </view>
            <view class="doc-item-handler">
				<u-icon size="46"
				  name="downland"
				  custom-prefix="custom-icon"
				  class="u-m-r-5"
				  @click="download(item.url)"></u-icon>
				<!-- <u-icon size="46"
				  name="view"
				  custom-prefix="custom-icon"></u-icon> -->
            </view>
          </view>
		      <!-- <u-button @click="showDoc"></u-button> -->
        </view>
      </template>
    </view>
    <view class="content_footer">
      <u-tabbar :list="tabbarList" 
      :mid-button="true"
      active-color="#5677FC"
      inactive-color="#333333"
      :before-switch="switchAdd"></u-tabbar>
    </view>
    <!-- <float-btn custom v-show="showFloatBtn" @click="backToTop">
      <slot>
        <u-icon size="50" name="arrow-upward"></u-icon>
      </slot>
    </float-btn> -->
    <u-action-sheet :list="sheetList" 
      v-model="showAddWork"
      border-radius="20"
      @click="addJob"></u-action-sheet>
	</view>
</template>

<script>
  import tabs from '../../components/tabs/tabs' 
  // import floatBtn from '../../components/floatBtn'
  import addJobSheetMixins from '../../common/js/addJobSheetMixins'
  import {jobApi, remindApi, docApi} from '@/api/api'
	export default {
    mixins: [addJobSheetMixins],
    components: {
      tabs,
      // floatBtn
    },
		data() {
			return {
        openId: '',
        className: '',
        tabList: [
          {
            name: '作业',
            imgPath: '/static/image/tabs/homework.png',
            selectedImgPath: '/static/image/tabs/homework_fill.png'
          }, {
            name: '通知',
            imgPath: '/static/image/tabs/remind.png',
            selectedImgPath: '/static/image/tabs/remind_fill.png'
          }, {
            name: '文档',
            imgPath: '/static/image/tabs/document.png',
            selectedImgPath: '/static/image/tabs/document_fill.png'
          }
        ],
				currentTag: 0,
        tabbarList: [],
        showWorkList: false,
        showDoneList: false,
				workList: [
					{
						value: '0',
						label: '全部'
					},
					{
						value: '1',
						label: '班级作业'
          },
          {
						value: '2',
						label: '个人作业'
					}
        ],
        doneList: [
          {
						value: '0',
						label: '全部'
					},
					{
						value: '1',
						label: '进行中'
          },
          {
						value: '2',
						label: '未完成'
          },
          {
						value: '3',
						label: '已完成'
          },
          {
						value: '4',
						label: '已截止'
          }
        ],
        jobType: 0,
        doneType: 0,
        remindType: 0,
        endType: 0,
        docType: 0,
        selectStyle: {
          color: '#515151'
        },
        jobOption: [
          {
						label: '全部',
						value: 0,
					},
					{
						label: '班级作业',
						value: 1,
          },
          {
						label: '个人作业',
						value: 2,
					}
				],
				doneOption: [
          {
						label: '全部',
						value: 0,
					},
					{
						label: '进行中',
						value: 1,
          },
          {
						label: '未完成',
						value: 2,
          },
          {
						label: '已完成',
						value: 3,
          },
          {
						label: '已截止',
						value: 4,
					}
        ],
        remindOption: [
          {
						label: '全部',
						value: 0,
					},
					{
						label: '学校通知',
						value: 1,
          },
          {
						label: '活动通知',
						value: 2,
          },
          {
						label: '比赛通知',
						value: 3,
          },
          {
						label: '考试通知',
						value: 4,
					}
        ],
        endOption: [
                    {
						label: '全部',
						value: 0,
					},
					{
						label: '进行中',
						value: 1,
          },
          {
						label: '已截止',
						value: 2,
					}
        ],
        docOption: [
          {
            label: '全部',
            value: 0,
          },
          {
            label: 'doc',
            value: 1,
          },
          {
            label: 'docx',
            value: 2,
          },
          {
            label: 'pdf',
            value: 3,
          },
          {
            label: 'txt',
            value: 4,
          }
        ],
        title: '素胚勾勒出青花，笔锋浓转淡',
        subTitle: '2020-05-15 10:09',
        thumbSrc: '/static/image/card/class.png',
        thumbSrc1: '/static/image/card/person.png',
        thumbSrc2: '/static/image/card/remind.png',
        showAddWork: false,
        sheetList: [
          { text: '班级作业' },
          { text: '个人作业' }
        ],
        options: [
					{
						text: '编辑',
						style: {
							backgroundColor: '#5677FC'
						}
          },
          {
						text: '完成',
						style: {
							backgroundColor: '#909399'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#F56C6C'
						}
					}
        ],
        doneOptions: [
					{
						text: '编辑',
						style: {
							backgroundColor: '#5677FC'
						}
          },
          {
						text: '未完成',
						style: {
							backgroundColor: '#909399'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#F56C6C'
						}
					}
        ],
        showFloatBtn: false,
        jobLists: [],
        classJobLists: [],
        perJobLists:  [],
        selectedJobList: [], // 下拉框筛选存储栈
        remindLists: [],
        docLists: [],
        selectedDocList: [], // 文件下拉框筛选存储栈
        // 预览文件弹窗样式
        webviewStyles: {
          progress: {
              color: '#FF3333'
          }
        }
			}
    },
    
		onLoad() {
      

      this.getTabbarList()
      // this.addScorllListener()
      // this.getNowTime()
      
    },
    async onShow() {
       // 获取openId
      this.openId = uni.getStorageSync('openId')
      // 获取当前班级
      this.className = uni.getStorageSync('curClass')

      // 获取作业列表
      await this.getJobLists()
      
      // 获取通知列表
      await this.getRemindLists()

      // 获取文件列表
      this.getDocLists()
    },
    onUnload() {
      // this.removeScorllListener()
    },
    computed: {
      jobTypeTitle() {
        return this.jobOption[this.jobType].label
      },
      doneTypeTitle() {
        return this.doneOption[this.doneType].label
      },
      remindTypeTitle() {
        return this.remindOption[this.remindType].label
      },
      endTypeTitle() {
        return this.endOption[this.endType].label
      },
      docTypeTitle() {
        return this.docOption[this.docType].label
      },
      showTagType(endTime) {
        return endTime => {
          let time = new Date()
          let end_Time = new Date(endTime)
          let done = time < end_Time
          return done
        }
      },
      // 存在复用 需通过mixin组合
      filecolor(type) {
        return (type) => {
          let color = '#3a80fc'
          switch(type) {
            case 'doc':
            case 'docx':
              break
            case 'xml':
              color = '#039e55'
              break
            case 'pdf':
              color = '#d93838'
              break
            case 'ppt':
              color = '#f34e19'
              break
            case 'zip':
              color = '#808a7f'
              break
          }
          return color
        }
      },
      // className() {
      //   return uni.getStorageSync('curClass')
      // }
      // docLists() {
      //   let list = []
      //   this.jobLists.forEach(item => {
      //     if (item.doc.length > 0) {
      //       list.concat(item.doc)
      //     }
      //   })
      // }
    },
		methods: {
      getTabbarList() {
        this.tabbarList = [...this.$store.state.tabbarList]
      },
      // addScorllListener() {
      //   window.addEventListener('scroll', this.scrollToTop)
      // },
      // removeScorllListener() {
      //   window.removeEventListener('scroll', this.scrollToTop)
      // },
      change(index) {
				this.currentTag = index;
      },
      selectWork(e) {
        this.jobType = e[0].label
      },
      selectDone(e) {
        this.doneType = e[0].label
      },
      // scrollToTop() {
      //   let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //   this.showFloatBtn = scrollTop > 130
      // },
      // backToTop() {
      //   let distanceY = window.pageYOffset
      //   let i = 0
      //   let interval = null
      //   interval = setInterval(() => {
      //     let next = Math.floor(this.easeInOutquad(10 * i, distanceY, -distanceY, 500))
      //     if (next <= 0) {
      //       window.scrollTo(0, 0)
      //       clearInterval(interval)
      //     } else {
      //       window.scrollTo(0, next)
      //     }
      //     i++
      //   }, 17)
      // },
      /**
       * @description: 缓动公式（Tween算法）
       * @param {*} t 动画已经执行的时间（实际上执行多少次/帧数）
       * @param {*} b 起始位置
       * @param {*} c 终止位置
       * @param {*} d 从起始位置到终止位置的经过时间（实际上执行多少次/帧数）
       * @return {*}
       */
      easeInOutquad(t, b, c, d) {
        // 判断当前时间是否在总时间的一半以内，是则执行缓入函数，否则执行缓出函数
        if ((t /= d / 2 ) < 1) {
          return c / 2 * t * t + b
        } else {
          // 将总长度设置为一半，并且时间从当前开始递减，对图像进行垂直向上平移
          return -c / 2 * (--t * (t - 2) - 1) + b
        }
      },
      async getJobLists() {
        await this.getClassJobLists()
        await this.getPersonJobLists()
       let  { classJobLists, perJobLists } = this
          this.jobLists = classJobLists.concat(perJobLists)
      },
      // 获取个人作业列表
      async getPersonJobLists() {
        await jobApi.getJobLists(this.openId).then(res => {
          let {code, data} = res
          if (code === 0) {
            this.perJobLists = [...data]
          }
        })
      },
      // 获取班级作业列表
      async getClassJobLists() {
        await jobApi.getClassJobLists(this.className).then(res => {
          let {code, data} = res
          if (code === 0) {
            this.classJobLists = [...data]
          }
        })
      },
      getJobDetail(index) {
        let { _id: id } = this.jobLists[index]
        uni.navigateTo({
          url: `/pages/add/detailJob?id=${id}`
        })
      },
      getRemindDetail(index) {
        let { _id: id } = this.remindLists[index]
        uni.navigateTo({
          url: `/pages/add/detailRemind?id=${id}`
        })
      },
      // getNowTime() {
      //   let time = new Date()
      //   console.log(time, '获取时间')
      //   let endTimes = new Date('2021-03-17 14:33')
      //   console.log(endTimes, '截止时间')
      //   console.log(time > endTimes) 
      // },
      /**
       * index: jobLists列表索引
       * index1: optionList列表索引
       */
      swiperClick(index, index1) {
        let { _id: id, isDone } = this.jobLists[index]
        
        if (index1 === 2) {

          jobApi.deleteJob({id: id}).then(res => {
            if (res.code === 0) this.getJobLists()
          })

        } else if (index1 === 1) {

          let obj = {
            id: id,
            isDone: !isDone
          }

          jobApi.doneJob(obj).then(res => {
            let {code} = res
            if (code === 0) {
              this.getJobLists()
            }
          })

        } else {         
          uni.navigateTo({
            url: `/pages/add/addJob?jobId=${id}`
          })
        }
      },
      remindSwiperClick(index, index1) {
        let { _id: id, isDone } = this.remindLists[index]
        
        if (index1 === 2) {

          remindApi.deleteRemind({id: id}).then(res => {
            if (res.code === 0) this.getRemindLists()
          })

        } else if (index1 === 1) {

          let obj = {
            id: id,
            isDone: !isDone
          }

          jobApi.doneJob(obj).then(res => {
            let {code} = res
            if (code === 0) {
              this.getJobLists()
            }
          })

        } else {         
          uni.navigateTo({
            url: `/pages/add/addRemind?remindId=${id}`
          })
        }
      },
      changeJob(index) {
        this.changeJobList(this.jobType, this.doneType)
      },
      changeDone(index) {
        this.changeJobList(this.jobType, this.doneType)
      },
      changeRemind(index) {
        console.log('改变通知类型')
      },
      changeEnd(index) {
        console.log('改变通知截止类型')
      },
      changeDoc(index) {
        if (index === 0) {
          this.selectedDocList = this.docLists
        } else {
          let label = this.docOption[index].label
          this.selectedDocList = this.docLists.filter(item => item.fileExt === label)
        }
      },
      async changeJobList(jobType, doneType) {
        switch(jobType) {
          case 1:
            this.jobLists = [...this.classJobLists]
            break
          case 2:
            this.jobLists = [...this.perJobLists]
            break
          default:
            await this.getJobLists()
        }

        if (doneType !== 0) {
          let time = new Date()
          let doingJob = [], doneJob = [],
              undonejob = [], endJob = []

          this.jobLists.forEach(item => {
            let endTime = new Date(item.endTime)
            if (time < endTime && !item.isDone) {
              doingJob.push(item)
            } else if(time >= endTime && !item.isDone){
              endJob.push(item)
            }

            if (item.isDone) {
              doneJob.push(item)
            } else {
              undonejob.push(item)
            }
          }) 

          switch(doneType) {
            case 1:
              this.jobLists = [...doingJob]
              break
            case 2:
              this.jobLists = [...undonejob]
              break
            case 3:
              this.jobLists = [...doneJob]
              break
            case 4: 
              this.jobLists = [...endJob]
          }
        }
      },
      async getRemindLists() {
        await remindApi.getRemindLists(this.className).then(res => {
          let {code, data} = res
          if (code === 0) {
            this.remindLists = [...data]
          }
        })
      },
      getDocLists() {
        let docPath = new Set()
        this.jobLists.forEach(item => {
          if (item.doc.length > 0) {
            item.doc.forEach(x => docPath.add(x))
          }
        })
        docApi.getDocLists({url: [...docPath]}).then(res => {
          if (res.code === 0) {
            this.docLists = [...res.data]
            this.selectedDocList = this.docLists
          }
        })
        
      },
      download(url) {
        uni.downloadFile({
          url: url,
          success: (data) => {
            if (data.statusCode === 200) {
              // 文件保存到本地
              uni.saveFile({
                tempFilePath: data.tempFilePath, // 临时路径
                success: function(res) {
                  uni.showToast({
                    icon: 'none',
                    mask: true,
                    title: '文件已保存:' + res.savedFilePath,
                    duration: 3000
                  })
                  setTimeout(() => {
                    // 打开文档查看
                    uni.openDocument({
                      filePath: res.savedFilePath,
                      success: function(res) {
                        console.log('打开文档成功')
                      }
                    })
                  }, 3000)
                }
              })
            }
          }
        })
      },
      showDoc() {
        const office = uni.requireNativePlugin('Jiang-OfficeView');  
        office.open({url:'http://localhost:3000/upload/file/0412/21/20210412210350.doc',topBarColor:'#3394EC',title:'Xls文档',fileType:'xls'}, result => {  
                                if (result.code==1) {  
        
                                }  
                        })
      }
  }
}
</script>

<style lang="scss">
.select_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #5677FC;
  &--input {
    width: 600rpx;
    margin-bottom: 20rpx;
    background: #ffffff;
    
    &/deep/ .u-input__right-icon {
      transform: scale(0.7);
    }
  }
}

.popup_box {
  background: #8a8a8a;
  .popup_item {
    &:not(:last-child) {
      border-bottom: 1px solid #DDD;
    &:last-child {
        margin-top: 10rpx;
      }
    }
  }
}

.u-card-wrap { 
  background-color: $u-bg-color;
  padding: 1px;
}
	
.u-body-item {
  font-size: 32rpx;
  color: #333;
}
		
.u-body-item image {
  width: 120rpx;
  flex: 0 0 120rpx;
  height: 120rpx;
  border-radius: 8rpx;
  margin-left: 12rpx;
}

.content {
  background: #ededed;
  &_body {
    &/deep/ .u-swipe-action {
      margin-top: 4rpx;
    }
  }
}

.u-body-item-content {
  height: 120rpx;
  line-height: 60rpx;
  overflow: hidden;
  text-overflow:ellipsis;
}

.doc-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

	.doc-item {
		flex: 0 0 48.5%;
    width: 100%;
		height: 150rpx;
		/* overflow: hidden; */
		position: relative;
    margin-top: 10rpx;
    padding: 20rpx 40rpx;
    display: flex;
    align-items: center;
    background-color: #ffffff;
	}

  .doc-item-content {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 20rpx;
  }
  .doc-item-title {
    flex: 1;
    width: 450rpx;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .doc-item-handler {
    display: flex;
  }

  .doc-item-ext{
    flex: 1;
    display: flex;
  }

  .doc-item-ext view{
    margin-right: 20rpx;
  }

</style>
