// pages/order/orderDetail/index.js

const app = getApp();
const Util = require("../../../utils/util.js");
const Config = require("../../../macros/config.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: null,
    orderNo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderNo: options.orderno
    })
    if (app.globalData.detailOrder != null) {
      this.setData({
        order: app.globalData.detailOrder
      })
      app.globalData.detailOrder = null;
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

  },

  /**
   * 联系商家
   */
  callStorePhone: function () {
    let phone = Config.Service_Phone
    if (this.data.order.pet != null) {
      phone = this.data.order.pet.business.phoneNumber
    }
    if (Util.checkEmpty(phone)) {
      wx.showToast({
        title: '商家电话不存在',
        icon: 'none'
      })
    } else {
      wx.makePhoneCall({
        phoneNumber: phone
      })
    }
  }
})