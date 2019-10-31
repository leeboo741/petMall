const UrlService = require("../macros/urlPath.js");

const ResponseEnum = require("../services/handle/ResponseCodeEnum.js");
const RequestUtil = require("../utils/requestUtil.js");
const {
  RequestParamObj
} = require("../utils/requestParamObj.js");

/**
 * 商城分类
 * @param getDataCallback 获取数据回调
 *        grade 宠粮类型
 *        limit 显示数量
 */
function getMallPetType(grade, limit, getDataCallback) {
  let requestParam = new RequestParamObj({
    url: UrlService.Url_Base + UrlService.Url_ItemType,
    data: {
      grade: grade,
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
 * 商城(页面数据显示--主粮、零食、、、)
 * @param getDataCallback 获取数据回调
 */
function getMallPetTypeShowInfor(getDataCallback) {
  let requestParam = new RequestParamObj({
    url: UrlService.Url_Base + UrlService.Url_ItemShowTypeInfo,
    data: {},
    success(res) {
      if (typeof getDataCallback == "function" && getDataCallback) {
        getDataCallback(res.root);
      }
    },
  })
  RequestUtil.RequestGET(requestParam)
}

/**
 * 商城(获得品牌下拉信息、)
 * @param getDataCallback 获取数据回调
 */

function getBrandInfo(getDataCallback){
  let requestParam = new RequestParamObj({
    url: UrlService.Url_Base + UrlService.Url_Item_Brand,
    data: {},
    success(res) {
      if (typeof getDataCallback == "function" && getDataCallback) {
        getDataCallback(res.root);
      }
    },
  })
  RequestUtil.RequestGET(requestParam)
}


/**
 * 商城(获得品种下拉信息、)
 * @param getDataCallback 获取数据回调
 */
function getVarieties(getDataCallback){
  let requestParam = new RequestParamObj({
    url: UrlService.Url_Base + UrlService.Url_Item_Classify,
    data: {},
    success(res) {
      if (typeof getDataCallback == "function" && getDataCallback) {
        getDataCallback(res.root);
      }
    },
  })
  RequestUtil.RequestGET(requestParam)
}


module.exports = {
  getMallPetType: getMallPetType,
  getMallPetTypeShowInfor: getMallPetTypeShowInfor,
  getBrandInfo: getBrandInfo,
  getVarieties: getVarieties
}