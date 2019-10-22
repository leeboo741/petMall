// pages/mall/shoppingpayment/index.js
const Page_path = require("../../../macros/pagePath.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    freight:15,   //运费
    shopDataSource:[],//商品信息
    num: 1,           //加减框
    minusStatus: 'disable',  //是否禁用减号
    switch1: false,  //是否用积分
    integral:20,   //可兑换积分
    showIntegral:0,  //使用显示积分
    numPrice:0,      //总金额
    showMask:true,  //是否隐藏蒙版
    showCouponList:true, //是否隐藏优惠券列表
    couponList:[      //优惠券列表
        {
          couponPrice:5,
          couponIntroduce:'新人商城5元优惠券',
          couponMethod:'商城购物满100元减5元',
          effectiveTime:'2019-10-28'
        },  
        {
          couponPrice: 3,
          couponIntroduce: '新人商城3元优惠券',
          couponMethod: '商城购物满100元减3元',
          effectiveTime: '2019-10-28'
        }, 
        {
          couponPrice: 6,
          couponIntroduce: '新人商城6元优惠券',
          couponMethod: '商城购物满100元减6元',
          effectiveTime: '2019-10-28'
        }   
      ,
      {
        couponPrice: 6,
        couponIntroduce: '新人商城6元优惠券',
        couponMethod: '商城购物满100元减6元',
        effectiveTime: '2019-10-28'
      }
      ,
      {
        couponPrice: 6,
        couponIntroduce: '新人商城6元优惠券',
        couponMethod: '商城购物满100元减6元',
        effectiveTime: '2019-10-28'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this; 
    let requestOptions = JSON.parse(decodeURIComponent(options.requestInfo));
    console.log(requestOptions);
    that.setData({
      shopDataSource: requestOptions,
    })

    that.setData({
      numPrice: that.data.num * that.data.shopDataSource.price - that.data.showIntegral + that.data.freight
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

  },
  //事件处理函数
  /*点击减号*/
  bindMinus: function () {
    let that=this;
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
  /*点击加号*/
  bindPlus: function () {
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
  /*输入框事件*/
  bindManual: function (e) {
    let that = this;
    var num = e.detail.value;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus,
      numPrice: num * that.data.shopDataSource.price - that.data.showIntegral + that.data.freight
    })
  },

  onChange(event) {  
    let that=this;
      //是否使用积分兑换开关
    const detail = event.detail;
    this.setData({
      'switch1': detail.value,  
      // numPrice: that.data.num * that.data.shopDataSource.price - that.data.integral + that.data.showIntegral
    })

    if (that.data.switch1==true){
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
  clipCouponsTap:function(){
      this.setData({
        showMask:false,
        showCouponList:false
      })
  },

  /**
   * 支付商品
   */
  shopPayTap:function(){
    console.log("点击支付，应支付：" + this.data.numPrice);
  },

  /**
   * 点击蒙版
   */
  maskTap:function(){
    this.setData({
      showMask: true,
      showCouponList: true
    })
  },

  /**
   * 点击优惠券
   */
  couponListTap:function(res){
    var actionIndex = res.currentTarget.dataset.index
    console.log(actionIndex);
  },

  /**
   * 点击收货地址
   */
  receivingAddressTap:function(){
    wx.navigateTo({
      url: Page_path.Page_Me_AddressManager 
    })

  }
})