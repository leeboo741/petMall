// pages/order/refundOrderList/refund/index.js

const app = getApp();
const UrlPath = require("../../../../macros/urlPath.js");
const Util = require("../../../../utils/util.js");
const OrderService = require("../../../../services/orderService.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:null,

    refundReason: null, // 退款原因
    refundEvidence: [], // 退款凭证
    refundAmount: null, // 退款金额

    uploadUrl: null, // 上传文件地址

    backTimeOut: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order: app.globalData.refundOrder,
      uploadUrl: UrlPath.Url_Base + UrlPath.Url_UploadFile,
      refundAmount: app.globalData.refundOrder.paymentAmount
    })
    app.globalData.refundOrder = null;
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
   * 输入金额
   */
  inputAmount: function (e) {
    let inputAmount = 0;
    if (!Util.checkEmpty(e.detail.value)) {
      inputAmount = parseFloat(e.detail.value);
    }
    if (inputAmount > this.data.order.paymentAmount || inputAmount < 0) {
      wx.showToast({
        title: '金额应在0~'+this.data.order.paymentAmount+"之间",
        icon:'none'
      })
      inputAmount = this.data.order.paymentAmount;
    }

    this.setData({
      refundAmount: inputAmount
    })
  },

  /**
   * 输入原因
   */
  inputReason: function(e) {
    this.setData({
      refundReason: e.detail.value
    })
  },

  /**
   * 图片上传完成
   */
  uploadComplete: function(e) {
    let uploadImagePathList = e.detail.uploadReturnDataList;
    this.setData({
      refundEvidence: this.packageRefundImages(uploadImagePathList)
    })
  },

  /**
   * 删除图片
   */
  deleteImage: function (e) {
    let uploadImagePathList = e.detail.uploadReturnDataList;
    let imagePathList = e.detail.imagePathList;
    let deleteIndex = e.detail.deleteIndex;
    this.setData({
      refundEvidence: this.packageRefundImages(uploadImagePathList)
    })
  },

  /**
   * 组装退款凭证
   */
  packageRefundImages: function(imageList) {
    let refundImages = [];
    for (let index = 0; index < imageList.length; index++) {
      let imagePath = imageList[index];
      let refundImageObj = {
        initiateRefundImg: imagePath
      }
      refundImages.push(refundImageObj);
    }
    return refundImages;
  },

  /**
   * 点击提交
   */
  tapSubmit: function (e) {
    if (Util.checkEmpty(this.data.refundReason)) {
      this.data.refundReason = "无理由";
    }
    let that = this;
    this.requestRefund(
      function refundCallback(result) {
        if (result > 0) {
          wx.showToast({
            title: '提交成功',
            duration: 1500
          })
          that.data.backTimeOut = setTimeout(
            function timeOut(){
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
   * 发起退款申请请求
   * @param refundCallback
   */
  requestRefund: function(refundCallback) {
    if (this.data.order.pet != null) {
      OrderService.petRefundOrder(
        {
          refundImages: this.data.refundEvidence,
          orderNo: this.data.order.orderNo,
          reason: this.data.refundReason,
          refundAmount: this.data.refundAmount,
          orderAmount: this.data.order.paymentAmount
        },
        function refundResultCallback(result) {
          console.log("发起退款 宠物：\n" + JSON.stringify(result));
          if (Util.checkIsFunction(refundCallback)) {
            refundCallback(result.root);
          }
        }
      )
    } else if (this.data.order.item != null) {
      OrderService.itemRefundOrder(
        {
          refundImages: this.data.refundEvidence,
          orderNo: this.data.order.orderNo,
          reason: this.data.refundReason,
          refundAmount: this.data.refundAmount,
          orderAmount: this.data.order.paymentAmount
        },
        function refundResultCallback(result) {
          console.log("发起退款 商品：\n" + JSON.stringify(result));
          if (Util.checkIsFunction(refundCallback)) {
            refundCallback(result.root);
          }
        }
      )
    }
  }
})