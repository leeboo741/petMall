// pages/mall/commodityInformation/index.js
const Page_path = require("../../../macros/pagePath.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrls:null,  //图片链接
    commodityInformation: null,  //商品详情
    commodityintroduce: null,   //商品介绍
    price: 0,                  //商品会员价格
    originalPrice: 0,         //商品原价

    commodityInforType:[    //商品具体分类信息
      {
        type:"配送",
        inforMation:"按重量计"
      },

      {
        type:"分类",
        inforMation:"宠粮"
      },

      {
        type: "品牌",
        inforMation: "皇家"
      },

      {
        type: "阶段",
        inforMation: "幼猫"
      },

      {
        type: "品种",
        inforMation: "美国卷毛猫 布偶猫 英国短毛猫"
      },

      {
        type: "毛重",
        inforMation: "2000克"
      },

      {
        type: "保质",
        inforMation: "18个月"
      },

      {
        type: "适宜",
        inforMation: "1-4个月龄幼猫，怀孕及哺乳期母猫"
      },

      {
        type: "口味",
        inforMation: "鱼肉味"
      },

      {
        type: "期限",
        inforMation: "18个月"
      },

      {
        type: "优惠",
        inforMation: "无"
      },
    ],

    evaluationInformation:[
      {
       userName:"刘大仙",
        userImageUrl:"http://img005.hc360.cn/m6/M09/94/6B/wKhQolb07DuEFsI8AAAAAEyvm8c183.jpg",
       evaluationTime:"两天前",
       starsNumber:3,
       information:"（默认好评）通过平台担保交易买到一只皇家幼猫BK34奶糕粮2Kg"
      },
      
      {
        userName: "杨大仙",
        userImageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        evaluationTime: "2019-10-18",
        starsNumber: 4,
        information: "（默认好评）通过平台担保交易买到一只皇家幼猫BK34奶糕粮2Kg"
      },

      {
        userName: "李大仙",
        userImageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        evaluationTime: "2019-10-15",
        starsNumber: 5,
        information: "（默认好评）通过平台担保交易买到一只皇家幼猫BK34奶糕粮2Kg"
      },

    ],

    guaranteeList:[  //品质服务保障
        {
          guaranteeHead:"七天无理由退货",
          guaranteeInfor: "卖家只要承诺参加“7天无理由退换货”服务，就必须按本规则提供售后服务，并严格遵守；若买家向卖家提出天无理由退换货”，卖家需积极响应，并主动协商，根据淘宝要求提供相关证明，以期双方自愿友好地达成退货退款协议；"
        },

        {
          guaranteeHead: "消费者保障服务",
          guaranteeInfor: "消费者保障服务是淘宝网推出的旨在保障网络交易中消费者合法权益的服务体系。“商品如实描述”，为加入消费者保障服务的必选项。“7天无理由退换货”、“假一赔三”、“虚拟物品闪电发货”等都是其中的服务之一，由卖家自行选择加入。"
        },

    ],

    imageList:[   //图片
      {
        imageUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571390643784&di=5a1655235e2614f7479159c72a157ca9&imgtype=0&src=http%3A%2F%2Fm.360buyimg.com%2Fmobilecms%2Fs750x750_jfs%2Ft688%2F337%2F268905598%2F375082%2Ff19d67de%2F545a417fN2e1a130b.jpg%2521q80.jpg"
      },

      {
        imageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571390643781&di=615b57c2bb4756854516c205aa98e829&imgtype=0&src=http%3A%2F%2Fimage.tupian114.com%2F20180917%2F0055010576.jpg"
      },

      {
        imageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571390643780&di=4cea40f45e76eee59fbb377a8eea6413&imgtype=0&src=http%3A%2F%2Fimg007.hc360.cn%2Fy6%2FM04%2F91%2F8F%2FwKhQtFZDGNyESrJ3AAAAAKMrYUI854.jpg"
      },

      {
        imageUrl: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=420806006,3166260513&fm=15&gp=0.jpg"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    let requestOptions = JSON.parse(decodeURIComponent(options.resinfo));
    console.log(requestOptions.imageUrl);
    that.setData({
      commodityInformation: requestOptions.commodity,
      imageUrls: requestOptions.imageUrl,
      commodityintroduce: requestOptions.introduce,
      price: requestOptions.price,
      originalPrice: requestOptions.originalPrice
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

  },

  /**
   * 点击跟多评价
   */
  evaluateTap:function(){
    wx.navigateTo({
      url: Page_path.Page_Mall_Evaluate
    })
  }
})