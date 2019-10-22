// pages/me/index.js

const UserService = require("../../services/userService.js");
const Config = require("../../macros/config.js");
const PagePath = require("../../macros/pagePath.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentRole: 0, // 当前角色 0 买家 1 卖家
    isLogin: null, // 是否登陆
    userInfo: null, // 用户信息
    orderActionList: [
      {
        name: "待付款",
        iconPath: "../../resource/unpay.png",
        link: PagePath.Page_Order_UnpayList_Index,
        show: true,
      },
      {
        name: "待发货",
        iconPath: "../../resource/unsend.png",
        link: PagePath.Page_Order_UnsendList_Index,
        show: true,
      },
      {
        name: "已发货",
        iconPath: "../../resource/transport.png",
        link: PagePath.Page_Order_SendList_Index,
        show: true,
      },
      {
        name: "待评价",
        iconPath: "../../resource/unEvaluate.png",
        link: PagePath.Page_Order_UnevaluateList_Index,
        show: true,
      },
      {
        name: "退款",
        iconPath: "../../resource/refund.png",
        link: PagePath.Page_Order_RefundList_Index,
        show: true,
      },
    ], // 单据操作
    sellerOrderActionList: [
      {
        name: "待付款",
        iconPath: "../../resource/unpay.png",
        link: PagePath.Page_Order_UnpayList_Index,
        show: true,
      },
      {
        name: "待发货",
        iconPath: "../../resource/unsend.png",
        link: PagePath.Page_Order_UnsendList_Index,
        show: true,
      },
      {
        name: "已发货",
        iconPath: "../../resource/transport.png",
        link: PagePath.Page_Order_SendList_Index,
        show: true,
      },
      {
        name: "待评价",
        iconPath: "../../resource/unEvaluate.png",
        link: PagePath.Page_Order_UnevaluateList_Index,
        show: true,
      },
      {
        name: "退款",
        iconPath: "../../resource/refund.png",
        link: PagePath.Page_Order_RefundList_Index,
        show: true,
      },
      {
        name: "发布管理",
        iconPath: "../../resource/deliver.png",
        link: PagePath.Page_Me_ReleaseManager_Index,
        show: true,
      },
      {
        name: "发券管理",
        iconPath: "../../resource/coupon.png",
        link: "",
        show: false,
      },
      {
        name: "卖家认证",
        iconPath: "../../resource/qualification.png",
        link: PagePath.Page_Me_AuthenticateManager_Index,
        show: true,
      },
      {
        name: "收款账户",
        iconPath: "../../resource/money_account.png",
        link: PagePath.Page_Me_ReceivingAccount_Index,
        show: true,
      },
      {
        name: "缴保证金",
        iconPath: "../../resource/bond.png",
        link: PagePath.Page_Me_Bond_Index,
        show: true,
      },
    ], // 卖家单据操作
    otherActionList: [
      {
        name: "我是卖家",
        detail: "切换身份",
        link: "",
        show: true,
      }, 
      {
        name: "收货地址",
        detail: "",
        link: PagePath.Page_Me_AddressManager,
        show: true,
      }, 
      {
        name: "我的收藏",
        detail: "",
        link: PagePath.Page_Me_Collect_Index,
        show: true,
      },
      {
        name: "用户帮助",
        detail: "",
        link: "",
        show: false,
      }, 
      {
        name: "客服热线",
        detail: Config.Service_Phone,
        link: "",
        show: true,
      }, 
      {
        name: "意见反馈",
        detail: "",
        link: "",
        show: false,
      },
    ], // 其他操作
    sellerOtherActionList: [
      {
        name: "我是买家",
        detail: "切换身份",
        link: "",
        show: true,
      },
      {
        name: "售宠协议",
        detail: "",
        link: "",
        show: false,
      },
      {
        name: "商家规范",
        detail: "",
        link: "",
        show: false,
      },
      {
        name: "用户帮助",
        detail: "",
        link: "",
        show: false,
      },
      {
        name: "客服热线",
        detail: Config.Service_Phone,
        link: "",
        show: true,
      },
      {
        name: "意见反馈",
        detail: "",
        link: "",
        show: false,
      },
    ], // 卖家其他操作
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      isLogin: UserService.isLogin(),
      userInfo: UserService.getLocalUserInfo(),
      currentRole: UserService.getCurrentRole()
    })
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
    switch(e.currentTarget.dataset.index) {
      case 0:
        this.setData({
          currentRole: this.data.currentRole==0?1:0
        })
        UserService.saveCurrentRole(this.data.currentRole)
        break;
      case 1:
      case 2:
        wx.navigateTo({
          url: e.currentTarget.dataset.link,
        })
        break;
      case 4:
        wx.makePhoneCall({
          phoneNumber: Config.Service_Phone,
        })
        break;
      default:
        break;
    }
  },

  /**
   * 点击头像登陆
   */
  tapToLogin: function() {
    wx.navigateTo({
      url: PagePath.Page_Login_Index,
    })
  },

  /**
   * 点击修改个人信息
   */
  tapToEdit: function() {
    wx.navigateTo({
      url: PagePath.Page_Me_Setting,
    })
  },

  /**
   * 点击修改商家信息
   */
  tapToEditStore: function(){

  },

  /**
   * 点击订单操作
   */
  tapOrderAction: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.link,
    })
  },

  /**
   * 点击积分
   */
  tapPoint: function () {
    wx.navigateTo({
      url: PagePath.Page_Me_Point_Index,
    })
  },
})