// pages/me/releaseManager/releaseNew/selectTransportType/index.js

const Util = require("../../../../../utils/util.js");
const Utils = require("../../../../../utils/util")
const app = getApp();

const ShareManager = require("../../../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    transportList: [
      {
        name: "航空", // 名称
        price: null, // 价格
        useable: false, // 可用
      },
      {
        name: "专车", // 名称
        price: null, // 价格
        useable: false, // 可用
      },
      {
        name: "大巴", // 名称
        price: null, // 价格
        useable: false, // 可用
      },
      {
        name: "铁路", // 名称
        price: null, // 价格
        useable: false, // 可用
      },
      {
        name: "自提", // 名称
        price: null, // 价格
        useable: false, // 可用
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!Util.checkEmpty(app.globalData.selectTransportList)) {
      for (let i = 0; i < this.data.transportList.length; i++) {
        let tempTransport = this.data.transportList[i];
        for (let j = 0; j < app.globalData.selectTransportList.length; j ++) {
          let tempSelectTransport = app.globalData.selectTransportList[j];
          if (tempTransport.name == tempSelectTransport.name) {
            tempTransport.useable = true;
            tempTransport.price = tempSelectTransport.price;
          }
        }
      }
      this.setData({
        transportList: this.data.transportList
      })
      app.globalData.selectTransportList = null;
    }
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
    return ShareManager.getDefaultShareCard();
  },

  /**
   * 点击 选择 取消
   */
  tapSelected: function (e) {
    let tempTransport = this.data.transportList[e.currentTarget.dataset.index];
    tempTransport.useable = !tempTransport.useable;
    this.setData({
      transportList: this.data.transportList
    })
  },

  /**
   * 输入价格
   */
  inputPrice: function (e) {
    let tempTransport = this.data.transportList[e.currentTarget.dataset.index];
    tempTransport.price = e.detail.value;
    if (Util.checkEmpty(e.detail.value)) {
      tempTransport.price = null;
    }
    this.setData({
      transportList: this.data.transportList
    })
  },

  /**
   * 确认选择
   */
  confirmSelected: function () {
    Utils.logInfo("确定选择: \n" + JSON.stringify(this.data.transportList));
    let selectTransportList = this.getSelectTransportList();
    if (!Util.checkEmpty(selectTransportList)) {
      app.globalData.selectTransportList = selectTransportList;
      wx.navigateBack({
        
      })
    }
  },

  /**
   * 获取并检查选中的运输方式
   * @return selectTransportList
   */
  getSelectTransportList: function() {
    let haveSelected = false;
    let selectTransportList = [];
    for (let index = 0; index < this.data.transportList.length; index++) {
      let tempTransport = this.data.transportList[index];
      if (tempTransport.useable) {
        haveSelected = true;
        if (Util.checkEmpty(tempTransport.price)) {
          wx.showToast({
            title: "请输入 " + tempTransport.name + " 价格" ,
            icon: 'none'
          })
          return null;
        } else {
          selectTransportList.push(tempTransport);
        }
      }
    }
    if (!haveSelected) {
      wx.showToast({
        title: '请选择至少一种运输方式',
        icon: 'none'
      })
      return null;
    }
    return selectTransportList;
  },
})