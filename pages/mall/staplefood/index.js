// pages/mall/ff/index.js

const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const app = getApp();

const Page_path = require("../../../macros/pagePath.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageHeight: null,
    loadState: LoadFootItemState.Loading_State_Normal,  //底部状态
     //是否隐藏蒙版
    maskVarietiesShow: true,
    maskFavoritegrainShow: true,
    maskbrandShow: true,
    titleSelectIndex:1, //默认选择
    titleSelectList:[ 
      {
        selectInfo:"品种",
        showSelect: true ,     //icon 切换
      },
      {
        selectInfo: "宠粮",
        showSelect: true  ,
      },
      {
        selectInfo: "品牌",
        showSelect: true  ,
      }
    ],
    dataSourceInfo:[],   //数据
    dataSourceType:[],   //数据类型
    foodGrainList: [
      {
        imageUrl: "http://img.boqiicdn.com/Data/Shop/1/190/19082/shoppicpath11455790231_y.jpg",
        commodity: '信元发育宝冻干成猫粮8kg',
        introduce: "吉纯三拼肉宴冻干猫粮食",
        price: 499,
        originalPrice: 638,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "http://img.boqiicdn.com/Data/Shop/2/221/22191/shoppicpath11478759881_y.jpg",
        commodity: '发育宝-s三拼肉宴冻干幼猫粮8kg',
        introduce: "冻干技术 打造出色口感",
        price: 499,
        originalPrice: 638,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "http://img005.hc360.cn/m6/M09/94/6B/wKhQolb07DuEFsI8AAAAAEyvm8c183.jpg",
        commodity: '五谷九种肉全猫粮加拿大进口GO！',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 309,
        originalPrice: 359,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
    ],  //主粮

    snacksList: [
      {
        imageUrl: "http://pic1.womai.com/upload/601/603/608/362805/362808/362822/362547/630292/630292_1_pic1080_4539.jpg",
        commodity: '信元发育宝冻干成猫粮8kg',
        introduce: "吉纯三拼肉宴冻干猫粮食",
        price: 499,
        originalPrice: 638,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "http://img.boqiicdn.com/Data/Shop/1/176/17672/shoppicpath21440569048_y.jpg",
        commodity: '发育宝-s三拼肉宴冻干幼猫粮8kg',
        introduce: "冻干技术 打造出色口感",
        price: 499,
        originalPrice: 638,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "http://d6.yihaodianimg.com/N04/M06/57/56/CgQDrVPQbjaAG9n1AAFVTwVLhdU24800.jpg",
        commodity: '五谷九种肉全猫粮加拿大进口GO！',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 309,
        originalPrice: 359,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "http://www.tbw-hufu.com/tuhfJDEwLmFsaWNkbi5jb20vaTMvMTk4MTYxNTUzMy9PMUNOMDExcWs5dGRPRDRzaXZpcFJfISExOTgxNjE1NTMzJDk.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
           {
        imageUrl: "http://www.tbw-hufu.com/tuhfJDEwLmFsaWNkbi5jb20vaTMvMTk4MTYxNTUzMy9PMUNOMDExcWs5dGRPRDRzaXZpcFJfISExOTgxNjE1NTMzJDk.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress:"江西南昌666888123号",
        sellerName:"官方养宠顾问"
      }
      ,
      {
        imageUrl: "http://www.tbw-hufu.com/tuhfJDEwLmFsaWNkbi5jb20vaTMvMTk4MTYxNTUzMy9PMUNOMDExcWs5dGRPRDRzaXZpcFJfISExOTgxNjE1NTMzJDk.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      }
      ,
      {
        imageUrl: "http://www.tbw-hufu.com/tuhfJDEwLmFsaWNkbi5jb20vaTMvMTk4MTYxNTUzMy9PMUNOMDExcWs5dGRPRDRzaXZpcFJfISExOTgxNjE1NTMzJDk.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      }
      ,
      {
        imageUrl: "http://www.tbw-hufu.com/tuhfJDEwLmFsaWNkbi5jb20vaTMvMTk4MTYxNTUzMy9PMUNOMDExcWs5dGRPRDRzaXZpcFJfISExOTgxNjE1NTMzJDk.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      }
      ,
      {
        imageUrl: "http://www.tbw-hufu.com/tuhfJDEwLmFsaWNkbi5jb20vaTMvMTk4MTYxNTUzMy9PMUNOMDExcWs5dGRPRDRzaXZpcFJfISExOTgxNjE1NTMzJDk.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      }
      ,
      {
        imageUrl: "http://www.tbw-hufu.com/tuhfJDEwLmFsaWNkbi5jb20vaTMvMTk4MTYxNTUzMy9PMUNOMDExcWs5dGRPRDRzaXZpcFJfISExOTgxNjE1NTMzJDk.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      }
      ,
      {
        imageUrl: "http://www.tbw-hufu.com/tuhfJDEwLmFsaWNkbi5jb20vaTMvMTk4MTYxNTUzMy9PMUNOMDExcWs5dGRPRDRzaXZpcFJfISExOTgxNjE1NTMzJDk.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      }
    ],  //零食

    healthProductsList: [
      {
        imageUrl: "http://www.whnews.cn/dszx/2019/0918/xxfl/hk91/customer/23419/0FWbddtge61UVJwwFjeXvmyfnoqifGQeCw6VBoXV.jpeg",
        commodity: '信元发育宝冻干成猫粮8kg',
        introduce: "吉纯三拼肉宴冻干猫粮食",
        price: 499,
        originalPrice: 638,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "http://www.whnews.cn/dszx/2019/0917/xxfl/hk91/customer/23419/OdmUKR5hbejrYTLAfBanJXfRcZsUJ0nMiovFIURv.jpeg",
        commodity: '发育宝-s三拼肉宴冻干幼猫粮8kg',
        introduce: "冻干技术 打造出色口感",
        price: 499,
        originalPrice: 638,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "http://img1.doubanio.com/view/commodity_story/medium/public/p10623659.jpg",
        commodity: '五谷九种肉全猫粮加拿大进口GO！',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 309,
        originalPrice: 359,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "https://pop.nosdn.127.net/cd699185-97ba-4dc7-9165-6d19d347a9c5?imageView&thumbnail=262x262&quality=90",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "https://pop.nosdn.127.net/cd699185-97ba-4dc7-9165-6d19d347a9c5?imageView&thumbnail=262x262&quality=90",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      }
      ,
      {
        imageUrl: "https://pop.nosdn.127.net/cd699185-97ba-4dc7-9165-6d19d347a9c5?imageView&thumbnail=262x262&quality=90",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      }
      ,
      {
        imageUrl: "https://pop.nosdn.127.net/cd699185-97ba-4dc7-9165-6d19d347a9c5?imageView&thumbnail=262x262&quality=90",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      }
      ,
      {
        imageUrl: "https://pop.nosdn.127.net/cd699185-97ba-4dc7-9165-6d19d347a9c5?imageView&thumbnail=262x262&quality=90",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      }
      ,
      {
        imageUrl: "https://pop.nosdn.127.net/cd699185-97ba-4dc7-9165-6d19d347a9c5?imageView&thumbnail=262x262&quality=90",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      }
      ,
      {
        imageUrl: "https://pop.nosdn.127.net/cd699185-97ba-4dc7-9165-6d19d347a9c5?imageView&thumbnail=262x262&quality=90",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      }
      ,
      {
        imageUrl: "https://pop.nosdn.127.net/cd699185-97ba-4dc7-9165-6d19d347a9c5?imageView&thumbnail=262x262&quality=90",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      }

    ],  //保健品
    articlesList: [
      {
        imageUrl: "https://pop.nosdn.127.net/8e98103a-a971-4ab0-8e56-bafafa290929?imageView&thumbnail=262x262&quality=90",
        commodity: '信元发育宝冻干成猫粮8kg',
        introduce: "吉纯三拼肉宴冻干猫粮食",
        price: 499,
        originalPrice: 638,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "https://pop.nosdn.127.net/75e934b9-0d4b-4a93-bdec-4dc7b48432e0?imageView&thumbnail=262x262&quality=90",
        commodity: '发育宝-s三拼肉宴冻干幼猫粮8kg',
        introduce: "冻干技术 打造出色口感",
        price: 499,
        originalPrice: 638,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "https://pop.nosdn.127.net/b72ffd4e-ca7e-466d-8f9c-b6547910883e?imageView&thumbnail=262x262&quality=90",
        commodity: '五谷九种肉全猫粮加拿大进口GO！',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 309,
        originalPrice: 359,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "https://pop.nosdn.127.net/a8d246c8-db44-414b-b449-645495372682?imageView&thumbnail=262x262&quality=90",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      },
      {
        imageUrl: "https://pop.nosdn.127.net/a8d246c8-db44-414b-b449-645495372682?imageView&thumbnail=262x262&quality=90",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      }
      ,
      {
        imageUrl: "https://pop.nosdn.127.net/a8d246c8-db44-414b-b449-645495372682?imageView&thumbnail=262x262&quality=90",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      }
      ,
      {
        imageUrl: "https://pop.nosdn.127.net/a8d246c8-db44-414b-b449-645495372682?imageView&thumbnail=262x262&quality=90",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      }
      ,
      {
        imageUrl: "https://pop.nosdn.127.net/a8d246c8-db44-414b-b449-645495372682?imageView&thumbnail=262x262&quality=90",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      }
      ,
      {
        imageUrl: "https://pop.nosdn.127.net/a8d246c8-db44-414b-b449-645495372682?imageView&thumbnail=262x262&quality=90",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      }
      ,
      {
        imageUrl: "https://pop.nosdn.127.net/a8d246c8-db44-414b-b449-645495372682?imageView&thumbnail=262x262&quality=90",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629,
        sellerAddress: "江西南昌666888123号",
        sellerName: "官方养宠顾问"
      }
    ] , //用品
    varieties:[
      {
        name: '全部'
      },
      {
        name:'狗狗'
      },
      {
        name: '猫猫'
      }
    ],  //品种下拉信息

    favoriteGrain:[
      {
        name: '全部'
      },
      {
        name: '宠粮'
      },
      {
        name: '零食'
      },
      {
        name: '营养品'
      },
      {
        name: '玩具用品'
      },
      {
        name: '服务'
      },
      {
        name: '套餐'
      }
    ] ,  //宠粮下拉信息

    brand:[
      {
        name: '全部'
      },
      {
        name: '皇家'
      },
      {
        name: '伯纳天纯'
      },
      {
        name: '巴西淘淘'
      },
      {
        name: '巅峰'
      },
      {
        name: '卫仕'
      },
      {
        name: '红狗'
      },
      {
        name: 'MAG'
      }
    ] ,//品牌
    showDropDownMessage:true   //是隐藏下拉框信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var biographyInfo = options.resinfo;  //连接传参进来的值
    var showSecondSelectInfo = "titleSelectList[" + 1 + "].selectInfo"; //下拉框信息[1]字符串拼接
    let that=this;
    that.setData({
      pageHeight: app.globalData.pageHeight
    })
    if (biographyInfo=='主粮'){
      that.setData({
        dataSource: that.data.foodGrainList,
        [showSecondSelectInfo] : '宠粮'
      })
    }

    if (biographyInfo == '零食') {
      that.setData({
        dataSource: that.data.snacksList,
        [showSecondSelectInfo]: '零食'
      })
    }

    if (biographyInfo == '保健') {
      that.setData({
        dataSource: that.data.healthProductsList,
        [showSecondSelectInfo]: '营养品'
      })
    }

    if (biographyInfo == '用品') {
      that.setData({
        dataSource: that.data.articlesList,
        [showSecondSelectInfo]: '玩具用品'
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
   * 头部下拉选择显示
   */
  titleSelectTap:function(e){
    let that=this;
    var selectType = e.currentTarget.dataset.index;  //下标
    var upone = "titleSelectList[" + 0 + "].showSelect";  //数组进行字符串拼接 下拉提示信息1
    var uptwo = "titleSelectList[" + 1 + "].showSelect";    //下拉提示信息2
    var upthree = "titleSelectList[" + 2 + "].showSelect";  //下拉提示信息3
    this.setData({
      titleSelectIndex: selectType,
    })

    if (selectType==0){  //判断类型显示各个属性值
        that.setData({
          [upone]: !that.data.titleSelectList[0].showSelect,  //替换数组里的某个属性
          [uptwo]: true,     //下拉箭头方向
          [upthree]: true,   //下拉箭头方向
          dataSourceType: that.data.varieties, //数据切换
          maskVarietiesShow: !that.data.maskVarietiesShow, //蒙版重复点击
          maskFavoritegrainShow:true,   //其他两块蒙版是否隐藏
          maskbrandShow: true            //其他两块蒙版是否隐藏
        })

    }

    if (selectType == 1) {
      that.setData({
        [uptwo]: !that.data.titleSelectList[1].showSelect, 
        [upone]: true,
        [upthree]: true,
        dataSourceType: that.data.favoriteGrain,
        maskFavoritegrainShow: !that.data.maskFavoritegrainShow,
        maskVarietiesShow:true,
        maskbrandShow:true
      })
    }

    if (selectType == 2) {
      that.setData({
        [upthree]: !that.data.titleSelectList[2].showSelect, 
        [upone]: true,
        [uptwo]: true,
        dataSourceType: that.data.brand,
        maskbrandShow: !that.data.maskbrandShow,
        maskFavoritegrainShow:true,
        maskVarietiesShow:true
      })
    }

    if (that.data.titleSelectList[selectType].showSelect == true) {  //下拉信息显示
      that.setData({
        showDropDownMessage: true
      })
    } else {
      that.setData({
        showDropDownMessage: false
      })
    }

  }
,

/**加载更多 */

  loadiongtap:function(){
     console.log("到底了哟！！");
     this.setData({
       loadState:LoadFootItemState.Loading_State_End
     })
  },

  /**
   * 点击蒙版----------------------------------
   */
  maskVarietiesTap:function(){
    var upone = "titleSelectList[" + 0 + "].showSelect";  //数组进行字符串拼接
    let that=this;
    if (that.data.maskVarietiesShow==false){
      that.setData({
        maskVarietiesShow:true,    //蒙版是否隐藏
        showDropDownMessage: true, //下拉信息
        [upone]: true    //下拉箭头是上还是下
      })
    }
  },

  maskFavoritegrainTap: function () {
    var uptwo = "titleSelectList[" + 1 + "].showSelect";
    let that = this;
    if (that.data.maskFavoritegrainShow == false) {
      that.setData({
        maskFavoritegrainShow: true,
        showDropDownMessage: true,
        [uptwo]: true
      })
    }
  },

  maskbrandTap: function () {
    var upthree = "titleSelectList[" + 2 + "].showSelect";
    let that = this;
    if (that.data.maskbrandShow == false) {
      that.setData({
        maskbrandShow: true,
        showDropDownMessage: true,
        [upthree]: true
      })
    }
  },
  /**
   * ------------------------------------
   */


  /**
   * 点击下拉框选择信息
   */
    selectDataSourceTypeTap:function(e){
      var selectKey = e.currentTarget.dataset.key

      console.log(selectKey)
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