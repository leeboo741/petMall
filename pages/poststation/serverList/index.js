// pages/poststation/serverList/index.js

const ServerManager = require('../../../services/serverManager');
const Util = require('../../../utils/util');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    naviTitle: null, // navi 标题
    serverTypeNo: null, // 服务类型编号
    serverList: [], // 服务列表
    businessObj: null, // 选中服务商
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      naviTitle: options.servertypename,
      serverTypeNo: options.servertypeno,
      businessObj: app.globalData.serviceSelectBusiness
    })
    let that = this;
    this.requestServerList(function(res){
      that.setData({
        serverList: res
      })
    })
  },

  /**
   * 请求服务列表
   * @param {*} res 
   */
  requestServerList: function(getServerListCallback){
    ServerManager.getBusinessServerListByServerNo(this.data.businessObj.business.businessNo, this.data.serverTypeNo, function(res){
      if (Util.checkIsFunction(getServerListCallback)) {
        getServerListCallback(res);
      }
    })
  },

  /**
   * 点击 服务
   */
  tapServerItem: function (res) {
    app.globalData.serviceSelectServer = this.data.serverList[res.currentTarget.dataset.index];
    wx.navigateTo({
      url: '/stationsubcontract/pages/appointment/index'
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

  }
})