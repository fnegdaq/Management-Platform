// pages/seckillAdd/seckillAdd.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    purchaseLimit:false,
    purchaseLimitCount:"",
    windowHeight: app.systemInfo.windowHeight,
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
  
  },
  //改变限购状态
  changePurchaseLimit:function(){
    if (this.data.purchaseLimit){
      this.setData({
        purchaseLimit: false,
        purchaseLimitCount: "",
      })
    }else{
      this.setData({
        purchaseLimit: true,
        purchaseLimitCount: "不限",
      })
    }
  },
  //打开选择商品
  goToSelectedGoods: function () {
    wx.navigateTo({
      url: '/pages/seckillSelectedGoods/seckillSelectedGoods'
    })
  },
  //打开秒杀日期
  goToDate: function(){
    wx.navigateTo({
      url: '/pages/seckillDate/seckillDate'
    })
  },
  //打开选择时间
  goToSelectTime: function () {
    wx.navigateTo({
      url: '/pages/seckillSelectTime/seckillSelectTime'
    })
  },

})