/**
 * 
 * 定位 服务
 * 
 */

const Config = require("../macros/config.js");
var QQMapWX = require('../libs/qqmap-wx-jssdk.min.js');
var QQMapSDK = new QQMapWX({
  key: Config.Key_QQ_Map
});
const app = getApp();

/**
 * 获取当前地址信息
 * @param getLocationInfoCallback 获取当前地址信息回调
 */
function getCurrentLocationInfo(getLocationInfoCallback) {
  if (app.globalData.currentLocationInfo == null) {
    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        console.log("------------ 定位成功 ------------");
        console.log(res);
        const latitude = res.latitude;
        const longitude = res.longitude;
        reverseGeocoder(latitude, longitude,
          function rgeoCallback(res) {
            if (getLocationInfoCallback != null && typeof getLocationInfoCallback == 'function') {
              app.globalData.currentLocationInfo = res.result;
              getLocationInfoCallback(res.result);
            }
          }
        )
      },
      fail: function (res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        wx.showToast({
          title: '定位失败,请重新再试',
          icon: 'none'
        })
      },
    })
  } else {
    if (getLocationInfoCallback != null && typeof getLocationInfoCallback == 'function') {
      getLocationInfoCallback(app.globalData.currentLocationInfo);
    }
  }
  
}

/**
 * 逆地址解析
 * @param lat 纬度
 * @param lgn 经度
 * @param rgeoCallback 解析结果回调
 */
function reverseGeocoder(lat, lgn, rgeoCallback) {
  QQMapSDK.reverseGeocoder({
    location: {
      latitude: lat,
      longitude: lgn,
    },
    success(res) {
      console.log(res);
      if (rgeoCallback != null && typeof rgeoCallback == "function") {
        rgeoCallback(res);
      }
    },
    fail(res) {
      console.error(res);
      wx.hideLoading();
      wx.stopPullDownRefresh();
    },
    complete(res) {
      console.log(res);
    }
  })
}

/**
 * 地址解析
 * @param address 地址
 * @param geoCallback 解析结果回调
 */
function geocoder(address, geoCallback) {
  QQMapSDK.geocoder({
    //获取表单传入地址
    address: address, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
    success: function (res) {//成功后的回调
      console.log(res);
      if (geoCallback != null && typeof geoCallback == "function") {
        geoCallback(res.result);
      }
    },
    fail: function (error) {
      console.error(error);
      wx.hideLoading();
      wx.stopPullDownRefresh();
    },
    complete: function (res) {
      console.log(res);
    }
  })
}

module.exports={
  getCurrentLocationInfo: getCurrentLocationInfo, // 获取当前位置信息
  reverseGeocoder: reverseGeocoder, // 逆地址解析
  geocoder: geocoder, // 地址解析
}