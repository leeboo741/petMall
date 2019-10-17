// pages/me/index.js

const UserService = require("../../services/userService.js");
const Config = require("../../macros/config.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: null, // 是否登陆
    userInfo: null, // 用户信息
    orderActionList: [
      {
        name: "待付款",
        iconPath: "../../resource/unpay.png",
        link: "",
      },
      {
        name: "待发货",
        iconPath: "../../resource/unsend.png",
        link: "",
      },
      {
        name: "已发货",
        iconPath: "../../resource/transport.png",
        link: "",
      },
      {
        name: "待评价",
        iconPath: "../../resource/unEvaluate.png",
        link: "",
      },
      {
        name: "退款",
        iconPath: "../../resource/refund.png",
        link: "",
      },
    ], // 单据操作
    otherActionList: [
      {
        name: "我是卖家",
        detail: "",
        link: "",
      }, 
      {
        name: "收货地址",
        detail: "",
        link: "",
      }, 
      {
        name: "我的收藏",
        detail: "",
        link: "",
      },
      {
        name: "用户帮助",
        detail: "",
        link: "",
      }, 
      {
        name: "客服热线",
        detail: Config.Service_Phone,
        link: "",
      }, 
      {
        name: "意见反馈",
        detail: "",
        link: "",
      },
    ], // 其他操作
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isLogin: UserService.isLogin(),
      userInfo: UserService.getLocalUserInfo()
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

  /**
   * 点击cell
   */
  tapOtherAction: function(e) {
    console.log("点击 CELL :\n" + e.currentTarget.dataset.index)
  }
})