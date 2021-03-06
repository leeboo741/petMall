// pages/mall/evaluate/index.js

const PetService = require("../../../services/petService.js");
const MallService = require("../../../services/mallService.js");
const Util = require("../../../utils/util.js");
const Utils = require("../../../utils/util")
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const EvaluateService=require("../../../services/evaluateService.js");
const Limit = 20;

const Evaluate_Type_Pet = 0;
const Evaluate_Type_Item = 1;
const ShareManager = require("../../../services/shareService");

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
    Utils.logInfo(tempPetNo + "----" + tempItemNo);
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
    let that=this;
    this.data.offset = 0;
    this.getEvaluateData(this.data.offset, 
      function getDataCallback(data) {
        that.setData({
          evaluationInformation: data,
        })
        that.data.offset = that.data.offset + Limit;
        if (data.length >= Limit) {
          that.setData({
            loadState: LoadFootItemState.Loading_State_Normal
          })
        } else if (data.length < Limit && data.length > 0) {
          that.setData({
            loadState: LoadFootItemState.Loading_State_End
          })
        } else {
          that.setData({
            loadState: LoadFootItemState.Loading_State_Empty
          })
        }
        wx.stopPullDownRefresh();
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
    this.getEvaluateData(this.data.offset,
      function getDataCallback(data) {
        let tempList = that.data.evaluationInformation.concat(data);
        that.setData({
          evaluationInformation: tempList
        })
        that.data.offset = that.data.offset + Limit;
        if (data.length >= Limit) {
          that.setData({
            loadState: LoadFootItemState.Loading_State_Normal
          })
        } else {
          that.setData({
            loadState: LoadFootItemState.Loading_State_End
          })
        }
      }
    )
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },

  /**
   * 获取评价数据
   * @param offset
   * @param getEvaluateCallback
   */
  getEvaluateData: function (offset, getEvaluateCallback) {
    let that = this;
    if (that.data.type == Evaluate_Type_Pet) {
      that.requestPetEvaluate(that.data.offset,
        function getPetEvaluateCallback(data) {
          Utils.logInfo("Pet More Evaluate: \n" + JSON.stringify(data));
          if (Util.checkIsFunction(getEvaluateCallback)) {
            getEvaluateCallback(data)
          }
        }
      )
    } else if (that.data.type == Evaluate_Type_Item) {
      that.requestItemEvaluate(that.data.offset,
        function getItemEvaluateCallback(data) {
          Utils.logInfo("Item More Evaluate: \n" + JSON.stringify(data));
          if (Util.checkIsFunction(getEvaluateCallback)) {
            getEvaluateCallback(data)
          }
        }
      )
    }
  },

  /**
   * 请求宠物评价列表
   * @param offset
   * @param getPetEvaluateCallback
   */
  requestPetEvaluate: function (offset, getEvaluateCallback) {
    let that=this;
    EvaluateService.petEvaluate(
      {
        petNo: that.data.petNo,
        offset: offset,
        limit: Limit
      },
      function getResultCallback(result) {
        if (Util.checkIsFunction(getEvaluateCallback)) {
          getEvaluateCallback(result);
        }
      }
    )
  },

  /**
   * 请求商品评价列表
   * @param offset
   * @param getItemEvaluateCallback
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