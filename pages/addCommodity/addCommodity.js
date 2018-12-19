
const app = getApp();
const api = require('../../app.js');

Page({

  data: {
    windowWidth: app.systemInfo.windowWidth,
    windowHeight: app.systemInfo.windowHeight,
    cell_list: [{ title: '名称', unit: '', placeholder: '请输入商品名称', name: 'name'}
      , { title: '一级分类', unit: '', subTitle: '无', name: 'cat_id' ,cell_type: 'pull_down'}
      , { title: '二级分类', unit: '', subTitle: '无', name: 'cat_id', cell_type: 'pull_down'}
      , { title: '单位', unit: '', placeholder: '件', name: 'unit'}
      , { title: '商品图文描述', unit: '', name: 'explain' }
      , { title: '虚拟销售', unit: '件', name: 'virtual_sales'}
      , { title: '商品库存', unit: '件', name: 'goods_num'}
      , { title: '售价', unit: '元', name: 'price'}
      , { title: '原价', unit: '元', name: 'original_price'}
      , { title: '运费设置', unit: '', subTitle: '默认模版', name: 'freight', cell_type: 'pull_down'}
      , { title: '单品满件包邮', unit: '件', name: 'pieces'}
      , { title: '单品满额包邮', unit: '元', name: 'forehead'}
      , { title: '重量', unit: '克', name: 'weight'}],

    // 拼团数据
    group_cell_list: [{ title: '名称', unit: '', placeholder: '请输入商品名称', name: 'name' }
      , { title: '商品分类', unit: '', subTitle: '食品类', name: 'type' }
      , { title: '单位', unit: '', placeholder: '件', name: 'unit' }
      , { title: '商品图文描述', unit: '', name: 'explain' }
      , { title: '虚拟销售', unit: '件', name: 'false_sales' }
      , { title: '商品库存', unit: '件', name: '' }
      , { title: '运费设置', unit: '', subTitle: '默认模版', name: '' }
      , { title: '团购价', unit: '元', name: '' }
      , { title: '单卖价', unit: '元', name: '' }
      , { title: '允许单买', unit: '', name: 'switch' }
      , { title: '拼团时间', unit: '时', name: '' }
      , { title: '拼团人数', unit: '人', name: '' }
      , { title: '拼团限时', unit: '', name: '' }
      , { title: '购买次数限制', unit: '次', name: '' }],

    isGroup: false,
    tempFilePaths: ['placeholder'],
  },

  onLoad: function (options) {
    var navtitle = options.title;
    wx.setNavigationBarTitle({
      title: navtitle,
    })
    var isG = navtitle != '添加商品';
    this.setData({
      isGroup: isG
    })
  },

  choosePic: function (e) {
    var self = this;
    var temps = this.data.tempFilePaths;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        temps = res.tempFilePaths.concat(temps)
        if (temps.length == 6 ) {
          temps.pop(); 
        }
        self.setData({
          tempFilePaths: temps
        })
      }
    })
  },

  deletePic: function (e) {
    var index = e.currentTarget.dataset.index;
    var temps = this.data.tempFilePaths;
    temps.splice(index, 1);
    var isContain = temps.indexOf('placeholder');
    if (isContain == -1) {
      temps.push('placeholder');
    }
    this.setData({
      tempFilePaths: temps
    })
  },

  pullDown: function (e) {
    let _type = e.currentTarget.dataset.type;
    var cell_list_copy = new Array();
    if (this.data.isGroup) {
      cell_list_copy = this.data.group_cell_list;
      if (_type == '商品分类') {
        cell_list_copy[1].isExpend = !cell_list_copy[1].isExpend;
      } else {
        cell_list_copy[6].isExpend = !cell_list_copy[6].isExpend;
      }
      this.setData({
        group_cell_list: cell_list_copy
      })
    } else {
      cell_list_copy = this.data.cell_list;
      if (_type == '商品分类') {
        cell_list_copy[1].isExpend = !cell_list_copy[1].isExpend;
      } else {
        cell_list_copy[8].isExpend = !cell_list_copy[8].isExpend;
      }
      this.setData({
        cell_list: cell_list_copy
      })
    }
  },

  // 编辑图文详情  卡券
  editDetailInfo: function (e) {
    var _type = e.currentTarget.dataset.type;
    if (_type == '商品图文描述') {

    } else {
      wx.navigateTo({
        url: '/pages/giveoutCoupons/giveoutCoupons',
      })
    }
  },

  // 上架
  putaway: function (e) {
    api.addCommodity({

    });
  },

  // 入库
  saveSetting: function (e) {
    console.log(e.detail.value)
  }
})