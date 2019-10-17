// pages/me/addressManager/index.js

const app = getApp();
const PagePath = require("../../../macros/pagePath.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageHeight: null, // 页面高度
    addressList: [
      {
        addressee: "刘祥林", // 收件人
        phone: "15879067924", // 收件人电话
        province: "江西省", // 省份
        city: "南昌市", // 市
        district: "青山湖区", // 区县
        detailAddress: "北京东路1666号", // 详细地址
        isDefault: true, // 是否默认
      },
      {
        addressee: "李静波", // 收件人
        phone: "16607093121", // 收件人电话
        province: "江西省", // 省份
        city: "南昌市", // 市
        district: "青山湖区", // 区县
        detailAddress: "北京东路1666号北京东路1666号北京东路1666号", // 详细地址
        isDefault: false, // 是否默认
      },
      {
        addressee: "刘祥林", // 收件人
        phone: "15879067924", // 收件人电话
        province: "江西省", // 省份
        city: "南昌市", // 市
        district: "青山湖区", // 区县
        detailAddress: "北京东路1666号", // 详细地址
        isDefault: false, // 是否默认
      },
      {
        addressee: "李静波", // 收件人
        phone: "16607093121", // 收件人电话
        province: "江西省", // 省份
        city: "南昌市", // 市
        district: "青山湖区", // 区县
        detailAddress: "北京东路1666号", // 详细地址
        isDefault: false, // 是否默认
      },
      {
        addressee: "刘祥林", // 收件人
        phone: "15879067924", // 收件人电话
        province: "江西省", // 省份
        city: "南昌市", // 市
        district: "青山湖区", // 区县
        detailAddress: "北京东路1666号", // 详细地址
        isDefault: false, // 是否默认
      },
      {
        addressee: "李静波", // 收件人
        phone: "16607093121", // 收件人电话
        province: "江西省", // 省份
        city: "南昌市", // 市
        district: "青山湖区", // 区县
        detailAddress: "北京东路1666号", // 详细地址
        isDefault: false, // 是否默认
      },
    ], // 地址列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageHeight: app.globalData.pageHeight
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
   * 点击编辑
   */
  tapToEdit: function(e) {
    app.editAddressObj = this.data.addressList[e.currentTarget.dataset.index];
    wx.navigateTo({
      url: PagePath.Page_Me_AddressManager_AddNew,
    })
  },

  /**
   * 点击新增
   */
  tapToAddNew: function() {
    wx.navigateTo({
      url: PagePath.Page_Me_AddressManager_AddNew,
    })
  }
})