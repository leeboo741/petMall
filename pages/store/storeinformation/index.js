// pages/store/storeinformation/index.js
const app = getApp();
const Page_path = require("../../../macros/pagePath.js");
const StoreService = require("../../../services/storeService.js");
const Util = require("../../../utils/util.js");
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");

const Limit = 20;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    loadState: LoadFootItemState.Loading_State_Empty, // 底部状态
    storeNo: null, // 商家编号
    offset: 0,
    storeDetail: null,
    petList: null,
    evaluateList: null,

    pageHeight:null,
    showPetsPage:false,
    showEvaluate: true,
    showIntroduction:true,
    buisnessCurrent:0,
    buisnessList: [
      {
        title: "宠物",
        showLine: false
      },

      {
        title: "评价",
        showLine: false
      },

      {
        title: "简介",
        showLine: false
      }
    ],

    label:[
      "平台认证","实名认证","已纳押金","商家认证"
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var showOneLine = "buisnessList[" + 0 + "].showLine";
    let that=this;
    that.setData({
      [showOneLine]:true,
      pageHeight: app.globalData.pageHeight,
      storeNo: options.storeno
    })
    wx.startPullDownRefresh();
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
    this.getStoreDetail(this.data.storeNo,
      function getStoreDetailCallback(storeDetail) {
        console.log("store detail : \n" + JSON.stringify(storeDetail));
        that.setData({
          storeDetail: storeDetail
        })
        that.getStorePetList(that.data.storeNo,
          function getPetListCallback(petListData) {
            console.log("store pet : \n" + JSON.stringify(petListData));
            that.setData({
              petList: petListData
            })
            that.data.offset = 0;
            that.getEvaluateList(that.data.storeNo, that.data.offset,
              function getEvaluateListCallback(evaluateListData) {
                console.log("store evaluate : \n" + JSON.stringify(evaluateListData));
                that.setData({
                  evaluateList: evaluateListData,
                })
                that.data.offset = that.data.offset + Limit;
                if (evaluateListData.length >= Limit) {
                  that.setData({
                    loadState: LoadFootItemState.Loading_State_Normal
                  })
                } else if (evaluateListData.length < Limit && evaluateListData.length > 0) {
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
            )
          }
        )
      }
    )
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.buisnessCurrent == 1) {
      if (this.data.loadState == LoadFootItemState.Loading_State_End
        || this.data.loadState == LoadFootItemState.Loading_State_Loading) {
        return;
      }
      this.setData({
        loadState: LoadFootItemState.Loading_State_Loading,
      })
      let that = this;
      this.getEvaluateList(this.data.storeNo, this.data.offset,
        function getEvaluateListCallback(evaluateListData) {
          let tempList = that.data.evaluateList.concat(evaluateListData);
          that.setData({
            evaluateList: tempList
          })
          that.data.offset = that.data.offset + Limit;
          if (evaluateListData.length >= Limit) {
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
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  } ,
  
   /**
   * 点击title
   */
  buisnessTap: function (res) {
    let that = this;
    var actionIndex = res.currentTarget.dataset.index;
    var showOneLine = "buisnessList[" + 0 + "].showLine"; //替换数组里面的字段
    var showtwoLine = "buisnessList[" + 1 + "].showLine";
    var showThreeLine = "buisnessList[" + 2 + "].showLine";
    that.setData({
      buisnessCurrent: actionIndex
    })
    //下滑线切换
    if (that.data.buisnessCurrent == 0) {
      that.setData({
        [showOneLine]: true,    //宠物选择框
        [showtwoLine]: false,   //评价选择框
        [showThreeLine]: false, //简介选择框
        showPetsPage: false,    //宠物显示
        showEvaluate: true,     //评价显示
        showIntroduction: true  //简介显示
      })
    }

    if (that.data.buisnessCurrent == 1) {
      that.setData({
        [showOneLine]: false,
        [showtwoLine]: true,
        [showThreeLine]: false,
        showPetsPage: true,
        showEvaluate: false,
        showIntroduction: true
      })
    }

    if (that.data.buisnessCurrent == 2) {
      that.setData({
        [showOneLine]: false,
        [showtwoLine]: false,
        [showThreeLine]: true,
        showPetsPage: true,
        showEvaluate: true,
        showIntroduction: false
      })
    }

  },

  /**
   * 点击宠物图片跳转
   */
  petsInforTap:function(res){
    wx.navigateTo({
      url: Page_path.Page_Store_PetsInforMation + '?petno=' + res.currentTarget.dataset.petno
    })
    console.log(actionItem);
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
   * 获取商家评价详情
   * @param storeNo
   * @param offset 
   * @param getEvaluateListCallback
   */
  getEvaluateList: function (storeNo, offset, getEvaluateListCallback) {
    StoreService.getStoreEvaluateList(
      {
        storeNo: this.data.storeNo,
        offset: offset,
        limit: Limit
      },
      function getResultCallback(result) {
        if (Util.checkIsFunction(getEvaluateListCallback)) {
          getEvaluateListCallback(result.root)
        }
      }
    )
  },

  /**
   * 获取商家宠物列表
   * @param storeNo
   * @param getPetListCallback
   */
  getStorePetList: function (storeNo, getPetListCallback) {
    StoreService.getStorePetList(storeNo, 
      function getResultCallback(result) {
        if (Util.checkIsFunction(getPetListCallback)) {
          getPetListCallback(result.root)
        }
      }
    )
  },

  /**
   * 点击拨打
   */
  tapCall: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  }

})