// pages/order/sendOrderList/index.js

const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const PageSize = 20;
const UserService = require("../../../services/userService.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 0, // 页码
    loadState: LoadFootItemState.Loading_State_Empty, // 底部状态
    currentRole: null,

    dataSource: [
      {
        orderNo: "2232232232232232",
        orderDate: "2019-10-11",
        orderTime: "10:11:11",
        payTime: "2019-10-11 12:11:11", // 最后付款时间
        orderClose: false,
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
      {
        orderNo: "1232232232232232",
        orderDate: "2019-10-11",
        orderTime: "10:11:11",
        payTime: "2019-10-11 12:11:11", // 最后付款时间
        orderClose: true,
        orderAmount: 123,
        goods: [
          {
            goodsName: "猫粮",
            goodsType: "主粮",
            goodsPrice: 500,
            goodsSexy: null,
            goodsCount: 2,
            goodsUnit: "袋",
            goodsAmount: 300,
            goodsImagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
          },
        ],
        store: {
          storeName: "萌宠小屋",
          storeLogoPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571138693420&di=fee3aa2a043f375cdb1cbb90f9380c2a&imgtype=0&src=http%3A%2F%2Fd5.file.680.com%2FItem%2F2018-6%2F20%2F10596211_201862011416.jpg"
        }
      },
      {
        orderNo: "2232232232232232",
        orderDate: "2019-10-11",
        orderTime: "10:11:11",
        payTime: "2019-10-11 12:11:11", // 最后付款时间
        orderClose: false,
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
      {
        orderNo: "1232232232232232",
        orderDate: "2019-10-11",
        orderTime: "10:11:11",
        payTime: "2019-10-11 12:11:11", // 最后付款时间
        orderClose: true,
        orderAmount: 123,
        goods: [
          {
            goodsName: "猫粮",
            goodsType: "主粮",
            goodsPrice: 500,
            goodsSexy: null,
            goodsCount: 2,
            goodsUnit: "袋",
            goodsAmount: 300,
            goodsImagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
          },
        ],
        store: {
          storeName: "萌宠小屋",
          storeLogoPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571138693420&di=fee3aa2a043f375cdb1cbb90f9380c2a&imgtype=0&src=http%3A%2F%2Fd5.file.680.com%2FItem%2F2018-6%2F20%2F10596211_201862011416.jpg"
        }
      },
      {
        orderNo: "2232232232232232",
        orderDate: "2019-10-11",
        orderTime: "10:11:11",
        payTime: "2019-10-11 12:11:11", // 最后付款时间
        orderClose: false,
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
      {
        orderNo: "1232232232232232",
        orderDate: "2019-10-11",
        orderTime: "10:11:11",
        payTime: "2019-10-11 12:11:11", // 最后付款时间
        orderClose: true,
        orderAmount: 123,
        goods: [
          {
            goodsName: "猫粮",
            goodsType: "主粮",
            goodsPrice: 500,
            goodsSexy: null,
            goodsCount: 2,
            goodsUnit: "袋",
            goodsAmount: 300,
            goodsImagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
          },
        ],
        store: {
          storeName: "萌宠小屋",
          storeLogoPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571138693420&di=fee3aa2a043f375cdb1cbb90f9380c2a&imgtype=0&src=http%3A%2F%2Fd5.file.680.com%2FItem%2F2018-6%2F20%2F10596211_201862011416.jpg"
        }
      },
    ], // 数据源
    sellerDataSource: [
      {
        orderNo: "2232232232232232",
        orderDate: "2019-10-11",
        orderTime: "10:11:11",
        payTime: "2019-10-11 12:11:11", // 最后付款时间
        orderClose: false,
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
        customer: {
          customerName: "逗啊逗",
          customerAvatarPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571228473763&di=7983ab89537ae923fc13b05acf6baf04&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F28%2F20160928230144_QARdX.thumb.700_0.png"
        }
      },
      {
        orderNo: "1232232232232232",
        orderDate: "2019-10-11",
        orderTime: "10:11:11",
        payTime: "2019-10-11 12:11:11", // 最后付款时间
        orderClose: true,
        orderAmount: 123,
        goods: [
          {
            goodsName: "猫粮",
            goodsType: "主粮",
            goodsPrice: 500,
            goodsSexy: null,
            goodsCount: 2,
            goodsUnit: "袋",
            goodsAmount: 300,
            goodsImagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
          },
        ],
        customer: {
          customerName: "溜啊溜",
          customerAvatarPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571228473763&di=7983ab89537ae923fc13b05acf6baf04&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F28%2F20160928230144_QARdX.thumb.700_0.png"
        }
      },
      {
        orderNo: "2232232232232232",
        orderDate: "2019-10-11",
        orderTime: "10:11:11",
        payTime: "2019-10-11 12:11:11", // 最后付款时间
        orderClose: false,
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
        customer: {
          customerName: "逗啊逗",
          customerAvatarPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571228473763&di=7983ab89537ae923fc13b05acf6baf04&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F28%2F20160928230144_QARdX.thumb.700_0.png"
        }
      },
      {
        orderNo: "1232232232232232",
        orderDate: "2019-10-11",
        orderTime: "10:11:11",
        payTime: "2019-10-11 12:11:11", // 最后付款时间
        orderClose: true,
        orderAmount: 123,
        goods: [
          {
            goodsName: "猫粮",
            goodsType: "主粮",
            goodsPrice: 500,
            goodsSexy: null,
            goodsCount: 2,
            goodsUnit: "袋",
            goodsAmount: 300,
            goodsImagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
          },
        ],
        customer: {
          customerName: "溜啊溜",
          customerAvatarPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571228473763&di=7983ab89537ae923fc13b05acf6baf04&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F28%2F20160928230144_QARdX.thumb.700_0.png"
        }
      },
      {
        orderNo: "2232232232232232",
        orderDate: "2019-10-11",
        orderTime: "10:11:11",
        payTime: "2019-10-11 12:11:11", // 最后付款时间
        orderClose: false,
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
        customer: {
          customerName: "逗啊逗",
          customerAvatarPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571228473763&di=7983ab89537ae923fc13b05acf6baf04&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F28%2F20160928230144_QARdX.thumb.700_0.png"
        }
      },
      {
        orderNo: "1232232232232232",
        orderDate: "2019-10-11",
        orderTime: "10:11:11",
        payTime: "2019-10-11 12:11:11", // 最后付款时间
        orderClose: true,
        orderAmount: 123,
        goods: [
          {
            goodsName: "猫粮",
            goodsType: "主粮",
            goodsPrice: 500,
            goodsSexy: null,
            goodsCount: 2,
            goodsUnit: "袋",
            goodsAmount: 300,
            goodsImagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
          },
        ],
        customer: {
          customerName: "溜啊溜",
          customerAvatarPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571228473763&di=7983ab89537ae923fc13b05acf6baf04&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F28%2F20160928230144_QARdX.thumb.700_0.png"
        }
      },
    ],
    currentRole: null,


    tempDataSource: [
      {
        orderNo: "2232232232232232",
        orderDate: "2019-10-11",
        orderTime: "10:11:11",
        payTime: "2019-10-11 12:11:11", // 最后付款时间
        orderClose: false,
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
      {
        orderNo: "1232232232232232",
        orderDate: "2019-10-11",
        orderTime: "10:11:11",
        payTime: "2019-10-11 12:11:11", // 最后付款时间
        orderClose: true,
        orderAmount: 123,
        goods: [
          {
            goodsName: "猫粮",
            goodsType: "主粮",
            goodsPrice: 500,
            goodsSexy: null,
            goodsCount: 2,
            goodsUnit: "袋",
            goodsAmount: 300,
            goodsImagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
          },
        ],
        store: {
          storeName: "萌宠小屋",
          storeLogoPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571138693420&di=fee3aa2a043f375cdb1cbb90f9380c2a&imgtype=0&src=http%3A%2F%2Fd5.file.680.com%2FItem%2F2018-6%2F20%2F10596211_201862011416.jpg"
        }
      },
    ],
    tempSellerDataSource: [
      {
        orderNo: "2232232232232232",
        orderDate: "2019-10-11",
        orderTime: "10:11:11",
        payTime: "2019-10-11 12:11:11", // 最后付款时间
        orderClose: false,
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
        customer: {
          customerName: "逗啊逗",
          customerAvatarPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571228473763&di=7983ab89537ae923fc13b05acf6baf04&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F28%2F20160928230144_QARdX.thumb.700_0.png"
        }
      },
      {
        orderNo: "1232232232232232",
        orderDate: "2019-10-11",
        orderTime: "10:11:11",
        payTime: "2019-10-11 12:11:11", // 最后付款时间
        orderClose: true,
        orderAmount: 123,
        goods: [
          {
            goodsName: "猫粮",
            goodsType: "主粮",
            goodsPrice: 500,
            goodsSexy: null,
            goodsCount: 2,
            goodsUnit: "袋",
            goodsAmount: 300,
            goodsImagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
          },
        ],
        customer: {
          customerName: "溜啊溜",
          customerAvatarPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571228473763&di=7983ab89537ae923fc13b05acf6baf04&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F28%2F20160928230144_QARdX.thumb.700_0.png"
        }
      },
    ],
    tempTimeInterval: null,
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
    clearTimeout(this.data.tempTimeInterval);
    this.data.tempTimeInterval = null;
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
    if (this.data.loadState == LoadFootItemState.Loading_State_End) {
      return;
    }
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    let that = this;
    this.data.tempTimeInterval = setTimeout(function () {
      that.data.pageIndex = that.data.pageIndex + 1;
      if (that.data.pageIndex >= 5) {
        that.setData({
          loadState: LoadFootItemState.Loading_State_End
        })
      } else {
        if (that.data.currentRole == 0) {
          that.setData({
            dataSource: that.data.dataSource.concat(that.data.tempDataSource),
            loadState: LoadFootItemState.Loading_State_Normal
          })
        } else {
          that.setData({
            sellerDataSource: that.data.sellerDataSource.concat(that.data.tempSellerDataSource),
            loadState: LoadFootItemState.Loading_State_Normal
          })
        }
      }
    }, 1000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})