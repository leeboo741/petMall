// pages/me/releaseManager/eleaseproducts/index.js
const PagePath = require("../../../../macros/pagePath.js");
const UserService = require("../../../../services/userService.js");
const ShareManager = require("../../../../services/shareService");
const Utils = require("../../../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    typeContext: [
      "活体", "用品", "服务"
    ]
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    UserService.isLogin(null, function notLoginCallback() {
      wx.navigateTo({
        url: "../../../login/index"
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
   * 点击发布的产品类型
   */
  productTap: function(e) {
    let that = this;
    let productType = e.currentTarget.dataset.index;
    UserService.isLogin(function isLoginCallback() {
      UserService.requestBusinessInfo(UserService.getBusinessNo(), function (dataSource) {
        if (dataSource == null) {
          wx.showModal({
            title: '请退出重新登录',
            content: '重新登录以获取必要数据',
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
        if (dataSource.complete == 0) {
          wx.showModal({
            title: '提示',
            content: '您未填写商家信息,您确定要去完善商家信息吗？',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: "/mallsubcontracting/pages/businessimprovement/index?type=" + 0
                })
              }
            }
          })
          return;
        }

        if (dataSource != null && dataSource.authType != null) {

          if (dataSource.authType == 0) {
            if (productType == 0) {
              that.showModleInfo("您未进行个人认证，您确定要去认证吗？", 0)
            } else if (productType == 1) {
              that.showModleInfo("您未进行商家认证，您确定要去认证吗？", 1)
            } else {
              that.showModleInfo("您未进行平台认证，您确定要去认证吗？", 2)
            }
          } else if (dataSource.authType == 1) {
            if (productType == 0) {
              wx.navigateTo({
                url: PagePath.Page_Me_ReleaseManager_ReleaseNew + "?type=" + 0,
              })
            } else if (productType == 1) {
              that.showModleInfo("您未进行商家认证，您确定要去认证吗？", 1)
              // wx.navigateTo({
              //   url: "../../../../mallsubcontracting/pages/productreleasedetails/index"
              // })
            } else {
              that.showModleInfo("您未进行平台认证，您确定要去认证吗？", 2)
            }
          } else if (dataSource.authType == 2) {
            if (productType == 0) {
              wx.navigateTo({
                url: PagePath.Page_Me_ReleaseManager_ReleaseNew + "?type=" + 0,
              })
            } else if (productType == 1) {
              wx.navigateTo({
                url: "../../../../mallsubcontracting/pages/productreleasedetails/index"
              })
            } else {
              // wx.navigateTo({
              //   url: "../../../../mallsubcontracting/pages/publishingservice/index"
              // })
              that.showModleInfo("您未进行平台认证，您确定要去认证吗？", 2)
            }
          } else {
            if (productType == 0) {
              wx.navigateTo({
                url: PagePath.Page_Me_ReleaseManager_ReleaseNew + "?type=" + 0,
              })
            } else if (productType == 1) {
              wx.navigateTo({
                url: "../../../../mallsubcontracting/pages/productreleasedetails/index"
              })
            } else {
              wx.navigateTo({
                url: "../../../../mallsubcontracting/pages/publishingservice/index"
              })
            }
          }
        } else {
          wx.showToast({
            title: '商家不存在!',
            icon: 'none'
          })
        }
      })
    })
  },

  showModleInfo: function(trip, tripType) {
    wx.showModal({
      title: '提示',
      content: trip,
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: "../../authenticateManager/submitAuthenticate/index?type=" + tripType
          })
        } else if (res.cancel) {
          Utils.logInfo('用户点击取消')
        }
      }
    })
  },

  /**
   * 获得用户审核信息
   */
  // userSubmitInfo: function (callBack) {
  //   let that = this;
  //   UserService.requestAuthByAuthNo(UserService.getBusinessNo(), function getBusinessInfoCallback(dataSource) {
  //     let auditInformation={}
  //     if (dataSource!=null){
  //       auditInformation.personAuth = dataSource.personAuth;  //个人认证
  //       auditInformation.platformAuth = dataSource.platformAuth;  //平台认证
  //       auditInformation.businessAuth = dataSource.businessAuth;  //商家认证
  //       callBack(auditInformation);
  //     }else{
  //       callBack(0);
  //     }

  //   })
  // }
})