
const api = require('../../utils/api.js');

const app = getApp();

Page({

  data: {

  },
  
  onLoad: function (options) {
    let index = wx.getStorageSync('store_id');
    if (index) {
      this.setData({
        current_shop_id: index
      });
    }
    this.getMyShops();
  },

  getMyShops: function() {
    const self = this;
    let user_id = wx.getStorageSync('user_id');
    api.getShops({
      data: {
        userId: user_id
      },
      success: (res) => {
        if (res.data.code == 0) {
          self.setData({
            shop_list: res.data.data
          });
        }
      },
    });
  },

  doSelectShop: function (e) {
    let current = e.currentTarget.dataset.id;
    wx.setStorageSync('store_id', current)
    this.setData({
      current_shop_id: current
    });
    setTimeout(function () {
      wx.navigateBack();
    }, 800);
  }

})