// pages/search/index.js

const Limit = 20;
const app = getApp();
const Enum = require("../../utils/enum.js");
const Util = require("../../utils/util.js");
const PagePath = require("../../macros/pagePath.js");
const SearchService = require("../../services/searchService.js");
const LoadFootItemState = require("../../lee-components/leeLoadingFootItem/loadFootObj.js");

const ShareManager = require("../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    offset: 0, // 页码
    loadState: LoadFootItemState.Loading_State_Empty, // 底部状态
    naviHeight: app.globalData.naviHeight,
    searchHistory: [], // 搜索历史
    searchKeyword: null, // 搜索关键字
    searchBrandResult: [], // 搜索商品结果
    searchBreedResult: [], // 搜索品种结果
    searchStoreResult: [], // 搜索商家结果
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
    this.data.offset = 0;
    let that = this;
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    this.requestSearchResult(this.data.searchKeyword, 
      function getResultCallback(result) {
        that.setData({
          searchBrandResult: result.itemList,
          searchBreedResult: result.petGenreList,
          searchStoreResult: result.businesses,
        })
        // that.data.offset = that.data.offset + Limit;
        // if (result.business.length >= Limit) {
        //   that.setData({
        //     loadState: LoadFootItemState.Loading_State_Normal
        //   })
        // } else if (result.business.length < Limit && result.business.length > 0) {
        //   that.setData({
        //     loadState: LoadFootItemState.Loading_State_End
        //   })
        // } else {
        //   that.setData({
        //     loadState: LoadFootItemState.Loading_State_Empty
        //   })
        // }
        wx.stopPullDownRefresh();
      }
    )
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // if (this.data.loadState == LoadFootItemState.Loading_State_End
    //   || this.data.loadState == LoadFootItemState.Loading_State_Loading) {
    //   return;
    // }
    // this.setData({
    //   loadState: LoadFootItemState.Loading_State_Loading,
    // })
    // let that = this;
    // this.requestSearchResult(this.data.searchKeyword,
    //   function getResultCallback(result) {
    //     let tempStoreList = that.data.searchStoreResult.concat(result.business);
    //     that.setData({
    //       searchStoreResult: tempStoreList
    //     })
    //     // that.data.offset = that.data.offset + Limit;
    //     // if (result.business.length >= Limit) {
    //     //   that.setData({
    //     //     loadState: LoadFootItemState.Loading_State_Normal
    //     //   })
    //     // } else {
    //     //   that.setData({
    //     //     loadState: LoadFootItemState.Loading_State_End
    //     //   })
    //     // }
    //   }
    // )
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
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
    wx.startPullDownRefresh();
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
    wx.startPullDownRefresh();
  },

  /**
   * 点击品种item
   */
  tapBreedItem: function (e) {
    let tempIndex = e.currentTarget.dataset.index;
    let tempBreed = this.data.searchBreedResult[tempIndex];
    let tempGenreNo = e.currentTarget.dataset.genreno;
    let tempGenreName = e.currentTarget.dataset.genrename;
    let tempSortNo = e.currentTarget.dataset.sortno;
    wx.navigateTo({
      url: PagePath.Page_Home_Nearby + "?genreno=" + tempGenreNo + "&requesttype=" + Enum.Nearby_RequestType_Enum.Genre + "&pagetitle=" + tempGenreName
    })
  },

  /**
   * 点击品牌item
   */
  tapBrandItem: function (e) {
    let tempIndex = e.currentTarget.dataset.index;
    let tempItem = this.data.searchBrandResult[tempIndex];
    let tempItemNo = e.currentTarget.dataset.itemno;
    wx.navigateTo({
      url: PagePath.Page_Mall_CommodityInformation + "?itemno=" + tempItemNo
    })
  },

  /**
   * 点击商家item
   */
  tapStoreItem: function (e) {
    let tempIndex = e.currentTarget.dataset.index;
    let tempStore = this.data.searchStoreResult[tempIndex];
    let tempStoreNo = e.currentTarget.dataset.storeno;
    wx.navigateTo({
      url: PagePath.Page_Store_StoreInforMation + '?storeno=' + tempStoreNo +"&showtype="+0
    })
  },

  /**
   * 请求搜索结果
   * @param offset
   * @param searchKeyword
   * @param getResultCallback
   */
  requestSearchResult: function ( searchKeyword, getResultCallback) {
    SearchService.getSearchResult(searchKeyword,
      function getSearchResultCallback(result) {
        if (Util.checkIsFunction(getResultCallback)) {
          getResultCallback(result.root)
        }
      }
    )
  }
})