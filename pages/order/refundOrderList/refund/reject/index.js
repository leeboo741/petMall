// pages/order/refundOrderList/refund/reject/index.js\

const OrderService = require("../../../../../services/orderService.js");
const Util = require("../../../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rejectReason: null, // 驳回原因
    rejectEvidence: [], // 驳回证明

    orderNo: null,
    type: null,

    backTimeOut: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderNo: options.orderno,
      type: options.type
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
    clearTimeout(this.data.backTimeOut);
    this.data.backTimeOut = null;
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
   * 输入原因
   */
  inputReason: function(e) {
    this.setData({
      rejectReason: e.detail.value
    })
  },

  /**
   * 点击提交
   */
  tapSubmit: function() {
    let that = this;
    wx.showModal({
      title: '确认驳回',
      content: '点击确定驳回退款申请',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '请稍等...',
          })
          that.requestConfirmRefund(
            function resultCallback(result) {
              wx.hideLoading();
              console.log("驳回请求：\n" + JSON.stringify(result));
              if (result > 0) {
                wx.showToast({
                  title: '驳回退款成功',
                  duration: 1500
                })
                that.data.backTimeOut = setTimeout(
                  function tofuc() {
                    wx.navigateBack({
                      delta: 2
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
        }
      }
    })
  },

  /**
   * 请求驳回
   * @param resultCallback
   */
  requestConfirmRefund: function(resultCallback) {
    if (this.data.type == "pet") {
      OrderService.confirmRefundPet(
        {
          orderNo: this.data.orderNo,
          refundState: -1,
          rejectReason: this.data.rejectReason
        },
        function callback(res) {
          if (Util.checkIsFunction(resultCallback)) {
            resultCallback(res.root)
          }
        }
      )
    } else {
      OrderService.confirmRefundItem(
        {
          orderNo: this.data.orderNo,
          refundState: -1,
          rejectReason: this.data.rejectReason
        },
        function callback(res) {
          if (Util.checkIsFunction(resultCallback)) {
            resultCallback(res.root)
          }
        }
      )
    }
  }
})