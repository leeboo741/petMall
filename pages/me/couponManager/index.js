// pages/me/couponManager/index.js
const ShareManager = require("../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [
      {
        value: 5,
        name: "新人商城5元优惠券",
        detail: "商城购物满200元减15元",
        expireDate: "2020-12-31"
      },
      {
        value: 15,
        name: "新人商城15元优惠券",
        detail: "商城购物满200元减15元",
        expireDate: "2020-12-31"
      },
      {
        value: 25,
        name: "新人商城25元优惠券",
        detail: "商城购物满200元减15元",
        expireDate: "2020-12-31"
      },
      {
        value: 35,
        name: "新人商城35元优惠券",
        detail: "商城购物满200元减15元",
        expireDate: "2020-12-31"
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
})