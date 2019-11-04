// pages/index/petstype/index.js
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const Page_path = require("../../../macros/pagePath.js");
const PetService = require("../../../services/petService.js");
const Util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pageIndex: 0, // 页码
      loadState: LoadFootItemState.Loading_State_Empty, // 底部状态
      petsTypeData:[],
      type: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
    wx.startPullDownRefresh();
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
    let that = this;
    PetService.getBreed(this.data.type,
      function getResultCallback(result){
        console.log("pet breed : \n" + JSON.stringify(result));
        wx.stopPullDownRefresh();
        if (Util.checkEmpty(result.root)) {
          that.setData({
            petsTypeData: result.root,
            loadState: LoadFootItemState.Loading_State_Empty,
          })
        } else {
          that.setData({
            petsTypeData: result.root,
            loadState: LoadFootItemState.Loading_State_End,
          })
        }
      }
    )
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

    /**   
     * 点击图片
     */
  petsTap: function (e) {
    wx.navigateTo({
      url: Page_path.Page_Home_Nearby
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})