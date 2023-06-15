<template>
	<view id="moments">

		<view class="home-pic">
			<text class="iconfont icon-xiangji1" @click="toPublish"></text>
			<view class="home-pic-base">
				<view class="top-pic">
					<image class="header" :src="user.avatar"  @tap="previewImage(user.avatar,1)"></image>
				</view>
				<view class="top-name">{{user.username}}</view>
			</view>
		</view>

		<view class="moments__post" v-for="(post,index) in spaceAndCommendsList" :key="index" :id="'post-'+index"  >
			<view class="post-left">
				<image class="post_header" :src="post.space.user.avatar"></image>
			</view>

			<view class="post_right">
				<text class="post-username">{{post.space.user.username}}</text>
				<view id="paragraph" class="paragraph myReviews">{{post.space.reviews}}</view>
				<!-- 相册 -->
				<view class="thumbnails">
					<view class="pmy-gallery" >
						<image class="me"  :src="post.space.img" @tap="previewImage(post.space.img,index)"></image>
					</view>
				</view>
				<!-- 资料条 -->
				<view class="toolbar">
					<view class="timestamp">{{post.space.gmtTime}}</view>
					<view class="like" @tap="like(index)">
						<image :src="post.islike===0?'../../static/index/islike.png':'../../static/index/like.png'"></image>
					</view>
					<view class="comment" @click="checkMe(post.space.id)">
						<image src="../../static/index/comment.png"></image>
					</view>
				</view>
				<!-- 赞／评论区 -->
				<view class="post-footer">
					<view class="footer_content">
						<image class="liked" src="../../static/index/liked.png"></image>
						<text class="nickname" v-for="(user,index_like) in post.like" :key="index_like">{{user.username}}</text>
					</view>
					<view class="footer_content" v-for="(comment,comment_index) in post.commentsList" :key="comment_index" @tap="reply(index,comment_index)">
						<text class="comment-nickname">{{comment.user.username}}: <text class="comment-content">{{comment.reviews}}</text></text>
					</view>
				</view>
			</view>
			<!-- 结束 post -->
		</view>

		<view class="foot" v-show="showInput">
			<chat-input @send-message="send_comment" @blur="blur" :focus="focus" :placeholder="input_placeholder"></chat-input>
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>

</template>

<script>
	import chatInput from '../../components/im-chat/chatinput.vue'; //input框
	import postData from '../../common/index/index.post.data.js';//朋友圈数据
	import {userInfo,forum,pubComment} from '@/utils/api.js';
	export default {
		components: {
			chatInput
		},
		data() {
			return {
				posts: postData,//模拟数据
				user:'',
				finalId:'',
				message:'',
				spaceAndCommendsList:{},
				index: '',
				comment_index: '',

				input_placeholder: '评论', //占位内容
				focus: false, //是否自动聚焦输入框
				is_reply: false, //回复还是评论
				showInput: false, //评论输入框

				screenHeight: '', //屏幕高度(系统)
				platform: '',
				windowHeight: '' ,//可用窗口高度(不计入软键盘)
				
				loadMoreText: "加载中...",
				showLoadMore: false,
				forum:{}
			}
		},
		mounted() {
			uni.getStorage({
				key: 'posts',
				success: function (res) {
					this.posts = res.data;
				}
			});

		},
		onLoad() {
			this.getUserInof();
			this.getForUmDetail();
			uni.getSystemInfo({ //获取设备信息
				success: (res) => {
					this.screenHeight = res.screenHeight;
					this.platform = res.platform;
				}
			});
			uni.startPullDownRefresh();
			wx.showToast({
				title:'数据加载中',
				icon: 'loading',
				duration: 1000,
			})
		},
		onShow() {
			uni.onWindowResize((res) => { //监听窗口尺寸变化,窗口尺寸不包括底部导航栏
				if(this.platform === 'ios'){
					this.windowHeight = res.size.windowHeight;
					this.adjust();
				}else{
					if (this.screenHeight - res.size.windowHeight > 60 && this.windowHeight <= res.size.windowHeight) {
						this.windowHeight = res.size.windowHeight;
						this.adjust();
					}
				}
			});
			this.getUserInof();
			this.getForUmDetail();
		},
		onHide() {
			uni.offWindowResize(); //取消监听窗口尺寸变化
		},
		onUnload() {
			this.max = 0,
				this.data = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},
		onReachBottom() { //监听上拉触底事件
			this.showLoadMore = true;
			setTimeout(() => {
				//获取数据
				if (this.posts.length < 20){//测试数据
					this.posts = this.posts.concat(this.posts);
				}else{
					this.loadMoreText = "暂无更多";
				}
			}, 1000);
		},
		onPullDownRefresh() { //监听下拉刷新动作
			// 这里获取数据
			setTimeout(function() {
				//初始化数据
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		},
		onNavigationBarButtonTap(e) {//监听标题栏点击事件
			if (e.index == 0) {
				this.navigateTo('../publish/publish')
			}
		},
		methods: {
			getForUmDetail(){
				forum().then((res)=>{
						this.spaceAndCommendsList=res.data.spaceAndCommendsList;
					})
			}, 
			test(){
				this.navigateTo('../test/test');
			},
			navigateTo(url) {
				uni.navigateTo({
					url: url
				});
			},
			like(index) {
				if (this.posts[index].islike === 0) {
					this.posts[index].islike = 1;
					this.posts[index].like.push({
						"uid": this.user_id,
						"username": "," + this.username
					});
				} else {
					this.posts[index].islike = 0;
					this.posts[index].like.splice(this.posts[index].like.indexOf({
						"uid": this.user_id,
						"username": "," + this.username
					}), 1);
				}
			},
			comment(index) {
				this.showInput = true; //调起input框
				this.focus = true;
				this.index = index;
			},
			adjust() { //当弹出软键盘发生评论动作时,调整页面位置pageScrollTo
				return;
				uni.createSelectorQuery().selectViewport().scrollOffset(res => {
					var scrollTop = res.scrollTop;
					let view = uni.createSelectorQuery().select("#post-" + this.index);
					view.boundingClientRect(data => {

						uni.pageScrollTo({
							scrollTop: scrollTop - (this.windowHeight - (data.height + data.top + 45)), //一顿乱算
							// scrollTop: 50, 
							duration: 300
						});
					}).exec();
				}).exec();
			},
			reply(index, comment_index) {
				this.is_reply = true; //回复中
				this.showInput = true; //调起input框
				let replyTo = this.posts[index].comments.comment[comment_index].username;
				this.input_placeholder = '回复' + replyTo;
				this.index = index; //post索引
				this.comment_index = comment_index; //评论索引
				this.focus = true;
			},
			blur: function() {
				this.init_input();
			},
			
			checkMe(index){
				this.finalId = index;
				this.showInput=true
			},
			send_comment(message) {
				let data={
					'userId':this.user.id,
					'spaceId':this.finalId,
					'reviews':message.content
				}
				pubComment(data).then((res)=>{
					if(res.code==20000){
						// wx.redirectTo({
						// 	url:'./forum'
						// })
						this.getForUmDetail();
					}
				})
				this.init_input();
			},
			
			init_input() {
				this.showInput = false;
				this.focus = false;
				this.input_placeholder = '评论';
				this.is_reply = false;
			},
			previewImage(uri,index) {
				let imgList = [];
				imgList[0]=uri;
				uni.previewImage({
					current: '0',
					urls: imgList
				});
			},
			getUserInof(){
				userInfo().then((res)=>{
					this.user=res.data.user
					this.$set(this.user, 'avatar', res.data.user.avatar)
				})
			},
			toPublish(){
				uni.navigateTo({
					url:'./publish'
				})
			}
		}
	}
</script>

<style scoped>
	@import url("../../common/index/index.css");
	.myReviews{
		margin-top: 5rpx;
		margin-left: 7rpx;
	}
	.me{
		margin-top: 20rpx;
		width: 400rpx;
		height: 280rpx;
		image-rendering: -moz-crisp-edges;
		image-rendering: -o-crisp-edges;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges;
		-ms-interpolation-mode: nearest-neighbor;
		
	}
</style>
