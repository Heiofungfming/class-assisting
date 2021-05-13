<!--
 * @Author: your name
 * @Date: 2021-01-19 21:32:23
 * @LastEditTime: 2021-05-13 16:25:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\pages\self\index.vue
-->
<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="avatarUrl" size="140" mode="square"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-40 u-p-l-20" :style="{fontWeight: '500'}">{{nickName}}</view>
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
				<u-cell-item  title="邀请成员" open-type="share">
					<u-icon slot="icon"
					  size="34"
					  name="fenxiangfangshi"
						custom-prefix="custom-icon"
						class="u-m-r-5"></u-icon>
				</u-cell-item>
				<u-cell-item  title="成员管理" @click="ManageMember">
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
				<u-cell-item  title="管理班级" @click="manageClass">
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
import {studentApi, classApi} from '@/api/api'
	export default {
		mixins: [ tabs, addJobSheetMixins ],
		data() {
			return {
				openId: '',
				className: '',
				avatarUrl: '',
				nickName: '',
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

			this.getUserInfo()

			this.openId = uni.getStorageSync('openId')

			this.className = uni.getStorageSync('curClass')

			this.getClassNameList()
		},
		onShareAppMessage(res) {
			console.log(res)
			
			if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '同学们快加进来吧~',
				path: '/pages/class/joinClass'
			}
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
				const tokenData =  uni.getStorageSync('tokenData')
				// console.log(openId, accessToken)
				wx.requestSubscribeMessage({
					tmplIds: ['W5Rn8IORPDiFEbkHO6qoeMNL48zv6Em2w1WW1RRdo1w'],
					success (res) {
						uni.request({
							url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + tokenData.accessToken,
							method: 'POST',
							data: {
								touser: openId,
								template_id: 'W5Rn8IORPDiFEbkHO6qoeMNL48zv6Em2w1WW1RRdo1w',
								data: {
									thing1: {
										value: '发送多次订阅信息'
									},
									date2: {
										value: '2021-05-30 24:00'
									},
									thing3: {
										value: '订阅信息'
									},
									name4: {
										value: 'fungming'
									}
								}
							},
							success: function(res) {
								console.log(res, '订阅请求')
							}
						})
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
			},
			async ManageMember() {
				await classApi.isAdminor(this.openId).then(res => {
					if (res.code !== 0) {
						this.$showToast('不是该班级的管理员，不可以使用该功能')
					}else {
						uni.navigateTo({
							url: '/pages/self/memberManage'
						})
					}
				})
			},
			async manageClass() {
				await classApi.isAdminor(this.openId).then(res => {
					if (res.code !== 0) {
						this.$showToast('不是该班级的管理员，不可以使用该功能')
					}else {
						uni.navigateTo({
							url: '/pages/self/classManage'
						})
					}
				})
			},
			getUserInfo() {
				let info = uni.getStorageSync('userInfo')
				this.avatarUrl = info.avatarUrl
				this.nickName = info.nickName
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
