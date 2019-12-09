// pages/me/bond/index.js

const app = getApp();
const UserService = require("../../../services/userService.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkContract: false, // 是否检查完合约
    height: null,
    businessInfo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      height: app.globalData.pageHeight,
      businessInfo: UserService.getLocalBusinessInfo()
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

  },

  /**
   * 点击确认合同
   */
  tapCheckContract: function() {
    this.setData({
      checkContract: !this.data.checkContract
    })
  },

  /**
   * 暂不缴纳
   */
  cancelBond: function() {

  },

  /**
   * 缴纳保证金
   */
  confirmBond: function() {
    if (!this.data.checkContract) {
      wx.showToast({
        title: '请阅读并同意条款',
        icon:'none'
      })
      return;
    }
    wx.showLoading({
      title: '请稍等...',
    })
    UserService.addBond(
      {
        billNo: this.data.businessInfo.bond.billNo,
        authNo: this.data.businessInfo.auth.billNo,
        authType: this.data.businessInfo.auth.businessAuthType,
        businessNo: this.data.businessInfo.businessNo,
        amount: 5000,
      },
      function bondResultCallback(res) {
        console.log("缴纳保证金： \n" + JSON.stringify(res));
        wx.hideLoading();
      }
    )
  },
})