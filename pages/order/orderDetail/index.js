// pages/order/orderDetail/index.js

const app = getApp();
const Util = require("../../../utils/util.js");
const Utils = require("../../../utils/util.js");
const Config = require("../../../macros/config.js");
const OrderService = require("../../../services/orderService");
const PagePath = require("../../../macros/pagePath");

const ShareManager = require("../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: null,
    orderNo: null,
    type: null,
    transport: null, // 运输详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Utils.logInfo(JSON.stringify(app.globalData.detailOrder))
    this.setData({
      orderNo: options.orderno,
      type: options.type?options.type:""
    })
    let that = this;
    wx.showLoading({
      title: '加载中...',
    })
    this.requestDetailData(this.data.orderNo, function(res){
      Utils.logInfo(res);
      that.setData({
        order: res
      })
      that.requestPetOrderTransport(that.data.orderNo, function(transportRes){
        wx.hideLoading();
        if (transportRes) {
          Utils.logInfo(transportRes);
          that.setData({
            transport: transportRes
          })
        }
      })
    })
  },

  /**
   * 获取详情
   * @param {*} orderNo 
   * @param {*} getDetailCallback 
   */
  requestDetailData: function(orderNo, getDetailCallback){
    let that = this;
    if (that.data.type == 'pet') {
      that.requestPetDetail(orderNo, function(data){
        Utils.logInfo('---pet---')
        if (Util.checkIsFunction(getDetailCallback)){
          getDetailCallback(data)
        }
      })
    } else if (this.data.type == 'item') {
      Utils.logInfo('---item---')
      that.reuqestItemDetail(orderNo, function(data){
        if (Util.checkIsFunction(getDetailCallback)){
          getDetailCallback(data)
        }
      }) 
    } else {
      that.requestPetDetail(orderNo, function(petData){
        Utils.logInfo('---pet---')
        if (petData) {
          that.setData({
            type : 'pet'
          })
          if (Util.checkIsFunction(getDetailCallback)){
            getDetailCallback(petData)
          }
        } else {
          that.reuqestItemDetail(orderNo, function(itemData){
            Utils.logInfo('---item---')
            that.setData({
              type : 'item'
            })
            if (Util.checkIsFunction(getDetailCallback)){
              getDetailCallback(itemData)
            }
          })
        }
      })
    }
  },

  requestPetDetail: function(orderNo, getDetailCallback) {
    OrderService.getPetOrderDetail(orderNo,function(data){
      if (Util.checkIsFunction(getDetailCallback)) {
        getDetailCallback(data);
      }
    })
  },

  reuqestItemDetail: function(orderNo, getDetailCallback){
    OrderService.getItemOrderDetail(orderNo,function(data){
      if (Util.checkIsFunction(getDetailCallback)) {
        getDetailCallback(data);
      }
    })
  },

  requestPetOrderTransport: function(orderNo, getTransportCallback) {
    if (this.data.type != 'pet') {
      if (Util.checkIsFunction(getTransportCallback)){
        getTransportCallback(null);
      }
      return;
    }
    OrderService.getPetOrderTransport(orderNo, function(data){
      if (Util.checkIsFunction(getTransportCallback)){
        getTransportCallback(data);
      }
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
    return ShareManager.getDefaultShareCard();
  },

  /**
   * 联系买家
   */
  tapBuyerCall: function(e) {
    this.callPhone(e.currentTarget.dataset.phone);
  },
  /**
   * 联系卖家
   */
  tapShopCall: function(e) {
    let phone = e.currentTarget.dataset.phone?e.currentTarget.dataset.phone: Config.Service_Phone;
    this.callPhone(phone);
  },

  /**
   * 呼叫联系人
   */
  callContact: function(e) {
    this.callPhone(e.currentTarget.dataset.phone);
  },

  /**
   * 拨打电话
   * @param {*} phone 
   */
  callPhone: function(phone) {
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },

  /**
   * 查看商品详情
   * @param {*} itemNo 
   */
  tapItemDetail: function(itemNo){
    wx.navigateTo({
      url: PagePath.Page_Mall_CommodityInformation + "?itemno=" + e.currentTarget.dataset.itemno
    })
  },
  /**
   * 查看宠物详情
   * @param {c} petNo 
   */
  tapPetDetail: function(e) {
    wx.navigateTo({
      url: PagePath.Page_Store_PetsInforMation + '?petno=' + e.currentTarget.dataset.petno
    })
  },

  /**
   * 点击提货地址
   */
  tapTakeAddress: function(e) {
    wx.openLocation({
      latitude: this.data.transport.orderTakeDetail.latitude,
      longitude: this.data.transport.orderTakeDetail.longitude,
    })
  },

  /**
   * 点击图片
   */
  tapImage: function (e) {
    let tempOrder = this.data.transport.orderStates[e.currentTarget.dataset.stepindex];
    let tempOrderImageList = [];
    for (let i = 0; i < tempOrder.pictureList.length; i++) {
      let tempOrderImage = tempOrder.pictureList[i];
      tempOrderImageList.push(tempOrderImage.viewAddress);
    }
    let currrentUrl = e.currentTarget.dataset.imageurl;
    wx.previewImage({
      urls: tempOrderImageList,
      current: currrentUrl
    })
  },

  /**
   * 点击打开宠物托运
   */
  tapConfirmOrder: function(){
    wx.navigateToMiniProgram({
      appId: "wxcbdaa290fc45a263",
      path: "pages/index/index2",
      extraData: {
        foo: "release"
      },
      envVersion: "release",
      success(res) {
        // 打开成功
        Utils.logInfo(JSON.stringify(res))
      },
      fail(res) {
        Utils.logInfo(JSON.stringify(res))
      }
    })
  }
})