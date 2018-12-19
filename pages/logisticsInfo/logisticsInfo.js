const app = getApp()

Page({

  data: {
    windowWidth: app.systemInfo.windowWidth,
    windowHeight: app.systemInfo.windowHeight,
    cell_list: [{ title: '快递公司', name: 'name' }
      , { title: '收件人邮编', placeholder: '请输入收件人邮编', name: 'postcode' }
      , { title: '快递单号', placeholder: '请输入快递单号', name: 'oddnumber' }
      , { title: '商家留言', placeholder: '（选填）请输入您的留言', name: 'message' }],

  },

  onLoad: function (options) {
    
  },

  submitLogisticsInfo: function (e) {

  }
})