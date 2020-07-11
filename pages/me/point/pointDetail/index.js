// pages/me/point/pointDetail/index.js

const LoadFootItemState = require("../../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const PageSize = 20;
const ShareManager = require("../../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {

    pageIndex: 0, // 页码
    loadState: LoadFootItemState.Loading_State_Empty, // 底部状态
    pointDetailList: [
      {
        point: 32,
        type: '支出',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 122,
        type: '收入',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 5432,
        type: '收入',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 111,
        type: '支出',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 231,
        type: '支出',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 32,
        type: '支出',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 122,
        type: '收入',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 5432,
        type: '收入',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 111,
        type: '支出',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 231,
        type: '支出',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 32,
        type: '支出',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 122,
        type: '收入',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 5432,
        type: '收入',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 111,
        type: '支出',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 231,
        type: '支出',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
    ],

    tempPointDetailList: [
      {
        point: 32,
        type: '支出',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 122,
        type: '收入',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 5432,
        type: '收入',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 111,
        type: '支出',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 231,
        type: '支出',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 32,
        type: '支出',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 122,
        type: '收入',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 5432,
        type: '收入',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 111,
        type: '支出',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 231,
        type: '支出',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 32,
        type: '支出',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 122,
        type: '收入',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 5432,
        type: '收入',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 111,
        type: '支出',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
      {
        point: 231,
        type: '支出',
        reason: "购买XXXX",
        date: "2019-10-11",
        time: "10:11:11"
      },
    ],
    tempTimeInterval: null,
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
    clearTimeout(this.data.tempTimeInterval);
    this.data.tempTimeInterval = null;
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
    if (this.data.loadState == LoadFootItemState.Loading_State_End) {
      return;
    }
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    let that = this;
    this.data.tempTimeInterval = setTimeout(function () {
      that.data.pageIndex = that.data.pageIndex + 1;
      if (that.data.pageIndex >= 5) {
        that.setData({
          loadState: LoadFootItemState.Loading_State_End
        })
      } else {
        that.setData({
          pointDetailList: that.data.pointDetailList.concat(that.data.tempPointDetailList),
          loadState: LoadFootItemState.Loading_State_Normal
        })
      }
    }, 1000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },
})