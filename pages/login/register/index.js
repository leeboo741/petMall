// pages/login/register/index.js

const intervalDuration = 60;
const Util = require("../../../utils/util.js");
const Utils = require("../../../utils/util")
const UserService = require("../../../services/userService.js");
const app = getApp();

const ShareManager = require("../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: "", // 输入的电话号码
    code: null, // 验证码
    getCodeTitle: "获取验证码", // 获取验证码按钮标题
    ableGetCode: true, // 是否允许获得验证码
    intervalID: null, // 获取验证码定时器Id
    intervalCount: intervalDuration, // 重新获取验证码倒计时
    cookie: null, // 获取验证码的cookie 包含有sessionId 提交申请的时候 服务器需要 通过sessionId 获取短信验证码 微信每次请求会清空sessionId
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
    clearInterval(this.data.intervalID);
    this.data.intervalID = null;
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
   * 输入框输入
   */
  inputPhone: function (e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },

  /**
   * 输入验证码
   */
  inputCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },

  /**
     * 获取验证码
     */
  getCode: function (e) {
    if (this.data.ableGetCode) {
      if (Util.checkEmpty(this.data.phoneNumber) || !Util.isPhoneAvailable(this.data.phoneNumber)) {
        wx.showToast({
          title: '请输入正确手机号码！',
          icon: 'none',
        })
        return;
      }
      Utils.logInfo("开始倒计时");
      this.interval();
      let that = this;
      UserService.getCode(this.data.phoneNumber,
        function getCodeCallback(res) {
          let tempCookie = res.header["Set-Cookie"];
          that.setData({
            cookie: tempCookie
          })
        }
      )
    }
    Utils.logInfo("正在倒计时");
  },

  /**
   * 开始倒计时
   */
  interval: function (e) {
    let that = this;
    clearInterval(this.data.intervalID);
    this.data.intervalID = setInterval(function () {
      let tempCount = that.data.intervalCount;
      tempCount--;
      if (tempCount > 0) {
        that.setData({
          getCodeTitle: tempCount + '秒后获取',
          intervalCount: tempCount,
          ableGetCode: false
        })
        Utils.logInfo("倒计时===> " + tempCount);
        that.interval();
      } else {
        that.setData({
          getCodeTitle: "获取验证码",
          intervalCount: intervalDuration,
          ableGetCode: true
        })
        Utils.logInfo("倒计时结束");
        clearInterval(that.data.intervalID);
        that.data.intervalID = null;
      }
    }, 1000);
  },

  /**
   * 点击注册
   */
  registerAccount: function () {
    // 确认 手机号 输入
    if (this.data.phoneNumber == null ||
      this.data.phoneNumber.length <= 0 ||
      !Util.isPhoneAvailable(this.data.phoneNumber)) {
      wx.showToast({
        title: '请输入正确手机号码！',
        icon: 'none',
      })
      return;
    }
    if (this.data.code == null || this.data.code.length <= 0) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
      return;
    }
    // 请求注册
    wx.showLoading({
      title: '注册中...',
    })
    
    UserService.register(
      {
        data: {
          customerName: app.globalData.tempUserInfo.nickName,
          headerImage: app.globalData.tempUserInfo.avatarUrl,
          sex: app.globalData.tempUserInfo.gender,
          openid: app.globalData.openId,
          unionId: app.globalData.unionId,
          phone: this.data.phoneNumber,
          verifyCode: this.data.code,
        } ,
        header: {
          "cookie": this.data.cookie
        },
      },
      function registerCallback(res) {
        wx.hideLoading();
        wx.navigateBack({
          delta: 2
        })
      }
    )
  }
})