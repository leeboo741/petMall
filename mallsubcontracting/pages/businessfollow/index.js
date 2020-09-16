// mallsubcontracting/pages/businessfollow/index.js
const UserService = require("../../../services/userService.js");
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const Limit = 20;
const Utils = require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [

    ], //关注
    fansList: [], //粉丝列表
    titleNameByType: 0, //关注或粉丝
    offset: 0,
    loadState: LoadFootItemState.Loading_State_Empty, // 底部状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      titleNameByType: options.type
    })
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
      if (that.data.titleNameByType == 0) {
        let followObj = {
          businessNo: UserService.getBusinessNo(),
          offset: that.data.offset,
          limit: Limit,
          queryType: 1
        } //关注接口对象
        UserService.getBusinessFollowList(followObj, function(dataSorce) {
          Utils.logInfo("关注信息：====> \n" + JSON.stringify(dataSorce))
          that.setData({
            dataList: dataSorce.root,
          })
          if (dataSorce.root.length > 0) {
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
      } else {
        let followObj = {
          followBusinessNo: UserService.getBusinessNo(),
          offset: that.data.offset,
          limit: Limit,
          followType: 1,
          petNo: null,
          item: null,
        } //粉丝接口对象
        UserService.getBusinessFansList(followObj, function(dataSorce) {
          Utils.logInfo("粉丝信息：====> \n" + JSON.stringify(dataSorce))
          that.setData({
            fansList: dataSorce.root,
          })
          if (dataSorce.root.length > 0) {
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
      }
    }, function notLoginCallback() {
      wx.stopPullDownRefresh();
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.loadState == LoadFootItemState.Loading_State_End) {
      return;
    }
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    let that = this;
    UserService.isLogin(function isLoginCallback() {
      if (that.data.titleNameByType == 0) {
        let followObj = {
          businessNo: UserService.getBusinessNo(),
          queryType: 1,
          offset: that.data.offset,
          limit: Limit
        } //关注对象
        UserService.getBusinessFollowList(followObj, function(dataSorce) {
          let tempList = that.data.dataList.concat(dataSorce.root);
          that.setData({
            dataList: tempList,
          })
          that.data.offset = that.data.offset + Limit;
          if (data.root.length > 0) {
            that.setData({
              loadState: LoadFootItemState.Loading_State_End
            })
          } else {
            that.setData({
              loadState: LoadFootItemState.Loading_State_Empty
            })
          }
        })
      } else {
        let followObj = {
          followBusinessNo: UserService.getBusinessNo(),
          offset: that.data.offset,
          limit: Limit,
          followType: 1,
          petNo: null,
          item: null,
        } //粉丝接口对象
        UserService.getBusinessFansList(followObj, function(dataSorce) {
          let tempList = that.data.dataList.concat(dataSorce.root);
          that.setData({
            fansList: tempList,
          })
          that.data.offset = that.data.offset + Limit;
          if (data.root.length > 0) {
            that.setData({
              loadState: LoadFootItemState.Loading_State_End
            })
          } else {
            that.setData({
              loadState: LoadFootItemState.Loading_State_Empty
            })
          }
        })
      }
    }, function notLoginCallback() {
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