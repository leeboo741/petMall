
const Key_UserInfo = "userInfo";
const Key_CurrentRole = "currentRole";

const ResponseEnum = require("../services/handle/ResponseCodeEnum.js");
const RequestUtil = require("../utils/requestUtil.js");
const {RequestParamObj} = require("../utils/requestParamObj.js");
const UrlPath = require("../macros/urlPath.js");

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
function startLogin(loginCallback) {
  let that = this;
  wx.showLoading({
    title: '登陆中...',
  })
  wx.login({
    success(res) {
      console.log("微信login success => " + res.code);
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      let wxCode = res.code;
      // 查看是否授权
      wx.getSetting({
        success(res) {
          console.log("获取授权成功")
          if (res.authSetting['scope.userInfo']) {
            console.log("获取 scope.userInfo 授权成功")
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success(res) {
                console.log("微信登陆 => \n" + JSON.stringify(res));
                // 微信用户基本信息
                let userInfo = res.userInfo;
                if (userInfo.gender != null && userInfo.gender == "1") {
                  userInfo.gender = "男";
                } else {
                  userInfo.gender = "女";
                }
                // 向服务器请求登陆，返回 本微信 在服务器状态，注册|未注册，
                _requestLogin(wxCode, 
                  function loginCallback(loginSuccess, data){
                    if (loginSuccess) {
                      let tempUserInfo = JSON.parse(data.root);
                      userInfo.customerNo = tempUserInfo.customerNo
                      userInfo.openId = tempUserInfo.openId
                      userInfo.phone = tempUserInfo.phone
                      userInfo.nickName = tempUserInfo.customerName
                      userInfo.avatarUrl = tempUserInfo.headerImage
                      userInfo.gender = tempUserInfo.sex
                      userInfo.role = tempUserInfo.role
                      userInfo.balance = tempUserInfo.balance
                      if (tempUserInfo.staff != null) {
                        userInfo.staffNo = tempUserInfo.staff.staffNo
                        userInfo.stationNo = tempUserInfo.staff.station.stationNo
                      }
                      saveUserInfo(userInfo);
                    } else {
                      if (data.code == ResponseEnum.Res_Code.NOT_EXIST) {

                      }
                    }
                  }
                )
              },
              fail(res) {
                wx.showToast({
                  title: '获取基础信息失败',
                  icon: 'none'
                })
              }
            })
          } else {
            wx.showToast({
              title: '请先授权',
              icon: 'none'
            })
          }
        },
        fail(res) {
          console.log("获取授权失败");
          wx.showToast({
            title: '获取授权失败',
            icon: 'none'
          })
        },
      })
    },
    fail(res) {
      console.log("微信login fail => " + JSON.stringify(res));
      wx.showToast({
        title: '微信登陆失败',
        icon: 'none'
      })
    },   
  })
}

/**
 * 自有服务器 登陆 请求
 * @param wxCode 微信登陆成功后拿到的code
 * @param 登陆 回调 （@param state 成功失败 @param data 返回数据）
 */
function _requestLogin(wxCode, loginCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Login,
    data: {
      "code": wxCode
    },
    success: function (res) {
      if (typeof loginCallback == "function" && loginCallback) {
        loginCallback(true, res)
      }
    },
    fail: function (res) {
      if (typeof loginCallback == "function" && loginCallback) {
        loginCallback(false, res)
      }
    }
  });
  RequestUtil.RequestGET(requestParam);
}

module.exports = {
  saveCurrentRole: saveCurrentRole,
  getCurrentRole: getCurrentRole,
  saveLocalUserInfo: saveLocalUserInfo,
  deleteLocalUserInfo: deleteLocalUserInfo,
  getLocalUserInfo: getLocalUserInfo,
  getPhone: getPhone,
  getOpenId: getOpenId,
  isLogin: isLogin,
  startLogin: startLogin,
}