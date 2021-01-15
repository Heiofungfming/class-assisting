<template>
	<view class="content">
		<view class="content_form">
      <u-form :model="form"
        label-position="top"
        :label-style="labelStyle"
        ref="uForm">
        <u-form-item 
          label="班级名称" 
          prop="name"
          required>
          <u-input v-model="form.name" placeholder="请输入要加入的班级名称"/>
        </u-form-item>
        <u-form-item label="班级密钥" 
          prop="key"
          required>
          <u-input v-model="form.key" 
            placeholder="请输入班级密钥"
            type="password"/>
        </u-form-item>
      </u-form>
	  </view>
    <u-button @click="submit"
      :custom-style="squareStyle"
      :hair-line="true"
      ripple>加入班级</u-button>
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
      console.log('加入班级');
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
