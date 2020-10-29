// pages/me/distribution/index.js
const UserService = require("../../../services/userService.js");
const DescriptionService = require("../../../services/descriptionService.js");
const PagePath = require("../../../macros/pagePath.js");
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const Limit = 20;
const Util = require("../../../utils/util.js");
const Utils = require("../../../utils/util")

let userInfoRole = wx.getStorageSync("currentRole");
const ShareManager = require("../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    pageHeight: null,

    loadState: LoadFootItemState.Loading_State_Normal, // 底部状态

    dataSourceType: [], //选择框数据类型

    petsInforMation: null,  //分销列表


    startDate: "",
    endDate: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    this.setData({
      winHeight: winHeight,
      pageHeight: getApp().globalData.pageHeight,
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
    wx.startPullDownRefresh();
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
    this.data.pageIndex = 0;
    DescriptionService.queryDescriptionList(that.getPetFilterObj(this.data.pageIndex), function (dataSource) {
      Utils.logInfo("分销列表:" + JSON.stringify(dataSource.data.root));
      wx.stopPullDownRefresh();
      if (dataSource != null) {
        that.setData({
          petsInforMation: dataSource.data.root,
          pageIndex: that.data.pageIndex + Limit
        })
        if (dataSource.data.root != null) {
          if (dataSource.data.root.length >= Limit) {
            that.setData({
              loadState: LoadFootItemState.Loading_State_Normal
            })
          } else if (dataSource.data.root.length < Limit && dataSource.data.root.length > 0) {
            that.setData({
              loadState: LoadFootItemState.Loading_State_End
            })
          } else {
            that.setData({
              loadState: LoadFootItemState.Loading_State_Empty
            })
          }
        }
      }
    })
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
    DescriptionService.queryDescriptionList(that.getPetFilterObj(this.data.pageIndex), function (dataSource) {

      wx.stopPullDownRefresh();
      if (dataSource != null) {
        let tempList = that.data.petsInforMation.concat(dataSource.data.root);
        that.setData({
          petsInforMation: tempList
        })
        that.data.pageIndex = that.data.pageIndex + Limit;
        if (dataSource.data.root.length >= Limit) {
          that.setData({
            loadState: LoadFootItemState.Loading_State_Normal
          })
        } else {
          that.setData({
            loadState: LoadFootItemState.Loading_State_End
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },

  compareOptionsDate: function () {
    if (!Util.checkEmpty(this.data.startDate) && !Util.checkEmpty(this.data.endDate)) {
      let tempStart = new Date(Date.parse(this.data.startDate.replace('-', '/')));
      let tempEnd = new Date(Date.parse(this.data.endDate.replace('-', '/')));
      if (tempStart < tempEnd) {
        wx.startPullDownRefresh();
      } else {
        this.setData({
          endDate: null
        })
        wx.showToast({
          title: '结束时间早于开始时间',
          icon: 'none'
        })
      }
    }
  },

  selectStartDate: function (res) {
    this.setData({
      startDate: res.detail.value,
    })
    this.compareOptionsDate();
  },


  selectEndDate: function (res) {
    this.setData({
      endDate: res.detail.value
    })
    this.compareOptionsDate();
  },

  tapClear: function (res) {
    this.setData({
      startDate: null,
      endDate: null,
    })
    wx.startPullDownRefresh();
  },

  /**
   * 点击宠物
   */
  tapPets: function (e) {
    wx.navigateTo({
      url: PagePath.Page_Store_PetsInforMation + '?petno=' + e.currentTarget.dataset.petno
    })
  },


  /**
  * 获取PetFilterObj
      titleSelectIndex:0, //下拉信息下标
     actionIndex:0,  //所选框下标
  */
  getPetFilterObj: function (offset) {
    let that = this;

    let petFilterObj = {
      businessNo: UserService.getBusinessNo(),
      startDate: this.data.startDate ? this.data.startDate : null,
      endDate: this.data.endDate ? this.data.endDate : null,
      offset: offset,
      limit: Limit,
    }
    Utils.logInfo("Pet Filter Obj:\n" + JSON.stringify(petFilterObj));
    return petFilterObj;
  },

  /**
   * 点击
   */
  tapItem: function(e) {
    let index = e.currentTarget.dataset.index;
    let item = this.data.petsInforMation[index];
    wx.navigateTo({
      url: PagePath.Page_Order_Detail + "?orderno=" + item.linkNo
    })
  }

})