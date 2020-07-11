// mallsubcontracting/pages/productreleasedetails/itemTypeSelect/menuTypeSelect.js
const MallService = require("../../../../services/mallService");
const Utils = require("../../../../utils/util");
const app = getApp();
const ShareService = require("../../../../services/shareService");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuTypeList: [], // 产品分类列表
    selectMenuTypeList: [], // 选中的分类列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (!Utils.checkEmpty(app.globalData.selectItemPackList)) {
      this.setData({
        selectMenuTypeList: app.globalData.selectItemPackList
      })
      app.globalData.selectItemPackList = null;
    }
    this.getItemPackList(function(dataSource) {
      that.setData({
        menuTypeList: dataSource
      })
      that.selectedStateChange();
    })
  },

  /**
   * 获得套餐分类
   * @param getSetMenuCallback
   */
  getItemPackList: function(getSetMenuCallback) {
    let obj = {
      offset: 0,
      limit: 200,
    }
    MallService.getSetMealList(obj,
      function getResultCallback(result) {
        if (Utils.checkIsFunction(getSetMenuCallback)) {
          getSetMenuCallback(result.root)

        }
      }
    )
  },

  /**
   * 确定选择
   * @param {*} e 
   */
  tapComfirm: function() {
    app.globalData.selectItemPackList = this.data.selectMenuTypeList;
    wx.navigateBack({
    })
  },

  /**
   * 点击分类
   * @param {*} e 
   */
  tapMenuType: function(e){
    let menuType = this.data.menuTypeList[e.currentTarget.dataset.index];
    if (menuType.selected) {
      for (let i = this.data.selectMenuTypeList.length - 1; i >=0 ; i--) {
        let tempMenuType = this.data.selectMenuTypeList[i];
        if (menuType.itemPackNo === tempMenuType.itemPackNo) {
          this.data.selectMenuTypeList.splice(i, 1);
          break;
        }
      }
    } else {
      this.data.selectMenuTypeList.push(menuType);
    }
    this.selectedStateChange();
  },

  /**
   * 选中状态改变
   */
  selectedStateChange: function() {
    if (!Utils.checkEmpty(this.data.menuTypeList)) {
      for (let i = 0; i < this.data.menuTypeList.length ; i ++) {
        let menuType = this.data.menuTypeList[i];
        if (Utils.checkEmpty(this.data.selectMenuTypeList)) {
          menuType.selected = false;
        } else {
          let selected = false;
          for (let tempMenuType of this.data.selectMenuTypeList) {
            if (tempMenuType.itemPackNo === menuType.itemPackNo) {
              selected = true;
              break;
            }
          }
          menuType.selected = selected;
        }
      }
    } 
    this.setData({
      menuTypeList: this.data.menuTypeList
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
    return ShareService.getDefaultShareCard();
  }
})