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
          <u-input v-model="form.school" placeholder="如：广东工业大学"/>
        </u-form-item>
        <u-form-item 
          label="学院" 
          prop="acedemy"
          required>
          <u-input v-model="form.acedemy" placeholder="如：计算机学院"/>
        </u-form-item>
        <u-form-item 
          label="年级" 
          prop="grade"
          required>
          <u-input v-model="form.grade" placeholder="如：17级"/>
        </u-form-item>
        <u-form-item 
          label="专业名称" 
          prop="major"
          required>
          <u-input v-model="form.major" placeholder="如：计算机科学与技术"/>
        </u-form-item>
        <u-form-item 
          label="班级" 
          prop="class"
          required>
          <u-input v-model="form.class" placeholder="如：六班"/>
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
        school: '',
        key: '',
      },
      rules: {
        school: [
          { 
            required: true, 
            message: '请输入学校名称', 
            trigger: ['change','blur']
          },
          {
            validator: (rule, value, callback) => {
              return this.$u.test.chinese(value);
            },
            message: '学校名称仅支持中文',
            trigger: ['change','blur'],
          }
        ],
        acedemy: [
          {
            required: true,
            message: '请输入学院名称',
            trigger: ['change','blur']
          },
          {
            validator: (rule, value, callback) => {
              return this.$u.test.chinese(value);
            },
            message: '学院名称仅支持中文',
            trigger: ['change','blur'],
          }
        ],
        grade: [
          {
            required: true,
            message: '请输入年级',
            trigger: ['change','blur']
          },
          {
            pattern: /^[0-9a-zA-Z\u4e00-\u9fa5]*$/g,
            transform(value) {
              return String(value);
            },
            message: '年级仅支持英文\\数字\\中文'
          }
        ],
        major: [
          {
            required: true,
            message: '请输入专业名称',
            trigger: ['change','blur']
          },
          {
            pattern: /^[a-zA-Z\u4e00-\u9fa5]*$/g,
            transform(value) {
              return String(value);
            },
            message: '专业名称仅支持英文\\中文'
          }
        ],
        class: [
          {
            required: true,
            message: '请输入班级',
            trigger: ['change','blur']
          },
          {
            pattern: /^[0-9a-zA-Z\u4e00-\u9fa5]*$/g,
            transform(value) {
              return String(value);
            },
            message: '年级仅支持字母\\数字\\中文'
          }
        ],
        key: [
          {
            min: 4,
            required: true,
            message: '请输入不少于4位数字的班级密钥', 
            trigger: 'change'
          },
          {
            pattern: /^[0-9]*$/g,
            transform(value) {
              return String(value);
            },
            message: '班级密钥仅支持数字'
          }
        ]
      }
    }
  },
  onLoad() {

  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
  methods: {
    submit() {
      this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过');
				} else {
					console.log('验证失败');
				}
			})
      // uni.switchTab({
      //   url: '/pages/home/index'
      // })
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
