
var app = getApp();

Page({

  data: {
    classification_list: [{ showMenu: false }, { showMenu: false }, { showMenu: false}],
    showMenu: false,
    animationData: {},
    windowWidth: app.systemInfo.windowWidth,
    windowHeight: app.systemInfo.windowHeight,
    title: '',
    isSubClass: true,
  },

  onLoad: function (options) {

    var navtitle = options.title;
    wx.setNavigationBarTitle({
      title: navtitle,
    })
    this.setData({
      title: navtitle
    });

    this.animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease',
    })
  },

  // 添加分类
  add_cassify: function (e) {
    var title_value = '';
    if (this.data.title == '分类管理') { 
      title_value = '添加分类';
    } else {
      title_value = '添加拼团分类';
    }
    wx.navigateTo({
      url: '/pages/addClassification/addClassification?title=' + title_value,
    })
  },

  // 点击菜单
  tapMenu: function (e) {
    var tapIndex = e.currentTarget.id;
    var classification_list = this.data.classification_list;
    for (var i = 0; i < classification_list.length; i++) {
      if (i == parseInt(tapIndex)) {
        var isShow = classification_list[i].showMenu;
        classification_list[i].showMenu = !isShow;
        if (classification_list[i].showMenu == true) {
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
        classification_list[i].showMenu = false;
      }
    }
    this.setData({
      classification_list: classification_list
    });
  },

  // 查看详情 
  viewClssificationInfo: function(e) {
    var title_value = '';
    if (this.data.title == '分类管理') {
      title_value = '分类信息';
    } else {
      title_value = '拼团分类信息';
    }
    wx.navigateTo({
      url: '/pages/classificationInfo/classificationInfo?title=' + title_value,
    })
    this.setData({
      showMenu: false
    })
  },

  // 删除分类
  deleteClassification: function (e) {
    if (this.data.title == '分类管理') {
      api.deleteClassify({
        data:{
          id: e.currentTarget.dataset.id
        },
        success:(res) => {

        }
      });
    } else {
      
    } 
  }
})