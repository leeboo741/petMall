
const Key_UserInfo = "userInfo";
const Key_CurrentRole = "currentRole";

const ResponseHandler = require("../services/handle/responseHandle.js");

/**
 * 存储当前角色 买家 0 卖家 1
 */
function saveCurrentRole(role) {
  try {
    wx.setStorageSync(Key_CurrentRole, role)
  } catch (e) {

  }
}

/**
 * 获取当前角色 买家 0 卖家 1
 */
function getCurrentRole() {
  try {
    let userInfo = wx.getStorageSync(Key_CurrentRole);
    if (userInfo == null) {
      return 0;
    }
    return userInfo;
  } catch (e) {
    return null;
  }
}

/**
 * 获取用户
 */
function saveLocalUserInfo(userInfo) {
  let userInfoStr = JSON.stringify(userInfo);
  try {
    wx.setStorageSync(Key_UserInfo, userInfoStr);
  } catch (e) {

  }
}

/**
 * 删除用户
 */
function deleteLocalUserInfo(deleteCallback) {
  wx.removeStorage({
    key: Key_UserInfo,
    success(res) {
      console.log("删除用户 success: \n" + JSON.stringify(res));
      if (deleteCallback && typeof deleteCallback == "function") {
        deleteCallback(true)
      }
    },
    fail(res) {
      console.log("删除用户 fail: \n" + JSON.stringify(res));
      if (deleteCallback && typeof deleteCallback == "function") {
        deleteCallback(false)
      }
    }
  })
}

/**
 * 获取本地用户信息
 */
function getLocalUserInfo(){
  try {
    let userInfo = JSON.parse(wx.getStorageSync(Key_UserInfo));
    return userInfo;
  } catch (e) {
    return null;
  }
}

/**
 * 获取用户电话
 */
function getPhone() {
  let userInfo = getLocalUserInfo();
  if (userInfo == null || userInfo.phone == null || userInfo.phone.length <= 0) {
    return null;
  }
  return userInfo.phone;
}

/**
 * 获取openId
 */
function getOpenId() {
  let userInfo = getLocalUserInfo();
  if (userInfo == null || userInfo.openId == null || userInfo.openId.length <= 0) {
    return null;
  }
  return userInfo.openId;
}

/**
 * 是否登陆
 */
function isLogin() {
  let openId = getOpenId();
  if (openId == null) {
    return false;
  }
  return true;
}

/**
 * 开始登陆
 * 
 * 先微信登陆 --》 成功后 调用 自有服务器登陆方法
 */
function startLogin() {
  let that =this;
  wx.login({
    success(res) {
      that.requestLogin(wxCode);
    }    
  })
}

/**
 * 自有服务器 登陆 请求
 * @param wxCode 微信登陆成功后拿到的code
 * @param 登陆 回调 （@param state 成功失败 @param data 返回数据）
 */
function requestLogin(wxCode, loginCallback) {
  wx.request({
    url: url,
    data: {
      wxCode: wxCode,
    },
    success(res) {
      ResponseHandler.handleResponse(res,
        function handleSuccessCallback(root, total) {
          if (typeof loginCallback == "function" && loginCallback) {
            loginCax
          }
          if (typeof loginCallback == "function" && loginCallback) {
            loginCallback(false, code);
          }
        }  
      )
    },
    fail(res) {
      ResponseHandler.handleRequestFail();
    },
    complete(res) {

    }
  })
}



module.exports = {
  saveCurrentRole: saveCurrentRole,
  getCurrentRole: getCurrentRole,
  saveLocalUserInfo: saveLocalUserInfo,
  deleteLocalUserInfo: deleteLocalUserInfo,
  getLocalUserInfo: getLocalUserInfo,
  getPhone: getPhone,
  getOpenId: getOpenId,
  isLogin: isLogin
}