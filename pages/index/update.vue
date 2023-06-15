<template>
	<view class="body">
		<view class="text">
			<text>请输入你的原密码</text>
			<input type="password">
		</view>
		<view class="psd">
			<text>请输入你的新密码</text>
			<input type="password">
		</view>
		<view class="psd">
			<text>请再次输入你的新密码</text>
			<input type="password">
		</view>
		<button>提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.body {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		position: absolute;
		top: 50%;
		transform: translateY(-60%);
		width: 100%;
		height: 600rpx;
		background-color: blue;
	}
		

	input {
		padding-left: 10rpx;
		margin-top: 20rpx;
		border: 1px solid #000;
		width: 260px;
	}
	button {
		width: 60%;

	}
</style>
