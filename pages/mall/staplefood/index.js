// pages/mall/ff/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    titleSelectIndex:1, //默认选择
    titleSelectList:[ 
      {
        selectInfo:"品种",
        showSelect: true      //icon 切换
      },
      {
        selectInfo: "宠粮",
        showSelect: true  
      },
      {
        selectInfo: "品牌",
        showSelect: true  
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 头部下拉选择显示
   */
  titleSelectTap:function(e){
    let that=this;
    console.log(JSON.stringify(e))
    var selectType = e.currentTarget.dataset.index;  //下标
    var upone = "titleSelectList[" + 0 + "].showSelect";  //数组进行字符串拼接
    var uptwo = "titleSelectList[" + 1 + "].showSelect";
    var upthree = "titleSelectList[" + 2 + "].showSelect";
    this.setData({
      titleSelectIndex: selectType,
    })

    if (selectType==0){
        that.setData({
          [upone]: !that.data.titleSelectList[0].showSelect,  //替换数组里的某个属性
          [uptwo]: true,

          [upthree]: true
        })
    }

    if (selectType == 0) {
      that.setData({
        [upone]: !that.data.titleSelectList[0].showSelect,  //替换数组里的某个属性
        [upone]: true,

        [upone]: true
      })
    }

    if (selectType == 0) {
      that.setData({
        [upone]: !that.data.titleSelectList[0].showSelect,  //替换数组里的某个属性
        [upone]: true,

        [upone]: true
      })
    }

  }

  
})