// pages/order/order.js
const api = require('../../utils/api.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: app.systemInfo.windowWidth,
    windowHeight: app.systemInfo.windowHeight,
    isShowSlectView: false,
    isShowButton: false,
    isHide: false,
    page_num: 1,
    canLoadMore: true,
    orders_list:[],
    loding: false,
    status_id: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let types = options.type;
    switch (parseInt(types)) {
      case 1:
        var navtitle = '普通订单'
        break;
      case 2:
        var navtitle = '拼团订单'
        break;
      case 3:
        var navtitle = '售后订单'
        break;
    }
    this.setData({
      types: types
    })
    wx.setNavigationBarTitle({
      title: navtitle,
    })

    this.getOrdersData()
  },

  // 加载更多 
  onReachBottom: function () {
    if (this.data.canLoadMore == false) {
      return;
    }
    this.getOrdersData();
  },

  // 获取订单信息 
  getOrdersData: function() {
    const self = this;
    if (self.data.loading == true) {
      return;
    }
    self.setData({
      loading: true
    });
    const data = {
      status: self.data.status_id,
      page: self.data.page_num
    };
    const query = {
      order_type: self.data.types == 2 ? 'pt-order' : 'order' 
    };
    api.getOrders({
      data,
      query,
      success:(res) => {
        console.log(res)
        let newList = res.data.data.list;
        if (!newList) {
          return;
        }
        if (newList.length == 0) {
          self.setData({
            canLoadMore: false
          })
        } else {
          self.setData({
            canLoadMore: true
          })
        }
        newList = self.data.orders_list.concat(newList);
        var index = self.data.page_num;
        self.setData({
          orders_list: newList,
          page_num: index + 1,
          loading: false
        })
      },
    });
  },


  //全部订单按钮
  selectOrderStatusTap: function() {
    this.setData({
      isShowSlectView: !this.data.isShowSlectView,
    })
  },

  selectOrderTap: function(e) {
    const status_id = e.currentTarget.dataset.id;
    this.setData({
      isShowSlectView: false,
      status_id: status_id
    });
    this.getOrdersData();
  },

  //订单列表push
  orderDetailTap: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var types = this.data.types;
    console.log(types);
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?types=' + types,
    })
  },

  //同意按钮
  agreeTap: function() {
    var content = '是否同意买家申请？';
    this.setData({
      isHide: true,
      content: content
    })

  },

  //拒绝按钮
  refusedTap: function() {
    var content = '是否拒绝买家申请？';
    this.setData({
      isHide: true,
      content: content
    })
  },

  //取消按钮
  hiddenToastTap: function() {
    this.setData({
      isHide: false
    })
  },

  //确定按钮
  sureTap: function(e) {
    console.log(e);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

