//index.js

const utils = require('../../utils/utils.js');

const app = getApp();

Page({
  data: {
    tabBar: 0,
    isSelected: false,
    windowWidth: app.systemInfo.windowWidth,
    windowHeight: app.systemInfo.windowHeight,
    nav_title: '电商管理后台',
  },

  onLoad: function (options) {
    
  },

  onShow: function (options) {
    const self = this;
    let user_id = wx.getStorageSync('user_id');
    let store_id = wx.getStorageSync('store_id');
    if (user_id) {
      self.setData({
        user_id: user_id
      })
    }
    if (store_id) {
      self.setData({
        store_id: store_id,
        isSelected: true
      })
    } 
  },

  // 选择店铺 
  selectShop: function (e) {
    this.canTapbutton(true);
  },

  // 功能按键
  tapButton: function (e) {
    // if (this.canTapbutton()) {
      let types = e.currentTarget.dataset.type;
      if (parseInt(types) < 4) {
        wx.navigateTo({
          url: '/pages/order/order?type=' + types,
        })
      // }
    }
  },

  // 功能按键验证
  canTapbutton: function (e){
    const self = this;
    // if (!self.data.user_id) {
    //   wx.redirectTo({
    //     url: '/pages/login/login?url=' + utils.getCurrentPageUrl(),
    //   })
    //   return false;
    // }
    if (!self.data.store_id) {
      if (!e){
        wx.showToast({
          title: '请先选择店铺',
          icon: 'none'
        })
      }
      setTimeout(function () {
        wx.navigateTo({
          url: '/pages/allShops/allShops?url=' + utils.getCurrentPageUrl(),
        });
      }, !e ? 1200 : 0);
      return false;
    }
    return true;
  },

  // 常规商品 功能按键
  tapManageButton: function (e) {
    // if (this.canTapbutton()) {
      let type = e.currentTarget.dataset.type;
      switch (parseInt(type)) {
        case 1: //分类管理
          wx.navigateTo({
            url: '/pages/classificationList/classificationList?title=分类管理',
          })
          break;
        case 2: //添加分类
          wx.navigateTo({
            url: '/pages/addClassification/addClassification?title=添加分类',
          })
          break;
        case 3: //商品管理
          wx.navigateTo({
            url: '/pages/commodityList/commodityList?title=商品管理',
          })
          break;
        case 4: //添加商品
          wx.navigateTo({
            url: '/pages/addCommodity/addCommodity?title=添加商品',
          })
          break;
      }
    // }

  },

  //数据统计
  // tapButton:function(){
  //   wx.navigateTo({
  //     url:'/pages/statistics/statistics'
  //   })
  // },

  withDrawcash: function (e) {
    console.log('提现');
  }
})