// pages/mall/commodityInformation/index.js
const Page_path = require("../../../macros/pagePath.js");

const PetService = require("../../../services/petService.js");

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

    shopDataSource:[],      //商品信息
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

    evaluationInformation:[], // 评价列表

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

    imageList:[], // 详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.setData({
      
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
   * 获取详情
   */
  getDetail: function() {

  },

  /**
   * 获取宠物详情
   */
  getPetDetail: function () {

  },

  /**
   * 获取宠物商品详情
   */
  getItemDetail: function () {

  },
})