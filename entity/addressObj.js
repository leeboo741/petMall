
const Util = require("../utils/util.js");


/**
 * 收货地址对象
 * @param data 参数对象
 */
var AddressObj = function AddressObj(data) {
  this.addressNo = null; // 地址 编号
  this.province = null; // 省
  this.city = null; // 市
  this.county = null; // 区县
  this.detailedAddress = null; // 详细地址
  this.contacts = null; // 联系人名称
  this.phone = null; // 联系人电话
  this.isDefault = false; // 是否默认地址
  this.latitude = null; // 纬度
  this.longitude = null; // 经度
  this.customer = null; // 地址 所属人

  if (Util.checkIsObject(data)) {
    if (Util.checkIsString(data.addressNo)) {
      this.addressNo = data.addressNo
    }
    if (Util.checkIsString(data.province)) {
      this.province = data.province
    }
    if (Util.checkIsString(data.city)) {
      this.city = data.city
    }
    if (Util.checkIsString(data.county)) {
      this.county = data.county
    }
    if (Util.checkIsString(data.detailedAddress)) {
      this.detailedAddress = data.detailedAddress
    }
    if (Util.checkIsString(data.contacts)) {
      this.contacts = data.contacts
    }
    if (Util.checkIsString(data.phone)) {
      this.phone = data.phone
    }
    if (Util.checkIsBoolean(data.isDefault)) {
      this.isDefault = data.isDefault
    }
    if (Util.checkIsNumber(data.latitude)) {
      this.latitude = data.latitude
    }
    if (Util.checkIsNumber(data.longitude)) {
      this.longitude = data.longitude
    }
    if (Util.checkIsNumber(data.longitude)) {
      this.longitude = data.longitude
    }
    if (Util.checkIsObject(data.customer)) {
      this.customer = data.customer
    }
  }
}

module.exports={
  AddressObj: AddressObj
}