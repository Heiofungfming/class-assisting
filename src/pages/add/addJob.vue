<template>
	<view class="content">
		<view class="content_form">
      <u-form :model="form"
        label-position="top"
        :label-style="labelStyle"
        ref="uForm">
        <u-form-item 
          label="所属课程（十六个字以内）" 
          prop="course"
          required>
          <u-input v-model="form.course" placeholder="请输入作业所属课程"/>
        </u-form-item>
        <u-form-item 
          label="作业标题（十六个字符以内）" 
          prop="title"
          required>
          <u-input v-model="form.title" placeholder="请输入作业标题"/>
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
          <u-input v-model="form.endTime" placeholder="请选择截止时间"/>
          <u-button @click="showTimePicker = true">打开</u-button>
          <u-picker v-model="showTimePicker" 
            mode="time" 
            :params="timeParams"
            @confirm="getEndTime"></u-picker>
        </u-form-item>
        <u-form-item label="作业配图" 
          prop="image">
          <!-- <u-upload :action="action" :file-list="fileList"></u-upload> -->
          <u-upload ref="uUpload" :action="actionURL" :auto-upload="false" ></u-upload>
        </u-form-item>
        <u-form-item label="作业附件" 
          prop="doc">
           <u-button>请选择聊天中的文件</u-button>
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
      ripple>创建班级作业</u-button>
	</view>
</template>

<script>
import mixins from '@/common/js/mixins'
export default {
  mixins: [mixins],
  data() {
    return {
      pageType: '', // 页面类型
      form: {
        name: '',
        key: '',
        endTime: ''
      },
      rules: {
        name: [
          { 
            required: true, 
            message: '请输入要加入的班级名称', 
            trigger: ['change','blur'],
          }
        ],
        key: [
          {
            required: true,
            message: '请班级名称密钥', 
            trigger: 'change'
          }
        ]
      },
      // 服务器上传地址
      actionURL: '',
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
      switchCollect: false // 是否使用收集作业功能
    }
  },
  onLoad(obj) {
    this.pageType = Number(obj.pageType) 
  },
  methods: {
    submit() {
      uni.switchTab({
        url: '/pages/home/index'
      })
    },
    getEndTime(obj) {
      console.log(obj)
      let dateText = obj.year + '-' + obj.month + '-' + obj.day
      let timeText = obj.hour + ':' + obj.minute
      this.form.endTime = dateText + ' ' + timeText
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
</style>
