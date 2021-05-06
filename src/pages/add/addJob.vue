<template>
	<view class="content">
		<view class="content_form">
      <u-form :model="form"
        label-position="top"
        :label-style="labelStyle"
        ref="uForm">
        <u-form-item 
          label="所属课程" 
          prop="course"
          required>
          <u-input v-model="form.course" placeholder="请输入作业所属课程（16位）" maxlength="16"/>
        </u-form-item>
        <u-form-item 
          label="作业标题" 
          prop="title"
          required>
          <u-input v-model="form.title" placeholder="请输入作业标题（16位）" maxlength="16"/>
        </u-form-item>
        <u-form-item 
          label="作业内容" 
          prop="detail"
          required>
          <u-input v-model="form.detail"
           placeholder="请输入作业内容"
           type="textarea"/>
        </u-form-item>
        <u-form-item 
          label="作业备注" 
          prop="remark">
          <u-input v-model="form.remark" placeholder="请输入作业备注"/>
        </u-form-item>
        <u-form-item 
          label="截止时间" 
          prop="endTime"
          required>
          <u-button ripple @click="showTimePicker = true">
            {{endTimeText}}
            <u-icon name="clock"
              size="34"
              class="u-m-l-5"></u-icon>
          </u-button>
          <u-picker v-model="showTimePicker" 
            mode="time" 
            :params="timeParams"
            @confirm="getEndTime"></u-picker>
        </u-form-item>
        <u-form-item label="作业配图" prop="image">
          <u-upload ref="uImg"
            :action="actionURL" 
            :auto-upload="true"
            del-bg-color="#8a8a8a"
            :file-list="imgLists"
            @on-success="saveImgPath"
            @on-remove="deleteImg"></u-upload>
        </u-form-item>
        <u-form-item label="作业附件" 
          prop="doc">
          <!-- 添加文件预览 开始-->
          <view class="pre-box" v-if="!showUploadList">
            <view class="pre-item" v-for="(item, index) in docLists" :key="index">
              <u-icon size="80"
                :name="item.fileExt === 'docx' ? 'doc' : item.fileExt"
                custom-prefix="custom-icon"
                :color="filecolor(item.fileExt)"
                class="u-m-r-5"></u-icon>
              <view class="pre-item-content">
                <view class="pre-item-title">{{item.file.name}}</view>
                <view class="pre-item-size">{{getFileSize(item.file.size)}}</view>
              </view>
              <view class="delete-icon"
                @tap.stop="deleteDocItem(index)">
                <u-icon class="u-icon" name="close" size="20" color="#ffffff"></u-icon>
              </view>
            </view>
            <upload-file ref="lFile" 
              :custom-btn="true"
              :show-upload-list="showUploadList"
              :action="upFileUrl">
              <view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
                  <u-icon name="file-text" size="50" color="#8a8a8a" label="请选择聊天中的文件"></u-icon>
              </view>
            </upload-file>
          </view>
          <!-- 添加文件预览 结束-->
        </u-form-item>
        <template v-if="pageType === 0">
          <u-form-item label="是否向班级同学发送提醒"
          prop="isRemind"
          required>
            <u-switch slot="right" v-model="switchRemind"></u-switch>
        </u-form-item>
        <u-form-item label="是否使用收作业功能"
          prop="isCollect"
          required>
            <u-switch slot="right" v-model="switchCollect"></u-switch>
        </u-form-item>
        </template>
      </u-form>
	  </view>
    <u-button @click="submit" 
      :custom-style="squareStyle"
      :hair-line="true"
      ripple>{{submitBtnText}}</u-button>

    <!-- bug：未进行提交 但文件已经上传的 -->
    <u-toast ref="uToast" />
	</view>
</template>

<script>
import mixins from '@/common/js/mixins'
import uploadFile from '../../components/uploadFile'
import {jobApi, studentApi} from '@/api/api'
export default {
  mixins: [mixins],
  components: {
    uploadFile
  },
  data() {
    return {
      pageType: '', // 页面类型: 班级作业 0，个人作业 1
      openId: '',
      form: {
        course: '',
        title: '',
        detail: '',
        remark: '',
        endTime: '',
        image: [],
        doc: [],
        isDone: false, // 是否完成作业
        isRemind: true,
        isCollect: true,
        className: ''
      },
      rules: {
        course: [
          { 
            required: true, 
            message: '请输入作业所属课程', 
            trigger: ['change','blur']
          }
          // {
          //   pattern: /^[0-9a-zA-Z\u4e00-\u9fa5]*$/g,
          //   transform(value) {
          //     return String(value);
          //   },
          //   message: '课程仅支持英文\\数字\\中文'
          // }
        ],
        title: [
          {
            required: true,
            message: '请输入作业标题', 
            trigger: ['change','blur']
          }
        ],
        detail: [
          {
            required: true,
            message: '请输入作业内容',
            trigger: ['change','blur']
          }
        ],
        endTime: [
          {
            required: true,
            message: '请选择截止时间',
            trigger: ['change','blur']
          }
        ]
      },
      // 服务器上传地址
      actionURL: 'http://localhost:3000/job/uploadImg',
      showTimePicker: false,
      timeParams: {
        year: true,
        month: true,
        day: true,
        hour: true,
        minute: true,
        second: false
      },
      switchRemind: false, // 是否使用作业提醒功能
      switchCollect: false, // 是否使用收集作业功能

      showUploadList: false,
        showImgList: false, 
        imgLists: [], // 图片的预览列表
        imgPathLists:[],
        docLists: [],
        docPathLists:[],
        upFileUrl: 'http://localhost:3000/job/uploadFile',

      isEdit: false,
      fileList: [
					{
						url: '/static/logo.png',
          },
          {
            url: 'http://localhost:3000/upload/image/0409/21/20210409215830.png'
          }
				]
    }
  },
  onLoad(obj) {
    this.getPageType(Number(obj.pageType))
    this.setTitle()
    obj.jobId && this.getFormData(obj.jobId) 
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
    // 获取图片列表
    this.imgLists = this.$refs.uImg.lists
    // 获取文件列表
    this.docLists = this.$refs.lFile.lists;
    // 获取用户的openId
    this.openId = uni.getStorageSync('openId')
  },
  computed: {
    endTimeText() {
      return this.form.endTime !== '' ? this.form.endTime : '请选择截止时间'
    },
    submitBtnText() {
      return this.pageType === 0 && !this.isEdit ? '创建班级作业' : 
          !this.isEdit ? '创建个人作业' : '修改作业'
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
    },
    // 计算文件的大小
    getFileSize(size) {
      return (size) => {
        if (!size)
            return 0;
 
        var num = 1024.00; //byte
 
        if (size < num)
            return size + "B";
        if (size < Math.pow(num, 2))
            return (size / num).toFixed(2) + "K"; //kb
        if (size < Math.pow(num, 3))
            return (size / Math.pow(num, 2)).toFixed(2) + "M"; //M
        if (size < Math.pow(num, 4))
            return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
        return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
      }
    }
  },
  methods: {
    submit() {
      // 获取图片的路径
      this.form.image = [...this.imgPathLists]
      console.log(this.form.image);
      
      // 获取文件的路径
      if (this.docLists.length) {
        let docPathLists = this.getDocPath()
        this.form.doc = [...docPathLists]
      }
   

      if (this.pageType === 0 && !this.isEdit) {
        this.form.className = uni.getStorageSync('curClass')
        jobApi.addClassJob(this.form).then(res => {
          let {code} = res
          if (code === 0) this.$showToast('添加班级作业成功')
        })
      } else if(!this.isEdit){
        this.form.studentId = uni.getStorageSync('openId')
        jobApi.addJob(this.form).then(res => {
          let {code, jobId} = res
          const obj = {
            openId: this.openId,
            jobId: jobId
          }
          // console.log(obj,'------------')
          studentApi.updateAddJob(obj).then(res => {
            if (res.code === 0) this.$showToast('添加个人作业成功')
          })
        })
      } else {
        console.log(this.form, 2222)
        jobApi.updateJob(this.form).then(res => {
          let {code} = res
          if (code === 0) this.$showToast('修改作业成功')
        })
      }

      // uni.switchTab({
      //   url: '/pages/home/index'
      // })
    },
    getEndTime(obj) {
      console.log(obj)
      let dateText = obj.year + '-' + obj.month + '-' + obj.day
      let timeText = obj.hour + ':' + obj.minute
      this.form.endTime = dateText + ' ' + timeText
    },
    getPageType(type) {
      this.pageType = type
    },
    setTitle() {
      if (this.pageType === 0) {
        uni.setNavigationBarTitle({
          title:'发布班级作业'
        })
      } else {
        uni.setNavigationBarTitle({
          title:'发布个人作业'
        })
      }
    },
    getFormData(jobId) {
      this.isEdit = true
      jobApi.getJob(jobId).then(res => {
        let {code, data} = res
        if (code === 0) {
          this.form = {...data}
          this.getImgList()
        }
      })
    },
    upFile() {
      /**
           * currentWebview: 当前webview
           * url：上传接口地址
           * name：附件key,服务端根据key值获取文件流，默认file,上传文件的key
           * header: 上传接口请求头
           */
        console.log('上传文件');
        
				this.$refs.lFile.upload({
					// #ifdef APP-PLUS
					// nvue页面使用时请查阅nvue获取当前webview的api，当前示例为vue窗口
					currentWebview: this.$mp.page.$getAppWebview(),
					// #endif
					url: 'http://localhost:3000/job/uploadImg',
					name: 'myFile',
					// header: {'Authorization':'token'},
					// 其他业务参数直接写key,value,如：
					// key1: 'value1',
					// key2: 'value2',
				});
    },
    showToast() {
      this.$refs.uToast.show({
        title: '创建作业成功',
        type: 'success',
        url: '/pages/home/index'
      })
    },
    saveImgPath(data, index) {
      let { realPath } = data
      let obj = { url: realPath }
      this.imgPathLists.push(obj)
    },
    deleteImg(index, lists, name){
      console.log(1111)
      let delPath = this.imgPathLists[index]
      console.log(this.imgPathLists)
      console.log(delPath, '删除图片路径')
      let obj = {delPath: delPath}
      jobApi.deleteFile(obj).then(res => {
        let {error_code} = res
        if (error_code === 10000) {
          this.imgPathLists.splice(index, 1)
        }
      })
    },
    deleteDocItem(index) {
      let { realPath } = this.docLists[index].response
      let obj = {delPath: realPath}
      jobApi.deleteFile(obj).then(res => {
        let {error_code} = res
        if (error_code === 10000) {
          this.docLists.splice(index, 1);
        }
      })
      this.$showToast('移除成功')
    },
    getDocPath() {
      let arr = []
      this.docLists.forEach(item => {
        let {realPath} = item.response
        arr.push(realPath)
      })
      return arr
    },
    getImgList() {
      let { image } = this.form
      if (image.length > 0) {
        this.imgLists = [...image]
        this.imgPathLists = [...image]
      }
    }
  }
}
</script>

<style>
  .content {
    padding: 40rpx;
  }

  .content_form .u-form-item--left__content--required {
    color: #8a8a8a;
  }

  .slot-btn {
	width: 350rpx;
	height: 80rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgb(244, 245, 246);
	border-radius: 10rpx;
  border: solid 1px #8a8a8a;
}

.slot-btn__hover {
	background-color: rgb(235, 236, 238);
}

.pre-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

	.pre-item {
		flex: 0 0 48.5%;
    border-radius: 10rpx;
    width: 600rpx;
		height: 300rpx;
		/* overflow: hidden; */
		position: relative;
    margin-bottom: 30rpx;
    padding: 20rpx;
    display: flex;
    align-items: center;
    border: solid 1px #8a8a8a;
    border-radius: 10rpx;
	}

  .pre-item-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 20rpx;
  }
  .pre-item-title {
    flex: 1;
  }
  .pre-item-size{
    flex: 1;
  }
  .delete-icon {
    width: 44rpx;
    height: 44rpx;
    background: #8a8a8a;
    position: absolute;
    top: 10rpx;
    right: 10rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    z-index: 10;
  }

  .img-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.img-item {
		flex: 0 0 48.5%;
		border-radius: 10rpx;
		height: 140rpx;
		overflow: hidden;
		position: relative;
		margin-bottom: 20rpx;
	}

	.img-item-image {
		width: 100%;
		height: 140rpx;
	}
</style>
