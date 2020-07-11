// pages/assess/assessList/index.js
const LoadMoreState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js")
const Limit = 20;
const PagePath = require("../../../macros/pagePath.js");
const AssessManager = require("../../../services/assessManager.js")
const Utils = require("../../../utils/util.js")
const app = getApp();
const ShareManager = require("../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadState: LoadMoreState.Loading_State_Normal,
    offset: 0,
    recommondAssessList:[], // 推荐测评列表
    assessList:[] // 测评列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    let that = this;
    this.requestRecommondList(function getResultCallback(result){
      Utils.logInfo("推荐测评:"+ JSON.stringify(result));
      that.setData({
        recommondAssessList: result
      })
    })
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
    Utils.logInfo("刷新数据");
    that.data.offset = 0;
    that.requestAssessList(that.data.offset, function getResultCallback(result) {
      Utils.logInfo("测评列表:" + JSON.stringify(result));
      wx.stopPullDownRefresh();
      that.setData({
        assessList: result
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
    }, function failCallback(res) {
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

    that.requestAssessList(that.data.offset, function getResultCallback(result) {
      Utils.logInfo("测评列表:" + JSON.stringify(result));
      let assessList = that.data.assessList.concat(result);
      that.setData({
        assessList: assessList
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
    }, function failCallback(res) {
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
   * 点击推荐测评
   */
  tapRecommondAssessItem: function(item) {
    let index = item.currentTarget.dataset.index
    let recommondAssessItem = this.data.recommondAssessList[index];
    let assessId = item.currentTarget.dataset.assessid;
    let itemNo = item.currentTarget.dataset.itemno;
    Utils.logInfo("点击推荐测评:" + index);
    this.jumpToDetailPage(recommondAssessItem);
  },
  /**
   * 点击申请推荐测评
   */
  tapRecommondAssessOrder: function (button) {
    let index = button.currentTarget.dataset.index
    let recommondAssessItem = this.data.recommondAssessList[index];
    let assessId = button.currentTarget.dataset.assessid;
    Utils.logInfo("点击参加推荐测评:" + index);
    this.orderAssess(assessId)
  },
  /**
   * 点击测评
   */
  tapAssessItem: function (item) {
    let index = item.currentTarget.dataset.index
    let assessItem = this.data.assessList[index];
    let assessId = item.currentTarget.dataset.assessid;
    let itemNo = item.currentTarget.dataset.itemno;
    Utils.logInfo("点击测评:" + item.currentTarget.dataset.index);
    this.jumpToDetailPage(assessItem);
  },
  /**
   * 点击申请测评
   */
  tapAssessOrder: function (button) {
    let index = button.currentTarget.dataset.index
    let assessItem = this.data.assessList[index];
    let assessId = button.currentTarget.dataset.assessid;
    Utils.logInfo("点击参加测评:" + button.currentTarget.dataset.index);
    this.orderAssess(assessId)
  },
  /**
   * 跳转测评详情
   */
  jumpToDetailPage: function(assessObj) {
    app.globalData.assessObj = assessObj
    wx.navigateTo({
      url: PagePath.Page_Assess_Detail,
    })
  },

  /**
   * 申请测评
   */
  orderAssess: function(assessNo) {
    Utils.logInfo("申请测评:" + assessNo);
  },

  /**
   * 请求推荐列表
   */
  requestRecommondList: function(getRecommondListCallback) {
    let that = this;
    AssessManager.getRecommondAssessList(function getResultCallback(result){
      if (Utils.checkIsFunction(getRecommondListCallback)) {
        getRecommondListCallback(result)
      }
    })
  },

  /**
   * 请求列表
   */
  requestAssessList: function(offset,getListCallback, failCallback){
    let that = this;
    AssessManager.getAssessList(offset, Limit, function getResultCallback(result) {
      that.setData({
        offset: that.data.offset + Limit
      })
      if (Utils.checkIsFunction(getListCallback)) {
        getListCallback(result)
      }
    }, function getFailCallback(res) {
      if (Utils.checkIsFunction(failCallback)) {
        failCallback(res)
      }
    })
  }
})