<template>
	<view class="content">
  <view style="width: 100%;">
    <u-tabs :list="tabList"
      :is-scroll="false"
      :current="current"
      @change="change"></u-tabs>
    <tabs :list="tabList"
      :is-scroll="false"
      :current="current"
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
  // import tabs from '@/component/tabs/u-tabs' 
	export default {
    components: {
      tabs
    },
		data() {
			return {
        tabList: [
          {
            name: '作业'
          }, {
            name: '通知'
          }, {
            name: '文档',
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
