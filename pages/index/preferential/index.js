// pages/index/preferential/index.js
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const Limit = 10;
const PetService = require("../../../services/petService.js");
const { PetFilterObj } = require("../../../entity/petFilterObj.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pageIndex: 0, // 页码
      loadState: LoadFootItemState.Loading_State_Normal, // 底部状态
      petsInforMation:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.data.pageIndex = 0;
    // 特惠抢购
    let preferentialPetFilter = new PetFilterObj({
      offset: this.data.pageIndex,
      limit: Limit,
    })
    let that = this;
    PetService.getPreferentialPet(preferentialPetFilter,
      function getResultCallback(result) {
        console.log("preferential pet: \n" + JSON.stringify(result));
        wx.stopPullDownRefresh();
        that.setData({
          petsInforMation: result.root,
          pageIndex: that.data.pageIndex + Limit,
          loadState: LoadFootItemState.Loading_State_Normal
        })
      }
    )
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.loadState == LoadFootItemState.Loading_State_End 
    || this.data.loadState == LoadFootItemState.Loading_State_Loading) {
      return;
    }
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    let that = this;
    // 特惠抢购
    let preferentialPetFilter = new PetFilterObj({
      offset: this.data.pageIndex,
      limit: Limit,
    })
    PetService.getPreferentialPet(preferentialPetFilter,
      function getResultCallback(result) {
        console.log("preferential pet: \n" + JSON.stringify(result));
        if (result.root.length < Limit) {
          that.setData({
            petsInforMation: that.data.petsInforMation.concat(result.root),
            loadState: LoadFootItemState.Loading_State_End,
            pageIndex: that.data.pageIndex + Limit,
          })
        } else {
          that.setData({
            petsInforMation: that.data.petsInforMation.concat(result.root),
            pageIndex: that.data.pageIndex + Limit,
            loadState: LoadFootItemState.Loading_State_Normal
          })
        }
      }
    )
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})