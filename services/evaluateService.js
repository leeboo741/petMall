const UrlPath = require("../macros/urlPath.js");
const UserService = require("../services/userService.js");

const ResponseEnum = require("../services/handle/ResponseCodeEnum.js");
const RequestUtil = require("../utils/requestUtil.js");
const {
  RequestParamObj
} = require("../utils/requestParamObj.js");

const Util = require("../utils/util.js");
const urlPath = require("../macros/urlPath.js");
const requestParamObj = require("../utils/requestParamObj.js");

/**
 * 商品评价列表对象
 */
function goodesEvaluateObj(evaluateData){
  let tempEvaluateData={
    offset:0,
    limit:20,
    businessNo:null,
    itemNo:null,
    evaluatedBusinessNo:null
  };
  if (!Util.checkEmpty(evaluateData.businessNo)){
     tempEvaluateData.businessNo = evaluateData.businessNo
   }

  if (!Util.checkEmpty(evaluateData.itemNo)) {
    tempEvaluateData.itemNo = evaluateData.itemNo
  }

  if (!Util.checkEmpty(evaluateData.petSortNo)) {
    tempEvaluateData.petSortNo = evaluateData.petSortNo
  }

  if (!Util.checkEmpty(evaluateData.itemTypeNo)) {
    tempEvaluateData.itemTypeNo = evaluateData.itemTypeNo
  }

  if (!Util.checkEmpty(evaluateData.itemBrandNo)) {
    tempEvaluateData.itemBrandNo = evaluateData.itemBrandNo
  }

  if (!Util.checkEmpty(evaluateData.itemPackNo)) {
    tempEvaluateData.itemPackNo = evaluateData.itemPackNo
  }

  if (!Util.checkEmpty(evaluateData.title)) {
    tempEvaluateData.itemState = evaluateData.itemState
  }

  if (!Util.checkEmpty(evaluateData.offset)) {
    tempEvaluateData.offset = evaluateData.offset
  }

  if (!Util.checkEmpty(evaluateData.limit)) {
    tempEvaluateData.limit = evaluateData.limit
  }

  if (!Util.checkEmpty(evaluateData.evaluatedBusinessNo)){
    tempEvaluateData.evaluatedBusinessNo = evaluateData.evaluatedBusinessNo
  }

  return tempEvaluateData;
   
}

/**
 *  新增商品评价对象对象 
 */
function addGoodsEvaluateObj(addEvaluateData){
  let itemAppraiseVo={
      itemAppraise:{
          item: null,//商品id
          itemOrder: null,//订单编号
          business:{
            businessNo:null,  //评价商家id
          },
          praiseDegree:5, //好评星数
          content:null, //评价内容
          evaluatedBusiness:{ //被评价的商家id
            businessNo:null
          },
      },
      itemAppraiseImgList: [ //评价图片
        // {
        //   imgAddress:''
        // }
      ] 
  };

  if (!Util.checkEmpty(addEvaluateData.itemAppraise.item)) {
    itemAppraiseVo.itemAppraise.item = addEvaluateData.itemAppraise.item
  }

  if (!Util.checkEmpty(addEvaluateData.itemAppraise.itemOrder)) {
    itemAppraiseVo.itemAppraise.itemOrder = addEvaluateData.itemAppraise.itemOrder
  }

  if (!Util.checkEmpty(addEvaluateData.itemAppraise) && !Util.checkEmpty(addEvaluateData.itemAppraise.business)) {
    itemAppraiseVo.itemAppraise.business.businessNo = addEvaluateData.itemAppraise.business.businessNo
  }

  if (!Util.checkEmpty(addEvaluateData.itemAppraise) && !Util.checkEmpty(addEvaluateData.itemAppraise.praiseDegree)) {
    itemAppraiseVo.itemAppraise.praiseDegree = addEvaluateData.itemAppraise.praiseDegree
  }

  if (!Util.checkEmpty(addEvaluateData.itemAppraise) && !Util.checkEmpty(addEvaluateData.itemAppraise.content)) {
    itemAppraiseVo.itemAppraise.content = addEvaluateData.itemAppraise.content
  }

  if (!Util.checkEmpty(addEvaluateData.itemAppraise) && !Util.checkEmpty(addEvaluateData.itemAppraise.evaluatedBusiness)) {
    itemAppraiseVo.itemAppraise.evaluatedBusiness.businessNo = addEvaluateData.itemAppraise.evaluatedBusiness.businessNo
  }

  if (!Util.checkEmpty(addEvaluateData.itemAppraiseImgList)) {
    itemAppraiseVo.itemAppraiseImgList = addEvaluateData.itemAppraiseImgList
  }

  return itemAppraiseVo;

}


/**
 * 宠物评价列表对象
 */
function petEvaluateObj(petEvaluateData){
  let tempPetEvaluateData={
    petNo:null,   //宠物id
    businessNo:null,  //商家id
    evaluatedBusinessNo:null,
    offset:0,
    limit:20,
  }

  if (!Util.checkEmpty(petEvaluateData.limit)) {
    tempPetEvaluateData.limit = petEvaluateData.limit
  }

  if (!Util.checkEmpty(petEvaluateData.offset)) {
    tempPetEvaluateData.offset = petEvaluateData.offset
  }

  if (!Util.checkEmpty(petEvaluateData.businessNo)) {
    tempPetEvaluateData.businessNo = petEvaluateData.businessNo
  }

  if (!Util.checkEmpty(petEvaluateData.evaluatedBusinessNo)) {
    tempPetEvaluateData.evaluatedBusinessNo = petEvaluateData.evaluatedBusinessNo
  }

  if (!Util.checkEmpty(petEvaluateData.petNo)) {
    tempPetEvaluateData.petNo = petEvaluateData.petNo
  }

  return tempPetEvaluateData;

}


/**
 * 宠物新增评价对象
 */
function addPetEvaluateObj(petEvaluateData){
  let petAppraiseVo={
    petAppraise:{
      pet:null,
      petOrder:null,
      business:{
        businessNo:null
      },
      praiseDegree:5,
      content:null,
      evaluatedBusiness:{
        businessNo:null
      }
    },
    petAppraiseImgList:[
      // {
      //   imgAddress:''
      // }
    ] , //评价图片
  }

  if (!Util.checkEmpty(petEvaluateData.petAppraise.pet)) {
    petAppraiseVo.petAppraise.pet = petEvaluateData.petAppraise.pet
  }

  if (!Util.checkEmpty(petEvaluateData.petAppraise.petOrder)) {
    petAppraiseVo.petAppraise.petOrder= petEvaluateData.petAppraise.petOrder
  }

  if (!Util.checkEmpty(petEvaluateData.petAppraise) && !Util.checkEmpty(petEvaluateData.petAppraise.business)) {
    petAppraiseVo.petAppraise.business.businessNo = petEvaluateData.petAppraise.business.businessNo
  }

  if (!Util.checkEmpty(petEvaluateData.petAppraise) && !Util.checkEmpty(petEvaluateData.petAppraise.praiseDegree)) {
    petAppraiseVo.petAppraise.praiseDegree = petEvaluateData.petAppraise.praiseDegree
  }

  if (!Util.checkEmpty(petEvaluateData.petAppraise) && !Util.checkEmpty(petEvaluateData.petAppraise.content)) {
    petAppraiseVo.petAppraise.content = petEvaluateData.petAppraise.content
  }

  if (!Util.checkEmpty(petEvaluateData.petAppraise) && !Util.checkEmpty(petEvaluateData.petAppraise.evaluatedBusiness)) {
    petAppraiseVo.petAppraise.evaluatedBusiness.businessNo = petEvaluateData.petAppraise.evaluatedBusiness.businessNo
  }

  if (!Util.checkEmpty(petEvaluateData.petAppraiseImgList)) {
    petAppraiseVo.petAppraiseImgList = petEvaluateData.petAppraiseImgList
  }

  return petAppraiseVo;
}




/**===========商品评价============ */

/**
 * 获得商品评价列表
 */
function getGoodsEvaluate(itemEvaluateVo, goodsEvaluateCallback ){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Item_More_Evaluate + "?queryParam=" + encodeURIComponent(JSON.stringify(goodesEvaluateObj(itemEvaluateVo)), 'utf-8'),
    data: {
    },
    success(res) {
      if (typeof goodsEvaluateCallback == "function" && goodsEvaluateCallback) {
        goodsEvaluateCallback(res.root);
      }
    },
  })
  RequestUtil.RequestGET(requestParam)
}


/**
 * 新增商品评价
 */
function addGoodsEvaluate(itemAppraiseVo, goodsEvaluateCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Item_AddNew_Evaluate,
    data: addGoodsEvaluateObj(itemAppraiseVo),
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      if (Util.checkIsFunction(goodsEvaluateCallback)) {
        goodsEvaluateCallback(res.root);
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}




/**===========宠物评价============ */

/**
 * 获得宠物评价
 */
function petEvaluate(petEvaluateVo,petEvaluateCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_More_Evaluate + "?queryParam=" + encodeURIComponent(JSON.stringify(petEvaluateObj(petEvaluateVo)), 'utf-8'),
    data: {
    },
    success(res) {
      if (typeof petEvaluateCallback == "function" && petEvaluateCallback) {
        petEvaluateCallback(res.root);
      }
    },
  })
  RequestUtil.RequestGET(requestParam)
}


/**
 * 新增宠物评价
 */
function addpetEvaluate(petEvaluateObj, petEvaluateCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Pet_Addpj_Info ,
    data: addPetEvaluateObj(petEvaluateObj),
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      if (Util.checkIsFunction(petEvaluateCallback)) {
        petEvaluateCallback(res.root);
      }
    }
  })
  RequestUtil.RequestPOST(requestParam);
}


/** ========================= 服务评价 ==================== */

/**
 * 获取服务评价列表
 */
function getServerEvaluateList(param, getEvaluateCallback, completeCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_GetEvaluateList+ "?queryParam=" + encodeURIComponent(JSON.stringify(param), 'utf-8'),
    success(res) {
      if (Util.checkIsFunction(getEvaluateCallback)) {
        getEvaluateCallback(res.root);
      }
    },
    complete(res) {
      if (Util.checkIsFunction(completeCallback)) {
        completeCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 新增服务评价
 */
function addNewServerEvaluate(serverEvaluate, addSuccessCallback) {
  let reuqestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Server_AddNewEvaluate,
    data: serverEvaluate,
    success(res){
      if (Util.checkIsFunction(addSuccessCallback)) {
        addSuccessCallback(res.root);
      }
    },
  })
  RequestUtil.RequestPOST(reuqestParam)
}


module.exports = {
  getGoodsEvaluate: getGoodsEvaluate,   //获得商品评价列表
  addGoodsEvaluate: addGoodsEvaluate,   //新增商品评价列表
  petEvaluate: petEvaluate,             //获得宠物评价列表
  addpetEvaluate: addpetEvaluate  ,     //新增宠物评价列表

  goodesEvaluateObj: goodesEvaluateObj, //商品评价对象
  addGoodsEvaluateObj: addGoodsEvaluateObj, //新增商品对象
  goodesEvaluateObj: goodesEvaluateObj, //宠物评价列表对象

  getServerEvaluateList: getServerEvaluateList, // 获取服务评价列表
  addNewServerEvaluate: addNewServerEvaluate, // 新增服务评价
}