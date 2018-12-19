// pages/personalData/personalData.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array :['女', '男'],
    hiddenArrow: true,
    condition: false,
    sex:'',
    avatar: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  // 忘记密码
  forgetPassword: function() {
    wx.navigateTo({
      url: '/pages/changePassword/changePassword',
    })
  },

  bindPickerChange: function (e) {
    var array = this.data.array;
    var index = e.detail.value;
    this.setData({
      sex:array[index]
    })
  },

  avatarTap:function (){
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      success: function (res) {
        console.log(res)
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },

  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        that.setData({
          avatar: res.tempFilePaths[0]
        });

        // app.uploadFile({
        //   url: api.user.uploadAvatar,
        //   filePath: res.tempFilePaths[0],
        //   success: function (ress) {
        //     console.log('ress --- >>> ' + ress);
        //   }
        // });
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  open: function () {
    this.setData({
      condition: !this.data.condition,
    })
  },
})