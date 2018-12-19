
const apiURL = 'https://shopapitest.jdmini.cn';

const wxRequest = (params, url) => {
  var data = params.data || {};
  var store_id = wx.getStorageSync("store_id");
  if (store_id) {
    data.store_id = store_id;
  }
  wx.request({
    url,
    method: params.method || 'GET',
    dataType: params.dataType || "json",
    data,
    header: {
      Accept: 'application/x-www-form-urlencoded',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    success(res) {
      if (params.success) {
        params.success(res);
      }
    },
    fail (res){
      if (params.fail) {
        params.fail(res);
      }
    },
    complete (res) {
      if (params.complete) {
        params.complete(res);
      }
    },
  });
};

// 文件上传
const wxUpload = (params, url) => {
  var store_id = wx.getStorageSync("store_id");
  if (store_id) {
    url = url + '?store_id=' + store_id;
  }
  wx.uploadFile({
    url,
    filePath: params.filePath,
    name: params.name,
    formData: {
      //和服务器约定的token, 一般也可以放在header中
      // 'session_token': wx.getStorageSync('session_token')
    },
    success(res) {
      if (params.success) {
        params.success(res);
      }
    },
    fail(res) {
      if (params.fail) {
        params.fail(res);
      }
      wx.showModal({
        title: '提示',
        content: '上传失败',
        showCancel: false
      })
    },
    complete(res) {
      if (params.complete) {
        params.complete(res);
      }
      wx.hideToast();
    },
  });
};

// 上传图片
const uploadImage = (params) => {
  wxUpload(params, `${apiURL}/shop/pic/pic`)
};

/**---------------------------登录密码相关------------------------------ */

// 登录
const login = (params) => {
  wxRequest(params, `${apiURL}/shop/login/login`)
};
// 忘记密码
const forgetPassword = (params) => {
  wxRequest(params, `${apiURL}/shop/login/forget-pwd`)
};
// 获取验证码
const getVerificationCode = (params) => {
  wxRequest(params, `${apiURL}/shop/tool/send-phone-code`)
};


// 店铺列表
const getShops = (params) => {
  wxRequest(params, `${apiURL}/shop/login/get-all-shops`)
};

// 普通订单 
const getOrders = (params) => {
  wxRequest(params, `${apiURL}/shop/${params.query.order_type}/list`);
};

/**---------------------------管理相关-------------------------------- */

// 添加分类
const addClassify = (params) => {
  wxRequest(params, `${apiURL}/shop/cat/cat`)
};
// 删除分类
const deleteClassify = (params) => {
  wxRequest(params, `${apiURL}/shop/cat/del`)
};
// 添加商品
const addCommodity = (params) => {
  wxRequest(params, `${apiURL}/shop/goods/goods`)
};
// 删除商品
const deleteCommodity = (params) => {
  wxRequest(params, `${apiURL}/shop/goods/del`)
};

/**---------------------------店铺数据------------------------------ */
//数据统计单日
const statisticsDay = (params) => {
  wxRequest(params, `${apiURL}/shop/data/one-day`)
};

/**---------------------------优惠券-------------------------------- */

//卡券管理的未开始
const couponUndo = (params) => {
  wxRequest(params, `${apiURL}/shop/coupon/undo`)
};
//卡券管理的进行中
const couponIng = (params) => {
  wxRequest(params, `${apiURL}/shop/coupon/ing`)
};
//卡券管理的已失效
const couponFinish = (params) => {
  wxRequest(params, `${apiURL}/shop/coupon/finish`)
};
//添加优惠券
const addCoupon = (params) => {
  wxRequest(params, `${apiURL}/shop/coupon/coupon`)
};
//编辑优惠券
const editCoupon = (params) => {
  wxRequest(params, `${apiURL}/shop/coupon/one`)
};
//编辑保存优惠券
const editSavaCoupon = (params) => {
  wxRequest(params, `${apiURL}/shop/coupon/coupon`)
};
//删除优惠券
const delCoupon = (params) => {
  wxRequest(params, `${apiURL}/shop/coupon/del`)
}


module.exports = {
  login, 
  forgetPassword,
  getVerificationCode, 
  getShops, 
  getOrders,  
  couponUndo,
  couponIng,
  couponFinish,
  addCoupon,
  editCoupon,
  editSavaCoupon,
  delCoupon,
  getOrders,
  addClassify,
  deleteClassify,
  addCommodity,
  deleteCommodity,
  uploadImage,
  statisticsDay
};


