//index.js
//获取应用实例
const app = getApp();
const LoadFootItemState = require("../../lee-components/leeLoadingFootItem/loadFootObj.js");
const PagePath = require("../../macros/pagePath.js");
const UserService = require("../../services/userService.js");
const Config = require("../../macros/config.js");
const LocationService = require("../../services/locationService.js");
const PetService = require("../../services/petService.js");
const StoreService = require("../../services/storeService.js");
const MallService = require("../../services/mallService.js");
const GroupService=require("../../services/groupService.js");
const {
  PetFilterObj
} = require("../../entity/petFilterObj.js");

const PetFilterUtil = require("../../entity/petFilterObj.js");
const Limit = 10;
const Enum = require("../../utils/enum.js");

const ShareManager = require("../../services/shareService");
const Utils = require("../../utils/util");
const { MINI_PROGRAME_APPID_PETTRANSPORT, ENV_CURRENT } = require("../../macros/config.js");

Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      navbarheight: app.globalData.naviHeightWithoutStatusbar
    })
    ShareManager.pageHandlerOptions(options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.showLoading({
      title: '定位中...',
    })
    let that = this;
    // 更新商家信息? 为什么?
    UserService.isLogin(function isLoginCallback(){
      UserService.requestBusinessInfo(UserService.getBusinessNo(), function (dataSource) {
        that.setData({
          businessInfo: dataSource
        })
      })
    }, function notLoginCallback(){});

    // 先定位 再请求首页数据
    LocationService.getCurrentLocationInfo(
      function callback(res) {
        Utils.logInfo(JSON.stringify(res));
        wx.hideLoading();
        let city = res.address_component.city;
        app.globalData.currentCity = city;
        app.globalData.addressInfomation = res.address_component
      }
    )
    // 跳蚤市场
    let newestPetFilter ={
      offset:0,
      limit: 8,
    };
    PetService.getNewestPet(encodeURIComponent(JSON.stringify(PetFilterUtil.utilObject(newestPetFilter)), 'utf-8'),function getResultCallback(result) {
      Utils.logInfo("跳蚤市场: \n" + JSON.stringify(result));
        that.setData({
          newestList: result.root
        })
      }
    )

    // 高端宠物
    PetService.getUpScalePet(encodeURIComponent(JSON.stringify(PetFilterUtil.utilObject(newestPetFilter)), 'utf-8'),function getResultCallback(result) {
        Utils.logInfo("高端宠物: \n" + JSON.stringify(result));
        that.setData({
          upscaleList: result.root
        })
      }
    )

    // 推荐商家
    let recommendFilter = {
      offset: 0,
      limit: 8
    }
    StoreService.getRecommendBusiness(recommendFilter,
      function getResultCallback(result) {
        Utils.logInfo("推荐商家: \n" + JSON.stringify(result));
        that.setData({
          recommendStoreList: result.root
        })
      }
    )

    // 热门分类
    PetService.getBreed(null,function getResultCallback(result) {
        Utils.logInfo("热门分类: \n" + JSON.stringify(result));
        that.setData({
          hotTypeList: result.root
        })
      }
    )

    // 套餐
    let obj={
      offset:0,
      limit:30
    }
    MallService.getSetMealList(obj,
      function getResultCallback(result) {
        Utils.logInfo("养宠套餐 : \n" + JSON.stringify(result));
        that.setData({
          setMenuList: result.root
        })
      }
    )

    MallService.getGroupItemList({},function returnData(data) {
      Utils.logInfo("团购商品==> \n" + JSON.stringify(data));
      that.setData({
        groupItemList: data.root,
      })
    });

  }, 

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.onShow();
    wx.stopPullDownRefresh();

  },

  /**
   * 页面上拉触底事件的处理函数
   * 触底 loadmore
   */
  onReachBottom: function() {


  },


  /**
   * 点击(附近、狗狗、猫猫、小宠、水族)
   */
  fastActionTap: function(res) {
    var actionIndex = res.currentTarget.dataset.index;
    let fastAction = this.data.fastActionList[actionIndex];
    Utils.logInfo(actionIndex);
    switch(actionIndex){
      case 0: {
        wx.navigateTo({
          url: PagePath.Page_Home_Nearby + "?requesttype=" + Enum.Nearby_RequestType_Enum.All + "&pagetitle=附近"
        })
        break;
      }
      case 1: 
      case 2: {
        wx.navigateTo({
          url: PagePath.Page_Home_Nearby + "?requesttype=" + Enum.Nearby_RequestType_Enum.Sort + "&sortno=" + fastAction.type + "&pagetitle=" + fastAction.actionName,
        })
        break;
      }
      case 3: {
        wx.navigateTo({
          url: PagePath.Page_Assess_List,
        })
        break;
      }
      case 4: {
        wx.navigateTo({
          url: PagePath.Page_Baike_Index,
        })
        break;
      } 
      case 5:
      case 6:
      case 7:{
        wx.switchTab({
          url: PagePath.Page_PostStation_Index,
        })
        break;
      }
      case 8: {

        wx.navigateTo({
          url: PagePath.Page_Mall_Sstaplefood + '?typeno=10004'
        })
        break;
      }
      case 9: {
        wx.navigateToMiniProgram({
          appId: MINI_PROGRAME_APPID_PETTRANSPORT,
          path: "pages/index/index2",
          extraData: {
            foo: "release"
          },
          envVersion: ENV_CURRENT,
          success(res) {
            // 打开成功
            Utils.logInfo(JSON.stringify(res))
          },
          fail(res) {
            Utils.logInfo(JSON.stringify(res))
          }
        })
      }
    }
  },

  /**
   * 点击跳蚤市场
   */
  newestTap: function() {
    wx.navigateTo({
      url: PagePath.Page_Home_Nearby + "?requesttype=" + Enum.Nearby_RequestType_Enum.Newest + "&pagetitle=跳蚤市场"
    })
  },

  /**
   * 点击进入高端馆
   */
  highEndTap: function() {
    wx.navigateTo({
      url: PagePath.Page_Home_Nearby + "?requesttype=" + Enum.Nearby_RequestType_Enum.UpScale + "&pagetitle=高端馆"
    })
  },

  /**
   * 点击套餐中犬类
   */
  setMenuTap: function(res) {
    wx.navigateTo({
      url: PagePath.Page_Mall_SetMeal + '?setmenuno=' + res.currentTarget.dataset.setmenuno
    })

  },

  /**
   * 点击热门分类
   */
  hotTypeTap: function(e) {
    Utils.logInfo(e.currentTarget.dataset.name);
    wx.navigateTo({
      url: PagePath.Page_Home_Nearby + "?genreno=" + e.currentTarget.dataset.genreno + "&requesttype=" + Enum.Nearby_RequestType_Enum.Genre + "&pagetitle=" + e.currentTarget.dataset.name
    })
  },

  /**
   * 点击宠物图片查看详情  Page_Store_PetsInforMation
   */
  petsInforTap: function(res) {
    wx.navigateTo({
      url: PagePath.Page_Store_PetsInforMation + '?petno=' + res.currentTarget.dataset.petno
    })
  },


  /**
   * 点击商品详情
   */
  commodityInforMationTap:function(e){

    wx.navigateTo({
      url: PagePath.Page_Mall_CommodityInformation + "?itemno=" + e.currentTarget.dataset.itemno
    })

  },

  /**
   * 点击推荐商家
   */
  recommendTap:function(res){
    Utils.logInfo(JSON.stringify(res));
    let userInfo = res.currentTarget.dataset.value;
    
    wx.navigateTo({
      url: PagePath.Page_Store_StoreInforMation + '?storeno=' + userInfo.businessNo +"&showtype=0"
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },

  /**
   * 点击搜索框
   */
  tapSearch: function() {
    wx.navigateTo({
      url: PagePath.Page_Search_Index,
    })
  },

  /**
   * 点击tapBanner
   */
  tapBanner:function(res){
    Utils.logInfo(JSON.stringify(res));
    let index = res.currentTarget.dataset.index;
    if(index==1){
      wx.reLaunch({
        url:""
      })
    } else if (index == 2){
      wx.navigateTo({
        url: PagePath.Page_Home_Usersmanual
      })
    } else if (index == 3){
     
    }else if(index==4){
      wx.navigateTo({
        url: PagePath.Page_Home_Usersmanual
      })
    }
  },



  /**
   * 团购更多
   */
  groupTap:function(e){
 
    wx.navigateTo({
      url: PagePath.Page_Mall_Sstaplefood + '?listtype=group'
    })

  },

  /**
   * 团购详情
   */
  groupDetailsTap:function(e){
    let goodId = e.currentTarget.dataset.goodsid;   
    wx.navigateTo({
      url:""
    })
  },

  /**
   * 查看更多商家
   */
  tapToMoreBusiness: function(e) {
    wx.navigateTo({
      url: PagePath.Page_Home_BusinessList,
    })
  },

  /**
   * 查看更多分类
   */
  tapToMoreType: function(e) {
    wx.navigateTo({
      url: PagePath.Page_Home_PetsType,
    })
  },

  /**
   * 页面数据
   */
  data: {
    pageIndex: 0, // 页码
    loadState: LoadFootItemState.Loading_State_Normal, // 底部状态
    businessInfo:null,  //商家信息
    bannerDataSource: [{
        imageUrl: "https://img.taochonghui.com/weapp/market/banner/banner01.png", // 图片地址
        link: "", // 内容地址
      },
      {
        imageUrl: "https://img.taochonghui.com/weapp/market/banner/banner02.png",
        link: "",
      },
      {
        imageUrl: "https://img.taochonghui.com/weapp/market/banner/banner03.png",
        link: "",
      },
      {
        imageUrl: "https://img.taochonghui.com/weapp/market/banner/banner04.png",
        link: "",
      },
      {
        imageUrl: "https://img.taochonghui.com/weapp/market/banner/banner05.png",
        link: "",
      }
    ], // banner
    fastActionList: [{
        actionName: "附近",
        iconPath: "../../resource/nearby.png",
        link: "",
        type: "",
      },
      {
        actionName: "狗狗",
        iconPath: "../../resource/dog.png",
        link: "",
        type: "10000",
      },
      {
        actionName: "猫猫",
        iconPath: "../../resource/cat.png",
        link: "",
        type: "10001",
      },
      {
        actionName: "产品测评",
        iconPath: "../../resource/minority.png",
        link: "",
        type: "04",
      },
      {
        actionName: "宠物百科",
        iconPath: "../../resource/aquatic.png",
        link: "",
        type: "03",
      },
      {
        actionName: "洗澡",
        iconPath: "../../resource/t2.png",
        link: "",
        type: "03",
      },
      {
        actionName: "美容",
        iconPath: "../../resource/t1.png",
        link: "",
        type: "03",
      },
      {
        actionName: "寄养",
        iconPath: "../../resource/t3.png",
        link: "",
        type: "03",
      },
      {
        actionName: "保健",
        iconPath: "../../resource/t4.png",
        link: "",
        type: "03",
      },
      {
        actionName: "托运",
        iconPath: "../../resource/t5.png",
        link: "",
        type: "03",
      },
    ], // 快速入口
    preferentialList: [], // 特惠抢购
    newestList: [], // 最新上架
    fineList: [], // 精品
    upscaleList: [], // 高端宠物
    setMenuList: [], // 养宠套餐
    recommendStoreList: [], // 推荐商家
    hotTypeList: [], // 热门分类
    recommendGoodsList: [], // 为您推荐
    groupPurchaseList:[], //团购专区
    groupItemList: [],// 团购商品列表
  },
})