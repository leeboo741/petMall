const orderService = require("../../../../services/orderService");
const shareService = require("../../../../services/shareService");
const app = getApp();
// pages/order/unpayOrderList/changePrice/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: null,
    newPrice: null,
  },

  inputNewPrice: function(e) {
    this.data.newPrice = e.detail.value;
  },

  changePrice: function(e) {
    let that = this;
    wx.showLoading({
      title: '请稍等...',
    })
    if (this.data.order.petNo == null) {
      orderService.changeItemOrderPrice(this.data.order.orderNo, this.data.newPrice, function(success, data){
        wx.hideLoading({
          success: (res) => {},
        })
        if (success) {
          wx.navigateBack()
        } else {
          wx.showToast({
            title: '修改失败',
            icon: 'none'
          })
        }
      })
    } else {
      orderService.changePetOrderPrice(this.data.order.orderNo, this.data.newPrice, function(success, data) {
        wx.hideLoading({
          success: (res) => {},
        })
        if (success) {
          wx.navigateBack()
        } else {
          wx.showToast({
            title: '修改失败',
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
      order: app.globalData.changePriceOrder
    })
    app.globalData.changePriceOrder = null;
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