// pages/mall/index.js
const Page_path=require("../../macros/pagePath.js");
const MallService=require("../../services/mallService.js");
const Util = require("../../utils/util.js");
const Utils = require("../../utils/util")
const ShareManager = require("../../services/shareService");
const Limit = 20;
const UserService = require("../../services/userService");

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

    ], 
    setMenuList: [], // 养宠套餐

    groupItemList:[], // 团购商品

    itemList: [], // 商品列表

    offset: 0,

    businessInfo: null, // 商家信息
 
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
    let that = this;
    UserService.isLogin(function isLoginCallback(){
      UserService.requestBusinessInfo(UserService.getBusinessNo(), function (dataSource) {
        that.setData({
          businessInfo: dataSource
        })
      })
    }, function notLoginCallback(){});
    this.showPageInfor();
    this.requestGroupItemList();
    this.getSetMenu(
      function getSetMenuCallback(data) {
        Utils.logInfo("set menu : \n" + JSON.stringify(data));
        that.setData({
          setMenuList: data
        })
      }
    )
    wx.startPullDownRefresh();
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
    let that = this;
    this.data.offset = 0;
    this.requestItemList(this.data.offset, function getResultCallback(res) {
      Utils.logInfo(res);
      that.setData({
        itemList: res
      })
    }, function completeCallback(res){
      wx.stopPullDownRefresh();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this;
    this.requestItemList(this.data.offset, function getResultCallback(res) {
      Utils.logInfo(res);
      let list = that.data.itemList.concat(res)
      that.setData({
        itemList: list
      })
    }, function completeCallback(res) {
      wx.hideLoading({
        complete: (res) => {},
      })
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },

  /**
   * 头部点击动作（主粮、零食、用品、保健）
   */
  fastActionTap:function(e){
    wx.navigateTo({
      url: Page_path.Page_Mall_Sstaplefood + '?typeno=' + e.currentTarget.dataset.typeno
    })
  },

  /**
   * 点击商品详情
   */
  commodityInforMationTap:function(e){

    wx.navigateTo({
      url: Page_path.Page_Mall_CommodityInformation + "?itemno=" + e.currentTarget.dataset.itemno
    })

  },

  /**
   * 点击套餐中犬类
   */
  setMenuTap: function (res) {
    wx.navigateTo({
      url: Page_path.Page_Mall_SetMeal + '?setmenuno=' + res.currentTarget.dataset.setmenuno
    })

  },

  /**
   * 点击品牌图标
   */
  brandTap:function(res){
    wx.navigateTo({
      url: Page_path.Page_Mall_Sstaplefood + '?brandno=' + res.currentTarget.dataset.brandno
    })
  },

  /**
   * 点击查看团购商品更多
   */
  tapGroupItemMore: function () {
    wx.navigateTo({
      url: Page_path.Page_Mall_Sstaplefood + '?listtype=group'
    })
  },

  /**
   * 点击详细更多
   */
  tapTypeDetail: function (e) {
    wx.navigateTo({
      url: Page_path.Page_Mall_Sstaplefood + '?typeno=' + e.currentTarget.dataset.typeno
    })
  },

  /**
   * 获得套餐分类
   * @param getSetMenuCallback
   */
  getSetMenu: function (getSetMenuCallback) {
    let obj={
      offset:0,
      limit:4,
    }
    MallService.getSetMealList(obj,
      function getResultCallback(result) {
        if (Util.checkIsFunction(getSetMenuCallback)) {
          getSetMenuCallback(result.root)
        }
      }
    )
  },

  /**
   * 请求商品列表
   * @param {*} offset 
   * @param {*} getItemListCallback 
   * @param {*} completeCallback
   */
  requestItemList: function(offset, getItemListCallback, completeCallback) {
    let param = {
      offset: offset,
      limit: Limit,
      itemState: 1,
    }
    let that = this;
    MallService.getItemList(param, function returnData(data) {
      that.data.offset+=Limit;
      if (Util.checkIsFunction(getItemListCallback)) {
        getItemListCallback(data.root);
      }
    }, function(res) {
      if (Util.checkIsFunction(completeCallback)) {
        completeCallback(res);
      }
    });
  },

  /**
   * 页面显示宠物（主粮、零食、用品）信息
   * @param getPageInfoCallback
   */
  showPageInfor: function (getPageInfoCallback){
    let that = this;
    let obj={
      offset:0,
      limit:6
    }
    MallService.getMallPetType(obj,function(datasource){
        that.setData({
          fastActionList: datasource
        })
    })


  },

  /**
   * 类型更多
   */
  foodgrainMoreTap:function(res){
    var actionKey = res.currentTarget.dataset.key;  //获得类型No
    Utils.logInfo(actionKey);
    wx.navigateTo({
      url: Page_path.Page_Mall_Sstaplefood + '?resinfo=' + actionKey
    })
  },

  /**
   * 请求团购商品
   */
  requestGroupItemList: function() {
    let that = this;
    MallService.getGroupItemList({},
      function returnData(data) {
        Utils.logInfo("团购商品==> \n" + JSON.stringify(data));
        that.setData({
          groupItemList: data.root,
        })
      });
  },
})