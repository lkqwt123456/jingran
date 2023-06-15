<template>
	<view class="my-page">
		<view class="header">
			<view class="header-title">
				<text>个人中心</text>
			</view>
			<view class="header-content">
				<view class="avatar">

					<image :src="user.avatar" @click="trunImg" mode=""></image>
					<!-- <image :src="user.avatar" @click="trunImg">{{user.avatar}}</image> -->
				</view>
				<view class="user">
					<view class="" v-if="isShowText">
						<text class="username">{{user.username}}</text>
						<text class="change" @click="clickisShowText">
							<text class="iconfont icon-xiugai1"></text>
							<text class="change-title">修改</text>
						</text>
					</view>
					<input v-if="!isShowText"  type="text" class="changeUsername" @blur="clickisShowText" v-model="newName" :placeholder="user.username"/>
				</view>
			</view>
		</view>

		<view class="myServe">
			<view class="title">
				<text>我的服务</text>
			</view>
			<view class="nav-content">
				<view class="list" @click="toContact">
					<view>
						<text class="iconfont icon-lianxiren"></text>
					</view>
					<text>联系我们</text>
				</view>
				<view class="list" @click="toFixPass">
					<view>
						<text class="iconfont icon-xiugai"></text>
					</view>
					<text>修改密码</text>
				</view>
				<view class="list" @click="toAbout">
					<view>
						<text class="iconfont icon-guanyuwomen"></text>
					</view>
					<text>关于景冉</text>
				</view>
				<navigator class="list" url="/pages/index/collect">
					<view>
						<text class="iconfont icon-tongzhifill"></text>
					</view>
					<text>我的收藏</text>
				</navigator>
			</view>
		</view>

		<view class="scenery-content">
			<view class="title">
				<text>精选推荐</text>
			</view>
			<view class="scenery">
				<view class="scenery-left">
					<view class="left-list" @click="toSceneryDetail(item.id)" v-for="item in leftScenery"
						:key="item.id">
						<image :src="item.img"></image>
						<view class="line">
							<p class="name">{{item.title}}</p>
							<view class="tags">
								<text class="score">{{item.score}}分</text>
								<text class="price">￥{{item.price}}</text>起
							</view>
							<view class="category">
								<text>{{item.category}}</text>
							</view>
							<view class="bottom">
								<view class="location">
									<text class="iconfont icon-weizhi1"></text>
									<text>{{item.location}}</text>
								</view>
								<view class="browse">
									<text class="iconfont icon-liulan"></text>
									<text class="num">{{item.viewCount}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="scenery-right">
					<view class="right-list" @click="toSceneryDetail(item.id)" v-for="item in rightScenery"
						:key="item.id">
						<image :src="item.img"></image>
						<view class="line">
							<p class="name">{{item.title}}</p>
							<view class="tags">
								<text class="score">{{item.score}}分</text>
								<text class="price">￥{{item.price}}</text>起
							</view>
							<view class="category">
								<text>{{item.category}}</text>
							</view>
							<view class="bottom">
								<view class="location">
									<text class="iconfont icon-weizhi1"></text>
									<text>{{item.location}}</text>
								</view>
								<view class="browse">
									<text class="iconfont icon-liulan"></text>
									<text class="num">{{item.viewCount}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		changeImg,
		goodScenery,
		userInfo,
		updateUser,
		updateUserName
	} from '../../utils/api.js'
	export default {
		data() {
			return {
				leftScenery: [],
				rightScenery: [],
				user: {},
				sourceType: ['camera', 'album'],
				tempFilePaths: '',
				auth: '',
				file: '',
				newPic: '',
				isShowText: true,
				newName:''
			}
		},
		onLoad() {
			this.getGoodScenery();
			this.getUserInfo();
		},
		methods: {
			//修改密码
			toFixPass() {
				uni.navigateTo({
					url: './fixpass'
				})
			},


			getGoodScenery() {
				goodScenery().then((res) => {
					this.leftScenery = res.data.sceneryList.slice(0, 4)
					this.rightScenery = res.data.sceneryList.slice(4, 8)
				})
			},
			toContact() {
				uni.navigateTo({
					url: './contact'
				})
			},
			toAbout() {
				uni.navigateTo({
					url: './about'
				})
			},
			toSceneryDetail(id) {
				uni.navigateTo({
					url: '/pages/index/sceneryDetail?fid=' + id
				})
			},
			getUserInfo() {
				userInfo().then((res) => {
					this.user = res.data.user
				})
			},
			trunImg() {
				var that = this;
				uni.showActionSheet({
					itemList: ['拍照', '相册'],
					success: function(res) {
						var type = that.sourceType[res.tapIndex]
						if (!res.cancel) {
							uni.chooseImage({
								count: 1, //默认9
								sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: [type], //从相册选择
								success: function(res) {
									that.tempFilePaths = res.tempFilePaths
									that.chooseImg()
								}
							});
						}
					},
				});
			},

			chooseImg() {
				uni.uploadFile({ //该上传仅为示例,可根据自己业务修改或封装,注意:统一上传可能会导致服务器压力过大
					url: 'http://www.dqstudy.work:10001/user/changeImg', //仅为示例，非真实的接口地址
					filePath: this.tempFilePaths[0],
					name: 'file',
					formData: {
						auth: wx.getStorageSync('auth')
					},
					success: (uploadFileRes) => {
						let user_NEW = JSON.parse(uploadFileRes.data).data;
						this.$set(this.user, 'avatar', user_NEW.avatar)
						uni.showToast({
							icon: 'none',
							title: "头像加载中~"
						})
					},
					fail: (e) => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: "发布失败,请检查网络"
						})
					}
				});

			},
			clickisShowText() {
				this.isShowText = !this.isShowText
				if(this.isShowText==true){
					let data = {
						"userId":this.user.id,
						"userName":(this.newName==''?this.user.username:this.newName) 
					}
					updateUserName(data).then((res)=>{
						this.$set(this.user, 'username', res.data.userName)
					})
				}
				 
			}
		}
	}
</script>

<style scoped>
	.header {
		width: 100%;
		background-image: url(https://m.youxiake.com/img/img17.e30088ce.png);
		background-size: 100% 100%;
		height: 320rpx;
		position: absolute;
		top: 0;
	}

	.header-title {
		margin-top: 65rpx;
		text-align: center;
		font-family: "宋体";
		font-weight: 600;
		font-size: 32rpx;
	}

	.header-content {
		display: flex;
		margin-left: 20rpx;
		margin-top: 16rpx;
	}

	.avatar {
		width: 120rpx;
		height: 120rpx;
	}

	.avatar image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		image-rendering: -moz-crisp-edges;
		image-rendering: -o-crisp-edges;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges;
		-ms-interpolation-mode: nearest-neighbor;
	}

	.header-content .user {
		height: 120rpx;
		margin-left: 30rpx;
		line-height: 120rpx;
	}

	.username {
		font-weight: 600;
	}
	.changeUsername{
		padding-top: 34rpx;
	}
	.change {
		margin-left: 50rpx;
		padding-left: 10rpx;
		padding-right: 15rpx;
		background-color: rgba(248, 248, 248, 0.4);
		border-radius: 25rpx;
		justify-content: center;
		text-align: center;
	}

	.change-title {
		font-size: 28rpx;
		margin-left: 4rpx;
	}


	.myServe {
		width: 98%;
		margin: 20rpx auto;
		padding-top: 340rpx;
		height: 280rpx;
		background-color: #FFFFFF;
		border-radius: 0 0 15rpx 15rpx;
		border-bottom: 10rpx solid #f5f5f5;
	}

	.myServe .title {
		font-weight: 700;
		font-family: "宋体";
		font-size: 34rpx;
		border-bottom: 2rpx solid #f0f0f0;
		padding-bottom: 16rpx;
	}

	.myServe .title text {
		margin-left: 20rpx;
	}

	.nav-content {
		display: flex;
		margin-top: 50rpx;
	}

	.list {
		width: 25%;
		text-align: center;
	}

	.list .iconfont {
		color: #FFDD28;
		font-size: 65rpx;
	}

	.list text {
		font-size: 25rpx;
	}



	.scenery-content {}

	.scenery-content .title {
		height: 60rpx;
		font-size: 36rpx;
		font-family: "宋体";
		text-align: center;
		line-height: 60rpx;
	}

	.scenery-content .title::before,
	.scenery-content .title::after {
		content: '--';
		margin: 6rpx;
	}

	.scenery {
		width: 98%;
		margin: 16rpx auto;
		display: flex;
		background-color: #f5f5f5;
	}

	.scenery-left,
	.scenery-right {
		width: 48%;
		margin: 0 10rpx;
	}

	.left-list,
	.right-list {
		background-color: #FFFFFF;
		border-radius: 15rpx;
		margin-bottom: 26rpx;
	}

	.left-list image {
		width: 100%;
		height: 240rpx;
		margin: 0 auto;
		border-radius: 16rpx 16rpx 0 0;
		image-rendering: -moz-crisp-edges;
		image-rendering: -o-crisp-edges;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges;
		-ms-interpolation-mode: nearest-neighbor;
	}

	.right-list image {
		width: 100%;
		height: 240rpx;
		margin: 0 auto;
		border-radius: 16rpx 16rpx 0 0;
		image-rendering: -moz-crisp-edges;
		image-rendering: -o-crisp-edges;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges;
		-ms-interpolation-mode: nearest-neighbor;
	}

	.line {
		margin-left: 15rpx;
	}

	.name {
		font-weight: 650;
	}

	.tags {
		font-size: 25rpx;
		margin-top: 10rpx;
		color: #595959;
	}

	.tags .score {
		color: orange;
	}

	.tags .price {
		margin-left: 30rpx;
		color: red;
		font-size: 30rpx;
	}

	.category text {
		font-size: 25rpx;
		padding: 0 4rpx;
		border: 1rpx soviewd #d5d5d5;
		border-radius: 8rpx;
		text-aviewgn: center;
		margin-top: 4rpx;
	}

	.bottom {
		display: flex;
		margin-top: 14rpx;
		padding-bottom: 16rpx;
	}

	.bottom .location {
		width: 60%;
		font-size: 25rpx;
		color: #686868;
	}

	.location .iconfont {
		font-size: 24rpx;
		margin-right: 6rpx;
	}

	.browse {
		font-size: 24rpx;
		height: 30rpx;
		color: #555555;
		viewne-height: 30rpx;
	}

	.browse .iconfont {
		margin-right: 5rpx;
		position: relative;
	}

	.browse .num {
		position: relative;
		top: -4rpx;
	}
</style>
