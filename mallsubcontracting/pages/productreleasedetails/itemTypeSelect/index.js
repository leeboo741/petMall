// mallsubcontracting/pages/productreleasedetails/itemTypeSelect/index.js
const MallService = require("../../../../services/mallService");
const Utils = require("../../../../utils/util");
const app = getApp();
const ShareService = require("../../../../services/shareService");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemTypeList: [], // 产品分类列表
    selectItemTypeList: [], // 选中的分类列表
    selectItemTypeNameList: [], // 选中的分类名称列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (!Utils.checkEmpty(app.globalData.selectItemTypeList)) {
      this.setData({
        selectItemTypeList: app.globalData.selectItemTypeList
      })
      app.globalData.selectItemTypeList = null;
    }
    this.getItemTypeList(function(dataSource) {
      that.setData({
        itemTypeList: dataSource
      })
      that.selectedStateChange();
    })
  }, 
  /**
    * 获得商品类型
    */
  getItemTypeList: function(callBack) {
    let obj = {
      offset: 0,
      limit: 200
    }
    MallService.getMallPetType(obj, function(dataSource) {
      callBack(dataSource)
    })
  },

  /**
   * 确定选择
   * @param {*} e 
   */
  tapComfirm: function() {
    app.globalData.selectItemTypeList = this.data.selectItemTypeList;
    wx.navigateBack({
    })
  },

  /**
   * 点击分类
   * @param {*} e 
   */
  tapItemType: function(e){
    let itemType = this.data.itemTypeList[e.currentTarget.dataset.index];
    if (itemType.selected) {
      for (let i = this.data.selectItemTypeList.length - 1; i >=0 ; i--) {
        let tempItemType = this.data.selectItemTypeList[i];
        if (itemType.itemTypeNo === tempItemType.itemTypeNo) {
          this.data.selectItemTypeList.splice(i, 1);
          break;
        }
      }
    } else {
      this.data.selectItemTypeList.push(itemType);
    }
    this.selectedStateChange();
  },

  /**
   * 选中状态改变
   */
  selectedStateChange: function() {
    if (!Utils.checkEmpty(this.data.itemTypeList)) {
      for (let i = 0; i < this.data.itemTypeList.length ; i ++) {
        let itemType = this.data.itemTypeList[i];
        if (Utils.checkEmpty(this.data.selectItemTypeList)) {
          itemType.selected = false;
        } else {
          let selected = false;
          for (let tempItemType of this.data.selectItemTypeList) {
            if (tempItemType.itemTypeNo === itemType.itemTypeNo) {
              selected = true;
              break;
            }
          }
          itemType.selected = selected;
        }
      }
    } 
    this.setData({
      itemTypeList: this.data.itemTypeList
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