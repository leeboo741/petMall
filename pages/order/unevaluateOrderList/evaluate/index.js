// pages/order/unevaluateOrderList/evaluate/index.js

const app = getApp();
const Util = require("../../../../utils/util.js");
const Utils = require("../../../../utils/util");
const PetService = require("../../../../services/petService.js");
const MallService = require("../../../../services/mallService.js");
const UserService = require("../../../../services/userService.js");
const UploadFileService = require("../../../../services/uploadFileService.js");
const UrlPath = require("../../../../macros/urlPath.js");
const EvaluateService=require("../../../../services/evaluateService.js");

const Max_UploadImage_Length = 6; // 最大上传数量
const Default_Star_Level = 5; // 默认星级

const Type_Item = 0;
const Type_Pet = 1;
const Type_Server = 2;

const ShareManager = require("../../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNo: null,
    currentRole: null, // 当前角色
    content: null, // 评价内容
    starLevel: Default_Star_Level, // 星级
    maxUploadImageLength: Max_UploadImage_Length,
    uploadImageList: [], // 待上传图片地址列表
    serviceImagePathList: [], // 已上传图片地址列表
    uploadImageTask: null, // 上传图片任务
    currentUploadIndex: 0, // 当前上传图片下标
    successTimeIntervier: null,
    order: null,
    type: Type_Server, // 0 item 1 pet 2 server

    uploadUrl: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Utils.logInfo(UrlPath.Url_Base + UrlPath.Url_UploadFile+"=================")
    this.setData({
      currentRole: UserService.getCurrentRole(),
      orderNo: options.orderno,
      uploadUrl: UrlPath.Url_Base + UrlPath.Url_UploadFile
    })
    if (app.globalData.evaluateOrder != null) {
      this.setData({
        order: app.globalData.evaluateOrder
      })
      Utils.logInfo("获得数据：==>" + JSON.stringify(app.globalData.evaluateOrder));
      if (this.data.order.itemNo != null) {
        this.setData({
          type: Type_Item
        })
      }
      if (this.data.order.petNo != null) {
        this.setData({
          type: Type_Pet
        })
      }
      app.globalData.evaluateOrder = null;
    }
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
    clearTimeout(this.data.successTimeIntervier);
    this.data.successTimeIntervier = null;
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
    return ShareManager.getDefaultShareCard();
  },

  /**
   * 点击星星
   */
  tapStar: function (e) {
    this.setData({
      starLevel: e.currentTarget.dataset.starlevel
    })
  },

  /**
   * 输入评价内容
   */
  inputEvaluateContent: function (e) {
    this.data.content = e.detail.value
  },

  /**
   * 点击选择新图片
   */
  // tapAddNewUploadImage: function(){
  //   let that = this;
  //   wx.chooseImage({
  //     count: Max_UploadImage_Length,
  //     success: function (res) {
  //       that.setData({
  //         uploadImageList: res.tempFilePaths,
  //         serviceImagePathList: null,
  //       })
  //       that.uploadListImage();
  //     },
  //   })
  // },

  /**
   * 点击提交
   */
  tapSubmit: function () {
    let that = this;
    UserService.isLogin(function isLoginCallback(){
      wx.showLoading({
        title: '提交中...',
      })
      that.requestAddNewEvaluate(
        function addCallback(result) {
          Utils.logInfo("提交信息==>" + JSON.stringify(result));
          if (result == "操作成功") {
            wx.showToast({
              title: '提交成功',
              duration: 1500,
            })
            that.data.successTimeIntervier = setTimeout(
              function success() {
                wx.navigateBack({

                })
              },
              1600,
            )
          } else {
            wx.showToast({
              title: '插入评价失败',
              icon: 'none'
            })
          }
          wx.hideLoading()
        }
      )
    })
  },

  /**
   * 获取上传数据
   * @return requestParam
   */
  getRequestParam: function () {

    let that=this;
    let param = {
    
    };

    if (this.data.type == Type_Item) {
      param.itemAppraise = {
        item: {
          itemNo: that.data.order.itemNo,
        },
        itemOrder: {
          orderNo: that.data.order.orderNo,
        },
        business: {
          businessNo: UserService.getBusinessNo()
        },
        praiseDegree: that.data.starLevel,
        content: that.data.content,
        evaluatedBusiness: {
          businessNo: that.data.order.shop.businessNo
        }
      }
    }

    if (this.data.type == Type_Pet) {
      param.petAppraise = {
        pet:{
          petNo: that.data.order.petNo,
        },
        petOrder: {
            orderNo: that.data.order.orderNo,
        },
        business: {
          businessNo: UserService.getBusinessNo()
        },
        praiseDegree: that.data.starLevel,
        content: that.data.content,
        evaluatedBusiness: {
          businessNo: that.data.order.shop.businessNo
        }
      }
    }

    if (this.data.type == Type_Server) {
      param.serviceAppraise = {
        praiseDegree: that.data.starLevel,
        content: that.data.content,
        service: that.data.order.service,
        serviceOrder: that.data.order,
        business: {
          businessNo: UserService.getBusinessNo()
        },
        evaluatedBusiness: that.data.order.shop,
      }
    }

    if (Util.checkEmpty(this.data.content)) {
      switch(this.data.starLevel) {
        case 1: 
          this.data.content = "非常差";
          break;
        case 2:
          this.data.content = "差";
          break;
        case 3:
          this.data.content = "一般";
          break;
        case 4:
          this.data.content = "好";
          break;
        case 5:
          this.data.content = "非常好";
          break;
        default:
          this.data.content = "未知";
      }
    }

    let imageList = [];
    for (let index= 0; index<this.data.serviceImagePathList.length; index++) {
      let tempPath = this.data.serviceImagePathList[index];
      let tempImageObj = {
        imgAddress: tempPath.fileAddress
      }
      imageList.push(tempImageObj)
    }
    if (this.data.type == Type_Pet){
      param.petAppraiseImgList = imageList;
    } else if (this.data.type == Type_Item){
      param.itemAppraiseImgList = imageList;
    } else {
      param.serviceAppraiseImgList = imageList;
    }

    return param;
  },

  /**
   * 上传新增评价
   * @param addNewCallback
   */
  requestAddNewEvaluate: function (addNewCallback) {
    let that=this;
    UserService.isLogin(function isLoginCallback(){
      let param = that.getRequestParam();
      Utils.logInfo("获取上传的数据：" + JSON.stringify(param));
      if (!Util.checkEmpty(param)) {
        if (that.data.type == Type_Pet) {
          EvaluateService.addpetEvaluate(param,
            function addNewEvaluateCallback(result) {
              if (Util.checkIsFunction(addNewCallback)) {
                addNewCallback(result)
              }
            }
          )
        } else if (that.data.type == Type_Item){
          EvaluateService.addGoodsEvaluate(param,
            function addNewEvaluateCallback(result) {
              if (Util.checkIsFunction(addNewCallback)) {
                addNewCallback(result)
              }
            }
          )
        } else {
          EvaluateService.addNewServerEvaluate(param, function(result) {
            if (Util.checkIsFunction(addNewCallback)) {
              addNewCallback(result)
            }
          })
        }
      }
    })
  },

  /**
   * 上传列表图片
   * @param uploadCompleteCallback 列表上传完成
   */
  uploadComplete:function(res){
    let that=this;
    Utils.logInfo(JSON.stringify(res));
    let uploadReturnDataList = res.detail.uploadReturnDataList;
    that.setData({
      serviceImagePathList: uploadReturnDataList
    })
  }
})