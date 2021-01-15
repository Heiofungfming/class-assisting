<template>
	<view class="content">
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
  <u-input v-model="workType" 
    type="select"
    @click="showWorkList = true"/>
  <u-select 
    v-model="showWorkList" 
    mode="single-column" 
    :list="workList" 
    @confirm="selectWork"></u-select>
  <u-input v-model="doneType" 
    type="select" 
    @click="showDoneList = true"/>
  <u-select v-model="showDoneList" 
    mode="single-column" 
    :list="doneList" 
    @confirm="selectDone"></u-select>
  <view>
    <text class="title">主页</text>
  </view>
  <u-tabbar :list="tabbarList" 
    :mid-button="true"
    active-color="#5677FC"
    inactive-color="#333333"></u-tabbar>
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
						label: '进行中'
          },
          {
						value: '2',
						label: '已截至'
					}
        ],
        doneList: [
          {
						value: '3',
						label: '未完成'
					},
					{
						value: '4',
						label: '已完成'
          },
          {
						value: '2',
						label: '个人作业'
          },
          {
						value: '3',
						label: '班级作业'
          },
          {
						value: '4',
						label: '班级作业'
          }
        ],
        workType: '',
        doneType: ''
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
      }
		}
	}
</script>

<style>

</style>
