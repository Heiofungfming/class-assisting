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
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">主页</text>
		</view>
		<u-tabbar :list="tabbarList" 
      :mid-button="true"
      active-color="#5677FC"
      inactive-color="8a8a8a"></u-tabbar>
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
        tabbarList: []
			}
		},
		onLoad() {
      this.tabbarList = [...this.$store.state.tabbarList]
		},
		methods: {
      change(index) {
				this.current = index;
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
