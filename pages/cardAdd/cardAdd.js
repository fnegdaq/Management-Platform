// pages/cardAdd/cardAdd.js
var app = getApp();
var api = require('../../utils/api.js');
Page({
  data: {
    year: "",
    month: "",
    day: "",
    years: "",
    months: "",
    days: "",
    windowWidth: app.systemInfo.windowWidth,
    windowHeight: app.systemInfo.windowHeight,
  },

  onLoad: function (options) {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    this.setData({
      years: currPage.data.years,
      months: currPage.data.months,
      days: currPage.data.days,
      year: currPage.data.year,
      month: currPage.data.month,
      day: currPage.data.day
    })
  },
  
  //文本框输入信息
  bindinput:function(e){
    var name = e.detail.value;
    this.setData({
      name
    })
  },
  bindinput2: function (e) {
    var num = e.detail.value;
    this.setData({
      num
    })
  },
  bindinput3: function (e) {
    var customeMoney = e.detail.value;
    this.setData({
      customeMoney
    })
  },
  bindinput4: function (e) {
    var couponMoney = e.detail.value;
    this.setData({
      couponMoney
    })
  },

  //选择日期
  dateTap: function () {
    wx.navigateTo({
      url: "/pages/cardAdd/date-picker/date-picker"
    })
  },
  dateTap2: function () {
    wx.navigateTo({
      url: "/pages/cardAdd/date/date"
    })
  },

  //保存卡券
  saveTap:function(){
    var names = this.data.name;
    var nums = this.data.num;
    var customeMoneys = this.data.customeMoney;
    var couponMoneys = this.data.couponMoney;
    var years = this.data.years;
    var year = this.data.year;
    var date = this.data.year+'.'+this.data.month+'.'+this.data.day;
    var dates = this.data.years + '.' + this.data.months + '.' + this.data.days;
    if(names == "" || names == undefined){
      wx.showModal({
        title:'提示',
        content:'请填写卡券的名称',
        showCancel:false
      })
    } else if (nums == "" || nums == undefined){
      wx.showModal({
        title: '提示',
        content: '请填写卡券的数量',
        showCancel: false
      })
    } else if (customeMoneys == "" || customeMoneys == undefined) {
      wx.showModal({
        title: '提示',
        content: '请填写最低消费金额',
        showCancel: false
      })
    } else if (couponMoneys == "" || couponMoneys == undefined) {
      wx.showModal({
        title: '提示',
        content: '请填写优惠金额',
        showCancel: false
      })
    } else if (year == "" || year == undefined) {
      wx.showModal({
        title: '提示',
        content: '请填写卡券的开放日期',
        showCancel: false
      })
    } else if (years == "" || years == undefined) {
      wx.showModal({
        title: '提示',
        content: '请填写卡券的结束日期',
        showCancel: false
      })
    } else {
      const data = {
        name: names,
        total_count: nums,
        min_price: customeMoneys,
        sub_price: couponMoneys,
        begin_time:date,
        end_time:dates
      }
      api.addCoupon({
        data,
        method: 'POST',
        query: {
          store_id: wx.getStorageSync('store_id')
        },
        success:function(res){
          if (res.data.code == 0){
            wx.setStorageSync('couponLists',1);
            wx.navigateBack({})
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500
            })
          }
        }
      })
    }
  },


})