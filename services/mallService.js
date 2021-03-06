const UrlPath = require("../macros/urlPath.js");

const ResponseEnum = require("../services/handle/ResponseCodeEnum.js");
const RequestUtil = require("../utils/requestUtil.js");
const {
  RequestParamObj
} = require("../utils/requestParamObj.js");
const UserService=require("../services/userService.js");

const Util = require("../utils/util.js");

/**
 * 商城分类
 * @param getDataCallback 获取数据回调
 * @param grade 宠粮类型
 * @param limit 显示数量
 */
function getMallPetType(obj, getDataCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_ItemType + "?queryParam=" + encodeURIComponent(JSON.stringify(obj), 'utf-8'),
    data: {
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
    url: UrlPath.Url_Base + UrlPath.Url_ItemShowTypeInfo,
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

function getBrandInfo(obj,getDataCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Item_Brand +"?queryParam=" + encodeURIComponent(JSON.stringify(obj), 'utf-8'),
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
function getVarieties(getDataCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Item_Classify,
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
 * 获取套餐类型
 * @param getResultCallback
 */
function getSetMealList(obj,getResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Item_SetMeal + "?queryParam=" + encodeURIComponent(JSON.stringify(obj), 'utf-8'),
    success(res) {
      if (Util.checkIsFunction(getResultCallback)) {
        getResultCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam)
}

/**
 * 获取团购商品列表
 */
function getGroupItemList(param, getResultCallback) {
  let data = {
    offset: 0,
    limit: 4,
    itemState: 1,
  };

  if (!Util.checkEmpty(param.limit)) {
    data.limit = param.limit;
  }

  if (!Util.checkEmpty(param.itemState)) {
    data.itemState = param.itemState;
  }

  if (!Util.checkEmpty(param.businessNo)) {
    data.businessNo = param.businessNo;
  }

  if (!Util.checkEmpty(param.itemNo)) {
    data.itemNo = param.itemNo;
  }

  if (!Util.checkEmpty(param.petSortNo)) {
    data.petSortNo = param.petSortNo;
  }

  if (!Util.checkEmpty(param.itemTypeNo)) {
    data.itemTypeNo = param.itemTypeNo;
  }

  if (!Util.checkEmpty(param.itemBrandNo)) {
    data.itemBrandNo = param.itemBrandNo;
  }
  if (!Util.checkEmpty(param.offset)) {
    data.offset = param.offset;
  }
  if (!Util.checkEmpty(param.limit)) {
    data.limit = param.limit;
  }

  if (!Util.checkEmpty(param.itemPackNo)) {
    data.itemPackNo = param.itemPackNo;
  }

  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Item_Group + "?queryParam=" + encodeURIComponent(JSON.stringify(data), 'utf-8'),
    data: {},
    success(res) {
      if (typeof getResultCallback == "function" && getResultCallback) {
        getResultCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam)
}

/**
 * 查询商品列表
 * @param param (itemTypeNo, itemClassifyNo, itemPackNo, itemBrandNo, page, number)
 * @param getResultCallback
 * @param completeCallback
 */
function getItemList(param, getResultCallback, completeCallback) {
  let data = {
    offset: 0,
    limit:4,
  };

  if (!Util.checkEmpty(param.limit)) {
    data.limit = param.limit;
  }

  if (!Util.checkEmpty(param.itemState)){
    data.itemState = param.itemState;
  }

  if (!Util.checkEmpty(param.businessNo)){
    data.businessNo = param.businessNo;
  }
  
  if (!Util.checkEmpty(param.itemNo)){
    data.itemNo = param.itemNo;
  }

  if (!Util.checkEmpty(param.petSortNo)) {
    data.petSortNo = param.petSortNo;
  }

  if (!Util.checkEmpty(param.itemTypeNo)) {
    data.itemTypeNo = param.itemTypeNo;
  }

  if (!Util.checkEmpty(param.itemBrandNo)) {
    data.itemBrandNo = param.itemBrandNo;
  }
  if (!Util.checkEmpty(param.offset)) {
    data.offset = param.offset;
  }
  if (!Util.checkEmpty(param.limit)) {
    data.limit = param.limit;
  }

  if (!Util.checkEmpty(param.itemPackNo)) {
    data.itemPackNo = param.itemPackNo;
  }

  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Item_List + "?queryParam=" + encodeURIComponent(JSON.stringify(data), 'utf-8') ,
    data: {},
    success(res) {
      if (typeof getResultCallback == "function" && getResultCallback) {
        getResultCallback(res);
      }
    },
    complete(res){
      if (completeCallback && typeof completeCallback == 'function') {
        completeCallback(res);
      }
    },
  })
  RequestUtil.RequestGET(requestParam)
}

/**
 * 获取商品详情
 * @param itemNo 
 * @param getResultCallback
 */
function getItemDetail(itemNo, getResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Item_Detail + itemNo,
    success(res) {
      if (Util.checkIsFunction(getResultCallback)) {
        getResultCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam)
}

/**
 * 新增商品收藏
 * @param param(itemNo , customerNo)
 * @param addResultCallback
 */
function addNewItemCollection(param, addResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_AddNew_Item_Collection,
    data: {
      itemNo: param.itemNo ,
      customerNo: param.customerNo
    },
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    success(res) {
      if (Util.checkIsFunction(addResultCallback)) {
        addResultCallback(res);
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 查询商品收藏
 * @param customerNo
 * @param getResultCallback
 */
function getItemCollection(customerNo, getResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Get_Item_Collection,
    data: {
      customerNo: customerNo
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
 * 删除宠物收藏
 * @param param (customerNo, itemNo )
 * @param getResultCallback
 */
function deleteItemCollection(param, deleteResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Delete_Item_Collection + param.itemNo + "/" + param.customerNo,
    success(res) {
      if (Util.checkIsFunction(deleteResultCallback)) {
        deleteResultCallback(res);
      }
    }
  })
  RequestUtil.RequestDELETE(requestParam);
}

/**
 * 获取更多商品评价
 * @param param (itemNo, offset, limit)
 * @param getResultCallback
 */
function getMoreItemEvaluate(param, getResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_ItemEvaluateInformation,
    data: {
      itemNo: param.itemNo,
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

/**
 * 新增商品评价
 * @param param
 * @param addNewEvaluateCallback
 */
function addNewItemEvaluate(param, addNewEvaluateCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_Addpj_Info,
    data: {
      billNo: param.orderNo,
      content: param.content,
      customer: {
        customerNo: param.customerNo,
      },
      item: {
        itemName: param.itemName,
        itemNo:param.itemNo
      },
      pet:{
        petName: param.petName,
        petNo: param.petNo
      },
      appraiseImgList: param.imageList,
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

module.exports = {

  getMallPetTypeShowInfor: getMallPetTypeShowInfor,

  getMallPetType: getMallPetType, // 获取宠物类别
  getBrandInfo: getBrandInfo, // 获取品牌列表
  getVarieties: getVarieties, // 获取

  getSetMealList: getSetMealList, // 获取套餐列表
  getItemList: getItemList, // 获取商品列表
  getGroupItemList: getGroupItemList, // 获取团购商品列表
  getItemDetail: getItemDetail, // 获取商品详情

  addNewItemCollection: addNewItemCollection, // 新增商品收藏
  getItemCollection: getItemCollection, // 获取商品收藏
  deleteItemCollection: deleteItemCollection, // 删除商品收藏

  getMoreItemEvaluate: getMoreItemEvaluate, // 获取更多商家评价
  addNewItemEvaluate: addNewItemEvaluate, // 新增商品评价
}