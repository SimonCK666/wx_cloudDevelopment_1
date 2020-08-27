// pages/me/me.js
Page({

/**
 * 页面的初始数据
 */
data: {
    userInfo: {}
},

onGetUserInfo(e) {
    console.log(e)
    let userInfo = e.detail.userInfo
    // 需要调用云函数，获取用户的openid
    wx.cloud.callFunction({
        name: 'login',
        complete: res=> {
            console.log(res)
            userInfo.openid = res.result.openid
            this.setData({
                userInfo
            })
            console.log(userInfo.openid)
        }
    })
},

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {

},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function () {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function () {

},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function () {

},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function () {

},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function () {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function () {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function () {

}
})