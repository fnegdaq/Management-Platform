// pages/orderDetail/orderDetail.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: app.systemInfo.windowWidth,
    windowHeight: app.systemInfo.windowHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let types = options.types;
    var price = '110.00';
    var arr = price.split('.');
    this.setData({
      types: types,
      price_begin: arr[0],
      price_end: arr[1],
    })
  },


  refusedTap: function (){
    wx.showToast({
      title: "余额不足",
      icon: "none",
      duration: 1500
    })
  },

  sendout: function () {
    wx.navigateTo({
      url: '/pages/logisticsInfo/logisticsInfo',
    })
  }
 })