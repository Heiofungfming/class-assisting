<!--
 * @Author: your name
 * @Date: 2021-01-19 21:32:23
 * @LastEditTime: 2021-05-02 11:15:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\pages\class\joinClass.vue
-->
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
import {classApi, studentApi} from '@/api/api'
export default {
  mixins: [mixins],
  data() {
    return {
      openId: '',
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
  onReady() {
    this.openId = uni.getStorageSync('openId')
  },
  methods: {
    submit() {
      classApi.checkPassword(this.form).then(res => {

        if (res.code === -1) {
          this.$showToast('所加入班级不存在')
          throw new Error('所加入班级不存在')
        }

        if (res.code === -2) {
          this.$showToast('密码错误，请重新输入')
          this.form.key = ''
          throw new Error('密码错误，请重新输入')
        }
        
        return Promise.resolve(res.code)
      }).then(code => {

        if (code === 0) {
          let obj = {
            openId: this.openId,
            name: this.form.name
          }

          studentApi.updateJoinClass(obj).then(res => {
            if (res.code === -1) {
              this.$showToast('已加入该班级')
              throw new Error('已加入该班级')
            }

            return Promise.resolve(obj)

          }).then(obj => {
            classApi.joinClass(obj).then(res => {
              if (res.code === 0) {
                this.$showToast('加入班级成功')
                uni.setStorageSync('curClass', obj.name)
                uni.switchTab({
                  url: '/pages/home/index'
                })
              } else this.$showToast('加入班级失败')
            })
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch(err => {
        console.log(err)
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
