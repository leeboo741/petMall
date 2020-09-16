// pages/me/messageList/index.js

const MessageManager = require("../../../services/messageManager");
const Limit = 20;
const ShareManager = require('../../../services/shareService');
const Utils = require("../../../utils/util");
const PagePath = require("../../../macros/pagePath");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    offset: 0,
    messageList: [],
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
          messageList: result
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
        that.data.messageList = that.data.messageList.concat(result);
        that.setData({
          messageList: that.data.messageList
        })
      }
    })
  },

  requestDataSource: function (offset,requestCallback) {
    let that = this;
    MessageManager.getAllMessageList(offset, Limit, function(success, data){
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
})