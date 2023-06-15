<template>
	<view class="contact-page">
		<image src="https://jing-ran-1310347558.cos.ap-chengdu.myqcloud.com/R-C.png" @tap="previewImage('https://jing-ran-1310347558.cos.ap-chengdu.myqcloud.com/R-C.png',0)"></image>
		<view class="address">
			<text class="title">地址</text>
			<text class="content">address</text>
			<view class="detail">
				<text>四川省凉山彝族自治州西昌市</text>
				<text class="iconfont icon-weizhi"></text>
			</view>
		</view>
		<view class="email">
			<text class="title">邮箱</text>
			<text class="content">email</text>
			<view class="detail">
				<text>2376458127@qq.com</text>
				<text class="iconfont icon-youxiang"></text>
			</view>
		</view>
		<view class="hub">
			<text class="iconfont icon-github"></text>
			<navigator url="baidu.com">https://gitee.com/Dq333</navigator>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
			}
		},
		methods:{
			previewImage(uri,index) {
				let imgList = [];
				imgList[0]=uri;
				uni.previewImage({
					current: '0',
					urls: imgList
				});
			},
		}
	}
</script>

<style scoped>
	.contact-page{
	}
	.contact-page image{
		width: 100%;
		height: 350rpx;
	}
	.address,
	.email{
		width: 100%;
		margin: 8rpx 0;
		border-bottom: 8rpx solid #efefef;
		padding-bottom: 15rpx;
	}
	.title{
		font-size: 28rpx;
		color: #646464;
		margin-left: 30rpx;
	}
	.content{
		font-size: 28rpx;
		color: #646464;
	}
	.content::before{
		content: "|";
		margin: 8rpx;
		height: 1rpx;
	}
	.detail{
		margin-left: 28rpx;
		margin-top: 15rpx;
		font-size: 30rpx;
	}
	.detail .iconfont{
		float: right;
		color: #8d8d8d;
		margin-right: 18rpx;
		font-size: 36rpx;
	}
	.hub{
		display: flex;
		margin-left: 26rpx;
		margin-top: 15rpx;
		color: #007AFF;
	}
	.hub .iconfont{
		font-size: 42rpx;
		margin-top: 5rpx;
		margin-right: 8rpx;
	}
	.team{
		width: 100%;
		margin: 18rpx auto;
		padding-bottom: 8rpx;
	}
	.name{
		width: 100%;
		margin-left: 26rpx;
		font-size: 30rpx;
		margin-bottom: 10rpx;
		margin-top: 8rpx;
	}
	.introduce{
		width: 96%;
		font-size: 28rpx;
		color: #3b3b3b;
		margin: 0 auto;
		line-height: 40rpx;
		letter-spacing: 2rpx;
		margin-left: 24rpx;
	}
</style>
