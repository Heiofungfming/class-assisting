<template>
	<view class="content">
    <view class="content_header">
      <view style="width: 100%;">
        <tabs :list="tabList"
          :is-scroll="false"
          :current="current"
          height="160"
          bar-width="100"
          bar-height="100"
          bg-color="#5677FC"
          active-color="#fff"
          inactive-color="#fff"
          @change="change"></tabs>
      </view>
      <!-- <view class="select_box">
        <u-input v-model="jobType"
          class="select_box--input"
          type="select"
          border
          height="50"
          :custom-style="selectStyle"
          :select-open="showWorkList"
          @click="showWorkList = true"/>
        <u-select 
          v-model="showWorkList"
          mode="single-column"
          :list="workList"
          :default-value="[0]"
          @confirm="selectWork"></u-select>
        <u-input v-model="doneType"
          class="select_box--input" 
          type="select"
          border
          height="50"
          :custom-style="selectStyle"
          :select-open="showDoneList"
          @click="showDoneList = true"/>
        <u-select v-model="showDoneList"
          mode="single-column"
          :list="doneList"
          :default-value="[0]"
          @confirm="selectDone"></u-select>
      </view> -->
      <u-dropdown ref="uDropdown" active-color="#5677FC" style="background:#fff;">
        <u-dropdown-item v-model="jobType" :title="jobTypeTitle" :options="jobOption" @change="change"></u-dropdown-item>
        <u-dropdown-item v-model="doneType" :title="doneTypeTitle" :options="doneOption"></u-dropdown-item>
      </u-dropdown>
    </view>
    <view class="content_body">
      <u-swipe-action btn-width="180" :options="options">
        <u-card title="计算机网络"
          padding="20"
          margin="0"
          :thumb="thumbSrc"
          thumb-width="50">
          <view class="" slot="body">
            <view class="u-body-item u-flex u-row-between">
              <view class="u-body-item-title">瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半</view>
              <image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" mode="aspectFill"></image>
            </view>
          </view>
          <view class="u-flex u-row-between" slot="foot">
            <view class="end_time_text">
              <u-icon size="34"
                name="time-copy"
                custom-prefix="custom-icon"
                class="u-m-r-5"></u-icon>
              <span>截止时间：{{subTitle}}</span>
            </view>
            <u-tag text="已完成" mode="light" type="warning"/>
          </view>
        </u-card>
      </u-swipe-action>
      <u-swipe-action btn-width="180" :options="options">
        <u-card title="计算机网络"
          padding="20"
          margin="0"
          :thumb="thumbSrc"
          thumb-width="50">
          <view class="" slot="body">
            <view class="u-body-item u-flex u-row-between">
              <view class="u-body-item-title">瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半</view>
              <image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" mode="aspectFill"></image>
            </view>
          </view>
          <view class="u-flex u-row-between" slot="foot">
            <view class="end_time_text">
              <u-icon size="32"
                name="time-copy"
                custom-prefix="custom-icon"
                class="u-m-r-5"></u-icon>
              <span>截止时间：{{subTitle}}</span>
            </view>
            <u-tag class="u-m-l-40" text="已截止" mode="light" type="error" />
          </view>
        </u-card>
      </u-swipe-action>
      <u-swipe-action btn-width="180" :options="options">
        <u-card title="计算机网络"
          padding="20"
          margin="0"
          :thumb="thumbSrc1"
          thumb-width="50">
          <view class="" slot="body">
            <view class="u-body-item u-flex">
              <view class="u-body-item-title">瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半</view>
              <image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" mode="aspectFill"></image>
            </view>
          </view>
          <view class="" slot="foot">{{subTitle}}</view>
        </u-card>
      </u-swipe-action>
      <u-swipe-action btn-width="180" :options="options">
        <u-card title="计算机网络"
          padding="20"
          margin="0"
          :thumb="thumbSrc1"
          thumb-width="50">
          <view class="" slot="body">
            <view class="u-body-item u-flex">
              <view class="u-body-item-title">瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半</view>
              <image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" mode="aspectFill"></image>
            </view>
          </view>
          <view class="" slot="foot">{{subTitle}}</view>
        </u-card>
      </u-swipe-action>
      <u-swipe-action btn-width="180" :options="options">
        <u-card title="计算机网络"
          padding="20"
          margin="0"
          :thumb="thumbSrc2"
          thumb-width="50">
          <view class="" slot="body">
            <view class="u-body-item u-flex">
              <view class="u-body-item-title">瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半</view>
              <image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" mode="aspectFill"></image>
            </view>
          </view>
          <view class="" slot="foot">{{subTitle}}</view>
        </u-card>
      </u-swipe-action>
      <u-swipe-action btn-width="180" :options="options">
        <u-card title="计算机网络"
          padding="20"
          margin="0"
          :thumb="thumbSrc2"
          thumb-width="50">
          <view class="" slot="body">
            <view class="u-body-item u-flex">
              <view class="u-body-item-title">瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半</view>
              <image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" mode="aspectFill"></image>
            </view>
          </view>
          <view class="" slot="foot">{{subTitle}}</view>
        </u-card>
      </u-swipe-action>
    </view>
    <view class="content_footer">
      <u-tabbar :list="tabbarList" 
      :mid-button="true"
      active-color="#5677FC"
      inactive-color="#333333"
      :before-switch="switchAdd"></u-tabbar>
    </view>
    <float-btn custom v-show="showFloatBtn" @click="backToTop">
      <slot>
        <u-icon size="50" name="arrow-upward"></u-icon>
      </slot>
    </float-btn>
    <u-action-sheet :list="sheetList" 
      v-model="showAddWork"
      border-radius="20"
      @click="addJob"></u-action-sheet>
	</view>
</template>

<script>
  import tabs from '../../components/tabs/tabs' 
  import floatBtn from '../../components/floatBtn'
  import addJobSheetMixins from '../../common/js/addJobSheetMixins'
	export default {
    mixins: [addJobSheetMixins],
    components: {
      tabs,
      floatBtn
    },
    computed: {
      jobTypeTitle() {
        return this.jobOption[this.jobType].label
      },
      doneTypeTitle() {
        return this.doneOption[this.doneType].label
      }
    },
		data() {
			return {
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
				current: 0,
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
					},
				],
        title: '素胚勾勒出青花，笔锋浓转淡',
        subTitle: '2020-05-15 10:09',
        thumbSrc: '/static/image/card/class.png',
        thumbSrc1: '/static/image/card/person.png',
        thumbSrc2: '/static/image/card/class.png',
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
        showFloatBtn: false
			}
		},
		onLoad() {
      this.getTabbarList()
      this.addScorllListener()
    },
    onUnload() {
      this.removeScorllListener()
    },
		methods: {
      getTabbarList() {
        this.tabbarList = [...this.$store.state.tabbarList]
      },
      addScorllListener() {
        window.addEventListener('scroll', this.scrollToTop)
      },
      removeScorllListener() {
        window.removeEventListener('scroll', this.scrollToTop)
      },
      change(index) {
				this.current = index;
      },
      selectWork(e) {
        this.jobType = e[0].label
      },
      selectDone(e) {
        this.doneType = e[0].label
      },
      scrollToTop() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        this.showFloatBtn = scrollTop > 130
      },
      backToTop() {
        let distanceY = window.pageYOffset
        let i = 0
        let interval = null
        interval = setInterval(() => {
          let next = Math.floor(this.easeInOutquad(10 * i, distanceY, -distanceY, 500))
          if (next <= 0) {
            window.scrollTo(0, 0)
            clearInterval(interval)
          } else {
            window.scrollTo(0, next)
          }
          i++
        }, 17)
      },
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
</style>
