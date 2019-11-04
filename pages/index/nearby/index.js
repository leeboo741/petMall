// pages/index/nearby/index.js
const app = getApp();
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
var City = require('../../../utils/city.js');
const Limit = 20;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempTimeInterval: null,
    pageIndex: 0, // 页码
    loadState: LoadFootItemState.Loading_State_Normal, // 底部状态
    pageHeight:null,

    dataSourceType: [], //选择框数据类型

    //是否隐藏蒙版
    maskVarietiesShow: true,
    maskFavoritegrainShow: true,
    maskbrandShow: true,

    showDropDownMessage: true,  //是隐藏下拉框信息
    selectQualificationsDatas: [
      "不限", "2000以下", "2000-5000", "5000-10000", "10000以上"
    ], // 价格
    selectReputation: [
      "不限", "个人", "商户"
    ], // 来源
    titleSelectList: [
      {
        selectInfo: "全部",
        showSelect: true,     //icon 切换
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
    petsInforMation: [
      {
        petsImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063563&di=687bb2e28307037e4c8c8b4e16789e80&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F53e85bc3bb3d0.jpg",
        petsName: "泰斗1",
        petsPrice: 1280,
        originalPrice: 1680,
        petsAddress: "江西南昌"
      },

      {
        petsImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063563&di=687bb2e28307037e4c8c8b4e16789e80&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F53e85bc3bb3d0.jpg",
        petsName: "泰斗2",
        petsPrice: 1280,
        originalPrice: 1680,
        petsAddress: "江西南昌"
      },

      {
        petsImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063563&di=687bb2e28307037e4c8c8b4e16789e80&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F53e85bc3bb3d0.jpg",
        petsName: "泰斗3",
        petsPrice: 1280,
        originalPrice: 1680,
        petsAddress: "江西南昌"
      },

      {
        petsImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063563&di=687bb2e28307037e4c8c8b4e16789e80&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F53e85bc3bb3d0.jpg",
        petsName: "泰斗4",
        petsPrice: 1280,
        originalPrice: 1680,
        petsAddress: "江西南昌"
      },

      {
        petsImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063563&di=687bb2e28307037e4c8c8b4e16789e80&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F53e85bc3bb3d0.jpg",
        petsName: "泰斗5",
        petsPrice: 1280,
        originalPrice: 1680,
        petsAddress: "江西南昌"
      },

      {
        petsImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063563&di=687bb2e28307037e4c8c8b4e16789e80&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F53e85bc3bb3d0.jpg",
        petsName: "泰斗6",
        petsPrice: 1280,
        originalPrice: 1680,
        petsAddress: "江西南昌"
      },
    ],
    /**-------------------位置------------------------- */
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    city: "全部",
    hotcityList: [
      { cityCode: 110000, city: '北京市' },
      { cityCode: 310000, city: '上海市' }, 
      { cityCode: 440100, city: '广州市' }, 
      { cityCode: 440300, city: '深圳市' }, 
      { cityCode: 330100, city: '杭州市' }, 
      { cityCode: 320100, city: '南京市' }, 
      { cityCode: 420100, city: '武汉市' }, 
      { cityCode: 410100, city: '郑州市' }, 
      { cityCode: 120000, city: '天津市' }, 
      { cityCode: 610100, city: '西安市' }, 
      { cityCode: 510100, city: '成都市' }, 
      { cityCode: 500000, city: '重庆市' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      pageHeight: app.globalData.pageHeight
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
    if (this.data.loadState == LoadFootItemState.Loading_State_End) {
      return;
    }
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    let that = this;
    this.data.tempTimeInterval = setTimeout(function () {
      that.data.pageIndex = that.data.pageIndex + 1;
      if (that.data.pageIndex >= 5) {
        that.setData({
          loadState: LoadFootItemState.Loading_State_End
        })
      } else {
        that.setData({
          petsInforMation: that.data.petsInforMation.concat(that.data.petsInforMation),
          loadState: LoadFootItemState.Loading_State_Normal
        })
      }
    }, 1000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 城市选择首字母选择
   */
  clickLetter: function (e) {
    console.log(e.currentTarget.dataset.letter)
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },

  //选择城市
  bindCity: function (e) {
    var selectAddress = "titleSelectList[" + 0 + "].selectInfo";
    var selecticon = "titleSelectList[" + 0 + "].showSelect";
    this.setData({
      [selectAddress]: e.currentTarget.dataset.city,
      [selecticon]: true,
      maskVarietiesShow: true

    })
  },

  /**
   * 选中当前定位城市
   */
  tapCurrentCity: function (e) {
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
  bindHotCity: function (e) {
    var selectAddress = "titleSelectList[" + 0 + "].selectInfo";
    var selecticon = "titleSelectList[" + 0 + "].showSelect";
    this.setData({
      [selectAddress]: e.currentTarget.dataset.city,
      [selecticon]: true,
      maskVarietiesShow: true,
    })
  },
  //点击热门城市回到顶部
  hotCity: function () {
    this.setData({
      scrollTop: 0,
    })
  },
  
  /**
   * 头部下拉选择显示
   */
  titleSelectTap: function (e) {
    let that = this;
    var selectType = e.currentTarget.dataset.index;  //下标
    var upone = "titleSelectList[" + 0 + "].showSelect";  //数组进行字符串拼接 下拉提示信息1
    var uptwo = "titleSelectList[" + 1 + "].showSelect";    //下拉提示信息2
    var upthree = "titleSelectList[" + 2 + "].showSelect";  //下拉提示信息3
    this.setData({
      titleSelectIndex: selectType,
    })

    if (selectType == 0) {  //判断类型显示各个属性值
      that.setData({
        [upone]: !that.data.titleSelectList[0].showSelect,  //替换数组里的某个属性
        [uptwo]: true,     //下拉箭头方向
        [upthree]: true,   //下拉箭头方向
        maskVarietiesShow: !that.data.maskVarietiesShow, //蒙版点击
        maskFavoritegrainShow: true,   //其他两块蒙版是否隐藏
        maskbrandShow: true,            //其他两块蒙版是否隐藏
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

    if (that.data.titleSelectList[selectType].showSelect == true) {  //下拉信息显示
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
  selectDataSourceTypeTap: function (res) {
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

  maskFavoritegrainTap: function () {
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

  maskbrandTap: function () {
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
})