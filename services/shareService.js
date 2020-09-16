
/**
 * 
 * 分享 服务
 * 
 */

const Util = require("../utils/util.js");
const Utils = require("../utils/util.js");
const PagePath = require("../macros/pagePath.js");
const app = getApp();
const UserManager = require("../services/userService");
const pagePath = require("../macros/pagePath.js");

/** 
 *  获取默认分享卡片 
 */
function getDefaultShareCard(){
  let param = getBaseShareParam(OPEN_SOURCE_TYPE_SHAREDATA, OPEN_TARGET_PAGE_HOME);
  return ShareData("淘宠惠商城",PagePath.Page_Home,param,null,null);
}

/**
 * 获取商家分享卡片
 * @param {*} goodsName 
 * @param {*} goodsId 
 * @param {*} goodsImage 
 */
function getBusinessShareData(businessName, businessId, businessImage) {
  let param = getBaseShareParam(OPEN_SOURCE_TYPE_SHAREDATA, OPEN_TARGET_PAGE_BUSINESSDETAIL);
  param.data = businessId;
  return ShareData(businessName, PagePath.Page_Home, param, businessImage, null);
}

/**
 * 获取商品分享卡片
 * @param {*} goodsName 
 * @param {*} goodsId 
 * @param {*} goodsImage 
 */
function getGoodsShareData(goodsName, goodsId, goodsImage){
  let param = getBaseShareParam(OPEN_SOURCE_TYPE_SHAREDATA, OPEN_TARGET_PAGE_GOODSDETAIL);
  param.data = goodsId;
  return ShareData(goodsName, PagePath.Page_Home, param, goodsImage, null);
}

/**
 * 获取宠物分享卡片
 * @param {*} petName 
 * @param {*} petId 
 * @param {*} petImage 
 */
function getPetShareCard(petName, petId, petImage){
  let param = getBaseShareParam(OPEN_SOURCE_TYPE_SHAREDATA, OPEN_TARGET_PAGE_PETDETAIL);
  param.data = petId;
  return ShareData(petName, PagePath.Page_Home, param, petImage, null);
}

/**
 * 获取基础shareParam
 * @param {*} sourceType 
 * @param {*} targetPage 
 */
function getBaseShareParam(sourceType, targetPage) {
  let baseShareParam = {};
  if (sourceType) {
    baseShareParam['source'] = sourceType
  }
  if (targetPage) {
    baseShareParam['target'] = targetPage
  }
  if (UserManager.getCustomerNo()) {
    baseShareParam['shareCustomerNo'] = UserManager.getCustomerNo()
  }
  if (UserManager.getBusinessNo()) {
    baseShareParam['shareBusinessNo'] = UserManager.getBusinessNo()
  }
  if (UserManager.getOpenId()) {
    baseShareParam['shareUnionId'] = UserManager.getOpenId()
  }
  if (UserManager.getUserOpenId()) {
    baseShareParam['shareOpenId'] = UserManager.getUserOpenId()
  }
  return baseShareParam;
}

/**
 * 获取分享卡片内容
 * @param ptitle 标题
 * @param ppath 页面路径
 * @param ppathData 带参
 * @param pimageUrl 图片路径
 * @param psuccessCallback 成功回调
 */
function ShareData(ptitle, ppath, ppathData, pimageUrl, psuccessCallback) {
  let title = null; // 分享标题 默认小程序名称
  let path = null; // 分享路径 默认 当前路径 需要 / 开头完整路径
  let pathData = null; // 分享参数对象
  let imageUrl = null; // 分享图片地址 本地 网络 都可以 默认当前页面截图
  let successCallback = null; // 分享成功回调
  if (ptitle != null && typeof ptitle == "string") {
    title = ptitle;
  }
  if (ppath != null && typeof ppath == "string") {
    path = ppath;
  }
  if (ppathData != null && typeof ppathData == "object") {
    pathData = ppathData;
  }
  if (pimageUrl != null && typeof pimageUrl == "string") {
    imageUrl = pimageUrl;
  }
  if (psuccessCallback != null && typeof psuccessCallback == 'function') {
    successCallback = psuccessCallback;
  }
  let obj = {};
  if (title != null) obj.title = title;
  if (path != null) obj.path = path;
  if (pathData != null) {
    let index = 0;
    for (var key in pathData) {
      let lowerKey = key.toLowerCase();
      if (index == 0) {
        obj.path = obj.path + "?" + lowerKey + "=" + pathData[key];
      } else {
        obj.path = obj.path + "&" + lowerKey + "=" + pathData[key];
      }
      index++;
    }
  }
  if (imageUrl != null) obj.imageUrl = imageUrl;
  if (successCallback != null) obj.success = successCallback;
  Utils.logInfo("分享数据:" + JSON.stringify(obj));
  return obj;
}

// 来源类型
const OPEN_SOURCE_TYPE_MINI_TRANSPORT = "mini_app_transport"; // 托运小程序
const OPEN_SOURCE_TYPE_SHAREDATA = "share_data"; // 分享
const OPEN_SOURCE_TYPE_POSTER = "poster"; // 海报
const OPEN_SOURCE_TYPE_SUBSCRIPTION = 'subscription'; // 公众号
// 目的页面
const OPEN_TARGET_PAGE_NEARBY = 'nearby'; // 附近,狗狗,猫猫
const OPEN_TARGET_PAGE_BAIKE = 'baike'; // 百科
const OPEN_TARGET_PAGE_HOME = "home"; // 首页
const OPEN_TARGET_PAGE_MALL = "mall"; // 商城
const OPEN_TARGET_PAGE_POINTEXCHANGE = 'pointexchange'; // 积分兑换
const OPEN_TARGET_PAGE_PETDETAIL = "pet_detail"; // 宠物详情
const OPEN_TARGET_PAGE_GOODSDETAIL = "goods_detail"; // 商品详情
const OPEN_TARGET_PAGE_BUSINESSDETAIL = "business_detail"; // 商家详情
const OPEN_TARGET_PAGE_SERVICE = 'service'; // 服务
const OPEN_TARGET_PAGE_GETNEWGIFTBAG = "getnewgiftbag"; // 获取新客大礼包
/**
 * 首页 handler options
 * 
 * @param {*} options 
 */
function pageHandlerOptions(options) {
  Utils.logInfo("pageHandlerOptions options :\n" + JSON.stringify(options));
  app.globalData.shareOpenId = options.shareopenid; // 持有 分享人 openId
  app.globalData.shareCustomerNo = options.sharecustomerno; // 持有 分享人 客户编号
  app.globalData.shareBusinessNo = options.sharebusinessno; // 持有 分享人 商户编号
  app.globalData.shareUnionId = options.shareunionid; // 持有 分享人 unionId
  if (options.source == OPEN_SOURCE_TYPE_MINI_TRANSPORT) { // 托运微信小程序 跳转进入
    Utils.logInfo('打开来源:托运微信小程序');
    setJumpTarget(options.target, null);
  } else if (options.source == OPEN_SOURCE_TYPE_SHAREDATA) { // 点击分享卡片 进入
    Utils.logInfo('分享进入');
    setJumpTarget(options.target, options.data)
  } else if (options.source == OPEN_SOURCE_TYPE_SUBSCRIPTION) {
    Utils.logInfo('公众号进入');
    setJumpTarget(options.target, options.data)
  }else {
    if (options.q != null) { // 扫普通二维码 进入
      const urlPath = decodeURIComponent(options.q); // 解析地址
      const tempList = urlPath.split("?"); // 切割地址和参数
      const path = tempList[0]; // 地址
      const paramStr = tempList[1]; // 参数
      const param = paramStr.split('&'); // 切割参数
      let paramObj = {}; // 参数对象容器
      param.forEach(item => {
        const tempParams = item.split('='); // 切割具体参数
        const tempParamKey = tempParams[0]; // 参数 key
        const tempParamValue = tempParams[1]; // 参数 value
        paramObj[tempParamKey] = tempParamValue; // 装入容器
      });
      // 二维码进入 options 不能直接读取参数, 所以要重新持有 分享人信息
      app.globalData.shareOpenId = paramObj.shareopenid; // 持有 分享人 openId
      app.globalData.shareCustomerNo = paramObj.sharecustomerno; // 持有 分享人 客户编号
      app.globalData.shareBusinessNo = paramObj.sharebusinessno; // 持有 分享人 商户编号
      app.globalData.shareUnionId = paramObj.shareunionid; // 持有 分享人 unionId
      if (paramObj.type == OPEN_SOURCE_TYPE_POSTER) { // 海报二维码
        setJumpTarget(paramObj.target, paramObj.businessno);
      }
    }
  }
}

/**
 * 设置跳转标识
 * 
 * @param target
 * @param data
 */
function setJumpTarget(target, data){
  app.shareData.jumpTarget = target;
  if (target != OPEN_TARGET_PAGE_HOME) {
    pageJump(data, null, function jumpCallback(target,res){
      setJumpTarget(OPEN_TARGET_PAGE_HOME, null);
    });
  }
}

/**
 * 跳转页面
 * 
 * @param data 带参
 * @param events 页面间通讯,用于监听被打开页面发送到当前页面的数据。基础库 2.7.3 开始支持,navigateto支持
 * @param jumpSuccessCallback 跳转回调
 */
function pageJump(data, events, jumpSuccessCallback){
  switch (app.shareData.jumpTarget) {
    case OPEN_TARGET_PAGE_HOME: // 首页
      // Do Nothing
      if (jumpSuccessCallback && typeof jumpSuccessCallback == 'function') {
        jumpSuccessCallback(OPEN_TARGET_PAGE_HOME, null);
      }
      break;
    case OPEN_TARGET_PAGE_MALL: // 商城
      setTimeout(()=>{
        wx.switchTab({
          url: PagePath.Page_Mall_Index,
          success: function (res) {
            if (jumpSuccessCallback && typeof jumpSuccessCallback == 'function') {
              jumpSuccessCallback(OPEN_TARGET_PAGE_MALL, res);
            }
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      },0)
      break;
    case OPEN_TARGET_PAGE_POINTEXCHANGE: // 积分兑换
      setTimeout(()=>{
        wx.navigateTo({
          url: PagePath.Page_Me_Point_PointMall,
          success(res) {
            if (jumpSuccessCallback && typeof jumpSuccessCallback == 'function') {
              jumpSuccessCallback(OPEN_TARGET_PAGE_POINTEXCHANGE, res);
            }
          },
          events: events
        })
      },0)
      break;
    case OPEN_TARGET_PAGE_PETDETAIL: // 宠物详情
      setTimeout(()=>{
        wx.navigateTo({
          url: PagePath.Page_Store_PetsInforMation + '?petno=' + data,
          success(res){
            if (jumpSuccessCallback && typeof jumpSuccessCallback == 'function') {
              jumpSuccessCallback(OPEN_TARGET_PAGE_PETDETAIL, res);
            }
          },
          events: events
        })
      },0)
      break;
    case OPEN_TARGET_PAGE_BUSINESSDETAIL: // 商家详情
      setTimeout(() => {
        wx.navigateTo({
          url: PagePath.Page_Store_StoreInforMation + '?storeno=' + data,
          success(res){
            if (jumpSuccessCallback && typeof jumpSuccessCallback == 'function') {
              jumpSuccessCallback(OPEN_TARGET_PAGE_BUSINESSDETAIL, res);
            }
          },
          events: events
        })
      },0)
      break;
    case OPEN_TARGET_PAGE_GOODSDETAIL: // 商品详情
      setTimeout(()=>{
        wx.navigateTo({
          url: PagePath.Page_Mall_CommodityInformation + "?itemno=" + data,
          success(res){
            if (jumpSuccessCallback && typeof jumpSuccessCallback == 'function') {
              jumpSuccessCallback(OPEN_TARGET_PAGE_GOODSDETAIL, res);
            }
          },
          events: events
        })
      },0)
      break;
    case OPEN_TARGET_PAGE_BAIKE:// 百科
      setTimeout(() => {
        wx.navigateTo({
          url: PagePath.Page_Baike_List + "?petsort=" + data,
          success(res) {
            if (jumpSuccessCallback && typeof jumpSuccessCallback == 'function') {
              jumpSuccessCallback(OPEN_TARGET_PAGE_BAIKE, res);
            }
          },
          events: events
        })
      },0)
      break;
    case OPEN_TARGET_PAGE_NEARBY: // 狗狗,猫猫
      setTimeout(() => {
        let tempParam = JSON.parse(data);
        wx.navigateTo({
          url: PagePath.Page_Home_Nearby + "?requesttype=" + tempParam.type + "&sortno=" + tempParam.sortno + "&pagetitle=" + tempParam.title,
          success(res) {
            if (jumpSuccessCallback && typeof jumpSuccessCallback == 'function') {
              jumpSuccessCallback(OPEN_TARGET_PAGE_BAIKE, res);
            }
          },
          events: events
        })
      },0)
      break;
    case OPEN_TARGET_PAGE_SERVICE: // 服务(驿站)
      setTimeout(() => {
        wx.switchTab({
          url: PagePath.Page_PostStation_Index,
          success: function (res) {
            if (jumpSuccessCallback && typeof jumpSuccessCallback == 'function') {
              jumpSuccessCallback(OPEN_TARGET_PAGE_SERVICE, res);
            }
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      },0)
      break;
    case OPEN_TARGET_PAGE_GETNEWGIFTBAG: // 获取新客大礼包
      // 判断是否登录
      // 登录领取大礼包
      // 未登录跳转登录
      // 登录完成领取大礼包
      setTimeout(function(){
        UserManager.isLogin(function(){
          UserManager.haveNewGiftBag()
        }, function() {
          wx.showModal({
            title: '有大礼包待领取',
            content: '尚未登陆，请登录后领取',
            confirmText: "前往登录",
            cancelText: '稍后领取',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: pagePath.Page_Login_Index
                });
              }
            }
          })
        })
      },0);
      break;
  }
}

module.exports = {
  getDefaultShareCard: getDefaultShareCard,
  getBusinessShareData: getBusinessShareData,
  getGoodsShareData: getGoodsShareData,
  getPetShareCard: getPetShareCard,
  ShareData: ShareData,
  pageHandlerOptions: pageHandlerOptions,
  setJumpTarget: setJumpTarget,
  pageJump: pageJump,


  OPEN_SOURCE_TYPE_MINI_TRANSPORT,
  OPEN_SOURCE_TYPE_SHAREDATA,
  OPEN_SOURCE_TYPE_POSTER,
  OPEN_SOURCE_TYPE_SUBSCRIPTION,

  OPEN_TARGET_PAGE_HOME,
  OPEN_TARGET_PAGE_MALL,
  OPEN_TARGET_PAGE_POINTEXCHANGE,
  OPEN_TARGET_PAGE_PETDETAIL,
  OPEN_TARGET_PAGE_GOODSDETAIL,
  OPEN_TARGET_PAGE_BUSINESSDETAIL,
  OPEN_TARGET_PAGE_NEARBY,
  OPEN_TARGET_PAGE_BAIKE,
  OPEN_TARGET_PAGE_SERVICE, 
  OPEN_TARGET_PAGE_GETNEWGIFTBAG,
}