<template>
	<view class="tips-page">
		<view class="feature">
			<view class="header">
				<text>攻略推荐景区</text>
			</view>
			<view class="tips-img" @click="toSceneryDetail(good[0].id)">
				<view class="left">
					<image :src="good[0].img"></image>
					<text>{{good[0].category}}</text>
				</view>
				<view class="right">
					<view class="right1" @click="toSceneryDetail(good[1].id)">
						<image :src="good[1].img"></image>
						<text>{{good[1].category}}</text>
					</view>
					<view class="right2" @click="toSceneryDetail(good[2].id)">
						<image :src="good[2].img"></image>
						<text>{{good[2].category}}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="theme">
			<view class="theme-title">
				<text style="letter-spacing: 3rpx; font-size: 42rpx; font-weight: 600;">周边酒店</text>
				<text style="font-size: 30rpx; margin-left: 28rpx;">发现一万种主题</text>
				<view class="more" @click="toStay">
					<text>更多</text>
					<text class="iconfont icon-dayuhao"></text>
				</view>
			</view>
			<view class="content" >
				<view class="content-list" v-for="item in stay" :key="item.id" @click="toStay(item.id)">
					<image :src="item.accommodationImg"></image>
					<view class="introduce">
						<text>{{item.advantage}}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="recommend">
			<view class="recommend-title">
				<text class="iconfont icon-youjiantou"></text>
				<text>攻略详情</text>
				<text class="iconfont icon-zuojiantou"></text>
			</view>
			<view class="recommend-content">
				<view class="list" @click="toTipDetail(item.id)" v-for="item in tips" :key="item.id">
					<view class="title">
						<text>{{item.title}}</text>
					</view>
					<view class="user">
						<view class="img">
							<image :src="item.useravatar"></image>
						</view>
						<text class="name">{{item.nickname}}</text>
					</view>
					<view class="bottom">
						<image :src="item.img1"></image>
						<image :src="item.img2"></image>
						<image :src="item.img3"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { tips, goodScenery, goodStay } from '../../utils/api.js'
export default {
	data () {
		return {
			tips: [],
			good: [],
			stay: [],
		}
	},
	onLoad () {
		this.getTips();
		this.getGood();
		this.getGoodStay();
	},
	methods: {
		toStay (id) {
			uni.navigateTo({
				url: './stayDetail?fid='+id
			})
		},
		getTips () {
			tips().then((res) => {
				this.tips = res.data.strategyList.slice(0, 16)
			})
		},
		toTipDetail (id) {
			uni.navigateTo({
				url: '/pages/index/tipsDetail?id=' + id
			})
		},
		getGood () {
			goodScenery().then((res) => {
				let data = this.getArrayItems(res.data.sceneryList, 3)
				this.good = data
			})
		},
		getGoodStay () {
			goodStay().then((res) => {
				let data = this.getArrayItems(res.data.accommodationList, 6)
				this.stay = data
			})
		},
		toSceneryDetail (id) {
			uni.navigateTo({
				url: '/pages/index/sceneryDetail?fid=' + id
			})
		},



		getArrayItems (arr, num) {
			var temp_array = new Array();
			for (var index in arr) {
				temp_array.push(arr[index]);
			}
			var return_array = new Array();
			for (var i = 0; i < num; i++) {
				if (temp_array.length > 0) {
					var arrIndex = Math.floor(Math.random() * temp_array.length);
					return_array[i] = temp_array[arrIndex];
					temp_array.splice(arrIndex, 1);
				} else {
					break;
				}
			}
			return return_array;
		}
	}
}
</script>

<style scoped>
.header {
	height: 90rpx;
}

.header text {
	line-height: 90rpx;
	margin-left: 22rpx;
	font-size: 40rpx;
}

.tips-img {
	display: flex;
	width: 95%;
	height: 440rpx;
	margin: 2rpx auto;
}

.left {
	width: 51%;
	height: 440rpx;
	position: relative;
}

.left text {
	font-size: 36rpx;
}

.left image {
	width: 100%;
	height: 100%;
	border-radius: 18rpx;
	image-rendering: -moz-crisp-edges;
	image-rendering: -o-crisp-edges;
	image-rendering: -webkit-optimize-contrast;
	image-rendering: crisp-edges;
	-ms-interpolation-mode: nearest-neighbor;
}

.right {
	width: 48%;
	height: 440rpx;
	margin-left: 22rpx;
}

.right text {
	font-size: 30rpx;
}

.right1 {
	height: 48%;
	position: relative;
}

.right2 {
	height: 48%;
	position: relative;
	margin-top: 18rpx;
}

.right image {
	width: 100%;
	height: 100%;
	border-radius: 15rpx;
	image-rendering: -moz-crisp-edges;
	image-rendering: -o-crisp-edges;
	image-rendering: -webkit-optimize-contrast;
	image-rendering: crisp-edges;
	-ms-interpolation-mode: nearest-neighbor;
}

.tips-img text {
	position: absolute;
	bottom: 20rpx;
	left: 20rpx;
	color: #FFFFFF;
}


.theme {
	margin-top: 35rpx;
	font-family: "宋体";
	border-bottom: 10rpx solid #eaeaea;
}

.theme-title {
	margin-left: 24rpx;
}

.more {
	float: right;
	margin-right: 10rpx;
	font-size: 30rpx;
	font-weight: 550;
	letter-spacing: 8rpx;
	margin-top: 12rpx;
}

.more .iconfont {
	font-size: 30rpx;
	font-weight: 600;
}

.content {
	margin-top: 20rpx;
	text-align: center;
	white-space: nowrap;
	overflow-x: auto;
	overflow-y: hidden;
	margin-bottom: 40rpx;
}

.content-list {
	height: 300rpx;
	width: 42%;
	position: relative;
	display: inline-block;
	margin: 0 10rpx;
}

.content-list image {
	width: 100%;
	height: 100%;
	border-radius: 10rpx;
	margin-left: 10rpx;
	margin-right: 15rpx;
	image-rendering: -moz-crisp-edges;
	image-rendering: -o-crisp-edges;
	image-rendering: -webkit-optimize-contrast;
	image-rendering: crisp-edges;
	-ms-interpolation-mode: nearest-neighbor;
}

.introduce {
	width: 90%;
	height: 70rpx;
	position: absolute;
	bottom: 25rpx;
	left: 25rpx;
	color: #FFFFFF;
	font-size: 32rpx;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	text-overflow: ellipsis;
	white-space: normal;
}


.recommend-title {
	width: 100%;
	text-align: center;
	font-size: 36rpx;
	margin-top: 30rpx;
}

.recommend-title .iconfont {
	margin: 16rpx;
	color: #55aaff;
	font-size: 40rpx;
}

.list {
	width: 100%;
	margin: 45rpx auto;
	padding-bottom: 12rpx;
	border-bottom: 2rpx solid #d8d8d8;
}

.list .title {
	font-size: 34rpx;
	margin-left: 20rpx;
}

.user {
	margin-top: 16rpx;
	display: flex;
	margin-left: 25rpx;
}

.img {
	width: 45rpx;
	height: 45rpx;
}

.img image {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	image-rendering: -moz-crisp-edges;
	image-rendering: -o-crisp-edges;
	image-rendering: -webkit-optimize-contrast;
	image-rendering: crisp-edges;
	-ms-interpolation-mode: nearest-neighbor;
}

.user .name {
	font-size: 28rpx;
	color: #6b6b6b;
	margin-left: 20rpx;
}

.bottom {
	width: 95%;
	display: flex;
	margin: 22rpx auto;
}

.bottom image {
	width: 32%;
	height: 180rpx;
	border-radius: 6rpx;
	margin: 0 6rpx;
	image-rendering: -moz-crisp-edges;
	image-rendering: -o-crisp-edges;
	image-rendering: -webkit-optimize-contrast;
	image-rendering: crisp-edges;
	-ms-interpolation-mode: nearest-neighbor;
}
</style>
