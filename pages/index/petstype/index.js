// pages/index/petstype/index.js
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const Page_path = require("../../../macros/pagePath.js");
const PetService = require("../../../services/petService.js");
const Util = require("../../../utils/util.js");
const Utils = require("../../../utils/util")
const Enum = require("../../../utils/enum.js");

const ShareManager = require("../../../services/shareService");

const Limit = 20;

Page({

  /**
   * 页面的初始数据
   *    
   */
  data: {
      pageIndex: 0, // 页码
      loadState: LoadFootItemState.Loading_State_Empty, // 底部状态
      petsTypeData:[],
      type: null,
      tabList: ["狗狗","猫猫"],
      currentTabIndex: 0
  },

  /**
   * 
   */
  handleTabChange: function(e){
    let newIndex = parseInt(e.detail.key);
    if (newIndex != this.data.currentTabIndex) {
      this.setData({
        currentTabIndex: newIndex
      })
      this.changeType();
    }
  },

  changeType:function(typeNo) {
    if (Utils.checkEmpty(typeNo)) {
      this.setData({
        type: this.data.currentTabIndex==0?10000:10001
      })
    }
    wx.startPullDownRefresh({
      success: (res) => {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
    this.changeType(this.data.type);
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
        Utils.logInfo("pet breed : \n" + JSON.stringify(result));
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
      url: Page_path.Page_Home_Nearby + "?genreno=" + e.currentTarget.dataset.genreno + "&requesttype=" + Enum.Nearby_RequestType_Enum.Genre + "&pagetitle=" + e.currentTarget.dataset.name
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },
})