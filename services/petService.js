/**
 * 
 * 宠物相关 服务
 * 
 */

const {
  PetFilterObj
} = require("../entity/petFilterObj.js");
const {
  RequestParamObj
} = require("../utils/requestParamObj.js");
const ResponseEnum = require("../services/handle/ResponseCodeEnum.js");
const RequestUtil = require("../utils/requestUtil.js");
const UrlPath = require("../macros/urlPath.js");
const Util = require("../utils/util.js");

/**
 * 获取最新发布宠物列表
 * @param petFilterParam PetFilterObj对象 筛选参数
 * @param getResultCallback 获取数据回调
 */
function getNewestPet(petFilterParam, getResultCallback) {
  if (!(petFilterParam instanceof PetFilterObj)) {
    console.error("请使用 PetFilterObj 对象")
    return;
  }
  let data = {};
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_Newest,
    data: {
      city: petFilterParam.city,
      priceStart: petFilterParam.priceStart,
      priceEnd: petFilterParam.priceEnd,
      authType: petFilterParam.authType,
      offset : petFilterParam.offset,
      limit: petFilterParam.limit
    },
    success(res) {
      if (Util.checkIsFunction(getResultCallback)) {
        getResultCallback(res);
      }
    }
  });
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取高端宠物
 * @param petFilterParam PetFilterObj对象 筛选参数
 * @param getResultCallback 获取数据回调
 */
function getUpScalePet(petFilterParam, getResultCallback) {
  if (!(petFilterParam instanceof PetFilterObj)) {
    console.error("请使用 PetFilterObj 对象")
    return;
  }
  let data = {};
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_UpScale,
    data: {
      city: petFilterParam.city,
      priceStart: petFilterParam.priceStart,
      priceEnd: petFilterParam.priceEnd,
      authType: petFilterParam.authType,
      offset: petFilterParam.offset,
      limit: petFilterParam.limit
    },
    success(res) {
      if (Util.checkIsFunction(getResultCallback)) {
        getResultCallback(res);
      }
    }
  });
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取特惠抢购
 * @param petFilterParam PetFilterObj对象 筛选参数
 * @param getResultCallback 获取数据回调
 */
function getPreferentialPet(petFilterParam, getResultCallback) {
  if (!(petFilterParam instanceof PetFilterObj)) {
    console.error("请使用 PetFilterObj 对象")
    return;
  }
  let data = {};
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_Preferential,
    data: {
      offset: petFilterParam.offset,
      limit: petFilterParam.limit
    },
    success(res) {
      if (Util.checkIsFunction(getResultCallback)) {
        getResultCallback(res);
      }
    }
  });
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取精品宠物
 * @param petFilterParam PetFilterObj对象 筛选参数
 * @param getResultCallback 获取数据回调
 */
function getFinePet(petFilterParam, getResultCallback) {
  if (!(petFilterParam instanceof PetFilterObj)) {
    console.error("请使用 PetFilterObj 对象")
    return;
  }
  let data = {};
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_Fine,
    data: {
      offset: petFilterParam.offset,
      limit: petFilterParam.limit
    },
    success(res) {
      if (Util.checkIsFunction(getResultCallback)) {
        getResultCallback(res);
      }
    }
  });
  RequestUtil.RequestGET(requestParam);
}

module.exports={
  getNewestPet: getNewestPet, // 获取最新上架
  getUpScalePet: getUpScalePet, // 获取高端宠物
  getPreferentialPet: getPreferentialPet, // 获取特惠抢购
  getFinePet: getFinePet, // 获取精品宠物
}