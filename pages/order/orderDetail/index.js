// pages/order/orderDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {
      store: {
        name: "萌宠宠物店",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571138693420&di=fee3aa2a043f375cdb1cbb90f9380c2a&imgtype=0&src=http%3A%2F%2Fd5.file.680.com%2FItem%2F2018-6%2F20%2F10596211_201862011416.jpg",
        phone: "0793-3222112",
      },
      goods: {
        name: "英国短毛猫",
        sexy: "公",
        count: 1,
        unit: "只",
        price: 1500,
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg",
      },
      price: {
        goodsPrice: 1500,
        freight: 200,
        couponOffset: 10,
        pointOffset: 0,
      },
      customer: {
        name: "刘先生",
        phone: "15879067924",
        province: "江西省",
        city: "南昌市",
        district: "青山湖区",
        detailAddress: "北京东路1666号",
      },
      orderNumber: "DSA1221231211123",
      orderDate: "2019-10-11",
      orderTime: "10:11:12",
      orderAmount: 1500,
    }
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

  }
})