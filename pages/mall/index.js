// pages/mall/index.js
const Page_path=require("../../macros/pagePath.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerDataSource: [
      {
        imageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571131468238&di=609f3911e4174df8a26329b95d101c60&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F266882899ba843d2aa912c916255dce0a722617319f1c-HbCBDq_fw658", // 图片地址
        link: "", // 内容地址
      },
      {
        imageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571131468238&di=a6b425a1b285f172255acd4c622ec913&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a2695b310759a80120b95943cb8c.png%402o.png",
        link: "",
      },
      {
        imageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571131763897&di=6938f1dca7a5a74816a1fda5d13eb363&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D390175338%2C1026725900%26fm%3D214%26gp%3D0.jpg",
        link: "",
      }
    ],
    fastActionList: [
      {
        actionName: "主粮",
        iconPath: "../../resource/dogfood.png",
        link: ""
      },
      {
        actionName: "零食",
        iconPath: "../../resource/snacks.png",
        link: ""
      },
      {
        actionName: "用品",
        iconPath: "../../resource/articles.png",
        link: ""
      },
      {
        actionName: "保健",
        iconPath: "../../resource/healthcare.png",
        link: ""
      }
    ], // 高端宠物
    setMenuList: [
      {
        name: "小体型犬",
        info: "低至99元起",
        iconPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571133940215&di=713c8e2f8180fe6e01fee05dfdeb04d9&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160629%2F727e135d01e94ff2ace58fe150c6f5ea.jpg",
      },
      {
        name: "中体型犬",
        info: "低至99元起",
        iconPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571134040835&di=021c08edae9fa11bb2dbabfbb1cdf4f3&imgtype=0&src=http%3A%2F%2Fimg3.redocn.com%2Ftupian%2F20150106%2Fwangoupaidebandiangou_3802352.jpg",
      },
      {
        name: "大体型犬",
        info: "低至99元起",
        iconPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571133984395&di=77ec705a4112547d49654adee4752b03&imgtype=0&src=http%3A%2F%2Fpic39.nipic.com%2F20140325%2F2531170_234047950000_2.jpg",
      },
      {
        name: "猫咪套餐",
        info: "低至99元起",
        iconPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571134123613&di=4600106c840ff2762ac724df88ab39be&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F13%2F48%2F71%2F58fda68f998e7.png",
      },
    ], // 养宠套餐
    
    brandList:[
      {
        imageUrl:"http://s.360qc.com/userfiles/shop/2015/08/31/1441011037055.png",
        information:'法国皇家'
      },
      {
        imageUrl: "http://tm-image.tianyancha.com/tm/99dd32431c25c33214af75afac0b522b.jpg",
        information: '冠能'
      },
      {
        imageUrl: "http://img.boqiicdn.com/Data/Shop/0/0/0/shopbrand_logo1431134552.jpg",
        information: '伯纳天纯'
      },
      {
        imageUrl: "http://img4.imgtn.bdimg.com/it/u=4148901729,1842399812&fm=214&gp=0.jpg",
        information: '巴西淘淘'
      },
      {
        imageUrl: "http://img2.imgtn.bdimg.com/it/u=1263608417,682825162&fm=214&gp=0.jpg",
        information: '巅峰'
      },
      {
        imageUrl: "http://img4.imgtn.bdimg.com/it/u=3244848101,669432983&fm=26&gp=0.jpg",
        information: '卫仕'
      },
      {
        imageUrl: "http://www.ixiupet.com/uploads/allimg/170613/23121M241-0.png",
        information: '红狗'
      },
      {
        imageUrl: "http://p1.sinaimg.cn/2576151472/180/80251341814526",
        information: 'MAG'
      },
    ] ,  //品牌

    foodGrainList:[
      {
        imageUrl:"http://img.boqiicdn.com/Data/Shop/1/190/19082/shoppicpath11455790231_y.jpg",
        commodity:'信元发育宝冻干成猫粮8kg',
        introduce:"吉纯三拼肉宴冻干猫粮食",
        price:499,
        originalPrice:638
      },
      {
        imageUrl: "http://img.boqiicdn.com/Data/Shop/2/221/22191/shoppicpath11478759881_y.jpg",
        commodity: '发育宝-s三拼肉宴冻干幼猫粮8kg',
        introduce: "冻干技术 打造出色口感",
        price: 499,
        originalPrice:638
      },
      {
        imageUrl: "http://img005.hc360.cn/m6/M09/94/6B/wKhQolb07DuEFsI8AAAAAEyvm8c183.jpg",
        commodity: '五谷九种肉全猫粮加拿大进口GO！',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 309,
        originalPrice:359
      },
      {
        imageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        commodity: '健康无限系列五谷九种肉猫粮16磅',
        introduce: "【全球购】80%肉含量 天然五谷",
        price: 529,
        originalPrice:629
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
    ]  //用品

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
   * 点击粮食更多
   */
  foodgrainMoreTap:function(){
    wx.navigateTo({
      url: Page_path.Page_Mall_Sstaplefood+'?resinfo='+'宠粮'
    })
  },

  /**
   * 点击零食更多
   */
  snacksMore:function(){
    wx.navigateTo({
      url: Page_path.Page_Mall_Sstaplefood + '?resinfo=' + '零食'
    })
  },

  /**
   * 点击保健品更多
   */
  healthProductsMore:function(){
    wx.navigateTo({
      url: Page_path.Page_Mall_Sstaplefood + '?resinfo=' + '保健品'
    })
  },

  /**
   * 点击用品更多
   */
  aiclesMore:function(){
    wx.navigateTo({
      url: Page_path.Page_Mall_Sstaplefood + '?resinfo=' + '用品'
    })
  }
})