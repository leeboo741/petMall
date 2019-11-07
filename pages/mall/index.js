// pages/mall/index.js
const Page_path=require("../../macros/pagePath.js");
const MallService=require("../../services/mallService.js");
const Util = require("../../utils/util.js");
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
    
    brandList:[] ,  //品牌

    petsInforDrouce:[],  //页面数据
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.showPageInfor(
      function getPageInfoCallback(data){
        console.log("page info : \n" + JSON.stringify(data));
        that.setData({
          petsInforDrouce: data
        })
      }
    );
    this.getPetsTypeInfo(
      function getPetTypeInfoCallback(data) {
        console.log("pet type : \n" + JSON.stringify(data));
        that.setData({
          fastActionList: data
        })
      }
    );
    this.getItemBrand(
      function getItemBrandCallback(data) {
        console.log("item brand : \n" + JSON.stringify(data));
        that.setData({
          brandList: data
        })
      }
    );
    this.getSetMenu(
      function getSetMenuCallback(data) {
        console.log("set menu : \n" + JSON.stringify(data));
        that.setData({
          setMenuList: data
        })
      }
    )
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
   * 点击详细更多
   */
  tapTypeDetail: function (e) {
    wx.navigateTo({
      url: Page_path.Page_Mall_Sstaplefood + '?typeno=' + e.currentTarget.dataset.typeno
    })
  },

  /**
   * 查询品牌
   * @param getBrandDataCallback
   */
  getItemBrand: function (getBrandDataCallback){
    let that = this;
    MallService.getBrandInfo(
      function getResultCallback(result) {
        if (Util.checkIsFunction(getBrandDataCallback)) {
          getBrandDataCallback(result)
        }
      }
    )
  },

  /**
   * 获得商品类型（主粮、零食、用品）
   * @param getPetTypesInfoCallback
   */
  getPetsTypeInfo: function (getPetTypesInfoCallback){
    let that=this;
    MallService.getMallPetType(2, 4,
      function returnData(data) {
        if (Util.checkIsFunction(getPetTypesInfoCallback)) {
          getPetTypesInfoCallback(data)
        }
      }
    );
  },

  /**
   * 获得套餐分类
   * @param getSetMenuCallback
   */
  getSetMenu: function (getSetMenuCallback) {
    MallService.getSetMealList(
      function getResultCallback(result) {
        if (Util.checkIsFunction(getSetMenuCallback)) {
          getSetMenuCallback(result.root)
        }
      }
    )
  },

  /**
   * 页面显示宠物（主粮、零食、用品）信息
   * @param getPageInfoCallback
   */
  showPageInfor: function (getPageInfoCallback){
    let that = this;
    MallService.getMallPetTypeShowInfor(
      function returnData(data) {
        if (Util.checkIsFunction(getPageInfoCallback)) {
          getPageInfoCallback(data)
        }
    });
  },

  /**
   * 类型更多
   */
  foodgrainMoreTap:function(res){
    var actionKey = res.currentTarget.dataset.key;  //获得类型No
    console.log(actionKey);
    wx.navigateTo({
      url: Page_path.Page_Mall_Sstaplefood + '?resinfo=' + actionKey
    })
  }
})