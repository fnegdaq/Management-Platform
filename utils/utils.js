
// 获取当前页url
function getCurrentPageUrl() {
  var pages = getCurrentPages();    //获取加载的页面
  var currentPage = pages[pages.length - 1];    //获取当前页面的对象
  var url = currentPage.route;    //当前页面url
  return url
}

// 账户格式验证
function verifyAccount(account) {
  var reg1 = new RegExp('^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$');
  var phoneVar = reg1.test(account);

  var reg2 = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$')
  var emailVar = reg2.test(account);
  return phoneVar || emailVar;
}

function verifyPassword(password) {
  var reg = new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$');
  var pw = reg.test(password);
  return pw;
}

module.exports = {
  getCurrentPageUrl,
  verifyAccount,
  verifyPassword
}