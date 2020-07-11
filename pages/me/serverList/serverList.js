// pages/me/serverList/serverList.js
const Limit = 20;
const app = getApp();
const Util = require("../../../utils/util.js");
const Utils = require("../../../utils/util.js");
const UrlPath = require("../../../macros/urlPath.js");
const ServerManager = require("../../../services/serverManager.js");
const UserManager = require("../../../services/userService.js");
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const ShareManager = require("../../../services/shareService");
const PayManager = require("../../../services/payService");
const PagePath = require("../../../macros/pagePath");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentRole: 0, // 0 买家 1 卖家
    pageIndex: 0, // 页码
    loadState: LoadFootItemState.Loading_State_Empty, // 底部状态
    dataSource: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentRole: UserManager.getCurrentRole(),
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
    wx.startPullDownRefresh();
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
    this.data.offset = 0;
    let that = this;
    UserManager.isLogin(function isLoginCallback(){
      if (that.data.currentRole == 0) {
        that.getCustomerData(that.data.offset, function callback(result) {
          Utils.logInfo("获取客户已预约服务列表:", result);
          that.setData({
            dataSource: result,
          })
          that.data.offset = that.data.offset + Limit;
          if (result.length >= Limit) {
            that.setData({
              loadState: LoadFootItemState.Loading_State_Normal
            })
          } else if (result.length < Limit && result.length > 0) {
            that.setData({
              loadState: LoadFootItemState.Loading_State_End
            })
          } else {
            that.setData({
              loadState: LoadFootItemState.Loading_State_Empty
            })
          }
          wx.stopPullDownRefresh();
        })
      } else {
        that.getBusinessData(that.data.offset, function callback(result) {
          Utils.logInfo("获取商家已预约服务列表:", result);
          that.setData({
            dataSource: result,
          })
          that.data.offset = that.data.offset + Limit;
          if (result.length >= Limit) {
            that.setData({
              loadState: LoadFootItemState.Loading_State_Normal
            })
          } else if (result.length < Limit && result.length > 0) {
            that.setData({
              loadState: LoadFootItemState.Loading_State_End
            })
          } else {
            that.setData({
              loadState: LoadFootItemState.Loading_State_Empty
            })
          }
          wx.stopPullDownRefresh();
        })
      }
    }, function notLoginCallback(){
      wx.showToast({
        title: '请先登录',
        icon:'none'
      })
      wx.stopPullDownRefresh();
    })
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.loadState == LoadFootItemState.Loading_State_End ||
      this.data.loadState == LoadFootItemState.Loading_State_Loading) {
      return;
    }
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    let that = this;
    UserManager.isLogin(function isLoginCallback(){
      if (that.data.currentRole == 0) {
        that.getCustomerData(that.data.offset, function callback(result) {
          let tempList = that.data.dataSource.concat(result);
          that.setData({
            dataSource: tempList
          })
          that.data.offset = that.data.offset + Limit;
          if (result.length >= Limit) {
            that.setData({
              loadState: LoadFootItemState.Loading_State_Normal
            })
          } else {
            that.setData({
              loadState: LoadFootItemState.Loading_State_End
            })
          }
        })
      } else {
        that.getBusinessData(that.data.offset, function callback(result) {
          let tempList = that.data.dataSource.concat(result);
          that.setData({
            dataSource: tempList
          })
          that.data.offset = that.data.offset + Limit;
          if (result.length >= Limit) {
            that.setData({
              loadState: LoadFootItemState.Loading_State_Normal
            })
          } else {
            that.setData({
              loadState: LoadFootItemState.Loading_State_End
            })
          }
        })
      }
    }, function notLoginCallback() {
      that.setData({
        loadState: LoadFootItemState.Loading_State_Normal
      })
    })
    
  },

  toPay: function(res) {
    let orderNo = res.currentTarget.dataset.orderno;
    let index = res.currentTarget.dataset.index;
    let that = this;
    wx.showLoading({
      title: '支付中...',
    })
    PayManager.getServerOrderPayInfo(orderNo, function(payInfo){
      wx.hideLoading();
      wx.requestPayment({
        timeStamp: payInfo.timeStamp,
        nonceStr: payInfo.nonceStr,
        package: payInfo.package,
        signType: payInfo.signType,
        paySign: payInfo.paySign,
        success(res){
          let str = "dataSource[" + index + "].paymentState";
          that.setData({
            [str] : 1
          })
        }
      })
    })
  },

  getCustomerData: function(offset, getCustomerDataCallback) {
    ServerManager.customerGetOrderServerList(UserManager.getBusinessNo(),offset,Limit, function callback(result){
      if (Util.checkIsFunction(getCustomerDataCallback)) {
        getCustomerDataCallback(result)
      }
    });
  },

  getBusinessData: function (offset, getBusinessDataCallback) {
    ServerManager.businessGetOrderServerList(UserManager.getBusinessNo(), offset, Limit, function callback(result) {
      if (Util.checkIsFunction(getBusinessDataCallback)) {
        getBusinessDataCallback(result)
      }
    });
  },

  /**
   * 点击生成二维码
   */
  tapQRCode: function(res){
    let index = res.currentTarget.dataset.index;
    let orderNo = res.currentTarget.dataset.orderno;
    wx.navigateTo({
      url: '/pages/me/serverList/serverQR?orderno='+orderNo+'&orderindex='+index,
    })
  },

  /** 点击评价 */
  tapEvaluate: function (res) {
    let index = res.currentTarget.dataset.index;
    let orderNo = res.currentTarget.dataset.orderno;
    app.globalData.evaluateOrder = this.data.dataSource[index];
    wx.navigateTo({
      url: PagePath.Page_Order_Evaluate_Index + "?orderno=" + orderNo,
    })
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },

})