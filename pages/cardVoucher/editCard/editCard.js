// pages/cardVoucher/editCard/editCard.js
let app = getApp();
let api = require('../../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //文本框输入信息
  bindinput: function (e) {
    let names = e.detail.value;
    this.setData({
      names
    })
  },
  bindinput2: function (e) {
    let nums = e.detail.value;
    this.setData({
      nums
    })
  },
  bindinput3: function (e) {
    let customeMoneys = e.detail.value;
    this.setData({
      customeMoneys
    })
  },
  bindinput4: function (e) {
    let couponMoneys = e.detail.value;
    this.setData({
      couponMoneys
    })
  },

  //选择日期
  dateTap: function (e) {
    wx.navigateTo({
      url: "/pages/cardAdd/date-picker/date-picker"
    })
  },
  dateTap2: function () {
    wx.navigateTo({
      url: "/pages/cardAdd/date/date"
    })
  },

  //保存
  saveTap: function () {
    let page = this;
    let couponId = page.data.id;
    let name = page.data.names;
    let total_count = page.data.nums;
    let min_price = page.data.customeMoneys;
    let sub_price = page.data.couponMoneys;
    let begin_time = page.data.date;
    let end_time = page.data.dates;
    const data = {
      id: couponId,
      name,
      total_count,
      min_price,
      sub_price,
      begin_time,
      end_time
    }
    api.addCoupon({
      data,
      method: 'POST',
      query: {
        store_id: wx.getStorageSync('store_id')
      },
      success: function (res) {
        if(res.data.code == 0){
          wx.navigateBack({})
          wx.setStorageSync('couponList',1)
        }
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500
        })
      
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this;
    let editCoupon = wx.getStorageSync('editContent');
    let id = editCoupon.id;
    let names = editCoupon.name;
    let nums = editCoupon.total_count;
    let customeMoneys = editCoupon.min_price;
    let couponMoneys = editCoupon.sub_price;
    let date = editCoupon.begin_time;
    let dates = editCoupon.end_time;
    page.setData({
      id,
      names,
      nums,
      customeMoneys,
      couponMoneys,
      date,
      dates
    })
    if (wx.getStorageSync('dateid') == "" || wx.getStorageSync('datesid') == "") {
      page.setData({
        date_begin: 0,
        date_end: 0
      })
    } 
  },
  onShow:function(){
    var page = this;
    if (wx.getStorageSync('dateid') != "") {
      var _date = wx.getStorageSync('_date');
      page.setData({
        date_begin: 1,
        date_end: 0,
        date:_date
      })
      wx.setStorageSync('dateid', '')
    } else if (wx.getStorageSync('datesid') != ""){
      var _dates = wx.getStorageSync('_dates');
      page.setData({
        date_begin: 0,
        date_end: 1,
        dates:_dates
      })
      wx.setStorageSync('datesid', '')
    }
  }
})