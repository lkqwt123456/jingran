<template>
	<view class="recommend">
		<view class="select">
			<view class="location">
				<text class="title">四川</text>
				<text class="iconfont icon-xiala-xia"></text>
			</view>
			<input type="text" :style="showIndex==true?'':''" @input="getValue" placeholder="请输入搜索内容" placeholder-style="font-size:28rpx;color:black;" />
			<span @click="searchItems()">搜索</span>
		</view>
		<view v-show="showIndex">
			
		<view class="header">
			<view class="banner">
				<swiper class="banner-container" indicator-dots="true" autoplay="true" circular="true" indicator-color="#ffffff"
					indicator-active-color="#e3c321">
					<block v-for="item in banners" :key="item.id">
						<swiper-item>
							<image class="slide-image" :src="item.url">
							</image>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>

		<view class="good">
			<view class="left" @click="toScenerys">
				<image
					src="https://jing-ran-1310347558.cos.ap-chengdu.myqcloud.com/scenery/photo-1664543566141-d3aab2f75ac9.png">
				</image>
				<view class="title1">
					<text>景区推荐</text>
				</view>
				<view class="title2">
					<text>舒适出行</text>
				</view>
			</view>
			<view class="right">
				<view class="right1" @click="toFood">
					<image src="https://youimg1.c-ctrip.com/target/01025120008gpbm005BBB_D_265_265_Q90.jpg?proc=autoorient">
					</image>
					<view class="title1">
						<text>精品美食</text>
					</view>
					<view class="title2">
						<text>美味尝鲜</text>
					</view>
				</view>
				<view class="right2" @click="toStay">
					<image src="http://gallery.youxiake.com/Public/Data/upload/productimg/201904/03/5ca47954d6909.jpg?imageslim">
					</image>
					<view class="title1">
						<text>民宿</text>
					</view>
					<view class="title2">
						<text>休闲旅途</text>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="nav">
				<view @click="navSwitch" data-index="0" class="nav-title">
					<text v-bind:class="[navState==0?'title1':'']">精选景点</text>
				</view>
				<view @click="navSwitch" data-index="1" class="nav-title">
					<text v-bind:class="[navState==1?'title2':'']">特色美食</text>
				</view>
			</view>
			<view class="content">
				<view v-if="navState==0" class="scenery">
					<view class="scenery-left">
						<view class="left-list" v-for="item in leftScenery" @click="toSceneryDetail(item.id)" :key="item.id">
							<image :src="item.img">
							</image>
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
									<view class="location2">
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
						<view class="right-list" v-for="item in rightScenery" @click="toSceneryDetail(item.id)" :key="item.id">
							<image :src="item.img">
							</image>
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
									<view class="location2">
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
				<view v-if="navState==1" class="food">
					<view class="food-left">
						<view class="left-list" v-for="item in leftFood" @click="toSceneryDetail(item.id)" :key="item.id">
							<image :src="item.img">
							</image>
							<view class="line">
								<p class="name">{{item.title}}</p>
								<view class="tags">
									<text class="score">{{item.score}}分</text>
									<text class="food-recommend">{{item.commendPerson}}条点评</text>
									<text class="price">￥{{item.price}}</text>起
								</view>
								<view class="category">
									<text>{{item.features}}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="food-right">
						<view class="right-list" v-for="item in rightFood" @click="toSceneryDetail(item.id)" :key="item.id">
							<image :src="item.img">
							</image>
							<view class="line">
								<p class="name">{{item.title}}</p>
								<view class="tags">
									<text class="score">{{item.score}}分</text>
									<text class="food-recommend">{{item.commendPerson}}条点评</text>
									<text class="price">￥{{item.price}}</text>起
								</view>
								<view class="category">
									<text>{{item.features}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		</view>
		<view v-if="!showIndex" class="mask">
				<view class="scenery1">
					<view class="scenery1-list topDis" @click="toSceneryDetail(item.id)" v-for="item in maskData"
						:key="item.id">
						<view class="scenery1-img">
							<image :src="item.img" mode=""></image>
						</view>
						<view class="content1-line">
							<p class="name1">{{item.title}}</p>
							<view class="tags1">
								<text class="score1">{{item.score}}分</text>
								<text class="price1">￥{{item.price}}</text>起
							</view>
							<view class="category1">
								<text>{{item.category}}</text>
							</view>
							<view class="bottom1">
								<view class="location1">
									<text class="iconfont icon-weizhi1"></text>
									<text>{{item.location}}</text>
								</view>
								<view class="browse11">
									<text class="iconfont icon-liulan"></text>
									<text class="num1">{{item.viewCount}}</text>
								</view>
							</view>
						</view>
					</view>
		
				</view>
			</view>
		
		
	</view>
</template>

<script>
import { food, allScenery,searchItems} from '../../utils/api.js'
export default {
	data () {
		return {
			navState: "0",
			banners: [
				{ id: '1', url: 'https://jing-ran-1310347558.cos.ap-chengdu.myqcloud.com/scenery/1.png' },
				{ id: '2', url: 'https://jing-ran-1310347558.cos.ap-chengdu.myqcloud.com/scenery/2.png' },
				{ id: '3', url: 'https://jing-ran-1310347558.cos.ap-chengdu.myqcloud.com/scenery/3.png' },
				{ id: '4', url: 'https://jing-ran-1310347558.cos.ap-chengdu.myqcloud.com/scenery/4.png' }
			],
			leftScenery: [],
			rightScenery: [],
			leftFood: [],
			rightFood: [],
			showIndex: true,
			input_context: '',
			maskData: []
		}
	},
	onLoad () {
		this.getScenery();
		this.getFood();

	},
	methods: {
		//搜索框
		searchItems() {
			let data = {
				'fuzzyName': this.input_context
			}
			searchItems(data).then((res) => {
				console.log(res);
				this.maskData = res.data.scenerys
					if(res.code==401) {
						uni.showModal({
							content: '内容不能为空',
							showCancel: false
						})
					}else if(res.code==20005) {
						uni.showModal({
								title: '亲~',
								content: '相关内容为空',
								showCancel: false
						})
					}
			})
		},
		
		
		getValue(e) {
			this.input_context = e.detail.value;
			if (this.input_context) {
				this.showIndex = false;
			} else {
				this.showIndex = true //显示
				this.maskData = []
			}
		},
		
		toScenerys () {
			uni.navigateTo({
				url: "./scenery"
			})
		},
		toStay () {
			uni.navigateTo({
				url: "./stay"
			})
		},
		toFood () {
			uni.navigateTo({
				url: "./food"
			})
		},
		getScenery () {
			allScenery().then((res) => {
				this.leftScenery = res.data.sceneryList.slice(0, 9)
				this.rightScenery = res.data.sceneryList.slice(9, 18)
			})
		},
		getFood () {
			food().then((res) => {
				this.leftFood = res.data.FoodsInfo.slice(0, 9)
				this.rightFood = res.data.FoodsInfo.slice(9, 18)
			})
		},

		navSwitch (e) {
			let index = e.currentTarget.dataset.index;
			this.navState = index;
		},

	toSceneryDetail(id){
		let state = this.navState;
		switch(state){
			case "0":{
				uni.navigateTo({
					url:'/pages/index/sceneryDetail?fid='+id
				})
			}	break;
			case "1":{
				uni.navigateTo({
					url:'/pages/index/delicious_food?fid='+id
				})
			}	break;
		}
		
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
	width: 100%;
}

.select {
	width: 100%;
	background-color: #ffdd28;
	display: flex;
	padding-bottom: 25rpx;
	position: fixed;
	top: 0;
	z-index: 100;
}

.select .location {
	margin-left: 22rpx;
	margin-top: 8rpx;
}

.select .title {
	font-size: 30rpx;
}

.select input {
	margin-left: 10rpx;
	background-color: rgba(255, 255, 255, 0.6);
	width: 72%;
	border-radius: 28rpx;
	padding: 1rpx 30rpx;
	font-size: 28rpx;
	height: 54rpx;
}

.select>span {
	display: inline-block;
	width: 100rpx;
	height: 50rpx;
	text-align: center;
	line-height: 60rpx;
}
.banner {
	height: 350rpx;
	width: 100%;
	display: flex;
	flex-direction: row;
	margin-top: 75rpx;
}

.banner-container {
	width: 96%;
	height: 350rpx;
	margin: 0 auto;
}

.slide-image {
	position: absolute;
	height: 100%;
	width: 100%;
	z-index: -5;
	border-radius: 16rpx;
}


.good {
	display: flex;
	width: 100;
	height: 400rpx;
	margin: 0 auto;
	background-color: #FFFFFF;
	padding-top: 26rpx;
}

.left {
	width: 51%;
	height: 370rpx;
	position: relative;
	margin-left: 20rpx;
}

.left image {
	width: 100%;
	height: 100%;
	border-radius: 18rpx;
}

.right {
	width: 48%;
	height: 370rpx;
	margin-left: 22rpx;
	image-rendering: -moz-crisp-edges;
	image-rendering: -o-crisp-edges;
	image-rendering: -webkit-optimize-contrast;
	image-rendering: crisp-edges;
	-ms-interpolation-mode: nearest-neighbor;
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
	width: 95%;
	height: 100%;
	border-radius: 15rpx;
	image-rendering: -moz-crisp-edges;
	image-rendering: -o-crisp-edges;
	image-rendering: -webkit-optimize-contrast;
	image-rendering: crisp-edges;
	-ms-interpolation-mode: nearest-neighbor;
}

.left .title1 {
	position: absolute;
	top: 20rpx;
	left: 28rpx;
	color: #FFFFFF;
	font-size: 38rpx;
	letter-spacing: 3rpx;
}

.left .title2 {
	position: absolute;
	top: 75rpx;
	left: 28rpx;
	color: #FFFFFF;
	font-size: 26rpx;
}

.right .title1 {
	position: absolute;
	top: 20rpx;
	left: 28rpx;
	color: #FFFFFF;
	font-size: 31rpx;
	letter-spacing: 3rpx;
}

.right .title2 {
	position: absolute;
	top: 65rpx;
	left: 28rpx;
	color: #FFFFFF;
	font-size: 24rpx;
}


.footer {
	background-color: #eaeaea;
	padding-top: 15rpx;
}

.nav {
	display: flex;
	margin-top: 20rpx;
	height: 80rpx;
}

.nav-title {
	width: 50%;
	height: 100%;
	line-height: 80rpx;
	text-align: center;
	font-family: "宋体";
	font-weight: 700;
	font-size: 35rpx;
}

.nav-title .title1 {
	background-color: #f5f5f5;
	display: inline-block;
	width: 100%;
	border-radius: 0 20rpx 0 0;
	color: #e8c839;
}

.nav-title .title2 {
	background-color: #f5f5f5;
	display: inline-block;
	width: 100%;

	border-radius: 20rpx 0 0 0;
	color: #e8c839;
}



.scenery,
.food {
	width: 96%;
	margin: 0 auto;
	display: flex;
	padding-top: 25rpx;
}

.scenery-left,
.scenery-right,
.food-left,
.food-right {
	width: 50%;
	margin: 0 12rpx;
}

.left-list,
.right-list {
	background-color: #FFFFFF;
	border-radius: 15rpx;
	margin-bottom: 26rpx;
}

.left-list image {
	width: 100%;
	height: 250rpx;
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
	height: 290rpx;
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

.food .line {
	padding-bottom: 16rpx;
}

.food .tags {
	margin-top: 4rpx;
}

.food .price {
	margin-left: 1rpx;
}

.food-recommend {
	margin-left: 20rpx;
	font-size: 22rpx;
}

.category text {
	font-size: 25rpx;
	padding: 0 4rpx;
	border: 1rpx solid #dedede;
	border-radius: 8rpx;
	text-align: center;
	margin-top: 4rpx;
}

.bottom {
	display: flex;
	margin-top: 14rpx;
	padding-bottom: 16rpx;
}

.location {
	width: 12%;
	font-size: 25rpx;
	color: #686868;
}

.location2 {
	width: 70%;
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
}

.browse .iconfont {
	margin-right: 5rpx;
}

.browse .num {
	position: relative;
	top: -4rpx;
}
.mask {
		position: relative;
		top: 120rpx;
		z-index: 10;
		background-color: #F5F5F5;
		opacity: 0.95;
		border: 0.1rpx solid #fff;
	}
	.topDis {
		margin-top: 35rpx;
	}
	.scenery1-list {
		display: flex;
		width: 95%;
		margin: 5rpx auto;
	}
	
	.scenery1-img {
		width: 38%;
		height: 190rpx;
	}
	
	.scenery1-img image {
		width: 100%;
		height: 100%;
		border-radius: 8rpx;
		image-rendering: -moz-crisp-edges;
		image-rendering: -o-crisp-edges;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges;
		-ms-interpolation-mode: nearest-neighbor;
	}
	
	.content {
		
		background-color: #f5f5f5;
	}
	
	.content1-line {
		margin-top: 8rpx;
		margin-left: 18rpx;
	}
	
	.scenery1-list .name1,
	.scenery1-content .name1 {
		font-weight: 650;
	}
	
	.scenery1-list .tags1,
	.scenery1-content .tags1 {
		font-size: 25rpx;
		margin-top: 8rpx;
		color: #595959;
	}
	
	.scenery1-list .tags1 .score1,
	..scenery1-content .tags1 .score1 {
		color: orange;
	}
	
	.scenery1-list .tags1 .price1,
	.scenery1-content .tags1 .price1 {
		margin-left: 30rpx;
		color: red;
		font-size: 30rpx;
	}
	
	.scenery1-list .category1 text,
	.scenery1-content .category1 text {
		font-size: 25rpx;
		padding: 0 4rpx;
		border: 1rpx solid #d5d5d5;
		border-radius: 8rpx;
		text-align: center;
		margin-top: 4rpx;
	}
	
	.scenery1-list .bottom1 {
		display: flex;
		margin-top: 20rpx;
		padding-bottom: 16rpx;
	}
	
	.scenery1-list .bottom1 .location,
	.scenery1-content .bottom1 .location {
		width: 60%;
		font-size: 25rpx;
		color: #686868;
	}
	
	.scenery1-list .location1 .iconfont,
	.scenery1-content .location1 .iconfont {
		font-size: 24rpx;
		margin-right: 6rpx;
	}
	
	.scenery1-list .browse11 {
		font-size: 24rpx;
		height: 30rpx;
		color: #555555;
		line-height: 30rpx;
		margin-left: 140rpx;
	}
	
	.scenery1-list .browse11 .iconfont {
		margin-right: 6rpx;
		position: relative;
		top: 5rpx;
	}
	
</style>
