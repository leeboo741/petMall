// pages/mall/shoppingpayment/index.js
const Page_path = require("../../../macros/pagePath.js");
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
      numPrice: num * that.data.shopDataSource.price - that.data.showIntegral + that.data.freight
    })
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
      numPrice: num * that.data.shopDataSource.price - that.data.showIntegral + that.data.freight
    })
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
      numPrice: num * that.data.shopDataSource.price - that.data.showIntegral + that.data.freight
    })
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
   * 支付商品
   */
  shopPayTap: function() {
    console.log("点击支付，应支付：" + this.data.numPrice);
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

  }
})