// pages/index/businessList/index.js
const Limit = 20;
const app = getApp();
const ServerManager = require("../../../services/serverManager");
const LocationManager = require("../../../services/locationService");
const ShareManager = require('../../../services/shareService');
const StoreManager = require('../../../services/storeService');
const Utils = require("../../../utils/util");
const PagePath = require("../../../macros/pagePath");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessList: [],
    offset: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.startPullDownRefresh({
      success: (res) => {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this;
    that.data.offset = 0;
    that.requestDataSource(that.data.offset, function(success, result){
      Utils.logInfo(result);
      wx.stopPullDownRefresh({
        success: (res) => {},
      })
      if (success) {
        that.setData({
          businessList: result
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    that.requestDataSource(that.data.offset, function(success, result){
      Utils.logInfo(result);
      if (success) {
        if (result.length < Limit) {
          wx.showToast({
            title: '已经到底了',
            icon: 'none'
          })
        }
        that.data.businessList = that.data.businessList.concat(result);
        that.setData({
          businessList: that.data.businessList
        })
      }
    })
  },

  requestDataSource: function (offset,requestCallback) {
    let that = this;
    StoreManager.getAllBusinessList(offset, Limit, function(success, data){
      if (success) {
        that.data.offset = that.data.offset + Limit;
      }
      if (Utils.checkIsFunction(requestCallback)) {
        requestCallback(success, data);
      }
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },

  tapToBusiness: function(e) {
    wx.navigateTo({
      url: PagePath.Page_Store_StoreInforMation + '?storeno=' + e.currentTarget.dataset.businessno,
    })
  },

  tapCall: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  }
})