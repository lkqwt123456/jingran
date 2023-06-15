<template>
	<view class="tipsDetail">
		<view class="header">
			<view class="banner">
				<swiper class="banner-container" autoplay="true" circular="true">
					<block>
						<swiper-item>
							<image class="slide-image"
								:src="detail.img1">
							</image>
						</swiper-item>
						<swiper-item>
							<image class="slide-image"
								:src="detail.img2">
							</image>
						</swiper-item>
						<swiper-item>
							<image class="slide-image"
								:src="detail.img3">
							</image>
						</swiper-item>
					</block>
				</swiper>
			</view>
			<view class="user">
				<view class="avatar">
					<image :src="detail.useravatar"></image>
				</view>
				<text class="title">{{detail.title}}</text>
			</view>
			<view class="bottom">
				<view class="username">
					<text>{{detail.nickname}}</text>
				</view>
				<view class="time">
					<text>{{detail.gotime}}</text>
				</view>
				<view class="tag">
					<text>{{detail.tag}}</text>
				</view>
			</view>
			<view class="figure">
				<text>人物/</text>
				<text class="num">{{detail.friend}}</text>
			</view>
		</view>
		
		<view class="content">
			<view class="article-title">
				<text>{{detail.feeling}}</text>
			</view>
			<view class="article">
				<text>{{detail.article}}</text>
			</view>
			<view class="footer">
				<view class="footer-title">
					<text>THE END</text>
				</view>
			</view>
		</view>
		
		<view class="corr">
			<view class="corr-title">
				<text>相关游记</text>
			</view>
			<view class="corr-content">
				<view class="corr-img" @click="toTipDetail(item.id)" v-for="item in tips" :key="item.id" >
					<image :src="item.img1"></image>
					<view class="corr-name">
						<text>{{item.title}}</text>
					</view>
					<view class="corr-time">
						<text>2022.09.21出发/共3天/11图</text>
					</view>
					<view class="corr-user">
						<view class="user-avatar">
							<image :src="item.useravatar" ></image>
						</view>
						<text>{{item.nickname}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {tips,tipsDetail} from '../../utils/api.js'
	export default{
		data(){
			return{
				detailId:'',
				detail:[],
				tips:[]
			}
		},
		onLoad(params) {
			this.detailId=params.id;
			this.getTipsDetail();
			this.getTips();
		},
		methods:{
			getTipsDetail(){
				let id=this.detailId
				tipsDetail(id).then((res)=>{
					this.detail=res.data.strategy
				})
			},
			getTips(){
				tips().then((res)=>{
					const data=this.getArrayItems(res.data.strategyList,4)
					this.tips=data
				})
				
			},
			toTipDetail(id){
				uni.navigateTo({
					url:'/pages/index/tipsDetail?id='+id
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
	.banner {
			height: 400rpx;
			width: 100%;
			display: flex;
			flex-direction: row;
			position: relative;
		}
		
		.banner-container {
			width: 100%;
			height: 400rpx;
			margin: 0 auto;
		}
		.slide-image {
			height: 100%;
			width: 100%;
		}
		.user{
			position: absolute;
			top: 240rpx;
			left: 20rpx;
			display: flex;
		}
		.user .avatar{
			width: 85rpx;
			height: 75rpx;
		}
		.user .title{
			font-size: 36rpx;
			color: #FFFFFF;
			font-weight: 600;
			margin-left: 10rpx;
		}
		.avatar image{
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
		
		
		.bottom{
			position: absolute;
			top: 330rpx;
			left: 110rpx;
			display: flex;
			margin-top: 12rpx;
			color: #FFFFFF;
			font-size: 26rpx;
		}
		.username{
			font-size: 26rpx;
		}
		.time{
			margin-left: 40rpx;
		}
		.tag{
			margin-left: 100rpx;
		}
		.tag text{
			padding: 4rpx;
			background-color: #ff3f39;
			border-radius: 4rpx;
		}
		
		
		.figure{
			height: 70rpx;
			line-height: 70rpx;
			font-size: 26rpx;
			color: #5a5a5a;
			border-bottom: 14rpx solid #f0f0f0;
		}
		.figure text{
			margin-left: 25rpx;
		}
		.figure .num{
			color: #3eaa9a;
		}
		
		
		.content{
			margin-top: 18rpx;
			border-bottom: 14rpx solid #f0f0f0;
		}
		.content .article-title{
			width: 96%;
			margin: 0 auto;
			font-size: 42rpx;
			font-weight: 600;
			color: #565656;
		}
		.article{
			width: 96%;
			margin: 16rpx auto;
			line-height: 46rpx;
			font-size: 27rpx;
			color: #505050;
		}
		.footer-title{
			text-align: center;
			margin-bottom: 20rpx;
			font-size: 28rpx;
			font-weight: 600;
			color: #444444;
		}
		
		.corr{
			width: 95%;
			margin: 0 auto;
		}
		.corr-title{
			margin: 18rpx 0;
			font-size: 30rpx;
			font-weight: 600;
		}
		.corr-content{
			
		}
		.corr-img{
			height: 400rpx;
			position: relative;
			margin-top: 16rpx;
		}
		.corr-img image{
			width: 100%;
			height: 100%;
			border-radius: 8rpx;
		}
		.corr-name{
			position: absolute;
			top: 20rpx;
			left: 12rpx;
			color: #FFFFFF;
			font-size: 36rpx;
			font-weight: 600;
		}
		.corr-time{
			position: absolute;
			top: 118rpx;
			left: 12rpx;
			color: #f8f8f8;
			font-size: 26rpx;
		}
		.corr-user{
			position: absolute;
			left: 16rpx;
			bottom: 20rpx;
			color: #f8f8f8;
			display: flex;
		}
		.user-avatar{
			width: 60rpx;
			height: 60rpx;
		}
		.user-avatar image{
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
		.corr-user text{
			margin-left: 10rpx;
			font-size: 26rpx;
			margin-top: 12rpx;
		}
</style>
