// pages/store/index.js
var City = require('../../utils/city.js');
const Page_path = require("../../macros/pagePath.js");
const StoreService = require("../../services/storeService.js");
const LocationService = require("../../services/locationService.js");
const LoadFootItemState = require("../../lee-components/leeLoadingFootItem/loadFootObj.js");
const app = getApp();
const Limit = 20;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadState: LoadFootItemState.Loading_State_Normal, // 底部状态
    offset: 0,
    pageHeight: null,
    titleSelectList: [
      {
        selectInfo: "全部",
        showSelect: true, //icon 切换
      },
      {
        selectInfo: "资质",
        showSelect: true,
      },
      {
        selectInfo: "信誉",
        showSelect: true,
      }
    ],
    recommendedBusinesses: [], //推荐商家
    merchantInformationList: [],//商家信息
    dataSourceType: [],
    //是否隐藏蒙版
    maskVarietiesShow: true,
    maskFavoritegrainShow: true,
    maskbrandShow: true,
    showDropDownMessage: true, //是隐藏下拉框信息
    selectQualificationsDatas: [
      "不限", "实名认证", "商家认证", "平台认证"
    ],
    selectReputation: [
      "不限", "交易量", "好评数"
    ],

    /////-------地理位置选择数据-------------
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0, //置顶高度
    scrollTopId: '', //置顶id
    city: "全部",
    hotcityList: [{
        cityCode: 110000,
        city: '北京市'
      },
      {
        cityCode: 310000,
        city: '上海市'
      },
      {
        cityCode: 440100,
        city: '广州市'
      },
      {
        cityCode: 440300,
        city: '深圳市'
      },
      {
        cityCode: 330100,
        city: '杭州市'
      },
      {
        cityCode: 320100,
        city: '南京市'
      },
      {
        cityCode: 420100,
        city: '武汉市'
      },
      {
        cityCode: 410100,
        city: '郑州市'
      },
      {
        cityCode: 120000,
        city: '天津市'
      },
      {
        cityCode: 610100,
        city: '西安市'
      },
      {
        cityCode: 510100,
        city: '成都市'
      },
      {
        cityCode: 500000,
        city: '重庆市'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      pageHeight: app.globalData.pageHeight
    })
    // 生命周期函数--监听页面加载
    var searchLetter = City.searchLetter;
    var cityList = City.cityList();

    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var itemH = winHeight / searchLetter.length;

    var tempObj = [];
    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;
      tempObj.push(temp)
    }
    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj,
      cityList: cityList
    })
    this.getRecommendStore();
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
    this.data.titleSelectList[0].selectInfo = app.globalData.currentCity;
    this.setData({
      city: app.globalData.currentCity,
      titleSelectList: this.data.titleSelectList
    })
    wx.startPullDownRefresh();
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
    let that = this;
    this.data.offset = 0;
    this.getStoreInformation(this.data.offset, Limit, 
      function getResultCallback (result) {
        that.setData({
          merchantInformationList: result
        })
        that.data.offset = that.data.offset + Limit;
        if (result.length >= Limit) {
          that.setData({
            loadState: LoadFootItemState.Loading_State_Normal
          })
        } else if (result.length < Limit && result.length > 0) {
          that.setData({
            loadState: LoadFootItemState.Loading_State_End
          })
        } else {
          that.setData({
            loadState: LoadFootItemState.Loading_State_Empty
          })
        }
        wx.stopPullDownRefresh();
      }
    );
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.loadState == LoadFootItemState.Loading_State_End) {
      return;
    }
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    let that = this;
    this.getStoreInformation(this.data.offset, Limit, 
      function getMoreResultCallback(result){
        let tempList = that.data.merchantInformationList.concat(result);
        that.setData({
          merchantInformationList: tempList
        })
        that.data.offset = that.data.offset + Limit;
        if (result.length >= Limit) {
          that.setData({
            loadState: LoadFootItemState.Loading_State_Normal
          })
        } else {
          that.setData({
            loadState: LoadFootItemState.Loading_State_End
          })
        }
      }
    )
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 头部下拉选择显示
   */
  titleSelectTap: function(e) {
    let that = this;
    var selectType = e.currentTarget.dataset.index; //下标
    var upone = "titleSelectList[" + 0 + "].showSelect"; //数组进行字符串拼接 下拉提示信息1
    var uptwo = "titleSelectList[" + 1 + "].showSelect"; //下拉提示信息2
    var upthree = "titleSelectList[" + 2 + "].showSelect"; //下拉提示信息3
    this.setData({
      titleSelectIndex: selectType,
    })

    if (selectType == 0) { //判断类型显示各个属性值
      that.setData({
        [upone]: !that.data.titleSelectList[0].showSelect, //替换数组里的某个属性
        [uptwo]: true, //下拉箭头方向
        [upthree]: true, //下拉箭头方向
        maskVarietiesShow: !that.data.maskVarietiesShow, //蒙版点击
        maskFavoritegrainShow: true, //其他两块蒙版是否隐藏
        maskbrandShow: true, //其他两块蒙版是否隐藏
        showDropDownMessage: true,
        dataSourceType: []
      })

    }

    if (selectType == 1) {
      that.setData({
        [uptwo]: !that.data.titleSelectList[1].showSelect,
        [upone]: true,
        [upthree]: true,
        dataSourceType: that.data.selectQualificationsDatas,
        maskFavoritegrainShow: !that.data.maskFavoritegrainShow,
        maskVarietiesShow: true,
        maskbrandShow: true
      })
    }

    if (selectType == 2) {
      that.setData({
        [upthree]: !that.data.titleSelectList[2].showSelect,
        [upone]: true,
        [uptwo]: true,
        dataSourceType: that.data.selectReputation,
        maskbrandShow: !that.data.maskbrandShow,
        maskFavoritegrainShow: true,
        maskVarietiesShow: true
      })
    }

    if (that.data.titleSelectList[selectType].showSelect == true) { //下拉信息显示
      that.setData({
        showDropDownMessage: true
      })
    } else {
      that.setData({
        showDropDownMessage: false
      })
    }

  },

  /**
   * 点击蒙版----------------------------------
   */

  maskFavoritegrainTap: function() {
    var uptwo = "titleSelectList[" + 1 + "].showSelect";
    let that = this;
    if (that.data.maskFavoritegrainShow == false) {
      that.setData({
        maskFavoritegrainShow: true,
        showDropDownMessage: true,
        [uptwo]: true
      })
    }
  },

  maskbrandTap: function() {
    var upthree = "titleSelectList[" + 2 + "].showSelect";
    let that = this;
    if (that.data.maskbrandShow == false) {
      that.setData({
        maskbrandShow: true,
        showDropDownMessage: true,
        [upthree]: true
      })
    }
  },

  /**
   * 城市选择首字母选择
   */
  clickLetter: function(e) {
    console.log(e.currentTarget.dataset.letter)
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    var that = this;
    setTimeout(function() {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },

  /**
   * 选择城市
   */
  bindCity: function(e) {
    var selectAddress = "titleSelectList[" + 0 + "].selectInfo";
    var selecticon = "titleSelectList[" + 0 + "].showSelect";
    this.setData({
      [selectAddress]: e.currentTarget.dataset.city,
      [selecticon]: true,
      maskVarietiesShow: true
    })

    wx.startPullDownRefresh();
  },

  /**
   * 选中当前定位城市
   */
  tapCurrentCity: function(e) {
    var selectAddress = "titleSelectList[" + 0 + "].selectInfo";
    var selecticon = "titleSelectList[" + 0 + "].showSelect";
    this.setData({
      [selectAddress]: e.currentTarget.dataset.city,
      [selecticon]: true,
      maskVarietiesShow: true
    })
    wx.startPullDownRefresh();
  },

  /**
   * 选择热门城市
   */
  bindHotCity: function(e) {
    var selectAddress = "titleSelectList[" + 0 + "].selectInfo";
    var selecticon = "titleSelectList[" + 0 + "].showSelect";
    this.setData({
      [selectAddress]: e.currentTarget.dataset.city,
      [selecticon]: true,
      maskVarietiesShow: true,
    })

    wx.startPullDownRefresh();
  },

  /**
   * 点击热门城市回到顶部
   */
  hotCity: function() {
    this.setData({
      scrollTop: 0,
    })
  },

  /**
   *  点击下拉信息选中
   */
  selectDataSourceTypeTap: function(res) {
    var actionIndex = res.currentTarget.dataset.index;
    if (this.data.titleSelectIndex == 1) {
      let selectAuth = "titleSelectList[" + 1 + "].selectInfo"
      var selecticon = "titleSelectList[" + 1 + "].showSelect";
      this.setData({
        [selectAuth]: res.currentTarget.dataset.value,
        [selecticon]: true,
        maskFavoritegrainShow: true,
        showDropDownMessage: true
      })
    } else if (this.data.titleSelectIndex == 2) {

      let selectCredit = "titleSelectList[" + 2 + "].selectInfo"
      var selecticon = "titleSelectList[" + 2 + "].showSelect";
      this.setData({
        [selectCredit]: res.currentTarget.dataset.value,
        [selecticon]: true,
        maskbrandShow: true,
        showDropDownMessage: true
      })
    }
    wx.startPullDownRefresh();
  },

  /**
   * 点击头像查看商家信息
   */
  recommendedTap: function(res) {
    let actionRes = encodeURIComponent(JSON.stringify(res.currentTarget.dataset.item));
    wx.navigateTo({
      url: Page_path.Page_Store_StoreInforMation + '?resinfo=' + actionRes
    })

  },

  /**
   * 点击宠物图片查看详情  Page_Store_PetsInforMation
   */
  petsInforTap: function(res) {
    let actionIndex = encodeURIComponent(JSON.stringify(res.currentTarget.dataset.index));
    let actionItem = encodeURIComponent(JSON.stringify(res.currentTarget.dataset.item));
    wx.navigateTo({
      url: Page_path.Page_Store_PetsInforMation + '?petsindex=' + actionIndex + "&petsitem=" + actionItem
    })
  },

  /**
   * 获得商家数据
   * @param start offset
   * @param end limit
   * @param callback 结果回调
   */
  getStoreInformation: function(start, end, callback) {
    let that = this;
    let tempCity = this.data.titleSelectList[0].selectInfo;
    if (tempCity == "全部") {
      tempCity = "";
    }
    let tempAuth = this.data.titleSelectList[1].selectInfo;
    if (tempAuth == "不限" || tempAuth == "资质") {
      tempAuth = "";
    } else {
      if (tempAuth == "实名认证") {
        tempAuth = 1;
      } else if (tempAuth == "商家认证") {
        tempAuth = 2;
      } else {
        tempAuth = 3;
      }
    }
    let tempCredit = this.data.titleSelectList[2].selectInfo;
    let tempCredit1 = "";
    let tempCredit2 = "";
    if (tempCredit == "交易量") {
      tempCredit1 = "是";
    } else if (tempCredit == "好评数") {
      tempCredit2 = "是";
    }
    StoreService.getStoreInfomation(tempCity, tempAuth, tempCredit1, tempCredit2, start, end,
      function callBackDataSource(data){
        if (callback != null && typeof callback == "function") {
          callback(data);
        }
      }
    )
  },

  /**
   * 获取推荐商家
   */
  getRecommendStore: function() {
    let that = this;
    StoreService.getRecommendBusiness({
        offset: 0,
        limit: 10,
      },
      function getResultCallback(result) {
        that.setData({
          recommendedBusinesses: result.root
        })
      }
    )
  },
})