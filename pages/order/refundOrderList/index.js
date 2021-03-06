// pages/order/refundOrderList/index.js

const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const OrderService = require("../../../services/orderService.js");
const UserService = require("../../../services/userService.js");
const PagePath = require("../../../macros/pagePath.js");
const Config = require("../../../macros/config.js");
const Enum = require("../../../utils/enum.js");
const Util = require("../../../utils/util.js");
const Utils = require("../../../utils/util.js");
const app = getApp();
const Limit = 20;

const ShareManager = require("../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    offset: 0, // 页码
    loadState: LoadFootItemState.Loading_State_Empty, // 底部状态
    currentRole: null,
    dataSource: [], // 数据源
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentRole: UserService.getCurrentRole()
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
    this.data.offset = 0;
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    this.requestData(this.data.offset,
      function getDataCallback(data) {
        Utils.logInfo("获取退货订单： \n" + JSON.stringify(data));
        that.setData({
          dataSource: data,
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
    this.requestData(this.data.offset,
      function getDataCallback(data) {
        Utils.logInfo("获取退货订单： \n" + JSON.stringify(data));
        let tempList = that.data.dataSource.concat(data);
        that.setData({
          dataSource: tempList
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
    return ShareManager.getDefaultShareCard();
  },
  /**
     * 点击单据
     */
  tapToOrderDetail: function (e) {
    let tempOrder = this.data.dataSource[e.currentTarget.dataset.index];
    let tempOrderNo = e.currentTarget.dataset.orderno;
    app.globalData.detailOrder = tempOrder;
    wx.navigateTo({
      url: PagePath.Page_Order_Detail + "?orderno=" + tempOrderNo,
    })
  },

  /**
   * 点击订单商品
   */
  tapItem: function (e) {
    let tempOrder = this.data.dataSource[e.currentTarget.dataset.index];
    let tempItemNo = e.currentTarget.dataset.itemno;
    wx.navigateTo({
      url: PagePath.Page_Mall_CommodityInformation + "?itemno=" + tempItemNo,
    })
  },

  /**
   * 点击订单宠物
   */
  tapPet: function (e) {
    let tempOrder = this.data.dataSource[e.currentTarget.dataset.index];
    let tempPetNo = e.currentTarget.dataset.petno;
    wx.navigateTo({
      url: PagePath.Page_Store_PetsInforMation + '?petno=' + tempPetNo,
    })
  },

  /**
   * 点击订单商家
   */
  tapStore: function (e) {
    let tempOrder = this.data.dataSource[e.currentTarget.dataset.index];
    let tempStoreNo = tempOrder.shop.businessNo;
    wx.navigateTo({
      url: PagePath.Page_Store_StoreInforMation + '?storeno=' + tempStoreNo + '&showtype=' + tempOrder.petNo?"0":"1",
    })
  },

  /**
   * 点击更多
   */
  tapMore: function (e) {
    let tempOrder = this.data.dataSource[e.currentTarget.dataset.index];
    if (this.data.currentRole == 0) {
    }
  },

  /**
   * 点击审核退款
   */
  tapReview: function (e) {
    let tempOrder = this.data.dataSource[e.currentTarget.dataset.index];
    let tempOrderNo = e.currentTarget.dataset.orderno;
    let refundNo = e.currentTarget.dataset.refundno;
    app.globalData.refundReviewOrder = tempOrder;
    wx.navigateTo({
      url: PagePath.Page_Order_Refund_Review + "?orderno=" + tempOrderNo + "&refundno=" + refundNo,
    })
  },

  /**
   * 请求数据
   * @param offset5487
   * @param getDataCallback
   */
  requestData: function (offset, getDataCallback) {
    let param = {
      offset: offset,
      limit: Limit,
      orderType: Enum.Order_Type_Enum.Refund,
    }
    let that = this;
    UserService.isLogin(function isLoginCallback(){
      if (that.data.currentRole == 0) {
        param.customerNo = UserService.getCustomerNo();
        OrderService.customerQueryOrderList(param,
          function queryResultCallback(result) {
            if (Util.checkIsFunction(getDataCallback)) {
              getDataCallback(result.root)
            }
          }
        )
      } else {
        param.businessNo = UserService.getBusinessNo();
        OrderService.businessQueryOrderList(param,
          function queryResultCallback(result) {
            if (Util.checkIsFunction(getDataCallback)) {
              getDataCallback(result.root)
            }
          }
        )
      }
    }, function notLoginCallback() {
      if (Util.checkIsFunction(getDataCallback)) {
        getDataCallback([])
      }
    })
  },
})