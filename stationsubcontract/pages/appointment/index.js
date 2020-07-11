
let util=require("../../../utils/util.js");
const Utils = require("../../../utils/util");
const app = getApp();
const ShareManager = require("../../../services/shareService");
const EvaluateManager = require("../../../services/evaluateService");

const Limit = 20;

Page({
  data: {
    bathImg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582454561969&di=8f5b4eaa3326a673f93fd00073d588f1&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D2592316967%2C1965832199%26fm%3D214%26gp%3D0.jpg",
    cosmerImg: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1537387299,3273744325&fm=26&gp=0.jpg",
    spImg: "http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/miniprogram/15675930913972998523.png",
    titleName: "",
    minprice: "",
    name: "",
    num: 6666,
    customerPet: {
      avatar:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1829258171,2050240433&fm=26&gp=0.jpg",
      nickName:"旺财",
      typeName:"金毛"
    },
    remind: [],
    apointmentKnow: [],
    serviceImg: [
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582455345316&di=fa37532b7e8816b2ebfdf02060d22b7a&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D3424732312%2C3410949748%26fm%3D214%26gp%3D0.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582454554839&di=ca77ba3b2477f3212ed5131c0dbe4d53&imgtype=0&src=http%3A%2F%2Fi2.chinanews.com%2Fsimg%2Fhd%2F2014%2F09%2F04%2Fd42f0a460032457da255bfbc5fad3e58.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582454554867&di=df9d73c64e3b103df75e86f2ea505c36&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-vo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F3801213fb80e7bec49d254762f2eb9389b506b18.jpg"
    ],
    hasPet: 1,
    showType: 1,
    px: util.getSystemInfo().px,
    rpx: "",
    preCurrentTab: 1,
    hasOldpet: 1,
    page: 1,
    currentTab: 1,
    miniPrice: "666",
    vip_price: "",
    vipMiniPrice: "",
    show: {},
    onshow: {},
    onhide: {},
    serviceType: "",
    shopId: "12",
    serviceId: "",
    strp: "",
    notAppoint: !1,
    delPet: !1,
    isshowmore: !1,
    totalAmount: "",
    commentWorkerConfig: "",
    commentList: [],
    selectedPet: {},
    disabled_tip: "",
    serviceCardId: "",
    fxtext: "可返现一万",
    cashBackIsOpen: 0,
    grainGoldRate: "",

    businessObj: null,
    serverObj: null,
    petObj: null,
    evaluateList: [],
    offset: 0,
  },
  onLoad: function (res) {
    if (app.globalData.serviceSelectServer) {
      this.setData({
        serverObj: app.globalData.serviceSelectServer,
        businessObj: app.globalData.serviceSelectBusiness,
        titleName: app.globalData.serviceSelectServer.serviceName
      })
      wx.startPullDownRefresh();
    }
  },
  onShow: function () {
    if (app.globalData.serviceSelectPet) {
      this.setData({
        petObj: app.globalData.serviceSelectPet
      })
    }
  },
  onReady: function () {
   
  },
  getScrollMsg: function (t) {
   
  },
  show: function (t) {
    
  },
  getStrp: function (t, e, a) {
  
  },
  updateMsg: function () {
   
  },
  initData: function (t) {
   
  },
  updateserviceDetail: function () {
   
  },
  updateServicePrice: function () {
    
  },
  addhttp: function (e) {
   
  },
  showStat: function (t) {
    
  },
  getMinPrice: function (t) {
    
  },
  refrush: function () {
    
  },
  bindscrolltolower: function () {
    3 == this.data.currentTab && this.refrush();
  },
  goSelectPet: function () {
    wx.navigateTo({
      url: '/stationsubcontract/pages/mypet/index',
    })
  },
  goApoint: function () {
    if (!app.globalData.serviceSelectPet) {
      wx.showToast({
        title: '请先选择宠物',
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/poststation/order/index?type=0',
    })
  },
  goupmypet: function () {
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },
  changeItem: function (t) {
    var e = t.currentTarget.dataset.tabindex;
    this.data.preCurrentTab = this.data.currentTab, this.setData({
      preCurrentTab: this.data.preCurrentTab,
      currentTab: e
    });
  },

  onPullDownRefresh: function() {
    let that = this;
    this.data.offset = 0;
    this.getEvaluateList(this.data.serverObj.serviceID, function(evaluateList){
      Utils.logInfo("evaluateList :\n" + JSON.stringify(evaluateList));
      let tempList = [];
      if (evaluateList) {
        tempList = evaluateList;
      }
      that.setData({
        evaluateList: tempList
      })
      wx.stopPullDownRefresh();
    })
  },
  onReachBottom: function() {
    let that = this;
    that.getEvaluateList(that.data.serverObj.serviceID, function(evaluateList) {
      Utils.logInfo("evaluateList :\n" + JSON.stringify(evaluateList));
      let tempList = that.data.evaluateList;
      if (Utils.checkEmpty(evaluateList)) {
        wx.showToast({
          title: '已经到底了!',
          icon: 'none',
        })
      } else {
        tempList = tempList.concat(evaluateList);
        that.setData({
          evaluateList: tempList
        })
      }
    })
  },
  getEvaluateList: function(serverNo, getEvaluateCallback) {
    let that = this;
    let param = {
      serviceId: serverNo,
      limit: Limit,
      offset: this.data.offset
    }
    EvaluateManager.getServerEvaluateList(param, function(dataSource){
      Utils.logInfo('服务评价列表:', JSON.stringify(dataSource));
      that.data.offset = that.data.offset + Limit;
      if (Utils.checkIsFunction(getEvaluateCallback)) {
        getEvaluateCallback(dataSource);
      }
    })
  }
});