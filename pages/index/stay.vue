<template>
	<view class="">
		<view class="header-img">
			<image src="https://pic.tujia.com/upload/resourcespic/day_220211/thumb/202202111841495769_750_250.jpg_.webp"
				mode=""></image>
		</view>
		<view class="new">
			<view class="new-title">
				<text>新品推荐</text> 
			</view>
			<view class="new-img"  @click="goToStayDetail(good.id)">
				<image :src="good.accommodationImg" mode=""></image>
			</view>
			<view class="title">
				<text class="title-name">{{good.title}}</text>
				<view class="bottom">
					<view class="location">
						<text class="iconfont icon-weizhi1"></text>
						<text>{{good.address}}</text>
					</view>
					<view class="">
						<text class="new-price">￥{{good.price}}</text>
						<text style="font-size: 26rpx; color: #808080;">起</text>
					</view>
				</view>
			</view>
		</view>

		<view class="stay">
			<view class="stay-title">
				<text>热门精选</text>
			</view>
			<view class="content">
				<view class="left">
					<view class="left-list" v-for="item in leftStay" :key="item.id"  @click="goToStayDetail(item.id)">
						<view class="img">
							<image :src="item.accommodationImg"></image>
							<text class="iconfont icon-aixin"></text>
						</view>
						<view class="introduce">
							<view class="map">
								<text class="iconfont icon-weizhi"></text>
								<text>{{item.address}}</text>
							</view>
							<view class="content-title">
								<text>{{item.title}}</text>
							</view>
							<view class="bottom">
								<text class="score">{{item.accommodationScore}}分</text>
								<text class="price">￥{{item.price}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="right">
					<view class="right-list" v-for="item in rightStay" :key="item.id"  @click="goToStayDetail(item.id)">
						<view class="img">
							<image :src="item.accommodationImg"></image>
							<text class="iconfont icon-aixin"></text>
						</view>

						<view class="introduce">
							<view class="map">
								<text class="iconfont icon-weizhi"></text>
								<text>{{item.address}}</text>
							</view>
							<view class="content-title">
								<text>近郊邛海景区比拨付民宿优雅大床房</text>
							</view>
							<view class="bottom">
								<text class="score">{{item.accommodationScore}}分</text>
								<text class="price">￥{{item.price}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { goodStay } from '../../utils/api.js'
export default {
	data () {
		return {
			good: [],
			leftStay: [],
			rightStay: []
		}
	},
	onLoad () {
		this.getGood();
		this.getStay();
	},
	methods: {

		//跳转酒店详细页面
		goToStayDetail (id) {
			uni.navigateTo({
				url: '/pages/index/stayDetail?fid=' + id
			})
		},



		getGood () {
			goodStay().then((res) => {
				let data = this.getArrayItems(res.data.accommodationList, 1)
				this.good = data[0]
			})
		},
		getStay () {
			goodStay().then((res) => {
				this.leftStay = res.data.accommodationList.slice(0, 7)
				this.rightStay = res.data.accommodationList.slice(8, 15)
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
.header-img {
	width: 100%;
	height: 240rpx;
}

.header-img image {
	width: 100%;
	height: 100%;
}


.new {
	width: 94%;
	margin: 20rpx auto;
}

.new-title {
	font-size: 36rpx;
	margin-left: 5rpx;
}

.new-img {
	width: 100%;
	height: 360rpx;
	margin-top: 15rpx;
}

.new-img image {
	width: 100%;
	height: 100%;
	border-radius: 16rpx;
	image-rendering: -moz-crisp-edges;
	image-rendering: -o-crisp-edges;
	image-rendering: -webkit-optimize-contrast;
	image-rendering: crisp-edges;
	-ms-interpolation-mode: nearest-neighbor;
}

.new .title {
	font-size: 28rpx;
	margin-top: 10rpx;
}

.title-name {
	margin-left: 15rpx;
	font-size: 30rpx;
	font-weight: 600;
}

.bottom {
	display: flex;
	margin-top: 15rpx;
}

.location {
	width: 70%;
	color: #5b5b5b;
	font-size: 27rpx;
	margin-top: 8rpx;
}

.location .iconfont {
	font-size: 26rpx;
	margin-right: 6rpx;
}

.new-price {
	color: #ff5e49;
	font-size: 33rpx;
}


.stay {
	background-color: #f4f4f4;
	padding-top: 22rpx;
}

.stay-title {
	margin-left: 20rpx;
	font-family: "宋体";
	font-size: 35rpx;
	font-weight: 560;
}

.content {
	width: 98%;
	display: flex;
	margin: 5rpx auto;
}

.left,
.right {
	width: 50%;
	margin: 0 10rpx;
}

.left-list,
.right-list {
	background-color: #FFFFFF;
	margin-top: 26rpx;
	border-radius: 10rpx;
}

.left-list .img {
	width: 100%;
	height: 260rpx;
	position: relative;
}

.right-list .img {
	width: 100%;
	height: 310rpx;
	position: relative;
}

.img image {
	width: 100%;
	height: 100%;
	border-radius: 10rpx 10rpx 0 0;
	image-rendering: -moz-crisp-edges;
	image-rendering: -o-crisp-edges;
	image-rendering: -webkit-optimize-contrast;
	image-rendering: crisp-edges;
	-ms-interpolation-mode: nearest-neighbor;
}

.img .iconfont {
	position: absolute;
	top: 12rpx;
	right: 18rpx;
	font-size: 40rpx;
	color: #f7f7f7;
}

.map text {
	font-size: 20rpx;
	font-family: "宋体";
}

.map .iconfont {
	font-size: 24rpx;
	color: #595959;
	margin-left: 10rpx;
	margin-right: 6rpx;
}

.content-title {
	width: 95%;
	font-size: 27rpx;
	margin-top: 8rpx;
	margin-left: 15rpx;
	font-weight: 600;
}

.bottom {
	margin-top: 6rpx;
	margin-left: 16rpx;
	padding-bottom: 16rpx;
}

.score {
	font-size: 25rpx;
	margin-top: 6rpx;
}

.price {
	font-size: 31rpx;
	color: orange;
	margin-left: 120rpx;
}
</style>
