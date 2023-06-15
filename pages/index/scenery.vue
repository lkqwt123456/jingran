<template>
	<view class="scenery-page">
		<view class="search">
			<input type="text" value="" placeholder="搜索目的地/景点" placeholder-style="font-size:28rpx" />
		</view>
		<view class="banner">
			<swiper class="banner-container" indicator-dots="true" autoplay="true" circular="true"
				indicator-color="#ffffff" indicator-active-color="#e3c321">
				<block v-for="item in banners" :key="item.id">
					<swiper-item>
						<image class="slide-image" :class="[ currentIndex === index ? 'active':'' ]"
							:src="item.img">
						</image>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<view class="hot">
			<view class="title">
				<text>当季目的地</text>
			</view>
			<view class="hot-content">
				<view class="list" @click="toSceneryDetail(item.id)" v-for="item in goodScenery" :key="item.id">
					<image :src="item.img" ></image>
					<view class="commend">
						<view class="name">
							<text>{{item.location}}</text>
						</view>
						<view class="tag">
							<text>{{item.category}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="recommend-img">
			<image src="https://qimg4.youxiake.com/upload/202209/21/ae91f1184b71d14d.gif" mode=""></image>
		</view>
		
		<view class="scenery-content">
			<view class="title">
				<text >精选旅行地</text>
			</view>
			<view class="scenery">
				<view class="scenery-left">
					<view class="left-list" @click="toSceneryDetail(item.id)" v-for="item in leftScenery" :key="item.id">
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
					<view class="right-list" @click="toSceneryDetail(item.id)" v-for="item in rightScenery" :key="item.id">
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
	import {banner,goodScenery,allScenery} from "../../utils/api.js"
	export default{
		data(){
			return{
				goodScenery:[],
				banners:[],
				leftScenery:[],
				rightScenery:[],
			}
		},
		onLoad(){
			this.getBanner();
			this.getGoodScenery();
			this.getScenery();
		},
		methods:{
			getBanner(){
				banner().then((res)=>{
					const data=this.getArrayItems(res.data.bannerList,3)
					this.banners=data
				})
			},
			getGoodScenery(){
				goodScenery().then((res)=>{
					const data=this.getArrayItems(res.data.sceneryList,6)
					this.goodScenery=data
				})
			},
			getScenery(){
				allScenery().then((res)=>{
					this.leftScenery=res.data.sceneryList.slice(0,9)
					this.rightScenery=res.data.sceneryList.slice(9,18)
				})
			},
			toSceneryDetail(id){
				uni.navigateTo({
					url:'/pages/index/sceneryDetail?fid='+id
				})
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
		}
	}
</script>

<style scoped>
	.search{
		width: 100%;
		background-color: #ffdd28;
		padding-bottom: 15rpx;
		height: 300rpx;
		position: absolute;
		z-index: -10;
		top: 0;
		border-radius: 0 0 55rpx 55rpx;
	}
	.search input{
		width: 85%;
		border-radius: 28rpx;
		margin: 0 auto;
		background-color: rgba(255,255,255,0.7);
		padding-left: 40rpx;
		height: 58rpx;
	}
	
	
	.banner {
		height: 350rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		margin-top: 75rpx;
	}
	
	.banner-container {
		width: 90%;
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
	
	
	.hot{
		margin-top: 30rpx;
	}
	.hot .title{
		font-size: 35rpx;
		margin-left: 26rpx;
		font-weight: 700;
		letter-spacing: 2rpx;
	}
	.hot-content{
		width: 97%;
		margin: 25rpx auto;
		white-space: nowrap;
		overflow-x: auto;
		overflow-y: hidden;
	}
	.hot-content::-webkit-scrollbar{
		display: none;
	}
	.hot-content .list{
		width: 42%;
		margin: 0 8rpx;
		position: relative;
		display: inline-block;
	}
	.hot-content image{
		width: 100%;
		height: 300rpx;
		border-radius: 16rpx;
		image-rendering: -moz-crisp-edges;
		image-rendering: -o-crisp-edges;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges;
		-ms-interpolation-mode: nearest-neighbor;
	}
	.hot-content .commend{
		position: absolute;
		text-align: center;
		left: 72rpx;
		bottom: 20rpx;
		color: #FFFFFF;
	}
	.commend .name{
		font-size: 36rpx;
		font-weight: 700;
		margin-bottom: 12rpx;
	}
	.commend .tag{
		background-color: rgba(255,255,255,0.3);
		border-radius: 20rpx;
		font-size: 28rpx;
	}
	
	
	.recommend-img{
		width: 100%;
		height: 200rpx;
		margin-top: 20rpx;
	}
	.recommend-img image{
		width: 100%;
		height: 100%;
	}
	
	
	.scenery-content{
		background-color: #f1f1f1;
		padding-top: 16rpx;
	}
	.scenery-content .title{
		height: 80rpx;
		font-size: 36rpx;
		font-family: "宋体";
		font-weight: 600;
		line-height: 80rpx;
		margin-left: 20rpx;
		color: #ffaa00;
	}
	
	.scenery{
		width: 98%;
		margin: 0 auto;
		display: flex;
	}
	.scenery-left,
	.scenery-right{
		width: 48%;
		margin: 0 10rpx;
	}
	
	.left-list,
	.right-list{
		background-color: #FFFFFF;
		border-radius: 15rpx;
		margin-bottom: 26rpx;
	}
	.left-list image{
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
	
	.right-list image{
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
	.line{
		margin-left: 15rpx;
	}
	.name{
		font-weight: 650;
	}
	.tags{
		font-size: 25rpx;
		margin-top: 10rpx;
		color: #595959;
	}
	.tags .score{
		color: orange;
	}
	.tags .price{
		margin-left: 30rpx;
		color: red;
		font-size: 30rpx;
	}
	.category text{
		font-size: 25rpx;
		padding: 0 4rpx;
		border: 1rpx solid #d5d5d5;
		border-radius: 8rpx;
		text-align: center;
		margin-top: 4rpx;
	}
	.bottom{
		display: flex;
		margin-top: 14rpx;
		padding-bottom: 16rpx;
	}
	.bottom .location{
		width: 60%;
		font-size: 25rpx;
		color: #686868;
	}
	.location .iconfont{
		font-size: 24rpx;
		margin-right: 6rpx;
	}
	.browse{
		font-size: 24rpx;
		height: 30rpx;
		color: #555555;
		line-height: 30rpx;
	}
	.browse .iconfont{
		margin-right: 5rpx;
		position: relative;
	}
	.browse .num{
		position: relative;
		top: -4rpx;
	}
</style>
