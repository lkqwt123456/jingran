<template>
	<div class="controller">
		<div class="border">
			<div class="top">
				<div class="hello">欢迎光临</div>
				<div class="title">让我们创建你的账户 !</div>
			</div>

			<!-- 输入框 -->
			<div class="footer">
				<input type="text" v-model="username" placeholder="请输入用户名" />
				<input type="password" v-model="password" placeholder="请输入密码" id="nums" @blur="checkNums"
					maxlength="6" />
				<input type="password" v-model="password1" placeholder="确认密码" maxlength="6" />
				<button class="btn" @click="toIndex">注册</button>
			</div>
		</div>
	</div>
</template> 

<script>
	import {
		register,
		userInfo
	} from '../../utils/api.js'
	export default {
		name: "",
		data() {
			return {
				username: '',
				password: '',
				password1: ''
			};
		},
		methods: {
			checkNums() {
				let value = this.isNumber(this.password)
				if (value) {

				} else {
					wx.showToast({
						title: '密码请输入数字',
						icon: 'none',
						duration: 1000,
					})
				}
			},
			isNumber(val) {
				if (val == "" || isNaN(val)) {
					return false
				} else {
					return true
				}

			},
			toIndex() {
				uni.showLoading({
					title: "请喝杯奶茶稍等一下",
				});
				setTimeout(function() {
					uni.hideLoading();
				}, 2000);
				if (this.password == this.password1) {
					let isTure = this.isNumber(this.password1)
					if (isTure) {
						let data = {
							username: this.username,
							password: this.password1
						}
						register(data).then((res) => {
							wx.setStorageSync('auth', res.data.token)
							if (res.data.token) {
								userInfo().then((res)=>{
									wx.setStorageSync('userId',res.data.user.id)
								})
								wx.switchTab({
									url: './index'
								})
							}
						})
					} else {
						wx.showToast({
							title: '密码请输入数字',
							icon: 'none',
							duration: 1000,
						})
					}
				} else {
					wx.showToast({
						title: '输入密码不一致',
						icon: 'none',
						duration: 1000,
					})
				}
			},
		},

	};
</script>

<style>
	.controller {
		background-color: #f2f2f2;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.border {
		width: 80%;
		border: 40rpx;
		margin-top: 45px;
		background-color: #eee9e9;
		border-radius: 40rpx;
	}

	.top {
		margin-top: 100rpx;
		padding-left: 40rpx;
		width: 100%;
		height: 200rpx;
		/* background-color: red; */
	}

	.hello {
		font-size: 75rpx;
		color: black;
		font-weight: bold;
		font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	}

	.title {
		margin-top: 20rpx;
		font-weight: bold;
		font-size: 34rpx;
		color: black;
		font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	}

	/* 底部 */
	.footer {
		width: 100%;
		/* background-color: antiquewhite; */
	}

	.footer input {
		margin: 32rpx auto;
		width: 90%;
		height: 120rpx;
		border-radius: 30rpx;
		background-color: #fcfcfc;
		opacity: 0.75;
		padding-left: 25rpx;
		color: black;
	}

	.btn {
		margin: 60rpx auto;
		width: 80%;
		height: 95rpx;
		border-radius: 30rpx;
		background-color: #eee685;
		opacity: 1;
	}
</style>
