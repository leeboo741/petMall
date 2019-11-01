/**
 * 获取 yyyy-mm-dd hh:MM:dd 时间
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * 获取 yyyy-mm-dd 格式时间
 */
const formatYMD = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

/**
 * 格式化时间
 * 1时 转 01时
 */
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获取时间和星期几
 * @param dates 作为标准的时间 
 * @param later 在标准时间上加减的天数
 * @return dateObj 时间对象 time yyyy-mm-dd | week 周几
 */
function dateLater(dates, later) {
  let dateObj = {};
  let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
  let date = new Date(dates);
  date.setDate(date.getDate() + later);
  let day = date.getDay();
  let yearDate = date.getFullYear();
  let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
  let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  dateObj.time = yearDate + '-' + month + '-' + dayFormate;
  dateObj.week = show_day[day];
  return dateObj;
}

/**
 * 是否是视频文件
 * @param fileAddress 文件地址
 * @return true 是 false 不是
 */
function isVideo(fileAddress) {
  let index = fileAddress.lastIndexOf(".");
  let suffix = fileAddress.substring(index + 1);
  if (suffix == "mp4" ||
    suffix == "mov" ||
    suffix == "m4v" ||
    suffix == "3gp" ||
    suffix == "avi" ||
    suffix == "m3u8" ||
    suffix == "webm") {
    return true;
  }
  return false;
}

/**
 * 是否可用电话
 * @param phone 要检查的电话
 * @return true 可用 false 不可用
 */
function isPhoneAvailable(phone) {
  var myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
  if (!myreg.test(phone)) {
    return false;
  } else {
    return true;
  }
}

/**
 * 检查是否为空
 * @param 对象
 * @return true 空 false 非空
 */
function checkEmpty(obj) {
  if (obj == null || obj.length <= 0) {
    return true;
  }
  return false;
}

/**
 * 检查 是否是可用 function
 * @param fctObj 函数对象
 * @return true 是 false 不是
 */
function checkIsFunction(fctObj) {
  if (fctObj != null && typeof fctObj == "function") {
    return true;
  }
  return false;
}

/**
 * 检查是否是 string
 * @param checkObj 检查对象
 * @return true 是 false 不是
 */
function checkIsString(checkObj) {
  return checkObj != null && typeof checkObj == "string";
}

/**
 * 检查是否是 object
 * @param checkObj 检查对象
 * @return true 是 false 不是
 */
function checkIsObject(checkObj) {
  return checkObj != null && typeof checkObj == "object";
}

/**
 * 检查是否是 boolean
 * @param checkObj 检查对象
 * @return true 是 false 不是
 */
function checkIsBoolean(checkObj) {
  return checkObj != null && typeof checkObj == "boolean";
}

/**
 * 检查是否是 number
 * @param checkObj 检查对象
 * @return true 是 false 不是
 */
function checkIsNumber(checkObj) {
  return checkObj != null && typeof checkObj == "number";
}

/**
 * 检查是否是 undefined
 * @param checkObj 检查对象
 * @return true 是 false 不是
 */
function checkIsUndefined(checkObj) {
  return checkObj != null && typeof checkObj == "undefined";
}

module.exports = {
  formatTime: formatTime,
  dateLater: dateLater,
  formatYMD: formatYMD,
  isVideo: isVideo,
  isPhoneAvailable: isPhoneAvailable,
  checkEmpty: checkEmpty,
  checkIsFunction: checkIsFunction,
  checkIsString: checkIsString,
  checkIsObject: checkIsObject,
  checkIsBoolean: checkIsBoolean,
  checkIsNumber: checkIsNumber,
  checkIsUndefined: checkIsUndefined
}
