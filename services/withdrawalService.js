const Util = require("../utils/util.js")
const {
  RequestParamObj
} = require("../utils/requestParamObj.js");
const RequestUtil = require("../utils/requestUtil.js");
const UrlPath = require("../macros/urlPath.js");

/**
 * 获取用户余额
 * @parm businessNo 商家No
 * getUserBalanceCallback 回调函数
 */
function getUserBalance(businessNo, getUserBalanceCallback){
  let reuqestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_balance + businessNo,
    data: {
    },
    success(res) {
      if (Util.checkIsFunction(getUserBalanceCallback)) {
        getUserBalanceCallback(res)
      }
    }
  })
  RequestUtil.RequestGET(reuqestParam);
}

/**
 * 获得可提现余额
 * @parm businessNo 商家No
 * getCanBalanceCallback 回调函数
 */
function getCanBalance(businessNo, getCanBalanceCallback){
  let reuqestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_CanBalance,
    data: {
      businessNo: businessNo
    },
    success(res) {
      if (Util.checkIsFunction(getCanBalanceCallback)) {
        getCanBalanceCallback(res)
      }
    }
  })
  RequestUtil.RequestGET(reuqestParam);
}

/**
 * 获得冻结金额
 * @parm businessNo 商家No
 * getCanBalanceCallback 回调函数
 */
function getfreezingAmount(businessNo,getfreezingAmountCallback){
  let reuqestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_FrozenAmount,
    data: {
      businessNo: businessNo
    },
    success(res) {
      if (Util.checkIsFunction(getfreezingAmountCallback)) {
        getfreezingAmountCallback(res)
      }
    }
  })
  RequestUtil.RequestGET(reuqestParam);
}

/**
 * 提现
 * @parm businessNo 商家No
 * amount 提现金额
 */
function businessWithdraw(param,businessWithdrawCallBack){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Withdraw,
    data: {
      amount:param.amount,
      business:{
         businessNo: param.businessNo
      }
    },
    success(res) {
      if (Util.checkIsFunction(businessWithdrawCallBack)) {
        businessWithdrawCallBack(res)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 余额流水
 * @parm businessNo 商家No
 * offset 开始下标
 * limit 条数
 */
function getBusinessFlow(followObj, getBusinessFlowCallBack){

  let reuqestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_BusinessFlow + "?queryParam=" + encodeURIComponent(JSON.stringify(followObj), 'utf-8'),
    data: {
     
    },
    success(res) {
      if (Util.checkIsFunction(getBusinessFlowCallBack)) {
        getBusinessFlowCallBack(res)
      }
    }
  })
  RequestUtil.RequestGET(reuqestParam);
}

module.exports = {
  getUserBalance: getUserBalance,
  getfreezingAmount: getfreezingAmount,
  businessWithdraw: businessWithdraw,
  getCanBalance: getCanBalance,
  getBusinessFlow: getBusinessFlow
}