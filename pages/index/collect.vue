<template>
	<view style="padding-bottom: 100rpx;">
		<view class="footer">
			<view class="nav">
				<view @click="navSwitch" data-index="1" class="nav-title">
					<text v-bind:class="[navState==1?'title1':'']">美食</text>
				</view>
				<view @click="navSwitch" data-index="2" class="nav-title">
					<text v-bind:class="[navState==2?'title2':'']">酒店</text>
				</view>
				<view @click="navSwitch" data-index="3" class="nav-title">
					<text v-bind:class="[navState==3?'title3':'']">风景</text>
				</view>
			</view>
		</view>
		<view class="food" v-if="navState==1" @click="goDetail(item.id)" v-for="item in list" :key="item.id">
			<view class="food-list">
				<view class="food-img">
					<image :src="item.img"></image>
				</view>
				<view class="food-content">
					<view class="title">
						<text>{{item.title}}</text>
					</view>
					<view class="tags">
						<text class="score">{{item.score}}</text>
						<text class="num">{{item.commendPerson}}</text>
						<text class="price">￥{{item.price}}/人</text>
					</view>
					<view class="category">
						<text>{{item.features}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="food" v-if="navState==2" @click="goDetail(item.id)" v-for="item in list" :key="item.id">
			<view class="food-list">
				<view class="food-img">
					<image :src="item.accommodationImg"></image>
				</view>
				<view class="food-content">
					<view class="title">
						<text>{{item.title}}</text>
					</view>
					<view class="tags">
						<text class="score">{{item.accommodationScore.toFixed(1)}}分</text>
						<text class="num">999+</text>
						<text class="price">￥{{item.price}}/人</text>
					</view>
					<view class="category">
						<text>干净.整洁</text>
					</view>
				</view>
			</view>
		</view>
		<view class="food" v-if="navState==3" @click="goDetail(item.id)" v-for="item in list" :key="item.id">
			<view class="food-list">
				<view class="food-img">
					<image :src="item.img"></image>
				</view>
				<view class="food-content">
					<view class="title">
						<text>{{item.title}}</text>
					</view>
					<view class="tags">
						<text class="score">{{item.score}}</text>
						<text class="num">点赞：{{item.viewCount}}人</text>
						<text class="price">￥{{item.price}}/人</text>
					</view>
					<view class="category">
						<text>{{item.category}}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-show="bottom" class="bottom">
			<text>已经全部加载~</text>
		</view>
	</view>
</template>




<script>
	import {
		userInfo,
		getCollect,
		login
	} from '../../utils/api.js'
	export default {
		data() {
			return {
				bottom: false,
				navState: 1,
				id: '',
				list: [],
				
			}
		},
			
		onShow() {
			this.getUserInof();
			setTimeout(this.getMyCollect, 500)
		},
		methods: {
			// 获取后端传来的收藏数据
			
			getMyCollect() {
				this.list = [];
				getCollect(this.id, this.navState).then((res) => {
					if(res.data.foods){
						this.list = res.data.foods;
					}
					if(res.data.accommodations){
						this.list = res.data.accommodations;
					}
					if(res.data.scenerys){
						this.list = res.data.scenerys;
					}

				})
			},
			// 触底显示加载全部的盒子
			onReachBottom() {
				this.bottom = true
				setTimeout(this.hideShow, 2000)
			},
			// 2s后,自动隐藏加载全部的盒子
			hideShow() {
				this.bottom = false
			},
			goDetail(e) {
				var state = this.navState;
				if (this.navState == 1) {
					uni.navigateTo({
						url: './delicious_food?fid='+e+'&state='+state,
					});
				} else if (this.navState == 2) {
					uni.navigateTo({
						url: './stayDetail?fid='+e+'&state='+state,
					});
				} else if (this.navState == 3) {
					uni.navigateTo({
						url: './sceneryDetail?fid='+e+'&state='+state,
					});
				}
			},
			// 获取用户信息
			getUserInof() {
				userInfo().then((res) => {
					this.id = res.data.user.id
				})
			},
			navSwitch(e) {
				let index = e.currentTarget.dataset.index;
				this.navState = index;
				this.getMyCollect()
			},
		}
	}
</script>



<style>
.food {
		width: 94%;
		margin: 0 auto;
	}

	.food-list {
		display: flex;
		width: 100%;
		height: 180rpx;
		margin-top: 28rpx;
	}

	.food-img {
		flex: 2;
		height: 100%;
		margin-right: 20rpx;
	}

	.food-img image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}

	.food-content {
		display: flex;
		flex-direction: column;
		flex: 3;
		height: 85%;
	}

	.food-content .title {
		height: 65rpx;
		width: 100%;
		font-size: 35rpx;
		margin-top: 10rpx;
		font-weight: 600;
		font-family: "宋体";
	}

	.tags {
		margin: 6rpx 0;
	}

	.score {
		font-size: 28rpx;
		color: #ff4939;
		font-family: "宋体";
		margin-left: 6rpx;
	}

	.num {
		font-size: 23rpx;
		margin: 0 16rpx;
		color: #585858;
		border-left: 5rpx solid #d4d4d4;
		padding-left: 16rpx;
		padding-right: 16rpx;
		height: 4rpx;
		border-right: 5rpx solid #cbcbcb;
	}

	.price {
		font-size: 26rpx;
		color: #555555;
	}

	.category {
		margin-top: 22rpx;
		font-size: 24rpx;
		letter-spacing: 2rpx;
		margin-left: 4rpx;
	}

	.category text {
		background-color: rgba(255, 0, 0, 0.1);
		color: #e80000;
		padding: 5rpx 7rpx;
		font-family: "宋体";
		border-radius: 6rpx;
	}	.bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 80rpx;
		background-color: #c4cbcf;
		line-height: 80rpx;
		text-align: center;
		opacity: .5;
	}

	.nav {
		display: flex;
		height: 70rpx;
		margin-bottom: 20rpx;
	}

	.nav-title {
		padding-left: 30rpx;
		width: 20%;
		line-height: 70rpx;

	}

	.nav-title .title1,
	.nav-title .title2,
	.nav-title .title3 {
		border-bottom: 6rpx solid #ffbf00;
		font-size: 35rpx;
		font-weight: 600;
		color: orange;
	}

	.footer {
		margin-top: 40rpx;
	}
</style>

