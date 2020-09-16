// pages/order/unsendOrderList/confirmSend/index.js

const app = getApp();
const OrderService = require("../../../../services/orderService.js");
const Util = require("../../../../utils/util.js");
const Utils = require("../../../../utils/util.js");

const ShareManager = require("../../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData: null, // 发货订单
    sendBillNo: null, // 运单编号
    showInputBillNo: true, // 是否允许输入运单号
    backTimer: null,
    typeList: [
      {
        name: '自取',
        value: 0,
      },
      {
        name: '快递',
        value: 1,
      },
    ], // 取货方式列表
    selectType: {}, // 选中类型
    expressName: null, // 快递公司
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (app.globalData.confirmSendOrder != null) {
      Utils.logInfo("获得数据" + JSON.stringify(app.globalData.confirmSendOrder));
      this.setData({
        orderData: app.globalData.confirmSendOrder
      })
      
      this.changeSelectType(this.data.typeList[this.data.orderData.shippingMethods]);
      if (!Util.checkEmpty(this.data.orderData.wayBill)) {
        this.setData({
          showInputBillNo: false,
          sendBillNo: this.data.orderData.wayBill,
        })
      }
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
    if (app.globalData.selectedExpress) {
      this.setData({
        expressName: app.globalData.selectedExpress
      })
      app.globalData.selectedExpress = null;
    }
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
    return ShareManager.getDefaultShareCard();
  },


  /**
   * 更改选中类型
   */
  changeSelectType: function(type) {
    if (type.value == this.data.selectType.value) return;
    this.setData({
      selectType: type
    })
    if (this.data.selectType.value == 1) {
      this.setData({
        sendBillNo: null,
        expressName: null
      })
    }
  },

  /**
   * 选择送货方式
   */
  tapTypeItem: function(e) {
    this.changeSelectType(this.data.typeList[e.currentTarget.dataset.index])
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
    if (this.data.orderData.petNo != null) {
      if (Util.checkEmpty(this.data.sendBillNo)) {
        wx.showToast({
          title: '请输入运单编号！',
          icon: 'none'
        })
        return;
      }
    } else {
      if (this.data.selectType.value == 1) {
        if (Util.checkEmpty(this.data.expressName)) {
          wx.showToast({
            title: '请选择快递公司',
            icon: 'none'
          })
          return;
        }
        if (Util.checkEmpty(this.data.sendBillNo)) {
          wx.showToast({
            title: '请输入运单编号！',
            icon: 'none'
          })
          return;
        }
      }
    }
    
    let that = this;
    this.requestConfirm(
      function requestConfirmCallback(result) {
        wx.showToast({
          title: '发货成功',
          duration: 1000
        })
        that.data.backTimer = setTimeout(
          function (res) {
            wx.navigateBack({

            })
          },
          1000
        )
      }
    )
  },

  /**
   * 发起请求 
   * @param requestConfirmCallback
   */
  requestConfirm: function (requestConfirmCallback) {
    if (this.data.orderData.petNo != null) {
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
          expressCompany: this.data.expressName,
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