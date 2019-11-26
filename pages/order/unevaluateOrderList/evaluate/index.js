// pages/order/unevaluateOrderList/evaluate/index.js

const app = getApp();
const Util = require("../../../../utils/util.js");
const PetService = require("../../../../services/petService.js");
const MallService = require("../../../../services/mallService.js");
const UserService = require("../../../../services/userService.js");
const UploadFileService = require("../../../../services/uploadFileService.js");

const Max_UploadImage_Length = 6; // 最大上传数量
const Default_Star_Level = 5; // 默认星级

const Type_Item = 0;
const Type_Pet = 1;

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
    type: Type_Item, // 0 item 1 pet
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentRole: UserService.getCurrentRole(),
      orderNo: options.orderno
    })
    if (app.globalData.evaluateOrder != null) {
      this.setData({
        order: app.globalData.evaluateOrder
      })
      console.log(app.globalData.evaluateOrder);
      if (this.data.order.item != null) {
        this.setData({
          type: Type_Item
        })
      }
      if (this.data.order.pet != null) {
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
  tapAddNewUploadImage: function(){
    let that = this;
    wx.chooseImage({
      count: Max_UploadImage_Length,
      success: function (res) {
        that.setData({
          uploadImageList: res.tempFilePaths,
          serviceImagePathList: null,
        })
        that.uploadListImage();
      },
    })
  },

  /**
   * 点击提交
   */
  tapSubmit: function () {
    let that = this;
    wx.showLoading({
      title: '提交中...',
    })
    this.requestAddNewEvaluate(
      function addCallback(result) {
        if (result > 0) {
          wx.showToast({
            title: '提交成功',
            duration: 1500,
          })
          that.data.successTimeIntervier = setTimeout(
            function success(){
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
      }
    )
  },

  /**
   * 获取上传数据
   * @return requestParam
   */
  getRequestParam: function () {
    let param = {
      orderNo: this.data.order.orderNo,
      customerNo: UserService.getCustomerNo(),
    };

    if (this.data.type == Type_Item) {
      if (Util.checkEmpty(this.data.order.item.itemNo)) {
        wx.showToast({
          title: '未找到商品编号',
          icon: 'none'
        })
        return null;
      }
      param.itemNo = this.data.order.item.itemNo;
    }

    if (this.data.type == Type_Pet) {
      if (Util.checkEmpty(this.data.order.pet.petNo)) {
        wx.showToast({
          title: '未找到宠物编号',
          icon: 'none'
        })
        return null;
      }
      param.petNo = this.data.order.pet.petNo;
    }
    
    param.degree = this.data.starLevel;
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
    param.content = this.data.content;
    
    if (!Util.checkEmpty(this.data.uploadImageList)) {
      if (this.data.uploadImageList.length > this.data.serviceImagePathList.length) {
        wx.showToast({
          title: '还有图片正在上传',
          icon: 'none'
        })
        return null;
      } else {
        param.imageList = this.data.serviceImagePathList;
      }
    }
    return param;
  },

  /**
   * 上传新增评价
   * @param addNewCallback
   */
  requestAddNewEvaluate: function (addNewCallback) {
    let param = this.getRequestParam();
    if (!Util.checkEmpty(param)) {
      if (this.data.type == Type_Item) {
        MallService.addNewItemEvaluate(param,
          function addNewEvaluateCallback(result) {
            if (Util.checkIsFunction(addNewCallback)) {
              addNewCallback(result.root)
            }
          }
        )
      } else if (this.data.type == Type_Pet) {
        PetService.addNewPetEvaluate(param,
          function addNewEvaluateCallback(result) {
            if (Util.checkIsFunction(addNewCallback)) {
              addNewCallback(result.root)
            }
          }
        )
      }
    }
  },

  /**
   * 上传列表图片
   * @param uploadCompleteCallback 列表上传完成
   */
  uploadListImage: function (uploadCompleteCallback) {
    if (this.data.serviceImagePathList == null) {
      this.data.serviceImagePathList = [];
    }
    let that = this;
    // 上传任务不为空
    if (that.data.uploadImageTask != null) {
      // 取消图片上传进度监听
      that.data.uploadImageTask.offProgressUpdate();
      // 中止图片上传任务
      that.data.uploadImageTask.abort();
      // 图片上传任务置空
      that.data.uploadImageTask = null;
    }
    that.data.uploadImageTask = UploadFileService.fileUpload(that.data.uploadImageList[that.data.currentUploadIndex],
      // 监听图片上传任务
      function uploadCallback(res) {
        console.log("uploadimage upload callback: \n" + JSON.stringify(res));
        that.data.serviceImagePathList.push({
          appraiseImg: res.root[0].fileAddress
        });
        that.data.currentUploadIndex++;
        that.setData({
          serviceImagePathList: that.data.serviceImagePathList
        })
        if (that.data.currentUploadIndex >= that.data.uploadImageList.length) {
          that.setData({
            currentUploadIndex: 0,
            uploadImageProgress: -1
          })
          // 取消图片上传进度监听
          that.data.uploadImageTask.offProgressUpdate();
          // 中止图片上传任务
          that.data.uploadImageTask.abort();
          // 图片上传任务置空
          that.data.uploadImageTask = null;
          if (Util.checkIsFunction(uploadCompleteCallback)) {
            uploadCompleteCallback();
          }
        } else {
          that.setData({
            currentUploadIndex: that.data.currentUploadIndex,
            uploadImageProgress: 0
          })
          that.uploadListImage()
        }
      },
      // 监听图片上传进度
      function onProgressCallback(res) {
        console.log("uploadimage on progress callback: \n" + JSON.stringify(res));
        that.setData({
          uploadImageProgress: res.progress
        })
      },
    )
  },
})