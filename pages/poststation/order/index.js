// pages/poststation/order/index.js
const app = getApp();
const ServerManager = require('../../../services/serverManager.js');
const Utils = require("../../../utils/util.js");
const UserManager = require('../../../services/userService.js');
const ShareManager = require("../../../services/shareService");
const PayManager = require("../../../services/payService");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    businessObj: null, // 商家
    serverObj: null, // 服务
    petObj: null, // 宠物
    beauticianObj: null, // 美容师
    couponObj: null, // 优惠券

    hairLengthList: [], // 毛长区间
    weightZoneList: [], // 重量区间
    ageZoneList: [], // 年龄区间

    serverPrice: 0,
    paymentAmount: 0,

    serviceParamCatSelectList: [
      {
        iconName: "data",
        title: "宠物年龄",
      },
      {
        iconName: "clock",
        title: "选择服务时间",
      },
      {
        iconName: "user",
        title: "选择美容师"
      },
      {
        iconName: "label",
        title: "未使用优惠券"
      }
    ],

    serviceParamSelectList: [{
        iconName: "data",
        title: "宠物毛长",
      },
      {
        iconName: "clipboard",
        title: "宠物重量",
      },
      {
        iconName: "clock",
        title: "选择服务时间",
      },
      {
        iconName: "user",
        title: "选择美容师"
      },
      {
        iconName: "label",
        title: "未使用优惠券"
      }
    ],
    param: {
      hairLength: null, // 宠物毛长
      startWeight: null, // 宠物重量
      serviceTime: null, // 服务时间
      beautician: null, // 美容师
      coupon: null, // 优惠券
      age: null, // 宠物年龄
    },

    selectHairLength: null,
    selectWeightZone: null,
    selectAgeZone: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (!app.globalData.serviceSelectBusiness) {
      throw new Error("服务下单页面 选中商家为空");
      return;
    }
    if (!app.globalData.serviceSelectPet) {
      throw new Error("服务下单页面 选中宠物为空");
      return;
    }
    if (!app.globalData.serviceSelectServer) {
      throw new Error("服务下单页面 选中服务为空");
      return;
    }

    if (app.globalData.serviceSelectBusiness) {
      this.setData({
        businessObj: app.globalData.serviceSelectBusiness
      })
    }
    if (app.globalData.serviceSelectPet) {
      this.setData({
        petObj: app.globalData.serviceSelectPet
      })
    }
    if (app.globalData.serviceSelectServer) {
      this.setData({
        serverObj: app.globalData.serviceSelectServer
      })
    }
    let that = this;
    if (this.data.petObj.petSort.petSortNo == 10001) {
      ServerManager.getAgeZone(this.data.serverObj.serviceID, function getAgeZoneCallback(result) {
        Utils.logInfo('年龄区间:', result);
        that.setData({
          ageZoneList: result
        })
      })
    } else {
      ServerManager.getHariLength(this.data.serverObj.serviceID, this.data.petObj.petGenre.petGenreNo, function getHairlengthCallback(result) {
        Utils.logInfo("宠物毛长:", result);
        that.setData({
          hairLengthList: result
        })
      });
    }
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
    this.data.param.beautician = app.globalData.serviceSelectBeautician;
    this.setData({
      beauticianObj: app.globalData.serviceSelectBeautician
    })

    if (app.globalData.selectServiceTimeObj != null) {
      this.data.param.serviceTime = app.globalData.selectServiceTimeObj.dateStr + " " + app.globalData.selectServiceTimeObj.timeStr;
    }

    this.data.couponObj = app.globalData.serviceSelectCoupon;
    this.data.param.coupon = this.data.couponObj;
    if (this.data.couponObj != null) {
      let price = this.data.serverPrice - this.data.couponObj.couponType.value;
      this.setData({
        paymentAmount: price
      })
    }

    this.setData({
      param: this.data.param
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    app.globalData.selectServiceTimeObj = null;
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    app.globalData.serviceSelectCoupon = null;
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

  tapParamSelectItem: function(res) {
    let index = res.currentTarget.dataset.tapindex;
    let that = this;
    if (this.data.petObj.petSort.petSortNo == 10001) {
      if (index == 0) {
        let itemArray = [];
        for (let index = 0; index < this.data.ageZoneList.length; index++) {
          let ageZone = this.data.ageZoneList[index];
          itemArray.push(ageZone.startAge + "~" + ageZone.endAge + "月");
        }
        itemArray = [
          "小猫(0~6个月)","大猫(6个月以上)"
        ]
        wx.showActionSheet({
          itemList: itemArray,
          success(res) {
            that.data.param.age = itemArray[res.tapIndex];
            that.data.param.coupon = null;
            let selectAgeZone = that.data.ageZoneList[res.tapIndex];
            if (selectAgeZone == null) {
              wx.showToast({
                title: '暂无相应宠物服务',
                icon: 'none'
              })
              return;
            }
            that.setData({
              param: that.data.param,
              selectAgeZone: selectAgeZone,
              serverPrice: selectAgeZone.servicePrice,
              paymentAmount: selectAgeZone.servicePrice,
              couponObj: null,
            })
          },
        })
      } else if (index == 1) {
        wx.navigateTo({
          url: '/pages/poststation/order/serviceTimeSelected/index',
        })
      } else if (index == 2) {
        wx.navigateTo({
          url: '/pages/poststation/order/beauticianSelected/index',
        })
      } else {
        if (Utils.checkEmpty(this.data.param.age)) {
          wx.showToast({
            title: '请选择宠物月龄',
            icon: 'none'
          })
          return;
        }
        wx.navigateTo({
          url: '/pages/poststation/order/couponSelected/index?amount=' + this.data.serverPrice,
        })
      }
    } else {
      if (index == 0) {
        let itemArray = [];
        for (let index = 0; index < this.data.hairLengthList.length; index++) {
          itemArray.push(this.data.hairLengthList[index].hairLengthName);
        }
        wx.showActionSheet({
          itemList: itemArray,
          success(res) {
            let hairLength = that.data.hairLengthList[res.tapIndex].hairLength;
            if (that.data.selectHairLength != hairLength) {
              that.data.param.hairLength = itemArray[res.tapIndex];
              that.data.param.coupon = null;
              that.setData({
                param: that.data.param,
                selectHairLength: hairLength,
                selectWeightZone: null,
                serverPrice: 0,
                paymentAmount: 0,
                couponObj: null
              })
              wx.showLoading({
                title: '请稍等...',
              })
              ServerManager.getWeightZone(that.data.serverObj.serviceID, hairLength, function getWeightZoneCallback(result) {
                wx.hideLoading();
                Utils.logInfo("重量区间:", result);
                that.setData({
                  weightZoneList: result
                })
              });
            }
          }
        })
      } else if (index == 1) {
        if (this.data.param.hairLength && this.data.weightZoneList) {
          let itemArray = [];
          for (let index = 0; index < this.data.weightZoneList.length; index++) {
            let weightZoneObj = this.data.weightZoneList[index];
            itemArray.push(weightZoneObj.startWeight + "~" + weightZoneObj.endWeight + "kg");
          }
          wx.showActionSheet({
            itemList: itemArray,
            success(res) {
              that.data.param.startWeight = itemArray[res.tapIndex];
              that.data.param.coupon = null;
              let selectWeightZone = that.data.weightZoneList[res.tapIndex];
              that.setData({
                param: that.data.param,
                selectWeightZone: selectWeightZone,
                serverPrice: selectWeightZone.servicePrice,
                paymentAmount: selectWeightZone.servicePrice,
                couponObj: null
              })
            }
          })
        } else {
          wx.showToast({
            title: '请先选择毛长',
            icon: 'none'
          })
        }
      } else if (index == 2) {
        wx.navigateTo({
          url: '/pages/poststation/order/serviceTimeSelected/index',
        })
      } else if (index == 3) {
        wx.navigateTo({
          url: '/pages/poststation/order/beauticianSelected/index',
        })
      } else if (index == 4) {
        if (Utils.checkEmpty(this.data.param.hairLength) || Utils.checkEmpty(this.data.param.startWeight)) {
          wx.showToast({
            title: '请选择毛长和体重',
            icon: 'none'
          })
          return;
        }
        wx.navigateTo({
          url: '/pages/poststation/order/couponSelected/index?amount=' + this.data.serverPrice,
        })
      }
    }
  },

  getServerPrice: function() {
    let that = this;
    ServerManager.getServicePrice(that.data.serverObj.serviceID, that.data.selectHairLength, that.data.selectWeightZone, app.globalData.serviceSelectPet, function getResultCallback(result) {
      Utils.logInfo("获取服务价格:", result);
    });
  },

  tapConfirmOrder: function() {
    let orderParam = ServerManager.OrderServerParam({
      shop: this.data.businessObj.business,
      buyer: {
        customerNo: UserManager.getLocalUserInfo().customerNo,
        businessNo: UserManager.getLocalUserInfo().business.businessNo
      },
      coupon: this.data.couponObj,
      couponAmount: (Utils.checkEmpty(this.data.couponObj) || Utils.checkEmpty(this.data.couponObj.couponType) || Utils.checkEmpty(this.data.couponObj.couponType.value)) ? null: this.data.couponObj.couponType.value ,
      paymentAmount: this.data.paymentAmount,
      qty: 1,
      servicePrice: this.data.petObj.petSort.petSortNo == 10001? this.data.selectAgeZone: this.data.selectWeightZone,
      visitorTime: this.data.param.serviceTime,
      service: {
        serviceID: this.data.serverObj.serviceID,
        serviceName: this.data.serverObj.serviceName,
      },
      beautician: this.data.beauticianObj
    })
    ServerManager.orderServer(orderParam, function orderCallback(result){
      Utils.logInfo(result);
      wx.showModal({
        title: '服务已预约',
        content: '是否立即支付',
        cancelText: '稍后支付',
        confirmText: '支付订单',
        success(res){
          if (res.confirm) {
            PayManager.getServerOrderPayInfo(result, function(payInfo){
              wx.requestPayment({
                timeStamp: payInfo.timeStamp,
                nonceStr: payInfo.nonceStr,
                package: payInfo.package,
                signType: payInfo.signType,
                paySign: payInfo.paySign,
                success(res){
                  wx.navigateBack({
        
                  })
                }
              })
            })
          } else {
            wx.showModal({
              title:'订单未支付',
              content: '请尽快前往 我的->已预约 支付订单',
              success(res) {
                if (res.confirm) {
                  wx.navigateBack({
                  })
                }
              }
            })
          }
        }
      })
      
    })
  }
})