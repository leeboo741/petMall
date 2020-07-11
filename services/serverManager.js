const ResponseEnum = require("../services/handle/ResponseCodeEnum.js");
const RequestUtil = require("../utils/requestUtil.js");
const { RequestParamObj } = require("../utils/requestParamObj.js");
const UrlPath = require("../macros/urlPath.js");
const Util = require("../utils/util.js");
const util = require("../utils/util.js");

/**
 * 核销服务
 */
function verifyServer(serverNo, verifyCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_OrderVerify,
    data: {
      orderNo: serverNo
    },
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    success(res) {
      if (Util.checkIsFunction(verifyCallback)) {
        verifyCallback(res.root)
      }
    }
  })
  RequestUtil.RequestPUT(requestParam);
}

/**
 * 发布服务
 */
function releaseServer(service, releaseServerCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_ReleaseServer,
    data: service,
    success(res) {
      if (Util.checkIsFunction(releaseServerCallback)) {
        releaseServerCallback(res.root)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 编辑服务
 */
function editServer(service, editServerCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_EditServer,
    data: service,
    success(res) {
      if (Util.checkIsFunction(editServerCallback)) {
        editServerCallback(res.root)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 服务上架
 * @param serviceId
 * @param groundingCallback
 */
function groundingServer(serviceId, groundingCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_GroundingServer(serviceId),
    success(res) {
      if (Util.checkIsFunction(groundingCallback)) {
        groundingCallback(res.root)
      }
    }
  })
  RequestUtil.RequestPUT(requestParam);
}

/**
 * 服务下架
 * @param serviceId
 * @param dismountCallback
 */
function dismountServer(serviceId, dismountCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_DismountServer(serviceId),
    success(res) {
      if (Util.checkIsFunction(dismountCallback)) {
        dismountCallback(res.root)
      }
    }
  })
  RequestUtil.RequestPUT(requestParam);
}

/**
 * 获取所有宠物毛长
 */
function getAllPetHariLength(getAllPetHairLengthCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_GetAllPetHairLength,
    success(res) {
      if (Util.checkIsFunction(getAllPetHairLengthCallback)) {
        getAllPetHairLengthCallback(res.root)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取所有服务分类
 */
function getAllServerType(getAllServerTypeCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_GetAllServerType,
    success(res) {
      if (Util.checkIsFunction(getAllServerTypeCallback)) {
        getAllServerTypeCallback(res.root)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取可用的优惠券
 * 
 * @param shopNo 商店编号
 * @param businessNo 用户编号
 * @param serverTypeNo 服务种类编号
 * @param subtotalAmount 订单金额
 * @param getAbleCouponListCallback
 */
function getAbleCouponList(shopNo, businessNo, serverTypeNo, subtotalAmount, getAbleCouponListCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_GetCoupon,
    data:{
      businessNo: businessNo,
      shopNo: shopNo,
      type: 3,
      key: serverTypeNo,
      subtotalAmount: subtotalAmount
    },
    success(res) {
      if (Util.checkIsFunction(getAbleCouponListCallback)) {
        getAbleCouponListCallback(res.root)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取毛发长度
 * 
 * @param serviceID
 * @param petGenreNo
 * @param getHairLengthCallback
 */
function getHariLength(serviceID, petGenreNo,getHairLengthCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_HairLength,
    data: {
      serviceID: serviceID,
      petGenreNo: petGenreNo,
    },
    success(res) {
      if (Util.checkIsFunction(getHairLengthCallback)) {
        getHairLengthCallback(res.root)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取服务重量区间
 * 
 * @param serviceID
 * @param getWeightZoneCallback
 */
function getWeightZone(serviceID, hairLength, getWeightZoneCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_Weight,
    data: {
      serviceID: serviceID,
      hairLength: hairLength,
    },
    success(res) {
      if (Util.checkIsFunction(getWeightZoneCallback)) {
        getWeightZoneCallback(res.root)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取服务年龄区间
 *
 * @param serviceID
 * @param getWeightZoneCallback
 */
function getAgeZone(serviceID, getAgeZoneCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_GetServerAgeZone,
    data: {
      serviceID: serviceID,
    },
    success(res) {
      if (Util.checkIsFunction(getAgeZoneCallback)) {
        getAgeZoneCallback(res.root)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取服务价格
 * 
 * @param serviceID
 * @param hairLength
 * @param petWeight
 * @param petGenreNo
 * @param getPriceCallback
 */
function getServicePrice(serviceID, hairLength, petWeight, petGenreNo, getPriceCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_Price,
    data: {
      serviceId: serviceID,
      petWeight: petWeight,
      hairLength: hairLength,
      petGenreNo: petGenreNo,
    },
    success(res) {
      if (Util.checkIsFunction(getPriceCallback)) {
        getPriceCallback(res.root)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 给美容师作品点赞
 * 
 * @param workId 作品id
 * @param businessNo 点赞人id
 * @param addWorkLikeCallback
 */
function addWorkLike(workId, businessNo, addWorkLikeCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_AddWorkLike,
    data: {
      workId: workId,
      businessNo: businessNo,
    },
    success(res) {
      if (Util.checkIsFunction(addWorkLikeCallback)) {
        addWorkLikeCallback(res.root)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 获取商家列表
 * 
 * @param cityName
 * @param areaName
 * @param latitude
 * @param longitude
 * @param offset
 * @param limit
 * @param getBusinessListCallback
 */
function getBusinessList(cityName, areaName, latitude, longitude, offset, limit, getBusinessListCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_GetBusinessList,
    data: {
      city: cityName,
      area: areaName,
      lat: latitude,
      lng: longitude,
      offset: offset?offset:0,
      limit: limit?limit:20,
    },
    success(res) {
      if (Util.checkIsFunction(getBusinessListCallback)) {
        getBusinessListCallback(res.root)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取爱宠列表
 * 
 * @param businessNo
 * @param getMyPetListSuccessBlock
 */
function getMyPetList(businessNo, getMyPetListSuccessBlock){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_GetMyPet + businessNo,
    success(res) {
      if (Util.checkIsFunction(getMyPetListSuccessBlock)) {
        getMyPetListSuccessBlock(res.root)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取爱宠总数
 * 
 * @param businessNo 商家编号
 * @Param getCountCallback 回调
 */
function getMyPetCount(businessNo, getCountCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_CountMyPet + businessNo,
    success(res) {
      if (Util.checkIsFunction(getCountCallback)) {
        getCountCallback(res)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 删除宠物
 * 
 * @param petNo
 * @param deletePetSuccessCallback
 */
function deletePet(petNo, deletePetSuccessCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_DeleteMyPet + petNo,
    success(res) {
      if (Util.checkIsFunction(deletePetSuccessCallback)) {
        deletePetSuccessCallback(res)
      }
    }
  })
  RequestUtil.RequestDELETE(requestParam);
}

/**
 * 编辑宠物
 * 
 * @param petObj
 * @param editPetSuccessCallback
 */
function editPet(petObj, editPetSuccessCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_AddNewMyPet,
    data: petObj,
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      if (Util.checkIsFunction(editPetSuccessCallback)) {
        editPetSuccessCallback(res)
      }
    }
  })
  RequestUtil.RequestPUT(requestParam);
}

/**
 * 新增宠物
 * 
 * @param petObj
 * @param addNewPetSuccessCallback
 */
function addNewPet(petObj, addNewPetSuccessCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_AddNewMyPet,
    data: petObj,
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      if (Util.checkIsFunction(addNewPetSuccessCallback)) {
        addNewPetSuccessCallback(res)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 获取一级分类
 * 
 * @param getSortCallback
 */
function getPetSort(getSortCallback){
  let queryParam = {
    limit: null,
    offset: null,
  };
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_GetPetSort,
    data:{
      queryParam: JSON.stringify(queryParam)
    },
    success(res) {
      if (Util.checkIsFunction(getSortCallback)) {
        getSortCallback(res.root)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取二级分类
 * 
 * @param petSortNo
 * @param keyword
 * @param getGenreCallback
 * @param completeCallback
 */
function getGenreList(petSortNo, keyword, getGenreCallback, completeCallback) {
  let queryParam = {
    limit: null,
    offset: null,
    petSortNo: petSortNo,
  };
  if (!Util.checkEmpty(keyword)) {
    queryParam.keyWord = keyword
  }
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_GetPetGenre,
    data: {
      queryParam: JSON.stringify(queryParam)
    },
    success(res) {
      if (Util.checkIsFunction(getGenreCallback)) {
        getGenreCallback(res.root)
      }
    },
    complete(){
      if (Util.checkIsFunction(completeCallback)) {
        completeCallback()
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取客户已预约服务列表
 */
function customerGetOrderServerList(businessNo, offset, limit, getOrderServerListCallback) {
  let queryParam = {
    limit: limit,
    offset: offset,
    businessNo: businessNo,
  };
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_GetCustomerOrderList,
    data: queryParam,
    success(res) {
      if (Util.checkIsFunction(getOrderServerListCallback)) {
        getOrderServerListCallback(res.root)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取商家已预约服务列表
 */
function businessGetOrderServerList(businessNo, offset, limit, getOrderServerListCallback) {
  let queryParam = {
    limit: limit,
    offset: offset,
    businessNo: businessNo,
  };
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_GetBusinessOrderList,
    data: queryParam,
    success(res) {
      if (Util.checkIsFunction(getOrderServerListCallback)) {
        getOrderServerListCallback(res.root)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 使用服务类别获取服务商服务列表
 */
function getBusinessServerListByServerNo(businessNo, serverTypeNo, getResultCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_GetBusinessServerListByServerNo(businessNo, serverTypeNo),
    success(res) {
      if(Util.checkIsFunction(getResultCallback)) {
        getResultCallback(res.root);
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取商家服务分类列表
 */
function getBusinessServerTypeList(businessNo, getServerTypeListCallback, failCallback, completeCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_GetBusinessServerTypeList(businessNo),
    success(res) {
      if(Util.checkIsFunction(getServerTypeListCallback)){
        getServerTypeListCallback(res.root);
      }
    },
    fail(res) {
      if(Util.checkIsFunction(failCallback)){
        failCallback(res);
      }
    },
    complete(res){
      if(Util.checkIsFunction(completeCallback)){
        completeCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取已发布服务列表
 * @param businessNo
 * @param offset
 * @param limit
 * @param state 1 查询已上架  0 查询已下架 -1 查询全部
 */
function getReleasedServerList(businessNo, offset, limit, state, getReleasedServerListCallback, failCallback,completeCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_GetReleasedServerList,
    data: {
      businessNo: businessNo,
      offset: offset,
      limit: limit,
      state: state,
    },
    success(res) {
      if (Util.checkIsFunction(getReleasedServerListCallback)) {
        getReleasedServerListCallback(res.root)
      }
    },
    fail(res) {
      if (Util.checkIsFunction(failCallback)) {
        failCallback(res.root);
      }
    },
    complete(res) {
      if (Util.checkIsFunction(completeCallback)) {
        completeCallback(res)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取服务下单参数对象
 */
function OrderServerParam(obj) {
  let orderServerParam = {};
  orderServerParam.shop= {};
  orderServerParam.buyer = {};
  orderServerParam.qty = 1;
  orderServerParam.coupon = {};
  orderServerParam.couponAmount = 0;
  orderServerParam.paymentAmount = 0;
  orderServerParam.service = {};
  orderServerParam.servicePrice = {};
  orderServerParam.visitorTime = '';
  orderServerParam.beautician = {};
  if (obj != null) {
    Util.checkEmpty(obj.shop) ? orderServerParam.shop = {} : orderServerParam.shop = obj.shop;
    Util.checkEmpty(obj.buyer) ? orderServerParam.buyer = {} : orderServerParam.buyer = obj.buyer;
    Util.checkEmpty(obj.qty) ? orderServerParam.qty = 1 : orderServerParam.qty = obj.qty;
    Util.checkEmpty(obj.coupon) ? orderServerParam.coupon = {} : orderServerParam.coupon = obj.coupon;
    Util.checkEmpty(obj.couponAmount) ? orderServerParam.couponAmount = 0 : orderServerParam.couponAmount = obj.couponAmount;
    Util.checkEmpty(obj.paymentAmount) ? orderServerParam.paymentAmount = 0 : orderServerParam.paymentAmount = obj.paymentAmount;
    Util.checkEmpty(obj.service) ? orderServerParam.service = {} : orderServerParam.service = obj.service;
    Util.checkEmpty(obj.servicePrice) ? orderServerParam.servicePrice = {} : orderServerParam.servicePrice = obj.servicePrice;
    Util.checkEmpty(obj.visitorTime) ? orderServerParam.visitorTime = '' : orderServerParam.visitorTime = obj.visitorTime;
    Util.checkEmpty(obj.beautician) ? orderServerParam.beautician = {} : orderServerParam.beautician = obj.beautician;
  }
  return orderServerParam;
}

/**
 * 服务下单
 */
function orderServer(orderServerParam, orderCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_OrderServer,
    data: orderServerParam, 
    success(res) {
      if (Util.checkIsFunction(orderCallback)) {
        orderCallback(res.root)
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}

/**
 * 获取所有商家所在城市列表
 */
function getAllBusinessCityList(getAllBusinessCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_AllBusinessCity,
    success(res){
      if (Util.checkIsFunction(getAllBusinessCallback)) {
        getAllBusinessCallback(res.root)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}


module.exports={
  addWorkLike: addWorkLike,
  getBusinessList: getBusinessList,
  getMyPetList: getMyPetList,
  getMyPetCount: getMyPetCount,
  editPet: editPet,
  addNewPet: addNewPet,
  deletePet: deletePet,
  getPetSort: getPetSort,
  getGenreList: getGenreList,
  getHariLength: getHariLength,
  getWeightZone: getWeightZone,
  getAgeZone: getAgeZone,
  getServicePrice: getServicePrice,
  getAbleCouponList: getAbleCouponList,
  getAllServerType: getAllServerType,
  getAllPetHariLength: getAllPetHariLength,
  releaseServer: releaseServer,
  editServer: editServer,
  dismountServer: dismountServer,
  groundingServer:groundingServer,
  customerGetOrderServerList: customerGetOrderServerList,
  businessGetOrderServerList: businessGetOrderServerList,
  getBusinessServerTypeList: getBusinessServerTypeList,
  getBusinessServerListByServerNo:getBusinessServerListByServerNo,
  getReleasedServerList: getReleasedServerList,
  OrderServerParam: OrderServerParam,
  orderServer: orderServer,
  verifyServer: verifyServer,
  getAllBusinessCityList: getAllBusinessCityList,
}