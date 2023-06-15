<template>
	<view class="food-page">
		<view class="recommend">
			<view class="title">
				<text>精品推荐</text>
			</view>
			<view class="content">
				<view class="list" v-for="item in recommend"  @click="goFoodDetail(item.id)" :key="item.id">
					<image :src="item.img"></image>
					<view class="tag">
						<text>{{item.features}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="nav">
				<view @click="navSwitch" data-index="0" class="nav-title">
					<text v-bind:class="[navState==0?'title1':'']">特色美食</text>
				</view>
				<view @click="navSwitch" data-index="1" class="nav-title">
					<text v-bind:class="[navState==1?'title2':'']">新鲜水果</text>
				</view>
			</view>
			<view class="eat">
				<view v-if="navState==0" class="food" >
					<view class="food-list" v-for="item in foods" :key="item.id" @click="goFoodDetail(item.id)">
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
								<text class="price">￥{{item.price}}/人</text>
							</view>
							<view class="category">
								<text>{{item.features}}</text>
							</view>
						</view>
					</view>
				</view>
				<view v-if="navState==1" class="fruit">
					<view class="food-list" v-for="item in fruits" :key="item.id" >
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
								<text class="price">￥{{item.price}}/人</text>
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
</template>

<script>
	import{goodFood,food,fruit} from '../../utils/api.js'
	export default{
		data(){
			return{
				navState: 0,
				recommend:[],
				foods:[],
				fruits:[]
			}
		},
		onLoad(){
			this.getGoodFood();
			this.getFood();
			this.getFruit();
		},
		methods:{
			//跳转美食
			goFoodDetail(fid){
				uni.navigateTo({
					url:'/pages/index/delicious_food?fid='+fid
				})
				
			},
			
			
			navSwitch(e){
				let index = e.currentTarget.dataset.index;
				this.navState=index;
			},
			getGoodFood(){
				goodFood().then((res)=>{
					let data=this.getArrayItems(res.data.FoodsInfo,3)
					this.recommend=data
				})
			},
			getFood(){
				food().then((res)=>{
					let data=this.getArrayItems(res.data.FoodsInfo,10)
					this.foods=data
				})
			},
			getFruit(){
				fruit().then((res)=>{
					let data=this.getArrayItems(res.data.FoodsInfo,10)
					this.fruits=data
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
	.header-img{
		width: 100%;
		height: 70rpx;
		margin: 0 auto;
	}
	.header-img input{
		width: 88%;
		position: absolute;
		left: 30rpx;
		top: 0rpx;
		background-color: #FFFFFF;
		border-radius: 30rpx;
		height: 50rpx;
		padding-left: 30rpx;
	}
	.header-img image{
		width: 100%;
		height: 100%;
		filter: blur(12rpx);
	}
	.recommend .title{
		height: 65rpx;
		line-height: 65rpx;
		margin-left: 18rpx;
		font-size: 40rpx;
		margin-top: 10rpx;
		color: #f3a200;
		font-family: "宋体"
	}
	.content{
		width: 98%;
		margin: 10rpx auto;
	}
	.content .list{
		width: 31%;
		height: 260rpx;
		position: relative;
		display: inline-block;
		margin: 0 9rpx;
	}
	.list image{
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
		image-rendering:-moz-crisp-edges;
		image-rendering:-o-crisp-edges;
		image-rendering:-webkit-optimize-contrast;
		image-rendering: crisp-edges;
		-ms-interpolation-mode:nearest-neighbor;
	}
	.list .tag{
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		color: #FFFFFF;
		background-color: rgba(112, 112, 112, 0.4);
		height: 55rpx;
		line-height: 55rpx;
	}
	.tag text{
		margin-left: 10rpx;
		font-size: 29rpx;
	}
	
	
	.nav{
		display: flex;
		margin-top: 20rpx;
		height: 55rpx;
	}
	.nav-title{
		width: 50%;
		height: 100%;
		line-height: 55rpx;
		text-align: center;
		font-family: "宋体";
		font-weight: 700;
		font-size: 35rpx;
	}
	.title1,
	.title2{
		color: #ffaa00;
		border-bottom: 5rpx solid #ffaa00;
		padding-bottom: 4rpx;
		border-radius: 15rpx;
	}
	
	.eat{
		margin-top: 25rpx;
	}
	.food,
	.fruit{
		width: 94%;
		margin: 0 auto;
		
	}
	.food-list{
		display: flex;
		height: 180rpx;
		margin-top: 18rpx;
	}
	.food-img{
		width: 38%;
		height: 100%;
	}
	.food-img image{
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}
	.food-content{
		height: 85%;
		margin: auto 16rpx;
	}
	.food-content .title{
		font-size: 35rpx;
		margin-top: 8rpx;
		font-weight: 600;
		font-family: "宋体"
	}
	.tags{
		margin: 8rpx 0;
	}
	.score{
		font-size: 28rpx;
		color: #ff4939;
		font-family: "宋体";
		margin-left: 6rpx;
	}
	.num{
		font-size: 23rpx;
		margin: 0 16rpx;
		color: #585858;
		border-left: 5rpx solid #d4d4d4;
		padding-left: 16rpx;
		padding-right: 16rpx;
		height: 4rpx;
		border-right: 5rpx solid #cbcbcb;
	}
	.price{
		font-size: 26rpx;
		color: #555555;
	}
	.category{
		margin-top: 22rpx;
		font-size: 24rpx;
		letter-spacing: 2rpx;
		margin-left: 4rpx;
	}
	.category text{
		background-color: rgba(255, 0, 0, 0.1);
		color: #e80000;
		padding: 5rpx 7rpx;
		font-family: "宋体";
		border-radius: 6rpx;
	}
</style>
