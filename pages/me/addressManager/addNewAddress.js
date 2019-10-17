// pages/me/addressManager/addNewAddress.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageTitle: null,
    buttonTitle: null,
    pageHeight: null,
    editAddress: null, 
    type:null, // 类型 0 新增 1 修改

    addressee: null, // 输入 收件人
    phone: null, // 输入 电话
    region: null, // 输入 区域
    detailAddress: null, // 输入 详细地址
    isDefault: false, // 输入 默认
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const tempEditAddress = app.editAddressObj;
    if (tempEditAddress == null) {
      this.setData({
        pageHeight: app.globalData.pageHeight,
        pageTitle: "新增收货地址",
        buttonTitle: "新增地址",
        type: 0,
        editAddress: {},
        addressee: "",
        phone: "",
        region: [],
        detailAddress: "",
      })
    } else {
      this.setData({
        editAddress: tempEditAddress,
        pageHeight: app.globalData.pageHeight,
        pageTitle: "编辑收货地址",
        buttonTitle: "保存地址",
        type: 1,
        addressee: tempEditAddress.addressee,
        phone: tempEditAddress.phone,
        region: [
          tempEditAddress.province,
          tempEditAddress.city,
          tempEditAddress.district,
        ],
        detailAddress: tempEditAddress.detailAddress,
        isDefault: tempEditAddress.isDefault,
      })
    }
    app.editAddressObj = null;
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
   * 输入联系人
   */
  inputAddressee: function (e) {
    this.data.addressee = e.detail.value
  },

  /**
   * 输入电话
   */
  inputPhone: function(e) {
    this.data.phone = e.detail.value
  },

  /**
   * 选择区域
   */
  selectRegion: function(e) {
    this.data.region = e.detail.value
  },

  /**
   * 输入详细地址
   */
  inputDetailAddress: function(e) {
    this.data.detailAddress = e.detail.value
  },

  /**
   * 选择默认
   */
  checkDefault: function(e) {
    this.data.isDefault = e.detail.value
  },

  /**
   * 确认提交
   */
  tapToAddNew: function(e) {
    this.data.editAddress = {
      addressee: this.data.addressee,
      phone: this.data.phone,
      province: this.data.region[0],
      city: this.data.region[1],
      district: this.data.region[2],
      detailAddress: this.data.detailAddress,
      isDefault: this.data.isDefault
    }
    if (type == 0) {

    } else {

    }
  }
})