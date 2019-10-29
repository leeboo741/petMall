const Util = require("../utils/util.js");

/**
 * ShareData对象 构造方法
 * @param title 标题
 * @param path 页面路径
 * @param pathData 带参
 * @param imageUrl 图片路径
 */
function ShareData(title, path, pathData, imageUrl) {
  this.title = ""; // 分享标题 默认小程序名称
  this.path = ""; // 分享路径 默认 当前路径 需要 / 开头完整路径
  this.pathData = {}; // 分享参数对象
  this.imageUrl = ""; // 分享图片地址 本地 网络 都可以 默认当前页面截图
  if (title != null && typeof title == "string") {
    this.title = title;
  }
  if (path != null && typeof path == "string") {
    this.path = path;
  }
  if (pathData != null && typeof pathData == "object") {
    this.pathData = pathData;
  }
  if (imageUrl != null && typeof imageUrl == "string") {
    this.imageUrl = imageUrl;
  }
}


/**
 * 获取分享卡片内容
 * @param shareData 分享卡片内容 ShareDate 对象
 */
function getOnShareMessage(shareData) {
  let tempShareData = {};
  console.log(JSON.stringify(shareData));
  console.log(typeof shareData.title);
  console.log(typeof shareData.path);
  console.log(typeof shareData.pathData);
  console.log(typeof shareData.imageUrl);
  if (typeof shareData.title == "string" && !Util.checkEmpty(shareData.title)) {
    tempShareData.title = shareData.title;
  }
  if (typeof shareData.path == "string" && !Util.checkEmpty(shareData.path)) {
    tempShareData.path = shareData.path;
  }
  if (typeof shareData.pathData == "object" && !Util.checkEmpty(shareData.pathData)) {
    let index = 0;
    for (var key in shareData.pathData) {
      let lowerKey = key.toLowerCase();
      if (index == 0) {
        tempShareData.path = tempShareData.path + "?" + lowerKey + "=" + shareData.pathData[key];
      } else {
        tempShareData.path = tempShareData.path + "&" + lowerKey + "=" + shareData.pathData[key];
      }
    }
  }
  if (typeof shareData.imageUrl == "string" && !Util.checkEmpty(shareData.imageUrl)) {
    tempShareData.imageUrl = shareData.imageUrl;
  }
  return {
    title: tempShareData.title,
    path: tempShareData.path,
    imageUrl: tempShareData.imageUrl,
    success: function (res) {
      // 转发成功
      // 2018.10.10号之后不允许获知用户分享状态，所以，这个回调没用了
    },
    fail: function (res) {
      // 转发失败
      // 2018.10.10号之后不允许获知用户分享状态，所以，这个回调没用了
    }
  }
}

module.exports = {
  ShareData: ShareData,
  getOnShareMessage: getOnShareMessage,
}