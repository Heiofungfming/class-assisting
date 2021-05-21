<!--
 * @Author: your name
 * @Date: 2021-03-22 21:34:40
 * @LastEditTime: 2021-05-21 14:50:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\pages\add\detailJob.vue
-->
<template>
	<view class="content">
		<view class="content_body">
			<view class="tag">
				<view class="tag_top">{{titleText}}</view>
				<view class="tag_item">
					<u-icon name="tags-fill" :size="36" color="#5677FC"></u-icon>
					<label>课程：</label>
					<p>{{jobData.course}}</p>
				</view>
				<view class="tag_item">
					<label>作业标题：</label>
					<p>{{jobData.title}}</p>
				</view>
				<view class="tag_bottom">
					<u-icon name="hourglass-half-fill" :size="24" color="#5677FC"></u-icon>
					<label class="u-m-r-10">截止时间</label>
					<p>{{jobData.endTime}}</p>
				</view>
			</view>
			
			<view class="content_item">
				<label>作业内容</label>
				<p>{{jobData.detail}}</p>
			</view>
			<view class="content_item" v-if="jobData.image.length !== 0">
				<label>作业配图</label>
				<!-- <view v-for="(item, index) in imgArray" :key="index" :index="index">
					<img :src="`${item}`" alt="">
				</view> -->
				<u-upload ref="uImg"
					custom-btn
					:deletable="false"
					:show-progress="false"
          del-bg-color="#8a8a8a"
          :file-list="jobData.image"></u-upload>
			</view>
			<view class="content_item" v-if="docLists.length > 0">
				<label>作业文件</label>
				<view class="doc-box">
          <view class="doc-item" v-for="(item, index) in docLists" :key="index">
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
			</view>
			<view class="content_photo"></view>
			<view class="content_file"></view>
		</view>
	</view>
</template>

<script>
import {jobApi, docApi} from '@/api/api'

	export default {
		data() {
			return {
				pageType: 0, // 班级作业详情页面 0，  个人作业详情页面 1
				jobData: {},
				imgArray: [],
				docLists: []
			}
		},
		onLoad(obj) {
			if (obj.className === 'undefined') {
				this.pageType = 1
				this.getJobDetail(obj.id)
			} else {
				this.getClassJobDetail(obj.id)
			}
		},
		computed: {
			titleText() {
				return this.pageType === 0 ? '班级作业' : '个人作业'
			},
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
      }
		},
		methods: {
      async getJobDetail(jobId) {
        await jobApi.getJob(jobId).then(res => {
          let {code, data} = res
          if (code === 0) {
						this.jobData = data
						// this.getImgPath()
						this.getDocList()
          }
        })
			},
			async getClassJobDetail(jobId) {
        await jobApi.getClassJob(jobId).then(async res => {
          let {code, data} = res
          if (code === 0) {
						this.jobData = data
						console.log(this.jobData)
						// await this.getImgPath()
						await this.getDocList()
          }
        })
			},
			getImgPath() {
				if (this.jobData.image.length > 0) {
					for(let item of this.jobData.image) {
						item = item.url
						this.imgArray.push(item)
					}
				}
			},
			getDocList() {
				if (this.jobData.doc.length > 0) {
					docApi.getDocLists({url: [...this.jobData.doc]}).then(res => {
						if (res.code === 0) {
							this.docLists = [...res.data]
						}
					})	
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 40rpx;
	}

	.content-body {
		
	}

	.tag {
		padding: 10rpx;
		border: 1px solid #c0c0c0;
		border-radius: 10rpx;
	}

	.tag_item {
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		display: flex;
		label {
			font-weight: 600;
		}
	}

	.tag_bottom {
		font-size: 24rpx;
		border-top: 1px solid #c0c0c0;
		display: flex;
		// justify-content: center;
		align-items: center;
	}

	.tag_top {
		font-size: 44rpx;
		font-weight: 600;
		border-bottom: 1px solid #c0c0c0;
		text-align: center;
	}

	.content_item {
		padding: 20rpx 0;
		color: #707077;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		border-bottom: 1px solid #DDD;
	}

	.content_item label{
		font: 14px;
		color: #515151;
		font-weight: 600;
		margin-bottom: 16rpx;
	}

	.content_item img{
		height: 200rpx;
		width: 200rpx;
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
    margin: 20rpx 0;
    padding: 20rpx 40rpx;
    display: flex;
    align-items: center;
    background-color: #ffffff;
		box-shadow: 1px 2px 4px rgba(34, 25, 25, 0.2);
		// border: 1px solid #c0c0c0;
		border-radius: 20rpx;
		overflow: hidden;
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
