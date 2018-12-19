//app.js
App({
  systemInfo:null,
  onLaunch: function () {
    const self = this;
    wx.getSystemInfo({
      success(res) {
        self.systemInfo = res;
      },
    });
  },
  seckillData:{
    date:[]
  },
  
})