<!--
 * @Author: your name
 * @Date: 2021-01-19 21:32:23
 * @LastEditTime: 2021-05-05 17:22:43
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
				<u-cell-item  title="切换班级" @click="showClassPicker = true">
					<u-icon slot="icon"
					  size="34"
					  name="zhihuan"
						custom-prefix="custom-icon"
						class="u-m-r-5"></u-icon>
				</u-cell-item>
			</u-cell-group>
		</view>

		<u-picker mode="selector"
		 	v-model="showClassPicker"
		  :default-selector="classPickerDefault"
			:range="classNameList"
			@confirm="selectClassName"></u-picker>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item  title="创建班级" @click="addClass">
					<u-icon slot="icon"
					  size="34"
					  name="group"
						custom-prefix="custom-icon"
						class="u-m-r-5"></u-icon>
				</u-cell-item>
				<u-cell-item  title="加入班级" @click="joinClass">
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
				<u-cell-item icon="coupon" title="班级操作记录" @click="testSubcribeMsg"></u-cell-item>
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
import {studentApi} from '@/api/api'
	export default {
		mixins: [ tabs, addJobSheetMixins ],
		data() {
			return {
				openId: '',
				className: '',
				pic: 'https://uviewui.com/common/logo.png',
				tabbarList: [],
				showClassPicker: false,
				classNameList: []
			}
		},
		computed: {
			classPickerDefault() {
				let index = this.classNameList.indexOf(this.className)
				return [index]
			}
		},
		watch: {
			
		},
		onLoad() {
			this.tabbarList = [...this.$store.state.tabbarList]

			this.openId = uni.getStorageSync('openId')

			this.className = uni.getStorageSync('curClass')

			this.getClassNameList()
		},
		methods: {
			testSubcribeMsg() {
				console.log('订阅消息')
				// uni.requestSubscribeMessage({
				// 	tmplIds: ['UN7tn9YOU4iHha1TvaLTOWodeDw6-L_cvKtn6c6qA7k'],
				// 	success (res) { 
				// 		console.log(res)
				// 	}
				// })
				const openId =  uni.getStorageSync('openId')
				const accessToken =  uni.getStorageSync('accessToken')
				// console.log(openId, accessToken)
				uni.request({
					url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + accessToken,
					method: 'POST',
					data: {
						touser: openId,
						template_id: 'UN7tn9YOU4iHha1TvaLTOWodeDw6-L_cvKtn6c6qA7k',
						data: {
							thing1: {
								value: '完成第一章课后联系题'
							},
							thing2: {
								value: '栈'
							},
							time3: {
								value: '2021-04-30 24:00'
							},
							thing4: {
								value: 'fungming'
							}
						}
					},
					success: function(res) {
						console.log(res, '订阅请求')
					}
				})
			},
			joinClass() {
				uni.navigateTo({
					url: '/pages/class/joinClass'
				})
			},
			addClass() {
				uni.navigateTo({
					url: '/pages/class/addClass'
				})
			},
			getClassNameList() {
				studentApi.getClassesList(this.openId).then(res => {
					let {code, classesList} = res
					if (code === 0) {
						this.classNameList = [...classesList]
					}
				})
			},
			selectClassName(index) {
				let idx = index[0]
				uni.setStorageSync('curClass', this.classNameList[idx])
				this.className = this.classNameList[idx]
			}
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
