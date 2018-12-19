// pages/seckillSelectedGoods/seckillSelectedGoods.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: app.systemInfo.windowWidth,
    windowHeight: app.systemInfo.windowHeight,
    isShowSlectView:false,
    scrollHeight:1020,
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
    var width = wx.getSystemInfoSync().windowWidth
    var height = wx.getSystemInfoSync().windowHeight
    var rpx = 750 / width
    this.setData({
      scrollHeight: Math.round(height * rpx - 98 - 220),
    })
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
  
  },

  //开关 选择分类
  selectOrderStatusTap:function(){
    if (this.data.isShowSlectView){
      this.setData({
        isShowSlectView:false,
      })
    }else{
      this.setData({
        isShowSlectView: true,
      })
    }
  }
  
})