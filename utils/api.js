const {request} = require("./request.js") //引入封装好的js文件
 module.exports = {
	//用户登录
	login(params){
		return request('/user/login','POST',params)
	},
	//用户注册
	register(params){
		return request('/user/register','POST',params)
	},
	//获取用户信息
	userInfo(){
		return request('/user/getInfo','GET')
	},
	//获取所有轮播图
	banner(){
		return request('/jrBanner/getBanner','GET')
	},
	//获取所有景点
	allScenery(){
		return request('/jrScenery/getSceneryBasicInfo','GET')
	},
	//根据id获取景点详情页数据
	sceneryDetail(id,uid){
		return request('/jrScenery/getSceneryAllInfo/'+id+'/'+uid,'POST')
	},
	//获取景点推荐
	goodScenery(){
		return request('/jrScenery/getPartInfo','POST')
	},
	//获取住宿信息
	goodStay(){
		return request('/accommodation/getBasicAccommodationInfo','POST')
	},
	//获取美食推荐
	goodFood(){
		return request('/jrFoods/getLimitData','POST')
	},
	//获取所有食物
	food(){
		return request('/jrFoods/getInfoBySatute/1','GET')
	},
	foodDetail(fid,uid){
		return request('/jrFoods/getFoodDetail/'+fid+'/'+uid,'POST')
	},
	//获取所有水果
	fruit(){
		return request('/jrFoods/getInfoBySatute/0','GET')
	},
	//获取攻略
	tips(){
		return request('/jrStrategy/list','GET')
	},
	//根据id获取攻略详情页数据
	tipsDetail(id){
		return request('/jrStrategy/getOneAllInfoById/'+id,'POST')
	},
	//获取论坛数据
	forum(){
		return request('/space/getAll','GET')
	},
	// 上传头像
	changeImg(img) {
		return request('/user/changeImg','POST',img)
	},
	// 获取收藏列表
	getCollect(uid,state) {
		return request(`/store/list/${uid}/${state}`,'GET')
	},
	
	//发布论坛
	pubSpace() {
		return request(`/space/upSpace`,'POST')
	},
	
	//更新用户
	updateUser() {
		return request(`/user/getNew`,'GET')
	},
	//更新用户密码
	updateUserPass(Body){
		return request(`/user/updatePass`,'POST',Body)
	},
	//修改昵称
	updateUserName(Data){
		return request(`/user/changeName`,'POST',Data)
	},
	// 酒店详情
	getStay(accommodationId,uid) {
		return request(`/accommodation/getDetailAccommodationInfo/${accommodationId}/${uid}`,'POST')
	},
	// 收藏
	uqdateCollect(data) {
		return request(`/store/addStore`,'POST',data)
	},
	// 取消收藏
	delCollect(e) {
		return request('/store/delStore','POST',e)
	},
	pubComment(data){
			return  request('/comments/addCommend','POST',data)
	},
	//搜索框
	searchItems(data){
		return  request('/jrScenery/search','POST',data)
	}
 }	
