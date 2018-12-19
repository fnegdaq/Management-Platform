
const app = getApp();

Page({

  data: {
    coupons: [{ name: 'title', value: '0' },
    { name: '使用阿莱克斯大家疯狂拉升江萨里德家萨达斯', value: '1', checked: true }]
  },

  onLoad: function (options) {

  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var coupons = this.data.coupons;
    for (var i = 0, len = coupons.length; i < len; ++i) {
      coupons[i].checked = coupons[i].value == e.detail.value;
    }

    this.setData({
      coupons: coupons
    });
  },
})