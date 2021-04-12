<!--
 * @Author: your name
 * @Date: 2021-03-22 21:34:40
 * @LastEditTime: 2021-04-12 10:20:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\pages\add\detailJob.vue
-->
<template>
	<view class="content">
		<view class="content_body">
			<view class="job_type">个人作业</view>
			<view class="content_item">
				<label>课程</label>
				<p>{{jobData.course}}</p>
			</view>
			<view class="content_item">
				<label>作业标题</label>
				<p>{{jobData.title}}</p>
			</view>
			<view class="content_item">
				<label>截至时间</label>
				<p>{{jobData.endTime}}</p>
			</view>
			<view class="content_item">
				<label>作业内容</label>
				<p>{{jobData.detail}}</p>
			</view>
			<view class="content_item">
				<label>作业配图</label>
				<view v-for="(item, index) in imgArray" :key="index" :index="index">
					<img :src="`${item}`" alt="">
				</view>
			</view>
			<view class="content_item">
				<label>作业文件</label>
			</view>
			<view class="content_photo"></view>
			<view class="content_file"></view>
		</view>
	</view>
</template>

<script>
import {jobApi} from '@/api/api'

	export default {
		data() {
			return {
				staticPath: '/static',
				jobData: {},
				imgArray: []
			}
		},
		onLoad(obj) {
			this.getJobDetail(obj.id)
		},
		computed: {
			
		},
		methods: {
      async getJobDetail(jobId) {
        await jobApi.getJob(jobId).then(res => {
          let {code, data} = res
          if (code === 0) {
						this.jobData = data
						console.log(this.jobData)
						this.getImgPath()
          }
        })
			},
			getImgPath() {
				if (this.jobData.image.length > 0) {
					for(let item of this.jobData.image) {
						item = item.url
						this.imgArray.push(item)
					}
					console.log(this.imgArray,1111)
				}
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
