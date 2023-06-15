<template>
	<view class="">
		<view class="register_box">
			<view class="input_box">
				<view class="item">
					<view class="wz"> 旧密码</view>
					<view class="input_con">
						<view class="input" @tap="TapISoldPwd()">
							<set-passkey :show="IsOldKeyboard" :isYan='ISold_pwd' placeholder="请输入旧密码" :styles='styles'
								@finish="TapISoldPwd" v-model="old_pwd1" />
						</view>
						<view class="yan" @tap="ISold_pwd = !ISold_pwd">
							<image v-if="ISold_pwd" src="/static/Setpasskey/index_yan1.png" mode=""></image>
							<image v-else src="/static/Setpasskey/index_yan2.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="item">
					<view class="wz"> 新密码 </view>
					<view class="input_con">
						<view class="input" @tap="TapISnewPwd1()">
							<set-passkey :show="IsNewKeyboard1" :isYan='ISnew_pwd1' placeholder="请输入新密码" :styles='styles'
								@finish="TapISnewPwd1" @change="new_keys1" />
						</view>
						<view class="yan" @tap="ISnew_pwd1 = !ISnew_pwd1">
							<image v-if="ISnew_pwd1" src="/static/Setpasskey/index_yan1.png" mode=""></image>
							<image v-else src="/static/Setpasskey/index_yan2.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="item">
					<view class="wz"> 确认新密码 </view>
					<view class="input_con">
						<view class="input" @tap="TapISnewPwd2()">
							<set-passkey :show="IsNewKeyboard2" :isYan='ISnew_pwd2' placeholder="请输入新密码" :styles='styles'
								@finish="TapISnewPwd2" @change="new_keys2" />
						</view>
						<view class="yan" @tap="ISnew_pwd2 = !ISnew_pwd2">
							<image v-if="ISnew_pwd2" src="/static/Setpasskey/index_yan1.png" mode=""></image>
							<image v-else src="/static/Setpasskey/index_yan2.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="btn_box">
			<view class="jiaoyisuo_btn1" @tap="to_submit()">
				确认修改
			</view>
		</view>
	</view>
</template>

<script>
	import {updateUserPass} from '../../utils/api.js'
	export default {
		components: {
			// Setpasskey
		},

		data() {
			return {
				
				uid:'',
				
				
				IsOldKeyboard: false, //是否显示原始密码输入框 
				IsNewKeyboard1: false, //是否显示新密码输入框 
				IsNewKeyboard2: false, //是否显示确认新密码输入框 

				old_pwd1: '', //原始密码
				new_pwd1: '', //新密码1
				new_pwd2: '', //确认新密码2

				ISold_pwd: false, //原始密码显示
				ISnew_pwd1: false, //新密码1显示
				ISnew_pwd2: false, //确认新密码2显示

				styles: 'justify-content: flex-end;' //样式因为需要他
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: '修改密码'
			})
			
			this.uid=wx.getStorageSync("userId");
		},
		methods: {
			TapISoldPwd() { //原始密码输入完成事件
				this.IsOldKeyboard = !this.IsOldKeyboard
				this.IsNewKeyboard1 = false
				this.IsNewKeyboard2 = false
			},
			TapISnewPwd1() { //原始新密码输入完成事件
				this.IsOldKeyboard = false
				this.IsNewKeyboard1 = !this.IsNewKeyboard1
				this.IsNewKeyboard2 = false
			},
			TapISnewPwd2() { //确认新密码输入完成事件
				this.IsOldKeyboard = false
				this.IsNewKeyboard1 = false
				this.IsNewKeyboard2 = !this.IsNewKeyboard2
			},

			new_keys1(ev) { //获取的新密码的值
				this.new_pwd1 = ev
			},
			new_keys2(ev) { //获取的确认新密码的值
				this.new_pwd2 = ev
			},




			// 确认修改
			to_submit() {
				let that = this;
				let old_pwd1 = this.old_pwd1.trim().toString()
				let new_pwd1 = this.new_pwd1.trim().toString()
				let new_pwd2 = this.new_pwd2.trim().toString()
				let paramr = {
					old_pwd1,
					new_pwd1,
					new_pwd2
				};
				if (!old_pwd1 || !new_pwd1 || !new_pwd2) return this.showToastS('请输入密码')
				if (new_pwd1 != new_pwd2) return this.showToastS('两次新密码输入不一致')
				
				let body = {
					'userId':this.uid,
					'oldPassword':old_pwd1,
					'password':new_pwd2
				}
				updateUserPass(body).then((res)=>{
					this.showToastS('修改密码成功')
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1000)
					
				})
				
			},
			//简单封装的弹窗提示
			
			showToastS(title) {
				uni.showToast({
					icon: 'success',
					title
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F6FB;
		width: 100%;

		box-sizing: border-box;
	}

	.jiaoyisuo_btn1 {
		width: 90%;
		margin: 0 auto;
		padding: 8px 0;
		box-sizing: border-box;
		background: #19BE6B;
		box-shadow: 0px 8rpx 22rpx 1px rgba(8, 75, 215, 0.32);
		border-radius: 44rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
	}

	.register_box {
		width: 100%;
		background-color: #FFFFFF;
		padding: 0 20rpx;
		box-sizing: border-box;

		.input_box {
			margin-top: 30rpx;
			width: 100%;

			.item {
				height: 120rpx;
				display: flex;
				align-items: center;
				width: 100%;
				padding: 20rpx;
				box-sizing: border-box;
				border-bottom: 1rpx solid #f4f4f4;

				font-size: 30rpx;
				font-family: PingFang SC;

				&:last-child {
					border-bottom: none;
				}


				.wz {
					font-weight: bold;
					width: 180rpx;
					color: #37416B;
				}

				.input_con {

					width: calc(100% - 180rpx);
					display: flex;
					align-items: center;

					.input {
						width: calc(100% - 70rpx);
						text-align: right;
					}

					.yan {
						width: 70rpx;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						height: 34rpx;

						image {
							width: 44rpx;
							height: 34rpx;
						}
					}
				}

			}


		}
	}


	.Tips_box {
		width: 90%;
		margin: 0 auto;
		margin-top: 40rpx;
		display: flex;

		.left {
			width: 40rpx;

			image {
				width: 40rpx;
			}
		}

		.right {
			display: flex;
			padding-left: 20rpx;
			box-sizing: border-box;

			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #A5ABC3;
			flex-direction: column;

			text {
				margin-bottom: 20rpx;
			}
		}
	}

	.btn_box {
		margin-top: 80rpx;
	}
</style>
