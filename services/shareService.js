
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
  return {
    source: sourceType,
    target: targetPage,
    shareCustomerNo: UserManager.getCustomerNo(),
    shareBusinessNo: UserManager.getBusinessNo(),
    shareUnionId: UserManager.getOpenId(),
  };
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
const OPEN_SOURCE_TYPE_MINI_TRANSPORT = "mini_app_transport";
const OPEN_SOURCE_TYPE_SHAREDATA = "share_data";
const OPEN_SOURCE_TYPE_POSTER = "poster"
// 目的页面
const OPEN_TARGET_PAGE_HOME = "home";
const OPEN_TARGET_PAGE_MALL = "mall";
const OPEN_TARGET_PAGE_POINTEXCHANGE = 'pointexchange';
const OPEN_TARGET_PAGE_PETDETAIL = "pet_detail";
const OPEN_TARGET_PAGE_GOODSDETAIL = "goods_detail";
const OPEN_TARGET_PAGE_BUSINESSDETAIL = "business_detail";
/**
 * 首页 handler options
 * 
 * @param {*} options 
 */
function pageHandlerOptions(options) {
  Utils.logInfo("pageHandlerOptions options :\n" + JSON.stringify(options));
  if (options.source == OPEN_SOURCE_TYPE_MINI_TRANSPORT) {
    Utils.logInfo('打开来源:托运微信小程序');
    setJumpTarget(options.target, null);
  } else if (options.source == OPEN_SOURCE_TYPE_SHAREDATA) {
    Utils.logInfo('分享进入');
    setJumpTarget(options.target, options.data)
  } else {
    if (options.q != null) {
      const param = decodeURIComponent(options.q);
      if (param.type == OPEN_SOURCE_TYPE_POSTER) {
        setJumpTarget(param.target, param.businessno);
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
    case OPEN_TARGET_PAGE_HOME:
      // Do Nothing
      if (jumpSuccessCallback && typeof jumpSuccessCallback == 'function') {
        jumpSuccessCallback(OPEN_TARGET_PAGE_HOME, null);
      }
      break;
    case OPEN_TARGET_PAGE_MALL:
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
    case OPEN_TARGET_PAGE_POINTEXCHANGE:
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
    case OPEN_TARGET_PAGE_PETDETAIL:
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
    case OPEN_TARGET_PAGE_BUSINESSDETAIL:
      wx.navigateTo({
        url: PagePath.Page_Store_StoreInforMation + '?storeno=' + data,
        success(res){
          if (jumpSuccessCallback && typeof jumpSuccessCallback == 'function') {
            jumpSuccessCallback(OPEN_TARGET_PAGE_BUSINESSDETAIL, res);
          }
        },
        events: events
      })
      break;
    case OPEN_TARGET_PAGE_GOODSDETAIL:
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

  OPEN_TARGET_PAGE_HOME,
  OPEN_TARGET_PAGE_MALL,
  OPEN_TARGET_PAGE_POINTEXCHANGE,
  OPEN_TARGET_PAGE_PETDETAIL,
  OPEN_TARGET_PAGE_GOODSDETAIL,
  OPEN_TARGET_PAGE_BUSINESSDETAIL,
}