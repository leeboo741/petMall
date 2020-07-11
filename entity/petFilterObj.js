
/**
 * 
 * 宠物筛选条件对象
 * 
 */
const Util = require("../utils/util.js");

const UserService=require("../services/userService.js");

/**
 * 构造方法
 */
var PetFilterObj = function PetFilterObj(data) {
  this.city = ""; // 城市
  this.location = {
    latitude: "", // 纬度
    longitude: "" // 经度
  }; // 坐标
  this.startMoney = ""; // 开始价格
  this.endMoney = ""; // 结束价格
  this.sex = ""; // 性别
  this.offset = 0; // 数据开始偏移量
  this.limit = 0; // 数据长度

  this.petSortNo = ""; // 宠物分类
  this.petGenreNo = ""; // 宠物品种
  
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
    if (Util.checkIsString(data.startMoney)) {
      this.startMoney = data.startMoney;
    }
    if (Util.checkIsString(data.endMoney)) {
      this.endMoney = data.endMoney;
    }
    if (Util.checkIsNumber(data.offset)) {
      this.offset = data.offset;
    }
    if (Util.checkIsNumber(data.limit)) {
      this.limit = data.limit;
    }
    if (Util.checkIsString(data.petGenreNo)) {
      this.petGenreNo = data.petGenreNo;
    }
  }
}



function utilObject(data) {
  const utilData = {
    city: null,
    startMoney: null,
    endMoney: null,
    sex: null,
    offset: 0,
    limit: null,
    searchKey: null,
    petSortNo: null,
    petGenreNo: null,
  }
  if (data.city)
    utilData.city = data.city;
  if (data.startMoney)
    utilData.startMoney = data.startMoney;
  if (data.endMoney)
    utilData.endMoney = data.endMoney;
  if(data.sex==0||data.sex==1)
    utilData.sex = data.sex;
  if (data.offset)
    utilData.offset = data.offset;
  if (data.limit)
    utilData.limit = data.limit;
  if (data.searchKey) {
    utilData.searchKey = data.searchKey
  }
  if (data.petSortNo) {
    utilData.petSortNo = data.petSortNo
  }
  if (data.petGenreNo) {
    utilData.petGenreNo = data.petGenreNo
  }

  return utilData;
}

function getPetList(data){ //宠物列表
  const petData = {
    businessNo: null, //商家编号
    petNo: null,      //宠物编号
    petState: null,   //宠物状态
    offset: 0,        //排除条数
    limit: 20,      //显示条数
  }

  if (data.businessNo)
    petData.businessNo = data.businessNo;
  if (data.petNo)
    petData.petNo = data.petNo;
  if (data.petState)
    petData.petState = data.petState;
  if (data.offset)
    petData.offset = data.offset;
  if (data.limit)
    petData.limit = data.limit;

  return petData;
}


module.exports={
  PetFilterObj: PetFilterObj,
  utilObject: utilObject,
  getPetList: getPetList
}