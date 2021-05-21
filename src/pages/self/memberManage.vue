<!--
 * @Author: your name
 * @Date: 2021-05-07 13:59:19
 * @LastEditTime: 2021-05-17 13:11:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\pages\self\memberManage.vue
-->
<template>
	<view class="content">
    <view class="top">
      班级成员人数：{{stuList.length}}
    </view>
		<view class="item" v-for="(res, index) in stuList" :key="res.openId">
			<view class="item-content">
        <u-avatar :src="res.avatarUrl" size="70" mode="square"></u-avatar>
				<view class="u-font-14 u-m-l-10">{{ res.nickName }}</view>
        <view class="item-content-handle">
          <u-icon name="close" :size="24" color="#fff" class="deleteIcon"></u-icon>
        </view>
			</view>
		</view>
		<!-- <view class="addSite" @tap="toAddSite">
			<view class="add">
				<u-icon name="plus" color="#ffffff" class="icon" :size="30"></u-icon>
        删除班级成员
			</view>
		</view> -->
	</view>
</template>

<script>

import {studentApi, classApi} from '@/api/api'
export default {
	data() {
		return {
			className: '',
			stuList: []
		};
	},
	onLoad() {
		this.className = uni.getStorageSync('curClass')

		this.getStuList()
	},
	methods: {
		getStuList() {
			classApi.getStudents(this.className).then(res => {
				if (res.code === 0) {
					return Promise.resolve([...res.students])
				}
			}).then(res => {
				studentApi.getStuMsg({students: res}).then(res => {
					if (res.code === 0) {
						this.stuList = [...res.data]
					}
				})
			}).catch(res => {
				console.log(res)
			})
		},
		toAddSite(){
			uni.navigateTo({
			    url: '/pages/template/address/addSite'
			});
		}
	}
};
</script>

<style lang="scss" scoped>

.content {
  margin: 40rpx 40rpx;
  box-shadow: 0px 1px 3px rgba(34, 25, 25, 0.2);
	// border: 1px solid red;
	border-radius: 10rpx;
	overflow: hidden;
}

.top {
  height: 64rpx;
  line-height: 64rpx;
  text-align: center;
  font-size: 32rpx;
  font-weight: 500;
  background-color: #5677fc;
  color: #ffffff;
}

.item {
	padding:20rpx;
  position: relative;
  // border-bottom: 1px solid #8a8a8a;
	.item-content {
		display: flex;
    align-items: center;
    &-handle {
      position: absolute;
      right: 20rpx;
    }
	}
}

.deleteIcon {
  background: red;
  padding: 10rpx;
  border-radius: 50%;
}
.addSite {
	display: flex;
	justify-content: space-around;
	width: 600rpx;
	line-height: 100rpx;
	position: absolute;
	bottom: 30rpx;
	left: 80rpx;
	background-color: red;
	border-radius: 60rpx;
	font-size: 30rpx;
	.add{
		display: flex;
		align-items: center;
		color: #ffffff;
		.icon{
			margin-right: 10rpx;
		}
	}
}
</style>
