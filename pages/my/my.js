const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabBar: 2,
    windowWidth: app.systemInfo.windowWidth,
    windowHeight: app.systemInfo.windowHeight,
    isShowShareView: false,
    isShowQRCodeView: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  tapCell: function (e) {
    var index = e.currentTarget.dataset.index;
    switch (parseInt(index)) {
      case 1 : //我的资金
        wx.navigateTo({
          url: '/pages/withdrawal/withdrawal',
        })
        break;
      case 2: //全部店铺 
        wx.navigateTo({
          url: '/pages/allShops/allShops',
        })
        break;
      case 3: //分享店铺
        this.setData({
          isShowShareView: true
        })
        break;
      case 4: //我的二维码
        this.setData({
          isShowQRCodeView: true
        })
        break;
    }
  },

  tapShare_blackArea: function (){
    var self = this;
    self.setData({
      isShowShareView: false,
      isShowQRCodeView: false
    })
  },

  tapShareButton: function (e) {
    var button_type = e.currentTarget.dataset.type;
    if (button_type == "wx_friend") {

    } else {

    }
  },

  uploadQRCode: function (e) {
    
  } 

})