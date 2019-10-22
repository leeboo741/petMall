// pages/me/authenticateManager/personalAuthenticate/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0, // 认证类型 0 个人 1 商家 2 平台
    title: "个人认证", // navi 标题

    name: null, // 真实名称
    identifier: null, // 身份证号

    imagePathWithIdentifier: null, // 手持身份证 照片

    imagePathWithLicense: null, // 营业执照 照片

    imagePathWithStorefront: null, // 实体 照片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tempType = options.type;
    let tempTitle = null;
    if (tempType == 0) {
      tempTitle = "个人认证";
    } else if (tempType == 1) {
      tempTitle = "商家认证";
    } else {
      tempTitle = "平台认证";
    }
    this.setData({
      type: tempType,
      title: tempTitle
    })

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
   * 输入名称
   */
  inputName: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  /**
   * 输入身份证号
   */
  inputIdentifier: function(e) {
    this.setData({
      identifier: e.detail.value
    })
  },

  /**
   * 选择身份证照片
   */
  selectIdentifierImage: function () {
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        that.setData({
          imagePathWithIdentifier: res.tempFilePaths[0]
        })
      },
    })
  },

  /**
   * 选择营业执照 照片
   */
  selectLicenseImage: function () {
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.setData({
          imagePathWithLicense: res.tempFilePaths[0]
        })
      },
    })
  },

  /**
   * 选择 实体 照片
   */
  selectStorefrontImage: function () {
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.setData({
          imagePathWithStorefront: res.tempFilePaths[0]
        })
      },
    })
  }
})