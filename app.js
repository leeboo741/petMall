//app.js
const UrlPath = require("/macros/urlPath.js");
const Config = require("/macros/config.js");
const Utils = require("/utils/util");
const appUpdateManager = require("./services/appUpdateManager");
App({
  onLaunch: function () {
    console.log("当前地址:" , UrlPath.Url_Base);
    console.log("当前版本号/构建号：" , Config.Version , "/" , Config.Version_Code);
    console.log("当前分支: ", Config.Branch);
    appUpdateManager.checkNewVersionAndUpdate();
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