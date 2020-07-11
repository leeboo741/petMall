// pages/order/unsendOrderList/confirmSend/expressSelected/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentExpress: null,
    expressList: [
      "申通",'圆通',"中通","顺丰",'韵达','达达','美团','百世',"邮政",'其他'
    ]
  },

  tapExpress: function(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      currentExpress: this.data.expressList[index]
    })
  },
  tapConfirm: function() {
    app.globalData.selectedExpress = this.data.currentExpress
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.express && options.express != 'null') {
      this.setData({
        currentExpress: options.express
      })
    } else {
      this.setData({
        currentExpress: this.data.expressList[0]
      })
    }
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

  }
})