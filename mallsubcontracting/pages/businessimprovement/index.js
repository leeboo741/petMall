// mallsubcontracting/pages/businessimprovement/index.js
const UploadFileService = require("../../../services/uploadFileService.js");
const Util = require("../../../utils/util.js");
const UserService = require("../../../services/userService.js");
const ShareManager = require("../../../services/shareService");
const Utils = require("../../../utils/util")
const PagePath = require("../../../macros/pagePath");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessName: "", //商家姓名
    startTime: '', //开始营业时间
    endTime: "", //结束时间
    region: "", //地区
    detailAddress: '', //详细地址
    businessInfo: null, //用户信息

    imagePathWithStorefront: null, // 头像
    serviceStorefrontImagePath: null, // 身份证服务器地址
    progressForStoreFont: -1, // 门店进度
    uploadTaskForStoreFont: null, // 门店上传任务

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let that = this;
    if (options.type == 2) {
      UserService.isLogin(function isLoginCallback() {
        UserService.requestBusinessInfo(UserService.getBusinessNo(), function(dataSource) {
          Utils.logInfo("用户信息：===> \n" + JSON.stringify(dataSource))
          let regio = [];
          regio.push(dataSource.province);
          regio.push(dataSource.city);
          regio.push(dataSource.area);
          that.setData({
            businessInfo: dataSource,
            businessName: dataSource.businessName,
            startTime: dataSource.startHours,
            endTime: dataSource.endHours,
            region: regio,
            detailAddress: dataSource.detailAddress,
            imagePathWithStorefront: dataSource.headImg
          })
        })
      })
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
    let that = this;


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
   * 商家姓名
   */
  inputName: function(e) {
    this.setData({
      businessName: e.detail.value
    })
  },

  /**
   * 开始营业时间
   */
  selectStartTime: function(e) {
    this.setData({
      startTime: e.detail.value
    })
  },

  /**
   * 结束营业时间
   */
  selectEndTime: function(e) {
    this.setData({
      endTime: e.detail.value
    })
  },


  /**
   * 所在地区
   */
  selectRegion: function(e) {
    Utils.logInfo(JSON.stringify(e))

    this.setData({
      region: e.detail.value
    })
  },

  /**
   * 详细地址
   */
  inputDetailAddress: function(e) {
    this.setData({
      detailAddress: e.detail.value
    })
  },

  /**
   * 上传头像
   */
  selectStorefrontImage: function(e) {
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
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
              Utils.logInfo("store font upload callback: \n" + JSON.stringify(res));
              // 接收服务器存储地址
              // 进度归零
              that.setData({
                serviceStorefrontImagePath: res.root[0].fileAddress,
                progressForStoreFont: -1,
              })
            },
            // 监听图片上传进度
            function onProgressCallback(res) {
              Utils.logInfo("store font on progress callback: \n" + JSON.stringify(res));
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
   * 获得数据对象
   */
  getDataObject: function() {
    let that = this;
    let dataInfo = {}

    dataInfo.businessNo = UserService.getBusinessNo();

    if (Util.checkEmpty(this.data.businessName)) {
      that.toast("请输入商家名称！")
      return;
    }
    dataInfo.businessName = this.data.businessName;

    if (Util.checkEmpty(this.data.startTime)) {
      that.toast("请输入开始营业时间！");
      return;
    }
    dataInfo.startHours = this.data.startTime;

    if (Util.checkEmpty(this.data.endTime)) {
      that.toast("请输入结束营业时间！");
      return;
    }
    dataInfo.endHours = this.data.endTime;


    if (Util.checkEmpty(this.data.region)) {
      that.toast("请输入所在地区！");
      return;
    }
    dataInfo.province = this.data.region[0];
    dataInfo.city = this.data.region[1];
    dataInfo.area = this.data.region[2];


    if (Util.checkEmpty(this.data.detailAddress)) {
      that.toast("请输入详细地址！");
      return;
    }
    dataInfo.detailAddress = this.data.detailAddress;


    if (Util.checkEmpty(this.data.imagePathWithStorefront)) {
      that.toast("请上传头像！");
      return;
    }
    dataInfo.headImg = this.data.serviceStorefrontImagePath;


    return dataInfo;
  },

  /**
   * 提示信息
   */
  toast: function(res) {
    wx.showToast({
      title: res,
      icon: "none"
    })
  },

  /**
   * 提交信息
   */
  tapSubmit: function() {
    Utils.logInfo("提交信息===> \n" + JSON.stringify(this.getDataObject()));
    let that = this;
    UserService.isLogin(function isLoginCallback() {
      UserService.updateBusinessInfo(that.getDataObject(), function(data) {
        Utils.logInfo(JSON.stringify(data))
        UserService.requestBusinessInfo(UserService.getBusinessNo(), function (dataSource) {
          if (dataSource.authType < 1) {
            wx.showModal({
              title:'尚未认证!',
              content: '发布商品/活体/服务需要认证!',
              confirmText:'前往认证',
              cancelText: '暂不认证',
              success(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: PagePath.Page_Me_AuthenticateManager_Submit,
                  })
                } else if (res.cancel) {
                  wx.navigateBack({
                  })
                }
              }
            })
          } else {
            wx.showToast({
              title: '修改成功！',
            })
            setTimeout(
              function timeOut() {
                wx.navigateBack({
    
                })
              },
              1550
            )
          }
        })
        
      })
    })
  }
})