// pages/seckillManagement/seckillManagement.js
const app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  data: {
    windowHeight: app.systemInfo.windowHeight,
    widowWidth: app.systemInfo.windowWidth,
    goods_list: [{ showIcon: false, showMenu: false, type: 'soldout' }, { showIcon: false, showMenu: false, type: 'putaway' }, { showIcon: false, showMenu: false, type: 'soldout' }],
    tabs: ['全部', '上架中', '下架中', '已售罄'],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    tabWidth: 64,
  },

  onLoad: function (options) {
    var self = this;
    self.setData({
      sliderLeft: (self.data.windowWidth / self.data.tabs.length - sliderWidth) / 2,
      sliderOffset: self.data.windowWidth / self.data.tabs.length * self.data.activeIndex,
    });
    this.animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease',
    })
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });

    if (this.data.sliderOffset == 0) {
      this.setData({
        tabWidth: 64
      })
    } else {
      this.setData({
        tabWidth: 96
      })
    }
  },

  //打开添加秒杀商品
  addGoods: function(){
    wx.navigateTo({
      url: '../../pages/seckillAdd/seckillAdd'
    })
  },

  // 点击菜单
  tapMenu: function (e) {
    var tapIndex = e.currentTarget.id;
    var goods_list = this.data.goods_list;
    for (var i = 0; i < goods_list.length; i++) {
      if (i == parseInt(tapIndex)) {
        var isShow = goods_list[i].showMenu;
        goods_list[i].showMenu = !isShow;
        if (goods_list[i].showMenu == true) {
          this.animation.scale3d(1.05, 1.05, 1.1).step()
          this.setData({
            animationData: this.animation.export()
          })
          setTimeout(function () {
            this.animation.scale3d(1.0, 1.0, 1.0).step()
            this.setData({
              animationData: this.animation.export()
            })
          }.bind(this), 200)
        }
      } else {
        goods_list[i].showMenu = false;
      }
    }
    this.setData({
      goods_list: goods_list
    });
  },

  // 菜单按钮
  menuClick: function (e) {
    var menu_type = e.currentTarget.id;
    if (menu_type == 'change') {

    } else if (menu_type == 'putawat') {

    } else if (menu_type == 'soldout') {

    } else if (menu_type == 'delete') {

    } else if (menu_type == 'done') {
      var goods_list = this.data.goods_list;
      for (var i = 0, lenI = goods_list.length; i < lenI; ++i) {
        goods_list[i].showIcon = false;
      }
      this.setData({
        goods_list: goods_list,
      });
    }
  },

  // 编辑状态--全选
  selectAll: function (e) {

  }
})