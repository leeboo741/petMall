// pages/poststation/order/serviceTimeSelected/index.js
const TimeUtils = require("../../../../lee-components/utils/timeUtils.js")

const app = getApp();
const ShareManager = require("../../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    business:{
      businessName: "棕榈园店",
      startTime: "10:00",
      endTime: "23:00",
      icon: "http://www.baidu.com"
    },
    weekDayList:null,
    selectWeekDayIndex: 0,
    timeListForDay: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", '14:00', "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", '21:00'],
    // selectTime:{
    //   dayWeekIndex: 0,
    //   timeIndex:0,
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      weekDayList: TimeUtils.getWeekDayList(new Date())
    });
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
    return ShareManager.getDefaultShareCard();
  },

  tapWeekDayItem: function(res) {
    let index = res.currentTarget.dataset.index;
    if (index != this.data.selectWeekDayIndex) {
      this.setData({
        selectWeekDayIndex: index
      })
    }
  },
  tapTimeItem: function(res) {
    let index = res.currentTarget.dataset.index;
    let dateStr = this.data.weekDayList[this.data.selectWeekDayIndex].dateStr;
    app.globalData.selectServiceTimeObj = {
      dateStr: dateStr,
      timeStr: this.data.timeListForDay[index]
    }
    wx.navigateBack({
      
    })
  }
})