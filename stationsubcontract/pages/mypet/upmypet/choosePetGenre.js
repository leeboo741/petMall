// stationsubcontract/pages/mypet/upmypet/choosePetGenre.js
const app = getApp();
const ServerManager = require("../../../../services/serverManager.js");
const Utils = require("../../../../utils/util.js");
const ShareManager = require("../../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    petSortList: [], // 宠物一级分类
    petGenreList: [], // 宠物耳机分类
    currentTabIndex: 0,

    keyword: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.getSort(function getSortCallback(sortResult) {
      that.setData({
        petSortList: sortResult
      })
      that.getGenre(that.data.currentTabIndex, that.data.keyword, function getGenreCallback(genreResult) {
        that.setData({
          petGenreList: genreResult
        })
      })
    })
  },
  handleTabChange: function (res) {
    this.setData({
      currentTabIndex: res.detail.key
    })
    let that = this;
    that.setData({
      keyword: null
    })
    this.getGenre(this.data.currentTabIndex, that.data.keyword, function getGenreCallback(genreResult) {
      that.setData({
        petGenreList: genreResult
      })
    })
  },

  /**
   * 搜索框输入
   * @param {*} res 
   */
  confirmSearch: function(res) {
    let that = this;
    that.data.keyword = res.detail.value;
    that.getGenre(that.data.currentTabIndex, that.data.keyword, function getGenreCallback(genreResult) {
      that.setData({
        petGenreList: genreResult
      })
    })
  },

  tapPetGenre: function(res) {
    let index = res.currentTarget.dataset.index;
    let petSort = this.data.petSortList[this.data.currentTabIndex];
    let petGenre = this.data.petGenreList[index];
    app.globalData.choosePetSort = petSort;
    app.globalData.choosePetGenre = petGenre;
    wx.navigateBack({
      
    })
  },
  getSort: function (getSortCallback) {
    ServerManager.getPetSort(function getPetSortCallback(sortResult) {
      if (Utils.checkIsFunction(getSortCallback)) {
        getSortCallback(sortResult)
      }
    })
  },
  getGenre: function (sortIndex, keyword, getGenreCallback) {
    ServerManager.getGenreList(this.data.petSortList[sortIndex].petSortNo, keyword, function getPetGenreCallback(genreResult) {
      if (Utils.checkIsFunction(getGenreCallback)) {
        getGenreCallback(genreResult)
      }
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
    return ShareManager.getDefaultShareCard();
  },
})