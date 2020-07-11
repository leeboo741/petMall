
const app = getApp();
const Utils = require("../../../utils/util.js");
const ShareManager = require("../../../services/shareService");

Page({
  data: {
    bannerList: [
      {
        img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582019708546&di=921c3c70a26179bd44f3d190dc78657e&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D2247852322%2C986532796%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D853"
      },
      {
        img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582019708545&di=af785c6c1ebbc8cd28386457b59f193b&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D3363001160%2C1163944807%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D830"
      },
    ],
    businessObj: null,
  },
  onShow: function () {

  },
  onLoad: function (options) {
    if (app.globalData.serviceSelectBusiness) {
      this.setData({
        businessObj: app.globalData.serviceSelectBusiness,
        bannerList: [{img:app.globalData.serviceSelectBusiness.business.headImg}]
      })
    }
  },
  phonecall: function (res) {
    wx.makePhoneCall({
      phoneNumber: res.currentTarget.dataset.phonenumber,
    })
  },
  navigation: function (res) {
    var o = {
      lat: res.currentTarget.dataset.latitude,
      lng: res.currentTarget.dataset.latitude,
      name: res.currentTarget.dataset.businessname
    };
    var a = JSON.parse(JSON.stringify(o));
    Utils.openBaiduLocation(a);
  },
  choseshop: function (res) {

  },
  godppj: function (res) {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },
});