//app.js
const UrlPath = require("/macros/urlPath.js");
const Config = require("/macros/config.js");
const Utils = require("/utils/util");
App({
  onLaunch: function () {
    Utils.logInfo("当前地址:" , UrlPath.Url_Base);
    Utils.logInfo("当前版本:" , Config.Version , " Build_Code:" , Config.Version_Code);
  },
  globalData: {
    serviceSelectBusiness: null, // 服务 选中的商家
    serviceSelectServerType: null, // 选中的服务类型
    serviceSelectServer: null, // 服务 选中的服务
    serviceSelectBeautician: null, // 服务 选中的美容师
    serviceSelectPet: null, // 服务 选中的宠物
    serviceSelectCoupon: null, // 服务 选中的优惠券
  },
  shareData: {
    jumpTarget: null,
    shareCustomerNo: null,
    shareBusinessNo: null,
    shareUnionId: null,
  },
})