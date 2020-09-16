const Utils =require("../../utils/util.js")
const Url_Path=require("../../macros/urlPath.js");
const app = getApp();
const ShareManager = require("../../services/shareService");
const PagePath = require("../../macros/pagePath");
const ServerManager = require("../../services/serverManager");
const { MINI_PROGRAME_APPID_PETTRANSPORT, ENV_CURRENT } = require("../../macros/config.js");

Page({
  data: {
    moreImageUrl: "/resource/redright.png",
    phoneImageUrl: "/resource/phone.png",
    huitimeImageUrl: "/resource/time.png",
    daohangImageUrl: "/resource/dh.png",
    bannerList: [
      {
        imgUrl: "https://img.taochonghui.com/weapp/market/banner/banner01.png"
      },
      {
        imgUrl: "https://img.taochonghui.com/weapp/market/banner/banner02.png"
      }
    ],
    businessObj: null,
    currentAddress: null,
    businessServerList: [],
  },
  onShow: function (res) {
    if (!app.globalData.serviceSelectBusiness) {
      wx.showModal({
        title: '请选择门店',
        confirmText:'前往选择',
        cancelText:'暂不选择',
        showCancel: true,
        success(res){
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/poststation/map/map',
            })
          }
        }
      })
    } else {
      this.setData({
        businessObj: app.globalData.serviceSelectBusiness
      })
      let that = this;
      this.requestServerList(this.data.businessObj.business.businessNo, function(res){
        that.setData({
          businessServerList: res
        })
      })
    }
    app.globalData.serviceSelectServerType = null; // 服务 选中的服务类型
    app.globalData.serviceSelectServer = null; // 服务 选中的服务
    app.globalData.serviceSelectBeautician = null;// 服务 选中的美容师
    app.globalData.serviceSelectPet =  null; // 服务 选中的宠物
  },
  onLoad: function (a) {
    this.setData({
      currentAddress: app.globalData.currentLocationInfo.address
    })
  },

  /**
   * 查询服务列表
   * @param {*}} businessNo 
   * @param {*} serverListCallback 
   */
  requestServerList: function(businessNo, serverListCallback) {
    ServerManager.getBusinessServerTypeList(businessNo, function(res){
      if (Utils.checkIsFunction(serverListCallback)) {
        serverListCallback(res);
      }
    })
  },

  /**
   * 点击服务类别
   */
  tapServerType: function(res){
    let serverTypeNo = res.currentTarget.dataset.servertypeno;
    let serverTypeName = res.currentTarget.dataset.servertypename;
    wx.navigateTo({
      url: '/pages/poststation/serverList/index' + "?servertypeno=" + serverTypeNo + "&servertypename=" + serverTypeName,
    })
  },

  /**
   * 点击托运
   */
  tapTransport: function() {
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
  },

  /**
   * 洗澡  美容  特色服务
   */
  toReservation: function (res) {
    if (res.currentTarget.dataset.index < 0) {
      return;
    }
    var serverTypeNo = res.currentTarget.dataset.servertypeno;
    var serverType = this.data.businessObj.business.serverTypes[res.currentTarget.dataset.index];
    app.globalData.serviceSelectServerType = serverType
      app.globalData.serviceSelectServer = serverType.child[0].services[0];
      wx.navigateTo({
        url: '/stationsubcontract/pages/appointment/index'
      })
    
  },

  /**
   * 更多门店美容师
   */
  goWorkerPage: function (res) {
    wx.navigateTo({
      url: "/stationsubcontract/pages/beautician/index"
    });
  },

  /**
   * 点击地图查看门店
   */
  gobackMap: function () {
    wx.navigateTo({
      url: "/pages/poststation/map/map"
    });
  },

  /**
   * 点击商家微信二维码
   */
  tapWXQRCode: function(){
    wx.previewImage({
      urls: [this.data.businessObj.business.weChatImg],
    })
  },

  /**
   * 门店详情
   */
  goshopDetail: function () {
    wx.navigateTo({
      url: PagePath.Page_Store_StoreInforMation + '?storeno=' + this.data.businessObj.business.businessNo
    })
  },

  callshop:function(res) {
    wx.makePhoneCall({
      phoneNumber: res.currentTarget.dataset.phonenumber,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },
  /**
   *  选择内置导航
   */
  openLocation: function (res) {
    var o = {
      lat: res.currentTarget.dataset.latitude,
      lng: res.currentTarget.dataset.longitude,
      name: res.currentTarget.dataset.businessname
    };
    var a = JSON.parse(JSON.stringify(o));
    Utils.openBaiduLocation(a);
  },
});