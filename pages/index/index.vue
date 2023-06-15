<template>
	<view class="content">
		<view :class="showIndex==true?'header':'headerMask'">
			<view :class="showIndex==true?'search':'pos'">
				<input type="text" :style="showIndex==true?'':'border: #ffaa00 2px solid;'" @input="getValue"
					placeholder="请输入目的地/景点" placeholder-style="font-size:28rpx;color:black;" />
				<span @click="searchItems()">搜索</span>
			</view>
		</view>
		<view v-show="showIndex">
			<view class="banner">
				<swiper class="banner-container" indicator-dots="true" autoplay="true" circular="true"
					indicator-color="#ffffff" indicator-active-color="#e3c321">
					<block v-for="item in banners" :key="item.id">
						<swiper-item>
							<image class="slide-image" :src="item.img">
							</image>
						</swiper-item>
					</block>
				</swiper>
			</view>

			<view class="CenterService">
				<view class="center" @click="toTips">
					<view class="icon">
						<text class="iconfont icon-lianxi2hebing_gonglve" style="color:#38d5d5 ;"></text>
					</view>
					<text class="more">攻略</text>
				</view>
				<view class="center" @click="toScenry">
					<view class="icon">
						<text class="iconfont icon-jingdian" style="color:#ffaa00 ;"></text>
					</view>
					<text class="more">景区</text>
				</view>
				<view class="center" @click="toFood">
					<view class="icon">
						<text class="iconfont icon-meishi1" style="color:#ff5500 ;font-size: 75rpx;"></text>
					</view>
					<text class="more" style="margin-top: -1rpx;">美食</text>
				</view>
				<view class="center" @click="toStay">
					<view class="icon">
						<text class="iconfont icon-jiudian" style="color:#55aaff ;"></text>
					</view>
					<text class="more">酒店民宿</text>
				</view>
				<view class="center" @click="toForum">
					<view class="icon">
						<text class="iconfont icon-141" style="color:#58ca5e ;"></text>
					</view>
					<text class="more">论坛</text>
				</view>
			</view>

			<view class="recommend-img">
				<image src="https://qimg4.youxiake.com/upload/202209/21/ae91f1184b71d14d.gif" mode=""></image>
			</view>

			<view class="footer">
				<view class="nav">
					<view @click="navSwitch" data-index="0" class="nav-title">
						<text v-bind:class="[navState==0?'title1':'']">怎么玩</text>
					</view>
					<view @click="navSwitch" data-index="1" class="nav-title">
						<text v-bind:class="[navState==1?'title2':'']">住哪里</text>
					</view>
					<view @click="navSwitch" data-index="2" class="nav-title">
						<text v-bind:class="[navState==2?'title3':'']">吃什么</text>
					</view>
				</view>

				<view class="content">
					<view v-if="navState==0" class="scenery">
						<view class="scenery-list" @click="toSceneryDetail(0,item.id)" v-for="item in recommend"
							:key="item.id">
							<view class="scenery-img">
								<image :src="item.img" mode=""></image>
							</view>
							<view class="content-line">
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
									<view class="browse1">
										<text class="iconfont icon-liulan"></text>
										<text class="num">{{item.viewCount}}</text>
									</view>
								</view>
							</view>
						</view>

						<view class="all" @click="toScenerys">
							<text class="more-title">查看全部</text>
							<text class="iconfont icon-dayuhao"></text>
						</view>
					</view>
					<view v-if="navState==1" class="stay">
						<view class="stay-list" v-for="item in stay" @click="toSceneryDetail(1,item.id)" :key="item.id">
							<view class="stay-img">
								<image :src="item.accommodationImg" mode=""></image>
							</view>
							<view class="stay-content">
								<p class="name">{{item.title}}</p>
								<view class="tags">
									<text class="score">{{item.accommodationScore}}分</text>
									<text class="price">￥{{item.price}}</text>
									<text style="font-size: 26rpx;">起</text>
								</view>
								<view class="bottom">
									<view class="location">
										<text class="iconfont icon-weizhi1"></text>
										<text>{{item.address}}</text>
									</view>
								</view>
							</view>
						</view>


						<view class="all" @click="toStays">
							<text class="more-title">查看全部</text>
							<text class="iconfont icon-dayuhao"></text>
						</view>
					</view>
					<view v-if="navState==2" class="food">
						<view class="food-list" v-for="item in foods" @click="toSceneryDetail(2,item.id)"
							:key="item.id">
							<view class="food-img">
								<image :src="item.img"></image>
							</view>
							<view class="food-content">
								<view class="title">
									<text>{{item.title}}</text>
								</view>
								<view class="tags">
									<text class="score">{{item.score}}分</text>
									<text class="num">{{item.commendPerson}}条点评</text>
									<text class="price">{{item.price}}/人</text>
								</view>
								<view class="category">
									<text>{{item.features}}</text>
								</view>
							</view>
						</view>

						<view class="all" @click="toFoods">
							<text class="more-title">查看全部</text>
							<text class="iconfont icon-dayuhao"></text>
						</view>
					</view>
				</view>
			</view>

			<view class="scenery-content">
				<view class="title">
					<text>精选旅行地</text>
				</view>
				<view class="scenery">
					<view class="scenery-left">
						<view class="left-list" @click="toSceneryDetail(0,item.id)" v-for="item in leftScenery"
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
									<view class="browse2">
										<text class="iconfont icon-liulan"></text>
										<text class="num">{{item.viewCount}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="scenery-right">
						<view class="right-list" @click="toSceneryDetail(0,item.id)" v-for="item in rightScenery"
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
									<view class="browse2">
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
		<view v-if="!showIndex" class="mask">
			<view class="scenery">
				<view class="scenery-list topDis" @click="toSceneryDetail(0,item.id)" v-for="item in maskData"
					:key="item.id">
					<view class="scenery-img">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="content-line">
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
							<view class="browse1">
								<text class="iconfont icon-liulan"></text>
								<text class="num">{{item.viewCount}}</text>
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
		allScenery,
		banner,
		goodFood,
		goodStay,
		searchItems
	} from '../../utils/api.js'
	export default {
		data() {
			return {
				showIndex: true,
				input_context: '',
				currentIndex: 0,
				navState: 0,
				banners: [],
				leftScenery: [],
				rightScenery: [],
				recommend: [],
				stay: [],
				foods: [],
				maskData: []
			};
		},
		onLoad() {
			this.getBanner();
			this.getAllScenery();
			this.getGoodStay();
			this.getGoodFood();
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

			toTips() {
				uni.navigateTo({
					url: "./tips",
				});
			},
			toScenry() {
				uni.navigateTo({
					url: "./scenery",
				});
			},
			toFood() {
				uni.navigateTo({
					url: "./food"
				})
			},
			toStay() {
				uni.navigateTo({
					url: "./stay"
				})
			},
			toForum() {
				uni.navigateTo({
					url: "./forum",
				});
			},
			toScenerys() {
				uni.navigateTo({
					url: "./scenery"
				})
			},
			toStays() {
				uni.navigateTo({
					url: "./stay"
				})
			},
			toFoods() {
				uni.navigateTo({
					url: "./food"
				})
			},
			cIndex(e) {
				this.currentIndex = e.detail.current
			},
			navSwitch(e) {
				let index = e.currentTarget.dataset.index;
				this.navState = index;
			},
			getBanner() {
				banner().then((res) => {
					this.banners = res.data.bannerList
				})
			},
			getAllScenery() {
				allScenery().then((res) => {
					let data = this.getArrayItems(res.data.sceneryList, 3)
					this.recommend = data
					this.leftScenery = res.data.sceneryList.slice(4, 11);
					this.rightScenery = res.data.sceneryList.slice(12, 18);
				})
			},
			getGoodStay() {
				goodStay().then((res) => {
					let data = this.getArrayItems(res.data.accommodationList, 3)
					this.stay = data
				})
			},
			getGoodFood() {
				goodFood().then((res) => {
					let data = this.getArrayItems(res.data.FoodsInfo, 3)
					this.foods = data
				})
			},
			toSceneryDetail(state, id) {
				switch (state) {
					case 0: {
						uni.navigateTo({
							url: '/pages/index/sceneryDetail?fid=' + id
						})
					}
					break;
				case 1: {
					uni.navigateTo({
						url: '/pages/index/stayDetail?fid=' + id
					})
				}
				break;
				case 2: {
					uni.navigateTo({
						url: '/pages/index/delicious_food?fid=' + id
					})
				}
				break;
				}

			},

			getArrayItems(arr, num) {
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
		},
	};
</script>

<style scoped>
	page {
		background-color: rgba(204, 204, 204, 0.3);
	}

	.header {
		height: 430rpx;
		width: 100%;
		position: absolute;
		top: 0;
		background: url(https://dimg04.c-ctrip.com/images/0301r120009xigt9rBDB8_Q80.png);
		border-radius: 0 0 40rpx 40rpx;
	}


	.search {
		display: flex;
		justify-content: space-between;
		margin-top: 72rpx;
	}

	.search span {
		float: right;
		margin-right: 28rpx;
		line-height: 56rpx;
		font-size: 28rpx;
		background-color: #FBAB7E;
		background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
		border-radius: 14rpx;
		padding: 0 10rpx;
		color: #ffffff;
	}

	.search input,
	.searchMask input {
		width: 75%;
		/* margin-top: 10rpx; */
		margin-left: 30rpx;
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: 28rpx;
		padding-left: 30rpx;
		height: 56rpx;
		font-size: 28rpx;
	}

	.pos {
		position: fixed;
		display: flex;
		width: 100%;
		height: 196rpx;
		align-items: center;
		justify-content: space-between;
		z-index: 999;
		/* margin-top: 64rpx; */
		background-color: #f5f5f5;
	}

	.pos>span {
		float: right;
		margin-right: 28rpx;
		line-height: 56rpx;
		font-size: 28rpx;
		background-color: #FBAB7E;
		background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
		border-radius: 31%;
		padding: 0 10rpx;
		color: #ffffff;
	}

	.pos>input {
		width: 75%;
		/* margin-top: 10rpx; */
		margin-left: 30rpx;
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: 28rpx;
		padding-left: 30rpx;
		height: 56rpx;
		font-size: 28rpx;
	}

	.banner {
		height: 350rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		margin-top: 140rpx;
	}

	.banner-container {
		width: 94%;
		height: 350rpx;
		margin: 0 auto;
	}

	.slide-image {
		position: absolute;
		height: 100%;
		width: 100%;
		z-index: -5;
		border-radius: 20rpx;
	}


	.CenterService {
		width: 100%;
		display: flex;
		margin: 0 auto;
		background-color: #f8f8f8;
		margin-top: 20rpx;
	}

	.center {
		display: flex;
		flex-direction: column;
		text-align: center;
		width: 20%;
		margin-bottom: 10rpx;
		margin-top: 10rpx;
	}

	.icon {
		margin-top: 12rpx;
	}

	.icon .iconfont {
		font-size: 66rpx;
	}

	.more {
		font-size: 27rpx;
		margin-top: 5rpx;
		padding-bottom: 8rpx;
		letter-spacing: 4rpx;
		margin-left: 5rpx;
	}

	.recommend-img {
		width: 100%;
		height: 200rpx;
		margin-top: 20rpx;
	}

	.recommend-img image {
		width: 100%;
		height: 100%;
	}


	.footer {
		margin-top: 40rpx;
	}

	.nav {
		display: flex;
		height: 70rpx;
		margin-left: 20rpx;
	}

	.nav-title {
		width: 26%;
	}

	.nav-title .title1,
	.nav-title .title2,
	.nav-title .title3 {
		border-bottom: 6rpx solid #ffbf00;
		font-size: 35rpx;
		font-weight: 600;
		color: orange;
	}

	.scenery-list {
		display: flex;
		width: 95%;
		margin: 5rpx auto;
	}

	.scenery-img {
		width: 38%;
		height: 190rpx;
	}

	.scenery-img image {
		width: 100%;
		height: 100%;
		border-radius: 8rpx;
		image-rendering: -moz-crisp-edges;
		image-rendering: -o-crisp-edges;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges;
		-ms-interpolation-mode: nearest-neighbor;
	}



	.content-line {
		margin-top: 8rpx;
		margin-left: 18rpx;
	}

	.scenery-list .name,
	.scenery-content .name {
		font-weight: 650;
	}

	.scenery-list .tags,
	.scenery-content .tags {
		font-size: 25rpx;
		margin-top: 8rpx;
		color: #595959;
	}

	.scenery-list .tags .score,
	..scenery-content .tags .score {
		color: orange;
	}

	.scenery-list .tags .price,
	.scenery-content .tags .price {
		margin-left: 30rpx;
		color: red;
		font-size: 30rpx;
	}

	.scenery-list .category text,
	.scenery-content .category text {
		font-size: 25rpx;
		padding: 0 4rpx;
		border: 1rpx solid #d5d5d5;
		border-radius: 8rpx;
		text-align: center;
		margin-top: 4rpx;
	}

	.scenery-list .bottom {
		display: flex;
		margin-top: 20rpx;
		padding-bottom: 16rpx;
	}

	.scenery-list .bottom .location,
	.scenery-content .bottom .location {
		width: 60%;
		font-size: 25rpx;
		color: #686868;
	}

	.scenery-list .location .iconfont,
	.scenery-content .location .iconfont {
		font-size: 24rpx;
		margin-right: 6rpx;
	}

	.scenery-list .browse1 {
		font-size: 24rpx;
		height: 30rpx;
		color: #555555;
		line-height: 30rpx;
		margin-left: 140rpx;
	}

	.scenery-list .browse1 .iconfont {
		margin-right: 6rpx;
		position: relative;
		top: 5rpx;
	}

	.all {
		margin-top: 10rpx;
		text-align: center;
		color: #52a0ff;
		/* font-weight: 600; */
		padding-bottom: 16rpx;
	}

	.more-title {
		font-size: 28rpx;
	}

	.all .iconfont {
		font-size: 26rpx;
	}




	.food,
	.stay {
		width: 94%;
		margin: 0 auto;

	}

	.food-list,
	.stay-list {
		display: flex;
		height: 180rpx;
		margin-bottom: 18rpx;
	}

	.food-img,
	.stay-img {
		width: 38%;
		height: 100%;
	}

	.food-img image,
	.stay-img image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
		image-rendering: -moz-crisp-edges;
		image-rendering: -o-crisp-edges;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges;
		-ms-interpolation-mode: nearest-neighbor;
	}

	.food-content,
	.stay-content {
		width: 58%;
		height: 85%;
		margin: auto 16rpx;
	}

	.stay-content {
		width: 58%;
		height: 90%;
		margin: auto 16rpx;
	}

	.stay-content .name {
		font-size: 32rpx;
		font-weight: 600;
		height: 80rpx;
	}

	.stay-content .bottom {
		width: 100%;
		font-size: 25rpx;
		margin-top: 14rpx;
		color: #5e5e5e;
	}

	.stay-content .tags .score {
		color: #3a3a3a;
		font-size: 25rpx;
	}

	.stay-content .tags .price {
		margin-left: 40rpx;
		font-size: 30rpx;
		color: red;
	}

	.stay-content .location .iconfont {
		font-size: 25rpx;
		color: #686868;
		margin-right: 6rpx;
	}



	.food-content .title {
		font-size: 32rpx;
		margin-top: 5rpx;
		font-weight: 600;
	}

	.food-content .tags,
	.stay-content .tags {
		margin-top: 5rpx;
	}

	.food-content .score,
	.stay-content .score {
		font-size: 28rpx;
		color: #ff4939;
		font-family: "宋体";
		margin-left: 6rpx;
	}

	.food-content .num {
		font-size: 23rpx;
		margin: 0 16rpx;
		color: #585858;
		border-left: 5rpx solid #d4d4d4;
		padding-left: 16rpx;
		padding-right: 16rpx;
		height: 4rpx;
		border-right: 5rpx solid #cbcbcb;
	}

	.food-content .price,
	.stay-content .price {
		font-size: 26rpx;
		color: #555555;
	}

	.food-content .category {
		margin-top: 22rpx;
		font-size: 24rpx;
		letter-spacing: 2rpx;
		margin-left: 4rpx;
	}

	.food-content .category text {
		background-color: rgba(255, 0, 0, 0.1);
		color: #e80000;
		padding: 5rpx 7rpx;
		font-family: "宋体";
		border-radius: 6rpx;
	}






	.scenery-content {
		background-color: #f8f8f8;
		padding-top: 8rpx;
	}

	.scenery-content .title {
		height: 80rpx;
		font-size: 36rpx;
		font-family: "宋体";
		font-weight: 600;
		line-height: 80rpx;
		margin-left: 20rpx;
	}

	.scenery-content .scenery {
		width: 98%;
		margin: 0 auto;
		display: flex;
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
		padding-bottom: 16rpx;
		margin-bottom: 20rpx;
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
		height: 280rpx;
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

	.line .bottom {
		display: flex;
		margin-top: 10rpx;
	}

	.scenery-content .browse2 {
		font-size: 24rpx;
		height: 30rpx;
		color: #555555;
		line-height: 30rpx;
	}

	.scenery-content .browse2 .iconfont {
		position: relative;
		top: 4rpx;
		margin-right: 6rpx;
	}

	.mask {
		position: relative;
		top: 170rpx;
		z-index: 10;
		background-color: #F5F5F5;
		opacity: 0.95;
		border: 0.1rpx solid #fff;
	}

	.topDis {
		margin-top: 35rpx;
	}
</style>
