// pages/me/collect/index.js

const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const PageSize = 20;
const PagePath = require("../../../macros/pagePath.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 0, // 页码
    loadState: LoadFootItemState.Loading_State_Empty, // 底部状态
    collectionList: [
      {
        collectionDate: '2019-10-11',
        collectionTime: "11:10:11",
        goods:{
          name: "二哈",
          price: 2000,
          province: "江西",
          city: "南昌",
          imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571142592265&di=7a06c842ea2fd44ed79c0819544ef6df&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180119%2Fd006418460834892a15ff56878abef36.jpeg",
        },
      },
      {
        collectionDate: '2019-10-11',
        collectionTime: "11:10:11",
        goods: {
          name: "二哈",
          price: 2000,
          province: "江西",
          city: "南昌",
          imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571142592265&di=7a06c842ea2fd44ed79c0819544ef6df&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180119%2Fd006418460834892a15ff56878abef36.jpeg",
        },
      },
      {
        collectionDate: '2019-10-11',
        collectionTime: "11:10:11",
        goods: {
          name: "二哈",
          price: 2000,
          province: "江西",
          city: "南昌",
          imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571142592265&di=7a06c842ea2fd44ed79c0819544ef6df&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180119%2Fd006418460834892a15ff56878abef36.jpeg",
        },
      },
      {
        collectionDate: '2019-10-11',
        collectionTime: "11:10:11",
        goods: {
          name: "二哈",
          price: 2000,
          province: "江西",
          city: "南昌",
          imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571142592265&di=7a06c842ea2fd44ed79c0819544ef6df&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180119%2Fd006418460834892a15ff56878abef36.jpeg",
        },
      },
      {
        collectionDate: '2019-10-11',
        collectionTime: "11:10:11",
        goods: {
          name: "二哈",
          price: 2000,
          province: "江西",
          city: "南昌",
          imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571142592265&di=7a06c842ea2fd44ed79c0819544ef6df&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180119%2Fd006418460834892a15ff56878abef36.jpeg",
        },
      },
      {
        collectionDate: '2019-10-11',
        collectionTime: "11:10:11",
        goods: {
          name: "二哈",
          price: 2000,
          province: "江西",
          city: "南昌",
          imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571142592265&di=7a06c842ea2fd44ed79c0819544ef6df&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180119%2Fd006418460834892a15ff56878abef36.jpeg",
        },
      },
    ], // 收藏列表

    tempCollectionList: [
      {
        collectionDate: '2019-10-11',
        collectionTime: "11:10:11",
        goods: {
          name: "二哈",
          price: 2000,
          province: "江西",
          city: "南昌",
          imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571142592265&di=7a06c842ea2fd44ed79c0819544ef6df&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180119%2Fd006418460834892a15ff56878abef36.jpeg",
        },
      },
      {
        collectionDate: '2019-10-11',
        collectionTime: "11:10:11",
        goods: {
          name: "二哈",
          price: 2000,
          province: "江西",
          city: "南昌",
          imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571142592265&di=7a06c842ea2fd44ed79c0819544ef6df&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180119%2Fd006418460834892a15ff56878abef36.jpeg",
        },
      },
      {
        collectionDate: '2019-10-11',
        collectionTime: "11:10:11",
        goods: {
          name: "二哈",
          price: 2000,
          province: "江西",
          city: "南昌",
          imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571142592265&di=7a06c842ea2fd44ed79c0819544ef6df&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180119%2Fd006418460834892a15ff56878abef36.jpeg",
        },
      },
      {
        collectionDate: '2019-10-11',
        collectionTime: "11:10:11",
        goods: {
          name: "二哈",
          price: 2000,
          province: "江西",
          city: "南昌",
          imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571142592265&di=7a06c842ea2fd44ed79c0819544ef6df&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180119%2Fd006418460834892a15ff56878abef36.jpeg",
        },
      },
      {
        collectionDate: '2019-10-11',
        collectionTime: "11:10:11",
        goods: {
          name: "二哈",
          price: 2000,
          province: "江西",
          city: "南昌",
          imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571142592265&di=7a06c842ea2fd44ed79c0819544ef6df&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180119%2Fd006418460834892a15ff56878abef36.jpeg",
        },
      },
      {
        collectionDate: '2019-10-11',
        collectionTime: "11:10:11",
        goods: {
          name: "二哈",
          price: 2000,
          province: "江西",
          city: "南昌",
          imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571142592265&di=7a06c842ea2fd44ed79c0819544ef6df&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180119%2Fd006418460834892a15ff56878abef36.jpeg",
        },
      },
    ], // 收藏列表
    tempTimeInterval: null,
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
    clearTimeout(this.data.tempTimeInterval);
    this.data.tempTimeInterval = null;
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
          collectionList: that.data.collectionList.concat(that.data.tempCollectionList),
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