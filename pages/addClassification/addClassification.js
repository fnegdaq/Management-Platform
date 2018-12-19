
const api = require("../../utils/api.js");
const app = getApp();

Page({

  data: {
    tempFilePaths:'',
    windowWidth: app.systemInfo.windowWidth,
    windowHeight: app.systemInfo.windowHeight,
    classification_list: ['无','水果类','化妆品'],
    showMenu:false,
    parent_name: '无',
    classification_name: '',
  },
  onLoad: function (options) {
    var navtitle = options.title;
    wx.setNavigationBarTitle({
      title: navtitle,
    })
  },

  choosePic: function (e) {
    var self = this;
    wx.chooseImage({
      count: 5, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        self.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  },

  deletePic: function (e) {
    this.setData({
      tempFilePaths: ''
    })  
  },

  inputName: function (e) {
    if (e.detail.value.length > 0) {
      this.setData({
        classification_name: e.detail.value
      });
    }
  },

  // 保存--添加分类
  save: function (e) {
    const self = this;
    if (self.data.tempFilePaths.length==0) {
      return;
    }
    if (self.data.classification_name.length == 0) {
      return;
    }
    api.uploadImage({
      filePath: self.data.tempFilePaths[0],
      name:'classification_image',
      success: (res) => {
        console.log(res.data.code);
        if (res.data.code == 0) {
          const data = {
            parent_id: 0,
            name: self.data.classification_name,
            pic_url: res.data.data.url,
            // id: '',
          };
          api.addClassify({
            data,
            success: (res) => {
              if (res.data.code == 0) {

              } 
            }
          });
        }
      }
    });
  },

  // 父类列表
  showParentClassify: function (e) {
    let showMenu = this.data.showMenu;
    this.setData({
      showMenu: !showMenu
    });
  },

  selectSuperClass: function (e) {
    const name = e.currentTarget.dataset.name;
    this.setData({
      parent_name: name,
      showMenu: false
    });
  },
})