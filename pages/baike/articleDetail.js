// pages/baike/articleDetail.js
const ShareManager = require("../../services/shareService");
const Utils = require("../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    webUrl: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let webUrl = options.url;
    Utils.logInfo("文章地址:" + webUrl);
    if (webUrl != null) {
      this.setData({
        webUrl: webUrl
      })
    }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },

  /**
   * 网页加载成功
   * e.detail = { src }
   */
  loadWebSuccess: function (e) {
    Utils.logInfo("网页加载成功:" + e.detail);
  },

  /**
   * 网页加载失败
   * e.detail = { src }
   */
  loadWebError: function (e) {
    Utils.logInfo("网页加载失败:" + e.detail);
    wx.showToast({
      title: '加载失败',
      icon:'none'
    })
  },

  /**
   * 网页向小程序 postMessage 时，会在特定时机（小程序后退、组件销毁、分享）触发并收到消息。
   * e.detail = { data }，data是多次 postMessage 的参数组成的数组
   */
  getWebMessage: function(e) {

  }
})