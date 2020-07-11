// pages/mall/setmeal/index.js
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const Page_path = require("../../../macros/pagePath.js");
const app = getApp();
const Limit = 20;
const MallService = require("../../../services/mallService.js");
const Util = require("../../../utils/util.js");
const Utils = require("../../../utils/util")
const ShoppingCartService = require("../../../services/shoppingCartService.js");
const UserService = require("../../../services/userService.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectSetMenuNo: null, // 选中套餐id
    offset: 0,
    setMenuList: [],
    itemList: [],

    loadState: LoadFootItemState.Loading_State_Empty, //底部状态
    pageHeight: null,

    showShopMask: 0, //显示添加数量信息
    shopCarinf: {}, //购物车添加信息
    goodcount: 0, //添加商品的数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      selectSetMenuNo: options.setmenuno,
      pageHeight: app.globalData.pageHeight,
    })
    wx.showLoading({
      title: '请稍等...',
    })
    this.getSetMenuList(
      function getSetMenuDataCallback(data) {
        that.setData({
          setMenuList: data
        })
        that.initSelect();
        wx.hideLoading();
      }
    )
  },

  /**
   * 头部选中
   */
  initSelect: function() {
    if (!Util.checkEmpty(this.data.selectSetMenuNo) && !Util.checkEmpty(this.data.setMenuList)) {
      for (let index = 0; index < this.data.setMenuList.length; index++) {
        let tempSetMenu = this.data.setMenuList[index];
        if (this.data.selectSetMenuNo == tempSetMenu.itemPackNo) {
          let showLine = "setMenuList[" + index + "].showLine";
          this.setData({
            [showLine]: true
          })
        } else {
          let showLine = "setMenuList[" + index + "].showLine";
          this.setData({
            [showLine]: false
          })
        }
      }
    }
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
    this.getItemList(this.data.offset,
      function getItemListCallback(data) {
        that.setData({
          itemList: data,
        })
        that.data.offset = that.data.offset + Limit;
        if (data.length >= Limit) {
          that.setData({
            loadState: LoadFootItemState.Loading_State_Normal
          })
        } else if (data.length < Limit && data.length > 0) {
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
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.loadState == LoadFootItemState.Loading_State_End ||
      this.data.loadState == LoadFootItemState.Loading_State_Loading) {
      return;
    }
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    let that = this;
    this.getItemList(this.data.offset,
      function getItemListCallback(data) {
        let tempList = that.data.itemList.concat(data);
        that.setData({
          itemList: tempList
        })
        that.data.offset = that.data.offset + Limit;
        if (data.length >= Limit) {
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
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },

  /**
   * 点击套餐类型
   */
  petTypeTap: function(res) {
    let that = this;
    that.setData({
      selectSetMenuNo: res.currentTarget.dataset.setmenuno
    })
    this.initSelect();
  },

  /**
   * 点击商品详情
   */
  commodityInforMationTap: function(e) {

    wx.navigateTo({
      url: Page_path.Page_Mall_CommodityInformation + "?itemno=" + e.currentTarget.dataset.itemno
    })

  },

  /**
   * 获取套餐分类
   * @param getSetMenuCallback
   */
  getSetMenuList: function(getSetMenuCallback) {
    let obj = {
      offset: 0,
      limit: 30
    }
    MallService.getSetMealList(obj,
      function getResultCallback(result) {
        Utils.logInfo("set meal : \n" + JSON.stringify(result));
        if (Util.checkIsFunction(getSetMenuCallback)) {
          getSetMenuCallback(result.root)
        }
      }
    )
  },

  /**
   * 获取商品列表
   * @param offset
   * @param getItemListCallback
   */
  getItemList: function(offset, getItemListCallback) {
    let that = this;
    let param = {
      offset: offset,
      limit: Limit,
      itemPackNo: "",
    }
    if (!Util.checkEmpty(this.data.selectSetMenuNo)) {
      param.itemPackNo = this.data.selectSetMenuNo;
    }
    MallService.getItemList(param,
      function getResultCallback(result) {
        if (Util.checkIsFunction(getItemListCallback)) {
          getItemListCallback(result.root)
        }
      }
    )
  },

  /**
   * 加入购物车
   */
  addShopCatTap: function(res) {
    // Utils.logInfo(JSON.stringify(res))
    let that = this;
    UserService.isLogin(function isLoginCallback() {
      that.setData({
        goodcount: 0
      });
      let shopCarinf = {};
      let info = res.currentTarget.dataset.shopinfo
      shopCarinf.image = info.coverImg;
      shopCarinf.itemName = info.itemName;
      shopCarinf.itemPrice = info.retailPrice;
      shopCarinf.itemNo = info.itemNo;
      that.setData({
        showShopMask: 1,
        shopCarinf: shopCarinf
      })
    }, null)
  },

  /**
   * 进店
   */
  enterShopTap: function(res) {
    // wx.navigateTo({
    //   url: "" + res.currentTarget.dataset.businessno
    // })
  },

  /**
   * 是否显示添加数量
   */
  showShopMask: function() {
    this.setData({
      showShopMask: 0
    })
  },
  /**
   * 用户点击商品减1
   */
  subtracttap: function(e) {
    var index = e.target.dataset.index;
    var count = this.data.goodcount;
    if (count <= 1) {
      return;
    } else {
      count--;
      this.setData({
        goodcount: count
      });
    }
  },

  /**
   * 用户点击商品加1
   */
  addtap: function(e) {
    var index = e.target.dataset.index;
    var count = this.data.goodcount;
    count++;
    this.setData({
      goodcount: count
    });
  },

  /**
   * 输入框
   */
  shoppingCartinput: function(e) {
    Utils.logInfo(JSON.stringify(e));
    let goodcount = e.detail.value;
    this.setData({
      goodcount: goodcount
    })
  },

  /**
   * 点击确定 
   * getCustomerNo //买家no
   */
  determineTap: function() {
    let that = this;
    UserService.isLogin(function isLoginCallback() {
      let businessNo = UserService.getBusinessNo(); //买家id
      let qty = this.data.goodcount; //添加数量
      let goodsNo = this.data.shopCarinf.itemNo; //宠物id
      let goodsType = 1; //添加购物车宠物

      if (qty == 0) {
        wx.showToast({
          title: '请添加数量！',
          icon: "none"
        })
        return;
      }

      Utils.logInfo(businessNo + "---" + qty + "---" + "---" + goodsNo + "---" + goodsType);
      ShoppingCartService.addShoppingCart(qty, goodsNo, businessNo, goodsType, function callBakc(dataSource) {
        if (dataSource.root > 0) {
          wx.showToast({
            title: '添加成功！',
            icon: "success"
          })
        } else {
          wx.showToast({
            title: '添加失败！',
            icon: "none"
          })
        }
      })
      that.showShopMask();
    })
  }
})