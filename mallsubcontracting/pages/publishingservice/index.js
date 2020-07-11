// mallsubcontracting/pages/publishingservice/index.js
const UrlPath = require("../../../macros/urlPath.js");
const Util = require("../../../utils/util.js");
const ServerManager = require("../../../services/serverManager.js");
const UserManager = require("../../../services/userService.js");
const app = getApp();
const ShareManager = require("../../../services/shareService");
const Utils = require("../../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "发布服务",

    serviceID: null, //   ==> serviceID
    serverName: "", // 服务名称 ==> serviceName
    selectedServerType: null, // 选中服务类型 ==> serviceType
    serverPrice: null, // 服务基础价格 ==> servicePrice
    serverList: [], // 要上传的服务列表 ==> prices
    describe: '', //描述

    uploadUrl: null, //图片上传地址

    serverTypeList: [], // 服务类型列表

    petSortList: [], // 获取宠物一级分类列表

    petHairList: [], // 宠物毛长列表

    ageTypeList: [
      {
        name: "小猫(0~6个月)",
        value: 1,
      },
      {
        name: "大猫(6个月以上)",
        value: 2,
      }
    ], //


    // serviceImagePathList: [], //图片

    tempServerItem: {
      petSort: null, // 宠物种类
      petHair: null, // 宠物毛长
      startWeight: null, // 宠物起始重量
      endWeight: null, // 宠物结束重量
      petAgeStart: null, // 宠物起始年龄
      petAgeEnd: null, // 宠物结束年两
      ageType: null, // 宠物年龄类型
      servicePrice: null, // 宠物服务价格
    }, // 新建服务
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      uploadUrl: UrlPath.Url_Base + UrlPath.Url_UploadFile
    })
    let that = this;
    if (app.globalData.editService) {
      let tempService = app.globalData.editService;
      this.setData({
        serviceID: tempService.serviceID,
        serverName: tempService.serviceName,
        selectedServerType: tempService.serviceType,
        serverPrice: tempService.servicePrice,
        serverList: tempService.prices,
        title: '编辑服务',
      })
      app.globalData.editService = null;
    }
    ServerManager.getPetSort(function callback(result) {
      that.setData({
        petSortList: result
      })
    })
    ServerManager.getAllServerType(function callback(result) {
      that.setData({
        serverTypeList: result
      })
    })
    ServerManager.getAllPetHariLength(function callback(result) {
      that.setData({
        petHairList: result
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
   * 输入服务名称
   */
  inputServerName: function(res) {
    let serverName = res.detail.value;
    this.setData({
      serverName: serverName
    })
  },

  /**
   * 选择服务类型
   */
  selectServerType: function(res) {
    let selectedServerType = this.data.serverTypeList[res.detail.value];
    let that = this;
    this.setData({
      selectedServerType: selectedServerType
    })
  },

  /**
   * 输入服务基础价格
   */
  inputServerPrice: function(res) {
    this.setData({
      serverPrice: res.detail.value
    })
  },

  /**
   * 选择宠物品种
   */
  selectedPetSort: function(res) {
    let itemArray = [];
    for (let index = 0; index < this.data.petSortList.length; index++) {
      let petSort = this.data.petSortList[index];
      itemArray.push(petSort.petSortName);
    }
    let that = this;
    wx.showActionSheet({
      itemList: itemArray,
      success(res) {
        that.data.tempServerItem.petSort = that.data.petSortList[res.tapIndex];
        that.setData({
          tempServerItem: that.data.tempServerItem
        })
      }
    })
  },

  /**
   * 输入起始重量
   */
  inputPetWeightStart: function(res) {
    this.data.tempServerItem.startWeight = res.detail.value;
    this.setData({
      tempServerItem: this.data.tempServerItem
    })
  },

  /**
   * 输入结束重量
   */
  inputPetWeightEnd: function(res) {
    this.data.tempServerItem.endWeight = res.detail.value;
    this.setData({
      tempServerItem: this.data.tempServerItem
    })
  },

  /**
   * 选择毛长
   */
  selectedPetHairLength: function(res) {
    Utils.logInfo(res);
    this.data.tempServerItem.petHair = this.data.petHairList[res.detail.value];
    this.setData({
      tempServerItem: this.data.tempServerItem
    })
  },

  /**
   * 选择宠物年龄类型
   */
  selectPetAgeType: function(res) {
    this.data.tempServerItem.ageType = this.data.ageTypeList[res.detail.value].value;
    this.setData({
      tempServerItem: this.data.tempServerItem
    })
  },

  /**
   * 输入起始月份
   */
  // inputPetAgeStart: function(res) {
  //   this.data.tempServerItem.petAgeStart = res.detail.value;
  //   this.setData({
  //     tempServerItem: this.data.tempServerItem
  //   })
  // },

  /**
   * 输入结束月份
   */
  // inputPetAgeEnd: function(res) {
  //   this.data.tempServerItem.petAgeEnd = res.detail.value;
  //   this.setData({
  //     tempServerItem: this.data.tempServerItem
  //   })
  // },

  /**
   * 输入服务价格
   */
  inputPetRetailPrice: function(res) {
    this.data.tempServerItem.servicePrice = res.detail.value;
    this.setData({
      tempServerItem: this.data.tempServerItem
    })
  },

  /**
   * 添加服务
   */
  addServerItem: function(res) {
    if (this.data.tempServerItem.petSort == null) {
      this.toast("请选择宠物种类");
      return;
    }
    if (this.data.tempServerItem.petSort.petSortNo == 10001) {
      if (Util.checkEmpty(this.data.tempServerItem.ageType) || this.data.tempServerItem.ageType==0) {
        this.toast("请选择猫猫大小");
        return;
      }
    } else {
      if (Util.checkEmpty(this.data.tempServerItem.startWeight)) {
        this.toast("请输入最小重量");
        return;
      }
      if (!Util.checkEmpty(this.data.tempServerItem.endWeight) && parseFloat(this.data.tempServerItem.endWeight) <= parseFloat(this.data.tempServerItem.startWeight)) {
        this.toast('错误最大重量');
        return;
      }
      if (Util.checkEmpty(this.data.tempServerItem.petHair)) {
        this.toast('请选择毛长');
        return;
      }
    }
    if (Util.checkEmpty(this.data.tempServerItem.servicePrice)) {
      this.toast('请输入价格');
      return;
    }
    this.data.serverList.push(this.data.tempServerItem);
    this.setData({
      serverList: this.data.serverList,
      tempServerItem: {},
    })
  },

  /**
   * 删除服务
   */
  deleteServerItem: function(result) {
    let that = this;
    wx.showModal({
      title: '确定删除',
      success(res) {
        if (res.confirm) {
          that.data.serverList.splice(result.currentTarget.dataset.index, 1);
          that.setData({
            serverList: that.data.serverList
          })
        }
      }
    })

  },

  /**
   * 上传列表
   */
  // uploadComplete: function(res) {
  //   let that = this;
  //   that.setData({
  //     serviceImagePathList: res.detail.uploadReturnDataList
  //   })
  // },

  /**
   * 删除图片
   */
  // deleteImage: function(res) {
  //   let that = this;
  //   that.setData({
  //     serviceImagePathList: res.detail.uploadReturnDataList
  //   })
  // },

  /**
   * 添加描述
   */
  inputDescribe: function(res) {
    let describe = res.detail.value;
    this.setData({
      describe: describe
    })
  },

  /**
   * 提示
   */
  toast: function(res) {
    wx.showToast({
      title: res,
      icon: "none"
    })
  },

  /**
   * 发布
   */
  tapToRelease: function(res) {
    let that = this;
    UserManager.isLogin(function isLoginCallback() {
      let serviceObj = {};
      let businessObj = {
        businessNo: UserManager.getBusinessNo()
      }
      serviceObj.business = businessObj

      if (!Util.checkEmpty(that.data.serviceID)) {
        serviceObj.serviceID = that.data.serviceID;
      }

      if (Util.checkEmpty(that.data.serverName)) {
        that.toast('请输入服务名称');
        return;
      }
      serviceObj.serviceName = that.data.serverName;

      if (Util.checkEmpty(that.data.selectedServerType)) {
        that.toast('请选择服务类型');
        return;
      }
      serviceObj.serviceType = that.data.selectedServerType;

      if (Util.checkEmpty(that.data.serverPrice)) {
        that.toast('请输入基础价格');
        return;
      }
      serviceObj.servicePrice = that.data.serverPrice;

      if (!Util.checkEmpty(that.data.serverList)) {
        let prices = [];
        for (let index = 0; index < that.data.serverList.length; index++) {
          let price = {};
          let server = that.data.serverList[index];
          price.petSort = server.petSort;
          if (server.petSort.petSortNo == 10001) { // 猫
            // price.startAge = server.petAgeStart;
            // price.endAge = server.petAgeEnd;
            price.ageType = server.ageType;
          } else { // 狗
            price.petHair = server.petHair;
            price.startWeight = server.startWeight;
            price.endWeight = server.endWeight;
          }
          price.servicePrice = server.servicePrice;
          if (!Util.checkEmpty(server.servicePriceID)) {
            price.servicePriceID = server.servicePriceID;
          }
          prices.push(price);
        }
        serviceObj.prices = prices;
      }

      // if (Util.checkEmpty(that.data.serviceImagePathList)) {
      //   that.toast("至少上传一张图片");
      //   return;
      // }
      // let pics = [];
      // for (let index = 0; index < that.data.serviceImagePathList.length; index++) {
      //   let imagePath = that.data.serviceImagePathList[index];
      //   let pic = {
      //     scenePic: imagePath.fileAddress
      //   }
      //   pics.push(pic);
      // }
      // serviceObj.pics = pics;
      if (Utils.checkEmpty(serviceObj.serviceID)) {
        ServerManager.releaseServer(serviceObj, function releaseCallback(result) {
          Utils.logInfo(result);
          wx.showModal({
            title: '新增完成',
            content: '是否继续新增',
            cancelText: '完成',
            confirmText: '继续新增',
            success(res) {
              if (res.confirm) {
                that.refreshData();
              } else {
                wx.navigateBack({
  
                })
              }
            }
          })
        })
      } else {
        ServerManager.editServer(serviceObj, function(result){
          Utils.logInfo(result);
          wx.showModal({
            title: '编辑完成',
            confirmText: '完成',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.navigateBack({
  
                })
              }
            }
          })
        })

      }
    })
  },

  refreshData: function() {

    this.setData({
      serverName: null,
      selectedServerType: null,
      serverPrice: null,
      describe: null,
      // serviceImagePathList: [],
      serverList: [],
      tempServerItem: {},
    })
  }
})