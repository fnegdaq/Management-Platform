const app = getApp();
const api = require('../../utils/api.js');
const utils = require('../../utils/utils.js');

Page({
  
  data: {
    // 聚焦
    phone: false,
    veri_code: false,
    new_pw: false,
    sure_pw: false,

    account: '',
    verifycode: '',
    newpassword: '',
    surepassword: '',

    last_time: '60',
    isShowCodeBtn: true
  },

  onLoad: function (options) {
    
  },

  // 输入框聚焦
  beFocus: function (e) {
    let input_type = e.currentTarget.dataset.type;
    if (input_type == 'phone') {
      this.setData({
        phone:true,
        veri_code: false,
        new_pw: false,
        sure_pw: false,
      })
    } else if (input_type == 'new_pw') {
      this.setData({
        phone: false,
        veri_code: false,
        new_pw: true,
        sure_pw: false,
      })
    } else if (input_type == 'veri_code') {
      this.setData({
        phone: false,
        veri_code: true,
        new_pw: false,
        sure_pw: false,
      })
    } else {
      this.setData({
        phone: false,
        veri_code: false,
        new_pw: false,
        sure_pw: true,
      })
    }
  },

  // 输入
  inputValue: function (e) {
    var input_value = e.detail.value;
    var input_length = e.detail.cursor;
    let input_type = e.currentTarget.dataset.type;
    
    if (input_type == 'phone') {
      this.setData({
        account: input_value,
      })
    } else if (input_type == 'veri_code') {
      this.setData({
        verifycode: input_value,
      })
    } else if (input_type == 'new_pw') {
      this.setData({
        newpassword: input_value,
        pwsuccess: utils.verifyPassword(input_value)
      })
    } else if (input_type == 'sure_pw') {
      this.setData({
        surepassword: input_value,
      })
    }
  },

  // 清除输入
  deleteInput: function (e) {
    let input_type = e.currentTarget.dataset.type;
    if (input_type == 'sure_pw') {
      this.setData({
        surepassword: ''
      })
    } else if (input_type == 'new_pw') {
      this.setData({
        newpassword: '',
      })
    } else if (input_type == 'veri_code') {
      this.setData({
        verifycode: ''
      })
    } else if (input_type == 'phone') {
      this.setData({
        account: ''
      })
    }
  },

  // 显示密码
  showPassword: function (e) {
    let input_type = e.currentTarget.dataset.type;
    if (input_type == 'new_pw') {
      var isShow = !this.data.isShowNewPW;
      this.setData({
        isShowNewPW: isShow
      })
    } else {
      var isShow = !this.data.isShowSurePW;
      this.setData({
        isShowSurePW: isShow
      })
    }
  },

  startSetInter: function () {
    var page = this;
    var last_time = page.data.last_time;
    //将计时器赋值给setInter
    page.data.setInter = setInterval(
      function () {
        if (last_time == 0) {
          page.setData({
            isShowCodeBtn: true,
          })
          if (page.data.last_time == 1) {
            page.setData({
              last_time: 60,
            })
          }
          //清除计时器  即清除setInter
          clearInterval(page.data.setInter)
          return;
        } else {
          page.setData({
            isShowCodeBtn: false,
            last_time
          })
          last_time--;
        }
      }, 1000);
  },

  // 获取验证码
  getVerifyCode: function (e) {
    const self = this;
    if (utils.verifyAccount(self.data.account)) {
      self.startSetInter();
      api.getVerificationCode({
        data: {
          phone: self.data.account
        },
        success: (res) => {
          if(res.data.code == 0){

          }
        }
      });
    } else {
      wx.showToast({
        title: '请先输入正确的手机号',
        icon: 'none'
      })
    }
  },

  // 保存修改
  savePassword: function (e) {
    const self = this;
    self.setData({
      accountSuccess: utils.verifyAccount(self.data.account),
      pwsure: self.data.surepassword == self.data.newpassword    
    });
    if (!self.data.pwsure) {
      return;
    }
    if (self.data.accountSuccess) {
      api.forgetPassword({
        data: {
          phone: self.data.account,
          code: self.data.verifycode,
          password: self.data.newpassword,
          passwords: self.data.surepassword
        },
        success:(res) => {
          if (res.data.code == 0) {
            wx.showToast({
              title: '修改成功',
            })
            setTimeout(function () {
              wx.navigateBack()
            }, 800);
          } else if (res.data.code == -1) {
            wx.showToast({
              title: '修改失败',
            })
          }
        }
      });
    }
  }
})