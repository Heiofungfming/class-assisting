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
