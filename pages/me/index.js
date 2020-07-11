// pages/me/index.js

const UserService = require("../../services/userService.js");
const Config = require("../../macros/config.js");
const PagePath = require("../../macros/pagePath.js");
const WithdrawalService = require("../../services/withdrawalService.js");
const Utils = require("../../utils/util.js");
const ServerManager = require("../../services/serverManager.js");
const ShareManager = require("../../services/shareService");
const userService = require("../../services/userService.js");
const app = getApp();

const Buyer_Action_Index_Unpay = 0; // 买家 待付款
const Buyer_Action_Index_Unsend = 1; // 买家 待发货
const Buyer_Action_Index_Send = 2; // 买家 已发货
const Buyer_Action_Index_Unevaluate = 3; // 买家 待评价
const Buyer_Action_Index_Refund = 4; // 买家 退款
const Buyer_Action_Index_Appointment = 5; // 买家 已预约
const Buyer_Action_Index_Distribution = 6; // 买家 分销
const Buyer_Action_Index_Change = 7; // 买家 切换身份
const Buyer_Action_Index_Address = 8; // 买家 收货地址
const Buyer_Action_Index_Collection = 9; // 买家 收藏
const Buyer_Action_Index_Shopcart = 10; // 买家 购物车
const Buyer_Action_Index_Point = 11; // 买家 积分商城
const Buyer_Action_Index_Server = 12; // 买家 客服

const Seller_Action_Index_Unpay = 0; // 卖家 待付款
const Seller_Action_Index_Unsend = 1; // 卖家 待发货
const Seller_Action_Index_Send = 2; // 卖家 已发货
const Seller_Action_Index_Unevaluate = 3; // 卖家 待评价
const Seller_Action_Index_Refund = 4; // 卖家 退款
const Seller_Action_Index_Appointment = 5; // 卖家 已预约
const Seller_Action_Index_Distribution = 6; // 卖家 分销
const Seller_Action_Index_Release = 7; // 卖家 发布管理
const Seller_Action_Index_Coupon = 8; // 卖家 发券管理
const Seller_Action_Index_Auth = 9; // 卖家 认证
const Seller_Action_Index_Account = 10; // 卖家 账户
const Seller_Action_Index_Bond = 11; // 卖家 保证金
const Seller_Action_Index_Change = 12; // 卖家 切换身份
const Seller_Action_Index_Verify = 13; // 卖家 核销
const Seller_Action_Index_Poster = 14; // 卖家 海报
const Seller_Action_Index_Server = 15; // 卖家 客服

Page({

  /**
   * 页面的初始数据
   */
  data: {
    posterTop: app.globalData.naviHeight,
    showPoster: false, // 隐藏海报
    currentRole: 0, // 当前角色 0 买家 1 卖家
    isLogin: null, // 是否登陆
    userInfo: null, // 用户信息
    businessInfo: null, // 卖家信息
    thisMonthMoney: 0, //本月交易额
    payableAmount: 0, //可提金额
    sex: 0, //性别
    couponNumber: 0, //优惠券数量
    balanceInfo:null, //账户余额
    orderActionList: [{
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
        show: false,
      },
      {
        name: "已预约",
        iconPath: "../../resource/server_order.png",
        link: PagePath.Page_Me_ServerList,
        show: true
      },
      {
        name: "我的分销",
        iconPath: "../../resource/distribution.png",
        link: PagePath.Page_Me_Aistribution,
        show: true,
      },
      {
        name: "切换身份",
        iconPath: "../../resource/switch.png",
        link: "",
        show: true,
      },
      {
        name: "收货地址",
        iconPath: "../../resource/goodsaddress.png",
        link: "",
        show: true,
      },
      {
        name: "我的收藏",
        iconPath: "../../resource/collection.png",
        link: "",
        show: true,

      },
      {
        name: "购物车",
        iconPath: "../../resource/shopcart.png",
        link: "",
        show: false,
      },
      {
        name: "积分商城",
        iconPath: "../../resource/point_exchange.png",
        link: PagePath.Page_Me_Point_PointMall,
        show: true
      },
      {
        name: "客服热线",
        iconPath: "../../resource/customerservice.png",
        link: "",
        show: true,
      },
    ], // 单据操作
    sellerOrderActionList: [{
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
        show: false,
      },
      {
        name: "已预约",
        iconPath: "../../resource/server_order.png",
        link: PagePath.Page_Me_ServerList,
        show: true
      },
      {
        name: "我的分销",
        iconPath: "../../resource/distribution.png",
        link: PagePath.Page_Me_Aistribution,
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
      {
        name: "切换身份",
        iconPath: "../../resource/switch.png",
        link: "",
        show: true,
      },
      {
        name: '核销',
        iconPath: "../../resource/scan.png",
        link: "",
        show: true,
      },
      {
        name: '生成海报',
        iconPath: '../../resource/print_poster.png',
        link: '',
        show: true,
      },
      {
        name: "客服热线",
        iconPath: "../../resource/customerservice.png",
        link: "",
        show: true,
      },
    ], // 卖家单据操作
    operationList: [{
        number: 0,
        tips: "动态",
        url: ""
      },
      {
        number: 0,
        tips: "关注",
        url: "../../mallsubcontracting/pages/businessfollow/index?type=" + 0
      },
      {
        number: 0,
        tips: "粉丝",
        url: "../../mallsubcontracting/pages/businessfollow/index?type=" + 1
      },
      {
        number: 0,
        tips: "爱宠",
        url: "../../stationsubcontract/pages/mypet/index"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    let that = this;
    this.setData({
      isLogin: UserService.isLogin(),
      userInfo: UserService.getLocalUserInfo(),
      currentRole: UserService.getCurrentRole(),
      // businessInfo: UserService.getLocalBusinessInfo(),
    })
    this.needShowPoster();
    UserService.isLogin(function isLoginCallback(){
      UserService.requestBusinessInfo(UserService.getBusinessNo(), function (dataSource) {
        var gz = "operationList[" + 1 + "].number";
        var fs = "operationList[" + 2 + "].number";
        that.setData({
          businessInfo: dataSource,
          [fs]: dataSource.fans == null ? 0 : dataSource.fans,
          [gz]: dataSource.followQty == null ? 0 : dataSource.followQty
        })
      })
      that.getMyPetCount();
      that.getBusinessUseCoupon();
      that.getBusinessMoney();
    },null)
  },

  /**
   * 是否展示海报按钮
   */
  needShowPoster: function(){
    // 是否展示 海报
    const posterShow = "sellerOrderActionList[" + Seller_Action_Index_Poster + "].show";
    let that = this;
    UserService.isLogin(function(){
      that.setData({
        [posterShow]: true
      })
    },function(){
      that.setData({
        [posterShow]: false
      })
    })
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
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },

  /**
   * 点击头像登陆
   */
  tapToLogin: function() {
    wx.navigateTo({
      url: PagePath.Page_Login_Index + "?type=" + this.data.currentRole,
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
  tapToEditStore: function() {
    wx.navigateTo({
      url: PagePath.Page_Me_SellerSetting,
    })
  },

  /**
   * 修改当前角色
   */
  changeCurrentRole: function() {
    let that = this;
    if (that.data.currentRole == 0) {
      UserService.isLogin(function(){
        UserService.requestBusinessInfo(UserService.getBusinessNo(), function (data) {
          wx.showLoading({
            title: '请稍等！',
          })
          if (data == null) {
            wx.showModal({
              title: '请退出重新登录',
              content: '需要重新登录以获取必要信息',
              success(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: PagePath.Page_Me_Setting,
                  })
                }
              }
            })
            return;
          }
          if (data.complete == 0) {
            wx.showModal({
              title: '提示',
              content: '您未填写商家信息,您确定要去完善商家信息吗？',
              success(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: "../../mallsubcontracting/pages/businessimprovement/index?type=" + 0
                  })
                } else if (res.cancel) {
                  Utils.logInfo('用户点击取消')
                }
              }
            })
  
          } else {
  
            that.needShowPoster();
            that.setData({
              currentRole: 1,
            })
            UserService.saveCurrentRole(that.data.currentRole)
          }
          wx.hideLoading();
        })
      }, function(){
        that.needShowPoster();
        that.setData({
          currentRole: 1,
        })
        UserService.saveCurrentRole(that.data.currentRole)
      })
    } else {
      that.setData({
        currentRole: 0
      })
      UserService.saveCurrentRole(that.data.currentRole)
    }
  },

  /**
   * 点击订单操作(卖家)
   */
  tapOrderAction: function(e) {
    Utils.logInfo(JSON.stringify(e))
    let that = this;
    UserService.isLogin(function isLoginCallback() {
      if (e.currentTarget.dataset.index == Seller_Action_Index_Distribution) {
        wx.navigateTo({
          url: e.currentTarget.dataset.link,
        })
      } else if (e.currentTarget.dataset.index == Seller_Action_Index_Change) {
        that.changeCurrentRole();
      } else if (e.currentTarget.dataset.index == Seller_Action_Index_Server) {
        wx.makePhoneCall({
          phoneNumber: Config.Service_Phone,
        })
      } else if (e.currentTarget.dataset.index == Seller_Action_Index_Verify) {
        wx.scanCode({
          onlyFromCamera: true,
          success(res) {
            let resultParamDict = Utils.getUrlParamDict(res.result);
            if (resultParamDict.type && resultParamDict.type == 'server_qrcode') {
              let orderNo = resultParamDict.orderno;
              Utils.logInfo("核销服务二维码:" + orderNo);
              wx.showModal({
                title: '确定核销服务',
                content: '订单号:' + orderNo,
                success(res) {
                  if (res.confirm) {
                    ServerManager.verifyServer(orderNo, function verifyCallback(result) {
                      Utils.logInfo('核销成功:' + result);
                      wx.showModal({
                        title: '核销成功',
                        content: '成功核销订单:' + orderNo,
                        showCancel: false
                      })
                    })
                  }
                }
              })
            }
          }
        })
      } else if (e.currentTarget.dataset.index == Seller_Action_Index_Poster) {
        // 生成海报
        Utils.logInfo('生成海报');
        that.setData({
          showPoster: true,
        })
      } else {
        wx.navigateTo({
          url: e.currentTarget.dataset.link,
        })
      }
    }, function notLoginCallback() {
      wx.navigateTo({
        url: "../login/index"
      })
    })
  },

  posterCloseWatchAction: function(e) {
    this.data.showPoster = false;
  },

  /**
   * 买家操作
   */
  tapMaiOrderAction: function(e) {
    let index = e.currentTarget.dataset.index;
    let that = this;
    UserService.isLogin(function isLoginCallback() {
      if (index == Buyer_Action_Index_Change) {
        that.changeCurrentRole();
      } else if (e.currentTarget.dataset.index == Buyer_Action_Index_Server) {
        wx.makePhoneCall({
          phoneNumber: Config.Service_Phone,
        })
      } else if (e.currentTarget.dataset.index == Buyer_Action_Index_Address) {
        wx.navigateTo({
          url: PagePath.Page_Me_AddressManager + "?ableselect=0"
        })
      } else if (e.currentTarget.dataset.index == Buyer_Action_Index_Collection) {
        wx.navigateTo({
          url: PagePath.Page_Me_Collect_Index,
        })
      } else if (e.currentTarget.dataset.index == Buyer_Action_Index_Shopcart) {
        wx.navigateTo({
          url: "../../mallsubcontracting/pages/shoppingcart/index"
        })
      } else {
        wx.navigateTo({
          url: e.currentTarget.dataset.link
        })
      }
    }, function notLoginCallback() {
      wx.navigateTo({
        url: "../login/index"
      })
    })
  },

  /**
   * 点击积分
   */
  tapPoint: function() {
    wx.navigateTo({
      url: PagePath.Page_Me_Point_Index,
    })
  },

  /**
   * 点击优惠券
   */
  tapCoupon: function() {
    wx.navigateTo({
      url: PagePath.Page_Me_CouponManager_Index,
    })
  },

  /**
   * 点击余额
   */
  tapRecharge: function() {
    wx.navigateTo({
      url: PagePath.Page_Me_Recharge_Index,
    })
  },

  /**
   * 点击提现
   */
  tapWithdrawal: function () {
    let that = this;
    UserService.isLogin(function isLoginCallback(){
      wx.navigateTo({
        url: PagePath.Page_Me_Withdrawal_Index,
      })
    },null)
  },

  /**
   * 获得本月交易额
   */
  getThisMonthAmountMoney: function() {
    let that = this;
    UserService.getThisMonthAmountOfMoney(UserService.getBusinessNo(),
      function callBack(dataSource) {
        Utils.logInfo("本月交易额：" + JSON.stringify(dataSource));
        that.setData({
          thisMonthMoney: dataSource.root
        })
      })
  },


  /**
   * 获得商家的余额
   */
  getBusinessMoney: function () {
    let that = this;
    WithdrawalService.getUserBalance(UserService.getBusinessNo(),
      function callBack(dataSource) {
        Utils.logInfo("获得商家余额：" + JSON.stringify(dataSource));
        that.setData({
          balanceInfo: dataSource.root
        })
      })
  },

  /**
   * 可提金额
   */
  payableAmountInformation: function() {
    let that = this;
    WithdrawalService.getCanBalance(UserService.getBusinessNo(),
      function callBack(dataSource) {
        Utils.logInfo("获得商家可提现：" + JSON.stringify(dataSource));
        that.setData({
          payableAmount: dataSource.root
        })
      })
  },

  /**
   * 点击优惠券
   */
  couponTap: function () {
    let that = this;
    UserService.isLogin(function isLoginCallback() {
      wx.navigateTo({
        url: "/stationsubcontract/pages/coupon/index"
      })
    }, function notLoginCallback() {
      wx.navigateTo({
        url: "../login/index"
      })
    })
  },

  /**
   * 动态 关注 粉丝 爱宠
   */
  operationTap: function(t) {
    let that = this;
    let selectIndex = t.currentTarget.dataset.index
    UserService.isLogin(function isLoginCallback() {
      wx.navigateTo({
        url: that.data.operationList[selectIndex].url
      })
    }, function notLoginCallback() {
      wx.navigateTo({
        url: "../login/index"
      })
    })
  },

  /**
   * 点击小鱼干
   */
  integralflowTap: function() {
    wx.navigateTo({
      url: "../../mallsubcontracting/pages/Integralflow/index"
    })
  },

  /**
   * 获得优惠券的数量
   */
  /**
   * 获得优惠券列表
   */
  getBusinessUseCoupon: function() {
    let that = this;
    let param = {
      businessNo: UserService.getBusinessNo(),
      used: 0,
      invalid: 0,
      offset: 0,
      limit: 30
    }
    UserService.getCouponList(param, function(dataSource) {
      that.setData({
        couponNumber: dataSource.length
      })
    })
  },

  getMyPetCount: function() {
    let that = this;
    ServerManager.getMyPetCount(UserService.getBusinessNo(), function callback(res){
      Utils.logInfo(res);
      var count = "operationList[" + 3 + "].number";
      that.setData({
        [count]: res.root,
      })
    })
  }

})