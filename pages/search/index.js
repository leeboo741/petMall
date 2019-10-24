// pages/search/index.js

const app = getApp();
const SearchService = require("../../services/searchService.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    naviHeight: app.globalData.naviHeight,
    pageHeight: app.globalData.pageHeight,
    searchHistory: [], // 搜索历史
    searchKeyword: null, // 搜索关键字
    searchBrandResult: [
      {
        name: "红狗",
        imagePath: "http://www.reddogchina.com/Uploads/article/original_img2/1566877752.jpg",
      }
    ], // 搜索品牌结果
    searchBreedResult: [
      {
        name: "斑点狗",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571912457694&di=0c84b4aeaae678ea76e315df78538b2d&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F78%2F26%2F5bff363b99cad_610.jpg"
      }
    ], // 搜索品种结果
    searchStoreResult: [
      {
        name: "萌宠小屋",
        province: "江西",
        city: "南昌",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571141353757&di=bfa169b0ff9c44c88c56f15c45582967&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0132565a447811a801219741f137ba.jpeg"
      },
      {
        name: "萌宠小屋1",
        province: "江西",
        city: "南昌",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571138693420&di=fee3aa2a043f375cdb1cbb90f9380c2a&imgtype=0&src=http%3A%2F%2Fd5.file.680.com%2FItem%2F2018-6%2F20%2F10596211_201862011416.jpg"
      },
      {
        name: "萌宠小屋2",
        province: "江西",
        city: "南昌",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571138363687&di=18e750383ce1bb7e631e984f87897f57&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b9de5be67338a80120925291fad2.jpg%401280w_1l_2o_100sh.jpg"
      },
      {
        name: "萌宠小屋",
        province: "江西",
        city: "南昌",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571141353757&di=bfa169b0ff9c44c88c56f15c45582967&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0132565a447811a801219741f137ba.jpeg"
      },
      {
        name: "萌宠小屋1",
        province: "江西",
        city: "南昌",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571138693420&di=fee3aa2a043f375cdb1cbb90f9380c2a&imgtype=0&src=http%3A%2F%2Fd5.file.680.com%2FItem%2F2018-6%2F20%2F10596211_201862011416.jpg"
      },
      {
        name: "萌宠小屋2",
        province: "江西",
        city: "南昌",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571138363687&di=18e750383ce1bb7e631e984f87897f57&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b9de5be67338a80120925291fad2.jpg%401280w_1l_2o_100sh.jpg"
      },
    ], // 搜索商家结果
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      searchHistory: SearchService.getSearchHistoryList()
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
   * 搜索
   */
  searchAction: function(e) {
    this.data.searchKeyword = e.detail.value;
    SearchService.saveSearchHistory(e.detail.value);
    this.setData({
      searchHistory: SearchService.getSearchHistoryList(),
    })
  },

  /**
   * 清空历史
   */
  tapDeleteHistory: function () {
    let that = this;
    SearchService.deleteSearchHistory(function deleteCallback(success){
      if (success) {
        that.setData({
          searchHistory: SearchService.getSearchHistoryList()
        })
      }
    })
  },

  /**
   * 点击搜索历史
   */
  tapSearchHistoryItem: function(e) {
    this.setData({
      searchKeyword: this.data.searchHistory[e.currentTarget.dataset.index]
    })
  }
})