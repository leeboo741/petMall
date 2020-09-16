const userService = require("../../../../services/userService");
const util = require("../../../../utils/util");
const pagePath = require("../../../../macros/pagePath");
const orderService = require("../../../../services/orderService");
const addressManagerService = require("../../../../services/addressManagerService");
const payService = require("../../../../services/payService");
const shoppingcartManager = require("../../../../services/shoppingcartManager");
const app = getApp();

// mallsubcontracting/pages/shoppingcart/itemShoppingpayment/itemShoppingpayment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoppingcartDataSource: null,
    
    pickUpModeList: [
      {
        name: '自取',
        id: 0,
      },
      {
        name:'商家配送',
        id: 1,
      }
    ], // 取货方式
    currentPickUpMode: null, // null 斑马配送 
    totalAmount: 0, // 合计价格
    couponList: [], //优惠券列表
    selectCoupon: null, // 选中的优惠券
    receiveAddress: null, // 收货地址
    showMask: true, //是否隐藏蒙版
    showCouponList: true, //是否隐藏优惠券列表
    showCoupon:true, //是否显示选中的优惠券
    priceInformation: null, // 价格
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentPickUpMode: this.data.pickUpModeList[0],
      shoppingcartDataSource: app.globalData.selectedShoppingcart
    })
    let totalAmount = 0;
    this.data.shoppingcartDataSource.list.forEach(goodsItem => {
      totalAmount += goodsItem.goods.item.retailPrice * goodsItem.count;
    });
    this.setData({
      totalAmount: totalAmount
    })
    let that = this;
    userService.isLogin(function isLoginCallback(){
      that.getDefaultReceivingAddress(userService.getBusinessNo(), function callback(res) {
        util.logInfo(JSON.stringify(res));
        if (util.checkEmpty(res.root)) {
          wx.showToast({
            title: '请先新建收货地址',
            icon: 'none'
          })
          return;
        }
        let tempAddress = null;
        res.root.forEach(address => {
          if (address.isDefault == 1) {
            tempAddress = address;
          }
        });
        if (tempAddress == null) {
          tempAddress == res.root[0];
        }
        that.setData({
          receiveAddress: tempAddress
        })
        
        that.queryItemTotalPrice();
      })
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
    if (app.globalData.selectReceiveAddress != null) {
      this.setData({
        receiveAddress: app.globalData.selectReceiveAddress
      })
      
      this.queryItemTotalPrice();
      app.globalData.selectReceiveAddress = null;
    }
    let that = this;
    userService.isLogin(function isLoginCallback(){
      that.getAbleCouponList(userService.getBusinessNo(), that.data.shoppingcartDataSource.business.businessName, 2, that.data.shoppingcartDataSource.itemNo)
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 选择配送方式
   */
  selectPickupMode: function(e) {
    this.setData({
      currentPickUpMode: this.data.pickUpModeList[e.currentTarget.dataset.index]
    })
    
    this.queryItemTotalPrice();
  },

  /**
   * 点击打开优惠券列表
   */
  clipCouponsTap: function() {
    let that = this;
    if (this.data.receiveAddress == null) {
      wx.showToast({
        title: '请选择收货地址！',
        icon: "none"
      })
      return;
    }
    that.setData({
      showMask: false,
      showCouponList: false
    })
  },

  /**
   * 点击蒙版
   */
  maskTap: function() {
    this.setData({
      showMask: true,
      showCouponList: true
    })
  },

  /**
   * 点击选择优惠券
   */
  couponListTap: function(res) {
    let that = this;
    var actionIndex = res.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '您确定要使用该优惠券吗？',
      success(res) {
        if (res.confirm) {
          that.setData({
            showCouponList: true,
            showMask: true,
            selectCoupon: that.data.couponList[actionIndex]
          })
          that.queryItemTotalPrice();
        } else if (res.cancel) {
          util.logInfo('用户点击取消')
        }
      }
    })
  },

  /**
   * 点击收货地址
   */
  receivingAddressTap: function() {
    wx.navigateTo({
      url: pagePath.Page_Me_AddressManager + "?ableselect=1"
    })
  },

  /**
   * 获得本单据可用的优惠券
   */
  getAbleCouponList: function(businessNo, shopNo, type, key) {
    let that = this;
    orderService.getAbleCouponList(businessNo, shopNo, type, key, function(dataSource) {
      util.logInfo("获得本单据可用的优惠券：=>" + JSON.stringify(dataSource))
      that.setData({
        couponList: dataSource
      })
    })
  },

  /**
   * 获得默认地址
   */
  getDefaultReceivingAddress: function (businessNo, getDefaultAddressCallback) {
    let that = this;
    wx.showLoading({
      title: '请稍等...',
    })
    addressManagerService.getDefaultAddressByBusinessNo(businessNo, function callback(res){
      wx.hideLoading();
      if (util.checkIsFunction(getDefaultAddressCallback)) {
        getDefaultAddressCallback(res)
      }
    })
  },

  shopPayTap: function() {
    let param = {
      buyer: {
        businessNo: userService.getBusinessNo()
      },
      receivingAddress: this.data.receiveAddress,
      seller: this.data.shoppingcartDataSource.business,
      shippingMethods: this.data.currentPickUpMode.id
    };

    if (app.globalData.shareBusinessNo) {
      param.shareBusiness = {
        businessNo: app.globalData.shareBusinessNo
      }
    }
    
    if (this.data.selectCoupon != null) {
      param.coupon = this.data.selectCoupon
    }
    let itemList = [];
    this.data.shoppingcartDataSource.list.forEach(tempItem => {
      itemList.push({
        item: tempItem.goods.item,
        qty: tempItem.count
      })
    });
    param.itemOrderInfoVos = itemList;
    wx.showLoading({
      title: '请稍等...',
    })
    userService.isLogin(function(){
      orderService.addNewItemOrder(param, function(success, data){
        wx.hideLoading()
        util.logInfo("新增商品订单: ", JSON.stringify(data));
        if (success) {
          shoppingcartManager.deleteSelectedShoppingcart();
          wx.showModal({
            title: '下单成功:' + data.root,
            content: '可前往(我的->切换买家)查看订单信息',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.showModal({
                  title: '是否立即支付',
                  content: '也可稍后前往(我的->切换买家->待付款)支付',
                  confirmText: '立即支付',
                  cancelText: '稍后支付',
                  success(res) {
                    if (res.confirm) {                
                      that.getPay(data.root);
                    } else {
                      wx.navigateBack()
                    }
                  }
                })
              }
            }
          })
        }
      })
    }, function() {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: pagePath.Page_Login_Index
            });
          } else if (res.cancel) {
            util.logInfo('用户点击取消')
          }
        }
      })
    })
  },

  getPay: function(orderNo) {
    payService.getItemOrderPayInfo(orderNo,
      function getResultCallback(success, result) {
        if (success) {
          if (result.root == null) {
            wx.showToast({
              title: '获取支付信息失败',
              icon: 'none'
            })
            return;
          }
          util.logInfo("支付信息： \n" + JSON.stringify(result.root));
          wx.requestPayment({
            timeStamp: result.root.timeStamp,
            nonceStr: result.root.nonceStr,
            package: result.root.package,
            signType: result.root.signType,
            paySign: result.root.paySign,
            success(res) {
              wx.navigateBack()
            },
            fail(res) {
              wx.navigateBack()
            }
          })
        } else {
          let that = this;
          wx.showModal({
            title: '获取支付参数失败',
            content: '是否重新获取',
            cancelText: '稍后支付',
            confirmText: '重新获取',
            success(res) {
              if (res.confirm) {
                that.getPay();
              } else {
                wx.navigateBack();
              }
            }
          })
        }
      }
    )
  },

  /**
   * 获取商品合计价格
   */
  queryItemTotalPrice:function(){
    let that = this;
    userService.isLogin(function isLoginCallback(){
      let param = {
        buyer: {
          businessNo: userService.getBusinessNo()
        },
        receivingAddress: that.data.receiveAddress,
        seller: that.data.shoppingcartDataSource.business,
        shippingMethods: that.data.currentPickUpMode.id
      };

      if (app.globalData.shareBusinessNo) {
        param.shareBusiness = {
          businessNo: app.globalData.shareBusinessNo
        }
      }
      
      if (that.data.selectCoupon != null) {
        param.coupon = that.data.selectCoupon
      }

      let itemList = [];
      that.data.shoppingcartDataSource.list.forEach(tempItem => {
        itemList.push({
          item: tempItem.goods.item,
          qty: tempItem.count
        })
      });
      param.itemOrderInfoVos = itemList;
      util.logInfo(JSON.stringify(param));
      orderService.getItemOrderPrice(param, function callback(dataSource) {
        util.logInfo("获得总价信息==>" + JSON.stringify(dataSource))
        if (dataSource.root.priceState == 0) {
          that.setData({
            priceInformation: dataSource.root
          })
        } else if (dataSource.root.priceState == -2) {
          that.setData({
            selectCoupon: null,
            showCoupon: false,
          })
          wx.showToast({
            title: '该优惠券不可用',
            icon: "none"
          })
        } else {
          wx.showToast({
            title: '获取价格出错',
            icon: "none"
          })
        }
      })
    })
  },
})