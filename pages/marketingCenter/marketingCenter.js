
const utils = require('../../utils/utils.js');
const app = getApp()

Page({
  data: {
    tabBar: 1,
    windowWidth: app.systemInfo.windowWidth,
    windowHeight: app.systemInfo.windowHeight,
  },

  onLoad: function (options) {
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

  // 功能按键验证
  canTapbutton: function (e) {
    const self = this;
    if (!self.data.user_id) {
      wx.redirectTo({
        url: '/pages/login/login?url=' + utils.getCurrentPageUrl(),
      })
      return false;
    }
    if (!self.data.store_id) {
      if (!e) {
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

  tapManageButton: function (e) {
    if (this.canTapbutton()) {
      var button_type = e.currentTarget.dataset.type;
      switch (parseInt(button_type)) {
        case 1: // 拼团 分类管理
          wx.navigateTo({
            url: '/pages/classificationList/classificationList?title=拼团分类管理',
          })
          break;
        case 2: // 添加分类
          wx.navigateTo({
            url: '/pages/addClassification/addClassification?title=添加拼团分类',
          })
          break;
        case 3: // 商品管理
          wx.navigateTo({
            url: '/pages/commodityList/commodityList?title=拼团商品管理',
          })
          break;
        case 4: // 添加商品
          wx.navigateTo({
            url: '/pages/addCommodity/addCommodity?title=添加拼团商品',
          })
          break;
        case 5: // 秒杀 分类管理
          wx.navigateTo({
            url: '/pages/seckillManagement/seckillManagement',
          })
          break;
        case 6: // 秒杀 添加分类
          break;
      }
    }
  },

  // 卡券管理
  tapButton: function (e) {
    if (this.canTapbutton()) {
      wx.navigateTo({
        url: '/pages/cardVoucher/cardVoucher',
      })
    }
  }

})
