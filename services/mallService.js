const UrlPath = require("../macros/urlPath.js");

const ResponseEnum = require("../services/handle/ResponseCodeEnum.js");
const RequestUtil = require("../utils/requestUtil.js");
const {
  RequestParamObj
} = require("../utils/requestParamObj.js");

const Util = require("../utils/util.js");

/**
 * 商城分类
 * @param getDataCallback 获取数据回调
 * @param grade 宠粮类型
 * @param limit 显示数量
 */
function getMallPetType(grade, limit, getDataCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_ItemType,
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

function getBrandInfo(getDataCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Item_Brand,
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
function getSetMealList(getResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Item_SetMeal,
    success(res) {
      if (Util.checkIsFunction(getResultCallback)) {
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
 */
function getItemList(param, getResultCallback) {
  let data = {
    page: 0,
    number: 0,
  };
  if (!Util.checkEmpty(param.itemTypeNo)) {
    data.itemTypeNo = param.itemTypeNo;
  }
  if (!Util.checkEmpty(param.itemClassifyNo)) {
    data.itemClassifyNo = param.itemClassifyNo;
  }
  if (!Util.checkEmpty(param.itemSetMealNo)) {
    data.itemPackNo = param.itemSetMealNo;
  }
  if (!Util.checkEmpty(param.itemBrandNo)) {
    data.itemBrandNo = param.itemBrandNo;
  }
  if (!Util.checkEmpty(param.offset)) {
    data.page = param.offset;
  }
  if (!Util.checkEmpty(param.limit)) {
    data.number = param.limit;
  }

  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Item_List,
    data: data,
    success(res) {
      if (typeof getResultCallback == "function" && getResultCallback) {
        getResultCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam)
}

/**
 * 获取商品详情
 * @param param (itemNo, limit)
 * @param getResultCallback
 */
function getItemDetail(param, getResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Item_Detail,
    data: {
      itemNo: param.itemNo,
      limit: param.limit,
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

module.exports = {
  getMallPetType: getMallPetType,
  getMallPetTypeShowInfor: getMallPetTypeShowInfor,
  getBrandInfo: getBrandInfo,
  getVarieties: getVarieties,
  getSetMealList: getSetMealList,
  getItemList: getItemList,
  getItemDetail: getItemDetail,
  addNewItemCollection: addNewItemCollection,
  getItemCollection: getItemCollection,
  deleteItemCollection: deleteItemCollection,
}