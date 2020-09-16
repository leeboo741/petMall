// mallsubcontracting/pages/productreleasedetails/index.js
const UrlPath = require("../../../macros/urlPath.js");
const Util = require("../../../utils/util.js");
const MallService = require("../../../services/mallService.js");
const UserService = require("../../../services/userService.js");
const PetService = require("../../../services/petService.js");
const CommodityReleaseService = require("../../../services/commodityReleaseService.js")
const app = getApp();
const ShareManager = require("../../../services/shareService");
const Utils = require("../../../utils/util");
const util = require("../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadUrl: null,

    itemName: "", //商品名称
    itemStage: '', //商品对应宠物阶段
    grossWeight: "", //毛重
    itemValidity: "", //保质
    petGenreStr: '', //品种
    retailPrice: '', //零售价
    marketPrice: "", //市场价
    commission: "", //佣金
    commissionRatio: 10, // 佣金比例
    itemNo: null, //商品id

    brandRange: [

    ], //品牌
    brandObj: [], //所选品牌对象
    brandRangeSelect: null, //所选品牌显示
    petSort: [], //分类选择
    petSortObj: [], //所选分类对象
    goodsification: [], //分类

    showMenu: false, // 是否要选择套餐
    menu: "", //所显示套餐
    menuArray: [], //选中套餐数组

    itemType: "", //选择类型
    itemTypeObj: [], //所选类型对象

    qty: null, // 库存数量

    retailPrice: '', //价格

    isChecked: true, //是否包邮

    barCode: null, //条码

    serviceImagePathList: [], //封面 图片列表

    imagePathList: [], // 商品图片

    itemDescription: '', //描述

    itemProfile: "", //简介

    region: "", //地区

    buttonType: 0,


    groupIsChecked: false, //是否是团购宠物  
    groupTitle: "", // 团购标题
    addGroupPriceList: [], //团购价格阶梯
    groupNumberCheck: false, //团购第二次数量校验


    delType: 0, //删除与新增行价格阶梯校验
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    this.setData({
      uploadUrl: UrlPath.Url_Base + UrlPath.Url_UploadFile
    })
    if (options.type == 1) { //编辑发布商品数据
      that.getHasBeenReleasedGoods()
      that.setData({
        buttonType: options.type
      })
    }
    // 获取宠物分类
    this.getSort(function(dataSource) {
      Utils.logInfo("宠物分类列表：===>" + JSON.stringify(dataSource))
      dataSource.root.push({
        petSortName: "猫狗通用",
        petSortNo: -1,
      })
      that.setData({
        petSort: dataSource.root
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

    if (!Utils.checkEmpty(app.globalData.selectItemTypeList)) {
      this.data.itemTypeObj = app.globalData.selectItemTypeList;
      // 拼接 产品分类 文字内容
      // 判断是否显示套餐内容
      this.getItemTypeStr();
      app.globalData.selectItemTypeList = null;
    }

    if (!Utils.checkEmpty(app.globalData.selectItemPackList)) {
      this.data.menuArray = app.globalData.selectItemPackList;
      // 拼接 套餐分类 文字内容
      this.getMenuTypeStr();
      app.globalData.selectItemPackList = null;
    }

  },

  /**
   * 获取套餐分类 文字
   */
  getMenuTypeStr: function () {
    let menuTypeStr = "";
    this.data.menuArray.forEach(item => {
      if (Utils.checkEmpty(menuTypeStr)) {
        menuTypeStr = item.itemPackName;
      } else {
        menuTypeStr = menuTypeStr + "," + item.itemPackName;
      }
    })
    this.setData({
      menu: menuTypeStr
    })
  },

  /**
   * 获取产品分类 文字
   */
  getItemTypeStr: function() {
    let itemTypeStr = "";
    let showMenu = false;
    this.data.itemTypeObj.forEach(item => {
      if (Utils.checkEmpty(itemTypeStr)) {
        itemTypeStr = item.itemTypeName;
      } else {
        itemTypeStr = itemTypeStr + "," + item.itemTypeName;
      }
      if (item.itemTypeName === "套餐") {
        showMenu = true;
      }
    })
    this.setData({
      itemType: itemTypeStr,
      showMenu: showMenu
    })
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
   * 商品名称
   */
  inputGoodsName: function(res) {
    let that = this;
    let goodsName = res.detail.value;
    this.setData({
      itemName: goodsName
    })
  },

  /**
   * 品牌
   */
  brandRangeChange: function(res) {
    let that = this;
    Utils.logInfo("品牌：" + res.detail.value)
    that.setData({
      brandRangeSelect: that.data.brandRange[res.detail.value].itemBrandName,
      brandObj: that.data.brandRange[res.detail.value], //所选品牌对象
    })
  },



  /**
   * 宠物分类
   */
  selectSort: function(res) {
    let that = this;
    let index = res.detail.value;
    this.setData({
      goodsification: that.data.petSort[index].petSortName,
      petSortObj: that.data.petSort[index]
    })
  },

  /**
   * 选择产品类型
   */
  selectItemType: function (res) {
    app.globalData.selectItemTypeList = this.data.itemTypeObj;
    wx.navigateTo({
      url: '../productreleasedetails/itemTypeSelect/index',
    })
  },

  /**
   * 选择套餐分类
   */
  selectItemPack: function (res) {
    app.globalData.selectItemPackList = this.data.menuArray;
    wx.navigateTo({
      url: '../productreleasedetails/itemTypeSelect/menuTypeSelect',
    })
  },

  /**
   * 获得套餐分类
   * @param getSetMenuCallback
   */
  getSetMenu: function(getSetMenuCallback) {
    let that = this;
    let obj = {
      offset: 0,
      limit: 20,
    }
    MallService.getSetMealList(obj,
      function getResultCallback(result) {
        if (Util.checkIsFunction(getSetMenuCallback)) {
          getSetMenuCallback(result.root)

        }
      }
    )
  },

  /**
   * 对应宠物阶段
   */
  itemStageTap: function(res) {
    let value = res.detail.value;
    this.setData({
      itemStage: value
    })
  },

  /**
   * 毛重
   */
  grossWeightTap: function(res) {
    let value = res.detail.value;
    this.setData({
      grossWeight: value
    })
  },

  /**
   * 保质描述
   */
  itemValidityTap: function(res) {
    let value = res.detail.value;
    this.setData({
      itemValidity: value
    })
  },

  /**
   * 品种
   */
  petGenreStrTap: function(res) {
    let value = res.detail.value;
    this.setData({
      petGenreStr: value
    })
  },

  /**
   * 库存数量
   */
  inputQty: function (res) {
    let that = this;
    let qty = res.detail.value;
    if (Utils.checkEmpty(qty)) {
      qty = null;
    } else {
      qty = parseFloat(qty);
    }
    this.setData({
      qty: qty
    })
  },

  /**
   * 零售价
   */
  inputPetRetailPrice: function(res) {
    let that = this;
    let retailPrice = res.detail.value;
    this.setData({
      retailPrice: retailPrice
    })
    this.countCommission();
  },

  /**
   * 市场价
   */
  marketPriceTap: function(res) {
    let marketPrice = res.detail.value;
    this.setData({
      marketPrice: marketPrice
    })
  },

  /**
   * 佣金比例
   */
  commissiontap: function(res) {
    let commissionRatio = res.detail.value;
    this.setData({
      commissionRatio: commissionRatio
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
  countCommission: function() {
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
   * 条码
   */
  barCodetap: function(res) {
    let that = this;
    let barCode = res.detail.value;
    this.setData({
      barCode: barCode
    })
  },

  /**
   * 是否包邮
   */
  goodsChange: function(res) {
    let that = this;
    let isChecked = res.detail.value;
    this.setData({
      isChecked: isChecked
    })
  },

  /**
   * 团购开关
   */
  groupBindChange: function(res) {
    this.setData({
      groupIsChecked: res.detail.value
    })
  },

  /**
   * 输入团购标题
   */
  inputGroupTitle: function(res) {
    this.setData({
      groupTitle: res.detail.value
    })
  },

  /**
   * 输入团购阶梯数量
   */
  inputStepNum: function(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    this.data.addGroupPriceList[index].qty = e.detail.value;
    this.setData({
      addGroupPriceList: this.data.addGroupPriceList
    })
  },

  /**
   * 输入团购阶梯数量 丢失焦点
   */
  lostFocusStepNum: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    if (index>0) {
      if (parseInt(this.data.addGroupPriceList[index].qty) <= parseInt(this.data.addGroupPriceList[index-1].qty)) {
        wx.showToast({
          title: '数量需大于上一阶梯',
          icon:'none'
        })
        this.data.addGroupPriceList[index].qty = null;
        this.setData({
          addGroupPriceList: this.data.addGroupPriceList
        })
      }
    }
  },

  /**
   * 输入阶段价格
   */
  priceInput: function(e) {
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
  tapDeleteGroupPrice: function(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    this.data.addGroupPriceList.splice(index, 1);
    this.setData({
      addGroupPriceList: this.data.addGroupPriceList,
      delType: this.data.addGroupPriceList.length - 1 //显示上一条数据的删除符号校验
    })
  },

  /**
   * 新增团购价格阶梯
   */
  addGroupPrice: function(e) {
    let index = e.currentTarget.dataset.index;
    if (!Util.checkEmpty(this.data.addGroupPriceList)) {
      let lastGroupPrice = this.data.addGroupPriceList[this.data.addGroupPriceList.length - 1];
      if (Util.checkEmpty(lastGroupPrice.qty) || Util.checkEmpty(lastGroupPrice.price)) {
        wx.showToast({
          title: '请补完上一条价格阶梯',
          icon: 'none'
        })
        return;
      }
    }

    let groupPrice = {
      qty: null,
      price: null,
    }
    this.data.addGroupPriceList.push(groupPrice);
    this.setData({
      addGroupPriceList: this.data.addGroupPriceList,
      delType: index
    })
  },

  /**
   * 上传列表图片
   * @param uploadCompleteCallback 列表上传完成
   */
  uploadCompletesert: function(res) {
    let that = this;
    let uploadReturnDataList = res.detail.uploadReturnDataList;
    if (res.detail.uploadImageId == 'cover') {
      that.setData({
        serviceImagePathList: uploadReturnDataList
      })
    } else {
      that.setData({
        imagePathList: uploadReturnDataList
      })
    }
  },

  /**
   * 商品简介
   */
  itemProfileTap: function(res) {
    let that = this;
    let itemProfile = res.detail.value;
    this.setData({
      itemProfile: itemProfile
    })
  },

  /**
   * 描述
   */
  itemDescriptionTap: function(res) {
    let itemDescription = res.detail.value;
    this.setData({
      itemDescription: itemDescription
    })
  },

  /**
   * 返回数据
   */
  callBackDataSubmit: function() {
    let that = this;
    let submit = {
      item: {},
      itemCoverList: [],
      itemGrouponList: [],
    }
    if (this.data.itemNo != null) {
      submit.item.itemNo = that.data.itemNo
    }
    submit.item.business = {
      businessNo: UserService.getBusinessNo()
    }
    if (Util.checkEmpty(this.data.itemName)) {
      this.toast("输入商品名称");
      return null;
    }
    submit.item.itemName = this.data.itemName;

    if (!Util.checkEmpty(this.data.brandRangeSelect)) {
      submit.item.itemBrand = this.data.brandObj;
    } else {
      submit.item.itemBrand = null;
    }

    if (Util.checkEmpty(this.data.goodsification)) {
      this.toast("请选择宠物分类");
      return null;
    }
    submit.item.petSort = this.data.petSortObj;

    if (Util.checkEmpty(this.data.itemTypeObj)) {
      this.toast("请选择产品分类");
      return null;
    }
    submit.item.itemTypes = this.data.itemTypeObj;

    if (Utils.checkEmpty(this.data.qty)) {
      this.toast('请输入库存数量');
      return null;
    }
    submit.item.qty = this.data.qty;

    if (Util.checkEmpty(this.data.retailPrice)) {
      this.toast("请输入零售价");
      return null;
    }
    submit.item.retailPrice = this.data.retailPrice;

    if (Util.checkEmpty(this.data.commissionRatio)) {
      this.toast("请输入佣金比例");
      return null;
    }
    submit.item.commission = this.data.commissionRatio;
    submit.item.commissionAmount = this.data.commission;

    if (Util.checkEmpty(this.data.itemProfile)) {
      this.toast("请输入简介");
      return null;
    }
    submit.item.itemProfile = this.data.itemProfile;

    if (this.data.isChecked == true) {
      submit.item.freeShipping = 1;
    } else {
      submit.item.freeShipping = 0;
    }

    submit.item.barCode = this.data.barCode
    submit.item.groupon = this.data.groupIsChecked ? 1 : 0;

    if (this.data.showMenu) {
      if (Utils.checkEmpty(this.data.menuArray)) {
        this.toast("请选择套餐");
        return null;
      }
      submit.item.itemPacks = this.data.menuArray;
    }


    if (this.data.imagePathList.length <= 0) {
      this.toast("请选择商品图片");
      return null;
    }
    var coverList = [];
    for (var index = 0; index < this.data.imagePathList.length; index++) {
      var imagePath = this.data.imagePathList[index].fileAddress?this.data.imagePathList[index].fileAddress:this.data.imagePathList[index].coverAddress;
      var type = this.data.imagePathList[index].fileTypeEnum?this.data.imagePathList[index].fileTypeEnum:this.data.imagePathList[index].type;
      coverList.push({
        coverAddress: imagePath,
        type: type
      })
    }
    submit.itemCoverList = coverList;

    if (this.data.groupIsChecked && Utils.checkEmpty(this.data.groupTitle)) {
      this.toast("请填写团购标题");
      return null;
    }
    submit.item.groupTitle = this.data.groupTitle;

    if (this.data.groupIsChecked && this.data.addGroupPriceList.length <= 0) {
      this.toast("请填写阶梯价格");
      return null;
    }
    submit.itemGrouponList = this.data.addGroupPriceList;


    return submit;
  },

  toast: function(res) {
    wx.showToast({
      title: res,
      icon: "none"
    })
  },


  /**
   * 发布或编辑
   */
  tapToRelease: function(res) {
    let that = this;
    Utils.logInfo("提交信息==> \n" + JSON.stringify(this.callBackDataSubmit()))
    UserService.isLogin(function isLoginCallback() {
      let commoditiesData = that.callBackDataSubmit();
      if (commoditiesData == null) {
        return;
      } else {
        if (that.data.buttonType == 0) {
          wx.showLoading({
            title: '提交中...',
          })
          CommodityReleaseService.releaseCommodities(commoditiesData, function(dataSorece) {
            Utils.logInfo("提交返回出的数据：===> \n" + JSON.stringify(dataSorece));
            wx.hideLoading();
            if (dataSorece.root == "操作成功") {
              wx.showToast({
                title: '发布成功！',
              })
              setTimeout(
                function timeOut() {
                  wx.navigateBack({

                  })
                },
                1550
              )
            } else {
              wx.showToast({
                title: '发布失败！',
                icon: "none"
              })
            }
          })
        } else {
          that.editBusinessReleaseMall(commoditiesData)
        }
      }
    })
  },

  /**
   * 获得品牌列表
   */
  getBrandInfo: function(getBrandResultCallback) {
    let obj = {
      offset: 0,
      limit: 60
    }
    MallService.getBrandInfo(obj,
      function returnData(data) {
        if (Util.checkIsFunction(getBrandResultCallback)) {
          getBrandResultCallback(data)
        }
      }
    );
  },

  /**
   * 获得宠物分类
   */
  getSort: function(callBackData) {
    PetService.getSort(function(dataSource) {
      if (Util.checkIsFunction(callBackData)) {
        callBackData(dataSource)
      }
    })
  },


  /**
   * 获得商品类型
   */
  getMallType: function(callBack) {
    let obj = {
      offset: 0,
      limit: 50
    }
    MallService.getMallPetType(obj, function(dataSource) {
      callBack(dataSource)
    })
  },


  /**
   * 发布商品拼接数据
   */
  getHasBeenReleasedGoods: function() {
    let that = this;
    let hasBeenReleasedGoods = wx.getStorageSync("businessReleaseMall");
    Utils.logInfo("所要编辑的发布商品==>" + JSON.stringify(hasBeenReleasedGoods));
    this.data.itemTypeObj = hasBeenReleasedGoods.item.itemTypes;
    // 拼接 产品分类 文字内容
    // 判断是否显示套餐内容
    this.getItemTypeStr();
    if (this.data.showMenu) {
      this.data.menuArray = hasBeenReleasedGoods.item.itemPacks;
      this.getMenuTypeStr();
    }
    this.setData({
      itemName: hasBeenReleasedGoods.item.itemName,
      goodsification: hasBeenReleasedGoods.item.petSort.petSortName,
      petSortObj: hasBeenReleasedGoods.item.petSort,
      itemStage: hasBeenReleasedGoods.item.itemStage,
      grossWeight: hasBeenReleasedGoods.item.grossWeight,
      itemValidity: hasBeenReleasedGoods.item.itemValidity,
      petGenreStr: hasBeenReleasedGoods.item.petGenreStr,
      qty: hasBeenReleasedGoods.item.qty,
      retailPrice: hasBeenReleasedGoods.item.retailPrice,
      marketPrice: hasBeenReleasedGoods.item.marketPrice,
      barCode: hasBeenReleasedGoods.item.barCode,
      commissionRatio: hasBeenReleasedGoods.item.commission,
      serviceImagePathList: hasBeenReleasedGoods.itemCoverList,
      itemProfile: hasBeenReleasedGoods.item.itemProfile,
      itemDescription: hasBeenReleasedGoods.item.itemDescription,
      itemNo: hasBeenReleasedGoods.item.itemNo,
      groupIsChecked: hasBeenReleasedGoods.item.groupon,
      groupTitle: hasBeenReleasedGoods.item.groupTitle,
      imagePathList: hasBeenReleasedGoods.itemCoverList,
      addGroupPriceList: hasBeenReleasedGoods.itemGrouponList,
      delType: Utils.checkEmpty(hasBeenReleasedGoods.itemGrouponList)?0: hasBeenReleasedGoods.itemGrouponList.length -1
    })

    

    this.countCommission();

    if (hasBeenReleasedGoods.item.freeShipping == 1) {
      that.setData({
        isChecked: true
      })
    } else {
      that.setData({
        isChecked: false
      })
    }
  },


  /**
   * 编辑商品列表
   */
  editBusinessReleaseMall: function(submitData) {
    let that = this;
    CommodityReleaseService.updateReleaseCommodity(submitData, function(dataSorece) {
      wx.hideLoading({
        success: (res) => {},
      })
      Utils.logInfo("编辑返回数据" + JSON.stringify(dataSorece));
      if (dataSorece.root == "操作成功") {
        wx.showToast({
          title: '编辑成功！',
        })
        setTimeout(
          function timeOut() {
            wx.navigateBack({

            })
          },
          1550
        )
      } else {
        wx.showToast({
          title: '编辑失败！',
          icon: "none"
        })
      }
    })
  }
})