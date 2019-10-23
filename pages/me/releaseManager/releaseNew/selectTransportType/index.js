// pages/me/releaseManager/releaseNew/selectTransportType/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    transportList: [
      {
        name: "航空", // 名称
        price: 600, // 价格
        useable: true, // 可用
      },
      {
        name: "专车", // 名称
        price: 400, // 价格
        useable: true, // 可用
      },
      {
        name: "大巴", // 名称
        price: 200, // 价格
        useable: true, // 可用
      },
      {
        name: "铁路", // 名称
        price: 300, // 价格
        useable: true, // 可用
      },
      {
        name: "航运", // 名称
        price: 500, // 价格
        useable: true, // 可用
      },
      {
        name: "自提", // 名称
        price: 0, // 价格
        useable: true, // 可用
      },
    ],
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
   * 点击 选择 取消
   */
  tapSelected: function (e) {
    let tempTransport = this.data.transportList[e.currentTarget.dataset.index];
    tempTransport.useable = !tempTransport.useable;
    this.setData({
      transportList: this.data.transportList
    })
  },

  /**
   * 输入价格
   */
  inputPrice: function (e) {
    let tempTransport = this.data.transportList[e.currentTarget.dataset.index];
    tempTransport.tempPrice = e.detail.value;
    this.setData({
      transportList: this.data.transportList
    })
  },

  /**
   * 确认选择
   */
  confirmSelected: function () {
    console.log("确定选择: \n" + JSON.stringify(this.data.transportList));
  }
})