// pages/me/editPersonal/index.js
const UserService = require("../../../services/userService.js");
const PagePath = require("../../../macros/pagePath.js");
const app = getApp();
const ShareManager = require("../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageHeight: null,
    businessInfo: null,
    
    userInfo: null,

    newAvatarPath: null, 
    newNameStr: null,

    managerAddressUrl: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      managerAddressUrl: PagePath.Page_Me_AddressManager + "?ableselect=1",
      pageHeight: app.globalData.pageHeight
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
    let that=this;
    this.setData({
      userInfo: UserService.getLocalUserInfo(),
      // businessInfo:UserService.getLocalBusinessInfo()
    })
    UserService.isLogin(function isLoginCallback(){
      UserService.requestBusinessInfo(UserService.getBusinessNo(), function (dataSource) {
        that.setData({
          businessInfo: dataSource
        })
      })
    }, function notLoginCallback(){})

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
   * 点击退出登陆
   */
  tapLoginOut: function() {
    UserService.deleteLocalUserInfo();
    wx.navigateBack({
      
    })
  },

  /**
   * 选择头像
   */
  selectUserAvatar: function () {
    let that = this;
    wx.navigateTo({
      url:"../../../mallsubcontracting/pages/businessimprovement/index?type="+2
    })
  },
  

  /**
   * 输入用户名称
   */
  inputUserName: function (e) {
    this.data.newNameStr = e.detail.value
  }
})