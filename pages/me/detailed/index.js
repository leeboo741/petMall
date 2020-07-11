// pages/me/detailed/index.js
const WithdrawalService=require("../../../services/withdrawalService.js");
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const UserService=require("../../../services/userService.js");
const Page_Size=20;
const ShareManager = require("../../../services/shareService");
const Utils = require("../../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessNo:null,
    businessDetailed:[],
    loadState: LoadFootItemState.Loading_State_Normal, // 底部状态
    offset:0, //页数
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let businessNo = options.businessno;
    this.setData({
      businessNo: businessNo
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
    this.data.offset = 0;
    let that=this;
    let followObj = {
      businessNo: UserService.getBusinessNo(),
      offset: that.data.offset,
      limit: Page_Size,
    } //关注接口对象

    WithdrawalService.getBusinessFlow(followObj, function (dataSorce) {
      Utils.logInfo("流水：====> \n" + JSON.stringify(dataSorce))
      that.setData({
        businessDetailed: dataSorce.root,
      })
      if (dataSorce.root.length > 0) {
        that.setData({
          loadState: LoadFootItemState.Loading_State_End
        })
      } else {
        that.setData({
          loadState: LoadFootItemState.Loading_State_Empty
        })
      }
      wx.stopPullDownRefresh();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.loadState == LoadFootItemState.Loading_State_End) {
      return;
    }
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    let that = this;

      let followObj = {
        businessNo: UserService.getBusinessNo(),
        offset: that.data.offset,
        limit: Page_Size
      } //关注对象
    WithdrawalService.getBusinessFlow(followObj, function (dataSorce) {
      let tempList = that.data.businessDetailed.concat(dataSorce.root);
        that.setData({
          businessDetailed: tempList,
        })
        that.data.offset = that.data.offset + Limit;
        if (data.root.length > 0) {
          that.setData({
            loadState: LoadFootItemState.Loading_State_End
          })
        } else {
          that.setData({
            loadState: LoadFootItemState.Loading_State_Empty
          })
        }
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },

  /**
   * 余额明细
   *  petsInforMation: that.data.petsInforMation.concat(result.root),
            pageIndex: that.data.pageIndex + Limit,
            loadState: LoadFootItemState.Loading_State_Normal
            Url_BusinessFlow
   */
  getBusinessFlowInfo:function(){

    //  let that=this;
    //  WithdrawalService.getBusinessFlow(that.data.businessNo,that.data.startIndex,Page_Size,function callBack(dataSource){
    //    Utils.logInfo("余额明细：" + JSON.stringify(dataSource))
    //    if(dataSource.root.length<=0){
    //      that.setData({
    //        loadState: LoadFootItemState.Loading_State_Empty
    //      })
    //    }else{
    //      that.setData({
    //        businessDetailed: that.data.businessDetailed.concat(dataSource.root),
    //        startIndex: that.data.startIndex + Page_Size,
    //      })
    //       if (dataSource.root.length<20){
    //         that.setData({
    //           loadState: LoadFootItemState.Loading_State_End
    //         })
    //       }else{
    //         that.setData({
    //           loadState: LoadFootItemState.Loading_State_Normal
    //         })
    //       }
    //    }
    //  })
  }
})