// pages/mall/shoppingpayment/index.js
const OrderService = require("../../../services/orderService.js");
const UserService = require("../../../services/userService.js");
const PayService = require("../../../services/payService.js");
const Page_path = require("../../../macros/pagePath.js");
const Util = require("../../../utils/util.js");
const app = getApp();
const Shop_Type_Item = "item";
const Shop_Type_Pet = "pet";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: null, // 类型

    shopDataSource: null, //商品信息
    num: 1, //商品数量
    integral: 0, // 可兑换积分
    showIntegral: 0, // 积分可兑换金额
    numPrice: 0, //总金额
    couponList: [], //优惠券列表
    selectCoupon: null, // 选中的优惠券
    receiveAddress: null, // 收货地址
    selectTransport: null, // 选中的运输方式
    selectTransportPrice: 0, // 选中的运输价格

    minusStatus: 'disable', //是否禁用减号
    switch1: false, //是否用积分
    showMask: true, //是否隐藏蒙版
    showCouponList: true, //是否隐藏优惠券列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    this.setData({
      type: options.type
    })
    if (this.data.type == Shop_Type_Item) {
      console.log("app.globalData.shopItem: \n" + JSON.stringify(app.globalData.shopItem));
      this.setData({
        shopDataSource: app.globalData.shopItem
      })
    } else {
      console.log("app.globalData.shopPet: \n" + JSON.stringify(app.globalData.shopPet));
      this.setData({
        shopDataSource: app.globalData.shopPet
      })
    }
    this.countPrice();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (app.globalData.selectReceiveAddress != null) {
      this.setData({
        receiveAddress: app.globalData.selectReceiveAddress
      })
      app.globalData.selectReceiveAddress = null;
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 选择运输方式
   */
  tapTransport: function (e) {
    let selectTransport = e.currentTarget.dataset.name;
    let selectTransportPrice = 0;
    if (selectTransport == "航空") {
      selectTransportPrice = this.data.shopDataSource.petTransport.airport;
    } else if (selectTransport == "铁路") {
      selectTransportPrice = this.data.shopDataSource.petTransport.railway;
    } else if (selectTransport == "大巴") {
      selectTransportPrice = this.data.shopDataSource.petTransport.coach;
    } else if (selectTransport == "专车") {
      selectTransportPrice = this.data.shopDataSource.petTransport.shuttleBus;
    } else if (selectTransport == "自提") {
      selectTransportPrice = this.data.shopDataSource.petTransport.takeTheir;
    }
    this.setData({
      selectTransport: selectTransport,
      selectTransportPrice: selectTransportPrice
    })
    this.countPrice();
  },
  

  /**
   * 点击减号
   */
  bindMinus: function() {
    let that = this;
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus,
    })

    this.countPrice();
  },
  /** 
   * 点击加号
   */
  bindPlus: function() {
    let that = this;
    var num = this.data.num;
    num++;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus,
    })

    this.countPrice();
  },
  /** 
   * 输入框事件
   */
  bindManual: function(e) {
    let that = this;
    var num = e.detail.value;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus,
    })

    this.countPrice();
  },

  /**
   * 是否使用积分
   */
  onChange(event) {
    let that = this;
    //是否使用积分兑换开关
    const detail = event.detail;
    this.setData({
      'switch1': detail.value,
      // numPrice: that.data.num * that.data.shopDataSource.price - that.data.integral + that.data.showIntegral
    })

    if (that.data.switch1 == true) {
      that.setData({
        showIntegral: that.data.integral
      })
    }

    if (that.data.switch1 == false) {
      that.setData({
        showIntegral: 0
      })
    }

    that.setData({
      numPrice: that.data.num * that.data.shopDataSource.price - that.data.showIntegral + that.data.freight
    })
  },

  /**
   * 点击可用优惠券
   */
  clipCouponsTap: function() {
    this.setData({
      showMask: false,
      showCouponList: false
    })
  },

  /**
   * 点击蒙版
   */
  maskTap: function() {
    this.setData({
      showMask: true,
      showCouponList: true
    })
  },

  /**
   * 点击优惠券
   */
  couponListTap: function(res) {
    var actionIndex = res.currentTarget.dataset.index
    console.log(actionIndex);
  },

  /**
   * 点击收货地址
   */
  receivingAddressTap: function() {
    wx.navigateTo({
      url: Page_path.Page_Me_AddressManager +"?ableselect=1"
    })
  },

  /**
   * 计算总价
   */
  countPrice: function() {
    this.setData({
      numPrice: (parseFloat(this.data.shopDataSource.retailPrice) * parseInt(this.data.num)) + parseFloat(this.data.selectTransportPrice)
    })
  },

  /**
   * 点击担保支付
   */
  shopPayTap: function () {
    console.log("点击支付，应支付：" + this.data.numPrice);
    wx.showLoading({
      title: '下单中...',
    })
    let that = this;
    this.requestAddNewOrder(
      function requestAddNewOrderCallback(result) {
        wx.hideLoading();
        if (!Util.checkEmpty(result)) {
          console.log("下单成功");
          that.requestPayInfo(result, 
            function getPayInfoCallback(payInfoData) {
              console.log("支付信息： \n" + JSON.stringify(payInfoData));
              wx.requestPayment({
                timeStamp: payInfoData.timeStamp,
                nonceStr: payInfoData.nonceStr,
                package: payInfoData.package,
                signType: payInfoData.signType,
                paySign: payInfoData.paySign, 
                success(res) {
                  wx.navigateBack({
                    
                  })
                },
                fail(res) {
                  wx.showToast({
                    title: '支付失败,请稍后重试',
                    icon: 'none'
                  })
                }
              })
            } 
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
   * 提交订单
   * @param requestAddNewOrderCallback
   */
  requestAddNewOrder: function (requestAddNewOrderCallback) {
    let param = {};
    param.customer = {
      customerNo: UserService.getCustomerNo()
    }
    param.paymentAmount = this.data.numPrice;
    param.qty = this.data.num;
    param.receivingAddress = this.data.receiveAddress;
    param.carriage = this.data.selectTransportPrice; // 只要金额 不要知道运输方式吗？

    // param.coupon = null;
    // param.couponAmount = null;
    // param.pointAmount = null;
    // param.usePoint = null;

    if (this.data.type == Shop_Type_Item) {
      param.item = {
        itemNo: this.data.shopDataSource.itemNo
      }
      OrderService.addNewItemOrder(param,
        function addNewOrderResultCallback(result) {
          console.log("新增商品订单 ：\n" + JSON.stringify(result));
          if (Util.checkIsFunction(requestAddNewOrderCallback)) {
            requestAddNewOrderCallback(result.root);
          }
        }
      )
    } else {
      param.pet = {
        petNo: this.data.shopDataSource.petNo
      }
      OrderService.addNewPetOrder(param,
        function addNewOrderResultCallback(result) {
          console.log("新增宠物订单 ：\n" + JSON.stringify(result));
          if (Util.checkIsFunction(requestAddNewOrderCallback)) {
            requestAddNewOrderCallback(result.root);
          }
        }
      )
    }
  },

  /**
   * 获取支付信息
   * @param orderNo
   * @param getPayInfoCallback
   */
  requestPayInfo: function (orderNo, getPayInfoCallback) {
    if (this.data.type == Shop_Type_Item) {
      PayService.getItemOrderPayInfo(orderNo,
        function getResultCallback(result) {
          if (Util.checkIsFunction(getPayInfoCallback)) {
            getPayInfoCallback(result.root);
          }
        }
      )
    } else {
      PayService.getPetOrderPayInfo(orderNo,
        function getResultCallback(result) {
          if (Util.checkIsFunction(getPayInfoCallback)) {
            getPayInfoCallback(result.root);
          }
        }
      )
    }
  },


})

