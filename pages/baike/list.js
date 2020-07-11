// pages/baike/list.js
const app = getApp();
const PagePath = require("../../macros/pagePath.js");
const BaikeManager = require("../../services/baikeManager.js");
const Limit = 30;
const LoadMoreState = require("../../lee-components/leeLoadingFootItem/loadFootObj.js")
const Utils = require("../../utils/util.js");
const ShareManager = require("../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    petSort: null,
    naviHeight:0,
    naviTitle: "百科",
    topButtonList:[
      {
        imageSrc: "/resource/dog.png",
        title: "品种介绍",
      },
      {
        imageSrc: "/resource/qualification.png",
        title: "养宠技巧",
      },
      {
        imageSrc: "/resource/t1.png",
        title: "宠物知识",
      },
      {
        imageSrc: "/resource/t4.png",
        title: "宠物疾病",
      },
    ],
    tapButtonIndex: 0,

    breedList:[],
    showBreedMask: false,
    maskBreedObj: null,
    breedLoadState: LoadMoreState.Loading_State_End,

    skillList:[],
    skillOffset: 0,
    skillLoadState: LoadMoreState.Loading_State_Normal,

    knowledgeList: [],
    knowledgeOffset:0,
    knowledgeLoadState: LoadMoreState.Loading_State_Normal,

    diseaseList: [],
    diseaseOffset: 0,
    diseaseLoadState: LoadMoreState.Loading_State_Normal,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let naviTitle = this.data.naviTitle;
    let petSort = "";
    if (options.petsort != null && options.petsort == 10000) {
      naviTitle = "狗狗百科"; 
      petSort = options.petsort;
    } else if (options.petsort != null && options.petsort == 10001) {
      naviTitle = "猫猫百科";
      petSort = options.petsort;
    }
    this.setData({
      petSort: petSort,
      naviTitle: naviTitle,
      naviHeight: app.globalData.naviHeight
    })
    this.changePageType(0);
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
    let that = this;
    let pageType = this.data.tapButtonIndex;
    switch (pageType) {
      case 0:
        that.requestBreed(that.data.petSort, function getBreedCallback(result) {
          that.setData({
            breedList: result
          })
          wx.stopPullDownRefresh();
        },function getFailCallback(res){
          wx.stopPullDownRefresh();
        })
        break;
      case 1:
      case 2:
      case 3:
        that.resetOffset(pageType, 0);
        that.requestArticle(that.data.petSort, pageType, function getResultCallback(result){
          that.resetPageSource(pageType, result);
          if (result.length >= Limit) {
            that.resetPageLoadState(pageType, LoadMoreState.Loading_State_Normal)
          } else if (result.length < Limit && result.length > 0) {
            that.resetPageLoadState(pageType, LoadMoreState.Loading_State_End)
          } else {
            that.resetPageLoadState(pageType, LoadMoreState.Loading_State_Empty)
          }
          wx.stopPullDownRefresh();
        }, function failCallback(result) {
          that.resetPageLoadState(pageType, LoadMoreState.Loading_State_Normal)
          wx.stopPullDownRefresh();
        }) 
        break;
      default: 
        break;
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    let pageType = this.data.tapButtonIndex
    switch (pageType) {
      case 1:
        if (that.data.skillLoadState == LoadMoreState.Loading_State_End
          || that.data.skillLoadState == LoadMoreState.Loading_State_Loading) {
          return;
        }
        break;
      case 2:
        if (that.data.knowledgeLoadState == LoadMoreState.Loading_State_End
          || that.data.knowledgeLoadState == LoadMoreState.Loading_State_Loading) {
          return;
        }
        break;
      case 3:
        if (that.data.diseaseLoadState == LoadMoreState.Loading_State_End
          || that.data.diseaseLoadState == LoadMoreState.Loading_State_Loading) {
          return;
        }
        break;
      default:
        break;
    }
    Utils.logInfo("加载数据");
    that.resetPageLoadState(pageType, LoadMoreState.Loading_State_Loading);
    that.requestArticle(that.data.petSort, pageType, function getResultCallback(result) {
      that.contactPageSource(pageType, result);
      if (result.length >= Limit) {
        that.resetPageLoadState(pageType, LoadMoreState.Loading_State_Normal)
      } else {
        that.resetPageLoadState(pageType, LoadMoreState.Loading_State_End)
      }
    }, function failCallback(result) {
      that.resetPageLoadState(pageType, LoadMoreState.Loading_State_Normal)
    }) 
  },

  /**
   * 重置 offset
   */
  resetOffset: function (pageType, offset) {
    let that = this;
    switch (pageType) {
      case 1:
        that.data.skillOffset = offset;
        break;
      case 2:
        that.data.knowledgeOffset = offset;
        break;
      case 3:
        that.data.diseaseOffset = offset;
        break;
      default:
        break;
    }
  },

  /**
   * 获取当前页offset
   */
  getOffset: function(pageType) {
    let that = this; 
    switch (pageType) {
      case 1:
        return that.data.skillOffset;
      case 2:
        return that.data.knowledgeOffset;
      case 3:
        return that.data.diseaseOffset;
      default:
        return 0;
    }
  },

  /**
   * 刷新页面数据
   */
  resetPageSource: function (pageType, result) {
    let that = this;
    switch (pageType) {
      case 1:
        that.setData({
          skillList: result
        })
        break;
      case 2:
        that.setData({
          knowledgeList: result
        })
        break;
      case 3:
        that.setData({
          diseaseList: result
        })
        break;
      default:
        break;
    }
  },

  /**
   * 加载页面数据
   */
  contactPageSource: function(pageType, result) {
    let that = this;
    switch (pageType) {
      case 1:
        {
          let list = that.data.skillList.concat(result);
          that.setData({
            skillList: list
          })
        }
        break;
      case 2:
        {
          let list = that.data.knowledgeList.concat(result);
          that.setData({
            knowledgeList: list
          })
        }
        break;
      case 3:
        {
          let list = that.data.diseaseList.concat(result);
          that.setData({
            diseaseList: list
          })
        }
        break;
      default:
        break;
    }
  },

  /**
   * 重置页面加载状态
   */
  resetPageLoadState: function (pageType, loadState) {
    let that = this;
    switch (pageType) {
      case 1:
        that.setData({
          skillLoadState: loadState
        })
        break;
      case 2:
        that.setData({
          knowledgeLoadState: loadState
        })
        break;
      case 3:
        that.setData({
          diseaseLoadState: loadState
        })
        break;
      default:
        break;
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },

  /**
   * 请求品种列表
   */
  requestBreed: function (petSort, getBreedListCallback, getFailCallback) {
    BaikeManager.getBreedList(petSort, function getResultCallback(result) {
      if (Utils.checkIsFunction(getBreedListCallback)) {
        getBreedListCallback(result.root)
      }
    },function failCallback(res){
      if (Utils.checkIsFunction(getFailCallback)) {
        getFailCallback(res)
      }
    })
  },

  /**
   * 获取文章列表
   */
  requestArticle: function (petSort, pageType, getArticleListCallback, failCallback) {
    let offset = 0;
    let that = this;
    switch (pageType) {
      case 1:
        offset = this.data.skillOffset;
        break;
      case 2:
        offset = this.data.knowledgeOffset;
        break;
      case 3: 
        offset = this.data.diseaseOffset;
        break;
      default:
        offset = 0;
        break;
    }
    BaikeManager.getArticleList(petSort, pageType, offset, Limit, function getResultCallback(result){
      that.resetOffset(pageType, that.getOffset(pageType) + Limit);
      if (Utils.checkIsFunction(getArticleListCallback)) {
        getArticleListCallback(result.root);
      }
    }, function getFailCallback(result) {
      if (Utils.checkIsFunction(failCallback)) {
        failCallback(result);
      }
    })
  },

  /**
   * 是否开始下拉刷新
   */
  shouldStartPulldown: function(pageType) {
    let pageSource = null;
    switch(pageType) {
      case 0:
        pageSource = this.data.breedList;
        break;
      case 1:
        pageSource = this.data.skillList;
        break;
      case 2:
        pageSource = this.data.knowledgeList;
        break;
      case 3:
        pageSource = this.data.diseaseList;
        break;
    }
    if (Utils.checkEmpty(pageSource)) {
      wx.startPullDownRefresh();
    }
  },

  /**
   * 点击头部button
   */
  tapTopButton: function(button){
    this.changePageType(button.currentTarget.dataset.index);
  },

  /**
   * 切换页面
   */
  changePageType: function(index) {
    this.setData({
      tapButtonIndex: index
    })
    this.shouldStartPulldown(index);
  },

  /**
   * 点击品种Item
   */
  tapBreedItem: function(item) {
    let breedObj = this.data.breedList[item.currentTarget.dataset.index];
    this.changeBreedMaskShow(breedObj);
  },

  /**
   * 点击蒙层
   */
  tapMask: function(view) {
    this.changeBreedMaskShow(null);
  },

  /**
   * 更改品种蒙层显示
   */
  changeBreedMaskShow: function(breed) {
    this.setData({
      showBreedMask: breed!=null,
      maskBreedObj: breed,
    })
  },

  /**
   * 点击技巧
   */
  tapSkill: function(item) {
    Utils.logInfo("点击技巧:" + item.currentTarget.dataset.index);
    wx.navigateTo({
      url: PagePath.Page_Baike_ArticleDetail + "?url=" + item.currentTarget.dataset.url,
    })
  },

  /**
   * 点击知识
   */
  tapKnowledge: function (item) {
    Utils.logInfo("点击知识:" + item.currentTarget.dataset.index);
    wx.navigateTo({
      url: PagePath.Page_Baike_ArticleDetail + "?url=" + item.currentTarget.dataset.url,
    })
  },

  /**
   * 点击疾病
   */
  tapDisease: function (item) {
    Utils.logInfo("点击疾病:" + item.currentTarget.dataset.index);
    wx.navigateTo({
      url: PagePath.Page_Baike_ArticleDetail + "?url=" + item.currentTarget.dataset.url,
    })
  },
})