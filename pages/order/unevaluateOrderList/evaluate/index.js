// pages/order/unevaluateOrderList/evaluate/index.js

const UserService = require("../../../../services/userService.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentRole: null, // 当前角色
    starLevel: 1, // 星级
    order: {
      orderNumber: "SDA20123122123121",
      orderDate: "2019-10-11",
      orderTime: "19:11:11",
      orderAmount: 1500,
      store: {
        name: "萌宠宠物店",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571138693420&di=fee3aa2a043f375cdb1cbb90f9380c2a&imgtype=0&src=http%3A%2F%2Fd5.file.680.com%2FItem%2F2018-6%2F20%2F10596211_201862011416.jpg"
      },
      goods: {
        name: "英国短毛猫",
        sexy: "公",
        count: 1,
        unit: "只",
        price: 1500,
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg",
      }
    },
    sellerOrder: {
      orderNumber: "SDA20123122123121",
      orderDate: "2019-10-11",
      orderTime: "19:11:11",
      orderAmount: 1500,
      customer: {
        customerName: "溜啊溜",
        customerAvatarPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571228473763&di=7983ab89537ae923fc13b05acf6baf04&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F28%2F20160928230144_QARdX.thumb.700_0.png"
      },
      goods: {
        name: "英国短毛猫",
        sexy: "公",
        count: 1,
        unit: "只",
        price: 1500,
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg",
      }
    },
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

  }
})