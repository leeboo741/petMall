const Util = require("../utils/util.js");


function couponObj(dataObj){   //获得优惠券列表对象 
  let empObj={
    businessNo:null,  //商家no
    couponId: null,  //优惠券主键
    couponTypeId: null,  //优惠券类别
    used: null,  //是否已经使用过
    invalid: null, //是否已经失效
    offset: 0,  //排除条数
    limit: 20, //显示条数
  }

  if (!Util.checkIsObject(dataObj.businessNo)){
    empObj.businessNo = dataObj.businessNo
  }

  if (!Util.checkIsObject(dataObj.couponId)) {
    empObj.couponId = dataObj.couponId
  }

  if (!Util.checkIsObject(dataObj.couponTypeId)) {
    empObj.couponTypeId = dataObj.couponTypeId
  }

  if (!Util.checkIsObject(dataObj.used)) {
    empObj.used = dataObj.used
  }

  if (!Util.checkIsObject(dataObj.invalid)) {
    empObj.invalid = dataObj.invalid
  }

  if (!Util.checkIsObject(dataObj.offset)) {
    empObj.offset = dataObj.offset
  }

  if (!Util.checkIsObject(dataObj.limit)) {
    empObj.limit = dataObj.limit
  }

  return empObj;
}


module.exports = {
  couponObj: couponObj
}