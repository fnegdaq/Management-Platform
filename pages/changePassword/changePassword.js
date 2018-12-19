const app = getApp()

Page({

  data: {
    old_pw: false,
    new_pw: false,
    sure_pw: false,
  },

  onLoad: function (options) {

  },

  // 输入框聚焦
  beFocus: function (e) {
    let input_type = e.currentTarget.dataset.type;
    if (input_type == 'old_pw') {
      this.setData({
        old_pw: true,
        new_pw: false,
        sure_pw: false,
      })
    } else if (input_type == 'new_pw') {
      this.setData({
        new_pw: true,
        old_pw: false,
        sure_pw: false,
      })
    } else {
      this.setData({
        old_pw: false,
        new_pw: false,
        sure_pw: true,
      })
    }
  },

  inputValue: function (e) {
    let input_type = e.currentTarget.dataset.type;
    var input_value = e.detail.value;
    var input_length = e.detail.cursor;
    if (input_type == 'sure_pw') {
      this.setData({
        surepassword: input_value,
      })
    } else if (input_type == 'new_pw') {
      this.setData({
        newpassword: input_value,
      })
    } else if (input_type == 'old_pw') {
      this.setData({
        oldpassword: input_value,
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
    } else if (input_type == 'old_pw') {
      this.setData({
        oldpassword: ''
      })
    } 
  },

  showPassword: function (e) {
    let input_type = e.currentTarget.dataset.type;
    if (input_type == 'old_pw') {
      var isShow = !this.data.isShowOldPW;
      this.setData({
        isShowOldPW: isShow
      })
    } else if (input_type == 'new_pw') {
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
  }
})