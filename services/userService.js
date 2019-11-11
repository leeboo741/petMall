
/**
 * 
 * 用户相关 服务
 * 
 */

const Key_UserInfo = "userInfo";
const Key_CurrentRole = "currentRole";
const Key_BusinessInfo = "businessInfo";

const app = getApp();

const ResponseEnum = require("../services/handle/ResponseCodeEnum.js");
const RequestUtil = require("../utils/requestUtil.js");
const {
  RequestParamObj
} = require("../utils/requestParamObj.js");
const UrlPath = require("../macros/urlPath.js");
const Util = require("../utils/util.js");

const Login_Success = 0;
const Login_Fail = 1;
const Login_Register = 2;

/**
 * 存储当前角色
 * @param role 角色 买家 0 卖家 1
 */
function saveCurrentRole(role) {
  try {
    wx.setStorageSync(Key_CurrentRole, role)
  } catch (e) {

  }
}

/**
 * 获取当前角色 
 * @return 买家 0 卖家 1
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
 * 存储卖家信息
 * @param businessInfo 卖家信息
 */
function saveLocalBusinessInfo(businessInfo) {
  let businessInfoStr = JSON.stringify(businessInfo);
  try {
    wx.setStorageSync(Key_BusinessInfo, businessInfoStr)
  } catch(e) {

  }
}

/**
 * 删除本地卖家信息
 * @param deleteCallback
 */
function deleteLocalBusinessInfo(deleteCallback) {
  wx.removeStorage({
    key: Key_BusinessInfo,
    success(res) {
      console.log("删除卖家 success: \n" + JSON.stringify(res));
      if (deleteCallback && typeof deleteCallback == "function") {
        deleteCallback(true)
      }
    },
    fail(res) {
      console.log("删除卖家 fail: \n" + JSON.stringify(res));
      if (deleteCallback && typeof deleteCallback == "function") {
        deleteCallback(false)
      }
    }
  })
}

/**
 * 获取本地卖家信息
 * @return businessInfo
 */
function getLocalBusinessInfo() {
  try {
    let businessInfo = JSON.parse(wx.getStorageSync(Key_BusinessInfo));
    return businessInfo;
  } catch (e) {
    return null;
  }
}

/**
 * 存储用户
 * @param userInfo 用户信息
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
 * @param deleteCallback 删除回调
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
 * @return userInfo
 */
function getLocalUserInfo() {
  try {
    let userInfo = JSON.parse(wx.getStorageSync(Key_UserInfo));
    return userInfo;
  } catch (e) {
    return null;
  }
}

/**
 * 获取用户电话
 * @return phone
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
 * @return openId
 */
function getOpenId() {
  let userInfo = getLocalUserInfo();
  if (userInfo == null || userInfo.openId == null || userInfo.openId.length <= 0) {
    return null;
  }
  return userInfo.openId;
}

/**
 * 获取 customerNo
 * @return customerNo
 */
function getCustomerNo() {
  let userInfo = getLocalUserInfo();
  if (userInfo == null || userInfo.customerNo == null || userInfo.customerNo.length <= 0) {
    return null;
  }
  return userInfo.customerNo;
}

/**
 * 是否登陆
 * @return true 已登录 false 未登录
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
 * 先微信登陆 --》 成功后 调用 自有服务器登陆方法
 * @param loginCallback 登陆回调
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
                // 向服务器请求登陆，返回 本微信 在服务器状态，注册|未注册，
                _requestLogin(wxCode,
                  function loginRequestCallback(loginSuccess, data) {
                    if (loginSuccess) {
                      let tempUserInfo = data.root;
                      userInfo.customerNo = tempUserInfo.customerNo
                      userInfo.openId = tempUserInfo.openid
                      userInfo.phone = tempUserInfo.phone
                      userInfo.nickName = tempUserInfo.customerName
                      userInfo.avatarUrl = tempUserInfo.headerImage
                      userInfo.gender = tempUserInfo.sex
                      userInfo.lastLoginTime = tempUserInfo.lastLoginTime
                      userInfo.registrationDate = tempUserInfo.registrationDate
                      userInfo.registrationTime = tempUserInfo.registrationTime
                      userInfo.points = tempUserInfo.points
                      userInfo.balance = tempUserInfo.balance
                      saveLocalUserInfo(userInfo);
                      if (Util.checkIsFunction(loginCallback)) {
                        loginCallback(Login_Success);
                      }
                    } else {
                      if (data.code == ResponseEnum.Res_Code.NOT_EXIST) {
                        loginCallback(Login_Register);
                        app.globalData.tempUserInfo = userInfo;
                        app.globalData.openId = data.errMsg;
                      } else {
                        loginCallback(Login_Fail);
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
 * @param loginCallback 登陆 回调 （@param state 成功失败 @param data 返回数据）
 */
function _requestLogin(wxCode, loginCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Login,
    data: {
      code: wxCode
    },
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    success: function(res) {
      if (typeof loginCallback == "function" && loginCallback) {
        loginCallback(true, res)
      }
    },
    fail: function(res) {
      if (typeof loginCallback == "function" && loginCallback) {
        loginCallback(false, res)
      }
    }
  });
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 注册
 * @param registerData 注册信息
 * @param registerCallback 注册结果回调
 */
function register(registerData, registerCallback) {
  let that = this;
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Register,
    data: registerData.data,
    header: registerData.header,
    success: function(res) {
      let userInfo = {};
      let tempUserInfo = res.root;
      userInfo.customerNo = tempUserInfo.customerNo
      userInfo.openId = tempUserInfo.openid
      userInfo.phone = tempUserInfo.phone
      userInfo.nickName = tempUserInfo.customerName
      userInfo.avatarUrl = tempUserInfo.headerImage
      userInfo.gender = tempUserInfo.sex
      userInfo.lastLoginTime = tempUserInfo.lastLoginTime
      userInfo.registrationDate = tempUserInfo.registrationDate
      userInfo.registrationTime = tempUserInfo.registrationTime
      userInfo.points = tempUserInfo.points
      userInfo.balance = tempUserInfo.balance
      saveLocalUserInfo(userInfo);
      if (typeof registerCallback == "function" && registerCallback) {
        registerCallback(res)
      }
    },
  });
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 获取短信验证码
 * @param phone 手机号
 * @param getCodeCallback
 */
function getCode(phone, getCodeCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_GetCode,
    data: {
      phoneNumber: phone
    },
    success(res) {
      if (typeof getCodeCallback == "function" && getCodeCallback) {
        getCodeCallback(res)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 认证管理
 * @param param
 * @param authenticateResultCallback
 */
function authenticate(param, authenticateResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Auth,
    data: {

    },
    success(res) {
      if (authenticateResultCallback && typeof authenticateResultCallback == "function") {
        authenticateResultCallback(res);
      }
    }
  })
}

module.exports = {
  saveCurrentRole: saveCurrentRole, // 存储当前角色 买家 卖家
  getCurrentRole: getCurrentRole, // 获取当前存储角色 买家 卖家
  saveLocalBusinessInfo: saveLocalBusinessInfo, // 保存 卖家对象
  deleteLocalBusinessInfo: deleteLocalBusinessInfo, // 删除 卖家对象
  getLocalBusinessInfo: getLocalBusinessInfo, // 获取 卖家对象
  saveLocalUserInfo: saveLocalUserInfo, // 保存用户对象
  deleteLocalUserInfo: deleteLocalUserInfo, // 删除用户对象
  getLocalUserInfo: getLocalUserInfo, // 获取用户对象
  getPhone: getPhone, // 获取用户电话
  getCustomerNo: getCustomerNo, // 获取用户客户编号
  getOpenId: getOpenId, // 获取用户 openId
  isLogin: isLogin, // 用户是否已登录
  startLogin: startLogin, // 用户请求登陆
  register: register, // 用户注册
  getCode: getCode, // 用户注册获取 短信验证
  Login_Success, // 登陆成功标识
  Login_Fail, // 登陆失败标识
  Login_Register, // 登陆未注册标识
  authenticate: authenticate, // 商家认证
}