// pages/order/refundOrderList/refund/review.js

const PagePath = require("../../../../macros/pagePath.js");
const app = getApp();
const OrderService = require("../../../../services/orderService.js");
const Util = require("../../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: null,

    refundDetail: null,

    refundReason: null, // 退款原因
    refundEvidence: [], // 退款凭证

    backTimeOut: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order: app.globalData.refundReviewOrder
    })
    app.globalData.refundReviewOrder = null;
    let that = this;
    this.requestRefundDetail(
      function getDetailCallback(result) {
        that.setData({
          refundDetail: result
        })
      }
    )
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
   * 点击驳回
   */
  tapReject: function () {
    let type = "";
    if (this.data.order.pet != null) {
      type = "pet";
    } else if (this.data.order.item != null) {
      type = "item";
    }
    wx.navigateTo({
      url: PagePath.Page_Order_Refund_Review_Reject + "?orderno=" + this.data.order.orderNo + "&type=" + type,
    })
  },

  /**
   * 点击批准
   */
  tapApprove: function () {
    let that = this;
    wx.showModal({
      title: '确认同意退款',
      content: '点击确定确定退款',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '请稍等...',
          })
          that.requestConfirmRefund(
            function resultCallback(result) {
              wx.hideLoading();
              console.log("批准退款：\n" + JSON.stringify(result));
              if (result > 0) {
                wx.showToast({
                  title: '退款成功',
                  duration:1500
                })
                that.data.backTimeOut = setTimeout(
                  function tofuc() {
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
        }
      }
    })
  },

  /**
   * 请求通过申请
   * @param resultCallback
   */
  requestConfirmRefund: function (resultCallback) {
    if (this.data.order.pet != null) {
      OrderService.confirmRefundPet(
        {
          orderNo: this.data.refundDetail.petOrderNo,
          refundState: 1,
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
          orderNo: this.data.refundDetail.itemOrderNo,
          refundState: 1,
        },
        function callback(res) {
          if (Util.checkIsFunction(resultCallback)) {
            resultCallback(res.root)
          }
        }
      )
    }
  },

  /**
   * 请求详情
   * @param getRefundDetailCallback
   */
  requestRefundDetail: function(getRefundDetailCallback) {
    let tempParam = {};
    if (this.data.order.pet != null) {
      tempParam.petOrderNo = this.data.order.orderNo;
    } 
    if (this.data.order.item != null) {
      tempParam.itemOrderNo = this.data.order.orderNo;
    }
    OrderService.refundDetail(tempParam,
      function getDetailCallback(res) {
        console.log("获取退款单详情：\n" + JSON.stringify(res));
        if (Util.checkIsFunction(getRefundDetailCallback)) {
          getRefundDetailCallback(res.root);
        }
      }
    )
  }
})