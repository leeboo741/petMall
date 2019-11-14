// pages/me/releaseManager/index.js

const Limit = 20;
const app = getApp();
const Util = require("../../../utils/util.js");
const PagePath = require("../../../macros/pagePath.js");
const PetService = require("../../../services/petService.js");
const UserService = require("../../../services/userService.js");
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 0, // 页码
    loadState: LoadFootItemState.Loading_State_Empty, // 底部状态
    releaseList: [], // 已发布宠物列表
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
    this.data.offset = 0;
    let that = this;
    this.requestReleasePetList(this.data.offset, 
      function getResultCallback(data) {
        console.log("release list : \n" + JSON.stringify(data));
        that.setData({
          releaseList: data,
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
    this.requestReleasePetList(this.data.offset,
      function getResultCallback(data) {
        let tempList = that.data.releaseList.concat(data);
        that.setData({
          releaseList: tempList
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

  }, 

  /**
   * 点击上架
   */
  tapOnShelves: function (e) {
    wx.showLoading({
      title: '请稍等...',
    })
    let index = e.currentTarget.dataset.index;
    let tempPet = this.data.releaseList[index];
    let that = this;
    PetService.onOrOffShelves(
      {
        petNo: tempPet.petNo,
        itemState: 1,
      },
      function resultCallback(result) {
        console.log("上架 :\n" + JSON.stringify(result));
        if (result.root >= 1) {
          wx.showToast({
            title: '上架成功',
            icon:'none'
          })
          that.data.releaseList[index].itemState = 1;
          that.setData({
            releaseList: that.data.releaseList
          })
        } else {
          wx.showToast({
            title: '上架插入失败',
            icon: 'none'
          })
        }
      }
    )
  },

  /**
   * 点击下架
   */
  tapOffShelves: function (e) {
    wx.showLoading({
      title: '请稍等...',
    })
    let index = e.currentTarget.dataset.index;
    let tempPet = this.data.releaseList[index];
    let that = this;
    PetService.onOrOffShelves(
      {
        petNo: tempPet.petNo,
        itemState: 0,
      },
      function resultCallback(result) {
        console.log("下架 :\n" + JSON.stringify(result));
        if (result.root >= 1) {
          wx.showToast({
            title: '下架成功',
            icon: 'none'
          })
          that.data.releaseList[index].itemState = 0;
          that.setData({
            releaseList: that.data.releaseList
          })
        } else {
          wx.showToast({
            title: '下架插入失败',
            icon: 'none'
          })
        }
      }
    )
  },

  /**
   * 点击编辑
   */
  tapEdit: function (e) {
    app.globalData.editReleasePet = this.data.releaseList[e.currentTarget.dataset.index];
    wx.navigateTo({
      url: PagePath.Page_Me_ReleaseManager_ReleaseNew + "?type=1",
    })
  },

  /**
   * 点击发布新宠
   */
  tapAddNewRelease: function () {
    wx.navigateTo({
      url: PagePath.Page_Me_ReleaseManager_ReleaseNew + "?type=0",
    })
  },

  /**
   * 请求宠物数据
   * @param offset
   * @param getReleasePetCallback
   */
  requestReleasePetList: function(offset, getReleasePetCallback) {
    PetService.getReleaseList(
      {
        businessNo: UserService.getBusinessNo(),
        offset: offset,
        limit: Limit
      },
      function getResultCallback(result) {
        if (Util.checkIsFunction(getReleasePetCallback)) {
          getReleasePetCallback(result.root)
        }
      }
    )
  }
})