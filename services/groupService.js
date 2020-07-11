const ResponseEnum = require("../services/handle/ResponseCodeEnum.js");
const RequestUtil = require("../utils/requestUtil.js");
const { RequestParamObj } = require("../utils/requestParamObj.js");
const UrlPath = require("../macros/urlPath.js");
const Util = require("../utils/util.js");

/**
 * 团购筛选列表对象
 */
function groupListObj(paramData){
  let objData={
    city:null,    //城市
    startMoney:null,  //起始金额
    endMoney:null,    //结束金额
    sex:null,         //性别
    petGenreNo: null,  //宠物二级分类
    offset: null,      //排除条数
    limit:null         //显示条数
  }

  if (!Util.checkEmpty(paramData.city)){
    objData.city = paramData.city;
  }

  if (!Util.checkEmpty(paramData.startMoney)) {
    objData.startMoney = paramData.startMoney;
  }

  if (!Util.checkEmpty(paramData.city)) {
    objData.city = paramData.city;
  }

  if (!Util.checkEmpty(paramData.endMoney)) {
    objData.endMoney = paramData.endMoney;
  }

  if (!Util.checkEmpty(paramData.sex)) {
    objData.sex = paramData.sex;
  }

  if (!Util.checkEmpty(paramData.petGenreNo)) {
    objData.petGenreNo = paramData.petGenreNo;
  }

  if (!Util.checkEmpty(paramData.offset)) {
    objData.offset = paramData.offset;
  }

  if (!Util.checkEmpty(paramData.limit)) {
    objData.limit = paramData.limit;
  }

  return objData;

}

/**
 * 获得团购列表
 */
function getGroupList(param, getDataCallback){

  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_GroupList + "?queryParam=" + encodeURIComponent(JSON.stringify(groupListObj(param)), 'utf-8') ,
    data: {
      
    },
    success(res) {
      if (Util.checkIsFunction(getDataCallback)) {
        getDataCallback(res.root)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}


module.exports = {
  getGroupList: getGroupList, //团购列表
  groupListObj: groupListObj, //团购筛选对象
}


