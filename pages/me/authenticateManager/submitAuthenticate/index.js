// pages/me/authenticateManager/personalAuthenticate/index.js

const UploadFileService = require("../../../../services/uploadFileService.js");
const Util = require("../../../../utils/util.js");
const Utils = require("../../../../utils/util")
const UserService = require("../../../../services/userService.js");
const Url_Path=require("../../../../macros/urlPath.js");
const app=getApp();

const ShareManager = require("../../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {

    needGetUserInfo: true,

    explain_license: Url_Path.Url_explain_license,
    explain_identifier: Url_Path.Url_explain_identifier,
    explain_storefont: Url_Path.Url_explain_storefont,

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

    imagePathWithWXQRCode: null, // 微信二维码 图片
    serviceWXQRCodeImagePath: null, // 微信二维码服务器地址
    progressForWXQRCode: -1, // 微信二维码进度 小于0 大于等于100 隐藏进度条
    uploadTaskForWXQRCode: null, // 微信二维码上传任务

    imagePathWithLicense: null, // 营业执照 照片
    serviceLicenseImagePath: null, // 身份证服务器地址
    progressForLicense: -1, // 营业执照进度
    uploadTaskForLicense: null, // 营业执照上传任务

    imagePathWithStorefront: [], // 实体 照片
    serviceStorefrontImagePath: [], // 门店
    currentStoreImageUploadIndex: 0,
    progressForStoreFont: -1, // 门店进度
    uploadTaskForStoreFont: null, // 门店上传任务

    successTimeout: null,
    submitDataInfo:{} ,//获取提交的用户信息
    submitType:null   ,  //提交状态

    serviceInfor:[
      { name: '宠物店', value: '宠物店', checked: 'true' },
      { name: '宠物医院', value: '宠物医院'},
      { name: '宠物酒店', value: '宠物酒店' },
      { name: '宠物乐园', value: '宠物乐园' },
      { name: '繁殖户', value: '繁殖户' },
      { name: '猫咖', value: '猫咖' },
      { name: '宠物摄影', value: '宠物摄影' },
      { name: '宠物旅游', value: '宠物旅游' }
    ], //服务类型

    serviceInforStr:null,//服务类型String
    serviceContent:[
      { name: '洗澡美容', value: '洗澡美容', checked: 'true' },
      { name: '医疗保健', value: '医疗保健' },
      { name: '用品销售', value: '用品销售' },
      { name: '宠物寄养', value: '宠物寄养' },
      { name: '训练', value: '训练' },
      { name: '摄影', value: '摄影' },
      { name: '旅游', value: '旅游' },
      { name: '乐园', value: '乐园' },
      { name: '殡葬', value: '殡葬' },
    ] ,//服务内容
    serviceContentString:null,  //服务内容String
    xieyidx: false,   //认证协议
    setUpShop:false,  //我要开店
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Utils.logInfo("认证类型：=========>"+options.type);
    
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
    let tempServiceInfoList = [];
    let tempServiceContentList = [];
    for (let index = 0; index < this.data.serviceInfor.length; index++) {
      let tempServiceInfo = this.data.serviceInfor[index];
      if (tempServiceInfo.checked == 'true') {
        tempServiceInfoList.push(tempServiceInfo.value);
      }
    }
    for (let index = 0; index < this.data.serviceContent.length; index++) {
      let tempServiceContent = this.data.serviceContent[index];
      if (tempServiceContent.checked == 'true') {
        tempServiceContentList.push(tempServiceContent.value);
      }
    }
    this.setData({
      serviceInforStr: tempServiceInfoList.toString(),
      serviceContentString: tempServiceContentList.toString()
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
    if (this.data.needGetUserInfo) {
      this.userSubmitInfo();
    }
    // this.showAddress();
    if(this.data.region.length<=0){
      let region=[];
      region.push(app.globalData.addressInfomation.province)
      region.push(app.globalData.addressInfomation.city)
      region.push(app.globalData.addressInfomation.district)
      this.setData({
        region: region
      })
    }
    this.dataInfoErgodic();
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
    this.data.successTimeout = null;
    // 上传任务不为空
    if (this.data.uploadTaskForIdentifier != null) {
      // 取消图片上传进度监听
      this.data.uploadTaskForIdentifier.offProgressUpdate();
      // 中止图片上传任务
      this.data.uploadTaskForIdentifier.abort();
      // 图片上传任务置空
      this.data.uploadTaskForIdentifier = null;
    }
    // 上传任务不为空
    if (this.data.uploadTaskForLicense != null) {
      // 取消图片上传进度监听
      this.data.uploadTaskForLicense.offProgressUpdate();
      // 中止图片上传任务
      this.data.uploadTaskForLicense.abort();
      // 图片上传任务置空
      this.data.uploadTaskForLicense = null;
    }
    // 上传任务不为空
    if (this.data.uploadTaskForStoreFont != null) {
      // 取消图片上传进度监听
      this.data.uploadTaskForStoreFont.offProgressUpdate();
      // 中止图片上传任务
      this.data.uploadTaskForStoreFont.abort();
      // 图片上传任务置空
      this.data.uploadTaskForStoreFont = null;
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
    return ShareManager.getDefaultShareCard();
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
          // Utils.logInfo(that.data.imagePathWithIdentifier + "================")
          // 重新开始图片上传任务
          that.data.uploadTaskForIdentifier = UploadFileService.fileUpload(that.data.imagePathWithIdentifier,
            // 监听图片上传任务
            function uploadCallback(res) {
              Utils.logInfo("identifier upload callback: \n" + JSON.stringify(res));
              // 接收服务器存储地址
              // 进度归零
              
              that.setData({
                serviceIdentifierImagePath: res.root[0].fileAddress,
                progressForIdentifier: -1,
              })
            },
            // 监听图片上传进度
            function onProgressCallback(res) {
              Utils.logInfo("identifier on progress callback: \n" + JSON.stringify(res));
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
   * 个人微信二维码
   */
  selectWXQRCodeImage: function(e) {
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // 选中地址 是否 和已经选中图片地址相同
        // 相同，不做操作
        // 不同，上传
        if (that.data.imagePathWithWXQRCode != res.tempFilePaths[0]) {
          // 获取选中图片本地地址
          // 图片上传进度归零
          // 服务器图片地址清空
          that.setData({
            imagePathWithWXQRCode: res.tempFilePaths[0],
            progressForWXQRCode: 0,
            serviceWXQRCodeImagePath: null,
          })
          // 上传任务不为空
          if (that.data.uploadTaskForWXQRCode != null) {
            // 取消图片上传进度监听
            that.data.uploadTaskForWXQRCode.offProgressUpdate();
            // 中止图片上传任务
            that.data.uploadTaskForWXQRCode.abort();
            // 图片上传任务置空
            that.data.uploadTaskForWXQRCode = null;
          }
          // Utils.logInfo(that.data.imagePathWithWXQRCode + "================")
          // 重新开始图片上传任务
          that.data.uploadTaskForWXQRCode = UploadFileService.fileUpload(that.data.imagePathWithWXQRCode,
            // 监听图片上传任务
            function uploadCallback(res) {
              Utils.logInfo("identifier upload callback: \n" + JSON.stringify(res));
              // 接收服务器存储地址
              // 进度归零

              that.setData({
                serviceWXQRCodeImagePath: res.root[0].fileAddress,
                progressForWXQRCode: -1,
              })
            },
            // 监听图片上传进度
            function onProgressCallback(res) {
              Utils.logInfo("identifier on progress callback: \n" + JSON.stringify(res));
              // 更新图片上传进度
              that.setData({
                progressForWXQRCode: res.progress
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
              Utils.logInfo("license upload callback: \n" + JSON.stringify(res));
              // 接收服务器存储地址
              // 进度归零
              that.setData({
                serviceLicenseImagePath: res.root[0].fileAddress,
                progressForLicense: -1,
              })
            },
            // 监听图片上传进度
            function onProgressCallback(res) {
              Utils.logInfo("license on progress callback: \n" + JSON.stringify(res));
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
      count: 8,
      success: function (res) {
        // 覆盖上传
        // 本地图片列表更新
        that.setData({
          imagePathWithStorefront: res.tempFilePaths,
        })
        that.startUploadStoreImage();
      },
    })
  },

  /**
   * 开始上传
   */
  startUploadStoreImage: function () {
    let that = this;
    // 图片上传进度归零
    // 上传index归零
    // 服务器图片列表清空
    that.setData({
      progressForStoreFont: new Array(that.data.imagePathWithStorefront.length).map(()=>0),
      serviceStorefrontImagePath: [],
      currentStoreImageUploadIndex: 0,
    })
    // 上传任务不为空 停止上传任务
    if (that.data.uploadTaskForStoreFont != null) {
      // 取消图片上传进度监听
      that.data.uploadTaskForStoreFont.offProgressUpdate();
      // 中止图片上传任务
      that.data.uploadTaskForStoreFont.abort();
      // 图片上传任务置空
      that.data.uploadTaskForStoreFont = null;
    }
    that.uploadStoreImage();
  },

  /**
   * 上传门店实体图片
   */
  uploadStoreImage: function() {
    let that = this;
    // 重新开始图片上传任务
    that.data.uploadTaskForStoreFont = UploadFileService.fileUpload(that.data.imagePathWithStorefront[that.data.currentStoreImageUploadIndex],
      // 监听图片上传任务
      function uploadCallback(res) {
        Utils.logInfo("store font upload callback: \n" + JSON.stringify(res));
        // 接收服务器存储地址
        const keyStr = "serviceStorefrontImagePath[" + that.data.currentStoreImageUploadIndex + "]";
        that.setData({
          [keyStr]: res.root[0].fileAddress,
          currentStoreImageUploadIndex: that.data.currentStoreImageUploadIndex + 1
        })
        if (that.data.currentStoreImageUploadIndex < that.data.imagePathWithStorefront.length) {
          that.data.progressForStoreFont[that.data.currentStoreImageUploadIndex] = 0;
          that.setData({
            progressForStoreFont: that.data.progressForStoreFont,
          })
          that.uploadStoreImage();
        } else {
          that.data.progressForStoreFont[that.data.currentStoreImageUploadIndex] = -1;
          that.setData({
            progressForStoreFont: that.data.progressForStoreFont
          })
        }
      },
      // 监听图片上传进度
      function onProgressCallback(res) {
        Utils.logInfo("store font on progress callback: \n" + JSON.stringify(res));
        // 更新图片上传进度
        that.data.progressForStoreFont[that.data.currentStoreImageUploadIndex] = res.progress;
        that.setData({
          progressForStoreFont: that.data.progressForStoreFont
        })
      },
    )
  },

  /**
   * 点击提交
   */
  tapSubmit: function () {
    let that = this;
    UserService.isLogin(function isLoginCallback(){
      let submitData = that.getSubmitData();
      // var registerCookie = wx.getStorageSync('reginstercookie')
      // wx.setStorageSync('sbmitDataInfo', submitData)
      Utils.logInfo("提交的认证信息：===> \n" + JSON.stringify(submitData));
      if (submitData != null) {
        UserService.authenticate(submitData,
          function authResultCallback(result) {
            Utils.logInfo("认证 ： \n" + JSON.stringify(result));
            if (result.root != null && result.root == '操作成功') {
              wx.showToast({
                title: result.root,
                duration: 1500,
              })
              setTimeout(function () {
                wx.navigateBack({ changed: true });
              }, 1500)
            } else {
              wx.showToast({
                title: "提交失败",
                icon: 'none'
              })
            }
          }
        )
      }
    })
  },

  /**
   * 获取提交数据
   * @return submitData
   */
  getSubmitData: function() {
    let submitData = {};
    submitData.businessAuthType = parseInt(this.data.type) + 1;
    submitData.business={
      businessNo:UserService.getBusinessNo()
    }

    if (Util.checkEmpty(this.data.name)) {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none'
      })
      return null;
    }
    submitData.realName = this.data.name; 

    if (Util.checkEmpty(this.data.identifier)) {
      wx.showToast({
        title: '身份证不能为空',
        icon: 'none'
      })
      return null; 
    }
    
    submitData.idCard = this.data.identifier;

    if (Util.checkEmpty(this.data.region)) {
      wx.showToast({
        title: '请选择地址',
        icon: 'none'
      })
      return null;
    }

    /**
     * 区
     */
    submitData.area = this.data.region[2];

    /**
     * 省
     */
    submitData.province = this.data.region[0]

    /**
     * 市
     */
    submitData.city = this.data.region[1];


    if (Util.checkEmpty(this.data.serviceIdentifierImagePath)) {
      wx.showToast({
        title: '请上传身份证照片',
        icon: 'none'
      })
      return null;
    }
    submitData.legalImg = this.data.serviceIdentifierImagePath;

    if (!Util.checkEmpty(this.data.serviceWXQRCodeImagePath)) {
      submitData.weChatImg = this.data.serviceWXQRCodeImagePath;
    } 

    if(this.data.type!=0){
      if (Util.checkEmpty(this.data.serviceStorefrontImagePath)) {
        wx.showToast({
          title: '请上传门店照片',
          icon: 'none'
        })
        return null;
      }
      submitData.shopImg = this.data.serviceStorefrontImagePath
    }

    if (this.data.type == 2) {
      if (Util.checkEmpty(this.data.license)) {
        wx.showToast({
          title: '营业执照编号不能为空',
          icon: 'none'
        })
        return null;
      }
      submitData.licenseNo = this.data.license;

      if (Util.checkEmpty(this.data.serviceLicenseImagePath)) {
        wx.showToast({
          title: '请上传营业执照照片',
          icon: 'none'
        })
        return null;
      }
      submitData.licenseImg = this.data.serviceLicenseImagePath;

      if (Util.checkEmpty(this.data.storeName)) {
        wx.showToast({
          title: '店铺名称不能为空',
          icon: 'none'
        })
        return null;
      }
      submitData.shopName = this.data.storeName;

      if (Util.checkEmpty(this.data.region)) {
        wx.showToast({
          title: '请选择区域',
          icon: 'none'
        })
        return null;
      }
      // submitData.region = this.data.region[0] + "-" + this.data.region[1] + "-" + this.data.region[2];

      if (Util.checkEmpty(this.data.detailAddress)) {
        wx.showToast({
          title: '详细地址不能为空',
          icon: 'none'
        })
        return null;
      }
      submitData.detailAddress = this.data.detailAddress;


      if (this.data.serviceContentString == null) {
        wx.showToast({
          title: '请勾选基础资料！',
          icon: 'none'
        })
        return null;
      }

      submitData.baseData = this.data.serviceContentString; //基础资料

      if (this.data.serviceInforStr == null) {
        wx.showToast({
          title: '请勾选服务内容！',
          icon: 'none'
        })
        return null;
      }

      submitData.services = this.data.serviceInforStr; //服务内容

    }

    if (this.data.xieyidx==false){
      wx.showToast({
        title: '请勾选是否同意该协议！',
        icon: 'none'  
      })
      return null;
    }


    return submitData;
  },

  /**
   * 获得用户审核信息
   */
  userSubmitInfo:function(){
    let that=this;
    UserService.isLogin(function isLoginCallback(){
      UserService.requestAuthByAuthNo(UserService.getBusinessNo(), function getBusinessInfoCallback(dataSource) {
        that.data.needGetUserInfo = false;
        Utils.logInfo("用户提交的信息：" + JSON.stringify(dataSource));
        if (dataSource != null) {
          let regions = [];
          regions.push(dataSource.province);
          regions.push(dataSource.city);
          regions.push(dataSource.area);
          if (dataSource.licenseImg != null) {
            that.setData({
              imagePathWithLicense: dataSource.licenseImg,  //营业执照图片
              serviceLicenseImagePath: dataSource.licenseImg
            })
          }

          if (dataSource.legalImg != null) {
            that.setData({
              imagePathWithIdentifier: dataSource.legalImg, //手持身份证照片
              serviceIdentifierImagePath: dataSource.legalImg
            })
          }

          if (dataSource.weChatImg != null) {
            that.setData({
              imagePathWithWXQRCode: dataSource.weChatImg, // 微信二维码图片
              serviceWXQRCodeImagePath: dataSource.weChatImg
            })
          }

          if (dataSource.shopImg != null) {
            that.setData({
              imagePathWithStorefront: dataSource.shopImg,   //门店图片
              serviceStorefrontImagePath: dataSource.shopImg
            })
          }
          // serviceInforStr: ,//基础资料
          //   serviceContentString: JSON.parse(dataSource.services),  //服务内容

          if (dataSource.baseData != null) {
            that.dataInfoErgodic((dataSource.baseData).split(","));
          }

          if (dataSource.services != null) {
            that.serverInfoErgodic((dataSource.services).split(","));
          }

          if (dataSource.licenseNo != null) {
            that.setData({
              license: dataSource.licenseNo, // 营业执照编号
            })
          }

          if (dataSource.detailAddress != null) {
            that.setData({
              detailAddress: dataSource.detailAddress, // 店铺详细地址
            })
          }

          if (regions == !null) {
            that.setData({
              region: regions, // 店铺所在区域
            })
          }

          that.setData({
            submitDataInfo: dataSource,
            name: dataSource.realName, // 真实名称
            identifier: dataSource.idCard, // 身份证号
            storeName: dataSource.shopName, // 店铺名称        
          })
        }
      })
    })
  },


  /**
   * 服务基础资料
   * 
   */
  checkboxChange: function (e) {
    let es = e.detail.value;
    this.setData({
      serviceContentString: es.toString()
    })
  },

  /**
   * 服务内容
   */
  checkboxChangeContent: function (e) {
    let es = e.detail.value;
    this.setData({
      serviceInforStr: es.toString()
    })
    
  },


  /**
   * 协议
   */
  radioClick: function (event) {
    var xieyidx = this.data.xieyidx;
    this.setData({ xieyidx: !xieyidx });
  },
  
  /**
   * 我要开店
   */
  // setUpShopTap:function(res){
  //   var setUpShop = this.data.setUpShop;
  //   this.setData({ setUpShop: !setUpShop})
  //   if (this.data.setUpShop==true){
  //       wx.showModal({
  //         showCancel:false,
  //         title:"提示",
  //         content:"开店需要缴纳保证金哟！",
  //         confirmColor:"#6487A5"
  //       })
  //   }
  // }

  /**
   * 循环遍历基础资料完善
   * erviceInforStr: JSON.parse(baseData),//基础资料
     serviceContentString: JSON.parse(services),  //服务内容
   */
  dataInfoErgodic: function (erviceInforStr){
    let that=this;
    let serviceInfor = that.data.serviceInfor;
    if (erviceInforStr != null && erviceInforStr.length > 0) {
      for (let i = 0; i < serviceInfor.length;++i){
        for (let j = 0; j < erviceInforStr.length; ++j){
          if (serviceInfor[i].value == erviceInforStr[j]){
            var showOneLine = "serviceInfor[" + i + "].checked";
            that.setData({
              [showOneLine]: "true"
            })
          }
        }
      }
    }
  },

  /**
   * 虚幻遍历服务内容
   */
  serverInfoErgodic:function(serverInfoStr){
    let that = this;
    let serviceContent = that.data.serviceContent;
    if (serverInfoStr != null && serverInfoStr.length>0){
      for (let i = 0; i < serviceContent.length; ++i) {
        for (let j = 0; j < serverInfoStr.length; ++j) {
          if (serviceContent[i].value == serverInfoStr[j]) {
            var showOneLine = "serviceContent[" + i + "].checked";
            that.setData({
              [showOneLine]: "true"
            })
          }
        }
      }
    }
   
  }
})