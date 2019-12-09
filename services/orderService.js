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

/**
 * 确认发货 宠物
 * @param param(sendBillNo, orderNo)
 * @param sendResultCallback
 */
function confirmSendPetOrder(param, sendResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_ConfirmSend_Pet,
    data: {
      wayBill: param.sendBillNo,
      orderNo: param.orderNo,
    },
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    success(res) {
      if (Util.checkIsFunction(sendResultCallback)) {
        sendResultCallback(res)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 确认发货 商品
 * @param param(sendBillNo, orderNo)
 * @param sendResultCallback
 */
function confirmSendItemOrder(param, sendResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_ConfirmSend_Item,
    data: {
      wayBill: param.sendBillNo,
      orderNo: param.orderNo,
    },
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    success(res) {
      if (Util.checkIsFunction(sendResultCallback)) {
        sendResultCallback(res)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 确认收货 宠物
 * @param param(orderNo)
 * @param reciveResultCallback
 */
function confirmRecivePetOrder(param, reciveResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_ConfirmRecive_Pet,
    data: {
      orderNo: param.orderNo,
    },
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    success(res) {
      if (Util.checkIsFunction(reciveResultCallback)) {
        reciveResultCallback(res)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 确认收货 商品
 * @param param(orderNo)
 * @param reciveResultCallback
 */
function confirmReciveItemOrder(param, reciveResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Order_ConfirmRecive_Item,
    data: {
      orderNo: param.orderNo,
    },
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    success(res) {
      if (Util.checkIsFunction(reciveResultCallback)) {
        reciveResultCallback(res)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
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
  tempData.petOrderNo = param.orderNo;
  tempData.refundState = param.refundState;
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


module.exports={
  addNewItemOrder: addNewItemOrder, // 新增商品订单
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
}