/**
 * 获取本地用户信息
 */
function getLocalUserInfo(){
  return {
    avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571228473763&di=7983ab89537ae923fc13b05acf6baf04&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F28%2F20160928230144_QARdX.thumb.700_0.png",
    name: "逗",
    explain:"商城所有商品享受会员价"
  }
  // return null;
}

/**
 * 是否登陆
 */
function isLogin(){
  let userInfo = this.getLocalUserInfo();
  if (userInfo == null) {
    return false;
  }
  return true;
}

module.exports={
  getLocalUserInfo: getLocalUserInfo,
  isLogin: isLogin
}