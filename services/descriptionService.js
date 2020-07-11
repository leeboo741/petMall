const UrlPath = require("../macros/urlPath.js");
const UserService=require("../services/userService.js");

const ResponseEnum = require("../services/handle/ResponseCodeEnum.js");
const RequestUtil = require("../utils/requestUtil.js");
const {
  RequestParamObj
} = require("../utils/requestParamObj.js");

const Util = require("../utils/util.js");
const Utils = require("../utils/util.js");

let userInfoRole = wx.getStorageSync("currentRole");

// Utils.logInfo("获取用户的状态：" + JSON.stringify(userInfo) + "获得用户的信息：" + JSON.stringify(UserService.getLocalUserInfo()));

/**
 * 成为分销
 */
function becomeDescription(openid, descriptioCallback) {
  let customerNo = UserService.getLocalUserInfo().customerNo; //商家
  let businessNo = UserService.getLocalBusinessInfo().businessNo; //卖家
  let data={};
  if (userInfoRole==0){
    data.customerNo = customerNo
  } else if (userInfoRole==1){
    data.businessNo = businessNo
  }

  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Description,
    data: data,
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    success(res) {
      if (Util.checkIsFunction(descriptioCallback)) {
        descriptioCallback(res);
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}


/**
 * 获得分销列表
 * 
 */
function queryDescriptionList(data,queryDescriptionback){
 
 wx.request({
    url: UrlPath.Url_Base + UrlPath.Url_DescriptionList,
    data: data,
    success(res) {
      if (typeof queryDescriptionback == "function" && queryDescriptionback) {
        queryDescriptionback(res);
      }
    },
   fail(res) {
     if (typeof queryDescriptionback == "function" && queryDescriptionback) {
       queryDescriptionback(null);
     }
    }
  })
}


module.exports = {
  becomeDescription: becomeDescription, //成为分销商
  queryDescriptionList: queryDescriptionList  //获得分销列表
}