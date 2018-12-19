
const app = getApp();

Page({

  data: {
    goods_list:[1,2],
  },

  onLoad: function (options) {
    var navtitle = options.title;
    wx.setNavigationBarTitle({
      title: navtitle,
    })
  },
})