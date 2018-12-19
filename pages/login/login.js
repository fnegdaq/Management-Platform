
const app = getApp()
const api = require('../../utils/api.js');
const utils = require('../../utils/utils.js');

Page({

  data: {
    hideHeader: false,
    focusName: false,
    focusPW: false,
    account:'',
    password:'',
    from_url: '',
  },

  onLoad: function (options) {
    this.setData({
      from_url: options.url
    });
  },

  // 输入框聚焦
  beFocus: function (e) {
    this.setData({
      hideHeader: true
    })

    let input_type = e.currentTarget.dataset.type;
    if (input_type == 'name') {
      this.setData({
        focusName: true,
        focusPW: false,
      })
    } else {
      this.setData({
        focusPW: true,
        focusName: false
      })
    }
  },

  inputName: function (e) {
    var input_value = e.detail.value;
    var input_length = e.detail.cursor;
    this.setData({
      account: input_value
    })
  },

  deleteName: function (e) {
    this.setData({
      account:''
    })
  },

  inputPassword: function (e) {
    var input_value = e.detail.value;
    var input_length = e.detail.cursor;

    this.setData({
      password: input_value
    })
  },

  deletePw: function (e) {
    this.setData({
      password: ''
    })
  },

  showPassword: function (e) {
    var isShow = !this.data.isShowPW;
    this.setData({
      isShowPW: isShow
    })
  },

  // 忘记密码
  forgetPassword: function () {
    wx.navigateTo({
      url: '/pages/forgetPassword/forgetPassword',
    })
  },

  // 登录 
  login: function() {
    const self = this;
    self.setData({
      accountSuccess: utils.verifyAccount(self.data.account)
    });

    if (self.data.accountSuccess) {
      const data = {
        username: self.data.account,
        password: self.data.password
      };
      api.login({
        data,
        success: (res) => {
          if (res.data.code == -1) {
            if (res.data.mes == '密码错误') {
              self.setData({
                passwordSuccess: false
              });
            } else if (res.data.mes == '该账户不存在') {
              self.setData({
                accountSuccess: false
              });
            }
          } else if (res.data.code == 0){
            wx.showToast({
              title: '登录成功',
            })
            let userid = res.data.data.userId;
            wx.setStorageSync('user_id', userid)

            setTimeout(function () {
              wx.reLaunch({
                url: '/' + self.data.from_url
              });
            }, 1200);
          }
        },
      });
    }
  }
})