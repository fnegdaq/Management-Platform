// pages/withdrawal/withdrawal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  withdrawalTap: function (e){
    var index = e.currentTarget.dataset.index;
    switch (parseInt(index)) {
      case 1: //提现记录
        wx.navigateTo({
          url: '/pages/withdrawalRecord/withdrawalRecord',
        })
        break;
      case 2: //提现
      wx.navigateTo({
        url: '/pages/initiateWithdrawal/initiateWithdrawal',
      })
        break;
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})