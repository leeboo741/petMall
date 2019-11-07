// pages/store/petsinformation/index.js
const Page_path = require("../../../macros/pagePath.js");
const PetService = require("../../../services/petService.js");
const Util = require("../../../utils/util.js");
const StoreService = require("../../../services/storeService.js");
const UserService = require("../../../services/userService.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    petNo: null, // 宠物编号
    petDetailData: null, // 宠物详情
    storeDetailData: null, // 商家详情
    evaluateList: null, // 评价列表

    dataSourceInforMation: [],
    showPetsInfo: [],
    label: [
      "平台认证", "实名认证", "已纳押金", "商家认证"
    ],
    delivery: [ //配送
      {
        type: "自提",
        price: 0
      },

      {
        type: "汽运",
        price: 200
      },

      {
        type: "空运",
        price: 600
      },
    ],
    service: [ //服务
      "100%实拍", "先行赔付", "平台认证"
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      petNo: options.petno
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
    this.requestPetDetail(this.data.petNo,
      function getDataCallback(data){
        console.log("pet detail:\n" + JSON.stringify(data));
        that.setData({
          petDetailData: data
        })
        that.requestStoreDetail(that.data.petDetailData.business.businessNo,
          function getStoreResultCallback(storeDetail) {
            console.log("store detail:\n" + JSON.stringify(storeDetail));
            that.setData({
              storeDetailData: storeDetail
            })
            that.requestEvaluateList(that.data.petDetailData.business.businessNo,
              function getEvaluateCallback(evaluateList) {
                console.log("evaluateList :\n" + JSON.stringify(evaluateList));
                that.setData({
                  evaluateList: evaluateList
                })
                wx.stopPullDownRefresh();
              }
            )
          }
        )
      }
    );
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 点击头像查看商家信息
   */
  recommendedTap: function (res) {
    wx.navigateTo({
      url: Page_path.Page_Store_StoreInforMation + '?storeno=' + this.data.petDetailData.business.businessNo
    })

  },

  /**
   * 点击跟多评价
   */
  evaluateTap: function () {
    wx.navigateTo({
      url: Page_path.Page_Mall_Evaluate + "?storeno=" + this.data.petDetailData.business.businessNo
    })
  },

  /**
   * 担保购买
   */
  goShopTap: function (res) {

    console.log("点击担保购买！");
  },

  /**
   * 点击收藏
   */
  tapCollection: function() {
    wx.showLoading({
      title: '请稍等...',
    })
    if (this.data.petDetailData.petFavorite == null || this.data.petDetailData.petFavorite.customer == null) {
      PetService.addNewPetCollection(
        {
          petNo: this.data.petDetailData.petNo,
          customerNo: UserService.getCustomerNo()
        },
        function addResultCallback(result) {
          wx.hideLoading();
          console.log(result);
          wx.showToast({
            title: '收藏成功',
          })
          wx.startPullDownRefresh();
        }
      )
    } else {
      PetService.deletePetCollection(
        {
          petNo: this.data.petDetailData.petNo,
          customerNo: UserService.getCustomerNo()
        },
        function addResultCallback(result) {
          wx.hideLoading();
          console.log(result);
          wx.showToast({
            title: "取消收藏",
          })
          wx.startPullDownRefresh();
        }
      )
    }
    
  },

  /**
   * 获取详情
   * @param petNo 
   * @param getDetailCallback
   */
  requestPetDetail: function(petNo, getDetailCallback) {
    PetService.getPetDetail(
      {
        petNo: petNo,
        customerNo: UserService.getCustomerNo()
      },
      function getResultCallback(result) {
        if (Util.checkIsFunction(getDetailCallback)){
          getDetailCallback(result.root)
        }
      }
    )
  },

  /**
   * 获取商户详情
   * @param storeNo
   * @param getStoreDetailCallback
   */
  requestStoreDetail: function(storeNo, getStoreDetailCallback){
    StoreService.getStoreDetail(storeNo, 
      function getResultCallback(result) {
        if (Util.checkIsFunction(getStoreDetailCallback)) {
          getStoreDetailCallback(result.root);
        }
      }
    )
  },

  /**
   * 获取评价列表
   * @param storeNo 
   * @param getEvaluateCallback
   */
  requestEvaluateList: function(storeNo, getEvaluateCallback) {
    StoreService.getStoreEvaluateList(
      {
        storeNo: storeNo,
        offset: 0,
        limit: 10
      },
      function getResultCallback(result) {
        if (Util.checkIsFunction(getEvaluateCallback)) {
          getEvaluateCallback(result.root);
        }
      }
    )
  }
})