// pages/store/petsinformation/index.js
const Page_path = require("../../../macros/pagePath.js");
const PetService = require("../../../services/petService.js");
const Util = require("../../../utils/util.js");
const StoreService = require("../../../services/storeService.js");
const UserService = require("../../../services/userService.js");
const EvaluateService=require("../../../services/evaluateService.js");
const app = getApp();
const ShareManager = require("../../../services/shareService");
const Utils = require("../../../utils/util")

const Limit = 20;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    offset: 0,

    petNo: null, // 宠物编号
    petDetailData: null, // 宠物详情
    storeDetailData: null, // 商家详情
    evaluateList: [], // 评价列表

    dataSourceInforMation: [],
    showPetsInfo: [],
    // label: [
    //   "平台认证", "实名认证", "已纳押金", "商家认证"
    // ],
    service: [ //服务
      "100%实拍", "先行赔付"
    ],

    shareInfo:false,  //是否显示分享蒙版信息
    mask:true,  //是否显示蒙版
    showShc:false,    //该商品是否已收藏
    businessInfo:null, //商家信息

    showPoster: false, // 是否显示海报
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      petNo: options.petno,
      businessInfo: UserService.getLocalBusinessInfo()
    })

    UserService.isLogin(function isLoginCallback() {
      let followObj = {
        business: {
          businessNo: UserService.getBusinessNo(),

        },
        followBusiness: null,
        pet: {
          petNo: options.petno,
        },
        item: null,
        followType: 2
      } //关注接口对象

      that.getBusinessFollow(followObj)
    }, function notLoginCallback(){
      
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
        Utils.logInfo("pet detail:\n" + JSON.stringify(data));
        that.setData({
          petDetailData: data
        })
        that.requestStoreDetail(data.pet.business.businessNo,
          function getStoreResultCallback(storeDetail) {
            Utils.logInfo("store detail:\n" + JSON.stringify(storeDetail));
            that.setData({
              storeDetailData: storeDetail
            })
            that.data.offset = 0;
            that.requestEvaluateList(that.data.petNo,
              function getEvaluateCallback(evaluateList) {
                Utils.logInfo("evaluateList :\n" + JSON.stringify(evaluateList));
                let tempList = [];
                if (evaluateList) {
                  tempList = evaluateList;
                }
                that.setData({
                  evaluateList: tempList
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
    let that = this;
    that.requestEvaluateList(that.data.petNo, function(res) {
      Utils.logInfo("evaluateList :\n" + JSON.stringify(res));
      let tempList = that.data.evaluateList;
      if (Utils.checkEmpty(res)) {
        wx.showToast({
          title: '已经到底了!',
          icon: 'none',
        })
      } else {
        tempList = tempList.concat(res);
        that.setData({
          evaluateList: tempList
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getPetShareCard(this.data.petDetailData.pet.petName, this.data.petDetailData.pet.petNo, this.data.petDetailData.pet.petImg);
  },

  /**
   * 点击头像查看商家信息
   */
  recommendedTap: function (res) {
    wx.navigateTo({
      url: Page_path.Page_Store_StoreInforMation + '?storeno=' + this.data.storeDetailData.businessNo +"&showtype="+0
    })

  },

  /**
   * 点击查看父母图片
   */
  tapParentImageAction: function(res) {
    wx.previewImage({
      urls: [res.currentTarget.dataset.imagepath],
    })
  },

  /**
   * 点击更多评价
   */
  evaluateTap: function () {
    wx.navigateTo({
      url: Page_path.Page_Mall_Evaluate + "?petno=" + this.data.petDetailData.pet.petNo
    })
  },

  /**
   * 担保购买
   */
  goShopTap: function (res) {
    Utils.logInfo("点击担保购买！");
    let that = this;
    UserService.isLogin(function isLoginCallback(){
      if (that.data.storeDetailData.businessNo == UserService.getBusinessNo()) {
        wx.showToast({
          title: '您不能购买自己的宠物哦！',
          icon: "none"
        })
        return;
      }
      app.globalData.shopPet = that.data.petDetailData;
      wx.navigateTo({
        url: Page_path.Page_Mall_Shoppingpayment + "?type=pet"
      })
    }, function notLoginCallback(){
      wx.showModal({
        title: '提示',
        content: '您未登录请先去登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: Page_path.Page_Login_Index
            });
          } else if (res.cancel) {
            Utils.logInfo('用户点击取消')
          }
        }
      })
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
   * 点击收藏
   */
  tapCollection: function() {
    let that=this;
    UserService.isLogin(function isLoginCallback(){
      wx.showLoading({
        title: '请稍等...',
      })
      let followObj = {
        business: {
          businessNo: UserService.getBusinessNo(),
        },
        followBusiness: null,
        pet: {
          petNo: that.data.petDetailData.pet.petNo,
        },
        item: null,
        followType: 2
      } //关注接口对象

      if (that.data.showShc == false) {
        UserService.addBusinessFollow(followObj,
          function addResultCallback(result) {
            wx.hideLoading();
            Utils.logInfo(result);
            if (result.root == "操作成功") {
              wx.showToast({
                title: '收藏成功',
              })
              that.setData({
                showShc: true
              })
              wx.startPullDownRefresh();
            } else {
              wx.showToast({
                title: '收藏失败',
                icon: "none"
              })
            }
          }
        )
      } else {
        UserService.businessUnFollow(followObj, function addResultCallback(result) {
          wx.hideLoading();
          Utils.logInfo(result);
          if (result.root == "操作成功") {
            wx.showToast({
              title: '取消成功',
            })
            that.setData({
              showShc: false
            })
            wx.startPullDownRefresh();
          } else {
            wx.showToast({
              title: '操作失败',
              icon: "none"
            })
          }
          wx.startPullDownRefresh();
        }
        )
      }
    })
  },

  /**
   *  获得收藏详情
   */
  getBusinessFollow: function (followObj){
    let that=this;
    UserService.getBusinessFollowAndFs(followObj, function (dataSource) {
      if (dataSource.root!=null){
         that.setData({
           showShc:true
         })
      }else{
        that.setData({
          showShc: false
        })
      }
    })
  },

  /**
   * 获取详情
   * @param petNo 
   * @param getDetailCallback
   */
  requestPetDetail: function(petNo, getDetailCallback) {
    PetService.getPetDetail(petNo,function getResultCallback(result) {
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
  requestEvaluateList: function(petNo, getEvaluateCallback) {
    let that = this;
    EvaluateService.petEvaluate(
      {
        petNo: petNo,
        offset: this.data.offset,
        limit: Limit
      },
      function getResultCallback(result) {
        that.data.offset = that.data.offset + Limit;
        if (Util.checkIsFunction(getEvaluateCallback)) {
          getEvaluateCallback(result);
        }
      }
    )
  },

  /**
   * 拨打商家电话
   */
  tapStorePhone: function(){
    wx.makePhoneCall({
      phoneNumber: this.data.storeDetailData.contactPhone,
    })
  },

  /**
   * 点击获取微信二维码
   */
  tapWXQRCode: function(){
    wx.previewImage({
      urls: [this.data.storeDetailData.weChatImg],
    })
  },

  showPosterAction: function() {
    this.setData({
      showPoster: true
    })
  },

  /**
   * 图片预览
   */
  tapBanner:function(e){
    // let tempImage = e.currentTarget.dataset.imageurl;
    // let index = e.currentTarget.dataset.index;
    // let image=[];
    // wx.showLoading({
    //   title: '请稍等',
    // })
    // for (let i of tempImage){
    //   image.push(i.coverAddress)
    // }
    // wx.hideLoading();
    // wx.previewImage({
    //   current: tempImage[index].coverAddress, // 当前显示图片的http链接
    //   urls: image // 需要预览的图片http链接列表
    // })
  }
})