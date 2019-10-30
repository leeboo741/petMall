// pages/login/index.js

const PagePath = require("../../macros/pagePath.js");
const UserService = require("../../services/userService.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    // UserService.saveLocalUserInfo({
    //     avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571228473763&di=7983ab89537ae923fc13b05acf6baf04&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F28%2F20160928230144_QARdX.thumb.700_0.png",
    //     name: "逗",
    //     explain: "商城所有商品享受会员价",
    //     openId: "123123123",
    //     phone: "16607093121"
    // })
    // wx.navigateBack({
    //   delta: 1
    // })
    UserService.startLogin(function loginCallback(state){
      if (state == UserService.Login_Success) {
        wx.navigateBack({
          
        })
      } else if (state == UserService.Login_Register) {
        wx.navigateTo({
          url: PagePath.Page_Register_Index,
        })
      }
    })
  },
})