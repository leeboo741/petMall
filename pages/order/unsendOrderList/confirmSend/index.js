// pages/order/unsendOrderList/confirmSend/index.js

const app = getApp();
const OrderService = require("../../../../services/orderService.js");
const Util = require("../../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData: null, // 发货订单
    sendBillNo: null, // 运单编号
    backTimer: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.confirmSendOrder != null) {
      this.setData({
        orderData: app.globalData.confirmSendOrder
      })
      app.globalData.confirmSendOrder = null;
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
    clearTimeout(this.data.backTimer);
    this.data.backTimer = null;
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
   * 输入运单编号
   */
  inputSendBillNo: function (e) {
    this.setData({
      sendBillNo: e.detail.value
    })
  },  

  /**
   * 确认发货
   */
  confirmSend: function() {
    if (Util.checkEmpty(this.data.sendBillNo)) {
      wx.showToast({
        title: '请输入运单编号！',
        icon: 'none'
      })
      return;
    }
    let that = this;
    this.requestConfirm(
      function requestConfirmCallback(result) {
        if (result > 0) {
          wx.showToast({
            title: '发货成功',
            duration: 1500
          })
          that.data.backTimer = setTimeout(
            function (res) {
              wx.navigateBack({
                
              })
            },
            1550
          )
        } else {
          wx.showToast({
            title: '插入失败',
            icon: 'none'
          })
        }
      }
    )
  },

  /**
   * 发起请求 
   * @param requestConfirmCallback
   */
  requestConfirm: function (requestConfirmCallback) {
    if (this.data.orderData.pet != null) {
      OrderService.confirmSendPetOrder(
        {
          sendBillNo: this.data.sendBillNo,
          orderNo: this.data.orderData.orderNo,
        },
        function confirmSendResultCallback(result) {
          if (Util.checkIsFunction(requestConfirmCallback)) {
            requestConfirmCallback(result.root)
          }
        }
      )
    } else {
      OrderService.confirmSendItemOrder(
        {
          sendBillNo: this.data.sendBillNo,
          orderNo: this.data.orderData.orderNo,
        },
        function confirmSendResultCallback(result) {
          if (Util.checkIsFunction(requestConfirmCallback)) {
            requestConfirmCallback(result.root)
          }
        }
      )
    }
  }
})