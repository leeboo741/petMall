const app = getApp();
const Utils = require("../../../../utils/util.js");
const UploadFileService = require("../../../../services/uploadFileService.js");
const UserService = require("../../../../services/userService.js");
const ServerManager = require("../../../../services/serverManager.js");
const ShareManager = require("../../../../services/shareService");

Page({
  data: {
    type: 'add',
    petSortList:[], // 宠物分类
    petGenreList: [], // 宠物品种
    petObj: {
      petImg: null, // 宠物图片
      business: null, // 所属人
      coatColor: null, // 毛色
      petBirthday: null, // 生日
      petGenre: null, // 宠物品种
      petName: null, // 宠物名称
      petNo: null, // 宠物编号
      petSex: 0, // 宠物性别  0 公
      petSort: null, // 宠物分类
      petSterilization: 0, // 是否绝育 0 未绝育
      petVaccine: 0, // 是否打过疫苗 0 未打疫苗
      shoulderHeight: 0, // 肩高 0 小于35cm
      petWeight: null,
    },
  },
  onLoad: function (t) {
    if(app.globalData.editMyPet) {
      this.setData({
        petObj: app.globalData.editMyPet,
        type: 'edit'
      })
    } else {
      this.setData({
        type: 'add'
      })
      let that = this;
      UserService.isLogin(function isLoginCallback(){
        that.data.petObj.business = {
          businessNo: UserService.getBusinessNo()
        }
      })
    }
  },

  onShow: function() {
    if (app.globalData.choosePetSort) {
      this.data.petObj.petSort = app.globalData.choosePetSort;
      app.globalData.choosePetSort = null;
    }
    if (app.globalData.choosePetGenre) {
      this.data.petObj.petGenre = app.globalData.choosePetGenre;
      app.globalData.choosePetGenre = null;
    }
    this.setData({
      petObj: this.data.petObj
    })

  },
  
  /**
   * 宠物头像
   */
  uppetimg: function () {
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        let filePath = res.tempFilePaths[0];
        UploadFileService.fileUpload(filePath,
          // 监听图片上传任务
          function uploadCallback(uploadResult) {
            Utils.logInfo("upMyPet petImg upload callback: \n" + JSON.stringify(uploadResult));
            that.data.petObj.petImg = uploadResult.root[0].fileAddress;
            that.setData({
              petObj: that.data.petObj
            })
          },
        )
      },
    })
  },

  /**
   * 宠物品种
   */
  gopetlist: function () {
    wx.navigateTo({
      url: '/stationsubcontract/pages/mypet/upmypet/choosePetGenre',
    })
  },

  /**
   * 性别
   */
  chosesex: function (t) {
    if (Utils.checkEmpty(this.data.petObj.petSex) || this.data.petObj.petSex == 0) {
      this.data.petObj.petSex = 1;
    } else {
      this.data.petObj.petSex = 0;
    }
    this.setData({
      petObj: this.data.petObj
    })
  },

  /**
   * 肩高
   */
  choseheight: function (t) {
    if (Utils.checkEmpty(this.data.petObj.shoulderHeight) || this.data.petObj.shoulderHeight == 0) {
      this.data.petObj.shoulderHeight = 1;
    } else {
      this.data.petObj.shoulderHeight = 0;
    }
    this.setData({
      petObj: this.data.petObj
    })
  },

  /**
   * 备注（疫苗）
   */
  ym: function (t) {

    if (Utils.checkEmpty(this.data.petObj.petVaccine) || this.data.petObj.petVaccine == 0) {
      this.data.petObj.petVaccine = 1;
    } else {
      this.data.petObj.petVaccine = 0;
    }
    this.setData({
      petObj: this.data.petObj
    })
    
  },

  /**
   * 备注（已绝育）
   */
  spayed: function (res) {
    if (Utils.checkEmpty(this.data.petObj.petSterilization) || this.data.petObj.petSterilization == 0) {
      this.data.petObj.petSterilization = 1;
    } else{
      this.data.petObj.petSterilization = 0;
    }
    this.setData({
      petObj: this.data.petObj
    })
  },

  /**
   * 毛色
   */
  getcolor: function (res) {
    this.data.petObj.coatColor = res.detail.value;
    this.setData({
      petObj: this.data.petObj
    })
  },

  /**
   * 宝宝的重量
   */
  getweight: function (res) {
    if (parseFloat(res.detail.value)) {
      this.data.petObj.petWeight = res.detail.value
    } else {
      this.data.petObj.petWeight = null;
    }
    this.setData({
      petObj: this.data.petObj
    })
  },

  /**
   * 宠物的姓名
   */
  getnickName: function (res) {
    this.data.petObj.petName = res.detail.value;
    this.setData({
      petObj: this.data.petObj
    })
  },

  /**
   * 选择时间
   */
  bindDateChange: function (res) {
    Utils.logInfo(JSON.stringify(res));
    let selectTime = res.detail.value;
    this.data.petObj.petBirthday = selectTime;
    this.setData({
      petObj: this.data.petObj
    })
  },
  savepet: function () {
    let petObj = this.data.petObj;
    if (!petObj) {
      this.showError("错误!对象空");
      return;
    }
    if (Utils.checkEmpty(petObj.petName)) {
      this.showError("宠物名称不能为空");
      return;
    }
    if (!petObj.petGenre) {
      this.showError("宠物品种不能为空");
      return;
    }
    if (Utils.checkEmpty(petObj.petWeight)) {
      this.showError("宠物重量不能为空");
      return;
    }
    if (this.data.type == 'add') {
      ServerManager.addNewPet(petObj,function addNewPetCallback(res){
        Utils.logInfo(res);
        wx.navigateBack({
          
        })
      })
    } else {
      ServerManager.editPet(petObj, function (res) {
        Utils.logInfo(res);
        wx.navigateBack({
          
        })
      })
    }
  },

  showError: function(msg) {
    wx.showToast({
      title: msg,
      icon: 'none'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },
});