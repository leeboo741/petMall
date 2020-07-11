// mallsubcontracting/pages/Integralflow/index.js
const UserService = require("../../../services/userService.js");
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const Limit = 20;
const ShareManager = require("../../../services/shareService");
const Utils = require("../../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadState: LoadFootItemState.Loading_State_Empty, // 底部状态
    offset: 0,
    creditFlowList: [], //积分流水
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.startPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
    this.data.offset = 0;
    let that = this;
    UserService.isLogin(function isLoginCallback() {
      let followObj = {
        businessNo: UserService.getBusinessNo(),
        offset: that.data.offset,
        limit: Limit,
      }

      /**
       * 获得积分流水
       */
      UserService.getBusinessCreditFlow(followObj, function(dataSorce) {
        Utils.logInfo("流水信息：====> \n" + JSON.stringify(dataSorce))
        that.setData({
          creditFlowList: dataSorce,
        })
        if (dataSorce.length > 0) {
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

    }, function notLoginCallback() {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      wx.stopPullDownRefresh();
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this;
    if (this.data.loadState == LoadFootItemState.Loading_State_End) {
      return;
    }
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })

    UserService.isLogin(function isLoginCallback(){
      let followObj = {
        businessNo: UserService.getBusinessNo(),
        offset: that.data.offset,
        limit: Limit
      }
      UserService.getBusinessCreditFlow(followObj, function (dataSorce) {
        let tempList = that.data.creditFlowList.concat(dataSorce);
        that.setData({
          creditFlowList: tempList,
        })
        that.data.offset = that.data.offset + Limit;
        if (data.length > 0) {
          that.setData({
            loadState: LoadFootItemState.Loading_State_End
          })
        } else {
          that.setData({
            loadState: LoadFootItemState.Loading_State_Empty
          })
        }
      })
    }, function notLoginCallback(){
      that.setData({
        loadState: LoadFootItemState.Loading_State_End
      })
    })
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },

})