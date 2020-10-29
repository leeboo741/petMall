const orderService = require("../../../../services/orderService");
const util = require("../../../../utils/util");
const shareService = require("../../../../services/shareService");

// mallsubcontracting/pages/shoppingcart/payment/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: null,
    order: null,
    payType: [
      {
        name: "支付至平台",
        value: 0,
        checked: true,
      },
      {
        name: "支付至商户",
        value: 1,
        checked: false
      }
    ],
    changeDisable: true,
    changeing: false,

    submitDisable: true,

    newPrice: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.type = options.type;
    this.data.orderNo = options.orderno;
    this.getOrderDetail();
  },

  getOrderDetail: function(){
    let that = this;
    this.setData({
      submitDisable: true
    })
    if (this.data.type == 0) {
      orderService.getPetOrderDetail(this.data.orderNo,function(data){
        that.setData({
          order: data,
          submitDisable: false
        })
      })
    } else {
      orderService.getItemOrderDetail(this.data.orderNo, function(data){
        that.setData({
          order: data,
          submitDisable: false
        })
      })
    }
  },

  inputCustomPrice: function(e) {
    this.data.newPrice = e.detail.value;
    if (!util.checkEmpty(this.data.newPrice)) {
      this.setData({
        changeDisable: false,
        submitDisable: true
      })
    } else {
      this.setData({
        changeDisable: true,
        submitDisable: false
      })
    }
  },

  tapChange: function(){
    if (this.data.changeing) return;
    this.setData({
      changeing: true,
    })
    let that = this;
    if (this.data.type == 0) {
      orderService.changePetOrderPrice(this.data.orderNo, this.data.newPrice, function(success, data) {
        that.setData({
          changeing: false,
        })
        if (success) {
          that.setData({
            newPrice: null,
            changeDisable: true,
            submitDisable: false
          })
          that.getOrderDetail();
        } else {
          wx.showToast({
            title: '改价失败',
            icon: 'none'
          })
        }
      })
    } else {
      orderService.changeItemOrderPrice(this.data.orderNo, this.data.newPrice, function(success, data) {
        that.setData({
          changeing: false,
        })
        if (success) {
          that.setData({
            newPrice: null,
            changeDisable: true,
            submitDisable: false
          })
          that.getOrderDetail();
        } else {
          wx.showToast({
            title: '改价失败',
            icon: 'none'
          })
        }
      })
    }
  },

  changePayType: function(e) {
    const payType = this.data.payType
    for (let i = 0, len = payType.length; i < len; ++i) {
      payType[i].checked = payType[i].value == e.detail.value
    }
    this.setData({
      payType
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
    let otherPayType = null;
    this.data.payType.forEach(item => {
      if(item.checked) {
        otherPayType = item
      }
    });
    return shareService.getShareToOtherPay(this.data.order.orderNo, this.data.order.paymentAmount, otherPayType.value)
  }
})