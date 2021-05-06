<!--
 * @Author: your name
 * @Date: 2021-04-15 21:25:24
 * @LastEditTime: 2021-05-02 10:46:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\pages\login\index.vue
-->
<template>
	<view class="content">
    <view class="wrap">
      <u-swiper 
        :list="swiperList"
        height="480"
        effect3d
        bg-color="#fff"
        img-mode="scaleToFill"></u-swiper>
    </view>
    <view class="handle">
      <u-button 
        shape="circle" 
        :hair-line="true"
        ripple
        :custom-style="circleStyle"
        @click="addClass">创建班级</u-button>
      <u-button 
        :hair-line="true"
        ripple
        :custom-style="squareStyle"
        @click="joinClass">加入班级</u-button>
      <u-icon size="60"
        name="weixin"
        custom-prefix="custom-icon"
        color="#15c434"
        class="oauth"
        @click="getOAuth"></u-icon>
    </view>
	
	</view>
</template>

<script>
import mixins from '@/common/js/mixins'
import {studentApi, loginApi} from '@/api/api'
export default {
  mixins: [mixins],
  data() {
    return {
      swiperList: [
        {
          image: 'http://localhost:3000/upload/image/0419/17/20210419174057.jpg',
          title: '昨夜星辰昨夜风，画楼西畔桂堂东'
        },
        {
          image: 'http://localhost:3000/upload/image/0419/17/20210419174128.jpg',
          title: '身无彩凤双飞翼，心有灵犀一点通'
        },
        {
          image: 'http://localhost:3000/upload/image/0419/17/20210419174137.jpg',
          title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
        },
        {
          image: 'http://localhost:3000/upload/image/0419/17/20210419174145.jpg',
          title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
        },
        {
          image: 'http://localhost:3000/upload/image/0419/17/20210419175923.jpg',
          title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
        }
      ]
    }
  },
  onLoad() {
    // this.getOAuth()
  },
  onReady() {
    // this.getOAuth()
  },
  onShow() {
    // this.getOAuth()
    uni.getStorageInfo({
      success: res => {
        let keys = res.keys
        if (keys.includes('userInfo') && keys.includes('openId') && keys.includes('accessToken')) {
          uni.switchTab({
            url: '/pages/home/index'
          })
        }
      }
    })
  },
  methods: {
    addClass() {
      try {
        const userInfo = uni.getStorageSync('userInfo')
        if (userInfo && userInfo.isAuthorize) {
          uni.navigateTo({
            url: '/pages/class/addClass'
          })   
        } else {
          // this.getOAuth()
          this.$showToast('请先进行微信用户授权')
        }
      } catch (error) {
        console.log(error)
      }
    },
    joinClass() {
      try {
        const userInfo = uni.getStorageSync('userInfo')
        if (userInfo && userInfo.isAuthorize) {
          uni.navigateTo({
            url: '/pages/class/joinClass'
          })  
        } else {
          // this.getOAuth()
          this.$showToast('请先进行微信用户授权')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getOAuth() {
      console.log('登录信息')
      await uni.login({
        provider: 'weixin',
        success: function (res) {
          loginApi.getUserOpenId(res.code).then(res => {
             uni.setStorageSync('openId', res.data.openid)
          })

          loginApi.getAccessToken().then(res => {
            console.log(res)
            uni.setStorageSync('accessToken', res.data.access_token)
          })
        }
      })
      await uni.getUserProfile({
        desc: '登录',
        success: res => {
          const userInfo = res.userInfo
          // 小程序授权
          userInfo.isAuthorize = true
          // 管理员(哪个班级的管理员)
          // userInfo.isAdmin = false
          userInfo.openId = uni.getStorageSync('openId')
          try {
            // 存个人信息到客户端
            uni.setStorageSync('userInfo', userInfo)
            // 存储个人信息到服务端
            // .....
            studentApi.addStudent({
              openId: userInfo.openId,
              nickName: userInfo.nickName,
              gender: userInfo.gender
            }).then(res => {
              let {code, result} = res
              if (code === 0) {
                console.log('添加新用户')
              } else if (code === 1) {
                console.log('用户已存在')
                console.log(result)
                uni.setStorageSync('curClass', result.classes[0])
                uni.switchTab({
                  url: '/pages/home/index'
                })
              }
            })
          } catch (error) {
            console.log(error)
          }
        },
        fail: res => {
          console.log(res)
        }
      })
    }
  }
}
</script>

<style> 
  .wrap {
    padding: 40rpx 0;
  }
  .handle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  } 
  .oauth {
    margin-top: 100rpx;
  }
</style>
