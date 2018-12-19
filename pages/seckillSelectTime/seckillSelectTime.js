// pages/seckillSelectTime/seckillSelectTime.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectAll: false,
    timeData: [],
  },

  //全选/全不选
  changeSelectAll: function() {
    this.setData({
      selectAll: this.data.selectAll ? false : true,
    })
  },

  //更改单个item选中状态
  changeItemSelected: function(e) {
    var index = e.currentTarget.dataset.index
    var item = e.currentTarget.dataset.item
    var temp = this.data.timeData[index].select == 0 ? 1 : 0
    this.data.timeData[index].select = temp
    this.setData({
      timeData: this.data.timeData
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.initTimeData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //初始化数据
  initTimeData: function() {
    this.setData({
      timeData: [{
          time: "00:00-00:59",
          id: "0",
          select: "0"
        }, {
          time: "01:00-01:59",
          id: "1",
          select: "0"
        },
        {
          time: "02:00-02:59",
          id: "2",
          select: "0"
        }, {
          time: "03:00-03:59",
          id: "3",
          select: "0"
        },
        {
          time: "04:00-04:59",
          id: "4",
          select: "0"
        }, {
          time: "05:00-05:59",
          id: "5",
          select: "0"
        },
        {
          time: "06:00-06:59",
          id: "6",
          select: "0"
        }, {
          time: "07:00-07:59",
          id: "7",
          select: "0"
        },
        {
          time: "08:00-08:59",
          id: "8",
          select: "0"
        }, {
          time: "09:00-09:59",
          id: "9",
          select: "0"
        },
        {
          time: "10:00-10:59",
          id: "10",
          select: "0"
        }, {
          time: "11:00-11:59",
          id: "11",
          select: "0"
        },
        {
          time: "12:00-12:59",
          id: "12",
          select: "0"
        }, {
          time: "13:00-13:59",
          id: "13",
          select: "0"
        },
        {
          time: "14:00-14:59",
          id: "14",
          select: "0"
        }, {
          time: "15:00-15:59",
          id: "15",
          select: "0"
        },
        {
          time: "16:00-16:59",
          id: "16",
          select: "0"
        }, {
          time: "17:00-17:59",
          id: "17",
          select: "0"
        },
        {
          time: "18:00-18:59",
          id: "18",
          select: "0"
        }, {
          time: "19:00-19:59",
          id: "19",
          select: "0"
        },
        {
          time: "20:00-20:59",
          id: "20",
          select: "0"
        }, {
          time: "21:00-21:59",
          id: "21",
          select: "0"
        },
        {
          time: "22:00-22:59",
          id: "22",
          select: "0"
        }, {
          time: "23:00-23:59",
          id: "23",
          select: "0"
        },

      ],
    })
  },
})