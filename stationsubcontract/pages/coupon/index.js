const UserService=require("../../../services/userService.js");
const Limit=20;
const app=getApp();
const ShareManager = require("../../../services/shareService");
const Utils = require("../../../utils/util.js");

Page({
  data: {
    used: !1,
    use: !0,
    currtindex:-1,
    usedcss:false,
    showTips:true,
    couponList: [
      {
        reduceType:2,
        amount:5,
        name:"666新人优惠券",
        startTime:"2020-02-22",
        endTime:"2020-02-25",
        description:"哈哈哈你是真的骚！！！"
      },
      {
        reduceType: 1,
        amount: 888,
        name: "666新人优惠券",
        startTime: "2020-02-22",
        endTime: "2020-02-25",
        description: "哈哈哈你是真的骚！！！"
      },
      {
        reduceType: 3,
        amount: 5,
        name: "666新人优惠券",
        startTime: "2020-02-22",
        endTime: "2020-02-25",
        description: "哈哈哈你是真的骚！！！"
      }
    ],
    isFromget: !0,
    getPageNum: 1,
    getLoading: !1,
    showLoading: !1,
    getLoadingComplete: !1,
    offset: 0,
    use: !0,
    naviHeight: app.globalData.naviHeight,
    pageHeight:app.globalData.pageHeight,
    windowHeight: wx.getSystemInfoSync()['windowHeight'],
  },
  onLoad: function (t) { 
    
    // 
  },
  onShow: function () {
    this.getCouponList();
  },

  lower: function () {
    
  },
  /**
   * 可用的优惠券
   */
  getCouponList: function () {
    let that = this;
    that.setData({
      use:true,
      used:false
    })
    this.getBusinessUseCoupon(this.data.offset, function (data) {
      Utils.logInfo("优惠券列表：===>" + JSON.stringify(data));
      that.setData({
        couponList: data
      })
    })

  },
  
  /**
   * 已失效的优惠券
   */
  getusedCouponList:function(){
    var that = this;
    that.setData({
      use: false,
      used: true
    })
    that.getBusinessUsedCoupon(this.data.offset, function (data) {
      Utils.logInfo("已失效列表：===>" + JSON.stringify(data));
      that.setData({
        couponList: data
      })
    })
  },
   
  /**
   * 使用说明
   */
  showinfo: function (t) {
    let that=this;
    var e = t.currentTarget.dataset.id; 
    if (that.data.currtindex==e){
      this.setData({
        currtindex: -1
      })  
    }else{
      this.setData({
        currtindex: e
      })  
    }
   
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },


  /**
   * 获得优惠券列表
   */
  getBusinessUseCoupon: function (offset, callBack) {
    let that = this;
    UserService.isLogin(function isLoginCallback() {
      let param = {
        businessNo: UserService.getBusinessNo(),
        used: 0,
        invalid: 0,
        offset: offset,
        limit: Limit
      }
      UserService.getCouponList(param, function (dataSource) {
        callBack(dataSource)
      })
    })
  },


  /**
   * 获得已失效的优惠券
   */
  getBusinessUsedCoupon: function (offset, callBack) {
    let that = this;
    UserService.isLogin(function isLoginCallback() {
      let param = {
        businessNo: UserService.getBusinessNo(),
        invalid: 1,
        offset: offset,
        limit: Limit
      }
      UserService.getCouponList(param, function (dataSource) {
        callBack(dataSource)
      })
    })
  }
});