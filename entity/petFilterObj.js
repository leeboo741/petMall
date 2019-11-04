
/**
 * 
 * 宠物筛选条件对象
 * 
 */
const Util = require("../utils/util.js");

/**
 * 构造方法
 */
var PetFilterObj = function PetFilterObj(data) {
  this.city = ""; // 城市
  this.location = {
    latitude: "", // 纬度
    longitude: "" // 经度
  }; // 坐标
  this.priceStart = ""; // 开始价格
  this.priceEnd = ""; // 结束价格
  this.authType = ""; // 商家类型 来源
  this.offset = 0; // 数据开始偏移量
  this.limit = 0; // 数据长度
  this.petSortNo = ""; // 宠物分类
  
  this.around = ""; // 范围

  if (Util.checkIsObject(data)) {
    if (Util.checkIsString(data.city)) {
      this.city = data.city;
    }
    if (Util.checkIsObject(data.location)) {
      if (Util.checkIsNumber(data.location.latitude)) {
        this.location.latitude = data.location.latitude
      }
      if (Util.checkIsNumber(data.location.longitude)) {
        this.location.longitude = data.location.longitude
      }
    }
    if (Util.checkIsString(data.authType)) {
      this.authType = data.authType;
    }
    if (Util.checkIsString(data.petSortNo)) {
      this.petSortNo = data.petSortNo;
    }
    if (Util.checkIsNumber(data.around)) {
      this.around = data.around;
    }
    if (Util.checkIsNumber(data.priceStart)) {
      this.priceStart = data.priceStart;
    }
    if (Util.checkIsNumber(data.priceEnd)) {
      this.priceEnd = data.priceEnd;
    }
    if (Util.checkIsNumber(data.offset)) {
      this.offset = data.offset;
    }
    if (Util.checkIsNumber(data.limit)) {
      this.limit = data.limit;
    }
  }
}

module.exports={
  PetFilterObj: PetFilterObj
}