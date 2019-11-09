// pages/me/collect/index.js

const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const PageSize = 20;
const PagePath = require("../../../macros/pagePath.js");
const Util =  require("../../../utils/util.js");
const PetService = require("../../../services/petService.js");
const UserService = require("../../../services/userService.js");
const MallService = require("../../../services/mallService.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    naviHeight: 0,
    pageIndex: 0, // 页码
    loadState: LoadFootItemState.Loading_State_Empty, // 底部状态
    collectionList: [],
    itemCollectionList: [],
    currentTabIndex: 0,
    tabList: [
      "宠物",
      "商品"
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      naviHeight: app.globalData.naviHeight
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
    let that = this;
    if (this.data.currentTabIndex == 0) {
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
    } else {
      this.requestGetItemCollection(UserService.getCustomerNo(),
        function getItemCollectionCallback(data) {
          that.setData({
            itemCollectionList: data,
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
    }
    
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
   * 选择tab
   */
  handleTabChange: function(e) {
    this.setData({
      currentTabIndex: e.detail.key,
      loadState: LoadFootItemState.Loading_State_Empty
    })
    wx.startPullDownRefresh();
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
   * 点击商品收藏卡片
   */
  tapItemCollection: function (e) {
    wx.navigateTo({
      url: PagePath.Page_Mall_CommodityInformation + "?itemno=" + e.currentTarget.dataset.itemno,
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
   * 点击商品取消收藏
   */
  cancelItemCollection: function (e) {
    this.requestDeleteItemCollection(e.currentTarget.dataset.itemno, UserService.getCustomerNo(),
      function deleteItemCollectionCallback(result) {
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
  },

  /**
   * 请求商品收藏列表
   * @param customerNo
   * @param getItemCollectionCallback
   */
  requestGetItemCollection: function (customerNo, getItemCollectionCallback) {
    MallService.getItemCollection(customerNo,
      function getResultCallback(result) {
        if (Util.checkIsFunction(getItemCollectionCallback)) {
          getItemCollectionCallback(result.root)
        }
      }
    )
  },

  /**
   * 删除商品收藏
   * @param itemNo 
   * @param customerNo
   * @param deleteItemCollectionCallback
   */
  requestDeleteItemCollection: function (itemNo, customerNo, deleteItemCollectionCallback) {
    MallService.deleteItemCollection(
      {
        customerNo: customerNo,
        itemNo: itemNo
      },
      function deleteResultCallback(result) {
        if (Util.checkIsFunction(deleteItemCollectionCallback)) {
          deleteItemCollectionCallback(result.root)
        }
      }
    )
  },
})