// pages/me/releaseManager/releaseNew/index.js

const app = getApp();
const Util = require("../../../../utils/util.js");
const Utils = require("../../../../utils/util")
const PagePath = require("../../../../macros/pagePath.js");
const PetService = require("../../../../services/petService.js");
const UserService = require("../../../../services/userService.js");
const UploadFileService = require("../../../../services/uploadFileService.js");
const UrlPath = require("../../../../macros/urlPath.js");

const Max_UploadImage_Length = 6;

const Release_New = 0;
const Release_Edit = 1;
const ShareManager = require("../../../../services/shareService");

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
    commission: "",
    commissionRatio: 10, // 佣金比例
    transportTypeList: [], // 运输方式
    uploadImageList: [], // 待上传图片地址列表
    showImageInfo:[],
    serviceImagePathList: [], // 已上传图片地址列表
    describe: null, // 描述
    vaccineList: [], // 疫苗 vaccineDate vaccineBrandName
    repellentList: [], // 驱虫 killDate killBrandName
    identifier: null, // 宠物编号
    uploadUrl: null,  //图片上传地址
    petName:null, //宠物名称
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

    pohtoListObj:{},//图片对象

    successTimeIntervier: null,

    showMoreInfo:true,    //是否隐藏跟多选项

    isChecked: false,     //是否包邮开关
    isInsuranceChecked:false, //是否需要宠物保险
    freeShipping: 0,       //包邮状态

    petweight:null ,    //宠物重量

    insuranceTime: [
      { name: 0 , value: '90天' },
      { name: 1, value: '一年' },
    ], //保险时长
    insuranceTimeCheck:true,


    insuranceTimeState: null,  //保险时长状态

    afterSaleService: [
      { name: '无', value: '无'},
      { name: '质保7天', value: '质保7天（确保7日内无犬瘟、细小、冠状病毒、猫瘟、猫腹水、猫鼻支）', checked: 'true' }
    ],
    afterSaleServiceCheck:true,


    groupIsChecked:false, //是否是团购宠物  
    addGroupPriceList:[], //团购价格阶梯
    groupNumberCheck:false, //团购第二次数量校验


    delType:0,   //删除与新增行价格阶梯校验

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    Utils.logInfo(UrlPath.Url_Base + UrlPath.Url_UploadFile+"==============");
    Utils.logInfo("one " + options.type + "\n two " + options.product);
    this.setData({
      type: options.type,
      uploadUrl: UrlPath.Url_Base + UrlPath.Url_UploadFile
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

    get_emit: function (e) {
      Utils.logInfo("====================>"+JSON.stringify(e))
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
    if (!Util.checkEmpty(app.globalData.selectedPetGenre)) {
      this.setData({
        petGenre: app.globalData.selectedPetGenre
      })
      app.globalData.selectedPetGenre = null;
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
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
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
   * 选择宠物品种
   */
  selectPetGenre: function(e) {
    if (!this.data.petSort) {
      wx.showToast({
        title: '请先选择宠物分类',
        icon:'none'
      })
      return;
    }
    wx.navigateTo({
      url: PagePath.Page_Me_ReleaseManager_ReleaseNew_PetGenre + '?petsortno=' + this.data.petSort.petSortNo,
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
    let that=this;
    this.setData({
      retailPrice: e.detail.value,
    })
    this.countCommission();
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
      commissionRatio: e.detail.value,
    })
  },

  /**
   * 佣金比率输入失去焦点
   */
  blurCommissionRation: function(e) {
    if (parseFloat(this.data.commissionRatio) < 10) {
      this.setData({
        commissionRatio: 10
      })
    } 
    this.countCommission();
  },

  /**
   * 计算佣金
   */
  countCommission: function () {
    if (!Util.checkEmpty(this.data.commissionRatio) && !Util.checkEmpty(this.data.retailPrice)) {
      let ratio = parseFloat(this.data.commissionRatio);
      let price = parseFloat(this.data.retailPrice);
      let finalCommission = (ratio / 100.0) * price
      this.setData({
        commission: finalCommission.toFixed(2)
      })
    } else {
      this.setData({
        commission: ""
      })
    }
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
  // tapAddNewUploadImage: function(e) {
  //   let that = this;
  //   wx.chooseImage({
  //     count: Max_UploadImage_Length,
  //     success: function(res) {
  //       that.setData({
  //         uploadImageList: res.tempFilePaths,
  //         serviceImagePathList: null,
  //       })
  //       that.uploadListImage();
  //     },
  //   })
  // },

  /**
   * 输入描述
   */
  inputDescribe: function(e) {
    this.setData({
      describe: e.detail.value
    })
  },

  /**
   * 团购开关
   */
  groupBindChange:function(res){
    this.setData({
      groupIsChecked: res.detail.value
    })
  },

  /**
   * 输入起始团购数量
   */
  firstNumberInput:function(index){
    let that=this

        this.data.addGroupPriceList[index].startQty = parseInt(this.data.addGroupPriceList[this.data.addGroupPriceList.length - 2].endQty) + 1;

        that.setData({
          addGroupPriceList: this.data.addGroupPriceList
        })
    

  },

  /**
   * 输入终止团购数量
   */
  theSecondNumberTnput:function(e){
    let that=this;
    let index = e.currentTarget.dataset.index;
    this.data.addGroupPriceList[index].endQty = e.detail.value;

    if (!Util.checkEmpty(e.detail.value) && !Util.checkEmpty(that.data.addGroupPriceList[index].startQty)){
      if (parseInt(e.detail.value) <= that.data.addGroupPriceList[index].startQty){
            wx.showToast({
              title: '终止数量不能小于起始数量',
              icon:"none"
            })
            that.setData({
              groupNumberCheck:true
            })
        }else{
          that.setData({
            addGroupPriceList: this.data.addGroupPriceList,
            groupNumberCheck: false,
          })
        }
    }
   
   
  },

  /**
   * 输入阶段价格
   */
  priceInput:function(e){
    let index = e.currentTarget.dataset.index;
    this.data.addGroupPriceList[index].price = e.detail.value;
    this.setData({
      addGroupPriceList: this.data.addGroupPriceList
    })
    Utils.logInfo(JSON.stringify(this.data.addGroupPriceList))
  },



  /**
   * 删除团购阶段价格
   * 
   */
  tapDeleteGroupPrice:function(e){
    let that=this;
    let index = e.currentTarget.dataset.index;
    this.data.addGroupPriceList.splice(index, 1);
    this.setData({
      addGroupPriceList: this.data.addGroupPriceList,
      delType: this.data.addGroupPriceList.length-1 //显示上一条数据的删除符号校验
    })
  },

  /**
   * 新增团购价格阶梯
   */
  addGroupPrice: function (e) {
    let index = e.currentTarget.dataset.index;
    if (!Util.checkEmpty(this.data.addGroupPriceList)) {
      let lastGroupPrice= this.data.addGroupPriceList[this.data.addGroupPriceList.length - 1];
      if (Util.checkEmpty(lastGroupPrice.startQty) || Util.checkEmpty(lastGroupPrice.endQty) || Util.checkEmpty(lastGroupPrice.price)) {
        wx.showToast({
          title: '请补完上一条价格阶梯',
          icon: 'none'
        })
        return;
      }

    }

    let groupPrice = {
      startQty: null,
      endQty: null,
      price:null,
    }
    if (index == 0) {
      groupPrice.startQty=1
    }
    this.data.addGroupPriceList.push(groupPrice);
    this.setData({
      addGroupPriceList: this.data.addGroupPriceList,
      delType: index
    })
    
    if (index!=0){
      this.firstNumberInput(index);
    }


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
    UserService.isLogin(function isLoginCallback(){
      let releaseData = that.getReleaseData();
      if (releaseData != null) {
        wx.showLoading({
          title: '请稍等...',
        })
        Utils.logInfo("releaseData : \n" + JSON.stringify(releaseData));
        if (that.data.type == 0) {
          that.requestRelease(releaseData,
            function releaseResultCallback(result) {
              wx.hideLoading();
              if (result == "操作成功") {
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
          that.requestEdit(releaseData,
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
    })
  },

  /**
  * 上传列表图片
  * @param uploadCompleteCallback 列表上传完成
  */
  uploadCompletesert: function (res) {
    Utils.logInfo(JSON.stringify(res))
    let that = this;
    let uploadReturnDataList = res.detail.uploadReturnDataList;
    let uploadReturnDataArr=[];
    for (let i = 0; i < uploadReturnDataList.length;i++){
        let objectList = {}
        objectList.coverAddress = uploadReturnDataList[i];
         objectList.type = 0;
        objectList.order=0;
        uploadReturnDataArr.push(objectList)
    }
    this.get_emit();
    that.setData({
      serviceImagePathList: uploadReturnDataList,
      pohtoListObj: uploadReturnDataArr
    })
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
        Utils.logInfo("fatherimage upload callback: \n" + JSON.stringify(res));
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
        Utils.logInfo("fatherimage on progress callback: \n" + JSON.stringify(res));
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
        Utils.logInfo("motherimage upload callback: \n" + JSON.stringify(res));
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
        Utils.logInfo("motherimage on progress callback: \n" + JSON.stringify(res));
        that.setData({
          uploadMotherImageProgress: res.progress
        })
      },
    )
  },

  /**
   * 宠物名称
   */
  inputPetName:function(res){
      let petName=res.detail.value;
      this.setData({
        petName:petName
      })
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
    let releaseData = {
      // pet.business:UserService.getBusinessNo()
    };
    
    releaseData.pet = {
      
    }

    releaseData.pet.business={
      businessNo: UserService.getBusinessNo()
    }

    if (!Util.checkEmpty(this.data.petNo)) {
      releaseData.pet.petNo = this.data.petNo
    }else{
      releaseData.pet.petNo = '';
    }

    if (Util.checkEmpty(this.data.petName)){
      this.toast("请输入宠物名称");
      return null;
    }
    releaseData.pet.petName = this.data.petName;

    if (Util.checkEmpty(this.data.petSort)) {
      this.toast("请选择宠物分类");
      return null;
    }
    releaseData.pet.petSort= this.data.petSort;

    if (Util.checkEmpty(this.data.petGenre)) {
      this.toast("请选择宠物品种");
      return null;
    }
    releaseData.pet.petGenre= this.data.petGenre;

    if (Util.checkEmpty(this.data.sexy)) {
      this.toast("请选择宠物性别");
      return null;
    }
    releaseData.pet.petSex = this.data.sexy == "公" ? 1 : 2;

    // if (Util.checkEmpty(this.data.sterilized)) {
    //   this.toast("请选择是否绝育");
    //   return null;
    // }
    // releaseData.pet.petSterilization = this.data.sterilized == "是" ? 1 : 2;

    if (Util.checkEmpty(this.data.birthday)) {
      this.toast("请选择宠物生日");
      return null;
    }
    releaseData.pet.petBirthday = this.data.birthday;

    if (Util.checkEmpty(this.data.retailPrice)) {
      this.toast("请输入宠物零售价格");
      return null;
    }
    releaseData.pet.retailPrice = this.data.retailPrice;

    // if (Util.checkEmpty(this.data.marketPrice)) {
    //   this.toast("请输入宠物市场价格");
    //   return null;
    // }
    // releaseData.pet.marketPrice = this.data.marketPrice;

    if (Util.checkEmpty(this.data.commissionRatio)) {
      this.toast("请输入佣金比例");
      return null;
    }
    releaseData.pet.commission = this.data.commissionRatio;
    if (Util.checkEmpty(this.data.commission)) {
      this.countCommission();
    }
    releaseData.pet.commissionAmount = this.data.commission;

    // if (Util.checkEmpty(this.data.transportTypeList)) {
    //   this.toast("请选择配送方式");
    //   return null;
    // }
    releaseData.pet.freeShipping = this.data.freeShipping; //是否包邮

    if (this.data.afterSaleServiceCheck==true){   //保质七天
      releaseData.pet.sevenWarranty= 1;
    }else{
      releaseData.pet.sevenWarranty = 0;
    }


    releaseData.pet.seve = this.data.afterSaleServiceCheck;

    if (Util.checkEmpty(this.data.petweight)) {
      this.toast("请输入宠物的重量");
      return null;
    }
    releaseData.pet.weight = this.data.petweight;




    if (this.data.isInsuranceChecked == false) {  //判断是否需要保险
      releaseData.pet.insurance = 0;
    } else {
      releaseData.pet.insurance = this.data.insuranceTimeState   //保险时长
    }

    if (this.data.groupIsChecked==true){  //宠物是否是团购
      if (this.data.addGroupPriceList.length<=0){
        this.toast("请添加团购梯度！");
      }else{
        releaseData.petGrouponList = this.data.addGroupPriceList
        releaseData.pet.groupon=1;
      }
    } else {
      releaseData.pet.groupon = 0;
    }


    if (Util.checkEmpty(this.data.serviceImagePathList)) {
      Utils.logInfo(this.data.serviceImagePathList+"========")
      this.toast("请上传至少一张图片");
      return null;
    } else if (this.data.serviceImagePathList.length==0) {
      this.toast("宠物图片未上传成功");
      return null;
    }
    releaseData.petWormKillList = null;
    releaseData.petVaccineList = null;
    let tempCoverList = [];
    for (let index = 0; index < this.data.pohtoListObj.length; index++) {
      let tempObj = this.data.pohtoListObj[index];
      let address = "";
      if (tempObj.coverAddress.fileAddress) {
        address = tempObj.coverAddress.fileAddress;
      } else if (tempObj.coverAddress.coverAddress) {
        address = tempObj.coverAddress.coverAddress;
      } else if (tempObj.coverAddress){
        address = tempObj.coverAddress;
      } else {
        address = tempObj.fileAddress;
      }
      let tempType = "";
      if (tempObj.coverAddress.fileTypeEnum) {
        tempType = tempObj.coverAddress.fileTypeEnum;
      } else if (tempObj.coverAddress.type) {
        tempType = tempObj.coverAddress.type;
      } else if (tempObj.fileTypeEnum) {
        tempType = tempObj.fileTypeEnum;
      } else {
        tempType = tempObj.type;
      }
      tempCoverList.push({
        coverAddress: address,
        type: tempType,
        order: index
      })
    }
    releaseData.petCoverList = tempCoverList;
    releaseData.petGrouponList = null;

    if (!Util.checkEmpty(this.data.describe)) {
      releaseData.pet.petDescription = this.data.describe;
    }

    if (!Util.checkEmpty(this.data.vaccineList)) {
      releaseData.petVaccineList = this.data.vaccineList;
    }

    if (!Util.checkEmpty(this.data.repellentList)) {
      releaseData.petWormKillList = this.data.repellentList;
    }

    if (!Util.checkEmpty(this.data.identifier)) {
      releaseData.pet.petUniqueCode = this.data.identifier;
    }

    if (!Util.checkEmpty(this.data.parent.father.serviceImagePath)) {
      releaseData.pet.fatherImg = this.data.parent.father.serviceImagePath;
    }else{
      releaseData.pet.fatherImg = '';
    }

    if (!Util.checkEmpty(this.data.parent.father.name)) {
      releaseData.pet.fatherName = this.data.parent.father.name;
    }else{
      releaseData.pet.fatherName = '';
    }

    if (!Util.checkEmpty(this.data.parent.mother.serviceImagePath)) {
      releaseData.pet.motherImg = this.data.parent.mother.serviceImagePath;
    }else{
      releaseData.pet.motherImg = '';
    }

    if (!Util.checkEmpty(this.data.parent.mother.name)) {
      releaseData.pet.motherName = this.data.parent.mother.name;
    }else{
      releaseData.pet.motherName = '';
    }

    return releaseData;
  },

  /**
   * 拼接要编辑的数据
   * @param editReleasePet
   */
  setEditData: function(editReleasePet) {
    let that=this;
    Utils.logInfo("宠物编辑数据===>"+JSON.stringify(editReleasePet));
    let petName = editReleasePet.pet.petName;
    let petNo = editReleasePet.pet.petNo;
    let petSort = editReleasePet.pet.petSort;
    let petGenre = editReleasePet.pet.petGenre;
    let petSexy = editReleasePet.pet.petSex==1?"公":"母";
    let petSterilization = editReleasePet.pet.petSterilization==1?"是":"否";
    let petBirthday = editReleasePet.pet.petBirthday;
    let retailPrice = editReleasePet.pet.retailPrice;
    let marketPrice = editReleasePet.pet.marketPrice;
    let commission = editReleasePet.pet.commissionAmount;
    let insurance = editReleasePet.pet.insurance;   //保险天数
    let freeShipping = editReleasePet.pet.freeShipping; //是否包邮
    let sevenWarranty = editReleasePet.pet.sevenWarranty; //是否七天保质
    let commissionRatio = editReleasePet.pet.commission; //佣金比例
    let petweight = editReleasePet.pet.weight; //宠物重量
    
    let afterSale = "afterSaleService[" + sevenWarranty+ "].checked"; 
    that.setData({
      [afterSale]:true
    })    //替换售后控制按钮

    if (freeShipping==1){
      that.setData({
        isChecked:true
      })
    }else{
      that.setData({
        isChecked:false
      })
    } //是否包邮勾选

    if (insurance == 90 || insurance==365){
      that.setData({
        isInsuranceChecked:true
      })
      if (insurance==90){
        let insuranceTime = "insuranceTime[" + 0 + "].checked"; 
        that.setData({
          [insuranceTime]:true
        })
      }else{
        let insuranceTime = "insuranceTime[" + 1+ "].checked";
        that.setData({
          [insuranceTime]: true
        })
      }
     
    }else{
      that.setData({
        isInsuranceChecked:false
      })
    } //判断否勾选宠物保险框
  
    let serviceImageList = editReleasePet.petCoverList;
    let petDescription = editReleasePet.pet.petDescription;
    let petVaccineList = [];
    if (!Util.checkEmpty(editReleasePet.petVaccineList)) {
      petVaccineList = editReleasePet.petVaccineList;
    }
    let petKillList = [];
    if (!Util.checkEmpty(editReleasePet.petWormKillList)) {
      petKillList = editReleasePet.petWormKillList;6
    }
    let petUniqueCode = editReleasePet.pet.petUniqueCode;
    let fatherName = editReleasePet.pet.fatherName;
    let fatherImage = editReleasePet.pet.fatherImg
    let motherName = editReleasePet.pet.motherName;
    let motherImage = editReleasePet.pet.motherImg
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

    let uploadReturnDataArr = serviceImageList;

    this.setData({
      pohtoListObj:uploadReturnDataArr,
      petName:petName,
      petNo: petNo,
      petSort: petSort,
      petGenre: petGenre,
      sexy: petSexy,
      sterilized: petSterilization,
      birthday: petBirthday,
      retailPrice: retailPrice,
      marketPrice: marketPrice,
      commission: commission,
      // transportTypeList: transportList,
      serviceImagePathList: serviceImageList,
      describe: petDescription,
      vaccineList: petVaccineList,
      repellentList: petKillList,
      identifier: petUniqueCode,
      parent: parent,
      commissionRatio: commissionRatio,  //佣金比例
      petweight: petweight, //宠物重量
      insuranceTimeState: insurance , //保险时长
    })
  },

  /**
   * 删除图片操作
   */
  deleteImage:function(e){
    let that=this;
    Utils.logInfo("====>"+JSON.stringify(e))
    let deletImageInfo = e.detail.imagePathList;
    that.setData({
      serviceImagePathList: deletImageInfo
    })
  },

  /**
   * 选择更多的选项
   */
  moreInfoTap:function(){
    let that=this;
    this.setData({
      showMoreInfo: !that.data.showMoreInfo
    })
  },

  /**
   * 是否包邮开关状态
   */
  petPostChange:function(res){
    let that=this;
    let freeShipState;
    let freeShip = res.detail.value
    if (freeShip==true){
      that.setData({
        freeShipping:1
      })
    }else{
      that.setData({
        freeShipping: 0
      })
    }
  },
  
  /**
   * 是否需要宠物保险
   */
  insuranceChange:function(res){
    this.setData({
      isInsuranceChecked: res.detail.value
    })
  },
  /**
   * 宠物重量输入框
   */
  inputPetWeight:function(res){
    Utils.logInfo(JSON.stringify(res))
    this.setData({
      petweight: res.detail.value
    })
  },

  /**
   * 保险时长
   */
  insuranceTimeChange:function(res){
    let that=this;
    if (res.detail.value==0){
      that.setData({
        insuranceTimeState: 90
      })
    }else{
      that.setData({
        insuranceTimeState: 365
      })
    }
  },

  /**
   * 售后服务()
   */
  afterSaleServiceChange:function(e){
      let that=this;
      if (e.detail.value =="质保7天"){
        that.setData({
           afterSaleServiceCheck:true
        })
      }else{
        that.setData({
          afterSaleServiceCheck: false
        })
      }
  }

})