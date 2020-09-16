// pages/mall/commodityInformation/index.js
const Page_path = require("../../../macros/pagePath.js");
const MallService = require("../../../services/mallService.js");
const Util = require("../../../utils/util.js");
const Utils = require("../../../utils/util")
const UserService = require("../../../services/userService.js");
const EvaluateService = require("../../../services/evaluateService.js");
const app = getApp();
const ShareManager = require("../../../services/shareService");
const shoppingcartManager = require("../../../services/shoppingcartManager.js");



const Limit = 20;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAddToShoppingcart: false,
    businessInfo: null,
    currentImageItemId: "s0",
    itemNo: null,
    itemDetailData: null,
    collection: false, //是否收藏
    commodityInforType: [ //商品具体分类信息
      {
        type: "配送",
      },

      {
        type: "分类",
      },
    ],
    guaranteeList: [{
        guaranteeHead: "七天无理由退货",
        guaranteeInfor: "卖家只要承诺参加“7天无理由退换货”服务，就必须按本规则提供售后服务，并严格遵守；若买家向卖家提出天无理由退换货”，卖家需积极响应，并主动协商，根据淘宝要求提供相关证明，以期双方自愿友好地达成退货退款协议；"
      },

      {
        guaranteeHead: "消费者保障服务",
        guaranteeInfor: "消费者保障服务是淘宝网推出的旨在保障网络交易中消费者合法权益的服务体系。“商品如实描述”，为加入消费者保障服务的必选项。“7天无理由退换货”、“假一赔三”、“虚拟物品闪电发货”等都是其中的服务之一，由卖家自行选择加入。"
      },

    ], //品质服务保障
    mask:true,  //是否显示蒙版

    offset: 0,
    evaluateList: [], // 评价列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      itemNo: options.itemno,
      businessInfo: UserService.getLocalBusinessInfo()
    })
    this.getBusinessFollowInfo();
    wx.startPullDownRefresh();

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
    UserService.isLogin(function isLoginCallback(){
      UserService.requestBusinessInfo(UserService.getBusinessNo(), function (dataSource) {
        that.setData({
          businessInfo: dataSource
        })
      })
    })
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
    this.getItemDetail(this.data.itemNo,
      function getItemDetailCallback(data) {
        that.setData({
          itemDetailData: data
        })
        that.data.offset = 0;
        that.getGoodsEvaluateList(that.data.itemNo, function(res) {
          Utils.logInfo("evaluateList :\n" + JSON.stringify(res));
          let tempList = [];
          if (res) {
            tempList = res;
          }
          that.setData({
            evaluateList: tempList
          })
          wx.stopPullDownRefresh();
        }); //商品评价
      }
    )
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this;
    that.getGoodsEvaluateList(that.data.itemNo, function(res) {
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
  onShareAppMessage: function() {
    return ShareManager.getGoodsShareData(this.data.itemDetailData.item.itemName,this.data.itemDetailData.item.itemNo,this.data.itemDetailData.item.coverImg)
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
   * 点击更多评价
   */
  evaluateTap: function() {
    wx.navigateTo({
      url: Page_path.Page_Mall_Evaluate + "?itemno=" + this.data.itemDetailData.item.itemNo
    })
  },

  /**
   * 点击加入购物车
   */
  tapAddToShoppingcart: function(){
    this.setData({
      showAddToShoppingcart: true
    })
  },
  /**
   * 购物车页面关闭
   * @param {*} e 
   */
  closeShoppingcart: function(e){
    this.data.showAddToShoppingcart = e.detail.show
  },
  /**
   * 响应 购物车页面 加入购物车 事件
   * @param {*} e 
   */
  addToShoppingcart: function(e) {
    this.data.count = e.detail.count
    console.log(JSON.stringify(this.data.itemDetailData));
    shoppingcartManager.saveGoodsToLocal(this.data.itemDetailData, this.data.count);
  },

  /**
   * 担保购买
   */
  goShopTap: function() {
    if (this.data.itemDetailData.item.qty <=0 ){
      return;
    }
    let that = this;
    UserService.isLogin(function isLoginCallback() {
      if (that.data.businessInfo.authType <= 1 && that.data.itemDetailData.item.groupon == 1) {
        wx.showModal({
          title: '暂无权限',
          content: '暂无权限购买该产品,请前往认证商家或平台!',
          confirmText: '前往认证',
          cancelText: '暂不认证',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: Page_path.Page_Me_AuthenticateManager_Index,
              })
            } else if(res.cancel){
              wx.navigateBack({
              })
            }
          }
        })
        return;
      }
      if (that.data.itemDetailData.item.business.businessNo == UserService.getBusinessNo()) {
        wx.showToast({
          title: '您不能购买自己的商品哦！',
          icon: "none"
        })
        return;
      }
      app.globalData.shopItem = that.data.itemDetailData;
      wx.navigateTo({
        url: Page_path.Page_Mall_Shoppingpayment + "?type=item"
      })
    }, function notLoginCallback() {
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
   * 点击收藏
   */
  tapCollection: function() {
    let that = this;
    UserService.isLogin(function isLoginCallback(){
      wx.showLoading({
        title: '请稍等...',
      })

      let obj = {
        item: {
          itemNo: that.data.itemDetailData.item.itemNo,
        },
        business: {
          businessNo: UserService.getBusinessNo(),
        },
        followType: 3
      }

      if (that.data.collection == false) {
        UserService.addBusinessFollow(obj,
          function addResultCallback(result) {
            wx.hideLoading();
            if (result.root == "操作成功") {
              wx.showToast({
                title: '收藏成功',
              })
            }
            that.setData({
              collection: true
            })
            wx.startPullDownRefresh();
          }
        )
      } else {
        UserService.businessUnFollow(obj,
          function addResultCallback(result) {
            wx.hideLoading();
            if (result.root == "操作成功") {
              wx.showToast({
                title: '取消成功',
              })
            }
            that.setData({
              collection: false
            })
            wx.startPullDownRefresh();
          }
        )
      }
    })
  },

  /**
   * 点击购物车
   */
  tapShoppingcart: function() {
    wx.navigateTo({
      url: '/mallsubcontracting/pages/shoppingcart/index',
    })
  },

  /**
   * 加载商品详情
   * @param itemNo
   * @param getItemDetailCallback
   */
  getItemDetail: function(itemNo, getItemDetailCallback) {
    MallService.getItemDetail(itemNo,
      function getResultCallback(result) {
        if (Util.checkIsFunction(getItemDetailCallback)) {
          Utils.logInfo("商品详情:" + JSON.stringify(result.root));
          getItemDetailCallback(result.root)
        }
      }
    )
  },

  /**
   * 匹配收藏信息
   */
  getBusinessFollowInfo: function() {
    let that = this;
    UserService.isLogin(function isLoginCallback() {
      let obj = {
        item: {
          itemNo: that.data.itemNo,
        },
        business: {
          businessNo: UserService.getBusinessNo(),
        },
        followType: 3
      }
      UserService.getBusinessFollowAndFs(obj, function(dataSource) {
        if (dataSource.root == null) {
          that.setData({
            collection: false
          })
        } else {
          that.setData({
            collection: true
          })
        }
      })
    }, null);
  },


  /**
   * 获得商品评价
   */
  getGoodsEvaluateList: function(itemNo, getEvaluateCallback) {
    let that = this;
    let param = {
      offset: this.data.offset,
      limit: Limit,
      itemNo: itemNo
    };
    EvaluateService.getGoodsEvaluate(param, function(dataSorce) {
      Utils.logInfo("商品评价==>" + JSON.stringify(dataSorce));
      that.data.offset = that.data.offset + Limit;
      if (Util.checkIsFunction(getEvaluateCallback)) {
        getEvaluateCallback(dataSorce);
      }
    })
  },

  /**
   * 拨打商家电话
   */
  tapStorePhone: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.itemDetailData.item.business.contactPhone,
    })
  },

  /**
   * 点击商家二维码
   */
  tapWXQRCode: function(){
    wx.previewImage({
      urls: [this.data.itemDetailData.item.business.weChatImg],
    })
  },

  /**
   * 点击进入店铺
   */
  recommendedTap: function () {
    wx.navigateTo({
      url: Page_path.Page_Store_StoreInforMation + '?storeno=' + this.data.itemDetailData.item.business.businessNo + "&showtype=" + 0
    })
  },
})