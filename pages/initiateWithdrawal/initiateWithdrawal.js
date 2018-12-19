// pages/initiateWithdrawal/initiateWithdrawal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUnit: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  addUnitTap: function(e) {
    var value = e.detail.value;
    if (value.length > 0) {
      this.setData({
        money: value,
        showUnit: true
      })
    } else {
      this.setData({
        showUnit: false
      })
    }
  },

  bankCardTap: function(e) {
    var bank = e.detail.value;
    this.setData({
      bank: bank
    })
  },

  nameTap: function(e) {
    var name = e.detail.value;
    this.setData({
      name: name
    })
  },

  openTap: function(e) {
    var open = e.detail.value;
    this.setData({
      open: open
    })
  },


  submitTap: function() {
    var page = this;
    let money = page.data.money;
    let bank = page.data.bank;
    let name = page.data.name;
    let open = page.data.open;

    if (money == undefined || bank == undefined || name == undefined || open == undefined) {
      wx: wx.showModal({
        title: '提示',
        content: '请填写提现内容',
      })
    }
    else {
      console.log(page.data.money);
      console.log(page.data.bank);
      console.log(page.data.name);
      console.log(page.data.open);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})