// pages/mall/shoppingpayment/index.js
const AddressService = require("../../../services/addressManagerService.js")
const OrderService = require("../../../services/orderService.js");
const UserService = require("../../../services/userService.js");
const PayService = require("../../../services/payService.js");
const Page_path = require("../../../macros/pagePath.js");
const Util = require("../../../utils/util.js");
const Utils = require("../../../utils/util")
const app = getApp();
const Shop_Type_Item = "item";
const Shop_Type_Pet = "pet";
const ShareManager = require("../../../services/shareService");
const userService = require("../../../services/userService.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: null, // 类型

    shopDataSource: null, //商品信息
    num: 1, //商品数量
    integral: 0, // 可兑换积分
    showIntegral: 0, // 积分可兑换金额
    priceInformation:null,  //总价信息返回值
    couponList: [], //优惠券列表
    selectCoupon: null, // 选中的优惠券
    receiveAddress: null, // 收货地址
    selectTransport: null, // 选中的运输方式

    minusStatus: 'disable', //是否禁用减号
    maxusStatus: 'normal', // 是否禁用加号 
    switch1: false, //是否用积分
    showMask: true, //是否隐藏蒙版
    showCouponList: true, //是否隐藏优惠券列表
    typeOfShipping: [

    ], //运输方式

    realPrice: null, //真实配送费
    realInfo: '',
    selectTransportIndex: null, //所选中的配送方式下标
    couponID: null, //所选优惠券的id
    showCoupon:false, //是否提示优惠券不可用

    itemGroupPriceList: [], // 团购商品阶梯价格

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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    this.setData({
      type: options.type
    })
    if (this.data.type == Shop_Type_Item) {
      Utils.logInfo("app.globalData.shopItem: \n" + JSON.stringify(app.globalData.shopItem));
      this.setData({
        shopDataSource: app.globalData.shopItem.item,
        itemGroupPriceList: app.globalData.shopItem.itemGrouponList,
        maxusStatus: app.globalData.shopItem.item.qty <= 1? 'disable': 'normal'
      })
    } else {
      Utils.logInfo("app.globalData.shopPet: \n" + JSON.stringify(app.globalData.shopPet));
      this.setData({
        shopDataSource: app.globalData.shopPet
      })
    }
    UserService.isLogin(function isLoginCallback(){
      that.getDefaultReceivingAddress(UserService.getBusinessNo(), function callback(res) {
        Utils.logInfo(JSON.stringify(res));
        if (Utils.checkEmpty(res.root)) {
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
        if (that.data.type == Shop_Type_Pet) {
          that.queryListTransportType(
            that.data.shopDataSource.pet.business.city, that.data.receiveAddress.city);
        } else {
          that.queryItemTotalItemPrice()
        }
      })
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
    if (app.globalData.selectReceiveAddress != null) {
      this.setData({
        receiveAddress: app.globalData.selectReceiveAddress
      })
      if (that.data.type == Shop_Type_Pet) {
        if (that.data.receiveAddress != null) {
          that.queryListTransportType(
            that.data.shopDataSource.pet.business.city, that.data.receiveAddress.city);
        }
      }
      app.globalData.selectReceiveAddress = null;
    }
    if (that.data.type == Shop_Type_Item) {
      that.setData({
        currentPickUpMode: that.data.pickUpModeList[0]
      })
    }
    UserService.isLogin(function isLoginCallback(){
      if (that.data.type == 'pet') {
        that.getAbleCouponList(UserService.getBusinessNo(), that.data.shopDataSource.pet.business.businessNo, 1, that.data.shopDataSource.petNo)
      } else {
        that.getAbleCouponList(UserService.getBusinessNo(), that.data.shopDataSource.business.businessName, 2, that.data.shopDataSource.itemNo)
      }
    }, function notLoginCallback(){})
    
    if (this.data.receiveAddress!=null){
      if (that.data.type == 'pet') {
        // that.queryFreightRates();
      }else{
        that.queryItemTotalItemPrice();
      }
    }

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },


  /**
   * 点击减号
   */
  bindMinus: function() {
    let that = this;
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus,
    })

    // this.countPrice();
    if (this.data.selectTransport != null && this.data.type == "pet") {
      that.queryFreightRates();
    }else{
      that.queryItemTotalItemPrice();
    }
  },
  /** 
   * 点击加号
   */
  bindPlus: function() {
    let that = this;
    var num = this.data.num;
    if(num < this.data.shopDataSource.qty) {
      num++;
    }
    var maxusStatus = num >= this.data.shopDataSource.qty ? 'disable' : 'normal';
    this.setData({
      num: num,
      maxusStatus: maxusStatus,
    })

    // this.countPrice();
    if (this.data.selectTransport != null && this.data.type == "pet") {
      that.queryFreightRates();
    }else{
      that.queryItemTotalItemPrice();
    }

  },
  /** 
   * 输入框事件
   */
  bindManual: function(e) {
    let that = this;
    var num = parseInt(e.detail.value) ;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    if (num > this.data.shopDataSource.qty) {
      num = this.data.shopDataSource.qty
    }
    var maxusStatus = num >= this.data.shopDataSource.qty ? "disable": 'normal';
    this.setData({
      num: num,
      minusStatus: minusStatus,
      maxusStatus: maxusStatus,
    })

    // this.countPrice();
    if (this.data.selectTransport != null && this.data.type == "pet") {
      that.queryFreightRates();
    }else{
      that.queryItemTotalItemPrice()
    }
  },

  /**
   * 点击可用优惠券
   */
  clipCouponsTap: function() {
    let that = this;
    if (this.data.type == "pet") {
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

    } else {
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
    }

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
   * 点击优惠券
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
          if (that.data.type == "pet") {
            that.queryFreightRates();
          } else {
            that.queryItemTotalItemPrice();
          }

        } else if (res.cancel) {
          Utils.logInfo('用户点击取消')
        }
      }
    })

  },

  /**
   * 选择配送方式
   */
  selectPickupMode: function(e) {
    this.setData({
      currentPickUpMode: this.data.pickUpModeList[e.currentTarget.dataset.index]
    })
  },

  /**
   * 点击收货地址
   */
  receivingAddressTap: function() {
    this.setData({
      typeOfShipping: []
    })
    wx.navigateTo({
      url: Page_path.Page_Me_AddressManager + "?ableselect=1"
    })
    this.setData({
      realInfo: ''
    })
  },



  /**
   * 点击担保支付
   */
  shopPayTap: function() {
    let that = this;
    if (this.data.receiveAddress == null) {
      wx.showToast({
        title: '请选择收货地址！',
        icon: "none"
      })
      return;
    }
    if (this.data.type == 'pet') {
      if (this.data.shopDataSource.pet.freeShipping != 1) {
        if (this.data.currentPickUpMode == null) {
          if (Utils.checkEmpty(this.data.typeOfShipping)) {
            wx.showToast({
              title: '暂无配送线路',
              icon: 'none'
            })
            return;
          }
          if (this.data.selectTransport == null) {
            wx.showToast({
              title: '请先选择运输方式方式',
              icon: 'none'
            })
            return;
          }
        } else {
          
        }
      }
    }
    wx.showLoading({
      title: '下单中...',
    })
    this.requestAddNewOrder(
      function requestAddNewOrderCallback(result) {
        wx.hideLoading();
        if (!Util.checkEmpty(result)) {
          Utils.logInfo("下单成功");
          wx.showModal({
            title: '下单成功',
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
                      if (userService.getBusinessNo() == that.data.shopDataSource.pet.business.businessNo) {
                        wx.navigateTo({
                          url: "/mallsubcontracting/pages/shoppingcart/payment/index?type=0&orderno=" + result,
                        })
                      } else {
                        that.requestPayInfo(result,
                          function getPayInfoCallback(payInfoData) {
                            if (payInfoData == null) {
                              wx.showToast({
                                title: '获取支付信息失败',
                                icon: 'none'
                              })
                              return;
                            }
                            Utils.logInfo("支付信息： \n" + JSON.stringify(payInfoData));
                            wx.requestPayment({
                              timeStamp: payInfoData.timeStamp,
                              nonceStr: payInfoData.nonceStr,
                              package: payInfoData.package,
                              signType: payInfoData.signType,
                              paySign: payInfoData.paySign,
                              success(res) {
                                if (that.data.selectTransport == null && that.data.type == "pet") {
                                  wx.showModal({
                                    title: '提示',
                                    content: '斑马速运将为您提供物流支持,请前往斑马速运小程序查看',
                                    showCancel: false,
                                    success(res) {
                                      if (res.confirm) {
                                        wx.navigateBack({
        
                                        })
                                      }
                                    }
                                  })
                                } else {
                                  wx.navigateBack({
        
                                  })
                                }
                              },
                              fail(res) {
                                wx.showToast({
                                  title: '支付失败,请稍后重试',
                                  icon: 'none'
                                })
                              }
                            })
                          }
                        )
                      }
                    } else {
                      wx.navigateBack({
                        
                      })
                    }
                  }
                })
              }
            }
          })
          
        } else {
          wx.showToast({
            title: '插入失败',
            icon: 'none'
          })
        }
      }
    )
    
  },

  /**
   * 提交订单
   * @param requestAddNewOrderCallback
   */
  requestAddNewOrder: function(requestAddNewOrderCallback) {
    let that = this;
    UserService.isLogin(function isLoginCallback(){
      let param = { //订单对象
        qty: that.data.num,   //数量
        business: {
          businessNo: UserService.getBusinessNo(),     //用户id
        },
        receivingAddress: {
          receivingNo: that.data.receiveAddress.receivingNo,  //所选地址的id
        },

        transportType: null,
        shareBusiness: null,
        couponDisCountAmount: 0,
        paymentAmount: 0,
        transportAmount: 0,
        coupon: null,
      }

      if (app.globalData.shareBusinessNo) {
        param.shareBusiness = {
          businessNo: app.globalData.shareBusinessNo
        }
      }

      if (that.data.selectCoupon != null) {
        param.coupon = {
          couponID: that.data.selectCoupon.couponID   //优惠券id
        }
      }

      if (that.data.selectTransport != null) {
        param.transportType = that.data.selectTransport   //选择的配送方式类型
      } else {
        param.transportType = null;
      }

      if (that.data.priceInformation != null) {
        param.couponDisCountAmount = that.data.priceInformation.couponDiscountAmount; //优惠券金额
        param.paymentAmount = that.data.priceInformation.paymentAmount; // 支付金额

        param.transportAmount = that.data.priceInformation.transportAmount;     //运输价格
      }

      if (that.data.type == Shop_Type_Item) {   //商品
        param.item = {
          itemNo: that.data.shopDataSource.itemNo
        }
        if (that.data.selectCoupon != null) {
          param.coupon = {
            couponID: that.data.selectCoupon.couponID
          }
        }
        OrderService.addNewItemOrder(param,
          function addNewOrderResultCallback(result) {
            Utils.logInfo("新增商品订单 ：\n" + JSON.stringify(result));
            if (Util.checkIsFunction(requestAddNewOrderCallback)) {
              requestAddNewOrderCallback(result.root);
            }
          }
        )
      } else {  //宠物
        param.pet = {
          petNo: that.data.shopDataSource.pet.petNo,
          weight: that.data.shopDataSource.pet.weight
        }

        OrderService.addNewPetOrder(param,
          function addNewOrderResultCallback(result) {
            Utils.logInfo("新增宠物订单 ：\n" + JSON.stringify(result));
            if (Util.checkIsFunction(requestAddNewOrderCallback)) {
              requestAddNewOrderCallback(result.root);
            }
          }
        )
      }
    })
  },

  /**
   * 获取支付信息
   * @param orderNo
   * @param getPayInfoCallback
   */
  requestPayInfo: function(orderNo, getPayInfoCallback) {
    if (this.data.type == Shop_Type_Item) {
      PayService.getItemOrderPayInfo(orderNo,
        function getResultCallback(success, result) {
          if (success) {
            if (Util.checkIsFunction(getPayInfoCallback)) {
              getPayInfoCallback(result.root);
            }
          } else {
            wx.showToast({
              title: '获取支付参数失败',
              icon: 'none'
            })
          }
        }
      )
    } else {
      PayService.getPetOrderPayInfo(orderNo,
        function getResultCallback(success, result) {
          if (success) {
            if (Util.checkIsFunction(getPayInfoCallback)) {
              getPayInfoCallback(result.root);
            }
          } else {
            wx.showToast({
              title: '获取支付参数失败',
              icon: 'none'
            })
          }
        }
      )
    }
  },

  //获取运输方式
  queryListTransportType: function (startCity, endCity) {
    let that = this;
    if (this.data.shopDataSource.pet.freeShipping == 1) {
      this.queryFreightRates();
      return;
    }
    that.setData({
      currentPickUpMode: null
    })
    OrderService.queryListTransportType(startCity, endCity, function callback(success,dataSource) {
      if (success) {
        that.setData({
          typeOfShipping: dataSource.root
        })
      } else {
        that.setData({
          currentPickUpMode: that.data.pickUpModeList[0],
        })
      }
    })
  },


  //  宠物合计价格以及运费
  queryFreightRates: function() {
    let that = this;
    wx.showLoading({
      title: '价格计算中...',
    })
    UserService.isLogin(function isLoginCallback(){
      let param = {
        pet: {
          petNo: that.data.shopDataSource.pet.petNo,
          weight: that.data.shopDataSource.pet.weight
        },
        qty: that.data.num,
        business: {
          businessNo: UserService.getBusinessNo()
        },
        receivingAddress: {
          receivingNo: that.data.receiveAddress.receivingNo
        },
        transportType: null,
        coupon: null,
        shareBusiness: null
      }
      if (that.data.selectCoupon != null) {
        param.coupon = {
          couponID: that.data.selectCoupon.couponID
        }
      }

      if (that.data.selectTransport != null) {
        param.transportType = that.data.selectTransport
      }

      OrderService.getPetOrderPrice(param, function callback(dataSource) {
        wx.hideLoading({
          success: (res) => {},
        })
        Utils.logInfo("获得总价信息==>" + JSON.stringify(dataSource))
        if (dataSource.root.priceState == 0) {
          that.setData({
            priceInformation: dataSource.root
          })
        } else if (dataSource.root.priceState == -2) {
          that.setData({
            selectCoupon: null,
            showCoupon: true,
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

  /**
   * 获取商品合计价格
   */
  queryItemTotalItemPrice:function(){
    let that = this;
    UserService.isLogin(function isLoginCallback(){
      let param = {
        item: {
          itemNo: that.data.shopDataSource.itemNo
        },
        qty: that.data.num,
        business: {
          businessNo: UserService.getBusinessNo()
        },
        receivingAddress: null,
        // transportType: null,
        coupon: null,
        shareBusiness: null
        
      }

      if (that.data.selectCoupon != null) {
        param.coupon = {
          couponID: that.data.selectCoupon.couponID
        }
      }

      if (that.data.receiveAddress != null) {
        param.receivingAddress = {
          receivingNo: that.data.receiveAddress.receivingNo
        }
      }
      Utils.logInfo(JSON.stringify(param));
      OrderService.getItemOrderPrice(param, function callback(dataSource) {
        Utils.logInfo("获得总价信息==>" + JSON.stringify(dataSource))
        if (dataSource.root.priceState == 0) {
          that.setData({
            priceInformation: dataSource.root
          })
        } else if (dataSource.root.priceState == -2) {
          that.setData({
            selectCoupon: null,
            showCoupon: true,
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

  /**
   * 选择配送方式
   */
  selectTransporTap: function(e) {
    var index = e.currentTarget.dataset.index;
    var transportype = e.currentTarget.dataset.transportype;
    this.setData({
      selectTransportIndex: index,
      selectTransport: transportype
    })
    this.queryFreightRates();
  },


  /**
   * 获得本单据可用的优惠券
   */
  getAbleCouponList: function(businessNo, shopNo, type, key) {
    let that = this;
    OrderService.getAbleCouponList(businessNo, shopNo, type, key, function(dataSource) {
      Utils.logInfo("获得本单据可用的优惠券：=>" + JSON.stringify(dataSource))
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
    AddressService.getDefaultAddressByBusinessNo(businessNo, function callback(res){
      wx.hideLoading();
      if (Util.checkIsFunction(getDefaultAddressCallback)) {
        getDefaultAddressCallback(res)
      }
    })
  }

})