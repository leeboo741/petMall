// pages/mall/commodityInformation/index.js
const Page_path = require("../../../macros/pagePath.js");
const MallService = require("../../../services/mallService.js");
const Util = require("../../../utils/util.js");
const UserService = require("../../../services/userService.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemNo: null,
    itemDetailData: null, 
    commodityInforType: [    //商品具体分类信息
      {
        type: "配送",
      },

      {
        type: "分类",
      },

      {
        type: "品牌",
      },

      {
        type: "阶段",
      },

      {
        type: "品种",
      },

      {
        type: "毛重",
      },

      {
        type: "保质",
      },

      {
        type: "适宜",
      },

      {
        type: "口味",
      },

      {
        type: "期限",
      },

      {
        type: "优惠",
      },
    ],
    guaranteeList:[  
        {
          guaranteeHead:"七天无理由退货",
          guaranteeInfor: "卖家只要承诺参加“7天无理由退换货”服务，就必须按本规则提供售后服务，并严格遵守；若买家向卖家提出天无理由退换货”，卖家需积极响应，并主动协商，根据淘宝要求提供相关证明，以期双方自愿友好地达成退货退款协议；"
        },

        {
          guaranteeHead: "消费者保障服务",
          guaranteeInfor: "消费者保障服务是淘宝网推出的旨在保障网络交易中消费者合法权益的服务体系。“商品如实描述”，为加入消费者保障服务的必选项。“7天无理由退换货”、“假一赔三”、“虚拟物品闪电发货”等都是其中的服务之一，由卖家自行选择加入。"
        },

    ], //品质服务保障
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.setData({
      itemNo: options.itemno
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
    this.getItemDetail(this.data.itemNo,
      function getItemDetailCallback(data) {
        that.setData({
          itemDetailData: data[0]
        })
        wx.stopPullDownRefresh();
      }
    )
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
   * 点击跟多评价
   */
  evaluateTap:function(){
    wx.navigateTo({
      url: Page_path.Page_Mall_Evaluate
    })
  },

  /**
   * 担保购买
   */
  goShopTap:function(){
    wx.navigateTo({
      url: Page_path.Page_Mall_Shoppingpayment+"?requestInfo="+this.data.shopDataSource
    })
  },

  /**
   * 点击收藏
   */
  tapCollection: function () {
    wx.showLoading({
      title: '请稍等...',
    })
    if (this.data.itemDetailData.itemFavorites == null || this.data.itemDetailData.itemFavorites.customer == null) {
      MallService.addNewItemCollection(
        {
          itemNo: this.data.itemDetailData.itemNo,
          customerNo: UserService.getCustomerNo()
        },
        function addResultCallback(result) {
          wx.hideLoading();
          console.log(result);
          wx.showToast({
            title: '收藏成功',
          })
          wx.startPullDownRefresh();
        }
      )
    } else {
      MallService.deleteItemCollection(
        {
          itemNo: this.data.itemDetailData.itemNo,
          customerNo: UserService.getCustomerNo()
        },
        function addResultCallback(result) {
          wx.hideLoading();
          console.log(result);
          wx.showToast({
            title: "取消收藏",
          })
          wx.startPullDownRefresh();
        }
      )
    }
  },

  /**
   * 下载商品详情
   * @param itemNo
   * @param getItemDetailCallback
   */
  getItemDetail: function(itemNo, getItemDetailCallback) {
    MallService.getItemDetail(
      {
        itemNo: itemNo,
        limit: 10,
        customerNo: UserService.getCustomerNo(),
      },
      function getResultCallback(result) {
        if (Util.checkIsFunction(getItemDetailCallback)) {
          getItemDetailCallback(result.root)
        }
      }
    )
  }

})