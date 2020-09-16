// pages/me/bond/index.js

const app = getApp();
const UserService = require("../../../services/userService.js");
const Url_Path=require("../../../macros/urlPath.js");

const ShareManager = require("../../../services/shareService");
const Utils = require("../../../utils/util");
const pagePath = require("../../../macros/pagePath.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkContract: false, // 是否检查完合约
    height: null,
    businessInfo: null,
    bond_1: Url_Path.Url_Base + Url_Path.Url_bond_1,
    bond_2: Url_Path.Url_Base + Url_Path.Url_bond_2,
    bondPrice:0,
    payBondInfo:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    this.setData({
      height: app.globalData.pageHeight,
      businessInfo: UserService.getLocalBusinessInfo()
    })

    UserService.getBusinessBondPrice(function(data){
        Utils.logInfo("保证金金额："+JSON.stringify(data));
        that.setData({
          bondPrice: data.root
        })
    })

    this.getBusinessBondObj(function(dataCallBack){
       
    })

    Utils.logInfo(UserService.getLocalBusinessInfo());
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
    let that=this;
    UserService.isLogin(function isLoginCallback() {
      UserService.requestBusinessInfo(UserService.getBusinessNo(), function (dataSource) {
        that.setData({
          payBondInfo: dataSource.payBond
        })
        if (dataSource.payBond == 1) {
          wx.showModal({
            title: '提示',
            content: '您已缴纳保证金！',
            showCancel: false,
          })
        }
      })
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
    return ShareManager.getDefaultShareCard();
  },

  /**
   * 点击确认合同
   */
  tapCheckContract: function() {
    this.setData({
      checkContract: !this.data.checkContract
    })
  },

  /**
   * 暂不缴纳
   */
  cancelBond: function() {

  },

  /**
   * 缴纳保证金
   */
  confirmBond: function() {
    let that = this;
    UserService.isLogin(function isLoginCallback(){
      if (that.data.payBondInfo == 1) {
        wx.showModal({
          title: '提示',
          content: '您已缴纳保证金！',
          showCancel: false,
        })
        return;
      }

      if (!that.data.checkContract) {
        wx.showToast({
          title: '请阅读并同意条款',
          icon: 'none'
        })
        return;
      }
      wx.showLoading({
        title: '请稍等...',
      })
      UserService.addBond(
        {
          businessNo: UserService.getBusinessNo(),
        },
        function bondResultCallback(res) {
          Utils.logInfo("缴纳保证金： \n" + JSON.stringify(res));
          if (res.root == "操作成功") {
            Utils.logInfo(that.data.businessInfo.businessNo)
            UserService.payBond(UserService.getBusinessNo(), function callBack(dataSource) {
              Utils.logInfo("支付内容：" + JSON.stringify(dataSource))
              if (dataSource.root.appId != null && dataSource.root.appId != undefined) {
                wx.requestPayment({
                  timeStamp: dataSource.root.timeStamp,
                  nonceStr: dataSource.root.nonceStr,
                  package: dataSource.root.package,
                  signType: dataSource.root.signType,
                  paySign: dataSource.root.paySign,
                  success(res) {
                    wx.navigateBack({ changed: true });//返回上一页  
                  },
                  fail(res) {
                    wx.showToast({
                      title: '缴纳失败',
                      icon: "none"
                    })
                  }
                })
              }

            })
          } else {
            wx.showToast({
              title: '出现错误,请稍后再试！',
              icon: 'none',
              duration: 2000
            })
          }
          wx.hideLoading();

        }
      )
    }, function(){
      wx.showModal({
        title: '提示',
        content: '您未登录请先去登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: pagePath.Page_Login_Index
            });
          } else if (res.cancel) {
            Utils.logInfo('用户点击取消')
          }
        }
      })
    })
  },

  /**
   * 获得保证金对象
   */
  getBusinessBondObj:function(bondObjCallBack){
    UserService.getBusinessBond(UserService.getBusinessNo(),function(data){
      Utils.logInfo("获取保证金对象：====>"+JSON.stringify(data));
      bondObjCallBack(data.root)
    })
  }
})