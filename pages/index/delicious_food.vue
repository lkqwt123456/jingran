<template>
	<view class="all">
		<image :src="food.img" class="top"></image>
		<view class="bottom">
			<view class="bottom_top">
				<ul>
					<li>
						<view class="mc">
							{{food.title}}
						</view>
						<view class="price">
							<span>￥{{food.price}}</span><span>原价￥70</span>
						</view>
					</li>
					<li>
						<view class="score">
							<p>{{food.commendPerson}}</p>
							<span>收藏</span>
						</view>
					</li>
				</ul>
			</view>
			<view class="bottom_bottom">
				<view class="content">
					<view class="left">
						附近门店 
					</view>
					<view class="right">
						<span>{{food.address}}</span>
					</view>
					
				</view>
				<view class="content">
					<view class="left">
						营业时间
					</view>
					<view class="right">
						<span style="color: #de1c31;">{{food.workTime}}</span>
					</view>
					
				</view>
				<view class="content">
					<view class="left">
						菜品历史
					</view>
					<view class="right">
						{{food.command}}
					</view>
					
				</view>
				<view class="content">
					<view class="left">
						相关菜系
					</view>
					<view class="right_b">
						<img class="img"  @tap="previewImage(list[0],0)" :src="list[0]"> 
						<img class="img"  @tap="previewImage(list[1],1)" :src="list[1]">
						<img class="img"  @tap="previewImage(list[2],2)" :src="list[2]">
					</view>					
				</view>
				<view class="collect">
					<view class="collect_l">
						<view class="collect_l_t">
							<span>😊</span>
							<span>
								<text>{{food.score}}</text>/5.0分
							</span>
						</view>
						<view class="collect_l_b">
							<text>{{food.features}}</text>
						</view>
					</view>
					<view class="collect_r">
						<view class="collect_all" v-show="!sure" @click="turnSure(sure)">立即收藏</view>
						<view class="collect_all" v-show="sure" @click="turnSure(sure)">已收藏</view>
					</view>
				</view>
			</view>
		</view>		
	</view>
</template>

<script>
	import{foodDetail,uqdateCollect,delCollect} from '../../utils/api.js'
	export default {
		data() {
			return {
				sure: '',
				fid:'',
				uid:'',
				food:{}, 
				state: 1,
				list:[]
			}
		},
		onLoad(e) {
			this.uid = wx.getStorageSync("userId");
			this.fid =e.fid;
			this.getDetailFood();
		},
		methods: {
			
			//预览图片
			previewImage(uri,index) {
				let imgList = [];
				imgList[0]=uri;
				uni.previewImage({
					current: '0',
					urls: imgList
				});
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
			
			//获取详细信息
			getDetailFood(){
				foodDetail(this.fid,this.uid).then((res)=>{
					this.food=res.data.food, 
					this.sure = this.food.isLike
					this.list = this.food.otherImg
				})
			},
			// 收藏
			uqdateMyCollect() {				
				let data = {
					'uid': this.uid,
					'proId': this.fid,
					'state': this.state
				}
				uqdateCollect(data).then((res)=> {
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
	.all {
		max-width: 850px;
		min-width: 320px;
		margin: 0 auto;
		overflow-x: hidden;
	}
	/* 顶部 */
	.top {
		position: relative;
		height: 500rpx;
		width: 100%;
		image-rendering: -moz-crisp-edges;
		image-rendering: -o-crisp-edges;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges;
		-ms-interpolation-mode: nearest-neighbor;
	}

	/* 底部 */
	.bottom {
		position: absolute;
		top: 400rpx;
		left: 0rpx;
		width: 100%;
		height: 850rpx;
	}
	/* 底部	底部的上半部分 */
	.bottom_top {
		height: 20%;
		background-color: #fff;
		border-top-left-radius: 40rpx;
		border-bottom: 1rpx solid #c4cbcf;
	}
	.bottom_top ul {
		display: flex;
		align-items: center;
		height: 100%;
	}
		
	.bottom_top ul li {
		height: 80%;
		background-color: #fff;
	}
		
	.bottom_top li:nth-child(1) {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		flex: 2;
		margin-left: 50rpx;
	}
	
	.bottom_top ul li .mc {
		font-size: 32rpx;
		font-weight: 900;
	}
	
	.bottom_top ul li .price span:nth-child(1){
		color: #cc163a;
		font-size: 36rpx;
		font-weight: 900;
	}
	
	.bottom_top ul li .price span:nth-child(2){
		margin-left: 20rpx;
		color: #666;
		font-size: 20rpx;
		text-decoration: line-through;
	}
	
	.bottom_top li:nth-child(2) {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
		
	.bottom_top .score {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #fcc307;
		width: 100rpx;
		height: 100rpx;
		border-top-left-radius: 50%;
		border-top-right-radius: 5%;
		border-bottom-left-radius: 50%;
		border-bottom-right-radius: 50%;
	}
	.score p {
		font-size: 36rpx;
		font-weight: 900;
	}
		
	.score span {
		font-size: 24rpx
	}
	/* 底部 底部的下半部分 */
	.bottom_bottom {
		position: relative;
		padding-bottom: 100px;
		margin: 0 50rpx;
	}
	
	.content {
		display: flex;
		margin-top: 30rpx;
	}
	
	.left {
		color: #c4cbcf;
		flex: 3;
		letter-spacing: 2rpx;
	}
	
	.right {
		flex: 7;
		color: #495c69;
		letter-spacing: 2rpx;
		font-size: 28rpx
	}
	.right_b {
		flex: 7;
		display: flex;
		justify-content: space-between;
	}	
	.right_b .img {
		width: 150rpx;
		height: 150rpx;
		border-radius: 10rpx;
		image-rendering: -moz-crisp-edges;
		image-rendering: -o-crisp-edges;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges;
		-ms-interpolation-mode: nearest-neighbor;
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
