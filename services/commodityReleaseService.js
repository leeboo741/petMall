const {
  RequestParamObj
} = require("../utils/requestParamObj.js");
const RequestUtil = require("../utils/requestUtil.js");
const UrlPath = require("../macros/urlPath.js");
const Util = require("../utils/util.js");


/**
 * 更新发布的商品
 *   Url_UpdteItem, //编辑商品
 */
function updateReleaseCommodity(item, callBack){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_UpdteItem,
    data: item,
    method: "POST",
    header: {
      'content-type': 'application/json'
    },

    success: function (res) {
      if (typeof callBack == "function" && callBack) {
        callBack(res)
      }
    },
    fail: function (res) {
      if (typeof callBack == "function" && callBack) {
        callBack(res)
      }
    }
  });
  RequestUtil.RequestPOST(requestParam);
}


/**
 * 发布商品
 */
function releaseCommodities(item, callBack){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_PutItem,
    data: item,
    method: "POST",
    header: {
      'content-type': 'application/json'
    },

    success: function (res) {
      if (typeof callBack == "function" && callBack) {
        callBack(res)
      }
    },
    fail: function (res) {
      if (typeof callBack == "function" && callBack) {
        callBack(res)
      }
    }
  });
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 商品下架
 */
function commodityUpperShelf(itemNo, resultCallback){
  let reuqestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_OffSaleItem + itemNo,
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
  RequestUtil.RequestPUT(reuqestParam);
}

/**
 * 商品上架
 */
function commodityLowerShelf(itemNo, resultCallback){
  let reuqestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_OnSaleItem + itemNo,
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
  RequestUtil.RequestPUT(reuqestParam);
}

module.exports = {
  updateReleaseCommodity: updateReleaseCommodity,
  releaseCommodities: releaseCommodities,
  commodityUpperShelf: commodityUpperShelf,
  commodityLowerShelf: commodityLowerShelf
}