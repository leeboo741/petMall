// pages/order/refundOrderList/refund/review.js

const PagePath = require("../../../../macros/pagePath.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {
      orderNo: "2232232232232232",
      orderDate: "2019-10-11",
      orderTime: "10:11:11",
      orderAmount: 123,
      goods: [
        {
          goodsName: "英国短毛猫",
          goodsType: "PET",
          goodsPrice: 2000,
          goodsSexy: "公",
          goodsCount: 1,
          goodsUnit: "只",
          goodsAmount: 300,
          goodsImagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
        }
      ],
      store: {
        storeName: "萌宠宠物店",
        storeLogoPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571141353757&di=bfa169b0ff9c44c88c56f15c45582967&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0132565a447811a801219741f137ba.jpeg"
      }
    },

    refundReason: "不想要了", // 退款原因
    refundEvidence: [
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571141353757&di=bfa169b0ff9c44c88c56f15c45582967&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0132565a447811a801219741f137ba.jpeg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571141353757&di=bfa169b0ff9c44c88c56f15c45582967&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0132565a447811a801219741f137ba.jpeg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg",
    ], // 退款凭证
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 点击驳回
   */
  tapReject: function () {
    wx.navigateTo({
      url: PagePath.Page_Order_Refund_Review_Reject,
    })
  },

  /**
   * 点击批准
   */
  tapApprove: function () {
    wx.navigateTo({
      url: PagePath.Page_Order_Refund_Review_Approve,
    })
  }
})