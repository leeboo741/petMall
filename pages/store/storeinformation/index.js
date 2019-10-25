// pages/store/storeinformation/index.js
const app = getApp();
const Page_path = require("../../../macros/pagePath.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageHeight:null,
    showPetsPage:false,
    showEvaluate: true,
    showIntroduction:true,
    buisnessCurrent:0,
    businessDataSource:[],
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
    evaluationInformation: [   //商家评价
      {
        userName: "刘大仙",
        userImageUrl: "http://img005.hc360.cn/m6/M09/94/6B/wKhQolb07DuEFsI8AAAAAEyvm8c183.jpg",
        evaluationTime: "两天前",
        starsNumber: 3,
        information: "（默认好评）通过平台担保交易买到一只皇家幼猫BK34奶糕粮2Kg",
        evaluationImage: //评论图片
        [
        "http://img005.hc360.cn/m6/M09/94/6B/wKhQolb07DuEFsI8AAAAAEyvm8c183.jpg",
        "http://img005.hc360.cn/m6/M09/94/6B/wKhQolb07DuEFsI8AAAAAEyvm8c183.jpg",
        ]
      },

      {
        userName: "杨大仙",
        userImageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        evaluationTime: "2019-10-18",
        starsNumber: 4,
        information: "（默认好评）通过平台担保交易买到一只皇家幼猫BK34奶糕粮2Kg",
        evaluationImage: ""
      },

      {
        userName: "李大仙",
        userImageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        evaluationTime: "2019-10-15",
        starsNumber: 5,
        information: "（默认好评）通过平台担保交易买到一只皇家幼猫BK34奶糕粮2Kg",
        evaluationImage: ""
      },

      {
        userName: "俞大仙",
        userImageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        evaluationTime: "2019-10-15",
        starsNumber: 5,
        information: "（默认好评）通过平台担保交易买到一只皇家幼猫BK34奶糕粮2Kg",
        evaluationImage: ""
      },

      {
        userName: "张大仙",
        userImageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        evaluationTime: "2019-10-15",
        starsNumber: 5,
        information: "（默认好评）通过平台担保交易买到一只皇家幼猫BK34奶糕粮2Kg",
        evaluationImage: ""
      },

      {
        userName: "幸大仙",
        userImageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        evaluationTime: "2019-10-15",
        starsNumber: 5,
        information: "（默认好评）通过平台担保交易买到一只皇家幼猫BK34奶糕粮2Kg",
        evaluationImage: ""
      },

      {
        userName: "付大仙",
        userImageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        evaluationTime: "2019-10-15",
        starsNumber: 5,
        information: "（默认好评）通过平台担保交易买到一只皇家幼猫BK34奶糕粮2Kg",
        evaluationImage: ""
      },

      {
        userName: "牛大仙",
        userImageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        evaluationTime: "2019-10-15",
        starsNumber: 5,
        information: "（默认好评）通过平台担保交易买到一只皇家幼猫BK34奶糕粮2Kg",
        evaluationImage: ""
      },

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var showOneLine = "buisnessList[" + 0 + "].showLine";
    let that=this;
    let requestOptions = JSON.parse(decodeURIComponent(options.resinfo));
    console.log(requestOptions);
    that.setData({
      businessDataSource: requestOptions,
      [showOneLine]:true,
      pageHeight: app.globalData.pageHeight
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
    let actionIndex = encodeURIComponent(JSON.stringify(res.currentTarget.dataset.index));
    let actionItem = encodeURIComponent(JSON.stringify(res.currentTarget.dataset.item));
    wx.navigateTo({
      url: Page_path.Page_Store_PetsInforMation + '?petsindex=' + actionIndex + "&petsitem=" + actionItem
    })
    console.log(actionItem);
  }

})