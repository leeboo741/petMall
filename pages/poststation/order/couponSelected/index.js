// pages/poststation/order/couponSelected/index.js
const app = getApp();
const ServerManager = require("../../../../services/serverManager.js");
const Utils = require("../../../../utils/util.js");
const UserManager = require('../../../../services/userService.js');
const ShareManager = require("../../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let shopNo = app.globalData.serviceSelectBusiness.business.businessNo;
    let businessNo = UserManager.getBusinessNo();
    let serverTypeNo = app.globalData.serviceSelectServerType.serviceTypeNo;
    let amount = options.amount;
    let that = this;
    ServerManager.getAbleCouponList(shopNo, businessNo, serverTypeNo, amount, function getCouponListCallback(result){
      Utils.logInfo('获取优惠券:',result);
      that.setData({
        couponList: result
      })
    })
  },

  selectCoupon: function(res) {
    let index = res.currentTarget.dataset.index;
    let coupon = this.data.couponList[index];
    app.globalData.serviceSelectCoupon = coupon;
    wx.navigateBack({
      
    });
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