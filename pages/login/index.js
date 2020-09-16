// pages/login/index.js

const PagePath = require("../../macros/pagePath.js");
const UserService = require("../../services/userService.js");
const ResponseEnum = require("../../services/handle/ResponseCodeEnum.js");
const ShareManager = require("../../services/shareService");
const Utils = require("../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    userinfoScope: true,
    phoneScope: true,
    showPhoneLogin: true,

    loginCallback: 2,

    loginIsformation: false, //判断第一次调用接口是否回调成功
    wxCode: null,
    firstLoginCallbackData: null, //第一次登录返回数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      type: options.type
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    that.setData({
      userinfoScope: false,
      phoneScope: true,
      showPhoneLogin: true
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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

  onClickLeft() {
    wx.navigateBack();
  },

  /**
   * 点击登陆|注册
   */
  tapLoginOrRegister: function(e) {
    let that = this;
    if (this.data.loginIsformation == true) {
      Utils.logInfo("第一次调用成功！" + JSON.stringify(e) + "wxCode \n===>" + that.data.wxCode);
      UserService._requestPhone(that.data.wxCode, e.detail.encryptedData, e.detail.iv,
        wx.getStorageSync("firstLoginCallbackData"),
        function(islog, dataSource) {
          if (islog == true) {
            UserService.saveLocalUserInfo(dataSource.root);
            that.startLogin(UserService.Login_Success);
          } else {
            that.startLogin(UserService.Login_Fail);
          }
        })
    }
  },

  bindGetUserInfo: function(e) {
    var that = this;
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      //插入登录的用户的相关信息到数据库
      wx.login({
        success(res) {
          let wxCode = res.code;
          Utils.logInfo("点击授权code==>" + wxCode);
          wx.getSetting({
            success(res) {
              Utils.logInfo("获取授权成功")
              if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  success(resUser) {
                    Utils.logInfo("解密数据===>" + JSON.stringify(resUser));
                    wx.showLoading({
                      title: '请稍等',
                    })
                    UserService._requestLogin(wxCode, resUser.encryptedData, resUser.iv,
                      function loginRequestCallback(data, callBackInfo) {
                        if (callBackInfo == true) {
                          wx.hideLoading()
                          wx.showModal({
                            title: '提示',
                            content: '授权成功,快去登录吧！',
                            showCancel: false,
                            success: function(res) {
                              wx.setStorageSync("firstLoginCallbackData", data.root)
                              that.setData({
                                userinfoScope: true,
                                phoneScope: false,
                                showPhoneLogin: false,
                                loginIsformation: true,
                                wxCode: wxCode,
                              })
                            }
                          })
                        } else {
                          if (data.code == ResponseEnum.Res_Code.NOT_EXIST) {
                            // that.data.loginCallback(UserService.Login_Register);
                            that.setData({
                              loginCallback: UserService.Login_Register,
                              loginIsformation: false
                            })
                            app.globalData.tempUserInfo = userInfo;
                            let errUserInfo = JSON.parse(data.errMsg);
                            app.globalData.unionId = errUserInfo.unionId;
                            app.globalData.openId = errUserInfo.openid

                          } else {
                            that.setData({
                              loginCallback: UserService.Login_Fail
                            })
                          }
                        }
                      })
                  }
                })

              }
            }
          })
        }
      })
      //     success(res) {
      // UserService._requestLogin()
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            Utils.logInfo('用户点击了“返回授权”')
          }
        }
      })
    }
  },

  startLogin: function(state) {
    let that = this;
    if (state == UserService.Login_Success) {
      if (that.data.type == 0) {
        wx.navigateBack({

        })
      } else {
        UserService.requestBusinessInfo(UserService.getBusinessNo(),
          function getBusinessInfoCallback() {
            wx.navigateBack({

            })
          }
        )
      }
      UserService.haveNewGiftBag();
    }
  },

  /**
   * 取消登录
   */
  cancelLogin: function(){
    wx.navigateBack({
    })
  },

  /**
   * 取消授权
   */
  cancelAuth: function(){
    wx.navigateBack({
    })
  }


})