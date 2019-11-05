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

/**
 * 筛选宠物列表
 * @param petFilterParam PetFilterObj对象 筛选参数
 * @param getResultCallback 获取数据回调
 */
function getPetList(petFilterParam, getResultCallback) {
  if (!(petFilterParam instanceof PetFilterObj)) {
    console.error("请使用 PetFilterObj 对象")
    return;
  }
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_Filter,
    data: {
      city: petFilterParam.city,
      priceStart: petFilterParam.priceStart,
      priceEnd: petFilterParam.priceEnd,
      petSortNo: petFilterParam.petSortNo,
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
 * 获取热门分类
 * @param petTypeParam (offset,limit)
 * @param getResultCallback 回调
 */
function getHotType(petTypeParam, getResultCallback) {
  if (!Util.checkIsObject(petTypeParam)) {
    console.error("请使用petTypeParam对象")
    return;
  }
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_HotSort,
    data: {
      offset: petTypeParam.offset,
      limit: petTypeParam.limit
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
 * 获取宠物品种
 * @param petSortNo 宠物大类Id
 * @param getResultCallback 结果回调
 */
function getBreed(petSortNo, getResultCallback) {
  if (!Util.checkIsString(petSortNo)) {
    console.error("请使用 petSortNo String 对象")
    return;
  }
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_Breed,
    data: {
      petSortNo: petSortNo,
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
 * 获取宠物详情
 * @param petNo
 * @param getResultCallback 结果回调
 */
function getPetDetail(petNo, getResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_Detail,
    data: {
      petNo: petNo
    },
    success(res) {
      if (Util.checkIsFunction(getResultCallback)) {
        getResultCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 新增宠物收藏
 * @param param (petNo, customerNo)
 * @param addResultCallback
 */
function addNewPetCollection(param, addResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_AddNew_Pet_Collection,
    data: {
      petNo: param.petNo,
      customerNo: param.customerNo
    },
    success(res) {
      if (Util.checkIsFunction(addResultCallback)) {
        addResultCallback(res);
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

module.exports = {
  getNewestPet: getNewestPet, // 获取最新上架
  getUpScalePet: getUpScalePet, // 获取高端宠物
  getPreferentialPet: getPreferentialPet, // 获取特惠抢购
  getFinePet: getFinePet, // 获取精品宠物
  getPetList: getPetList, // 获取筛选宠物

  getHotType: getHotType, // 获取热门分类
  getBreed: getBreed, // 获取宠物品种

  getPetDetail: getPetDetail, // 获取宠物详情

  addNewPetCollection: addNewPetCollection, // 新增宠物收藏
}