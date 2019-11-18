// pages/login/index.js

const PagePath = require("../../macros/pagePath.js");
const UserService = require("../../services/userService.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
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
   * 点击登陆|注册
   */
  tapLoginOrRegister: function () {
    let that = this;
    UserService.startLogin(function loginCallback(state){
      wx.hideLoading();
      if (state == UserService.Login_Success) {
        if (that.data.type == 0) {
          wx.navigateBack({

          })
        } else {
          UserService.requestBusinessInfo(UserService.getCustomerNo(),
            function getBusinessInfoCallback() {
              wx.navigateBack({

              })
            }
          )
        }
      } else if (state == UserService.Login_Register) {
        wx.navigateTo({
          url: PagePath.Page_Register_Index,
        })
      }
    })
  },
})