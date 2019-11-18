// pages/me/authenticateManager/personalAuthenticate/index.js

const UploadFileService = require("../../../../services/uploadFileService.js");
const Util = require("../../../../utils/util.js");
const UserService = require("../../../../services/userService.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0, // 认证类型 0 个人 1 商家 2 平台
    title: "个人认证", // navi 标题

    name: null, // 真实名称
    identifier: null, // 身份证号

    license: null, // 营业执照编号

    storeName: null, // 店铺名称
    region: [], // 店铺所在区域
    detailAddress: null, // 店铺详细地址

    imagePathWithIdentifier: null, // 手持身份证 照片
    serviceIdentifierImagePath: null, // 身份证服务器地址
    progressForIdentifier: -1, // 身份证照片进度 小于0 大于等于100 隐藏进度条
    uploadTaskForIdentifier: null, // 身份证上传任务

    imagePathWithLicense: null, // 营业执照 照片
    serviceLicenseImagePath: null, // 身份证服务器地址
    progressForLicense: -1, // 营业执照进度
    uploadTaskForLicense: null, // 营业执照上传任务

    imagePathWithStorefront: null, // 实体 照片
    serviceStorefrontImagePath: null, // 身份证服务器地址
    progressForStoreFont: -1, // 门店进度
    uploadTaskForStoreFont: null, // 门店上传任务

    successTimeout: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tempType = options.type;
    let tempTitle = null;
    if (tempType == 0) {
      tempTitle = "个人认证";
    } else if (tempType == 1) {
      tempTitle = "商家认证";
    } else {
      tempTitle = "平台认证";
    }
    this.setData({
      type: tempType,
      title: tempTitle
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
    clearTimeout(this.data.successTimeout);
    successTimeout = null;
    // 上传任务不为空
    if (that.data.uploadTaskForIdentifier != null) {
      // 取消图片上传进度监听
      that.data.uploadTaskForIdentifier.offProgressUpdate();
      // 中止图片上传任务
      that.data.uploadTaskForIdentifier.abort();
      // 图片上传任务置空
      that.data.uploadTaskForIdentifier = null;
    }
    // 上传任务不为空
    if (that.data.uploadTaskForLicense != null) {
      // 取消图片上传进度监听
      that.data.uploadTaskForLicense.offProgressUpdate();
      // 中止图片上传任务
      that.data.uploadTaskForLicense.abort();
      // 图片上传任务置空
      that.data.uploadTaskForLicense = null;
    }
    // 上传任务不为空
    if (that.data.uploadTaskForStoreFont != null) {
      // 取消图片上传进度监听
      that.data.uploadTaskForStoreFont.offProgressUpdate();
      // 中止图片上传任务
      that.data.uploadTaskForStoreFont.abort();
      // 图片上传任务置空
      that.data.uploadTaskForStoreFont = null;
    }
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
   * 输入名称
   */
  inputName: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  /**
   * 输入身份证号
   */
  inputIdentifier: function(e) {
    this.setData({
      identifier: e.detail.value
    })
  },

  /**
   * 选择身份证照片
   */
  selectIdentifierImage: function () {
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        // 选中地址 是否 和已经选中图片地址相同
        // 相同，不做操作
        // 不同，上传
        if (that.data.imagePathWithIdentifier != res.tempFilePaths[0]) {
          // 获取选中图片本地地址
          // 图片上传进度归零
          // 服务器图片地址清空
          that.setData({
            imagePathWithIdentifier: res.tempFilePaths[0],
            progressForIdentifier: 0,
            serviceIdentifierImagePath: null,
          })
          // 上传任务不为空
          if (that.data.uploadTaskForIdentifier != null) {
            // 取消图片上传进度监听
            that.data.uploadTaskForIdentifier.offProgressUpdate();
            // 中止图片上传任务
            that.data.uploadTaskForIdentifier.abort();
            // 图片上传任务置空
            that.data.uploadTaskForIdentifier = null;
          }
          // 重新开始图片上传任务
          that.data.uploadTaskForIdentifier = UploadFileService.fileUpload(that.data.imagePathWithIdentifier,
            // 监听图片上传任务
            function uploadCallback(res) {
              console.log("identifier upload callback: \n" + JSON.stringify(res));
              // 接收服务器存储地址
              // 进度归零
              that.setData({
                serviceIdentifierImagePath: res.root[0].fileAddress,
                progressForIdentifier: -1,
              })
            },
            // 监听图片上传进度
            function onProgressCallback(res) {
              console.log("identifier on progress callback: \n" + JSON.stringify(res));
              // 更新图片上传进度
              that.setData({
                progressForIdentifier: res.progress
              })
            },
          )
        }
      },
    })
  },

  /**
   * 输入营业执照编号
   */
  inputLicense: function (e) {
    this.setData({
      license: e.detail.value
    })
  },

  /**
   * 选择营业执照 照片
   */
  selectLicenseImage: function () {
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // 选中地址 是否 和已经选中图片地址相同
        // 相同，不做操作
        // 不同，上传
        if (that.data.imagePathWithLicense != res.tempFilePaths[0]) {
          // 获取选中图片本地地址
          // 图片上传进度归零
          // 服务器图片地址清空
          that.setData({
            imagePathWithLicense: res.tempFilePaths[0],
            progressForLicense: 0,
            serviceLicenseImagePath: null,
          })
          // 上传任务不为空
          if (that.data.uploadTaskForLicense != null) {
            // 取消图片上传进度监听
            that.data.uploadTaskForLicense.offProgressUpdate();
            // 中止图片上传任务
            that.data.uploadTaskForLicense.abort();
            // 图片上传任务置空
            that.data.uploadTaskForLicense = null;
          }
          // 重新开始图片上传任务
          that.data.uploadTaskForLicense = UploadFileService.fileUpload(that.data.imagePathWithLicense,
            // 监听图片上传任务
            function uploadCallback(res) {
              console.log("license upload callback: \n" + JSON.stringify(res));
              // 接收服务器存储地址
              // 进度归零
              that.setData({
                serviceLicenseImagePath: res.root[0].fileAddress,
                progressForLicense: -1,
              })
            },
            // 监听图片上传进度
            function onProgressCallback(res) {
              console.log("license on progress callback: \n" + JSON.stringify(res));
              // 更新图片上传进度
              that.setData({
                progressForLicense: res.progress
              })
            },
          )
        }
      },
    })
  },

  /**
   * 输入店铺名称
   */
  inputStoreName: function (e) {
    this.setData({
      storeName: e.detail.value
    })
  },

  /**
   * 选择店铺所在区域
   */
  selectRegion: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  /**
   * 输入店铺详细地址
   */
  inputDetailAddress: function (e) {
    this.setData({
      detailAddress: e.detail.value
    })
  },

  /**
   * 选择 实体 照片
   */
  selectStorefrontImage: function () {
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // 选中地址 是否 和已经选中图片地址相同
        // 相同，不做操作
        // 不同，上传
        if (that.data.imagePathWithStorefront != res.tempFilePaths[0]) {
          // 获取选中图片本地地址
          // 图片上传进度归零
          // 服务器图片地址清空
          that.setData({
            imagePathWithStorefront: res.tempFilePaths[0],
            progressForStoreFont: 0,
            serviceStorefrontImagePath: null,
          })
          // 上传任务不为空
          if (that.data.uploadTaskForStoreFont != null) {
            // 取消图片上传进度监听
            that.data.uploadTaskForStoreFont.offProgressUpdate();
            // 中止图片上传任务
            that.data.uploadTaskForStoreFont.abort();
            // 图片上传任务置空
            that.data.uploadTaskForStoreFont = null;
          }
          // 重新开始图片上传任务
          that.data.uploadTaskForStoreFont = UploadFileService.fileUpload(that.data.imagePathWithStorefront,
            // 监听图片上传任务
            function uploadCallback(res) {
              console.log("store font upload callback: \n" + JSON.stringify(res));
              // 接收服务器存储地址
              // 进度归零
              that.setData({
                serviceStorefrontImagePath: res.root[0].fileAddress,
                progressForStoreFont: -1,
              })
            },
            // 监听图片上传进度
            function onProgressCallback(res) {
              console.log("store font on progress callback: \n" + JSON.stringify(res));
              // 更新图片上传进度
              that.setData({
                progressForStoreFont: res.progress
              })
            },
          )
        }
      },
    })
  },

  /**
   * 点击提交
   */
  tapSubmit: function () {
    let that = this;
    let submitData = this.getSubmitData();
    if (submitData != null) {
      UserService.authenticate(submitData,
        function authResultCallback(result) {
          console.log("认证 ： \n" + JSON.stringify(result));
          if (result.root >= 1) {
            wx.showToast({
              title: '认证成功',
              duration: 1500,
            })
            that.data.successTimeout = setTimeout(
              function success(res) {
                wx.navigateBack({
                  
                })
              },
              1600
            )
          } else {
            wx.showToast({
              title: '插入认证失败',
              icon: 'none'
            })
          }
        }
      )
    }
  },

  /**
   * 获取提交数据
   * @return submitData
   */
  getSubmitData: function() {
    let submitData = {};
    submitData.type = parseInt(this.data.type) + 1;
    submitData.business = {
      businessNo: UserService.getBusinessNo()
    }

    if (Util.checkEmpty(this.data.name)) {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none'
      })
      return null;
    }
    submitData.name = this.data.name;

    if (Util.checkEmpty(this.data.identifier)) {
      wx.showToast({
        title: '身份证不能为空',
        icon: 'none'
      })
      return null;
    }
    submitData.identifier = this.data.identifier;

    if (Util.checkEmpty(this.data.serviceIdentifierImagePath)) {
      wx.showToast({
        title: '请上传身份证照片',
        icon: 'none'
      })
      return null;
    }
    submitData.identifierImagePath = this.data.serviceIdentifierImagePath;

    if (this.data.type != 0) {
      if (Util.checkEmpty(this.data.license)) {
        wx.showToast({
          title: '营业执照不能为空',
          icon: 'none'
        })
        return null;
      }
      submitData.license = this.data.license;

      if (Util.checkEmpty(this.data.serviceLicenseImagePath)) {
        wx.showToast({
          title: '请上传营业执照照片',
          icon: 'none'
        })
        return null;
      }
      submitData.licenseImagePath = this.data.serviceLicenseImagePath;
    }

    if (this.data.type == 2) {
      if (Util.checkEmpty(this.data.storeName)) {
        wx.showToast({
          title: '店铺名称不能为空',
          icon: 'none'
        })
        return null;
      }
      submitData.storeName = this.data.storeName;

      if (Util.checkEmpty(this.data.region)) {
        wx.showToast({
          title: '请选择区域',
          icon: 'none'
        })
        return null;
      }
      submitData.region = this.data.region[0] + "-" + this.data.region[1] + "-" + this.data.region[2];

      if (Util.checkEmpty(this.data.detailAddress)) {
        wx.showToast({
          title: '详细地址不能为空',
          icon: 'none'
        })
        return null;
      }
      submitData.detailAddress = this.data.detailAddress;

      if (Util.checkEmpty(this.data.serviceStorefrontImagePath)) {
        wx.showToast({
          title: '请上传门店照片',
          icon: 'none'
        })
        return null;
      }
      submitData.storeFontImagePath = this.data.serviceStorefrontImagePath
    }

    return submitData;
  }
})