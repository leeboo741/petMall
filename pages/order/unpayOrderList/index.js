// pages/order/unpayOrderList/index.js

const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const OrderService = require("../../../services/orderService.js");
const UserService = require("../../../services/userService.js");
const PayService = require("../../../services/payService.js");
const PagePath = require("../../../macros/pagePath.js");
const Config = require("../../../macros/config.js");
const Enum = require("../../../utils/enum.js");
const Util = require("../../../utils/util.js");
const app = getApp();
const Limit = 20;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    offset: 0, // 页码
    loadState: LoadFootItemState.Loading_State_Empty, // 底部状态
    dataSource: [],
    currentRole: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentRole: UserService.getCurrentRole()
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
    this.data.offset = 0;
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    this.requestData(this.data.offset,
      function getDataCallback(data) {
        console.log("获取未支付订单： \n" + JSON.stringify(data));
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
        console.log("获取未支付订单： \n" + JSON.stringify(data));
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
    let tempStoreNo = e.currentTarget.dataset.storeno;
    wx.navigateTo({
      url: PagePath.Page_Store_StoreInforMation + '?storeno=' + tempStoreNo,
    })
  },

  /**
   * 点击更多
   */
  tapMore: function (e) {
    let tempOrder = this.data.dataSource[e.currentTarget.dataset.index];
    if (this.data.currentRole == 0) {
      wx.showActionSheet({
        itemList: ["联系商家", "再来一单"],
        success(res) {
          if (res.tapIndex == 0) {
            let phone = Config.Service_Phone
            if (tempOrder.pet != null) {
              phone = tempOrder.pet.business.phoneNumber
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
            if (tempOrder.item != null) {
              wx.navigateTo({
                url: PagePath.Page_Mall_CommodityInformation + "?itemno=" + tempOrder.item.itemNo,
              })
            } else if (tempOrder.pet != null) {
              wx.navigateTo({
                url: PagePath.Page_Store_PetsInforMation + '?petno=' + tempOrder.pet.petNo,
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
        itemList: ["联系买家", "修改订单"],
        success(res) {
          if (res.tapIndex == 0) {
            if (Util.checkEmpty(tempOrder.customer) || Util.checkEmpty(tempOrder.customer.phone)) {
              wx.showToast({
                title: '客户电话不存在',
                icon:'none'
              })
            } else {
              wx.makePhoneCall({
                phoneNumber: tempOrder.customer.phone,
              })
            }
          } else if (res.tapIndex == 1) {
            wx.showToast({
              title: '修改订单',
              icon:'none'
            })
          }
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
    if (tempOrder.pet != null) {
      payType = 1;
    }
    this.requestPayInfo(payType, tempOrderNo,
      function getPayInfoCallback(payInfoData) {
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
        function getResultCallback(result) {
          if (Util.checkIsFunction(getPayInfoCallback)) {
            getPayInfoCallback(result);
          }
        }
      )
    } else {
      PayService.getPetOrderPayInfo(orderNo,
        function getResultCallback(result) {
          if (Util.checkIsFunction(getPayInfoCallback)) {
            getPayInfoCallback(result);
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
    let param = {
      offset: offset,
      limit: Limit,
      orderType: Enum.Order_Type_Enum.UnPay,
    }
    if (this.data.currentRole == 0) {
      param.customerNo = UserService.getCustomerNo();
      OrderService.customerQueryOrderList(param,
        function queryResultCallback(result) {
          if (Util.checkIsFunction(getDataCallback)) {
            getDataCallback(result.root)
          }
        }
      )
    } else {
      param.businessNo = UserService.getBusinessNo();
      OrderService.businessQueryOrderList(param,
        function queryResultCallback(result) {
          if (Util.checkIsFunction(getDataCallback)) {
            getDataCallback(result.root)
          }
        }
      )
    }
  },
})