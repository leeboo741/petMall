const ResponseEnum = require("../services/handle/ResponseCodeEnum.js");
const RequestUtil = require("../utils/requestUtil.js");
const {
  RequestParamObj
} = require("../utils/requestParamObj.js");
const UrlPath = require("../macros/urlPath.js");
const Util = require("../utils/util.js");

/**
 * 添加购物车
 * @param qty 数量
 * @param goodsNo 商品或宠物id
 * @param businessNo 用户id
 * @param addShopCartCallBack 回调函数
 */
function addShoppingCart(qty, goodsNo, businessNo, goodsType,addShopCartCallBack) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_AddShopCart,
    data: {
      qty: qty,
      goodsNo: goodsNo,
      businessNo: businessNo,
      goodsType: goodsType
    },
    method: "POST",
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      if (typeof addShopCartCallBack == "function" && addShopCartCallBack) {
        addShopCartCallBack(res)
      }
    },
    fail: function (res) {
      if (typeof addShopCartCallBack == "function" && addShopCartCallBack) {
        addShopCartCallBack(res)
      }
    }
  });
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 查询购物车
 * @param businessNo 用户id
 * @param getDataCallback 回调函数
 */
function queryShoppingCart(businessNo, start, limit, getDataCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_QueryShopCart,
    data: {
      businessNo: businessNo,
      start: start,
      limit: limit
    },
    success(res) {
      if (typeof getDataCallback == "function" && getDataCallback) {
        getDataCallback(res.root);
      }
    },
  })
  RequestUtil.RequestGET(requestParam)
}


/**
 * 删除
 */
function delShoppingCart(delShoppingCartVO, deleteCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_delShopCart,
    data:delShoppingCartVO,
    header: { 'content-type': 'application/json'},
    success(res) {
      if (Util.checkIsFunction(deleteCallback)) {
        deleteCallback(res)
      }
    }
  })
  RequestUtil.RequestDELETE(requestParam);
}

/**
 * 修改购物车数量
 */
function updateShoppingCart(qty, goodsType, businessNo, goodsNo, editCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_UpdateShopCart,
    data: {
      qty: qty,
      goodsType: goodsType,
      businessNo: businessNo,
      goodsNo: goodsNo
    },
    header:{
      'content-type': 'application/x-www-form-urlencoded'
    },
    success(res) {
      if (Util.checkIsFunction(editCallback)) {
        editCallback(res)
      }
    }
  })
  RequestUtil.RequestPUT(requestParam);
}


module.exports = {
  addShoppingCart: addShoppingCart,
  queryShoppingCart:queryShoppingCart,
  delShoppingCart: delShoppingCart,
  updateShoppingCart: updateShoppingCart
}