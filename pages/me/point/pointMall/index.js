// pages/me/point/pointMall/index.js

const CouponManager = require("../../../../services/couponManager.js");
const UserManager = require("../../../../services/userService.js");

const ShareManager = require("../../../../services/shareService");
const Utils = require("../../../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    points: null,
    couponList:[], // 可兑换优惠券列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      points: UserManager.getPoints()
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
    let that = this;
    CouponManager.getExchangeAbleCounponList(function getCouponListCallback(dataSource){
      that.setData({
        couponList: dataSource
      })
      wx.stopPullDownRefresh();
    }, function failCallback(res){
      wx.stopPullDownRefresh();
    })
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
   * 点击兑换
   */
  tapExchangeAction: function(button) {
    let that = this;
    UserManager.isLogin(function isLoginCallback(){
      let coupon = this.data.couponList[button.currentTarget.dataset.index];
      Utils.logInfo("积分兑换优惠券: " + JSON.stringify(coupon));
      wx.showLoading({
        title: '兑换中...',
      });
      CouponManager.exchangeCoupon(UserManager.getBusinessNo(), coupon.couponTypeID, function exchangeCallback(result) {
        that.setData({
          points: (that.data.points - coupon.couponCredit)
        })
        UserManager.updatePoints(that.data.points);
        wx.showToast({
          title: '兑换成功',
          icon: 'none'
        })
        Utils.logInfo(result);
      });
    })
  }
})