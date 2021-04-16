<!--
 * @Author: your name
 * @Date: 2021-04-15 21:25:24
 * @LastEditTime: 2021-04-15 22:08:32
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
	</view>
</template>

<script>
import mixins from '@/common/js/mixins'
export default {
  mixins: [mixins],
  data() {
    return {
      swiperList: [
        {
          image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
          title: '昨夜星辰昨夜风，画楼西畔桂堂东'
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
          title: '身无彩凤双飞翼，心有灵犀一点通'
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
          title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
        }
      ]
    }
  },
  onLoad() {
    uni.request({
      url: 'http://localhost:3000/job/getJobLists',
      method:'GET',
      success: (res) => {
        console.log(res.data, '作业列表')
      }
    })
  //   uni.request({
  //     url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
  //     header: {
  //         'custom-header': 'hello' //自定义请求头信息
  //     },
  //     success: (res) => {
  //         console.log(res.data);
  //         this.text = 'request success';
  //     }
  // });
  },
  methods: {
    addClass() {
      uni.navigateTo({
        url: '/pages/class/addClass'
      })
    },
    joinClass() {
      uni.navigateTo({
        url: '/pages/class/joinClass'
      })
    }
  }
}
</script>

<style>  
  .wrap {
    padding: 40rpx 0;
  }
</style>
