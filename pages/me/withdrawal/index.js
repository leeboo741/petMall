// pages/me/withdrawal/index.js

const app = getApp();
const Page_Path=require("../../../macros/pagePath.js");
const WithdrawalService=require("../../../services/withdrawalService.js");
const UserService=require("../../../services/userService.js");
const ShareManager = require("../../../services/shareService");
const Utils = require("../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: 0,         //余额
    pageHeight: null,
    buinessInformation:[],  //卖家信息
    balanceInfo:null, //余额信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageHeight: app.globalData.pageHeight,
      buinessInformation: UserService.getLocalBusinessInfo()
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
    this.getBusinessMoney();
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
   * 提现
   */
  tapWithdrawal: function () {
    let that=this;
    let param={
      businessNo: that.data.buinessInformation.businessNo,
      amount: that.data.bindInputMoney
    }
    WithdrawalService.businessWithdraw(param,function callBack(dataSource){
        Utils.logInfo("提现返回："+JSON.stringify(dataSource))
        if(dataSource.root=="操作成功"){
          wx.showToast({
            title: '提现成功！',
            icon:"success",
            duration:2500
          })
          that.onLoad();
        }else{
          wx.showToast({
            title: '提现失败！',
            icon: "none",
            duration: 2500
          })
        }
    })
  },

  /**
   * 输入框内的值
   */
  inputAmount:function(res){
    Utils.logInfo(JSON.stringify(res))
    let inputValue = res.detail.value;
    this.setData({
      bindInputMoney: inputValue
    })
  },
  
  /**
   * 点击流水明细
   */
  detailedTap:function(){
    let that=this;
    wx.navigateTo({
      url: Page_Path.Page_Me_Detailed_Index + "?businessno=" + that.data.buinessInformation.businessNo
    })
  },

  /**
   * 获得商家的余额
   */
  getBusinessMoney:function(){
    let that=this;
    WithdrawalService.getUserBalance(that.data.buinessInformation.businessNo,
    function callBack(dataSource){
        Utils.logInfo("获得商家余额："+JSON.stringify(dataSource));
        that.setData({
          balanceInfo: dataSource.root
        })
    })
  },

})