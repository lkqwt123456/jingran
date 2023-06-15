<template>
	<view class="sceneryDetail">
			<view class="banner">
				<swiper class="banner-container" indicator-dots="true" autoplay="true" circular="true"
					indicator-color="#ffffff" indicator-active-color="#e3c321">
					<block>
						<swiper-item v-for="item in detail.recreational" :key="item.id">
							<image class="slide-image"
								:src="item.recreationalImg">
							</image>
						</swiper-item>
					</block>
				</swiper>
			</view>
			
			<view class="content">
				<view class="top">
					<text class="title">{{detail.scenery.title}}</text>
					<text class="price">￥{{detail.scenery.price}}<text style="font-size: 26rpx;color: #000000;">起</text></text>
				</view>
				<view class="commend">
					<text>{{detail.scenery.introduce}}</text>
				</view>
				<view class="action">
					<text class="iconfont icon-weizhi"></text>
					<text>出发地：</text>
					<text>{{detail.scenery.location}}</text>
					<text>出发</text>
				</view>
			</view>
			
			<view class="footer">
				<view class="footer-title">
					<text>行程概览</text>
				</view>
				<view class="time">
					<text class="iconfont icon-rili"></text>
					<text class="title1">天数：</text>
					<text class="title2">{{detail.scenery.travelDay}}</text>
				</view>
				<view class="come">
					<text class="iconfont icon-kongyun"></text>
					<text class="title1">出发：</text>
					<text class="title2">{{detail.scenery.goPlace}}</text>
				</view>
				<view class="to">
					<text class="iconfont icon-ai246"></text>
					<text class="title1">集合：</text>
					<text class="title2">{{detail.scenery.togetherPlace}}</text>
				</view>
				<view class="disband">
					<text class="iconfont icon-xingren"></text>
					<text class="title1">解散：</text>
					<text class="title2">{{detail.scenery.breakupPlace}}</text>
				</view>
			</view>
			
			<view class="recommend-img">
				<image src="https://qimg4.youxiake.com/upload/202209/21/ae91f1184b71d14d.gif" mode=""></image>
			</view>
			
			<view class="recommend">
				<view class="title">
					<text >相关推荐</text>
				</view>
				<view class="scenery">
					<view class="scenery-left">
						<view class="left-list" v-for="item in leftScenery" :key="item.id" @click="toSceneryDetail(item.id)">
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
						<view class="right-list" v-for="item in rightScenery" :key="item.id"  @click="toSceneryDetail(item.id)">
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
										<text>甘孜</text>
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
			<view class="collect">
					<view class="collect_l">
						<view class="collect_l_t">
							<span>😊</span>
							<span>
								<text>{{list.score}}</text>/5.0分
							</span>
						</view>
						<view class="collect_l_b">
							<text>{{list.category}}</text>
						</view>
					</view>
					<view class="collect_r">
						<view class="collect_all" v-show="!sure" @click="turnSure(sure)">立即收藏</view>
						<view class="collect_all" v-show="sure" @click="turnSure(sure)">已收藏</view>
					</view>
				</view>
	</view>
</template>

<script>
	import {sceneryDetail,allScenery,uqdateCollect,delCollect} from '../../utils/api.js'
	export default{
		data(){
			return{
				uid:'',
				detailId:'',
				detail:[],
				leftScenery:[],
				rightScenery:[],
				state: 3,
				sure: '',
				list: []
			}
		},
		onLoad(e) {
			this.uid = wx.getStorageSync('userId');
			this.detailId=e.fid;
			this.getSceneryDetail();
			this.getScenery();
		},
		methods:{ 
			
			toSceneryDetail(id){
				uni.navigateTo({
					url:'/pages/index/sceneryDetail?fid='+id
				})
			},
			turnSure(e) {
				this.sure = !e
					
				if(this.sure) {
					this.uqdateMyCollect()
				}
				else{
					this.delMyCollect()
				}
			},
			getSceneryDetail(){
				let id=this.detailId
				let uid = this.uid
				sceneryDetail(id,uid).then((res)=>{
					this.detail=res.data.jrScenery
					this.list = this.detail.scenery
					this.sure=this.detail.isLike
				})
			},
			getScenery(){
				allScenery().then((res)=>{
					this.leftScenery = res.data.sceneryList.slice(0,3)
					this.rightScenery = res.data.sceneryList.slice(3,6)
				})
			},
			// 收藏
			uqdateMyCollect() {				
				let data = {
					'uid': this.uid,
					'proId': this.detailId,
					'state': this.state
				} 
				uqdateCollect(data).then((res)=> {
				})
			},
			// 取消收藏
			delMyCollect() {
				let e = {
					uid: this.uid,
					proId: this.detailId,
				}
				
				delCollect(e).then((res)=> {
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
	.sceneryDetail{
		background-color: #fdfdfd;
	}
	.banner {
			height: 360rpx;
			width: 100%;
			display: flex;
			flex-direction: row;
		}
		
		.banner-container {
			width: 100%;
			height: 360rpx;
			margin: 0 auto;
		}
		.slide-image {
			height: 100%;
			width: 100%;
		}
		
		
		.content{
			width: 96%;
			margin: 0 auto;
			padding-bottom: 16rpx;
		}
		.top{
			margin-top: 15rpx;
		}
		.content .title{
			font-size: 36rpx;
			font-weight: 700;
		}
		.price{
			font-size: 36rpx;
			color: orange;
			float: right;
			margin-right: 20rpx;
		}
		.commend{
			margin-top: 15rpx;
			font-size: 28rpx;
			color: #363636;
			line-height: 45rpx;
			border-bottom: 2rpx solid #dfdfdf;
			font-weight: 700;
			
		}
		.commend text{
			height: 135rpx;
			overflow : hidden;
			display: -webkit-box;    
			-webkit-box-orient: vertical; 
			-webkit-line-clamp: 3;   
			text-overflow: ellipsis;
			white-space: normal;
		}
		.action{
			margin-top: 10rpx;
		}
		.action .iconfont{
			color: orange;
			font-size: 28rpx;
			margin-right: 8rpx;
		}
		.action text{
			font-size: 27rpx;
			color: #636363;
		}
		
		
		.footer{
			padding-top: 15rpx;
			border-top: 14rpx solid #f4f4f4;
			padding-bottom: 16rpx;
		}
		.footer-title{
			margin-left: 20rpx;
			font-size: 35rpx;
			font-weight: 600;
			color: #464646;
		}
		.time,
		.come,
		.to,
		.disband{
			margin-left: 20rpx;
			margin-top: 18rpx;
		}
		.footer .iconfont{
			color:#FFDD28;
			margin-right: 8rpx;
		}
		.footer .title1{
			font-size: 26rpx;
			color: #565656;
		}
		.footer .title2{
			font-size: 27rpx;
			color: #000000;
		}
		
		.recommend-img{
			width: 100%;
			height: 200rpx;
			border-top: 15rpx solid #f4f4f4;
		}
		.recommend-img image{
			width: 100%;
			height: 100%;
			image-rendering: -moz-crisp-edges;
			image-rendering: -o-crisp-edges;
			image-rendering: -webkit-optimize-contrast;
			image-rendering: crisp-edges;
			-ms-interpolation-mode: nearest-neighbor;
		}
		
		
		.recommend{
			background-color: #f1f1f1;
			padding-top: 16rpx;
		}
		.recommend .title{
			height: 80rpx;
			font-size: 36rpx;
			font-family: "宋体";
			font-weight: 600;
			line-height: 80rpx;
			text-align: center;
		}
		.recommend .title::before,
		.recommend .title::after{
			content: '- -';
			margin: 15rpx;
		}
		.scenery{
			width: 98%;
			margin: 0 auto;
			display: flex;
			padding-bottom: 60px;
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
			height: 240rpx;
			margin: 0 auto;
			border-radius: 16rpx 16rpx 0 0;
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
		/* 固定定位 */
		.collect {
			display: flex;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 10%;
			background-color: #fff;
			animation: c 3s forwards;
		}
		.collect_r {
			display: flex;
			justify-content: center;
			align-items: center;
			flex: 3;
			text-align: center;
			color: #fff;
		}
			
		.collect_all {
			width: 80%;
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 20rpx;
			font-weight: 700;
			background-color: #de1c31;
		}
		.collect_l {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 2;
			padding-left: 50rpx;
		}
			
		.collect_l_t span:nth-child(2) {
			margin-left: 10rpx;
			font-size: 28rpx;
		}
		.collect_l_t span:nth-child(2) text {
			font-size: 36rpx;
			color: #de1c31;
		}	
			
			
		.collect_l_b text {
			margin-left: 15rpx;
			font-size: 24rpx;
		}
		@keyframes c {
				
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		
		
</style>
