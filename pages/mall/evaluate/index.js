// pages/mall/evaluate/index.js

const PetService = require("../../../services/petService.js");
const MallService = require("../../../services/mallService.js");
const Util = require("../../../utils/util.js");
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");

const Limit = 20;

const Evaluate_Type_Pet = 0;
const Evaluate_Type_Item = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    evaluationInformation: [],

    loadState: LoadFootItemState.Loading_State_Empty,  //底部状态
    offset: 0,

    petNo: null,
    itemNo: null,

    type: Evaluate_Type_Pet,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tempPetNo = options.petno;
    let tempItemNo = options.itemno;
    if (Util.checkEmpty(tempPetNo) && Util.checkEmpty(tempItemNo)) {
      console.error("Evaluate petNo 和 Evaluate ItemNo 不能同时为空");
    }
    if (!Util.checkEmpty(tempPetNo)) {
      this.setData({
        petNo: tempPetNo,
        type: Evaluate_Type_Pet,
      })
    }
    if (!Util.checkEmpty(tempItemNo)) {
      this.setData({
        itemNo: tempItemNo,
        type: Evaluate_Type_Item,
      })
    }
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
    this.data.offset = 0;
    if (this.data.type == Evaluate_Type_Pet) {
      this.requestPetEvaluate(this.data.offset, 
        function getPetEvaluateCallback(data) {
          console.log ("Pet More Evaluate: \n" + JSON.stringify(data));
        }
      )
    } else if (this.data.type == Evaluate_Type_Item) {
      this.requestItemEvaluate(this.data.offset,
        function getItemEvaluateCallback(data) {
          console.log("Item More Evaluate: \n" + JSON.stringify(data));
        }
      )
    }
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
   * 请求宠物评价列表
   */
  requestPetEvaluate: function (offset, getPetEvaluateCallback) {
    PetService.getMorePetEvaluate(
      {
        petNo: this.data.petNo,
        offset: offset,
        limit: Limit
      },
      function getResultCallback(result) {
        if (Util.checkIsFunction(getPetEvaluateCallback)) {
          getPetEvaluateCallback(result.root)
        }
      }
    )
  },

  /**
   * 请求商品评价列表
   */
  requestItemEvaluate: function(offset, getItemEvaluateCallback) {
    MallService.getMoreItemEvaluate(
      {
        itemNo: this.data.itemNo,
        offset: offset,
        limit: Limit
      },
      function getResultCallback(result) {
        if (Util.checkIsFunction(getItemEvaluateCallback)) {
          getItemEvaluateCallback(result.root)
        }
      }
    )
  }
})