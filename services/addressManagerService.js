
const ResponseEnum = require("../services/handle/ResponseCodeEnum.js");
const RequestUtil = require("../utils/requestUtil.js");
const { RequestParamObj } = require("../utils/requestParamObj.js");
const UrlPath = require("../macros/urlPath.js");
const Util = require("../utils/util.js");

const { AddressObj } = require("../entity/addressObj.js");

/**
 * 通过用户编号获取用户收货地址列表
 * @param customerNo 用户编号
 * @param getDataCallback 获取数据回调
 */
function getAddressListByCustomerNo(customerNo, getDataCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_GetAddressList,
    data: {
      customerNo : customerNo
    },
    success(res) {
      if (Util.checkIsFunction(getDataCallback)){
        getDataCallback(res)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 添加买家收货地址
 * @param addressObj 地址对象
 * @param addCallback 添加结果回调
 */
function addNewAddress(addressObj, addCallback) {
  if (!(addressObj instanceof AddressObj)) {
    throw new Error("请传入 AddressObj 对象");
    return;
  }
  if (addressObj == null) {
    throw new Error("addressObj 不能为空")
    return;
  }
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_AddNewAddress,
    data: addressObj,
    success(res) {
      if (Util.checkIsFunction(addCallback)) {
        addCallback(res)
      }
    }
  })
  RequestUtil.RequestPUT(requestParam);
}

/**
 * 修改买家收货地址
 * @param addressObj 地址对象
 * @param editCallback 修改结果回调
 */
function editAddress(addressObj, editCallback) {
  if (!(addressObj instanceof AddressObj)) {
    throw new Error("请传入 AddressObj 对象");
    return;
  }
  if (addressObj == null) {
    throw new Error("addressObj 不能为空")
    return;
  }
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_EditAddress,
    data: addressObj,
    success(res) {
      if (Util.checkIsFunction(editCallback)) {
        editCallback(res)
      }
    }
  })
  RequestUtil.RequestPUT(requestParam);
}

/**
 * 删除买家收货地址
 * @param addressNo 待删除 收货地址 编号
 * @param deleteCallback 删除结果回调
 */
function deleteAddress(addressNo, deleteCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_DeleteAddress,
    data: {
      addressNo: addressNo
    },
    success(res) {
      if (Util.checkIsFunction(deleteCallback)) {
        deleteCallback(res)
      }
    }
  })
  RequestUtil.RequestDELETE(requestParam);
}

module.exports={
  getAddressListByCustomerNo: getAddressListByCustomerNo,
  addNewAddress: addNewAddress,
  editAddress: editAddress,
  deleteAddress: deleteAddress
}