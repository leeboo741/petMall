const shareService = require("../../../../services/shareService");

// pages/order/unpayOrderList/behalfPayment/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: null,
    
    otherPayType: [
      {
        typeName: '付款至平台',
        typeId: 0,
        buttonName: '发送至客户支付',
      },
      {
        typeName: '线下付款',
        typeId: 1,
        buttonName: '发送至客户确认'
      }
    ], // 代支付类型列表
    currentOtherPayType: null, // 选中代支付类型
  },

  /**
   * 选择代支付类型
   * @param {*} e 
   */
  selectOtherPayType: function(e) {
    this.setData({
      currentOtherPayType: this.data.otherPayType[e.currentTarget.dataset.index]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentOtherPayType: this.data.otherPayType[0],
      order: app.globalData.behalfPayOrder
    })
    app.globalData.behalfPayOrder = null
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
    return shareService.getShareToOtherPay(this.data.order.orderNo, this.data.order.paymentAmount, this.data.currentOtherPayType.typeId)
  }
})