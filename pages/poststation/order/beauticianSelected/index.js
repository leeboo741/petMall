// pages/poststation/order/beauticianSelected/index.js
const app = getApp();
const ShareManager = require("../../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessObj: null,
    beauticianList: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.serviceSelectBusiness) {
      this.setData({
        businessObj: app.globalData.serviceSelectBusiness,
        beauticianList: app.globalData.serviceSelectBusiness.business.beauticians
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

  tapItem: function(res){
    let index = res.currentTarget.dataset.index;
    if (index == -1) {
      app.globalData.serviceSelectBeautician = null;
    } else {
      app.globalData.serviceSelectBeautician = this.data.beauticianList[index];
    }
    wx.navigateBack({
      
    })
  }
})