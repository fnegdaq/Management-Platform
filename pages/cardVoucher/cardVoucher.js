// pages/cardVoucher/cardVoucher.js
var app = getApp();
var api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: '0',
    operation: '-1',
    windowWidth: app.systemInfo.windowWidth,
    windowHeight: app.systemInfo.windowHeight,
  },

  //头部切换
  cardTap: function (e) {
    let page = this;
    let id = e.currentTarget.dataset.id;
    page.setData({
      status: id
    })
    switch (id) {
      case '0':
        page.undoList();
        break;
      case '1':
        page.ingList();
        break;
      case '2':
        page.finishList();
        break;
    }
  },

  //未开始的优惠券
  undoList: function () {
    let page = this;
    api.couponUndo({
      success: (res) => {
        if (res.data.code == 0) {
          for (var i in res.data.data.list) {
            res.data.data.list[i].ind = i;
          }
          page.setData({
            undoList: res.data.data.list
          })
        }else{
          wx.showToast({
            title:res.data.msg,
            icon:'none',
            duration:1500
          })
        }
      }
    })
  },

  //进行中的优惠券
  ingList: function (e) {
    let page = this;
    api.couponIng({
      success: (res) => {
        if (res.data.code == 0) {
          for (var i in res.data.data.list) {
            res.data.data.list[i].ind = i;
          }
          page.setData({
            ingList: res.data.data.list
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },

  //已失效的优惠券
  finishList: function () {
    let page = this;
    api.couponFinish({
      success: (res) => {
        if (res.data.code == 0) {
          for (var i in res.data.data.list) {
            res.data.data.list[i].ind = i;
          }
          page.setData({
            finishList: res.data.data.list
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },


  //操作
  operationTap: function (e) {
    var id = e.currentTarget.dataset.index;
    wx.setStorageSync('cardId', id)
    this.setData({
      operation: id
    })
  },

  operationTapHid: function () {
    var oper = this.data.operation;
    var cardId = wx.getStorageSync('cardId');
    if (oper == cardId) {
      this.setData({
        operation: -1
      })
    }
  },

  //编辑
  editTap: function (e) {
    var id = e.currentTarget.dataset.cardid;
    var oper = this.data.operation;
    this.setData({
      operation: -1
    })
    const data = {
      id
    }
    api.editCoupon({
      data,
      success:function(res){
        console.log(res)
        if(res.data.code == 0){
          wx.setStorageSync('editContent',res.data.data.coupon)
          wx.navigateTo({
            url:"/pages/cardVoucher/editCard/editCard"
          })
        }
      }
    })
  },

  //删除
  delTap: function (e) {
    let Id = e.currentTarget.dataset.cardid;
    var oper = this.data.operation;
    this.setData({
      operation: -1
    })
    wx.showModal({
      title: "提示",
      content: '确认要删除该卡券吗？',
      success: function (res) {
        if (res.confirm) {
          const data = {
            Id
          }
          api.editCoupon({
            data,
            success: function (res) {
              wx.showToast({
                title: res.data.msg,
                icon: "none",
                duration: 1500
              })
            }
          })
        }
      }
    })

  },

  //添加卡券
  addTap: function () {
    wx.navigateTo({
      url: '/pages/cardAdd/cardAdd'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this;
    page.undoList();
  },

  onShow:function(){
    if (wx.getStorageSync('couponList') != "" || wx.getStorageSync('couponLists') != ""){
      wx.redirectTo({
        url:'/pages/cardVoucher/cardVoucher'
      })
      wx.removeStorageSync('couponList');
      wx.removeStorageSync('couponLists');
    }
  }
})