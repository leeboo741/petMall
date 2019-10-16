/**
 * 获取本地用户信息
 */
function getLocalUserInfo(){
  return null;
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