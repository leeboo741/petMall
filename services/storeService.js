const UrlService = require("../macros/urlPath.js");
const ResponseEnum = require("../services/handle/ResponseCodeEnum.js");
const RequestUtil = require("../utils/requestUtil.js");
const { RequestParamObj } = require("../utils/requestParamObj.js");
const Util = require("../utils/util.js");


/**
 * 获得商家信息
 * @param  city  城市
 *         authType 商家认证
 *         orderCount 交易数量
 *         praiseCount 好评数量
 *         start 开始
 *         end   结束
 *         getDataCallback 回调函数
 */         

function getStoreInfomation(city, authType, orderCount, praiseCount, start, end , getDataCallback){
 
  let requestParam = new RequestParamObj({
    url: UrlService.Url_Base + UrlService.Url_BusinessInfo,
    data:{
      city: city ,
      authType: authType, 
      orderCount: orderCount,
      praiseCount: praiseCount,
      start: start,
      end: end
    },
    success(res) {
      if (typeof getDataCallback == "function" && getDataCallback) {
        getDataCallback(res.root);
      }
    },
  })
  RequestUtil.RequestGET(requestParam)
}

  
module.exports = {
  getStoreInfomation: getStoreInfomation
}