const app = getApp();
const Utils = require("../../../utils/util.js");
const ServerManager = require("../../../services/serverManager.js");
const ShareManager = require("../../../services/shareService");


Page({
  data: {
    mapConfig: {
      windowHeight: 0,
      mapScale: 14, // 3-20
      centerLocation: {
        latitude: 0,
        longitude: 0,
      },
      currentLocationName: "",
      currentCity: "",
      markers: [], // [marker]
    },

    showCitySelected: false, // 是否显示城市选择列表

    cityList: [], // 城市列表

    currentCity: null, // 当前城市

    currentCityData: null, // 当前城市数据 区域列表
    currentAreaData: null, // 当前区域数据 商家列表

    currentAreaIndex: 0, // 当前选中城市区域index
    currentBusinessIndex: 0, // 当前选中的商店Index
  },
  onShow: function () {

  },
  onReady: function () {

  },
  onLoad: function (a) {
    this.data.mapConfig.windowHeight = app.globalData.pageHeight;
    this.data.mapConfig.centerLocation.latitude = getApp().globalData.currentLocationInfo.location.lat;
    this.data.mapConfig.centerLocation.longitude = getApp().globalData.currentLocationInfo.location.lng;
    this.data.mapConfig.currentLocationName = getApp().globalData.currentLocationInfo.address;
    this.data.mapConfig.currentCity = getApp().globalData.currentLocationInfo.address_component.city;
    this.setData({
      mapConfig: this.data.mapConfig
    })
    let that = this;
    this.requestCityList(function(res){
      that.setData({
        cityList: res
      })
    })
    this.resetCity(this.data.mapConfig.currentCity);
  },

  requestCityList: function(getAllCityCallback) {
    let that = this;
    ServerManager.getAllBusinessCityList(function(res){
      if (Utils.checkIsFunction(getAllCityCallback)) {
        getAllCityCallback(res);
      }
    })
  },

  resetCity: function(cityName) {
    let that = this;
    this.setData({
      currentCity: cityName
    })
    this.getCityDataByCityName(cityName, function getCityDataCallback(cityData) {
      that.getAreaDataByAreaIndex(that.data.currentAreaIndex, function getAreaDataCallback(areaData) {
        that.refreshMapMarker(areaData.businesses);
      })
    });
  },

  requestDataSource: function (cityName, areaName, requestCallback) {
    let that = this;
    ServerManager.getBusinessList(cityName,
      areaName,
      app.globalData.currentLocationInfo.location.lat,
      app.globalData.currentLocationInfo.location.lng,
      null,
      null,
      function callback(result) {
        that.setData({
          currentCityData: result,
          currentAreaData: null,
          currentAreaIndex: 0,
          currentBusinessIndex: 0,
        })
        if (requestCallback && Utils.checkIsFunction(requestCallback)) {
          requestCallback(result);
        }
      }
    )
  },

  getCityDataByCityName: function(cityName, getCityDataCallback) {
    let that = this;
    this.requestDataSource(cityName,
      null,
      function requestCallback(result) {
        if (getCityDataCallback && Utils.checkIsFunction(getCityDataCallback)) {
          getCityDataCallback(result);
        }
      }
    )
  },

  getAreaDataByAreaIndex: function(areaIndex, getAreaCallback) {
    let tempArea = this.data.currentCityData[areaIndex];
    this.setData({
      currentAreaData: tempArea
    })
    if (getAreaCallback && Utils.checkIsFunction(getAreaCallback)) {
      getAreaCallback(tempArea);
    }
  },

  /**
   * 刷新地图标注
   */
  refreshMapMarker: function (businessList) {
    let markers = [];
    for (let index = 0; index < businessList.length; index++) {
      let businessObj = businessList[index];
      let marker = {};
      marker.id = index;
      marker.title = businessObj.business.businessName;
      marker.latitude = businessObj.business.latitude;
      marker.longitude = businessObj.business.longitude;
      marker.iconPath = "/resource/mapMarker.png";
      marker.businessObj = businessObj;
      markers.push(marker);
    }
    if (!Utils.checkEmpty(markers)) {
      let currentMarker = markers[this.data.currentBusinessIndex];
      let currentBusiness = currentMarker.businessObj.business;
      this.data.mapConfig.currentLocationName = currentBusiness.province + currentBusiness.city + currentBusiness.area + currentBusiness.detailAddress;
      this.data.mapConfig.markers = markers;
      this.data.mapConfig.centerLocation = {
        latitude: currentMarker.latitude,
        longitude: currentMarker.longitude
      }
      this.setData({
        mapConfig: this.data.mapConfig
      })
    } else {
      this.data.mapConfig.markers = [];
      this.setData({
        mapConfig: this.data.mapConfig
      })
    }
  },

  //////////////////////// map //////////////////////
  /**
   * marker 点击
   */
  markertap: function (res) {
    Utils.logInfo("markertap:", res);
    let index = res.markerId;
    let businessObj = this.data.mapConfig.markers[index].businessObj;
    this.data.mapConfig.currentLocationName = businessObj.business.province + businessObj.business.city + businessObj.business.area + businessObj.business.detailAddress;
    this.setData({
      currentBusinessIndex: index,
      mapConfig: this.data.mapConfig
    })
  },
  /**
   * 选择区域
   */
  changeArea: function (res) {
    Utils.logInfo("changeArea:", res);
    let index = res.currentTarget.dataset.index;
    this.setData({
      currentAreaIndex: index
    })
    let that = this;
    this.getAreaDataByAreaIndex(this.data.currentAreaIndex, function getAreaDataCallback(areaData){
      that.refreshMapMarker(areaData.businesses);
    });
  },
  /**
   * 选中商店
   */
  tapShop: function (res) {
    Utils.logInfo("tapShop:", res);
    let index = res.currentTarget.dataset.index;
    this.setData({
      currentBusinessIndex: index
    })
    let areaObj = this.data.currentAreaData;
    let businessObj = areaObj.businesses[this.data.currentBusinessIndex];
    Utils.logInfo("选中商店", businessObj);
    app.globalData.serviceSelectBusiness = businessObj;
    wx.navigateBack({

    })
  },
  /**
   * 打开城市选择器页面
   */
  changeCity: function (res) {
    Utils.logInfo("changeCity:", res);
    this.setData({
      showCitySelected: true
    });
  },
  /**
   * 关闭城市选择器页面
   */
  backcity: function (res) {
    Utils.logInfo("backcity:", res);
    this.setData({
      showCitySelected: false
    });
  },
  /**
   * 选择城市
   */
  switchcity: function (res) {
    Utils.logInfo("switchcity:", res);
    let city = this.data.cityList[res.currentTarget.dataset.index];
    // 通过cityName 去请求商家数据 然后更新 this.data.dataSource
    // 同时要关闭城市选择器页面
    this.setData({
      showCitySelected: false
    })
    this.resetCity(city);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },
});