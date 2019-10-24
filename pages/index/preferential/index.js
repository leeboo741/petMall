// pages/index/preferential/index.js
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tempTimeInterval: null,
      pageIndex: 0, // 页码
      loadState: LoadFootItemState.Loading_State_Normal, // 底部状态
      petsInforMation:[
         {
            petsImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063563&di=687bb2e28307037e4c8c8b4e16789e80&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F53e85bc3bb3d0.jpg",
            petsName:"泰斗1",
            petsPrice:1280,
            originalPrice:1680,
            petsAddress:"江西南昌"
         },

        {
          petsImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063563&di=687bb2e28307037e4c8c8b4e16789e80&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F53e85bc3bb3d0.jpg",
          petsName: "泰斗2",
          petsPrice: 1280,
          originalPrice: 1680,
          petsAddress: "江西南昌"
        },

        {
          petsImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063563&di=687bb2e28307037e4c8c8b4e16789e80&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F53e85bc3bb3d0.jpg",
          petsName: "泰斗3",
          petsPrice: 1280,
          originalPrice: 1680,
          petsAddress: "江西南昌"
        },

        {
          petsImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063563&di=687bb2e28307037e4c8c8b4e16789e80&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F53e85bc3bb3d0.jpg",
          petsName: "泰斗4",
          petsPrice: 1280,
          originalPrice: 1680,
          petsAddress: "江西南昌"
        },

        {
          petsImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063563&di=687bb2e28307037e4c8c8b4e16789e80&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F53e85bc3bb3d0.jpg",
          petsName: "泰斗5",
          petsPrice: 1280,
          originalPrice: 1680,
          petsAddress: "江西南昌"
        },

        {
          petsImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063563&di=687bb2e28307037e4c8c8b4e16789e80&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F53e85bc3bb3d0.jpg",
          petsName: "泰斗6",
          petsPrice: 1280,
          originalPrice: 1680,
          petsAddress: "江西南昌"
        },
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
    if (this.data.loadState == LoadFootItemState.Loading_State_End) {
      return;
    }
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    let that = this;
    this.data.tempTimeInterval = setTimeout(function () {
      that.data.pageIndex = that.data.pageIndex + 1;
      if (that.data.pageIndex >= 5) {
        that.setData({
          loadState: LoadFootItemState.Loading_State_End
        })
      } else {
        that.setData({
          petsInforMation: that.data.petsInforMation.concat(that.data.petsInforMation),
          loadState: LoadFootItemState.Loading_State_Normal
        })
      }
    }, 1000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})