const {
  RequestParamObj
} = require("../utils/requestParamObj.js");
const RequestUtil = require("../utils/requestUtil.js");
const UrlPath = require("../macros/urlPath.js");
const Util = require("../utils/util.js");

const Account_Type_AliPay = 1;
const Account_Type_Wechat = 2;
const Account_Type_BankCard = 3;

/**
 * 获取类型名称
 * @param accountType 类型
 */
function getAccountNameByType(accountType) {
  switch(accountType){
    case Account_Type_AliPay:
      return "支付宝";
    case Account_Type_Wechat:
      return "微信";
    case Account_Type_BankCard:
      return "银行卡";
    default:
      return "";
  }
}

/**
 * 添加账户
 */
function addAccount(accountObj, addAcountCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Account_Add(),
    data: accountObj,
    success(res){
      if (Util.checkIsFunction(addAcountCallback)) {
        addAcountCallback(res.root);
      }
    },
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 删除账户
 */
function deleteAccount(accountNo, deleteAccountCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Account_Delete(accountNo),
    success(res) {
      if (Util.checkIsFunction(deleteAccountCallback)) {
        deleteAccountCallback(res.root);
      }
    },
  })
  RequestUtil.RequestDELETE(requestParam);
}

/**
 * 获取账户列表
 */
function getAccountList(businessNo, getListCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Account_List(businessNo),
    success(res) {
      if (Util.checkIsFunction(getListCallback)) {
        getListCallback(res.root);
      }
    },
  })
  RequestUtil.RequestGET(requestParam);
}

module.exports = {
  Account_Type_AliPay, Account_Type_Wechat, Account_Type_BankCard,
  getAccountNameByType: getAccountNameByType,
  addAccount: addAccount,
  deleteAccount: deleteAccount,
  getAccountList: getAccountList
}