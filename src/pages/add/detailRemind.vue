<!--
 * @Author: your name
 * @Date: 2021-04-06 22:49:33
 * @LastEditTime: 2021-04-06 23:35:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\pages\add\detailRemind.vue
-->
<template>
	<view class="content">
		<view class="content_body">
			<view class="job_type">通知详情</view>
			<view class="content_item">
				<label>通知类型</label>
				<p>{{remindData.tag}}</p>
			</view>
			<view class="content_item">
				<label>通知标题</label>
				<p>{{remindData.title}}</p>
			</view>
			<view class="content_item">
				<label>截至时间</label>
				<p>{{remindData.endTime}}</p>
			</view>
			<view class="content_item">
				<label>通知内容</label>
				<p>{{remindData.detail}}</p>
			</view>
			<view class="content_item">
				<label>通知配图</label>
				<img src="/static/logo.png" alt="">
			</view>
			<view class="content_item">
				<label>通知文件</label>
			</view>
			<view class="content_photo"></view>
			<view class="content_file"></view>
		</view>
	</view>
</template>

<script>
import {remindApi} from '@/api/api'

	export default {
		data() {
			return {
				remindData: {}
			}
		},
		onLoad(obj) {
      this.getRemindDetail(obj.id)
		},
		methods: {
      getRemindDetail(remindId) {
        remindApi.getRemind(remindId).then(res => {
          let {code, data} = res
          if (code === 0) {
            this.remindData = data
            console.log(data)
          }
        })
      }
		}
	}
</script>

<style>
	.content {
		padding: 40rpx;
	}

	.content-body {
		
	}

	.job_type {
		font-size: 44rpx;
		font-weight: 600;
	}

	.content_item {
		margin-top: 20rpx;
		color: #707077;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.content_item label{
		font: 14px;
		color: #515151;
		font-weight: 600;
		margin-bottom: 10rpx;
	}

	.content_item img{
		height: 200rpx;
		width: 200rpx;
	}
</style>