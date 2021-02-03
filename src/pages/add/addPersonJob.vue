<template>
	<view class="content">
		<view class="content_form">
      <u-form :model="form"
        label-position="top"
        :label-style="labelStyle"
        ref="uForm">
        <u-form-item 
          label="学校名称" 
          prop="school"
          required>
          <u-input v-model="form.name" placeholder="如：广东工业大学"/>
        </u-form-item>
        <u-form-item 
          label="学院" 
          prop="acedemy"
          required>
          <u-input v-model="form.name" placeholder="如：计算机学院"/>
        </u-form-item>
        <u-form-item 
          label="年级" 
          prop="grade"
          required>
          <u-input v-model="form.name" placeholder="如：17级"/>
        </u-form-item>
        <u-form-item 
          label="专业名称" 
          prop="major"
          required>
          <u-input v-model="form.name" placeholder="如：计算机科学与技术"/>
        </u-form-item>
        <u-form-item 
          label="班级" 
          prop="class"
          required>
          <u-input v-model="form.name" placeholder="如：六班"/>
        </u-form-item>
        <u-form-item label="班级密钥" 
          prop="key"
          required>
          <u-input v-model="form.key" 
            placeholder="请输入加入此班级的密钥">
          </u-input>
        </u-form-item>
      </u-form>
	  </view>
    <u-button @click="submit" 
      :custom-style="squareStyle"
      :hair-line="true"
      ripple>创建班级</u-button>
	</view>
</template>

<script>
import mixins from '@/common/js/mixins'
export default {
  mixins: [mixins],
  data() {
    return {
      form: {
        name: '',
        key: '',
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
      }
    }
  },
  onLoad() {

  },
  methods: {
    submit() {
      uni.switchTab({
        url: '/pages/home/index'
      })
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
