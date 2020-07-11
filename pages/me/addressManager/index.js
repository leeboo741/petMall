// pages/me/addressManager/index.js

const app = getApp();
const PagePath = require("../../../macros/pagePath.js");
const AddressManagerService = require("../../../services/addressManagerService.js");
const UserService = require("../../../services/userService.js");

const ShareManager = require("../../../services/shareService");
const Utils = require("../../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ableSelectAddress: false, // 是否允许选中地址
    addressList: [], // 地址列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ableSelectAddress: options.ableselect == 1? true: false
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
    let that = this;
    UserService.isLogin(function isLoginCallback(){
      AddressManagerService.getAddressListByCustomerNo(UserService.getBusinessNo(),
        function getResultCallback(result) {
          Utils.logInfo(result);
          that.setData({
            addressList: result.root
          })
          wx.stopPullDownRefresh();
        }
      )
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },

  /**
   * 点击编辑
   */
  tapToEdit: function(e) {
    app.editAddressObj = this.data.addressList[e.currentTarget.dataset.index];
    wx.navigateTo({
      url: PagePath.Page_Me_AddressManager_AddNew,
    })
  },

  /**
   * 点击新增
   */
  tapToAddNew: function() {
    wx.navigateTo({
      url: PagePath.Page_Me_AddressManager_AddNew,
    })
  },

  /**
   * 选中地址
   */
  tapAddress: function(e) {
    if (this.data.ableSelectAddress) {
      app.globalData.selectReceiveAddress = this.data.addressList[e.currentTarget.dataset.index];
      wx.navigateBack({
        
      })
    }
  }
})