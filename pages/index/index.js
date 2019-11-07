//index.js
//获取应用实例
const app = getApp();
const LoadFootItemState = require("../../lee-components/leeLoadingFootItem/loadFootObj.js");
const PagePath = require("../../macros/pagePath.js");
const ShareService = require("../../services/shareService.js");
const UserService = require("../../services/userService.js");
const Config = require("../../macros/config.js");
const LocationService = require("../../services/locationService.js");
const PetService = require("../../services/petService.js");
const StoreService = require("../../services/storeService.js");
const MallService = require("../../services/mallService.js");
const {
  PetFilterObj
} = require("../../entity/petFilterObj.js");
const Limit = 10;
const Enum = require("../../utils/enum.js");

Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '定位中...',
    })
    let that = this;
    LocationService.getCurrentLocationInfo(
      function callback(res) {
        console.log(JSON.stringify(res));
        wx.hideLoading();
        app.globalData.currentLocationInfo = res;
        let city = res.address_component.city;
        app.globalData.currentCity = city;

        // 特惠抢购
        let preferentialPetFilter = new PetFilterObj({
          offset: 0,
          limit: 6,
        })
        PetService.getPreferentialPet(preferentialPetFilter,
          function getResultCallback(result) {
            console.log("preferential pet: \n" + JSON.stringify(result));
            that.setData({
              preferentialList: result.root
            })
          }
        )

        // 最新上架
        let newestPetFilter = new PetFilterObj({
          city: city,
          offset: 0,
          limit: 6,
        })
        PetService.getNewestPet(newestPetFilter,
          function getResultCallback(result) {
            console.log("newest pet: \n" + JSON.stringify(result));
            that.setData({
              newestList: result.root
            })
          }
        )

        // 精品馆
        let finePetFilter = new PetFilterObj({
          offset: 0,
          limit: 6,
        })
        PetService.getFinePet(finePetFilter,
          function getResultCallback(result) {
            console.log("fine pet: \n" + JSON.stringify(result));
            that.setData({
              fineList: result.root
            })
          }
        )

        // 高档馆
        let upScalePetFilter = new PetFilterObj({
          city: city,
          offset: 0,
          limit: 6,
        })
        PetService.getUpScalePet(upScalePetFilter,
          function getResultCallback(result) {
            console.log("upScale pet: \n" + JSON.stringify(result));
            that.setData({
              upscaleList: result.root
            })
          }
        )

        // 推荐商家
        let recommendFilter = {
          offset: 0,
          limit: 6
        }
        StoreService.getRecommendBusiness(recommendFilter,
          function getResultCallback(result) {
            console.log("recommend business: \n" + JSON.stringify(result));
            that.setData({
              recommendStoreList: result.root
            })
          }
        )

        let hotTypeFilter = {
          offset: 0,
          limit: 8,
        }
        PetService.getHotType(hotTypeFilter,
          function getResultCallback(result) {
            console.log("hot type: \n" + JSON.stringify(result));
            that.setData({
              hotTypeList: result.root
            })
          }
        )

        // 为您推荐
        that.data.pageIndex = 0;
        let petFilter = new PetFilterObj({
          offset: that.data.pageIndex,
          limit: Limit,
          city: city
        })
        PetService.getPetList(petFilter,
          function getResultCallback(result) {
            console.log("filter pet: \n" + JSON.stringify(result));
            that.setData({
              recommendGoodsList: result.root,
              pageIndex: that.data.pageIndex + Limit
            })
          }
        )

        // 套餐
        MallService.getSetMealList(
          function getResultCallback(result) {
            console.log("set meal : \n" + JSON.stringify(result));
            that.setData({
              setMenuList: result.root
            })
          }
        )
      }
    )
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
    this.data.pageIndex = 0;
    let petFilter = new PetFilterObj({
      offset: this.data.pageIndex,
      limit: Limit,
      city: app.globalData.currentCity
    })
    let that = this;
    PetService.getPetList(petFilter,
      function getResultCallback(result) {
        console.log("fine pet: \n" + JSON.stringify(result));
        wx.stopPullDownRefresh();
        that.setData({
          recommendGoodsList: result.root,
          pageIndex: that.data.pageIndex + Limit,
          loadState: LoadFootItemState.Loading_State_Normal
        })
      }
    )
  },

  /**
   * 页面上拉触底事件的处理函数
   * 触底 loadmore
   */
  onReachBottom: function() {

    if (this.data.loadState == LoadFootItemState.Loading_State_End ||
      this.data.loadState == LoadFootItemState.Loading_State_Loading) {
      return;
    }
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    let that = this;
    let petFilter = new PetFilterObj({
      offset: this.data.pageIndex,
      limit: Limit,
      city: app.globalData.currentCity
    })
    PetService.getPetList(petFilter,
      function getResultCallback(result) {
        console.log("fine pet: \n" + JSON.stringify(result));
        let tempRecommend = that.data.recommendGoodsList.concat(result.root);
        that.data.pageIndex = that.data.pageIndex + Limit;
        if (result.root.length < Limit) {
          that.setData({
            recommendGoodsList: tempRecommend,
            loadState: LoadFootItemState.Loading_State_End
          })
        } else {
          that.setData({
            recommendGoodsList: tempRecommend,
            loadState: LoadFootItemState.Loading_State_Normal
          })
        }
      }
    )
  },

  /**
   * 点击特惠抢购更多
   */
  preferentialTap: function() {
    wx.navigateTo({
      url: PagePath.Page_Home_Preferential
    })
  },

  /**
   * 点击(附近、狗狗、猫猫、小宠、水族)
   */
  fastActionTap: function(res) {
    var actionIndex = res.currentTarget.dataset.index;
    let fastAction = this.data.fastActionList[actionIndex];
    console.log(actionIndex);
    if (actionIndex == 0) {
      wx.navigateTo({
        url: PagePath.Page_Home_Nearby + "?requesttype=" + Enum.Nearby_RequestType_Enum.All + "&pagetitle=附近"
      })
    } else if (actionIndex == 1) {
      wx.navigateTo({
        url: PagePath.Pate_Home_PetsType + "?type=" + fastAction.type
      })
    } else if (actionIndex == 2) {
      wx.navigateTo({
        url: PagePath.Pate_Home_PetsType + "?type=" + fastAction.type
      })
    } else if (actionIndex == 3) {
      wx.navigateTo({
        url: PagePath.Pate_Home_PetsType + "?type=" + fastAction.type
      })
    } else {
      wx.navigateTo({
        url: PagePath.Pate_Home_PetsType + "?type=" + fastAction.type
      })
    }
  },

  /**
   * 点击最新上架更多
   */
  newestTap: function() {
    wx.navigateTo({
      url: PagePath.Page_Home_Nearby + "?requesttype=" + Enum.Nearby_RequestType_Enum.Newest + "&pagetitle=最新上架"
    })
  },

  /**
   * 点击进入精品馆
   */
  boutiqueTap: function() {
    wx.navigateTo({
      url: PagePath.Page_Home_Nearby + "?requesttype=" + Enum.Nearby_RequestType_Enum.Fine + "&pagetitle=精品馆"
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
    wx.navigateTo({
      url: PagePath.Page_Home_Nearby + "?breedno=" + e.currentTarget.dataset.breedno + "&requesttype=" + Enum.Nearby_RequestType_Enum.All + "&pagetitle=" + e.currentTarget.dataset.name
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

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
   * 页面数据
   */
  data: {
    pageIndex: 0, // 页码
    loadState: LoadFootItemState.Loading_State_Normal, // 底部状态
    bannerDataSource: [{
        imageUrl: "https://petimg.tyferp.com/weapp/banner01.jpg", // 图片地址
        link: "", // 内容地址
      },
      {
        imageUrl: "https://petimg.tyferp.com/weapp/banner02.jpg",
        link: "",
      },
      {
        imageUrl: "https://petimg.tyferp.com/weapp/banner03.jpg",
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
        type: "01",
      },
      {
        actionName: "猫猫",
        iconPath: "../../resource/cat.png",
        link: "",
        type: "02",
      },
      {
        actionName: "小宠",
        iconPath: "../../resource/minority.png",
        link: "",
        type: "04",
      },
      {
        actionName: "水族",
        iconPath: "../../resource/aquatic.png",
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
  },
})