const Util = require("../utils/util.js")
const {
  RequestParamObj
} = require("../utils/requestParamObj.js");
const RequestUtil = require("../utils/requestUtil.js");
const UrlPath = require("../macros/urlPath.js");

/**
 * 新增宠物订单
 * @param param
 * @param addNewPetOrderResultCallback
 */
function addNewPetOrder(param, addNewPetOrderResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_AddNew_Pet,
    data: param,
    success(res) {
      if (Util.checkIsFunction(addNewPetOrderResultCallback)) {
        addNewPetOrderResultCallback(res)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}



/**
 * 新增商品订单
 * @param param
 * @param addNewItemOrderResultCallback
 */
function addNewItemOrder(param, addNewItemOrderResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_AddNew_Item,
    data: param,
    success(res) {
      if (Util.checkIsFunction(addNewItemOrderResultCallback)) {
        addNewItemOrderResultCallback(res)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam)
}

/**
 * 客户 查询订单
 * @param param (customerNo, orderType, offset, limit)
 * @param queryOrderListCallback
 */
function customerQueryOrderList(param, queryOrderListCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_Query_Customer,
    data: param,
    success(res) {
      if (Util.checkIsFunction(queryOrderListCallback)) {
        queryOrderListCallback(res)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 商户 查询订单
 * @param param (businessNo, orderType, offset, limit)
 * @param queryOrderListCallback
 */
function businessQueryOrderList(param, queryOrderListCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_Query_Business,
    data: param,
    success(res) {
      if (Util.checkIsFunction(queryOrderListCallback)) {
        queryOrderListCallback(res)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

module.exports={
  addNewItemOrder: addNewItemOrder, // 新增商品订单
  addNewPetOrder: addNewPetOrder, // 新增宠物订单
  customerQueryOrderList: customerQueryOrderList, // 客户 查询订单
  businessQueryOrderList: businessQueryOrderList, // 商户 查询订单
}