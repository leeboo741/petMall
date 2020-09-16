// pages/store/storeinformation/index.js
const app = getApp();
const PagePath = require("../../../macros/pagePath.js");
const StoreService = require("../../../services/storeService.js");
const Util = require("../../../utils/util.js");
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const MallService=require("../../../services/mallService.js");
const UserService=require("../../../services/userService.js");
const Limit = 20;
const ShareManager = require("../../../services/shareService");
const ServerManager = require("../../../services/serverManager");
const Utils = require("../../../utils/util");
const { MINI_PROGRAME_APPID_PETTRANSPORT, ENV_CURRENT } = require("../../../macros/config.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {

    loadStateList: {
      "0" : LoadFootItemState.Loading_State_Empty,
      "1" : LoadFootItemState.Loading_State_Empty,
      "2" : LoadFootItemState.Loading_State_Empty,
    },
    offsetList: {
      "0" : 0,
      "1" : 0,
      "2" : 0,
    },
    storeNo: null, // 商家编号

    storeDetail: null, // 商城详情
    petList: null, // 宠物列表
    itemList: null, // 商品列表
    serviceList: null, // 服务列表

    navHeight: app.globalData.naviHeight ,  //navHeight
    pageHeight:null,
    
    buisnessList: [
      "宠物","商品","服务","简介" 
    ],
    currentIndex: 0,

    label:[
      "平台认证","实名认证","已纳押金","商家认证"
    ],

    onPageScroll:false,

    busandself:false,   //是否隐藏关注按钮
    followType:0, //关注类型

    mask: true,

    fromPosition: false, // 是否从驿站而来, 控制是否需要组装和清除 app.globalData.serviceSelectBusiness

    businessInfo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.setData({
      pageHeight: app.globalData.pageHeight,
      storeNo: options.storeno,
      fromPosition: app.globalData.serviceSelectBusiness?true: false
    })
    UserService.isLogin(function isLoginCallback(){
      UserService.requestBusinessInfo(UserService.getBusinessNo(), function (dataSource) {
        that.setData({
          businessInfo: dataSource
        })
      })
    })
    that.getStoreDetail(that.data.storeNo,
      function getStoreDetailCallback(storeDetail) {
        that.setData({
          storeDetail: storeDetail,
        })
        wx.startPullDownRefresh();
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
    this.getBusinessFollow(); 
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
    if (!this.data.fromPosition) {
      app.globalData.serviceSelectBusiness = null;
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.offsetList[this.data.currentIndex]=0;
    let that = this;
    if (that.data.currentIndex == 0){    //宠物或商品
      that.getStorePetList({
        businessNo: that.data.storeDetail.businessNo,
        petState: 1
      }, function getPetListCallback(data) {
        Utils.logInfo("store pet : \n" + JSON.stringify(data));
        that.setData({
          petList: data
        })
        if (data.length >= Limit) {
          that.setLoadState(LoadFootItemState.Loading_State_Normal);
        } else if (data.length < Limit && data.length > 0) {
          that.setLoadState(LoadFootItemState.Loading_State_End);
        } else {
          that.setLoadState(LoadFootItemState.Loading_State_Empty);
        }
      }, function complete(res) {
        that.setLoadState(LoadFootItemState.Loading_State_Normal);
        wx.stopPullDownRefresh();
      })
    } else if (that.data.currentIndex == 1) {
      that.getBusinessReleaseMall(that.data.storeDetail.businessNo, that.data.offsetList[that.data.currentIndex],function getResultCallback(data) {
        that.setData({
          itemList: data
        })
        if (data.length >= Limit) {
          that.setLoadState(LoadFootItemState.Loading_State_Normal);
        } else if (data.length < Limit && data.length > 0) {
          that.setLoadState(LoadFootItemState.Loading_State_End);
        } else {
          that.setLoadState(LoadFootItemState.Loading_State_Empty);
        }
      }, function completeCallback(res) {
        that.setLoadState(LoadFootItemState.Loading_State_Normal);
        wx.stopPullDownRefresh();
      })
    } else if (that.data.currentIndex == 2) {
      that.getServerReleaselist(that.data.offsetList[that.data.currentIndex],function(data){
          that.setData({
            serviceList: data
          })
          that.setLoadState(LoadFootItemState.Loading_State_End);
      }, function(res){
        that.setLoadState(LoadFootItemState.Loading_State_Normal);
      },function(res) {
        wx.stopPullDownRefresh({
          success: (res) => {},
        })
      })
    } else {
      wx.stopPullDownRefresh();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that=this;
    if (that.data.loadStateList[that.data.currentIndex] == LoadFootItemState.Loading_State_End
      || that.data.loadStateList[that.data.currentIndex] == LoadFootItemState.Loading_State_Loading) {
      return;
    }
    that.setLoadState(LoadFootItemState.Loading_State_Loading);
    if (this.data.buisnessCurrent == 0) {
      that.getStorePetList({
        businessNo: this.data.storeDetail.businessNo,
        petState: 1
      }, function getPetListCallback(data) {
        Utils.logInfo("store pet : \n" + JSON.stringify(data));
        let list = that.data.petList.concat(data);
        that.setData({
          petList: list
        })
        if (data.length >= Limit) {
          that.setLoadState(LoadFootItemState.Loading_State_Normal);
        } else if (data.length < Limit) {
          that.setLoadState(LoadFootItemState.Loading_State_End);
        }
      }, function complete(res) {
        that.setLoadState(LoadFootItemState.Loading_State_Normal);
      })
    } else if (that.data.currentIndex == 1) {
      that.getBusinessReleaseMall(that.data.storeDetail.businessNo, that.data.offsetList[that.data.currentIndex],function getResultCallback(res) {
        let list = that.data.itemList.concat(data);
        that.setData({
          itemList: list
        })
        if (data.length >= Limit) {
          that.setLoadState(LoadFootItemState.Loading_State_Normal);
        } else if (data.length < Limit) {
          that.setLoadState(LoadFootItemState.Loading_State_End);
        }
      }, function completeCallback(res) {
        that.setLoadState(LoadFootItemState.Loading_State_Normal);
      })
    }
  },

  setLoadState: function(state) {
    let loadStateStr = "loadStateList[" + this.data.currentIndex + "]";
    this.setData({
      [loadStateStr] : state
    })
  },

  /**
   * 点击二维码
   */
  tapQRCode: function (e) {
    wx.previewImage({
      urls: [e.currentTarget.dataset.url],
    })
  },

  /**
   * 点击商家图片
   */
  tapShopImg: function (e) {
    wx.previewImage({
      urls: this.data.storeDetail.shopImg,
      current: e.currentTarget.dataset.url
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getBusinessShareData(this.data.storeDetail.businessName,this.data.storeDetail.businessNo, this.data.storeDetail.headImg);
  },

  /**
   * 点击宠物托运
   */
  tapTransport: function(){

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
   * 点击服务类别
   */
  tapServerItem: function(res) {
    let serverTypeNo = res.currentTarget.dataset.servertypeno;
    let serverTypeName = res.currentTarget.dataset.servertypename;
    if (!this.data.fromPosition) {
      app.globalData.serviceSelectBusiness = {business: this.data.storeDetail}
    }
    wx.navigateTo({
      url: '/pages/poststation/serverList/index' + "?servertypeno=" + serverTypeNo + "&servertypename=" + serverTypeName,
    })
  },

  /**
   * 点击分享
   */
  shareTap:function(){
    this.setData({
        mask:false
    })
  },

  /**
   * 点击蒙版
   */
  maskTap:function(){
    this.setData({
      mask:true
    })
  },

   /**
   * 点击title
   */
  buisnessTap: function (res) {
    let that = this;
    if (res.currentTarget.dataset.index != this.data.currentIndex) {
      that.setData({
        currentIndex: res.currentTarget.dataset.index
      })
      if (this.data.currentTarget != 3) {
        wx.startPullDownRefresh()
      }
    } 
  },

  /**
   * 点击宠物图片跳转
   */
  petsInforTap:function(res){
    wx.navigateTo({
      url: PagePath.Page_Store_PetsInforMation + '?petno=' + res.currentTarget.dataset.petno
    })
  },

  /**
   * 点击商品
   */
  commodityInforMationTap: function (res) {
    wx.navigateTo({
      url: PagePath.Page_Mall_CommodityInformation + "?itemno=" + res.currentTarget.dataset.itemno
    })
  },

  /**
   * 点击拨打
   */
  tapCall: function(e) {
    if (!e.currentTarget.dataset.phone) {
      wx.showToast({
        title: '暂无商家电话',
        icon: 'none'
      })
      return;
    }
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  },

  /**
   * 监听页面滑动
   */
  onPageScroll(e) {
    let that=this;
    if (e.scrollTop>=74){
      that.setData({
        onPageScroll:true
      })
    }else{
      that.setData({
        onPageScroll:false
      })
    }
  },

  /**
   * 打开导航
   */
  openLocation: function() {
    var o = {
      lat: this.data.storeDetail.latitude,
      lng: this.data.storeDetail.longitude,
      name: this.data.storeDetail.businessName
    };
    var a = JSON.parse(JSON.stringify(o));
    Util.openBaiduLocation(a);
  },

  /**
   * 获取商家详情
   * @param storeNo
   * @param getStoreDetailResultCallback
   */
  getStoreDetail: function ( storeNo, getStoreDetailResultCallback) {
    StoreService.getStoreDetail(storeNo,
      function getResultCallback(result) {
        if (Util.checkIsFunction(getStoreDetailResultCallback)) {
          getStoreDetailResultCallback(result.root)
        }
      }
    )
  },

  /**
   * 获取服务列表
   */
  getServerReleaselist: function(offset, callback, failCallback,completeCallback) {
    let that = this;
    ServerManager.getBusinessServerTypeList(that.data.storeDetail.businessNo, function(result){
      if (Util.checkIsFunction(callback)) {
        callback(result)
      }
    }, function(res){
      if (Util.checkIsFunction(failCallback) ){
        failCallback(res);
      }
    }, function(res){
      if (Util.checkIsFunction(completeCallback)) {
        completeCallback(res);
      }
    })
  },

  /**
   * 获得商品发布列表
   */
  getBusinessReleaseMall: function (businessNo,offset, callBack, completeCallback) {
   let param = {
     businessNo: businessNo,
     offset: offset,
     limit: Limit,
   }
   let that = this;
   MallService.getItemList(param, function (data) {
     that.data.offsetList[that.data.currentIndex] += Limit;
     if (Util.checkIsFunction(callBack)) {
      callBack(data.root)
     }
   }, function (res) {
     if(Util.checkIsFunction(completeCallback)) {
      completeCallback(res)
     }
   })
 },

  /**
   * 获取商家宠物列表
   * @param storeNo
   * @param getPetListCallback
   * paramPet 宠物传输对象
   */
  getStorePetList: function (paramPet, getPetListCallback, completeCallback) {
    let that = this;
    StoreService.getStorePetList(paramPet, 
      function getResultCallback(result) {
        that.data.offsetList[that.data.currentIndex] += Limit;
        if (Util.checkIsFunction(getPetListCallback)) {
          getPetListCallback(result.root)
        }
      },
      function(res) {
        if (Util.checkIsFunction(completeCallback)) {
          completeCallback (res);
        }
      }
    )
  },

  /**
   * 关注或取消关注
   */
  businessFollowTap:function(){
    let that=this;
    UserService.isLogin(function isLoginCallback(){
      let followObj = {
        business: {
          businessNo: UserService.getBusinessNo(),
        },
        followBusiness: {
          businessNo: that.data.storeNo
        },
        pet: null,
        item: null,
        followType: 1
      } //关注接口对象
      if (that.data.followType == 0) {   //关注
        UserService.addBusinessFollow(followObj, function (dataSource) {
          Utils.logInfo("关注信息===>" + JSON.stringify(dataSource))
          if (dataSource.root == "操作成功") {
            wx.showToast({
              title: dataSource.root,
            })
            that.setData({
              followType: 1
            })
          } else {
            wx.showToast({
              title: '操作失败',
              icon: "none"
            })
          }
        })
      } else {  //取消关注
        UserService.businessUnFollow(followObj, function (dataSource) {
          Utils.logInfo("关注信息===>" + JSON.stringify(dataSource))
          if (dataSource.root == "操作成功") {
            wx.showToast({
              title: dataSource.root,
            })
            that.setData({
              followType: 0
            })
          } else {
            wx.showToast({
              title: '操作失败',
              icon: "none"
            })
          }
        })
      }
    })
  },

  /**
   * 查看关注是否关注状态
   */
  getBusinessFollow:function(){
    let that=this;
    UserService.isLogin(function isLoginCallback(){
      if (that.data.storeNo == UserService.getBusinessNo()) {    //判断查看的是否是自己信息
        that.setData({
          busandself: true
        })
      } else {
        that.setData({
          busandself: false
        })
        let followObj = {
          business: {
            businessNo: UserService.getBusinessNo(),
          },
          followBusiness: {
            businessNo: that.data.storeNo
          },
          pet: null,
          item: null,
          followType: 1
        }
        UserService.getBusinessFollowAndFs(followObj, function (dataSource) {
          if (dataSource.root == null) {
            that.setData({
              followType: 0
            })
          } else {
            that.setData({
              followType: 1
            })
          }
        })
      }
    })
  },


  tapCallPhone: function(e) {
    if (e.currentTarget.dataset.phone) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone,
      })
    }
  }
})