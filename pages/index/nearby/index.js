// pages/index/nearby/index.js
const app = getApp();
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
var City = require('../../../utils/city.js');
const Limit = 20;
const PetService = require("../../../services/petService.js");
const {
  PetFilterObj
} = require("../../../entity/petFilterObj.js");
const Enum = require("../../../utils/enum.js");
const Util = require("../../../utils/util.js");
const PagePath = require("../../../macros/pagePath.js");
const LocationService = require("../../../services/locationService.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 0, // 页码
    breedNo: null, // 品种编号
    requestType: null, // 请求类型 最新上架 精品 高端 全部

    loadState: LoadFootItemState.Loading_State_Normal, // 底部状态
    pageHeight: null,
    pageTitle: null,

    dataSourceType: [], //选择框数据类型

    //是否隐藏蒙版
    maskVarietiesShow: true,
    maskFavoritegrainShow: true,
    maskbrandShow: true,

    showDropDownMessage: true, //是隐藏下拉框信息
    selectQualificationsDatas: [
      "不限", "2000以下", "2000-5000", "5000-10000", "10000以上"
    ], // 价格
    selectReputation: [
      "不限", "个人", "商户"
    ], // 来源
    titleSelectList: [{
        selectInfo: "全部",
        showSelect: true, //icon 切换
      },
      {
        selectInfo: "价格",
        showSelect: true,
      },
      {
        selectInfo: "来源",
        showSelect: true,
      }
    ],
    petsInforMation: [],
    /**-------------------位置------------------------- */
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0, //置顶高度
    scrollTopId: '', //置顶id
    city: "全部",
    hotcityList: [
      {
        cityCode: 100000,
        city: '全部'
      },
      {
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
    console.log("Nearby Options: \n" + JSON.stringify(options));
    let that = this;
    that.setData({
      pageHeight: app.globalData.pageHeight,
      requestType: options.requesttype,
      pageTitle: options.pagetitle,
      breedNo: options.breedno,
    })

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
    let that = this;
    wx.showLoading({
      title: '定位中...',
    })
    LocationService.getCurrentLocationInfo(
      function callback(res) {
        console.log(JSON.stringify(res));
        wx.hideLoading();

        let city = res.address_component.city;
        app.globalData.currentCity = city;


        that.data.titleSelectList[0].selectInfo = app.globalData.currentCity;
        that.setData({
          city: app.globalData.currentCity,
          titleSelectList: that.data.titleSelectList
        })
        wx.startPullDownRefresh();
      }
    )
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
    this.data.pageIndex = 0;
    this.requestPetData(this.data.pageIndex,
      function getDataCallback(data) {
        wx.stopPullDownRefresh();
        that.setData({
          petsInforMation: data.root,
          pageIndex: that.data.pageIndex + Limit
        })
        if (data.root.length >= Limit) {
          that.setData({
            loadState: LoadFootItemState.Loading_State_Normal
          })
        } else if (data.root.length < Limit && data.root.length > 0) {
          that.setData({
            loadState: LoadFootItemState.Loading_State_End
          })
        } else {
          that.setData({
            loadState: LoadFootItemState.Loading_State_Empty
          })
        }
      }
    )
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.loadState == LoadFootItemState.Loading_State_End 
    || this.data.loadState == LoadFootItemState.Loading_State_Loading) {
      return;
    }
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    let that = this;
    this.requestPetData(this.data.pageIndex,
      function getDataCallback(data) {
        let tempList = that.data.petsInforMation.concat(data.root);
        that.setData({
          petsInforMation: tempList
        })
        that.data.pageIndex = that.data.pageIndex + Limit;
        if (data.root.length >= Limit) {
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

  //选择城市
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

  //选择热门城市
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
  //点击热门城市回到顶部
  hotCity: function() {
    this.setData({
      scrollTop: 0,
    })
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
   * 请求数据
   * @param offset 
   * @param getDataCallback 获取数据回调
   */
  requestPetData: function(offset, getDataCallback) {
    switch (this.data.requestType) {
      case Enum.Nearby_RequestType_Enum.Newest:
        this.requestNewest(offset,
          function getNewestCallback(data) {
            if (Util.checkIsFunction(getDataCallback)) {
              getDataCallback(data);
            }
          }
        )
        break;
      case Enum.Nearby_RequestType_Enum.Fine:
        this.requestFine(offset,
          function getFineCallback(data) {
            if (Util.checkIsFunction(getDataCallback)) {
              getDataCallback(data);
            }
          }
        )
        break;
      case Enum.Nearby_RequestType_Enum.UpScale:
        this.requestUpScale(offset,
          function getUpScaleCallback(data) {
            if (Util.checkIsFunction(getDataCallback)) {
              getDataCallback(data);
            }
          }
        )
        break;
      case Enum.Nearby_RequestType_Enum.All:
        this.requestAll(offset,
          function getAllCallback(data) {
            if (Util.checkIsFunction(getDataCallback)) {
              getDataCallback(data);
            }
          }
        )
        break;
    }

  },

  /**
   * 所有请求
   * @param offset
   * @param getAllCallback
   */
  requestAll: function(offset, getAllCallback) {
    let that = this;
    PetService.getPetList(this.getPetFilterObj(offset),
      function getResultCallback(result) {
        console.log("all:\n" + JSON.stringify(result));
        if (Util.checkIsFunction(getAllCallback)) {
          getAllCallback(result);
        }
      }
    )
  },

  /**
   * 请求最新
   * @param offset
   * @param getNewestCallback
   */
  requestNewest: function(offset, getNewestCallback) {
    let that = this;
    PetService.getNewestPet(this.getPetFilterObj(offset),
      function getResultCallback(result) {
        console.log("newest:\n" + JSON.stringify(result));
        if (Util.checkIsFunction(getNewestCallback)) {
          getNewestCallback(result);
        }
      }
    )
  },

  /**
   * 请求精品
   * @param offset
   * @param getNewestCallback
   */
  requestFine: function(offset, getFineCallback) {
    let that = this;
    PetService.getFinePet(this.getPetFilterObj(offset),
      function getResultCallback(result) {
        console.log("fine:\n" + JSON.stringify(result));
        if (Util.checkIsFunction(getFineCallback)) {
          getFineCallback(result);
        }
      }
    )
  },

  /**
   * 请求高端
   * @param offset
   * @param getNewestCallback
   */
  requestUpScale: function(offset, getUpScaleCallback) {

    let that = this;
    PetService.getUpScalePet(this.getPetFilterObj(offset),
      function getResultCallback(result) {
        console.log("upscale:\n" + JSON.stringify(result));
        if (Util.checkIsFunction(getUpScaleCallback)) {
          getUpScaleCallback(result);
        }
      }
    )
  },

  /**
   * 获取PetFilterObj
   */
  getPetFilterObj: function(offset){
    let tempCity = this.data.titleSelectList[0].selectInfo;
    if (tempCity == "全部") {
      tempCity = "";
    }
    let tempStartPrice = "";
    let tempEndPrice = "";
    let tempPrice = this.data.titleSelectList[1].selectInfo;
    if (tempPrice == "2000以下") {
      tempEndPrice = "2000";
    } else if (tempPrice == "2000-5000") {
      tempStartPrice = "2000";
      tempEndPrice = "5000";
    } else if (tempPrice == "5000-10000") {
      tempStartPrice = "5000";
      tempEndPrice = "10000";
    } else if (tempPrice == "10000以上") {
      tempStartPrice = "10000";
    }
    let tempAuth = this.data.titleSelectList[2].selectInfo;
    if (tempAuth == "来源" || tempAuth == "不限") {
      tempAuth = "";
    } else {
      if (tempAuth == "个人") {
        tempAuth = 1;
      } else if (tempAuth == "商户") {
        tempAuth = 2;
      }
    }

    let tempBreedno = ""
    if (!Util.checkEmpty(this.data.breedNo)) {
      tempBreedno = this.data.breedNo;
    }

    let petFilterObj = new PetFilterObj({
      offset: offset,
      limit: Limit,
      city: tempCity,
      priceStart: tempStartPrice,
      priceEnd: tempEndPrice,
      authType: tempAuth,
      petGenreNo: tempBreedno
    })
    console.log("Pet Filter Obj:\n" + JSON.stringify(petFilterObj));
    return petFilterObj;
  },

  /**
   * 点击宠物
   */
  tapPets: function (e) {
    wx.navigateTo({
      url: PagePath.Page_Store_PetsInforMation + '?petno=' + e.currentTarget.dataset.petno
    })
  }
})