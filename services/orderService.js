const Util = require("../utils/util.js")
const Utils = require("../utils/util.js");
const {
  RequestParamObj
} = require("../utils/requestParamObj.js");
const RequestUtil = require("../utils/requestUtil.js");
const UrlPath = require("../macros/urlPath.js");
const requestParamObj = require("../utils/requestParamObj.js");
const urlPath = require("../macros/urlPath.js");
const util = require("../utils/util.js");

/**
 * 根据单号删除宠物订单
 */
function deletePetOrderByOrderNo(orderNo,buyerNo,waybillNo, deleteCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_Delete_Pet(orderNo,buyerNo,waybillNo),
    success(res) {
      if (Utils.checkIsFunction(deleteCallback)) {
        deleteCallback(res.root);
      }
    },
    fail(res) {

    },
    complete(res) {

    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 根据单号删除商品订单
 */
function deleteItemOrderByOrderNo(orderNo, deleteCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_Delete_Item(orderNo),
    success(res) {
      if (Utils.checkIsFunction(deleteCallback)) {
        deleteCallback(res.root);
      }
    },
    fail(res) {

    },
    complete(res) {

    }
  })
  RequestUtil.RequestPOST(requestParam);
}

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
 * 获得宠物订单总价
 */
function getPetOrderPrice(param, resultCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_OrderPrice,
    data: param,
    success(res) {
      if (Util.checkIsFunction(resultCallback)) {
        resultCallback(res)
      }
    },
    fail(res){
      Utils.logInfo(res)
    }
  })
  RequestUtil.RequestPOST(requestParam);
}


/**
 * 新增商品订单
 * @param {object} param 参数
 * @param {function(boolean, object)} addNewItemOrderResultCallback 回调
 */
function addNewItemOrder(param, addNewItemOrderResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_AddNew_Item,
    data: param,
    success(res) {
      if (Util.checkIsFunction(addNewItemOrderResultCallback)) {
        addNewItemOrderResultCallback(true, res);
      }
    },
    fail(res) {
      if (Util.checkIsFunction(addNewItemOrderResultCallback)) {
        addNewItemOrderResultCallback(false, res);
      }
    }
  })
  RequestUtil.RequestPOST(requestParam)
}

/**
 * 获取商品订单价格
 */
function getItemOrderPrice(param,getItemOrderPriceCallBack){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Item_QueryOrderPrice,
    data: param,
    success(res) {
      if (Util.checkIsFunction(getItemOrderPriceCallBack)) {
        getItemOrderPriceCallBack(res)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam)
}

//=================================买家宠物订单============================================

/**
 * 客户 查询买家宠物未支付订单
 * @param param (customerNo, orderType, offset, limit)
 * @param queryOrderListCallback
 */
function customerQueryOrderList(param, queryOrderListCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Non_Payment,
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
 * 查询买家宠物待发货
 */
function customerQueryBeShipped(param, queryOrderListCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_To_BeDelivered,
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
 * 查询买家宠物待评价订单
 */
function customerQueryToBeEvaluated(param, queryOrderListCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_To_BeEvaluated,
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
 * 查询买家宠物待收货订单
 */
function customerQueryToBeReceived(param, queryOrderListCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_To_BeReceived,
    data: param,
    success(res) {
      if (Util.checkIsFunction(queryOrderListCallback)) {
        queryOrderListCallback(res)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

//===================================买家商品订单==========================================

/**
 * 买家商品未支付订单
 */
function userGoodsOrderUnpaid(param,queryOrderUnpaid){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_UserItemOrder_Onpay,
    data: param,
    success(res) {
      if (Util.checkIsFunction(queryOrderUnpaid)) {
        queryOrderUnpaid(res)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}


/**
 * 买家商品待发货订单
 */
function userGoodOrderToBeShipped(param, queryOrderToBeShipped){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_UserItemOrder_Delivered,
    data: param,
    success(res) {
      if (Util.checkIsFunction(queryOrderToBeShipped)) {
        queryOrderToBeShipped(res)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}


/**
 * 买家商品待评价订单
 */
function userGoodOrderToBeEvaluated(param, queryOrderToBeEvaluated){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_UserItemOrder_Evaluated,
    data: param,
    success(res) {
      if (Util.checkIsFunction(queryOrderToBeEvaluated)) {
        queryOrderToBeEvaluated(res)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}


/**
 * 买家商品待收货订单
 */
function userGoodOrderToBeReceived(param, queryOrderToBeReceived) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_UserItemOrder_Received,
    data: param,
    success(res) {
      if (Util.checkIsFunction(queryOrderToBeReceived)) {
        queryOrderToBeReceived(res)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

//===================================卖家宠物==========================================

/**
 * 客户 查询卖家宠物未支付订单
 * @param param (customerNo, orderType, offset, limit)
 * @param queryOrderListCallback
 */
function businessPetQueryOrderList(param, queryOrderListCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Business_No_Payment,
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
 * 查询卖家宠物待发货
 */
function businessQueryBeShipped(param, queryOrderListCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_BusinessTo_BeDelivered,
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
 * 查询卖家宠物待评价订单
 */
function businessQueryToBeEvaluated(param, queryOrderListCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_BusinessTo_BeEvaluated,
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
 * 查询卖家宠物待收货订单
 */
function businessQueryToBeReceived(param, queryOrderListCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_BusinessTo_BeReceived,
    data: param,
    success(res) {
      if (Util.checkIsFunction(queryOrderListCallback)) {
        queryOrderListCallback(res)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}


//===================================卖家商品==========================================

/**
 * 卖家商品未支付订单
 */
function businessGoodsOrderUnpaid(param, queryOrderUnpaid) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_BusinessItemOrder_Onpay,
    data: param,
    success(res) {
      if (Util.checkIsFunction(queryOrderUnpaid)) {
        queryOrderUnpaid(res)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}


/**
 * 卖家商品待发货订单
 */
function businessGoodOrderToBeShipped(param, queryOrderToBeShipped) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_BusinessItemOrder_Delivered,
    data: param,
    success(res) {
      if (Util.checkIsFunction(queryOrderToBeShipped)) {
        queryOrderToBeShipped(res)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}


/**
 * 卖家商品待评价订单
 */
function businessGoodOrderToBeEvaluated(param, queryOrderToBeEvaluated) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_BusinessItemOrder_Evaluated,
    data: param,
    success(res) {
      if (Util.checkIsFunction(queryOrderToBeEvaluated)) {
        queryOrderToBeEvaluated(res)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}


/**
 * 卖家商品待收货订单
 */
function businessGoodOrderToBeReceived(param, queryOrderToBeReceived) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_BusinessItemOrder_Received,
    data: param,
    success(res) {
      if (Util.checkIsFunction(queryOrderToBeReceived)) {
        queryOrderToBeReceived(res)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}



//=====================================================================================
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

/**
 * 确认发货 宠物
 * @param param(sendBillNo, orderNo)
 * @param sendResultCallback
 */
function confirmSendPetOrder(param, sendResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_ConfirmSend_Pet(param.orderNo, param.sendBillNo),
    success(res) {
      if (Util.checkIsFunction(sendResultCallback)) {
        sendResultCallback(res)
      }
    }
  })
  RequestUtil.RequestPUT(requestParam);
}

/**
 * 确认发货 商品
 * @param param(sendBillNo, orderNo)
 * @param sendResultCallback
 */
function confirmSendItemOrder(param, sendResultCallback) {
  // param.orderNo, param.sendBillNo, param.expressCompany
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_ConfirmSend_Item(param.orderNo, param.sendBillNo,param.expressCompany),
    success(res) {
      if (Util.checkIsFunction(sendResultCallback)) {
        sendResultCallback(res)
      }
    }
  })
  RequestUtil.RequestPUT(requestParam);
}

/**
 * 确认收货 宠物
 * @param param(orderNo)
 * @param reciveResultCallback
 */
function confirmRecivePetOrder(param, reciveResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_ConfirmRecive_Pet + param.orderNo,
    success(res) {
      if (Util.checkIsFunction(reciveResultCallback)) {
        reciveResultCallback(res)
      }
    }
  })
  RequestUtil.RequestPUT(requestParam);
}

/**
 * 确认收货 商品
 * @param param(orderNo)
 * @param reciveResultCallback
 */
function confirmReciveItemOrder(param, reciveResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_ConfirmRecive_Item + param.orderNo,
    success(res) {
      if (Util.checkIsFunction(reciveResultCallback)) {
        reciveResultCallback(res)
      }
    }
  })
  RequestUtil.RequestPUT(requestParam);
}

/**
 * 宠物 申请退款
 * @param param(refundImages, orderNo, reason, refundAmount, orderAmount)
 * @param refundResultCallback
 */
function petRefundOrder(param, refundResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_Refund_Pet,
    data: {
      initiateRefundImgs: param.refundImages,
      petOrderNo: param.orderNo,
      refundCause: param.reason,
      refundFee: param.refundAmount,
      totalFee: param.orderAmount
    },
    success(res) {
      if (Util.checkIsFunction(refundResultCallback)) {
        refundResultCallback(res)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 商品 申请退款
 * @param param(refundImages, orderNo, reason, refundAmount, orderAmount)
 * @param refundResultCallback
 */
function itemRefundOrder(param, refundResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_Refund_Item,
    data: {
      initiateRefundImgs: param.refundImages,
      itemOrderNo: param.orderNo,
      refundCause: param.reason,
      refundFee: param.refundAmount,
      totalFee: param.orderAmount
    },
    success(res) {
      if (Util.checkIsFunction(refundResultCallback)) {
        refundResultCallback(res)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 查看退款详情
 * @param param
 * @param getRefundDetailCallback
 */
function refundDetail(param, getRefundDetailCallback) {
  let tempData = {};
  tempData.refundNo = param.refundNo;
  if (!Util.checkEmpty(param.petOrderNo)) {
    tempData.petOrderNo = param.petOrderNo;
  }
  if (!Util.checkEmpty(param.itemOrderNo)) {
    tempData.itemOrderNo = param.itemOrderNo;
  }
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_Refund_Detail,
    data: tempData,
    success(res) {
      if (Util.checkIsFunction(getRefundDetailCallback)) {
        getRefundDetailCallback(res)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 确认退款 宠物
 * @param param(orderNo, refundState, rejectReason)
 * @param confirmRefundCallback
 */
function confirmRefundPet(param, confirmRefundCallback) {
  let tempData = {};
  tempData.petOrderNo = param.orderNo;
  tempData.refundState = param.refundState;
  tempData.refundNo = param.refundNo;
  if (param.refundState == -1) {
    if (!Util.checkEmpty(param.rejectReason)) {
      tempData.cancelRefundCause = param.rejectReason
    }
  }
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_Refund_Confirm_Pet,
    data: tempData,
    success(res){
      if (Util.checkIsFunction(confirmRefundCallback)) {
        confirmRefundCallback(res);
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 确认退款 商品
 * @param param(orderNo, refundState, rejectReason)
 * @param confirmRefundCallback
 */
function confirmRefundItem(param, confirmRefundCallback) {
  let tempData = {};
  tempData.itemOrderNo = param.orderNo;
  tempData.refundState = param.refundState;
  tempData.refundNo = param.refundNo;
  if (param.refundState == -1) {
    if (!Util.checkEmpty(param.rejectReason)) {
      tempData.cancelRefundCause = param.rejectReason
    }
  }
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_Refund_Confirm_Item,
    data: tempData,
    success(res) {
      if (Util.checkIsFunction(confirmRefundCallback)) {
        confirmRefundCallback(res);
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}


/**
 *  获取运价
 */
function queryFreightRates(param, queryFreightRatesCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_FreightRates,
    data: param,
    success(res) {
      if (Util.checkIsFunction(queryFreightRatesCallback)) {
        queryFreightRatesCallback(res)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 *  获取运输方式
 *  @param startCity 开始城市
 *  @param endCity   结束城市
 *  queryListTransportTypeCallback 回调函数
 */
function queryListTransportType(startCity, endCity, queryListTransportTypeCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_ListTransportType,
    data: {
      startCity: startCity,
      endCity: endCity
    },
    success(res) {
      if (Util.checkIsFunction(queryListTransportTypeCallback)) {
        queryListTransportTypeCallback(true, res)
      }
    },
    fail (res) {
      Utils.logInfo(res);
      if (res.code == 30001) { // 数据为空, 查询为空
        res.root = [];
        if (Util.checkIsFunction(queryListTransportTypeCallback)) {
          queryListTransportTypeCallback(false, res)
        }
      } else {
        if (Util.checkIsFunction(queryListTransportTypeCallback)) {
          queryListTransportTypeCallback(false, res)
        }
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}


/**
 * 获得本单据可用优惠券
 * businessNo 用户编号
 * shopNo 商家编号  商家主键
 * type 类别(1.宠物;2.商品;3.服务)
 * key 查询的关键字 主键
 */
function getAbleCouponList(businessNo, shopNo, type, key, getAbleCouponListCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_GetCoupon,
    data: {
      businessNo: businessNo,
      shopNo: shopNo,
      type: type,
      key: key
    },
    success(res) {
      if (Util.checkIsFunction(getAbleCouponListCallback)) {
        getAbleCouponListCallback(res.root)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取宠物订单详情
 */
function getPetOrderDetail(orderNo, getDetailCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_Detail_Pet(orderNo),
    success(res){
      if (Util.checkIsFunction(getDetailCallback)) {
        getDetailCallback(res.root)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取商品订单详情
 */
function getItemOrderDetail(orderNo, getDetailCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_Detail_Item(orderNo),
    success(res){
      if (Util.checkIsFunction(getDetailCallback)) {
        getDetailCallback(res.root)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取订单 运输详情
 */
function getPetOrderTransport(orderNo, getTransportCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_Transport_Pet(orderNo),
    success(res) {
      if (Util.checkIsFunction(getTransportCallback)) {
        getTransportCallback(res.root)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 修改商品订单价格
 * @param {string} orderNo 订单编号
 * @param {number} newPrice 改后价格
 * @param {function(boolean, object)} callback 回调
 */
function changeItemOrderPrice(orderNo, newPrice, callback) {
  let requestParam = new RequestParamObj({
    url: urlPath.Url_Base + urlPath.Url_Item_Order_ChangePrice,
    data: {
      orderNo: orderNo,
      price: newPrice
    },
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    success(res) {
      if (util.checkIsFunction(callback)) {
        callback(true, res)
      }
    },
    fail (res) {
      if (util.checkIsFunction(callback)) {
        callback(false, res)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 修改宠物订单价格
 * @param {string} orderNo 订单编号
 * @param {number} newPrice 改后价格
 * @param {function(boolean, object)} callback 回调
 */
function changePetOrderPrice(orderNo, newPrice, callback) {
  let requestParam = new RequestParamObj({
    url: urlPath.Url_Base + urlPath.Url_Pet_Order_ChangePrice,
    data: {
      orderNo: orderNo,
      price: newPrice
    },
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    success(res) {
      if (util.checkIsFunction(callback)) {
        callback(true, res)
      }
    },
    fail (res) {
      if (util.checkIsFunction(callback)) {
        callback(false, res)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 上传商品订单付款凭证
 * @param {string} orderNo 订单编号
 * @param {string} paymentVoucher 付款凭证
 * @param {function(boolean, object)} callback 回调
 */
function uploadItemOrderPaymentVoucher(orderNo, paymentVoucher, callback){
  let requestParam = new RequestParamObj({
    url: urlPath.Url_Base + urlPath.Url_Item_UploadPaymentVoucher,
    data: {
      orderNo: orderNo,
      paymentVoucher: paymentVoucher
    },
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    success(res) {
      if (util.checkIsFunction(callback)) {
        callback(true,res.root)
      }
    },
    fail(res) {
      if (util.checkIsFunction(callback)) {
        callback(false,res)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 上传宠物订单付款凭证
 * @param {string} orderNo 订单编号
 * @param {string} paymentVoucher 付款凭证
 * @param {function(boolean, object)} callback 回调
 */
function uploadPetOrderPaymentVoucher(orderNo, paymentVoucher, callback) {
  let requestParam = new RequestParamObj({
    url: urlPath.Url_Base + urlPath.Url_Pet_UploadPaymentVoucher,
    data: {
      orderNo: orderNo,
      paymentVoucher: paymentVoucher
    },
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    success(res) {
      if (util.checkIsFunction(callback)) {
        callback(true,res.root)
      }
    },
    fail(res) {
      if (util.checkIsFunction(callback)) {
        callback(false,res)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

module.exports={
  deletePetOrderByOrderNo: deletePetOrderByOrderNo, // 删除宠物订单
  deleteItemOrderByOrderNo: deleteItemOrderByOrderNo, // 删除商品订单
  getPetOrderTransport: getPetOrderTransport, // 获取宠物订单运输详情

  getPetOrderDetail: getPetOrderDetail, // 获取宠物订单详情
  getItemOrderDetail: getItemOrderDetail, // 获取商品订单详情

  queryFreightRates: queryFreightRates, //获取运价
  queryListTransportType: queryListTransportType, //获取运输方式
  addNewItemOrder: addNewItemOrder, // 新增商品订单
  getItemOrderPrice: getItemOrderPrice, //获取订单价格
  addNewPetOrder: addNewPetOrder, // 新增宠物订单

  customerQueryOrderList: customerQueryOrderList, // 客户 查询订单
  businessQueryOrderList: businessQueryOrderList, // 商户 查询订单

  confirmSendPetOrder: confirmSendPetOrder, // 确认发货 宠物
  confirmSendItemOrder: confirmSendItemOrder, // 确认发货 商品
  confirmRecivePetOrder: confirmRecivePetOrder, // 确认收货 宠物
  confirmReciveItemOrder: confirmReciveItemOrder, // 确认收货 商品

  petRefundOrder: petRefundOrder, // 发起退款 宠物
  itemRefundOrder: itemRefundOrder, // 发起退款 商品
  refundDetail: refundDetail, // 获取退款单详情
  confirmRefundPet: confirmRefundPet, // 确认退款 宠物
  confirmRefundItem: confirmRefundItem, // 确认退款 商品

  getAbleCouponList: getAbleCouponList, //获得本单据可用优惠券
  getPetOrderPrice: getPetOrderPrice, //获得宠物订单总价

  customerQueryBeShipped: customerQueryBeShipped, //买家宠物待发货
  customerQueryToBeEvaluated: customerQueryToBeEvaluated, //买家宠物待评价
  customerQueryToBeReceived: customerQueryToBeReceived, //买家宠物待收货
  userGoodsOrderUnpaid: userGoodsOrderUnpaid, //买家商品待支付
  userGoodOrderToBeShipped: userGoodOrderToBeShipped, //买家商品待发货
  userGoodOrderToBeEvaluated: userGoodOrderToBeEvaluated, //买家商品待评价
  userGoodOrderToBeReceived: userGoodOrderToBeReceived, //买家商品带收货

  businessPetQueryOrderList: businessPetQueryOrderList, //卖家宠物待付款订单
  businessQueryBeShipped: businessQueryBeShipped, //卖家宠物待发货订单
  businessQueryToBeEvaluated: businessQueryToBeEvaluated, //卖家宠物待评价订单
  businessQueryToBeReceived: businessQueryToBeReceived, //卖家宠物待收货订单

  businessGoodsOrderUnpaid: businessGoodsOrderUnpaid,//卖家商品待付款订单
  businessGoodOrderToBeShipped: businessGoodOrderToBeShipped, //卖家商品待发货订单
  businessGoodOrderToBeEvaluated: businessGoodOrderToBeEvaluated, //卖家商品待评价订单
  businessGoodOrderToBeReceived: businessGoodOrderToBeReceived, //卖家商品待收货订单

  changeItemOrderPrice: changeItemOrderPrice, // 修改商品订单价格
  changePetOrderPrice: changePetOrderPrice, // 修改宠物订单价格

  uploadItemOrderPaymentVoucher: uploadItemOrderPaymentVoucher, // 上传商品订单付款凭证
  uploadPetOrderPaymentVoucher: uploadPetOrderPaymentVoucher, // 上传宠物订单付款凭证
}