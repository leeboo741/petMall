
const Config = require('../macros/config');

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
  if (obj == null || obj==undefined) {
    return true;
  }
  if ((typeof obj == 'string' || obj instanceof Array) && obj.length <= 0) {
    return true;
  } 
  if (typeof obj == 'object' && Object.keys(obj).length <= 0) {
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
 * 检查是否是空对象
 * @param checkObj 要检查的对象
 * @return true 空 false 非空
 */
function checkObjectIsEmpty(checkObj) {
  return !checkIsObject(checkObj) || Object.keys(checkObj).length <= 0;
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

/**
 * 替换特殊字符
 */
function replaceSpecialChar(string) {
  string = string.replace(/\%/g, "%25");
  string = string.replace(/\#/g, "%23");
  string = string.replace(/\&/g, "%26");
  string = string.replace(/\ /g, "%20");
  string = string.replace(/\//g, "%2F");
  string = string.replace(/\?/g, "%3F");
  string = string.replace(/\=/g, "%3D");
  return string;
}


/**
 * 初始化经纬度
 */
function BD09_GCJ02(t) {
  t = t || {};
  var e = +parseFloat(t.lat || t.latitude || 0), n = 52.35987755982988, o = +parseFloat(t.lng || t.longitude || 0) - .0065, a = e - .006, i = Math.sqrt(o * o + a * a) - 2e-5 * Math.sin(a * n), c = Math.atan2(a, o) - 3e-6 * Math.cos(o * n);
  return t.longitude = i * Math.cos(c), t.latitude = i * Math.sin(c), t;
}

/**
 * 内置导航
 */
function openBaiduLocation(t) {
  t = t || {}, t = this.BD09_GCJ02(t), wx.openLocation(t);
}

/**
 * 恢复特殊字符
 */
function recoverySpecialChar(string) {
  string = string.replace(/\%25/g, "%");
  string = string.replace(/\%23/g, "#");
  string = string.replace(/\%26/g, "&");
  string = string.replace(/\%20/g, " ");
  string = string.replace(/\%2F/g, "/");
  string = string.replace(/\%3F/g, "?");
  string = string.replace(/\%3D/g, "=");
  return string;
}

/**
 * 获取地址中参数
 */
function getUrlParamDict(url) {
  let paramDict = {};
  let tempPaths = url.split("?");
  if (!checkEmpty(tempPaths) && tempPaths.length == 2) {
    let paramStr = tempPaths[1];
    let params = paramStr.split("&");
    for (let i = 0; i < params.length; i++) {
      let tempParamStr = params[i];
      let tempParams = tempParamStr.split("=");
      let tempParamKey = tempParams[0];
      let tempParamValue = tempParams[1];
      paramDict[tempParamKey] = tempParamValue;
    }
  }
  return paramDict;
}


 function getSystemInfo() {
  var t = "", e = "", n = "";
  return wx.getSystemInfo({
    success: function (o) {
      console.log(o.windowWidth);
      var a = o.windowWidth;
      n = o.windowHeight, t = (a / 750).toFixed(2), e = (750 / a).toFixed(2);
    }
  }), {
      px: t,
      rpx: e,
      scrollHeight: n
    };
}

/**
 * 调试日志打印打印
 */
function logInfo(...args){
  if (Config.Print_Console && Config.Print_Console_Level >= Config.Print_Console_Info) {
    console.log("========================= info start =========================")
    console.log(...args);
    console.log("========================= info end =========================")
  }
}
function logDebug(...args) {
  if (Config.Print_Console_Info && Config.Print_Console_Level >= Config.Print_Console_Debug) {
    console.log("========================= debug start =========================")
    console.log(...args);
    console.log("========================= debug end =========================")
  }
}
function logError(...args) {
  if (Config.Print_Console_Level && Config.Print_Console_Level >= Config.Print_Console_Error) {
    console.log("========================= error start =========================")
    console.log(...args);
    console.log("========================= error end =========================")
  }
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
  checkObjectIsEmpty: checkObjectIsEmpty,
  checkIsBoolean: checkIsBoolean,
  checkIsNumber: checkIsNumber,
  checkIsUndefined: checkIsUndefined,
  replaceSpecialChar: replaceSpecialChar,
  recoverySpecialChar: recoverySpecialChar,
  getUrlParamDict: getUrlParamDict,
  openBaiduLocation: openBaiduLocation,
  BD09_GCJ02: BD09_GCJ02,
  getSystemInfo: getSystemInfo,
  logInfo: logInfo,
  logDebug: logDebug,
  logError: logError,
}
