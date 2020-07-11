// pages/assess/assessDetail/index.js
const PagePath = require("../../../macros/pagePath.js");
const AssessManager = require("../../../services/assessManager.js")
const MallManager = require("../../../services/mallService.js");
const Utils = require("../../../utils/util.js")
const Limit = 20;
const LoadMoreState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const app = getApp();
const ShareManager = require("../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadState: LoadMoreState.Loading_State_Normal,
    pageTitle: "测评详情",
    assessObj: null,
    itemObj: null,
    assessFeedbackList:[],

    offset: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      assessObj: app.globalData.assessObj
    })
    let that = this;
    that.requestItemDetail(this.data.assessObj.item.itemNo, function getResultCallback(result) {
      Utils.logInfo("评测商品: "+ JSON.stringify(result));
      that.setData({
        itemObj: result.root
      })
    })
    wx.startPullDownRefresh();
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
    this.data.offset = 0;
    let that = this;
    that.requestFeedback(this.data.assessObj.assessNo, this.data.offset, function getListCallback(result) {
      Utils.logInfo("评测反馈列表 : " + JSON.stringify(result));
      that.setData({
        assessFeedbackList: result
      })
      if (result.length >= Limit) {
        that.setData({
          loadState: LoadMoreState.Loading_State_Normal
        })
      } else if (result.length < Limit && result.length > 0) {
        that.setData({
          loadState: LoadMoreState.Loading_State_End
        })
      } else {
        that.setData({
          loadState: LoadMoreState.Loading_State_Empty
        })
      }
      wx.stopPullDownRefresh();
    }, function failCallback() {
      that.setData({
        loadState: LoadMoreState.Loading_State_Normal
      })
      wx.stopPullDownRefresh();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.loadState == LoadMoreState.Loading_State_End
      || this.data.loadState == LoadMoreState.Loading_State_Loading) {
      return;
    }
    let that = this;
    Utils.logInfo("加载数据");
    that.setData({
      loadState: LoadMoreState.Loading_State_Loading
    })
    that.requestFeedback(this.data.assessObj.assessNo, this.data.offset, function getListCallback(result) {
      Utils.logInfo("评测反馈列表 : " + JSON.stringify(result));
      let assessFeedbackList = that.data.assessFeedbackList.concat(result);
      that.setData({
        assessFeedbackList: assessFeedbackList
      })
      if (result.length >= Limit) {
        that.setData({
          loadState: LoadMoreState.Loading_State_Normal
        })
      } else {
        that.setData({
          loadState: LoadMoreState.Loading_State_End
        })
      }
    }, function failCallback() {
      that.setData({
        loadState: LoadMoreState.Loading_State_Normal
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },

  /**
   * 前往购买
   */
  tapOrderButton: function(button) {
    Utils.logInfo("前往购买测评商品:" + this.data.itemNo);
  },

  /**
   * 请求测评反馈列表
   */
  requestFeedback: function(assessNo, offset, getFeedbackCallback, failCallback) {
    AssessManager.getAssessFeedback(assessNo, offset, Limit, function getResultCallback(result){
      if (Utils.checkIsFunction(getFeedbackCallback)) {
        getFeedbackCallback(result);
      }
    }, function getFailCallback(res) {
      if (Utils.checkIsFunction(failCallback)) {
        failCallback(res);
      }
    })
  },
  /**
   * 请求商品详情
   */
  requestItemDetail: function(itemNo, getItemDetailCallback) {
    MallManager.getItemDetail(itemNo, function getResultCallback(result){
      if (Utils.checkIsFunction(getItemDetailCallback)) {
        getItemDetailCallback(result)
      }
    })
  }
})