// pages/me/releaseManager/releaseNew/index.js

const PagePath = require("../../../../macros/pagePath.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexyRange:["公","母"], // 性别
    sterilizedRange: ["是","否"], // 是否绝育
    transportTypePage: PagePath.Page_Me_ReleaseManager_ReleaseNew_TransportType,

    petType: null,// 宠物品种
    sexy: null, // 宠物性别
    sterilized: null, // 是否绝育
    birthday: null, // 宠物生日
    price: null, // 宠物价格
    commissionRatio: null, // 佣金比例
    transportTypeList: [
      {
        name: "航空",
        price: 600,
      },
      {
        name: "铁路",
        price: 300,
      },
      {
        name: "自提",
        price: 0,
      }
    ], // 运输方式
    uploadImageList:[], // 待上传图片列表
    describe: null, // 描述
    vaccine: {
      date: null, // 日期
      brand: null, // 品牌
    },
    repellent: {
      date: null, // 日期
      brand: null, // 品牌
    },
    identifier: null, // 宠物编号
    parent: {
      father: {
        name: null, // 名称
        imagePath: null, // 图片
      },
      mother: {
        name: null, // 名称
        imagePath: null, // 图片
      }
    }
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
   * 输入品种
   */
  inputPetType: function(e) {
    this.setData({
      petType: e.detail.value
    })
  },

  /**
   * 选择宠物性别
   */
  selectSexy: function(e) {
    this.setData({
      sexy: this.data.sexyRange[e.detail.value]
    })
  },

  /**
   * 选择是否绝育
   */
  selectSterilized: function (e) {
    this.setData({
      sterilized: this.data.sterilizedRange[e.detail.value]
    })
  },

  /**
   * 选择生日
   */
  selectBirthday: function(e) {
    this.setData({
      birthday: e.detail.value
    })
  },

  /**
   * 输入价格
   */
  inputPetPrice: function (e) {
    this.setData({
      price: e.detail.value
    })
  },

  /**
   * 输入佣金比率
   */
  inputCommissionRatio: function(e) {
    this.setData({
      commissionRatio: e.detail.value
    })
  },

  /**
   * 点击添加新上传图片
   */
  tapAddNewUploadImage: function(e) {
    let that = this;
    wx.chooseImage({
      count: 8,
      success: function(res) {
        that.setData({
          uploadImageList: res.tempFilePaths
        })
      },
    })
  },

  /**
   * 输入描述
   */
  inputDescribe: function (e) {
    this.setData({
      describe: e.detail.value
    })
  },

  /**
   * 选择疫苗时间
   */
  selectVaccineDate: function(e) {
    this.data.vaccine.date = e.detail.value;
    this.setData({
      vaccine: this.data.vaccine
    })
  },

  /**
   * 输入疫苗品牌
   */
  inputVaccineBrand: function (e) {
    this.data.vaccine.brand = e.detail.value;
    this.setData({
      vaccine: this.data.vaccine
    })
  },

  /**
   * 选择驱虫时间
   */
  selectRepellentDate: function(e) {
    this.data.repellent.date = e.detail.value;
    this.setData({
      repellent: this.data.repellent
    })
  },

  /**
   * 输入驱虫品牌
   */
  inputRepellentBrand: function(e) {
    this.data.repellent.brand = e.detail.value;
    this.setData({
      repellent: this.data.repellent
    })
  },

  /**
   * 选择父亲图片
   */
  selectFatherImage: function() {
    let that = this;
    wx.chooseImage({
      count:1,
      success: function(res) {
        that.data.parent.father.imagePath = res.tempFilePaths[0];
        that.setData({
          parent: that.data.parent
        })
      },
    })
  },

  /**
   * 选择母亲图片
   */
  selectMotherImage: function() {
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.data.parent.mother.imagePath = res.tempFilePaths[0];
        that.setData({
          parent: that.data.parent
        })
      },
    })
  },

  /**
   * 输入父亲名称
   */
  inputFatherName: function(e) {
    this.data.parent.father.name = e.detail.value;
    this.setData({
      parent: this.data.parent
    })
  },

  /**
   * 输入母亲名称
   */
  inputMotherName: function(e) {

    this.data.parent.mother.name = e.detail.value;
    this.setData({
      parent: this.data.parent
    })
  }
})