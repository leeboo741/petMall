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
   * 点击更多
   */
  aiclesMore:function(){
    wx.navigateTo({
      url: Page_path.Page_Mall_Sstaplefood + '?resinfo=' + '用品'
    })
  },

  /**
   * 头部点击动作（主粮、零食、用品、保健）
   */
  fastActionTap:function(e){
    var actinoKey = e.currentTarget.dataset.key
  
    wx.navigateTo({
      url: Page_path.Page_Mall_Sstaplefood + '?resinfo=' + actinoKey
    })
  },

  /**
   * 点击商品详情
   */
  commodityInforMationTap:function(e){

    wx.navigateTo({
      url: Page_path.Page_Mall_CommodityInformation
    })

  },

  /**
   * 点击套餐中犬类
   */
  setMenuTap:function(res){
    var actionIndex = res.currentTarget.dataset.index

    wx.navigateTo({
      url: Page_path.Page_Mall_SetMeal + '?setMealType=' + actionIndex
    })

  },


  /**
   * 点击品牌图标
   */
  brandTap:function(res){
    var actionIndex = res.currentTarget.dataset.index;

    wx.navigateTo({
      url: Page_path.Page_Mall_Sstaplefood + '?resinfo=' + actionIndex
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