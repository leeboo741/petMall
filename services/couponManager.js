const ResponseEnum = require("../services/handle/ResponseCodeEnum.js");
const RequestUtil = require("../utils/requestUtil.js");
const { RequestParamObj } = require("../utils/requestParamObj.js");
const UrlPath = require("../macros/urlPath.js");
const Util = require("../utils/util.js");

/**
 * 获取可兑换优惠券列表
 */
function getExchangeAbleCounponList(getCouponListCallback, failCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Coupon_ExchangeAble,
    data: {},
    success(res) {
      if (Util.checkIsFunction(getCouponListCallback)) {
        getCouponListCallback(res.root)
      }
    },
    fail(res){
      if (Util.checkIsFunction(failCallback)) {
        failCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 兑换优惠券
 */
function exchangeCoupon(businessNo, couponTypeID, exchangeCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Coupon_Exchange,
    data: {
      businessNo: businessNo,
      couponTypeID: couponTypeID
    },
    method: "POST",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (Util.checkIsFunction(exchangeCallback)) {
        exchangeCallback(res.root)
      }
    },
  });
  RequestUtil.RequestPOST(requestParam);
}

module.exports={
  getExchangeAbleCounponList: getExchangeAbleCounponList,
  exchangeCoupon: exchangeCoupon,
}