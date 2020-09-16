const userService = require("../../services/userService");
const entity = require("../../services/entity/entity");

// pages/receiveCouponList/receiveCouponList.js
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
    userService.getNewGiftBagList(function(success, data) {
      wx.stopPullDownRefresh({
        success: (res) => {},
      })
      if (success) {
        that.setData({
          couponList: entity.getCouponListByObjList(data)
        })
      }
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

  },

  /**
   * 点击领取
   */
  tapReceive: function() {
    userService.receiveNewGiftBag(userService.getBusinessNo(), function(success, data) {
      if (success) {
        wx.showModal({
          title:'领取成功',
          content: '新客大礼包领取成功，可以在我的--优惠券中查看',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack()
            }
          }
        })
      }
    })
  }
})