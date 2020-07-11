// pages/me/releaseManager/releaseNew/selectPetGenre/index.js
const ServerManager = require('../../../../../services/serverManager');
const Utils = require('../../../../../utils/util');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    petSortNo: null, // 宠物分类编号
    petGenreList: [], // 宠物品种列表
    searchKeyword: null, /// 搜索关键字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      petSortNo: options.petsortno,
      title: options.petsortno==10000?'狗狗品种':'猫猫品种'
    })
    Utils.logInfo(options.petsortno);
  },

  /**
   * 开始搜索
   * @param {}} e 
   */
  searchConfirm: function(e) {
    wx.startPullDownRefresh({
      complete: (res) => {},
    })
  },

  /**
   * 搜索输入
   * @param {*} e 
   */
  searchInput: function(e) {
    this.data.searchKeyword = e.detail.value;
  },
  
  /**
   * 点击item
   * @param {*} e 
   */
  tapItem: function(e) {
    let index = e.currentTarget.dataset.index;
    let petGener = this.data.petGenreList[index];
    app.globalData.selectedPetGenre = petGener;
    wx.navigateBack({
      complete: (res) => {},
    })
  },

  /**
   * 请求品种数据
   * @param {*} getResultCallback 
   * @param {*} completeCallback 
   */
  requestPetGenerList: function(getGenreCallback, completeCallback) {
    ServerManager.getGenreList(this.data.petSortNo, this.data.searchKeyword, function getPetGenreCallback(genreResult) {
      if (Utils.checkIsFunction(getGenreCallback)) {
        getGenreCallback(genreResult)
      }
    }, function(){
      if (Utils.checkIsFunction(completeCallback)) 
      {
        completeCallback();
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
    wx.startPullDownRefresh();
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
    let that = this;
    this.requestPetGenerList(function(result){
      that.setData({
        petGenreList: result
      })
    }, function() {
      wx.stopPullDownRefresh();
    })
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