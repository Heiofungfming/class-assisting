<!--
 * @Author: your name
 * @Date: 2021-01-19 21:32:23
 * @LastEditTime: 2021-02-04 11:45:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\pages\self\index.vue
-->
<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">uView ui</view>
				<view class="u-font-14">微信号:helang_uView</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#fff" size="28"></u-icon>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#fff" size="28"></u-icon>
			</view>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item  title="邀请成员">
					<u-icon slot="icon"
					  size="34"
					  name="fenxiangfangshi"
						custom-prefix="custom-icon"
						class="u-m-r-5"></u-icon>
				</u-cell-item>
				<u-cell-item  title="成员管理">
					<u-icon slot="icon"
					  size="34"
					  name="hezuohuobanmiyueguanli"
						custom-prefix="custom-icon"
						class="u-m-r-5"></u-icon>
				</u-cell-item>
				<u-cell-item  title="切换班级">
					<u-icon slot="icon"
					  size="34"
					  name="zhihuan"
						custom-prefix="custom-icon"
						class="u-m-r-5"></u-icon>
				</u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item  title="创建班级">
					<u-icon slot="icon"
					  size="34"
					  name="group"
						custom-prefix="custom-icon"
						class="u-m-r-5"></u-icon>
				</u-cell-item>
				<u-cell-item  title="加入班级">
					<u-icon slot="icon"
					  size="34"
					  name="addpeople"
						custom-prefix="custom-icon"
						class="u-m-r-5"></u-icon>
				</u-cell-item>
				<u-cell-item  title="管理班级">
					<u-icon slot="icon"
					  size="34"
					  name="addressbook"
						custom-prefix="custom-icon"
						class="u-m-r-5"></u-icon>
				</u-cell-item>
				<u-cell-item icon="coupon" title="班级操作记录"></u-cell-item>
				<u-cell-item icon="heart" title="关注"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="content_footer">
      <u-tabbar :list="tabbarList" 
      :mid-button="true"
      active-color="#5677FC"
      inactive-color="#333333"
      :before-switch="switchAdd"></u-tabbar>
    </view>
    <u-action-sheet :list="sheetList" 
      v-model="showAddWork"
      border-radius="20"
      @click="addJob"></u-action-sheet>
	</view>
</template>

<script>
import tabs from '../../components/tabs/tabs' 
import addJobSheetMixins from '../../common/js/addJobSheetMixins'
	export default {
		mixins: [ tabs, addJobSheetMixins ],
		data() {
			return {
				pic: 'https://uviewui.com/common/logo.png',
				tabbarList: []
			}
		},
		onLoad() {
			this.tabbarList = [...this.$store.state.tabbarList]
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #5677FC;
	color: #fff;
}
</style>
