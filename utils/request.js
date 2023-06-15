const BASEURL = 'http://43.136.171.8:10001/';
// const BASEURL = 'http://127.0.0.1:10001';
 module.exports = {
    request:function(url,method,data){
        return new Promise((resolve, reject)=>{
            wx.request({
                url: BASEURL + url,
				method,
                data,
                header:{
                    auth:wx.getStorageSync('auth')
                },
                success:(res)=>{
                    if(res.statusCode === 200 || res.data.code === 20000){
                        resolve(res.data)
                        wx.hideLoading()
                    } else {
                        wx.showToast({
                            icon:'error',
                            title: res.Msg,
                        })
                        reject(res.Msg)
                    }
                },
                fail:(err)=>{
                    wx.showToast({
                        icon:'error',
                        title: '正在加载',
                    })
                    reject('正在加载')
                }
            })
        })
    }
}