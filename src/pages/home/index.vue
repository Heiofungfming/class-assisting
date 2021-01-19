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
      <view class="select_box">
        <u-input v-model="workType"
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
      </view>
    </view>
    <view class="content_body">
      <u-card padding="10">
        <view class="" slot="head">
          {{title}}
          <a>---</a>
        </view>
        <view class="" slot="body">
          <view class="u-body-item u-flex">
            <view class="u-body-item-title">瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半</view>
            <image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg" mode="aspectFill"></image>
          </view>
        </view>
        <view class="" slot="foot">{{subTitle}}</view>
      </u-card>
    </view>
    <view class="content_footer">
      <u-tabbar :list="tabbarList" 
      :mid-button="true"
      active-color="#5677FC"
      inactive-color="#333333"
      :before-switch="switchAdd"></u-tabbar>
    </view>
    <u-picker v-model="showAddwork" mode="selector"></u-picker>
	</view>
</template>

<script>
  import tabs from '../../components/tabs/tabs' 
	export default {
    components: {
      tabs
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
        workType: '全部',
        doneType: '全部',
        selectStyle: {
          // background: '#fff'
          color: '#515151'
        },
        title: '素胚勾勒出青花，笔锋浓转淡',
        subTitle: '2020-05-15',
        thumb: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
        showAddwork: false
			}
		},
		onLoad() {
      this.tabbarList = [...this.$store.state.tabbarList]
		},
		methods: {
      change(index) {
				this.current = index;
      },
      selectWork(e) {
        this.workType = e[0].label
      },
      selectDone(e) {
        this.doneType = e[0].label
      },
      switchAdd(index) {
        if (index === 1) {
          this.showAddwork = true
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

.u-card-wrap { 
		background-color: $u-bg-color;
		padding: 1px;
	}
	
	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}
		
	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
</style>
