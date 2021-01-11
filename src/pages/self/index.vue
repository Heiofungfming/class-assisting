<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">我的</text>
		</view>
		<u-tabbar :list="list" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						iconPath: "/static/image/tabbar/home.png",
						selectedIconPath: "/static/image/tabbar/home-fill.png",
						text: '首页',
						count: 2,
						isDot: true,
            customIcon: false,
            pagePath: "/pages/home/index"
					},
					{
						iconPath: "/static/image/tabbar/add.png",
						selectedIconPath: "/static/image/tabbar/add-fill.png",
						text: '发布',
						midButton: true,
            customIcon: false,
            pagePath: "/pages/add/index"
					},
					{
						iconPath: "/static/image/tabbar/me.png",
						selectedIconPath: "/static/image/tabbar/me-fill.png",
						text: '我的',
						count: 23,
						isDot: false,
            customIcon: false,
            pagePath: "/pages/self/index"
					},
				]
			}
		},
		onLoad() {

		},
		methods: {

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
