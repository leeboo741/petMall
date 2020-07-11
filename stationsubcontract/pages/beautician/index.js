const app = getApp();
const ServerManager = require("../../../services/serverManager.js");
const UserManager = require("../../../services/userService.js");
const ShareManager = require("../../../services/shareService");
const Utils = require("../../../utils/util.js");

Page({
  data: {
    moreImageUrl: "/resource/redright.png",
    bathImageUrl: "/resource/xz.png",
    facialImageUrl: "/resource/mr.png",
    spImageUrl: "/resource/tsfw.png",
    indicatorDots: !1,
    leftMargin: "0",
    rightMargin: "0",
    currentIndex: 0,
    preCurrentTab: 1,
    currentTab: 1,
    itemNum: 2.6,
    autoplay: !1,
    interval: 5e3,
    duration: 1e3,
    workerId: "",
    bottom: "",
    workerName: "",
    loading: !0,
    bottomHeight: "",
    windowHeight: wx.getSystemInfoSync().windowHeight,
    showToast: !1,
    selectedTab: 1,
    screenWidth: "",
    screenHeight: "",
    apointmentText: "预约",
    px: "",
    rpx: "",
    shopId: "",
    currentId: "",
    px: "",
    
    hastime: !1,
    move: {},
    commentWorkerConfig: {},
    instrodution: "落花有意流水无情！",

    businessObj: null,
    selectedBeauticianNo: null,
  },
  onLoad: function (res) {
    if (app.globalData.serviceSelectBusiness) {
      this.setData({
        businessObj: app.globalData.serviceSelectBusiness,
        selectedBeauticianNo: res.beauticianno
      })
      for (let index = 0; index < this.data.businessObj.business.beauticians.length; index++) {
        let beauticianObj = this.data.businessObj.business.beauticians[index];
        if (beauticianObj.beauticianID == this.data.selectedBeauticianNo) {
          this.setData({
            currentIndex: index
          })
        }
      }
    }
    let e = this;
    wx.getSystemInfo({
      success: function (t) {
        Utils.logInfo(t);
        var a = t.windowWidth, r = t.platform, n = a / 750, i = 750 / a,
          o = t.windowHeight, s = o * i - 442 - 128 - 170;
        e.data.bottom = "ios" == r ? 35 : 15, e.setData({
          bottomHeight: s,
          px: n,
          screenHeight: a,
          screenWidth: o,
          bottom: e.data.bottom + "px"
        });
      }
    });
  },

  /**
   * 预约
   */
  outBtn: function () {
    this.setData({
      showToast: !1
    });
  },

  /**
   * 滑动上一张下一张
   */
  nextWorker: function (t) {
    var e = t.currentTarget.dataset.index, a = this.data.worderList[e].id, r = this.data.selectedTab;
    this.setData({
      currentIndex: e,
      workerId: a,
      selectedTab: 1,
      preCurrentTab: r
    });
  },

  /**
   * swiper 触发事件
   */
  handleChange: function (t) {
    var e = t.detail.current, a = this.data.worderList[e].id, r = this.data.selectedTab;
    this.setData({
      currentIndex: e,
      workerId: a,
      selectedTab: 1,
      preCurrentTab: r
    });
  },

  /**
   * 选择（简介、作品、评价）
   */
  changeTab: function (e) {
    var r = this, i = e.target.dataset.tab, o = this.data.selectedTab;
    if (1 == i) {
      this.setData({

        selectedTab: 1
      });
    }
    if (2 == i) {
      this.setData({

        selectedTab: 2
      });

    } else if (3 == i) {
      this.setData({

        selectedTab: 3
      });

    }
  },

  /**
   * 点赞
   */
  dianzan: function (res) {
    let index = res.currentTarget.dataset.index;
    let able = res.currentTarget.dataset.able;
    let workId = res.currentTarget.dataset.workid;
    let that = this;
    if (able) {
      UserManager.isLogin(function isLoginCallback() {
        ServerManager.addWorkLike(workId, UserManager.getBusinessNo(), function addWorkLikeCallback(result) {
          let num = app.globalData.serviceSelectBusiness.business.beauticians[that.data.currentIndex].works[index].likeNum + 1;
          app.globalData.serviceSelectBusiness.business.beauticians[that.data.currentIndex].works[index].likeNum = num;
          that.setData({
            businessObj: app.globalData.serviceSelectBusiness
          })
        })
      })
    }
  },

  /**
   * 预约按钮修改预约取消
   */
  apointment: function () {
    this.setData({
      showToast: !false
    })
  },
  cancel: function () {
    this.setData({
      showToast: !1
    });
  },


  /**
   * -------服务选择
   */
  toReservation: function (res) {
    let beauticianIndex = this.data.currentIndex;
    let beauticianObj = this.data.businessObj.business.beauticians[beauticianIndex];
    app.globalData.serviceSelectBeautician = beauticianObj;

    let serverTypeNo = res.currentTarget.dataset.servertypeno;
    let serverType = this.data.businessObj.business.serverTypes[res.currentTarget.dataset.index];
    app.globalData.serviceSelectServerType = serverType
      app.globalData.serviceSelectServer = serverType.services[0];
      wx.navigateTo({
        url: '/stationsubcontract/pages/appointment/index'
      })
    this.setData({
      showToast: !1
    });

  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },
});