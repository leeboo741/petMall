// pages/mall/setmeal/index.js
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const Page_path = require("../../../macros/pagePath.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadState: LoadFootItemState.Loading_State_Normal,  //底部状态
    pageHeight: null,
    petcurrent:0,
    dataSource:[],
    petType:[     

      {
        petName: "小型犬",
        showLine: false
      },

      {
        petName: "中型犬",
        showLine: false
      },

      {
        petName: "大型犬",
        showLine: false
      },

      {
        petName: "猫咪",
        showLine: false
      }
    ],
    
    smallDog:[
      {
        imageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571396946146&di=d2b1ca6dfe8cc4d2a4bfc43d59e35330&imgtype=jpg&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D272765965%2C474111486%26fm%3D214%26gp%3D0.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },

      {
        imageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571396943371&di=63d1fc801e46bcc87319da7f18f1ec00&imgtype=0&src=http%3A%2F%2Fimg1.tianhong.cn%2Fupload%2Fpd%2Fm%2F8882545%2F20178%2F6dbe8d3a030c450cb84447a83426056a_390x390.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
      {
        imageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571396943370&di=185af12e0f693677cc81ad1053683888&imgtype=0&src=http%3A%2F%2Fimg.xinxisea.com%2Fpublic%2Fpcimgs%2F5034%2F154226182558422.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
      {
        imageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571397053716&di=a6049d0ef512a4e9af912d99010fe686&imgtype=jpg&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D2109182631%2C1114131182%26fm%3D214%26gp%3D0.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
      {
        imageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571396943369&di=002bc40c747003a00237213d17791b10&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F18%2F08%2F18%2Fd5e0ab6151cb6c3bd0fa9f35cc8aa6b4.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
      {
        imageUrl: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1159901080,1162278671&fm=15&gp=0.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
      {
        imageUrl: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1159901080,1162278671&fm=15&gp=0.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
      {
        imageUrl: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1159901080,1162278671&fm=15&gp=0.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
    ],

    mediumDog:[
      {
        imageUrl: "http://img.yzcdn.cn/upload_files/2017/12/12/FkYO-DIl3CCLpvZpV01Vb3u8yd-2.jpg?imageView2/2/w/580/h/580/q/75/format/jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },

      {
        imageUrl: "http://img2.imgtn.bdimg.com/it/u=845193979,385595647&fm=26&gp=0.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
      {
        imageUrl: "http://image.cn.made-in-china.com/prodzip/000-eMqaoDpskjcA.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
      {
        imageUrl: "http://img4.imgtn.bdimg.com/it/u=1058702005,2603302569&fm=26&gp=0.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
      {
        imageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
      {
        imageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
    ],

    bigDao:[
      {
        imageUrl: "http://img2.epetbar.com/2015-03/31/e0aa1a77eb6e6118a6d8bb84c2ecbbd2.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },

      {
        imageUrl: "http://img0.imgtn.bdimg.com/it/u=272765965,474111486&fm=214&gp=0.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
      {
        imageUrl: "http://img.yzcdn.cn/upload_files/2017/12/12/FkYO-DIl3CCLpvZpV01Vb3u8yd-2.jpg?imageView2/2/w/580/h/580/q/75/format/jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
      {
        imageUrl: "http://image3.suning.cn/uimg/b2c/newcatentries/0000000000-000000000138594358_4_800x800.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
      {
        imageUrl: "http://img4.imgtn.bdimg.com/it/u=2368063069,2970702729&fm=214&gp=0.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
      {
        imageUrl: "http://img5.imgtn.bdimg.com/it/u=3222407074,726013225&fm=26&gp=0.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
    ],

    cat:[
      {
        imageUrl: "http://img4.imgtn.bdimg.com/it/u=2115990172,2679148114&fm=15&gp=0.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },

      {
        imageUrl: "http://img2.imgtn.bdimg.com/it/u=974297280,4013869476&fm=15&gp=0.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
      {
        imageUrl: "http://www.t-chs.com/tuhsJDEwLmFsaWNkbi5jb20vaTIvMTA1MDY0ODAxMS9PMUNOMDEyOTM1THFFVFp5VVhSb2xfISExMDUwNjQ4MDExJDk.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
      {
        imageUrl: "http://www.tbw-hufu.com/tuhfJDEwLmFsaWNkbi5jb20vaTEvVEIxYVRJbUdwJDZhdyQ2JDYkNl8hISQz.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
      {
        imageUrl: "http://www.tbw-xie.com/tuxieJDAwNCQxNC83MDQ0MDczNzkvVDJJanF0WFhsYyQ2JDZfISE3MDQ0MDczNzkkOQ.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
      {
        imageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options.setMealType)
    var showLine = "petType[" + options.setMealType + "].showLine"; 
    that.setData({
      [showLine]: true,
      pageHeight: app.globalData.pageHeight,
    })

    if (options.setMealType==0){
      that.setData({
        dataSource: that.data.smallDog
      })
    }


    if (options.setMealType == 1) {
      that.setData({
        dataSource: that.data.mediumDog
      })
    }


    if (options.setMealType ==2) {
      that.setData({
        dataSource: that.data.bigDao
      })
    }


    if (options.setMealType == 3) {
      that.setData({
        dataSource: that.data.cat
      })
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

  },

  /**
   * 点击犬类型
   */
  petTypeTap:function(res){
    let that=this;
    var actionIndex = res.currentTarget.dataset.index;
    var showOneLine = "petType[" + 0 + "].showLine";       //值替换
    var showtwoLine = "petType[" + 1 + "].showLine"; 
    var showThreeLine = "petType[" + 2 + "].showLine"; 
    var showFourLine = "petType[" + 3 + "].showLine"; 
    that.setData({
      petcurrent: actionIndex
    })
    //下滑线切换
    if (that.data.petcurrent==0){
        that.setData({
          [showOneLine]:true,
          [showtwoLine]:false,
          [showThreeLine]: false,
          [showFourLine]: false,
          dataSource: that.data.smallDog
        })
    }

    if (that.data.petcurrent == 1) {
      that.setData({
        [showOneLine]: false,
        [showtwoLine]: true,
        [showThreeLine]: false,
        [showFourLine]: false,
        dataSource: that.data.mediumDog
      })
    }

    if (that.data.petcurrent == 2) {
      that.setData({
        [showOneLine]: false,
        [showtwoLine]: false,
        [showThreeLine]: true,
        [showFourLine]: false,
        dataSource: that.data.bigDao
      })
    }

    if (that.data.petcurrent == 3) {
      that.setData({
        [showOneLine]: false,
        [showtwoLine]: false,
        [showThreeLine]: false,
        [showFourLine]: true,
        dataSource: that.data.cat
      })
    }
  },

  /**加载更多 */

  loadiongtap: function () {
    console.log("到底了哟！！");
    this.setData({
      loadState: LoadFootItemState.Loading_State_End
    })
  },

  /**
  * 点击商品详情
  */
  commodityInforMationTap: function (e) {

    var actinoKey = e.currentTarget.dataset.key

    console.log(actinoKey);

    let information = JSON.stringify(actinoKey);

    wx.navigateTo({
      url: Page_path.Page_Mall_CommodityInformation + '?resinfo=' + encodeURIComponent(information)
    })

  }

})