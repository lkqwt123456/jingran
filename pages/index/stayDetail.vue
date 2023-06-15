<template>
	<view class="body">
		<view class="top">
			<!-- 			<view class="top_top">
				<img src="https://img0.baidu.com/it/u=1342671147,4218026794&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1665939600&t=567ed359acee314afc912d0ee7570c96" alt="">
			</view>
 -->
			<view class="top_top">
				<swiper class="top_top" indicator-dots="true" autoplay="true" circular="true" indicator-color="#ffffff"
					indicator-active-color="#e3c321">
					<block v-for="item in banners" :key="item.id">
						<swiper-item>
							<image class="top_top" :src="item.img">
							</image>
						</swiper-item>
					</block>
				</swiper>
			</view>
			<view class="top_bottom">
				<view class="price">
					<span>￥</span>
					<text>{{stay.price}}</text>
					<text>-999</text>
				</view>
				<view class="title">
					<text>{{stay.modified}}</text>
				</view>
				<view class="introduce">
					<text>房间整洁 全屋无异味 全套服务</text>
					<span
						style="color: red">{{stay.accommodationScore!=undefined?stay.accommodationScore.toFixed(1):stay.accommodationScore}}分</span>
				</view>
			</view>
		</view>
		<view class="middle">
			<view class="title">
				<text>优惠券</text>
			</view>
			<view class="message_one">
				<span>
					<span>满200减10</span>
					<text>满200减10，七天有效</text>
				</span>
				<span v-if="sure1" @click="getSure">领取</span>
				<span v-if="!sure1" style="background-color: #eee; color: black;">已领取</span>
			</view>
			<view class="message_one">
				<span>
					<span>满1000减100</span>
					<text>满1000减100，三天有效</text>
				</span>
				<span v-if="sure2" @click="getSure2">领取</span>
				<span v-if="!sure2" style="background-color: #eee; color: black;">已领取</span>
			</view>
		</view>
		<view class="bottom">
			<view class="header">
				<text>酒店详情</text>
			</view>
			<view class="title">
				<text>酒店名称</text>
				<span>{{stay.title}}</span>
			</view>
			<view class="title">
				<text>酒店电话</text>
				<span><a class="a-show">{{stay.phone}}</a></span>
			</view>
			<view class="address">
				<text>酒店地址</text>
				<span>{{stay.address}}</span>
			</view>
			<view class="good">
				<text>酒店优势</text>
				<span>{{stay.advantage}}</span>
			</view>
			<view class="introduce">
				<text>酒店介绍</text>
				<span>{{stay.introduce}}</span>
			</view>
		</view>
		<view class="fixed">
			<view class="f_top">
				<view v-if="sure==false" class="iconfont icon-shoucang1" @click="turnSure(sure)"></view>
				<view v-if="sure==true" class="iconfont icon-shoucangxuanzhong-copy" style="color: #fed71a;" @click="turnSure(sure)">
				</view>
				<text>收藏</text>
			</view>
			<view class="f_top" @click="getLocation">
				<view class="iconfont icon-wxbdingwei"></view>
				<text>定位</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getStay,
		uqdateCollect,
		delCollect
	} from '../../utils/api.js'
	export default {
		data() {
			return {
				state:2,
				sure: '',
				sure1: true,
				sure2: true,
				stay: [],
				banners: []
			}
		},
		onLoad(e) {
			this.uid = wx.getStorageSync("userId");
			this.fid = e.fid;
			this.getMoreStay();
		},
		methods: {
			getLocation() {
				uni.openLocation({
					latitude: 27.816606,
					longitude: 102.318129,
					success: function() {
					}
				});
			},
			turnSure(e) {
				this.sure = !e
				if (this.sure) {
					this.uqdateMyCollect()
				}
				else{
					this.delMyCollect()
				}

			},
			getSure() {
				this.sure1 = false;
				
			},
			getSure2(){
				this.sure2 = false;
			},

			getMoreStay() {
				getStay(this.fid, this.uid).then((res) => {
					this.stay = res.data.accAndDetailList.accommodation
					this.sure = res.data.accAndDetailList.isLike
					this.banners = res.data.accAndDetailList.details
				})
			},
			// 收藏
			uqdateMyCollect() {
				let data = {
					'uid': this.uid,
					'proId': this.fid,
					'state': this.state
				}
				uqdateCollect(data).then((res) => {
				})
			},
			// 取消收藏
			delMyCollect() {
				let e = {
					uid: this.uid,
					proId: this.fid,
				}
	
				delCollect(e).then((res)=> {
				})
			},

		}
	}
</script>

<style>
	
	.a-show{
		text-decoration: none;
		color: red;
	}

	/* 页面的自适应及整体布局 */
	.body {
		max-width: 850px;
		min-width: 320px;
		margin: 0 auto;
		overflow-x: hidden;
		background-color: #e2e1e4;
	}

	/* 顶部 */
	/* 顶部的图片部分 */
	.top_top {
		width: 100%;
		height: 500rpx;
	}

	.top_top img {
		width: 100%;
		height: 100%;
		image-rendering: -moz-crisp-edges;
		image-rendering: -o-crisp-edges;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges;
		-ms-interpolation-mode: nearest-neighbor;

	}

	/* 顶部的价格介绍部分 */
	.top_bottom,
	.middle {
		background-color: #fff;
		margin: 15rpx 10rpx 10rpx;
		padding: 15rpx;
		border-radius: 10rpx;
	}

	.price {
		color: #f86b1d;
	}

	.price span {
		font-size: 24rpx
	}

	.price text {
		font-size: 40rpx
	}

	.top_bottom .title {
		margin: 20rpx 0;
		font-weight: 600;
		line-height: 50rpx;
	}

	.top_bottom .introduce {
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		color: #cdd1d3;
	}

	/* 优惠券部分 */
	.middle {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: 200rpx;
		margin-bottom: 15rpx;
	}

	.middle .title {
		color: #666;
		font-size: 28rpx
	}

	.message_one {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.middle .message_one span:nth-child(2) {
		font-size: 24rpx;
		display: inline-block;
		width: 120rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		background-color: #fff;
		border-radius: 15rpx;
	}

	.middle .message_one span:nth-child(2) {
		color: #fff;
		background-color: red;
	}


	.middle span span {
		margin-right: 15rpx;
		border: 1rpx solid red;
		color: #fff;
		font-size: 24rpx;
		background-color: brown;
		border-radius: 5rpx;
	}

	/* 酒店详情 */
	.bottom {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 400rpx;
		background-color: #fff;
	}

	.header {
		font-weight: 700;
		font-size: 36rpx;
		margin: 5rpx 0;
	}

	.bottom view {
		display: flex;
		padding: 10rpx 20rpx;
		background-color: #fff;
	}

	.bottom view text {
		flex: 2;
		display: inline-block;
	}

	.bottom view span {
		flex: 8;
		display: inline-block;
		padding-left: 50rpx;
		color: #495c69;
		font-size: 28rpx;
		letter-spacing: 2rpx;
	}

	/* 侧边固定定位 */
	.fixed {
		position: fixed;
		bottom: 10%;
		right: 6rpx;
	}

	.f_top {
		padding: 10rpx;
		width: 50rpx;
		background-color: rgba(218, 218, 218, 0.5);
	}

	.f_top:nth-child(1) {
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
	}

	.f_top:nth-child(2) {
		border-bottom-left-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
	}

	.f_top view {
		font-size: 50rpx
	}

	.f_top text {
		font-size: 24rpx
	}
</style>
