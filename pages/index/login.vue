<template>
<view class="t-login">
		<!-- 页面装饰图片 -->
		<image class="img-a" src="@/static/2.png"></image>
		<image class="img-b" src="@/static/3.png"></image>
		<!-- 标题 -->
		<view class="t-b">欢迎回来</view>
		<form class="cl">
			<view class="t-a">
				<text class="iconfont icon-yonghu1"></text>
				<input type="text" name="text" placeholder="请输入用户名" maxlength="8" v-model="username" />
			</view>
			<view class="t-a">
				<text class="iconfont icon-mima2"></text>
				<input type="password" name="password" placeholder="请输入密码" maxlength="6" v-model="password" />
			</view>
			<view class="t-a">
				<text class="iconfont icon-yanzhengma1"></text>
				<input class="jiaoyan" type="text" name="code" v-model="isCode" maxlength="4" placeholder="请输入验证码" />
				<text class="check-number" @click="nextOne">{{code}}</text>
			</view>
			<button @click="login">登 录</button>
			<view class="toRegister">
				<text>没有账号？</text>
				<navigator url="./register" style="color: #007AFF;">快速注册</navigator>
			</view>
		</form>
	</view>


</template>

<script>
	import {login,userInfo} from '../../utils/api.js'
	export default {
		data() {
			return {
				code: '',
				username: '',
				password: '',
				isCode:'',
			}
		},
		onLoad: function(options) {
			this.createCode();
			this.showInfo();
		},
		methods: {
			nextOne() {
				this.createCode()
			},
			createCode() {
				var code;
				code = '';
				var codeLength = 4;
				var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
					'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
					'u', 'v', 'w', 'x', 'y', 'z');
				for (var i = 0; i < codeLength; i++) {
					var index = Math.floor(Math.random() * 36);
					code += random[index];
				}
				this.code = code;
			},
			login() {
				if(this.isCode==this.code){
					let data={
						username:this.username,
						password:this.password
					}
					login(data).then((res)=>{
						if(res.code==20000){
							wx.setStorageSync('auth',res.data.token)
							userInfo().then((res)=>{
								wx.setStorageSync('userId',res.data.user.id)
							})
							wx.showToast({
								title:'登录成功',
								icon: 'none',
								duration: 1000,
							})
							wx.switchTab({
								url:'./index'
							})
							
						}else{
							wx.showToast({
								title:'用户名或密码错误',
								icon: 'none',
								duration: 1000,
							})
						}
					})
				}else{
					wx.showToast({
						title:'验证码错误',
						icon: 'none',
						duration: 1500,
					})
				}
			},
			
			showInfo(){
				userInfo().then((res)=>{
					this.username=res.data.user.username
				})
			}
		}
	}
</script>

<style scoped>
	.img-a {
		position: absolute;
		width: 100%;
		top: -280rpx;
		right: -100rpx;
	}
	.img-b {
		position: absolute;
		width: 50%;
		bottom: 0;
		left: -50rpx;
		margin-bottom: 10rpx;
	}
	.t-login {
		height: 100%;
		width: 560rpx;
		margin: 0 auto;
		font-size: 28rpx;
		color: #000;
	}
	
	.t-login button {
		font-size: 28rpx;
		background: #5677fc;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
		box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
	}
	
	.t-login input {
		padding: 0 20rpx 0 120rpx;
		height: 76rpx;
		line-height: 90rpx;
		margin-bottom: 45rpx;
		background: #f8f7fc;
		border: 1px solid #e9e9e9;
		font-size: 28rpx;
		border-radius: 50rpx;
	}
	
	.t-login .t-a {
		position: relative;
	}
	.t-a .jiaoyan{
		width: 260rpx;
		padding: 0 20rpx 0 120rpx;
		height: 76rpx;
		line-height: 90rpx;
		margin-bottom: 45rpx;
		background: #f8f7fc;
		border: 1px solid #e9e9e9;
		font-size: 28rpx;
		border-radius: 50rpx;
	}
	.t-login .t-a text {
		width: 40rpx;
		height: 45rpx;
		position: absolute;
		left: 40rpx;
		top: 18rpx;
		border-right: 2rpx solid #dedede;
		padding-right: 20rpx;
		font-size: 40rpx;
		color: #757575;
	}
	
	.t-login .t-b {
		text-align: left;
		font-size: 46rpx;
		color: #000;
		padding: 400rpx 0 120rpx 0;
		font-weight: bold;
	}
	
	.check-number {
		/* background-color: #ededf0; */
		color: #000000;
		border-radius: 6rpx;
		font-size: 42rpx;
		text-align: center;
		margin-left: 400rpx;
	}
	.t-login .t-c {
		position: absolute;
		right: 22rpx;
		top: 22rpx;
		background: #5677fc;
		color: #fff;
		font-size: 24rpx;
		border-radius: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		padding: 0 25rpx;
	}
	
	.t-login .t-d {
		text-align: center;
		color: #999;
		margin: 80rpx 0;
	}
	
	.t-login .t-e {
		text-align: center;
		width: 250rpx;
		margin: 80rpx auto 0;
	}
	
	.t-login .t-g {
		float: left;
		width: 50%;
	}
	
	.t-login .t-e image {
		width: 50rpx;
		height: 50rpx;
	}
	
	.t-login .t-f {
		text-align: center;
		margin: 200rpx 0 0 0;
		color: #666;
	}
	
	.t-login .t-f text {
		margin-left: 20rpx;
		color: #aaaaaa;
		font-size: 27rpx;
	}
	
	.t-login .uni-input-placeholder {
		color: #000;
	}
	
	.cl {
		zoom: 1;
	}
	
	.cl:after {
		clear: both;
		display: block;
		visibility: hidden;
		height: 0;
		content: '\20';
	}
	.toRegister {
		display: flex;
		margin-top: 10rpx;
		font-size: 29rpx;
		margin-left: 20rpx;
		position: relative;
		z-index: 10;
	}
</style>
