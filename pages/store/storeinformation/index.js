// pages/store/storeinformation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

    dataSource:[],
    evaluate:[]
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
      [showOneLine]:true
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

  }

})