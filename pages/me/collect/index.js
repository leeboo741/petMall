// pages/me/collect/index.js

const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const PageSize = 20;
const PagePath = require("../../../macros/pagePath.js");
const Util =  require("../../../utils/util.js");
const PetService = require("../../../services/petService.js");
const UserService = require("../../../services/userService.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 0, // 页码
    loadState: LoadFootItemState.Loading_State_Empty, // 底部状态
    collectionList: [],
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
    let that = this;
    this.requestGetPetCollectionList(UserService.getCustomerNo(),
      function getPetCollectionCallback(data) {
        that.setData({
          collectionList: data,
        })
        if (data.length > 0) {
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

  },

  /**
   * 点击宠物收藏卡片
   */
  tapPetCollection: function (e) {
    wx.navigateTo({
      url: PagePath.Page_Store_PetsInforMation + '?petno=' + e.currentTarget.dataset.petno,
    })
  },

  /**
   * 点击宠物取消收藏
   */
  cancelPetCollection: function(e) {
    this.requestDeletePetCollection(e.currentTarget.dataset.petno, UserService.getCustomerNo(),
      function deletePetCollectionCallback(result) {
        console.log("Delete collection :\n" + JSON.stringify(result));
        wx.showToast({
          title: result,
        })
        wx.startPullDownRefresh();
      }
    )
  },

  /**
   * 获取宠物收藏列表
   * @param customerNo
   * @param getPetCollectionCallback
   */
  requestGetPetCollectionList: function (customerNo, getPetCollectionCallback) {
    PetService.getPetCollection(customerNo,
      function getResultCallback(result) {
        if (Util.checkIsFunction(getPetCollectionCallback)) {
          getPetCollectionCallback(result.root)
        }
      }
    )
  },

  /**
   * 删除宠物收藏
   * @param petNo 
   * @param customerNo
   * @param deletePetCollectionCallback
   */
  requestDeletePetCollection: function (petNo, customerNo, deletePetCollectionCallback) {
    PetService.deletePetCollection(
      {
        customerNo: customerNo,
        petNo: petNo
      },
      function deleteResultCallback(result) {
        if (Util.checkIsFunction(deletePetCollectionCallback)) {
          deletePetCollectionCallback(result.root)
        }
      }
    )
  }
})