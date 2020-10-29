// pages/order/unpayOrderList/index.js

const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const OrderService = require("../../../services/orderService.js");
const UserService = require("../../../services/userService.js");
const PayService = require("../../../services/payService.js");
const PagePath = require("../../../macros/pagePath.js");
const Config = require("../../../macros/config.js");
const Enum = require("../../../utils/enum.js");
const Util = require("../../../utils/util.js");
const Utils = require("../../../utils/util.js");
const app = getApp();
const Limit = 20;

const ShareManager = require("../../../services/shareService");
const orderService = require("../../../services/orderService.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    offset: 0, // 页码
    loadState: LoadFootItemState.Loading_State_Empty, // 底部状态
    dataSource: [],
    currentRole: null, //0 是买家  1.是卖家
    tabList: [
      "宠物",
      "商品"
    ],
    currentTabIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentRole: UserService.getCurrentRole()
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
    let that = this;
    this.data.offset = 0;
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    this.requestData(this.data.offset,
      function getDataCallback(data) {
        Utils.logInfo("获取未支付订单： \n" + JSON.stringify(data));
        that.setData({
          dataSource: data,
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
  onReachBottom: function () {
    if (this.data.loadState == LoadFootItemState.Loading_State_End
      || this.data.loadState == LoadFootItemState.Loading_State_Loading) {
      return;
    }
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    let that = this;
    this.requestData(this.data.offset,
      function getDataCallback(data) {
        Utils.logInfo("获取未支付订单： \n" + JSON.stringify(data));
        let tempList = that.data.dataSource.concat(data);
        that.setData({
          dataSource: tempList
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
   * 点击单据
   */
  tapToOrderDetail: function (e) {
    let tempOrder = this.data.dataSource[e.currentTarget.dataset.index];
    let tempOrderNo = e.currentTarget.dataset.orderno;
    app.globalData.detailOrder = tempOrder;
    wx.navigateTo({
      url: PagePath.Page_Order_Detail + "?orderno=" + tempOrderNo,
    })
  },

  /**
   * 点击订单商品
   */
  tapItem: function (e) {
    let tempOrder = this.data.dataSource[e.currentTarget.dataset.index];
    let tempItemNo = e.currentTarget.dataset.itemno;
    wx.navigateTo({
      url: PagePath.Page_Mall_CommodityInformation + "?itemno=" + tempItemNo,
    })
  },

  /**
   * 点击订单宠物
   */
  tapPet: function (e) {
    let tempOrder = this.data.dataSource[e.currentTarget.dataset.index];
    let tempPetNo = e.currentTarget.dataset.petno;
    wx.navigateTo({
      url: PagePath.Page_Store_PetsInforMation + '?petno=' + tempPetNo,
    })
  },

  /**
   * 点击订单商家
   */
  tapStore: function (e) {
    let tempOrder = this.data.dataSource[e.currentTarget.dataset.index];
    let tempStoreNo = tempOrder.shop.businessNo;
    wx.navigateTo({
      url: PagePath.Page_Store_StoreInforMation + '?storeno=' + tempStoreNo + '&showtype=' + this.data.currentTabIndex,
    })
  },

  /**
   * 点击更多
   */
  tapMore: function (e) {
    let that = this;
    let tempOrder = this.data.dataSource[e.currentTarget.dataset.index];
    if (this.data.currentRole == 0) {
      let itemList = ["联系商家"];
      wx.showActionSheet({
        itemList: itemList,
        success(res) {
          if (res.tapIndex == 0) {
            let phone = Config.Service_Phone
            if (tempOrder.petNo != null) {
              phone = tempOrder.shop.contactPhone
            }
            if (tempOrder.itemOrderInfoList != null) {
              phone = tempOrder.shop.contactPhone
            }
            if (Util.checkEmpty(phone)) {
              wx.showToast({
                title: '商家电话不存在',
                icon: 'none'
              })
            } else {
              wx.makePhoneCall({
                phoneNumber: phone
              })
            }
          } else if (res.tapIndex == 1) {
            if (tempOrder.itemNo != null) {
              wx.navigateTo({
                url: PagePath.Page_Mall_CommodityInformation + "?itemno=" + tempOrder.itemNo,
              })
            } else if (tempOrder.petNo != null) {
              wx.navigateTo({
                url: PagePath.Page_Store_PetsInforMation + '?petno=' + tempOrder.petNo,
              })
            } else {
              wx.showToast({
                title: "订单商品为空",
                icon: 'none'
              })
            }
          }
        }
      })
    } else {
      wx.showActionSheet({
        itemList: ["联系买家", "改价", "上传付款凭证","发送至客户支付"],
        success(res) {
          if (res.tapIndex == 0) {
            if (tempOrder.petNo != null) {
              if (Util.checkEmpty(tempOrder.customer) || Util.checkEmpty(tempOrder.customer.phone)) {
                wx.showToast({
                  title: '客户电话不存在',
                  icon:'none'
                })
              } else {
                wx.makePhoneCall({
                  phoneNumber: tempOrder.buyer.contactPhone,
                })
              }
            } else {
              wx.makePhoneCall({
                phoneNumber: tempOrder.buyer.contactPhone,
              })
            }
          } else if (res.tapIndex == 1) {
            app.globalData.changePriceOrder = tempOrder;
            wx.navigateTo({
              url: '/pages/order/unpayOrderList/changePrice/index',
            })
          } else if (res.tapIndex == 2) {
            app.globalData.paymentVoucherOrder = tempOrder;
            wx.navigateTo({
              url: '/pages/order/unpayOrderList/paymentVoucher/index',
            })
          } else if (res.tapIndex == 3) {
            if (tempOrder.petNo != null) {
              wx.navigateTo({
                url: "/mallsubcontracting/pages/shoppingcart/payment/index?type=0&orderno=" + tempOrder.orderNo,
              })
            } else {
              wx.navigateTo({
                url: "/mallsubcontracting/pages/shoppingcart/payment/index?type=1&orderno=" + tempOrder.orderNo,
              })
            }
          }
        }
      })
    }
  },

  tapCancel: function(e) {
    let that = this;
    let tempIndex = e.currentTarget.dataset.index;
    let tempOrder = this.data.dataSource[tempIndex];
    let tempOrderNo = tempOrder.orderNo;
    let tempBuyerNo = tempOrder.shop.customerNo;
    let tempWaybillNo = tempOrder.wayBill;
    if (this.data.currentTabIndex == 0) {
      OrderService.deletePetOrderByOrderNo(tempOrderNo, tempBuyerNo, tempWaybillNo,function(res) {
        if (res == 1) {
          that.data.dataSource.splice(tempIndex, 1);
          that.setData({
            dataSource: that.data.dataSource
          })
        } else {
          wx.showToast({
            title: '取消插入失败',
            icon: 'none'
          })
        }
      })
    } else if (this.data.currentTabIndex == 1) {
      OrderService.deleteItemOrderByOrderNo(tempOrderNo, function(res) {
        if (res == 1) {
          that.data.dataSource.splice(tempIndex, 1);
          that.setData({
            dataSource: that.data.dataSource
          })
        } else {
          wx.showToast({
            title: '取消插入失败',
            icon: 'none'
          })
        }
      })
    }
  },

  /**
   * 点击支付
   */
  tapToPay: function (e) {
    let tempOrder = this.data.dataSource[e.currentTarget.dataset.index];
    let tempOrderNo = e.currentTarget.dataset.orderno;

    let payType = 0;
    if (tempOrder.petNo != null) {
      payType = 1;
    }
    this.requestPayInfo(payType, tempOrderNo,
      function getPayInfoCallback(payInfoData) {
        if (payInfoData == null) {
          wx.showToast({
            title: '获取支付信息失败',
            icon: 'none'
          })
          return;
        }
        wx.requestPayment({
          timeStamp: payInfoData.timeStamp,
          nonceStr: payInfoData.nonceStr,
          package: payInfoData.package,
          signType: payInfoData.signType,
          paySign: payInfoData.paySign,
          success(res) {
            wx.showToast({
              title: '支付成功',
            })
            wx.startPullDownRefresh();
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
  },

  /**
   * 请求支付信息
   * @param orderNo
   * @param payType 0 item 1 pet
   * @param getPayInfoCallback
   */
  requestPayInfo: function (payType, orderNo, getPayInfoCallback) {
    if (payType == 0) {
      PayService.getItemOrderPayInfo(orderNo,
        function getResultCallback(success,result) {
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

  /**
   * 请求数据
   * @param offset
   * @param getDataCallback
   */
  requestData: function (offset, getDataCallback) {
    let that = this;
    UserService.isLogin(function isLoginCallback(){
      let param = {
        offset: offset,
        limit: Limit,
        businessNo: UserService.getBusinessNo()
      }
      if (that.data.currentRole == 0) { //买家
        if (that.data.currentTabIndex == 0) {  //宠物
          OrderService.customerQueryOrderList(param,
            function queryResultCallback(result) {
              if (Util.checkIsFunction(getDataCallback)) {
                getDataCallback(result.root)
              }
            }
          )
        } else {    //商品
          OrderService.userGoodsOrderUnpaid(param,
            function queryResultCallback(result) {
              if (Util.checkIsFunction(getDataCallback)) {
                getDataCallback(result.root)
              }
            }
          )
        }

      } else {    //卖家
        if (that.data.currentTabIndex == 0) {  //宠物
          OrderService.businessPetQueryOrderList(param,
            function queryResultCallback(result) {
              if (Util.checkIsFunction(getDataCallback)) {
                getDataCallback(result.root)
              }
            }
          )
        } else {//商品
          OrderService.businessGoodsOrderUnpaid(param,
            function queryResultCallback(result) {
              if (Util.checkIsFunction(getDataCallback)) {
                getDataCallback(result.root)
              }
            }
          )
        }
      }
    },function notLoginCallback(){

      if (Util.checkIsFunction(getDataCallback)) {
        getDataCallback([])
      }
    })
    
  },

  /**
  * 选择tab
  */
  handleTabChange: function (e) {
    this.setData({
      currentTabIndex: e.detail.key,
      loadState: LoadFootItemState.Loading_State_Empty,
    })
    wx.startPullDownRefresh();
  },
  
})