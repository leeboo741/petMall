
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
const Utils = require("../utils/util.js");

const Login_Success = 0;
const Login_Fail = 1;
const Login_Register = 2;

const BusinessObj=require("../entity/businessObj.js");
const CouponObj=require("../entity/couponObj.js");
const util = require("../utils/util.js");
const pagePath = require("../macros/pagePath.js");



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
    let userRole = wx.getStorageSync(Key_CurrentRole);
    if (Util.checkEmpty(userRole)) {
      let businessNo = this.getBusinessNo();
      if (Util.checkEmpty(businessNo)) {
        return 0;
      } else {
        if(getBusinessAuthType() > 0) {
          return 1;
        } else {
          return 0;
        }
      }
    }
    return userRole;
  } catch (e) {
    return null;
  }
}

/**
 * 获取卖家编号
 */
function getBusinessNo() {
  let businessInfo = getLocalUserInfo();
  if (Util.checkEmpty(businessInfo) || Util.checkEmpty(businessInfo.business) || Util.checkEmpty(businessInfo.business.businessNo)) {
    return null;
  }
  return businessInfo.business.businessNo;
}

/**
 * 存储卖家信息
 * @param businessInfo 卖家信息
 */
function saveLocalBusinessInfo(businessInfo) {
  let userInfo = getLocalUserInfo();
  userInfo.business = businessInfo;
  saveLocalUserInfo(userInfo);
}



/**
 * 获取本地卖家信息
 * @return businessInfo
 */
function getLocalBusinessInfo() {
  let userInfo = getLocalUserInfo();
  if (userInfo == null) {
    return null;
  }
  return userInfo.business;
}

/**
 * 获取认证级别
 */
function getBusinessAuthType(){
  let business = getLocalBusinessInfo();
  if (business == null) {
    return 0;
  } 
  if (business.authType == null) {
    return 0;
  }
  return business.authType;
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
  wx.clearStorage({
    success: (res) => {
      if (deleteCallback && typeof deleteCallback == "function") {
        deleteCallback(true)
      }
    },
    fail: (res) => {
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
  if (Util.checkEmpty(userInfo) || Util.checkEmpty(userInfo.phone)) {
    return null;
  }
  return userInfo.phone;
}

/**
 * 获取openId
 */
function getUserOpenId() {
  let userInfo = getLocalUserInfo();
  if (Util.checkEmpty(userInfo) || Util.checkEmpty(userInfo.openid)) {
    return null;
  }
  return userInfo.openid;
}

/**
 * 获取unionId
 * @return openId
 */
function getOpenId() {
  let userInfo = getLocalUserInfo();
  if (Util.checkEmpty(userInfo) || Util.checkEmpty(userInfo.unionId)) {
    return null;
  }
  return userInfo.unionId;
}

/**
 * 获取 customerNo
 * @return customerNo
 */
function getCustomerNo() {
  let userInfo = getLocalUserInfo();
  if (Util.checkEmpty(userInfo) || Util.checkEmpty(userInfo.customerNo)) {
    return null;
  }
  return userInfo.customerNo ;
}

/**
 * 获取 积分
 * @return 积分
 */
function getPoints(){
  let userInfo = getLocalUserInfo();
  if (Util.checkEmpty(userInfo) || Util.checkEmpty(userInfo.points)) {
    return 0;
  }
  return userInfo.points;
}

/**
 * 更新用户积分
 */
function updatePoints(points) {
  let userInfo = getLocalUserInfo();
  if (!Util.checkEmpty(userInfo)) {
    userInfo.points = points;
    saveLocalUserInfo(userInfo);
  }
}

/**
 * 获取 余额
 * @return 余额
 */
function getBalance() {
  let userInfo = getLocalUserInfo();
  if (Util.checkEmpty(userInfo) || Util.checkEmpty(userInfo.balance)) {
    return 0;
  }
  return userInfo.balance;
}

/**
 * 更新用户余额
 */
function updateBalance(balance) {
  let userInfo = getLocalUserInfo();
  if (Util.checkEmpty(userInfo)) {
    userInfo.balance = balance;
    saveLocalUserInfo(userInfo);
  }
}

/**
 * 是否登陆
 * @param isLoginCallback 已经登录回调
 * @param notLoginCallback 没有登录回调
 * @return true 已登录 false 未登录
 */
function isLogin(isLoginCallback, notLoginCallback) {
  let businessNo = getBusinessNo();
  if (Util.checkEmpty(businessNo)) {
    if (notLoginCallback && typeof notLoginCallback == 'function') {
      notLoginCallback();
    }
    return false;
  } else {
    if (isLoginCallback && typeof isLoginCallback == 'function') {
      isLoginCallback();
    }
    return true;
  }
}

/**
 * 获取卖家信息
 * @param customerNo
 * @param getBusinessInfoCallback
 */
function requestBusinessInfo(businessNo, businessInfoCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_LoginBusiness + businessNo,
    data: {
     
    },
    success (res) {
      if (Util.checkIsFunction(businessInfoCallback)) {
        saveLocalBusinessInfo(res.root);
        businessInfoCallback(res.root);
        Utils.logInfo("BusinessInfo==> \n" + JSON.stringify(res.root));
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取商家认证信息
 * @param customerNo
 * @param getBusinessInfoCallback
 */
function requestAuthByAuthNo(businessNo, getBusinessInfoCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Auth_ByAuthNo + businessNo,
    data: {
      
    },
    success(res) {
      if (Util.checkIsFunction(getBusinessInfoCallback)) {
        getBusinessInfoCallback(res.root);
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}


function _requestPhone(wxCode, encryptedData, iv, dataInfo, loginCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Decode,
    data: {
      code: wxCode,
      encryptedData: encryptedData,
      iv: iv,
      wxUserInfo: dataInfo,
      shareOpenId: app.globalData.shareOpenId? app.globalData.shareOpenId : ""
    },
    method: "POST",
    header: {
      "Content-Type": "application/json"
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
  RequestUtil.RequestPOST(requestParam);
}
/**
 * 自有服务器 登陆 请求
 * @param wxCode 微信登陆成功后拿到的code
 * @param loginCallback 登陆 回调 （@param state 成功失败 @param data 返回数据）
 */
function _requestLogin(wxCode, encryptedData, iv, loginCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Login,
    data: {
      code: wxCode,
      encryptedData: encryptedData,
      iv: iv
    },
    method: "POST",
    header: {
      'content-type': 'application/json'
    },
    
    success: function(res) {
      if (typeof loginCallback == "function" && loginCallback) {
        loginCallback(res,true)
      }
    },
    fail: function(res) {
      if (typeof loginCallback == "function" && loginCallback) {
        loginCallback(res,false)
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
      userInfo.unionId = tempUserInfo.unionId
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
 * @param param (type, business, name, identifier, identifierImagePath, license, licenseImagePath, storeName, region, detailAddress, storeFontImagePath)
 * @param authenticateResultCallback
 */
function authenticate(param, authenticateResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Auth,
    data: param,
    success(res) {
      if (authenticateResultCallback && typeof authenticateResultCallback == "function") {
        authenticateResultCallback(res);
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 提交保证金申请
 * @param param(billNo, authNo, authType, businessNo, amount)
 * @param bondResultCallback
 */
function addBond(param, bondResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_BusinessBond,
    data: {
     business: {
        businessNo: param.businessNo,
     }
    },
    success(res) {
      if (Util.checkIsFunction(bondResultCallback)) {
        bondResultCallback(res);
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 获得保证金对象
 */
function getBusinessBond(businessNo, bondResultCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_GetBusinessBond + businessNo,
    data: {
    },
    success(res) {
      if (Util.checkIsFunction(bondResultCallback)) {
        bondResultCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取保证金支付金额
 */
function getBusinessBondPrice(bondResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_QueryBondAmout,
    data: {
    },
    success(res) {
      if (Util.checkIsFunction(bondResultCallback)) {
        bondResultCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 支付保证金
 */
function payBond(businessNo, bondResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Bond_PayParam,
    data: {
      businessNo: businessNo
    },
    success(res) {
      if (Util.checkIsFunction(bondResultCallback)) {
        bondResultCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}


/**
 * 本月交易额
 */
function getThisMonthAmountOfMoney(businessNo, bondResultCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_TotalMonth,
    data: {
      businessNo: businessNo
    },
    success(res) {
      if (Util.checkIsFunction(bondResultCallback)) {
        bondResultCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
} 


/**
 * 商家关注对象（校验）
 *  Url_BusinessFollow , //获取关注对象（可作为校验）
 */
function getBusinessFollowAndFs(businessFollowPoj, resultCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_BusinessFollow +"?paramStr="+ encodeURIComponent(JSON.stringify(BusinessObj.businessFollow(businessFollowPoj)), 'utf-8'),
    data: {},
    success(res) {
      if (Util.checkIsFunction(resultCallback)) {
        resultCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 添加关注或者收藏
 *     Url_AddFollow , //添加关注或收藏
 */
function addBusinessFollow(businessFollowPoj, resultCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_AddFollow + "?paramStr=" + encodeURIComponent(JSON.stringify(BusinessObj.businessFollow(businessFollowPoj)), 'utf-8'),
    data: {},
    method: "PUT",
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      if (Util.checkIsFunction(resultCallback, resultCallback)) {
        resultCallback(res);
      }
    }
  })
  RequestUtil.RequestPUT(requestParam);
}

/**
 * 查看粉丝
 */
function getBusinessFansList(bussinessFansObj, resultCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Get_BusinessFans + "?queryParam=" + encodeURIComponent(JSON.stringify(bussinessFansObj), 'utf-8'),
    data: {},
    success(res) {
      if (Util.checkIsFunction(resultCallback)) {
        resultCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取商家关注或收藏列表
 * Url_BusinessFollowList , //关注或收藏列表
 */
function getBusinessFollowList(businessFollowPoj, resultCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_BusinessFollowList + "?queryParam=" + encodeURIComponent(JSON.stringify(BusinessObj.businessFollowList(businessFollowPoj)), 'utf-8'),
    data: {},
    success(res) {
      if (Util.checkIsFunction(resultCallback)) {
        resultCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 取消关注或收藏
 * Url_BusinessUnfollow ,  //取消关注或收藏
 */
function businessUnFollow(businessFollowPoj, resultCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_BusinessUnfollow + "?paramStr=" + encodeURIComponent(JSON.stringify(BusinessObj.businessFollow(businessFollowPoj)), 'utf-8'),
    data: {},
    method: "PUT",
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      if (Util.checkIsFunction(resultCallback)) {
        resultCallback(res);
      }
    }
  })
  RequestUtil.RequestPUT(requestParam);
}

/**
 * 更新商家信息
 */
function updateBusinessInfo(submissionObject, resultCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_BusinessDetail,
    data: submissionObject,
    success(res) {
      if (Util.checkIsFunction(resultCallback)) {
        resultCallback(res);
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}


/**
 * 获取积分流水
 */
function getBusinessCreditFlow(param, resultCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_BusinessCreditFlow + "?queryParam=" + encodeURIComponent(JSON.stringify(param), 'utf-8'),
    data: {},
    success(res) {
      if (Util.checkIsFunction(resultCallback)) {
        resultCallback(res.root);
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}


/**
 * 优惠券列表
 */
function getCouponList(param, resultCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_BusinessCouponList + "?queryParam=" + encodeURIComponent(JSON.stringify(CouponObj.couponObj(param)), 'utf-8'),
    data: {},
    success(res) {
      if (Util.checkIsFunction(resultCallback)) {
        resultCallback(res.root);
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 是否有未领取大礼包
 * @param {string} businessNo 商家编号
 * @param {function(boolean, object)} callback 回调 
 */
function haveNewGiftBag(businessNo, callback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_HaveNewGiftBag,
    data: {
      businessNo: businessNo!=null?businessNo: getBusinessNo()
    },
    success(res) {
      if (Util.checkIsFunction(callback)) {
        callback(true, res.root);
      }
      if (res.root) {
        setTimeout(function(){
          wx.showModal({
            title: '领取大礼包',
            content: '有新客大礼包未领取，是否领取',
            confirmText: '领取礼包',
            cancelText: '暂不领取',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: pagePath.Page_Me_NewGiftBag,
                })
              }
            }
          })
        },0);
      }
    },
    fail(res) {
      if (Util.checkIsFunction(callback)) {
        callback(false, res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 领取大礼包
 * @param {string} businessNo 商家编号 
 * @param {function(boolean, object)} callback 
 */
function receiveNewGiftBag(businessNo, callback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_ReceiveNewGiftBag + "?businessNo=" + businessNo,
    success(res) {
      if (util.checkIsFunction(callback)){
        callback(true, res.root);
      }
    },
    fail(res) {
      if (util.checkIsFunction(callback)) {
        callback(false, res);
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 获取新客大礼包列表
 * @param {function(boolean, object)} callback 
 */
function getNewGiftBagList(callback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_NewGiftBagList,
    success(res) {
      if (Util.checkIsFunction(callback)) {
        callback(true, res.root);
      }
    },
    fail(res) {
      if (Util.checkIsFunction(callback)) {
        callback(false, res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}



module.exports = {
  saveCurrentRole: saveCurrentRole, // 存储当前角色 买家 卖家
  getCurrentRole: getCurrentRole, // 获取当前存储角色 买家 卖家
  getBusinessNo: getBusinessNo, // 获取卖家编号
  requestBusinessInfo: requestBusinessInfo, // 请求卖家信息
  saveLocalBusinessInfo: saveLocalBusinessInfo, // 保存 卖家对象
  getLocalBusinessInfo: getLocalBusinessInfo, // 获取 卖家对象
  getBusinessAuthType: getBusinessAuthType, // 获取认证级别
  saveLocalUserInfo: saveLocalUserInfo, // 保存用户对象
  deleteLocalUserInfo: deleteLocalUserInfo, // 删除用户对象
  getLocalUserInfo: getLocalUserInfo, // 获取用户对象
  getPhone: getPhone, // 获取用户电话
  getCustomerNo: getCustomerNo, // 获取用户客户编号
  getPoints: getPoints, // 获取积分数目
  updatePoints: updatePoints, // 更新积分
  getBalance: getBalance, // 获取余额数目
  updateBalance: updateBalance, // 更新余额
  getUserOpenId: getUserOpenId, // 获取 openid
  getOpenId: getOpenId, // 获取用户 unionid
  isLogin: isLogin, // 用户是否已登录
  register: register, // 用户注册
  getCode: getCode, // 用户注册获取 短信验证
  Login_Success, // 登陆成功标识
  Login_Fail, // 登陆失败标识
  Login_Register, // 登陆未注册标识
  authenticate: authenticate, // 商家认证
  addBond: addBond, // 提交保证金申请
  getBusinessBond: getBusinessBond, //获得保证金额
  getThisMonthAmountOfMoney: getThisMonthAmountOfMoney, //本月交易额
  requestAuthByAuthNo: requestAuthByAuthNo,  //获取商家认证信息
  getBusinessFollowAndFs: getBusinessFollowAndFs , //商家关注对象校验
  updateBusinessInfo: updateBusinessInfo, //更新商家信息
  addBusinessFollow: addBusinessFollow, //添加关注或收藏
  getBusinessFollowList: getBusinessFollowList, //获得商家关注或收藏列表
  getBusinessFansList: getBusinessFansList, //用户粉丝
  businessUnFollow: businessUnFollow, //取消关注或者收藏
  _requestLogin: _requestLogin, //获取用户基本信息
  _requestPhone: _requestPhone, //获得手机号码
  getBusinessCreditFlow: getBusinessCreditFlow, //获得用户积分流水
  getCouponList: getCouponList, //获得优惠券列表
  getBusinessBondPrice: getBusinessBondPrice, //获得保证金额
  payBond: payBond, //保证金参数
  haveNewGiftBag: haveNewGiftBag, // 是否有未领取大礼包
  getNewGiftBagList, // 获取新客大礼包列表
  receiveNewGiftBag, // 领取大礼包
}