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
const RequestUtil = require("../utils/requestUtil.js");
const UrlPath = require("../macros/urlPath.js");
const Util = require("../utils/util.js");

/**
 * 获取附近宠物
 * @param queryParam (offset, limit, city, startMoney, endMoney, sex,  searchKey)
 * @param 
 */
function getNearPetList(queryParam, getResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_List + "?queryParam=" + queryParam,
    data: {},
    success(res) {
      if (Util.checkIsFunction(getResultCallback)) {
        getResultCallback(res);
      }
    }
  });
  RequestUtil.RequestGET(requestParam);
}


/**
 * 获取最新发布宠物列表
 * @param petFilterParam PetFilterObj对象 筛选参数
 * @param getResultCallback 获取数据回调
 * city: "",
          startMoney: "",
          endMoney:"",
          sex:"",
          offset:0,
          limit: 6,
 */
function getNewestPet(queryParam, getResultCallback) {

  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_Newest + "?queryParam=" + queryParam,
    data: {},

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
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_UpScale + "?queryParam=" + petFilterParam,
    data: {
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
      limit: petFilterParam.limit,
      city: petFilterParam.city,
      priceStart: petFilterParam.priceStart,
      priceEnd: petFilterParam.priceEnd,
      authType: petFilterParam.authType
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
      // petSortNo: petFilterParam.petSortNo,
      authType: petFilterParam.authType,
      petGenreNo: petFilterParam.petGenreNo,
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
 * 获取宠物分类
 * @param getResultCallback 
 */
function getSort(getResultCallback){
  let obj={
    offset:0,
    limit:30
  }
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_Sort + "?queryParam=" + encodeURIComponent(JSON.stringify(obj), 'utf-8'),
    data: {
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
 * 获取宠物品种
 * @param petSortNo 宠物大类Id
 * @param getResultCallback 结果回调
 */
function getBreed(petSortNo, getResultCallback, failCallback) {
  let obj = {};
  if (petSortNo==null){
    obj.offset= 0,
    obj.limit =  8,
    obj.petSortNo = null
  }else{
    // obj.offset = 0,
    // obj.limit = 200,
    obj.petSortNo = petSortNo
  }

  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_Breed + "?queryParam=" + encodeURIComponent(JSON.stringify(obj), 'utf-8'),
    data: {
    },
    success(res) {
      if (Util.checkIsFunction(getResultCallback)) {
        getResultCallback(res);
      }
    },
    fail(res) {
      if (Util.checkIsFunction(failCallback)) {
        failCallback(res);
      }
    }
  });
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取宠物详情
 * @param param
 * @param getResultCallback 结果回调
 */
function getPetDetail(petNo, getResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_Detail + petNo,
    data: {
     
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
 * 获取更多宠物评价
 * @param param (petNo, offset, limit)
 * @param getResultCallback
 */
function getMorePetEvaluate(param, getResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_MoreEvaluateInfo,
    data: {
      petNo: param.petNo,
      offset: param.offset,
      limit: param.limit,
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
 * 新增宠物评价
 * @param param
 * @param addNewEvaluateCallback
 */
function addNewPetEvaluate(param, addNewEvaluateCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_AddNew_Evaluate,
    data: {
      billNo: param.orderNo,
      content: param.content,
      customer: {
        customerNo: param.customerNo,
      },
      pet: {
        petNo: param.petNo,
      },
      petAppraiseImgList: param.imageList,
      praiseDegree: param.degree
    },
    success(res) {
      if (Util.checkIsFunction(addNewEvaluateCallback)) {
        addNewEvaluateCallback(res)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 发布宠物
 * @param releaseData
 * @param releaseResultCallback
 */
function releasePet(releaseData, releaseResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_Release,
    data: releaseData,
    success(res) {
      if (Util.checkIsFunction(releaseResultCallback)) {
        releaseResultCallback(res);
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 编辑宠物
 * @param releaseData
 * @param editResultCallback
 */
function editPet(releaseData, editResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_Edit,
    data: releaseData,
    success(res) {
      if (Util.checkIsFunction(editResultCallback)) {
        editResultCallback(res);
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 上架/下架宠物
 * @param param (petNo, itemState)
 * @param onOrOffShelvesResultCallback
 *   Url_PetShelve,//宠物上架
    Url_PetOffShelve, //宠物下架
 */
function onOrOffShelves(param, onOrOffShelvesResultCallback) {
    let Url_onOrOffShelves=null;
    if (param.itemState == 0) {
      Url_onOrOffShelves = UrlPath.Url_PetOffShelve
     }else{
      Url_onOrOffShelves = UrlPath.Url_PetShelve
     }
    let reuqestParam = new RequestParamObj({
      url: UrlPath.Url_Base + Url_onOrOffShelves+ param.petNo ,
      data: {},
      method: "PUT",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        if (Util.checkIsFunction(onOrOffShelvesResultCallback)) {
          onOrOffShelvesResultCallback(res);
        }
      }
    })
    RequestUtil.RequestPUT(reuqestParam);
  
  // let requestParam = new RequestParamObj({
  //   url: UrlPath.Url_Base + UrlPath.Url_Pet_OnOrOff_Shelves,
  //   data: {
  //     petNo: param.2,
  //     itemState: param.itemState
  //   },
  //   header: {
  //     'content-type': "application/x-www-form-urlencoded"
  //   },
  //   success(res) {
  //     if (Util.checkIsFunction(onOrOffShelvesResultCallback)) {
  //       onOrOffShelvesResultCallback(res);
  //     }
  //   }
  // })
  // RequestUtil.RequestPOST(requestParam);
}

/**
 * 获取已发布宠物列表
 * @param param (businessNo, offset, limit)
 * @param getResultCallback
 */
function getReleaseList(param , getResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_ReleaseList,
    data: {
      businessNo: param.businessNo,
      offset: param.offset,
      limit: param.limit
    },
    success(res) {
      if (Util.checkIsFunction(getResultCallback)) {
        getResultCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

module.exports = {
  getNearPetList: getNearPetList, // 获取附近
  getNewestPet: getNewestPet, // 获取最新上架
  getUpScalePet: getUpScalePet, // 获取高端宠物
  getPreferentialPet: getPreferentialPet, // 获取特惠抢购
  getFinePet: getFinePet, // 获取精品宠物
  getPetList: getPetList, // 获取筛选宠物

  getHotType: getHotType, // 获取热门分类
  getSort: getSort, // 获取宠物分类
  getBreed: getBreed, // 获取宠物品种

  getPetDetail: getPetDetail, // 获取宠物详情


  getMorePetEvaluate: getMorePetEvaluate, // 获取更多宠物评价
  addNewPetEvaluate: addNewPetEvaluate, // 新增宠物评价

  releasePet: releasePet, // 发布宠物
  editPet: editPet, // 编辑宠物
  onOrOffShelves: onOrOffShelves, // 上架/下架宠物
  getReleaseList: getReleaseList, // 获取已发布宠物列表
}