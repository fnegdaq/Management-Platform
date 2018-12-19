
const app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  data: {
    windowWidth: app.systemInfo.windowWidth,
    windowHeight: app.systemInfo.windowHeight,
    goods_list: [{ showMenu: false, type: 'soldout', value: '0' }
      , { showMenu: false, type: 'putaway', value: '1' }
      , { showMenu: false, type: 'soldout', value: '2'}],
    tabs: ['全部', '上架中', '下架中', '已售罄'],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    widowWidth: app.systemInfo.windowWidth,
    tabWidth:64,
    isManageStatus: false,
    isGroup: false, //是否是拼团
    isSelectedAll: false,
  },

  onLoad: function (options) {

    var navtitle = options.title;
    wx.setNavigationBarTitle({
      title: navtitle,
    })
    this.setData({
      isGroup: navtitle != '商品管理'
    })

    var self = this;
    self.setData({
      sliderLeft: (self.data.windowWidth / self.data.tabs.length - sliderWidth) / 2,
      sliderOffset: self.data.windowWidth / self.data.tabs.length * self.data.activeIndex
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

  // 批量管理 
  manage: function (e) {
    if (this.data.goods_list.length == 0) {
      return;
    }
    this.setData({
      isManageStatus: true
    });
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
    const menu_type = e.currentTarget.id;
    const goods_id = e.currentTarget.dataset.id;
    if (menu_type == 'change') {

    } else if (menu_type == 'putawat') {

    } else if (menu_type == 'soldout') {

    } else if (menu_type == 'delete') {
      api.deleteClassify({
        data: {
          id: goods_id
        },
        success: (res) => {

        }
      }); 
    } else if (menu_type == 'done') {
      var goods_list = this.data.goods_list;
      for (var i = 0, lenI = goods_list.length; i < lenI; ++i) {
        goods_list[i].showIcon = false;
      }
      this.setData({
        goods_list: goods_list,
        isManageStatus: false
      });
    }
  },

  // 编辑状态--全选
  selectAll: function (e) {
    var isAll = this.data.isSelectedAll
    var goods_list = this.data.goods_list, values = e.detail.value;
    for (var i = 0, lenI = goods_list.length; i < lenI; ++i) {
      goods_list[i].checked = !isAll;
    }
    this.setData({
      goods_list: goods_list,
      isSelectedAll: !isAll
    });
  },

  addGoods: function (e) {
    wx.navigateTo({
      url: '/pages/addCommodity/addCommodity',
    })
  },

  // 查看详情 
  viewCommodityInfo: function (e) {
    if (this.data.isManageStatus) {
      return;
    }
    var title_value = '';
    if (this.data.title == '商品管理') {
      title_value = '商品信息';
    } else {
      title_value = '拼团商品信息';
    }
    wx.navigateTo({
      url: '/pages/classificationInfo/classificationInfo?title=' + title_value,
    })
    this.setData({
      showMenu: false
    })
  },

  checkboxChange: function (e) {
    if (!this.data.isManageStatus) {
      return;
    }
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var goods_list = this.data.goods_list, values = e.detail.value;
    for (var i = 0, lenI = goods_list.length; i < lenI; ++i) {
      goods_list[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (goods_list[i].value == values[j]) {
          goods_list[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      goods_list: goods_list
    });
  },

})