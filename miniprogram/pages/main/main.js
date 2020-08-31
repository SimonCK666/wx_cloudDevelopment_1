// pages/main/main.js
const app =  getApp();
const db = wx.cloud.database()
  
Page({

    /**
     * 页面的初始数据
     */
    data: {
        books: [],
        page: 0
    },

    onPullDownRefresh() {
        console.log('下拉刷新')
        this.getList(true)
    },

    onReachBottom() {
        console.log('触底了,加载下一页')
        this.setData({
            page: this.data.page + 1
        }), ()=>{
            this.getList()
        }
    },

    getList(init) {
        wx.showLoading()
        // init 是不是初始化 初始化不考虑分页
        if (init) {
            this.setData({
                page: 0
            })
        }
        // 每页3个
        // 第一页： 0-3
        // 第二页： 3-6
        const PAGE = 3
        const offset = this.data.page * PAGE

        let ret = db.collection('doubanbooks')
                    .orderBy('create_time', 'desc')
        if(this.data.page > 0) {
            // 不是第一页
            ret = ret.skip(offset)
        }
        ret = ret.limit(PAGE).get().then(res =>{
            if(init) {
                // console.log(res)
                this.setData({
                    books: res.data
                })
            } else {
                // 加载下一项
                this.setData({
                    books: [...this.data.books, ...res.data]
                })
            }
            wx.hideLoading()
            
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getList(true)
        // db.collection('doubanbooks')
        //     .orderBy('create_time', 'desc')
        //     .get().then(res =>{
        //         // console.log(res)
        //         this.setData({
        //             books: res.data
        //         })
        // })
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