// pages/me/releaseManager/releaseNew/index.js

const app = getApp();
const Util = require("../../../../utils/util.js");
const PagePath = require("../../../../macros/pagePath.js");
const PetService = require("../../../../services/petService.js");
const UserService = require("../../../../services/userService.js");
const UploadFileService = require("../../../../services/uploadFileService.js");

const Max_UploadImage_Length = 6;

const Release_New = 0;
const Release_Edit = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: Release_New, // 类型

    petNo: null,

    sexyRange: ["公", "母"], // 性别
    sterilizedRange: ["是", "否"], // 是否绝育
    transportTypePage: PagePath.Page_Me_ReleaseManager_ReleaseNew_TransportType,
    sortRange: [], // 宠物分类
    genreRange: [], // 宠物品种
    maxUploadImageLength: Max_UploadImage_Length,

    petSort: null, // 宠物分类
    petGenre: null, // 宠物品种
    sexy: null, // 宠物性别
    sterilized: null, // 是否绝育
    birthday: null, // 宠物生日
    retailPrice: null, // 宠物零售价格
    marketPrice: null, // 宠物市场价格
    commissionRatio: null, // 佣金比例
    transportTypeList: [], // 运输方式
    uploadImageList: [], // 待上传图片地址列表
    serviceImagePathList: [], // 已上传图片地址列表
    describe: null, // 描述
    vaccineList: [], // 疫苗 vaccineDate vaccineBrandName
    repellentList: [], // 驱虫 killDate killBrandName
    identifier: null, // 宠物编号
    parent: {
      father: {
        name: null, // 名称
        imagePath: null, // 图片
        serviceImagePath: null, // 服务器地址
      },
      mother: {
        name: null, // 名称
        imagePath: null, // 图片
        serviceImagePath: null, // 服务器地址
      }
    }, // 父母

    uploadImageTask: null, // 上传图片任务
    uploadFatherImageTask: null, // 上传父亲图片任务
    uploadMotherImageTask: null, // 上传母亲图片任务
    currentUploadIndex: 0, // 当前上传图片下标

    uploadImageProgress: -1, // 上传图片任务进度
    uploadFatherImageProgress: -1, // 上传父亲图片进度
    uploadMotherImageProgress: -1, // 上传母亲图片进度

    successTimeIntervier: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      type: options.type
    })
    if (this.data.type == 1) {
      this.setEditData(app.globalData.editReleasePet);
      app.globalData.editReleasePet = null;
    }
    wx.showLoading({
      title: '请稍等...',
    })
    let that = this;
    this.requestPetSort(
      function getPetSortCallback(data) {
        that.setData({
          sortRange: data
        })
        wx.hideLoading();
      }
    )
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
    if (!Util.checkEmpty(app.globalData.selectTransportList)) {
      this.setData({
        transportTypeList: app.globalData.selectTransportList
      })
      app.globalData.selectTransportList = null;
    }
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
    clearTimeout(this.data.successTimeIntervier);
    this.data.successTimeIntervier = null;
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
  onShareAppMessage: function() {

  },

  /**
   * 选择宠物分类
   */
  selectSort: function(e) {
    this.setData({
      petSort: this.data.sortRange[e.detail.value]
    })
    let that = this;
    wx.showLoading({
      title: '请稍等...',
    })
    this.requestPetGenre(this.data.petSort.petSortNo,
      function getGenreCallback(data) {
        that.setData({
          genreRange: data
        })
        wx.hideLoading();
      }
    )
  },

  /**
   * 无分类时点击品种
   */
  tapGenreWithoutSort: function() {
    wx.showToast({
      title: '请先选择宠物分类',
      icon: 'none'
    })
  },

  /**
   * 选择宠物品种
   */
  selectGenre: function(e) {
    this.setData({
      petGenre: this.data.genreRange[e.detail.value]
    })
  },

  /**
   * 选择宠物性别
   */
  selectSexy: function(e) {
    this.setData({
      sexy: this.data.sexyRange[e.detail.value]
    })
  },

  /**
   * 选择是否绝育
   */
  selectSterilized: function(e) {
    this.setData({
      sterilized: this.data.sterilizedRange[e.detail.value]
    })
  },

  /**
   * 选择生日
   */
  selectBirthday: function(e) {
    this.setData({
      birthday: e.detail.value
    })
  },

  /**
   * 输入零售价格
   */
  inputPetRetailPrice: function(e) {
    this.setData({
      retailPrice: e.detail.value
    })
  },

  /**
   * 输入市场价格
   */
  inputPetMarketPrice: function(e) {
    this.setData({
      marketPrice: e.detail.value
    })
  },

  /**
   * 输入佣金比率
   */
  inputCommissionRatio: function(e) {
    this.setData({
      commissionRatio: e.detail.value
    })
  },

  /**
   * 点击选择新的运输方式
   */
  tapChangeTransport: function() {
    app.globalData.selectTransportList = this.data.transportTypeList;
    wx.navigateTo({
      url: this.data.transportTypePage,
    })
  },

  /**
   * 点击选择新上传图片
   */
  tapAddNewUploadImage: function(e) {
    let that = this;
    wx.chooseImage({
      count: Max_UploadImage_Length,
      success: function(res) {
        that.setData({
          uploadImageList: res.tempFilePaths,
          serviceImagePathList: null,
        })
        that.uploadListImage();
      },
    })
  },

  /**
   * 输入描述
   */
  inputDescribe: function(e) {
    this.setData({
      describe: e.detail.value
    })
  },

  /**
   * 新增疫苗信息
   */
  addNewVaccine: function() {
    if (!Util.checkEmpty(this.data.vaccineList)) {
      let lastVaccine = this.data.vaccineList[this.data.vaccineList.length - 1];
      if (Util.checkEmpty(lastVaccine.vaccineDate) || Util.checkEmpty(lastVaccine.vaccineBrandName)) {
        wx.showToast({
          title: '请补完上一条疫苗信息',
          icon: 'none'
        })
        return;
      }
    }

    let tempVaccine = {
      vaccineDate: null,
      vaccineBrandName: null,
    }
    this.data.vaccineList.push(tempVaccine);
    this.setData({
      vaccineList: this.data.vaccineList
    })
  },

  /**
   * 点击删除疫苗信息
   */
  tapDeleteVaccine: function(e) {
    let index = e.currentTarget.dataset.index;
    this.data.vaccineList.splice(index, 1);
    this.setData({
      vaccineList: this.data.vaccineList
    })
  },

  /**
   * 选择疫苗时间
   */
  selectVaccineDate: function(e) {
    let index = e.currentTarget.dataset.index;
    this.data.vaccineList[index].vaccineDate = e.detail.value;
    this.setData({
      vaccineList: this.data.vaccineList
    })
  },

  /**
   * 输入疫苗品牌
   */
  inputVaccineBrand: function(e) {
    let index = e.currentTarget.dataset.index;
    this.data.vaccineList[index].vaccineBrandName = e.detail.value;
    this.setData({
      vaccineList: this.data.vaccineList
    })
  },

  /**
   * 新增驱虫信息
   */
  addNewRepellent: function() {
    if (!Util.checkEmpty(this.data.repellentList)) {
      let lastRepellent = this.data.repellentList[this.data.repellentList.length - 1];
      if (Util.checkEmpty(lastRepellent.killDate) || Util.checkEmpty(lastRepellent.killBrandName)) {
        wx.showToast({
          title: '请补完上一条驱虫信息',
          icon: 'none'
        })
        return;
      }
    }
    let tempRepellent = {
      killDate: null,
      killBrandName: null,
    }
    this.data.repellentList.push(tempRepellent);
    this.setData({
      repellentList: this.data.repellentList
    })
  },

  /**
   * 点击删除驱虫信息
   */
  tapDeleteRepellent: function(e) {
    let index = e.currentTarget.dataset.index;
    this.data.repellentList.splice(index, 1);
    this.setData({
      repellentList: this.data.repellentList
    })
  },

  /**
   * 选择驱虫时间
   */
  selectRepellentDate: function(e) {
    let index = e.currentTarget.dataset.index;
    this.data.repellentList[index].killDate = e.detail.value;
    this.setData({
      repellentList: this.data.repellentList
    })
  },

  /**
   * 输入驱虫品牌
   */
  inputRepellentBrand: function(e) {
    let index = e.currentTarget.dataset.index;
    this.data.repellentList[index].killBrandName = e.detail.value;
    this.setData({
      repellentList: this.data.repellentList
    })
  },

  /**
   * 输入宠物编号
   */
  inputIdentifier: function (e) {
    this.setData({
      identifier: e.detail.value
    })
  },

  /**
   * 选择父亲图片
   */
  selectFatherImage: function() {
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        that.data.parent.father.imagePath = res.tempFilePaths[0];
        that.data.parent.father.serviceImagePath = null;
        that.setData({
          parent: that.data.parent
        })
        that.uploadFatherImage();
      },
    })
  },

  /**
   * 选择母亲图片
   */
  selectMotherImage: function() {
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        that.data.parent.mother.imagePath = res.tempFilePaths[0];
        that.data.parent.mother.serviceImagePath = null;
        that.setData({
          parent: that.data.parent
        })
        that.uploadMotherImage();
      },
    })
  },

  /**
   * 输入父亲名称
   */
  inputFatherName: function(e) {
    this.data.parent.father.name = e.detail.value;
    this.setData({
      parent: this.data.parent
    })
  },

  /**
   * 输入母亲名称
   */
  inputMotherName: function(e) {

    this.data.parent.mother.name = e.detail.value;
    this.setData({
      parent: this.data.parent
    })
  },

  /**
   * 点击发布
   */
  tapToRelease: function(e) {
    let that = this;
    let releaseData = this.getReleaseData();
    wx.showLoading({
      title: '请稍等...',
    })
    if (releaseData != null) {
      console.log("releaseData : \n" + JSON.stringify(releaseData));
      if (this.data.type == 0) {
        this.requestRelease(releaseData,
          function releaseResultCallback(result) {
            wx.hideLoading();
            if (result >= 1) {
              wx.showToast({
                title: '发布成功',
                icon: 'none',
                duration: 1500
              })
              that.data.successTimeIntervier = setTimeout(function (res) {
                wx.navigateBack({

                })
              }, 1600)
            } else {
              wx.showToast({
                title: '发布插入失败',
                icon: 'none'
              })
            }
          }
        )
      } else {
        this.requestEdit(releaseData,
          function editResultCallback(result) {
            wx.hideLoading();
            if (result >= 1) {
              wx.showToast({
                title: '编辑成功',
                icon: 'none',
                duration: 1500
              })
              that.data.successTimeIntervier = setTimeout(function (res) {
                wx.navigateBack({

                })
              }, 1600)
            } else {
              wx.showToast({
                title: '编辑插入失败',
                icon: 'none'
              })
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
          coverImg: res.root[0].fileAddress
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

  /**
   * 上传父亲图片
   * @param uploadCompleteCallback
   */
  uploadFatherImage: function (uploadCompleteCallback) {
    let that = this;
    // 上传任务不为空
    if (that.data.uploadFatherImageTask != null) {
      // 取消图片上传进度监听
      that.data.uploadFatherImageTask.offProgressUpdate();
      // 中止图片上传任务
      that.data.uploadFatherImageTask.abort();
      // 图片上传任务置空
      that.data.uploadFatherImageTask = null;
    }
    that.data.uploadFatherImageTask = UploadFileService.fileUpload(that.data.parent.father.imagePath,
      // 监听图片上传任务
      function uploadCallback(res) {
        console.log("fatherimage upload callback: \n" + JSON.stringify(res));
        that.data.parent.father.serviceImagePath = res.root[0].fileAddress;
        that.setData({
          parent: that.data.parent,
          uploadFatherImageProgress: -1
        })
        // 取消图片上传进度监听
        that.data.uploadFatherImageTask.offProgressUpdate();
        // 中止图片上传任务
        that.data.uploadFatherImageTask.abort();
        // 图片上传任务置空
        that.data.uploadFatherImageTask = null;
        if (Util.checkIsFunction(uploadCompleteCallback)) {
          uploadCompleteCallback();
        }
      },
      // 监听图片上传进度
      function onProgressCallback(res) {
        console.log("fatherimage on progress callback: \n" + JSON.stringify(res));
        that.setData({
          uploadFatherImageProgress: res.progress
        })
      },
    )
  },

  /**
   * 上传母亲图片
   * @param uploadCompleteCallback
   */
  uploadMotherImage: function (uploadCompleteCallback) {
    let that = this;
    // 上传任务不为空
    if (that.data.uploadMotherImageTask != null) {
      // 取消图片上传进度监听
      that.data.uploadMotherImageTask.offProgressUpdate();
      // 中止图片上传任务
      that.data.uploadMotherImageTask.abort();
      // 图片上传任务置空
      that.data.uploadMotherImageTask = null;
    }
    that.data.uploadMotherImageTask = UploadFileService.fileUpload(that.data.parent.mother.imagePath,
      // 监听图片上传任务
      function uploadCallback(res) {
        console.log("motherimage upload callback: \n" + JSON.stringify(res));
        that.data.parent.mother.serviceImagePath = res.root[0].fileAddress;
        that.setData({
          parent: that.data.parent,
          uploadMotherImageProgress: -1
        })
        // 取消图片上传进度监听
        that.data.uploadMotherImageTask.offProgressUpdate();
        // 中止图片上传任务
        that.data.uploadMotherImageTask.abort();
        // 图片上传任务置空
        that.data.uploadMotherImageTask = null;
        if (Util.checkIsFunction(uploadCompleteCallback)) {
          uploadCompleteCallback();
        }
      },
      // 监听图片上传进度
      function onProgressCallback(res) {
        console.log("motherimage on progress callback: \n" + JSON.stringify(res));
        that.setData({
          uploadMotherImageProgress: res.progress
        })
      },
    )
  },

  /**
   * 请求发布
   * @param releaseData
   * @param releaseResultCallback
   */
  requestRelease: function (releaseData, releaseResultCallback) {
    PetService.releasePet(releaseData,
      function callback(result) {
        if (Util.checkIsFunction(releaseResultCallback)) {
          releaseResultCallback(result.root)
        }
      }
    )
  },

  /**
   * 请求编辑
   * @param releaseData
   * @param editResultCallback
   */
  requestEdit: function (releaseData, editResultCallback) {
    PetService.editPet(releaseData,
      function callback(result) {
        if (Util.checkIsFunction(editResultCallback)) {
          editResultCallback(result.root)
        }
      }
    )
  },

  /**
   * 请求宠物分类
   * @param getSortCallback
   */
  requestPetSort: function(getSortCallback) {
    PetService.getSort(
      function getResultCallback(result) {
        if (Util.checkIsFunction(getSortCallback)) {
          getSortCallback(result.root);
        }
      }
    )
  },

  /**
   * 请求宠物品种
   * @param sortNo
   * @param getGenreCallback
   */
  requestPetGenre: function(sortNo, getGenreCallback) {
    PetService.getBreed(sortNo,
      function getResultCallback(result) {
        if (Util.checkIsFunction(getGenreCallback)) {
          getGenreCallback(result.root);
        }
      }
    )
  },

  /**
   * 提示弹窗
   * @param msg
   */
  toast: function (msg) {
    wx.showToast({
      title: msg,
      icon: "none"
    })
  },

  /**
   * 拼接发布数据
   * return releaseData
   */
  getReleaseData: function () {
    let releaseData = {};

    releaseData.business = {
      businessNo: UserService.getBusinessNo()
    }

    if (!Util.checkEmpty(this.data.petNo)) {
      releaseData.petNo = this.data.petNo
    }

    if (Util.checkEmpty(this.data.petSort)) {
      this.toast("请选择宠物分类");
      return null;
    }
    releaseData.petSort = this.data.petSort;

    if (Util.checkEmpty(this.data.petGenre)) {
      this.toast("请选择宠物品种");
      return null;
    }
    releaseData.petGenre = this.data.petGenre;

    if (Util.checkEmpty(this.data.sexy)) {
      this.toast("请选择宠物性别");
      return null;
    }
    releaseData.petSex = this.data.sexy == "公" ? 1 : 2;

    if (Util.checkEmpty(this.data.sterilized)) {
      this.toast("请选择是否绝育");
      return null;
    }
    releaseData.petSterilization = this.data.sterilized == "是" ? 1 : 2;

    if (Util.checkEmpty(this.data.birthday)) {
      this.toast("请选择宠物生日");
      return null;
    }
    releaseData.petBirthday = this.data.birthday;

    if (Util.checkEmpty(this.data.retailPrice)) {
      this.toast("请输入宠物零售价格");
      return null;
    }
    releaseData.retailPrice = this.data.retailPrice;

    if (Util.checkEmpty(this.data.marketPrice)) {
      this.toast("请输入宠物市场价格");
      return null;
    }
    releaseData.marketPrice = this.data.marketPrice;

    if (Util.checkEmpty(this.data.commissionRatio)) {
      this.toast("请输入佣金比例");
      return null;
    }
    releaseData.brokerage = this.data.commissionRatio;

    if (Util.checkEmpty(this.data.transportTypeList)) {
      this.toast("请选择配送方式");
      return null;
    }
    releaseData.petTransport = {};
    for (let index = 0; index < this.data.transportTypeList.length; index++) {
      let tempTransport = this.data.transportTypeList[index];
      if (tempTransport.name == "航空") {
        releaseData.petTransport.airport = tempTransport.price;
      } else if (tempTransport.name == "大巴") {
        releaseData.petTransport.coach = tempTransport.price;
      } else if (tempTransport.name == "铁路") {
        releaseData.petTransport.railway = tempTransport.price;
      } else if (tempTransport.name == "专车") {
        releaseData.petTransport.shuttleBus = tempTransport.price;
      } else if (tempTransport.name == "自提") {
        releaseData.petTransport.takeTheir = tempTransport.price;
      }
    }

    if (Util.checkEmpty(this.data.serviceImagePathList)) {
      this.toast("请上传至少一张图片");
      return null;
    } else if (this.data.serviceImagePathList.length != this.data.uploadImageList.length) {
      this.toast("宠物图片未上传成功");
      return null;
    }
    releaseData.coverMedia = this.data.serviceImagePathList;

    if (!Util.checkEmpty(this.data.describe)) {
      releaseData.petDescription = this.data.describe;
    }

    if (!Util.checkEmpty(this.data.vaccineList)) {
      releaseData.petVaccineList = this.data.vaccineList;
    }

    if (!Util.checkEmpty(this.data.repellentList)) {
      releaseData.petKillList = this.data.repellentList;
    }

    if (!Util.checkEmpty(this.data.identifier)) {
      releaseData.petUniqueCode = this.data.identifier;
    }

    if (!Util.checkEmpty(this.data.parent.father.serviceImagePath)) {
      releaseData.fatherImg = this.data.parent.father.serviceImagePath;
    }

    if (!Util.checkEmpty(this.data.parent.father.name)) {
      releaseData.fatherName = this.data.parent.father.name;
    }

    if (!Util.checkEmpty(this.data.parent.mother.serviceImagePath)) {
      releaseData.motherImg = this.data.parent.mother.serviceImagePath;
    }

    if (!Util.checkEmpty(this.data.parent.mother.name)) {
      releaseData.motherName = this.data.parent.mother.name;
    }

    return releaseData;
  },

  /**
   * 拼接要编辑的数据
   * @param editReleasePet
   */
  setEditData: function(editReleasePet) {
    let petNo = editReleasePet.petNo;
    let petSort = editReleasePet.petSort;
    let petGenre = editReleasePet.petGenre;
    let petSexy = editReleasePet.petSex==1?"公":"母";
    let petSterilization = editReleasePet.petSterilization==1?"是":"否";
    let petBirthday = editReleasePet.petBirthday;
    let retailPrice = editReleasePet.retailPrice;
    let marketPrice = editReleasePet.marketPrice;
    let brokerage = editReleasePet.brokerage;
    let transportList = [];
    if (!Util.checkEmpty(editReleasePet.petTransport.airport)) {
      transportList.push({
        name: "航空",
        price: editReleasePet.petTransport.airport
      })
    }
    if (!Util.checkEmpty(editReleasePet.petTransport.shuttleBus)) {
      transportList.push({
        name: "专车",
        price: editReleasePet.petTransport.shuttleBus
      })
    }
    if (!Util.checkEmpty(editReleasePet.petTransport.coach)) {
      transportList.push({
        name: "大巴",
        price: editReleasePet.petTransport.coach
      })
    }
    if (!Util.checkEmpty(editReleasePet.petTransport.railway)) {
      transportList.push({
        name: "铁路",
        price: editReleasePet.petTransport.railway
      })
    }
    if (!Util.checkEmpty(editReleasePet.petTransport.takeTheir)) {
      transportList.push({
        name: "自提",
        price: editReleasePet.petTransport.takeTheir
      })
    }
    let uploadImageList = [];
    let serviceImageList = [];
    if (!Util.checkEmpty(editReleasePet.coverMedia)) {
      for (let index = 0; index < editReleasePet.coverMedia.length; index++) {
        let tempMedia = editReleasePet.coverMedia[index];
        uploadImageList.push(tempMedia.coverImg);
        serviceImageList.push({
          coverImg: tempMedia.coverImg
        });
      }
    }
    let petDescription = editReleasePet.petDescription;
    let petVaccineList = [];
    if (!Util.checkEmpty(editReleasePet.petVaccineList)) {
      petVaccineList = editReleasePet.petVaccineList;
    }
    let petKillList = [];
    if (!Util.checkEmpty(editReleasePet.petKillList)) {
      petKillList = editReleasePet.petKillList;
    }
    let petUniqueCode = editReleasePet.petUniqueCode;
    let fatherName = editReleasePet.fatherName;
    let fatherImage = editReleasePet.fatherImg
    let motherName = editReleasePet.motherName;
    let motherImage = editReleasePet.motherImg
    let parent = {
      father: {
        name: fatherName, // 名称
        imagePath: fatherImage, // 图片
        serviceImagePath: fatherImage, // 服务器地址
      },
      mother: {
        name: motherName, // 名称
        imagePath: motherImage, // 图片
        serviceImagePath: motherImage, // 服务器地址
      }
    } // 父母
    this.setData({
      petNo: petNo,
      petSort: petSort,
      petGenre: petGenre,
      sexy: petSexy,
      sterilized: petSterilization,
      birthday: petBirthday,
      retailPrice: retailPrice,
      marketPrice: marketPrice,
      commissionRatio: brokerage,
      transportTypeList: transportList,
      uploadImageList: uploadImageList,
      serviceImagePathList: serviceImageList,
      describe: petDescription,
      vaccineList: petVaccineList,
      repellentList: petKillList,
      identifier: petUniqueCode,
      parent: parent
    })
  },

})