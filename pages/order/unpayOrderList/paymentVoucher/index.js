const urlPath = require("../../../../macros/urlPath");
const util = require("../../../../utils/util");
const orderService = require("../../../../services/orderService");
const shareService = require("../../../../services/shareService");
const app = getApp();
// pages/order/unpayOrderList/paymentVoucher/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: null,
    paymentVoucherImagePath: null,
    uploadUrl: null,
    disable: true,
    loading: false,
  },

  uploadComplete: function(e) {
    this.data.paymentVoucherImagePath = e.detail.uploadReturnDataList[0].fileAddress;
    this.setData({
      disable: util.checkEmpty(this.data.paymentVoucherImagePath)
    })
  },

  addNewImage: function(e) {
    this.setData({
      disable: true
    })
  },

  uploadPaymentVoucher: function(){
    if (this.data.loading) return;
    this.setData({
      loading: true
    })
    let that = this;
    if (this.data.order.petNo == null) {
      orderService.uploadItemOrderPaymentVoucher(this.data.order.orderNo, this.data.paymentVoucherImagePath, function(success, data){
        that.setData({
          loading: false
        })
        if (success) {
          if (data >= 1) {
            wx.navigateBack()
          } else {
            wx.showToast({
              title: '插入失败',
              icon: 'none'
            })
          }
        } else {
          wx.showToast({
            title: '上传失败',
            icon: 'none'
          })
        } 
      })
    } else {
      orderService.uploadPetOrderPaymentVoucher(this.data.order.orderNo, this.data.paymentVoucherImagePath, function(success, data){
        that.setData({
          loading: false
        })
        if (success) {
          if (data >= 1) {
            wx.navigateBack()
          } else {
            wx.showToast({
              title: '插入失败',
              icon: 'none'
            })
          }
        } else {
          wx.showToast({
            title: '上传失败',
            icon: 'none'
          })
        } 
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order: app.globalData.paymentVoucherOrder,
      uploadUrl: urlPath.Url_Base + urlPath.Url_UploadFile
    })
    app.globalData.paymentVoucherOrder = null;
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
    return shareService.getDefaultShareCard();
  }
})