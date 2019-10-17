// pages/mall/ff/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
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
        originalPrice: 638
      },
      {
        imageUrl: "http://img.boqiicdn.com/Data/Shop/2/221/22191/shoppicpath11478759881_y.jpg",
        commodity: '发育宝-s三拼肉宴冻干幼猫粮8kg',
        introduce: "冻干技术 打造出色口感",
        price: 499,
        originalPrice: 638
      },
      {
        imageUrl: "http://img005.hc360.cn/m6/M09/94/6B/wKhQolb07DuEFsI8AAAAAEyvm8c183.jpg",
        commodity: '五谷九种肉全猫粮加拿大进口GO！',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 309,
        originalPrice: 359
      },
      {
        imageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
    ],  //主粮

    snacksList: [
      {
        imageUrl: "http://pic1.womai.com/upload/601/603/608/362805/362808/362822/362547/630292/630292_1_pic1080_4539.jpg",
        commodity: '信元发育宝冻干成猫粮8kg',
        introduce: "吉纯三拼肉宴冻干猫粮食",
        price: 499,
        originalPrice: 638
      },
      {
        imageUrl: "http://img.boqiicdn.com/Data/Shop/1/176/17672/shoppicpath21440569048_y.jpg",
        commodity: '发育宝-s三拼肉宴冻干幼猫粮8kg',
        introduce: "冻干技术 打造出色口感",
        price: 499,
        originalPrice: 638
      },
      {
        imageUrl: "http://d6.yihaodianimg.com/N04/M06/57/56/CgQDrVPQbjaAG9n1AAFVTwVLhdU24800.jpg",
        commodity: '五谷九种肉全猫粮加拿大进口GO！',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 309,
        originalPrice: 359
      },
      {
        imageUrl: "http://www.tbw-hufu.com/tuhfJDEwLmFsaWNkbi5jb20vaTMvMTk4MTYxNTUzMy9PMUNOMDExcWs5dGRPRDRzaXZpcFJfISExOTgxNjE1NTMzJDk.jpg",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
    ],  //零食

    healthProductsList: [
      {
        imageUrl: "http://www.whnews.cn/dszx/2019/0918/xxfl/hk91/customer/23419/0FWbddtge61UVJwwFjeXvmyfnoqifGQeCw6VBoXV.jpeg",
        commodity: '信元发育宝冻干成猫粮8kg',
        introduce: "吉纯三拼肉宴冻干猫粮食",
        price: 499,
        originalPrice: 638
      },
      {
        imageUrl: "http://www.whnews.cn/dszx/2019/0917/xxfl/hk91/customer/23419/OdmUKR5hbejrYTLAfBanJXfRcZsUJ0nMiovFIURv.jpeg",
        commodity: '发育宝-s三拼肉宴冻干幼猫粮8kg',
        introduce: "冻干技术 打造出色口感",
        price: 499,
        originalPrice: 638
      },
      {
        imageUrl: "http://img1.doubanio.com/view/commodity_story/medium/public/p10623659.jpg",
        commodity: '五谷九种肉全猫粮加拿大进口GO！',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 309,
        originalPrice: 359
      },
      {
        imageUrl: "https://pop.nosdn.127.net/cd699185-97ba-4dc7-9165-6d19d347a9c5?imageView&thumbnail=262x262&quality=90",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
    ],  //保健品
    articlesList: [
      {
        imageUrl: "https://pop.nosdn.127.net/8e98103a-a971-4ab0-8e56-bafafa290929?imageView&thumbnail=262x262&quality=90",
        commodity: '信元发育宝冻干成猫粮8kg',
        introduce: "吉纯三拼肉宴冻干猫粮食",
        price: 499,
        originalPrice: 638
      },
      {
        imageUrl: "https://pop.nosdn.127.net/75e934b9-0d4b-4a93-bdec-4dc7b48432e0?imageView&thumbnail=262x262&quality=90",
        commodity: '发育宝-s三拼肉宴冻干幼猫粮8kg',
        introduce: "冻干技术 打造出色口感",
        price: 499,
        originalPrice: 638
      },
      {
        imageUrl: "https://pop.nosdn.127.net/b72ffd4e-ca7e-466d-8f9c-b6547910883e?imageView&thumbnail=262x262&quality=90",
        commodity: '五谷九种肉全猫粮加拿大进口GO！',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 309,
        originalPrice: 359
      },
      {
        imageUrl: "https://pop.nosdn.127.net/a8d246c8-db44-414b-b449-645495372682?imageView&thumbnail=262x262&quality=90",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice: 629
      },
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
    if (biographyInfo=='宠粮'){
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

    if (biographyInfo == '保健品') {
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
    var upone = "titleSelectList[" + 0 + "].showSelect";  //数组进行字符串拼接
    var uptwo = "titleSelectList[" + 1 + "].showSelect";
    var upthree = "titleSelectList[" + 2 + "].showSelect";
    this.setData({
      titleSelectIndex: selectType
    })

    if (selectType==0){  //判断类型显示各个属性值
        that.setData({
          [upone]: !that.data.titleSelectList[0].showSelect,  //替换数组里的某个属性
          [uptwo]: true,  
          [upthree]: true,
          dataSourceType: that.data.varieties
        })

    }

    if (selectType == 1) {
      that.setData({
        [uptwo]: !that.data.titleSelectList[1].showSelect, 
        [upone]: true,
        [upthree]: true,
        dataSourceType: that.data.favoriteGrain
      })
    }

    if (selectType == 2) {
      that.setData({
        [upthree]: !that.data.titleSelectList[2].showSelect, 
        [upone]: true,
        [uptwo]: true,
        dataSourceType: that.data.brand
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

  
})