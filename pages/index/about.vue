<template>
	<view class="about-page">
		<view class="statement">
			<view class="statement-title">
				<text>免责声明</text>
			</view>
			<view class="statement-content">
				<text>点击注册登录艮即代表你已经同意将账号密码缓存在本地以及加密服务器，非通过本小程序造成的任何账号密码相关问题与开发者无关。</text>
			</view>
		</view>
		
		<view class="privacy">
			<view class="privacy-title">
				<text>隐私声明</text>
			</view>
			<view class="privacy-content">
				<text>景冉小程序（以下简称“本程序”〕为广大旅游用户提供便携快捷的景点旅游活动的查询服务，用户可以在本小程序内进行热门景点组队活动的搜索，也可在本程序上搜索景点附近的各类优质旅馆，十分便捷。在您使用本小程序期间，我们需要您提供小部分隐私信息，该信息已通过小程序相关生态官方接口获取，具体条目如下:
				</text>
				<view class="">
					<text class="iconfont icon-1_round"></text>
					<text>小程序会获取用户性别年龄以及旅龄等相关隐私信息，该类信息会储存于开发者的加密数据库中进行多层加密保管，不会存在数据安全隐患。</text>
				</view>
				<view class="">
					<text class="iconfont icon-2_round"></text>
					<text>使用过程中，需要您提供自己注册过的账号和密码供系统登录。该部分信息还会通过对称加密传输至服务器。在您后期登录查询过程中，所产生的旅游经历信息，以及用户自己发表的动态信息、心得等相关信息将以文件形式保存至云端，便于导出云端数据，以及其他相关数据导出功能的实现。</text>
				</view>
				<view class="">
					<text class="iconfont icon-3_round"></text>
					<text>在使用本程序过程中，您所请求的或响应的所有信息，都将仅经过本程序后端服务器，无任何第三方可以以任何方式获取任何信息。</text>
				</view>
				<view class="">
					<text class="iconfont icon-4_round"></text>
					<text>本程序使用过程中，不会收集存储除用户账号密码、头像、用户自主发表的动态信息、用户部分自主填录的个人信息以外的任何信相关信息。</text>
				</view>
				<view class="">
					<text class="iconfont icon-5_round"></text>
					<text>本程序及开发者承诺，依据相关法律规定，按照隐私说明及指引的用途使用用户个人信息，不会未经用户同意将任何信息提供给第三方。</text>
				</view>
			</view>
		</view>
		
		<view class="about">
			<view class="about-title">
				<text>关于团队</text>
			</view>
			
			<view class="team-content">
				<view class="team">
				<text>小程序由<text class="iconfont icon-tuandui" style="color: #007AFF; font-size: 26rpx;"></text>20计科<text style="font-weight: 600;">杜徐强、</text>20信本
				<text style="font-weight: 600;">刘康、刘振鹏</text>
				共同开发，该项目属<text style="color: #007AFF;">AlgoriMind实验室。</text>
				</text>
				<view class="" style="margin-top: 6rpx;">
					AlgoriMind实验室系信息技术学院,由一群喜欢<text class="iconfont icon-aixin1" style="color: #ff0000;"></text>硬件、软件及物联网的学生组成，目前拥有成员20余人，团队主攻前端、后端、单片机、边缘计算、大数据及人工智能。
				</view>
				</view>
				
				<view class="team">
					<text class="iconfont icon-xunzhang" style="color: #aa5500;"></text>
					<text class="iconfont icon-xunzhang" style="color: #aa5500;"></text>
					<text>参加过多次教育部举办的互联网+、计算机设计大赛、电子硬件设计等比赛并为学校获奖。</text>
				</view>
				<view class="team">
					<text>【我们也十分欢迎对计算机软件和硬件有兴趣且有一定基础的同学加入进来】</text>
					<text class="iconfont icon-xianhua-evaluate_fill" style="color: #ff0000;"></text>
					<text class="iconfont icon-xianhua-evaluate_fill" style="color: #ff0000;"></text>
				</view>
				<view class="team">
					<text class="iconfont icon-weizhi" style="color: #55aaff; font-size: 28rpx;"></text>
					<text>日常驻地:信息科学楼(2教) -- N2211</text>
				</view>
			</view>		
		</view>
		
	</view>
</template>

<script>
</script>

<style scoped>
	page{
		background-color: #ececec;
	}
	.about-page{
		width: 92%;
		height: 1500rpx;
		margin: 20rpx auto;
		border: 1rpx solid #dddddd;
		border-radius: 16rpx;
	}
	.statement{
		margin-top: 20rpx;
	}
	.statement,
	.privacy,
	.about{
		margin-left: 20rpx;
		margin-top: 20rpx;
	}
	.statement-title text,
	.privacy-title text,
	.about-title text{
		border-left: 8rpx solid #FFDD28;
		padding-left: 12rpx;
		font-weight: 600;
	}
	.statement-content,
	.privacy-content{
		font-size: 26rpx;
		margin-top: 10rpx;
	}
	.privacy-content .iconfont{
		color: #55aa7f;
	}
	.team-content{
		font-size: 26rpx;
		margin-top: 10rpx;
	}
	.team{
		margin-top: 6rpx;
	}
</style>
