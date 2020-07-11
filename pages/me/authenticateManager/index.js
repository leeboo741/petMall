// pages/me/authenticateManager/index.js

const PagePath = require("../../../macros/pagePath.js");

const ShareManager = require("../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authenticateList: [
      {
        name: "个人认证",
        link: PagePath.Page_Me_AuthenticateManager_Submit + '?type=0',
      },
      {
        name: "商家认证",
        link: PagePath.Page_Me_AuthenticateManager_Submit + '?type=1',
      },
      {
        name: "平台认证",
        link: PagePath.Page_Me_AuthenticateManager_Submit + '?type=2',
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 点击Item
   */
  tapItem: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.link,
    })
  }
})