const Util = require("../utils/util.js")
const {
  RequestParamObj
} = require("../utils/requestParamObj.js");
const RequestUtil = require("../utils/requestUtil.js");
const UrlPath = require("../macros/urlPath.js");

/**
 * 获取服务订单支付参数
 * @param {*} orderNo 
 * @param {*} getServerOrderPayInfoCallback 
 */
function getServerOrderPayInfo(orderNo, getServerOrderPayInfoCallback) {
  let reuqestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pay_Server,
    data: {
      orderNo: orderNo
    },
    success(res) {
      if (Util.checkIsFunction(getServerOrderPayInfoCallback)) {
        getServerOrderPayInfoCallback(res.root)
      }
    }
  })
  RequestUtil.RequestGET(reuqestParam);
}
/**
 * 获取商品订单支付信息
 * @param {string} orderNo 订单号
 * @param {function(boolean, object)} getItemOrderPayInfoCallback 回调
 */
function getItemOrderPayInfo(orderNo, getItemOrderPayInfoCallback) {
  let reuqestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pay_Item,
    data: {
      orderNo: orderNo
    },
    success(res) {
      if (Util.checkIsFunction(getItemOrderPayInfoCallback)) {
        getItemOrderPayInfoCallback(true,res)
      }
    },
    fail(res) {
      if (Util.checkIsFunction(getItemOrderPayInfoCallback)) {
        getItemOrderPayInfoCallback(false,res)
      }
    }
  })
  RequestUtil.RequestGET(reuqestParam);
}

/**
 * 获取宠物订单支付信息
 * @param orderNo
 * @param getPetOrderPayInfoCallback
 */
function getPetOrderPayInfo(orderNo, getPetOrderPayInfoCallback) {
  let reuqestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pay_Pet,
    data: {
      orderNo: orderNo
    },
    success(res) {
      if (Util.checkIsFunction(getPetOrderPayInfoCallback)) {
        getPetOrderPayInfoCallback(true,res)
      }
    }, 
    fail(res) {
      if (Util.checkIsFunction(getPetOrderPayInfoCallback)) {
        getPetOrderPayInfoCallback(false, res);
      }
    }
  })
  RequestUtil.RequestGET(reuqestParam);
}

module.exports={
  getServerOrderPayInfo: getServerOrderPayInfo,
  getItemOrderPayInfo: getItemOrderPayInfo,
  getPetOrderPayInfo: getPetOrderPayInfo,
}