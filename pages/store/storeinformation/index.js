// pages/store/storeinformation/index.js
const app = getApp();
const Page_path = require("../../../macros/pagePath.js");
const StoreService = require("../../../services/storeService.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

    storeNo: null, // 商家编号

    pageHeight:null,
    showPetsPage:false,
    showEvaluate: true,
    showIntroduction:true,
    buisnessCurrent:0,
    storeDetail:[],
    buisnessList: [
      {
        title: "宠物",
        showLine: false
      },

      {
        title: "评价",
        showLine: false
      },

      {
        title: "简介",
        showLine: false
      }
    ],

    label:[
      "平台认证","实名认证","已纳押金","商家认证"
    ],

    dataSource:[],
    evaluationInformation: [], // 评价
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var showOneLine = "buisnessList[" + 0 + "].showLine";
    let that=this;
    that.setData({
      [showOneLine]:true,
      pageHeight: app.globalData.pageHeight,
      storeNo: options.storeno
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
    this.getStoreDetail(this.data.storeNo, 
      function getStoreDetailCallback(result) {

      }
    )
  } ,
  
   /**
   * 点击title
   */
  buisnessTap: function (res) {
    let that = this;
    var actionIndex = res.currentTarget.dataset.index;
    var showOneLine = "buisnessList[" + 0 + "].showLine"; //替换数组里面的字段
    var showtwoLine = "buisnessList[" + 1 + "].showLine";
    var showThreeLine = "buisnessList[" + 2 + "].showLine";
    that.setData({
      buisnessCurrent: actionIndex
    })
    //下滑线切换
    if (that.data.buisnessCurrent == 0) {
      that.setData({
        [showOneLine]: true,    //宠物选择框
        [showtwoLine]: false,   //评价选择框
        [showThreeLine]: false, //简介选择框
        dataSource:1,           //数据替换
        showPetsPage: false,    //宠物显示
        showEvaluate: true,     //评价显示
        showIntroduction: true  //简介显示
      })
    }

    if (that.data.buisnessCurrent == 1) {
      that.setData({
        [showOneLine]: false,
        [showtwoLine]: true,
        [showThreeLine]: false,
        dataSource: 2,
        showPetsPage: true,
        showEvaluate: false,
        showIntroduction: true
      })
    }

    if (that.data.buisnessCurrent == 2) {
      that.setData({
        [showOneLine]: false,
        [showtwoLine]: false,
        [showThreeLine]: true,
        dataSource:3,
        showPetsPage: true,
        showEvaluate: true,
        showIntroduction: false
      })
    }

  },

  /**
   * 点击宠物图片跳转
   */
  petsInforTap:function(res){
    wx.navigateTo({
      url: Page_path.Page_Store_PetsInforMation + '?petno=' + res.currentTarget.dataset.petno
    })
    console.log(actionItem);
  },

  /**
   * 获取商家详情
   * @param storeNo
   * @param getStoreDetailResultCallback
   */
  getStoreDetail: function ( storeNo, getStoreDetailResultCallback) {
    StoreService
  }

})