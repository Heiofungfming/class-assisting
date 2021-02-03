<!--
 * @Author: your name
 * @Date: 2021-01-19 21:32:23
 * @LastEditTime: 2021-02-03 13:05:17
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \class-assisting\src\App.vue
-->
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "./static/iconfont.css";
  @import "uview-ui/index.scss";
  @import "/src/common/common.scss"
</style>
