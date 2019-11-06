const UrlService = require("../macros/urlPath.js");
const ResponseEnum = require("../services/handle/ResponseCodeEnum.js");
const RequestUtil = require("../utils/requestUtil.js");
const { RequestParamObj } = require("../utils/requestParamObj.js");
const Util = require("../utils/util.js");


/**
 * 获得商家信息
 * @param  city  城市
 * @param  authType 商家认证
 * @param  orderCount 交易数量
 * @param  praiseCount 好评数量
 * @param  offset 偏移量
 * @param  limit 长度
 * @param  getDataCallback 回调函数
 */         

function getStoreInfomation(city, authType, orderCount, praiseCount, offset, limit , getDataCallback){
 
  let requestParam = new RequestParamObj({
    url: UrlService.Url_Base + UrlService.Url_BusinessInfo,
    data:{
      city: city ,
      authType: authType, 
      orderCount: orderCount,
      praiseCount: praiseCount,
      offset: offset,
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
 * 获取推荐商家
 * @param param 参数 offset limit
 * @param getRecommendCallback 回调参数
 */
function getRecommendBusiness(param, getRecommendCallback){
  let requestParam = new RequestParamObj({
    url: UrlService.Url_Base + UrlService.Url_Business_Recommend,
    data: {
      offset: param.offset,
      limit: param.limit,
    },
    success(res) {
      if (typeof getRecommendCallback == "function" && getRecommendCallback) {
        getRecommendCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam)
}

/**
 * 获取商家详情
 * @param storeNo 商家编号
 * @param getResultCallback 获取详情回调
 */
function getStoreDetail(storeNo, getResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlService.Url_Base + UrlService.Url_Business_Detail,
    data: {
      business: storeNo
    },
    success(res) {
      if (Util.checkIsFunction(getResultCallback)) {
        getResultCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam)
}

/**
 * 获取商家评价列表
 * @param param (storeNo, offset, limit)
 * @param getResultCallback
 */
function getStoreEvaluateList(param, getResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlService.Url_Base + UrlService.Url_Business_EvaluateList,
    data: {
      businessNo: param.storeNo,
      offset: param.offset,
      limit: param.limit
    },
    success(res) {
      if (Util.checkIsFunction(getResultCallback)) {
        getResultCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam)
}

/**
 * 获取商家宠物信息
 */
function getStorePetList(storeNo, getResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlService.Url_Base + UrlService.Url_Business_PetList,
    data: {
      businessNo: storeNo,
    },
    success(res) {
      if (Util.checkIsFunction(getResultCallback)) {
        getResultCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam)
}

  
module.exports = {
  getStoreInfomation: getStoreInfomation,
  getRecommendBusiness: getRecommendBusiness,
  getStoreDetail: getStoreDetail,
  getStoreEvaluateList: getStoreEvaluateList,
  getStorePetList: getStorePetList,
}