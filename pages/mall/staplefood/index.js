// pages/mall/ff/index.js

const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const app = getApp();

const Page_path = require("../../../macros/pagePath.js");
const MallService = require("../../../services/mallService.js");
const Util = require("../../../utils/util.js");
const Utils = require("../../../utils/util")
const UserService=require("../../../services/userService.js");
const ShoppingCartService=require("../../../services/shoppingCartService.js");
const PetService=require("../../../services/petService.js");

const Limit = 20;

const ShareManager = require("../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listType: null, // 列表类型 group是团购商品  别的都是普通商品
    pageTitle: "商城", 

    selectClassifyNo: null, // 选中的品种
    selectTypeNo: null, // 选中的类型
    selectBrandNo: null, // 选中的品牌

    offset: 0, // 
    loadState: LoadFootItemState.Loading_State_Empty, //底部状态

    pageHeight: null,
    //是否隐藏蒙版
    maskVarietiesShow: true,
    maskFavoritegrainShow: true,
    maskbrandShow: true,
    titleSelectIndex: 1, //默认选择
    titleSelectList: [{
        selectInfo: "品种",
        showSelect: true, //icon 切换
        selectObject: null,
      },
      {
        selectInfo: "类型",
        showSelect: true,
        selectObject: null,
      },
      {
        selectInfo: "品牌",
        showSelect: true,
        selectObject: null,
      }
    ],
    dropDownMessageData: [], // 下拉数据
    varieties: [], //品种下拉信息
    favoriteGrain: [], //类型下拉信息
    brand: [], //品牌下拉信息
    showDropDownMessage: true, //是隐藏下拉框信息

    itemList: [], // 商品列表
    showShopMask: 0, //显示添加数量信息
    shopCarinf: {},  //购物车添加信息
    goodcount: 0,  //添加商品的数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this;
    that.setData({
      listType: options.listtype,
      pageHeight: app.globalData.pageHeight,
      selectClassifyNo: options.classifyno,
      selectTypeNo: options.typeno,
      selectBrandNo: options.brandno
    })
    if (this.data.listType == "group") {
      that.setData({
        pageTitle: "团购商城"
      })
    }

    wx.showLoading({
      title: '请稍等...',
    })
    // 查询 品种 classify 下拉列表
    this.getVarietiesInfo(
      function getClassifyResultCallback(classifyData) {
        that.setData({
          varieties: classifyData.root
        })
        // 查询 类型 下拉列表
        that.getItemType(function (typeData) {
          that.setData({
            favoriteGrain: typeData
          })

          // 查询 品牌 下拉列表
          that.getItemBrand(function (brandData) {
            that.setData({
              brand: brandData
            })
            that.initSelect();
          })

        })
      }
    );
   
  },

  /**
   * 初始化选择框
   */
  initSelect: function() {
    let that = this;
    if (!Util.checkEmpty(this.data.selectClassifyNo) && !Util.checkEmpty(this.data.varieties)) {
      for (let index = 0; index < that.data.varieties.length; index++) {
        let tempClassify = that.data.varieties[index];
        if (tempClassify.itemClassifyNo == that.data.selectClassifyNo) {
          let titleSelectOne = "titleSelectList[" + 0 + "].selectInfo";
          let objSelectOne = "titleSelectList[" + 0 + "].selectObject";
          that.setData({
            [titleSelectOne]: tempClassify.itemClassifyName,
            [objSelectOne]: tempClassify
          })
        }
      }
    }
    if (!Util.checkEmpty(this.data.selectTypeNo) && !Util.checkEmpty(this.data.favoriteGrain)) {
      for (let index = 0; index < that.data.favoriteGrain.length; index++) {
        let tempType = that.data.favoriteGrain[index];
        if (tempType.itemTypeNo == that.data.selectTypeNo) {
          let titleSelectTwo = "titleSelectList[" + 1 + "].selectInfo";
          let objSelectOne = "titleSelectList[" + 1 + "].selectObject";
          that.setData({
            [titleSelectTwo]: tempType.itemTypeName,
            [objSelectOne]: tempType
          })
        }     
      }
    }
    if (!Util.checkEmpty(this.data.selectBrandNo) && !Util.checkEmpty(this.data.brand)) {
      for (let index = 0; index < that.data.brand.length; index++) {
        let tempBrand = that.data.brand[index];
        if (tempBrand.itemBrandNo == that.data.selectBrandNo) {
          let titleSelectThree = "titleSelectList[" + 2 + "].selectInfo";
          let objSelectOne = "titleSelectList[" + 2 + "].selectObject";
          that.setData({
            [titleSelectThree]: tempBrand.itemBrandName,
            [objSelectOne]: tempBrand
          })
        }
      }
    }
    wx.hideLoading();
    wx.startPullDownRefresh();

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
    let that = this;
    this.data.offset = 0;
    this.getItemList(this.data.offset,
      function getItemListCallback(data) {
        that.setData({
          itemList: data,
        })
        that.data.offset = that.data.offset + Limit;
        if (data.length >= Limit) {
          that.setData({
            loadState: LoadFootItemState.Loading_State_Normal
          })
        } else if (data.length < Limit && data.length > 0) {
          that.setData({
            loadState: LoadFootItemState.Loading_State_End
          })
        } else {
          that.setData({
            loadState: LoadFootItemState.Loading_State_Empty
          })
        }
        wx.stopPullDownRefresh();
      }
    )
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.loadState == LoadFootItemState.Loading_State_End
      || this.data.loadState == LoadFootItemState.Loading_State_Loading) {
      return;
    }
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    let that = this;
    this.getItemList(this.data.offset,
      function getItemListCallback(data) {
        let tempList = that.data.itemList.concat(data);
        that.setData({
          itemList: tempList
        })
        that.data.offset = that.data.offset + Limit;
        if (data.length >= Limit) {
          that.setData({
            loadState: LoadFootItemState.Loading_State_Normal
          })
        } else {
          that.setData({
            loadState: LoadFootItemState.Loading_State_End
          })
        }
      }
    )
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },

  /**
   * 头部下拉选择显示
   */
  titleSelectTap: function(e) {
    let that = this;
    var selectType = e.currentTarget.dataset.index; //下标
    var upone = "titleSelectList[" + 0 + "].showSelect"; //数组进行字符串拼接 下拉提示信息1
    var uptwo = "titleSelectList[" + 1 + "].showSelect"; //下拉提示信息2
    var upthree = "titleSelectList[" + 2 + "].showSelect"; //下拉提示信息3
    this.setData({
      titleSelectIndex: selectType,
    })

    if (selectType == 0) { //判断类型显示各个属性值
      that.setData({
        [upone]: !that.data.titleSelectList[0].showSelect, //替换数组里的某个属性
        [uptwo]: true, //下拉箭头方向
        [upthree]: true, //下拉箭头方向
        dropDownMessageData: that.data.varieties, //数据切换
        maskVarietiesShow: !that.data.maskVarietiesShow, //蒙版重复点击
        maskFavoritegrainShow: true, //其他两块蒙版是否隐藏
        maskbrandShow: true //其他两块蒙版是否隐藏
      })
    }

    if (selectType == 1) {
      that.setData({
        [uptwo]: !that.data.titleSelectList[1].showSelect,
        [upone]: true,
        [upthree]: true,
        dropDownMessageData: that.data.favoriteGrain,
        maskFavoritegrainShow: !that.data.maskFavoritegrainShow,
        maskVarietiesShow: true,
        maskbrandShow: true
      })
    }

    if (selectType == 2) {
      that.setData({
        [upthree]: !that.data.titleSelectList[2].showSelect,
        [upone]: true,
        [uptwo]: true,
        dropDownMessageData: that.data.brand,
        maskbrandShow: !that.data.maskbrandShow,
        maskFavoritegrainShow: true,
        maskVarietiesShow: true
      })
    }

    if (that.data.titleSelectList[selectType].showSelect == true) { //下拉信息显示
      that.setData({
        showDropDownMessage: true
      })
    } else {
      that.setData({
        showDropDownMessage: false
      })
    }
  },

  /**
   * 点击蒙版----------------------------------
   */
  maskVarietiesTap: function() {
    var upone = "titleSelectList[" + 0 + "].showSelect"; //数组进行字符串拼接
    let that = this;
    if (that.data.maskVarietiesShow == false) {
      that.setData({
        maskVarietiesShow: true, //蒙版是否隐藏
        showDropDownMessage: true, //下拉信息
        [upone]: true //下拉箭头是上还是下
      })
    }
  },

  maskFavoritegrainTap: function() {
    var uptwo = "titleSelectList[" + 1 + "].showSelect";
    let that = this;
    if (that.data.maskFavoritegrainShow == false) {
      that.setData({
        maskFavoritegrainShow: true,
        showDropDownMessage: true,
        [uptwo]: true
      })
    }
  },

  maskbrandTap: function() {
    var upthree = "titleSelectList[" + 2 + "].showSelect";
    let that = this;
    if (that.data.maskbrandShow == false) {
      that.setData({
        maskbrandShow: true,
        showDropDownMessage: true,
        [upthree]: true
      })
    }
  },
  /**
   * ------------------------------------
   */


  /**
   * 点击下拉框选择信息
   */
  selectDropDownMessageDataTap: function(e) {
    var selectIndex = e.currentTarget.dataset.index;
    if (this.data.titleSelectIndex == 0) {
      let titleSelectOne = "titleSelectList[" + 0 + "].selectInfo";
      let objSelectOne = "titleSelectList[" + 0 + "].selectObject";
      let upOne = "titleSelectList[" + 0 + "].showSelect"; //数组进行字符串拼接
      if (selectIndex < 0) {
        this.setData({
          [titleSelectOne]: "品种",
          [objSelectOne]: null,
          maskVarietiesShow: true, //蒙版是否隐藏
          showDropDownMessage: true, //下拉信息
          [upOne]: true //下拉箭头是上还是下
        })
      } else {
        let tempItemClassify = this.data.varieties[selectIndex];
        this.setData({
          [titleSelectOne]: tempItemClassify.itemClassifyName,
          [objSelectOne]: tempItemClassify,
          maskVarietiesShow: true, //蒙版是否隐藏
          showDropDownMessage: true, //下拉信息
          [upOne]: true //下拉箭头是上还是下
        })
      }
    } else if (this.data.titleSelectIndex == 1) {
      let titleSelectTwo = "titleSelectList[" + 1 + "].selectInfo";
      let objSelectTwo = "titleSelectList[" + 1 + "].selectObject";
      let upTwo = "titleSelectList[" + 1 + "].showSelect"; //数组进行字符串拼接
      if (selectIndex < 0) {
        this.setData({
          [titleSelectTwo]: "类型",
          [objSelectTwo]: null,
          maskFavoritegrainShow: true,
          showDropDownMessage: true,
          [upTwo]: true //下拉箭头是上还是下
        })
      } else {
        let tempItemType = this.data.favoriteGrain[selectIndex];
        this.setData({
          [titleSelectTwo]: tempItemType.itemTypeName,
          [objSelectTwo]: tempItemType,
          maskFavoritegrainShow: true,
          showDropDownMessage: true,
          [upTwo]: true //下拉箭头是上还是下
        })
      }
    } else if (this.data.titleSelectIndex == 2) {
      let titleSelectThree = "titleSelectList[" + 2 + "].selectInfo";
      let objSelectThree = "titleSelectList[" + 2 + "].selectObject";
      let upThree = "titleSelectList[" + 2 + "].showSelect"; //数组进行字符串拼接
      if (selectIndex < 0) {
        this.setData({
          [titleSelectThree]: "品牌",
          [objSelectThree]: null,
          maskbrandShow: true,
          showDropDownMessage: true,
          [upThree]: true //下拉箭头是上还是下
        })
      } else {
        let tempItemBrand = this.data.brand[selectIndex];
        this.setData({
          [titleSelectThree]: tempItemBrand.itemBrandName,
          [objSelectThree]: tempItemBrand,
          maskbrandShow: true,
          showDropDownMessage: true,
          [upThree]: true //下拉箭头是上还是下
        })
      }
    }
    wx.startPullDownRefresh();
  },

  /**
   * 点击商品消息
   */
  tapNotice: function(e) {
    const tempItem = this.data.itemList[e.currentTarget.dataset.index].item;
    wx.navigateTo({
      url: Page_path.Page_Mall_CommodityInformation + "?itemno=" + tempItem.itemNo
    })
  },

  /**
   * 点击商品详情
   */
  commodityInforMationTap: function(e) {
    wx.navigateTo({
      url: Page_path.Page_Mall_CommodityInformation + "?itemno=" + e.currentTarget.dataset.itemno
    })
  },

  /**
   * 请求类型下拉信息
   * @param getTypeResultCallback
   */
  getPetsTypeInfo: function (getTypeResultCallback) {
    let that = this;
    MallService.getMallPetType("", "", 
      function returnData(data) {
        if (Util.checkIsFunction(getTypeResultCallback)) {
          getTypeResultCallback(data)
        }
      }
    );
  },

  /**
   * 请求品牌下拉信息
   * @param getBrandResultCallback
   */
  getPesBrandInfo: function (getBrandResultCallback) {
    let that = this;
    let obj = {
      offset: 0,
      limit: 30
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
   * 请求品种下拉品种信息
   * @param getClassifyResultCallback
   */
  getVarietiesInfo: function (getClassifyResultCallback) {
    let that = this;
    PetService.getSort(function returnData(data) {
        if (Util.checkIsFunction(getClassifyResultCallback)) {
          getClassifyResultCallback(data)
        }
      }
    );
  },

  /**
   * 获得类型
   */
  getItemType:function(callBack){
    let obj={
      offset:0,
      limit:30
    }
    MallService.getMallPetType(obj,function(typeData){
      Utils.logInfo("类型" + JSON.stringify(typeData));
      callBack(typeData)
    })
  },

  /**
   * 获得品牌
   */
  getItemBrand: function (callBack){
    let obj = {
      offset: 0,
      limit: 30
    }
    MallService.getBrandInfo(obj, function (brandData) {
      Utils.logInfo("品牌"+ JSON.stringify(brandData));
      callBack(brandData)
    })
  },

  /**
   * 获取商品列表
   * @param offset
   * @param getItemListCallback
   */
  getItemList: function(offset, getItemListCallback) {
    let that = this;
    let param = {
      offset: offset,
      limit: Limit,
      itemState: 1,
      petSortNo: "",
      itemTypeNo: "",
      itemBrandNo: "",
    }
    if (!Util.checkEmpty(this.data.titleSelectList[0].selectObject)) {
      param.petSortNo = this.data.titleSelectList[0].selectObject.petSortNo;
    }
    if (!Util.checkEmpty(this.data.titleSelectList[1].selectObject)) {
      param.itemTypeNo = this.data.titleSelectList[1].selectObject.itemTypeNo;
    }
    if (!Util.checkEmpty(this.data.titleSelectList[2].selectObject)) {
      param.itemBrandNo = this.data.titleSelectList[2].selectObject.itemBrandNo;
    }
    if (this.data.listType == 'group') {
      MallService.getGroupItemList(param, function getResultCallback(result) {
        if (Util.checkIsFunction(getItemListCallback)) {
          getItemListCallback(result.root)
        }
      })
    } else {
      MallService.getItemList(param,
        function getResultCallback(result) {
          if (Util.checkIsFunction(getItemListCallback)) {
            getItemListCallback(result.root)
          }
        }
      )
    }
  },
  
  /**
   * 加入购物车
   */
  addShopCatTap: function (res) {
    // Utils.logInfo(JSON.stringify(res))
    let that = this;
    UserService.isLogin(function isLoginCallback(){
      that.setData({
        goodcount: 0
      });
      let shopCarinf = {};
      let info = res.currentTarget.dataset.shopinfo
      shopCarinf.image = info.coverImg;
      shopCarinf.itemName = info.itemName;
      shopCarinf.itemPrice = info.retailPrice;
      shopCarinf.itemNo = info.itemNo;
      that.setData({
        showShopMask: 1,
        shopCarinf: shopCarinf
      })
    },null)
  },

  /**
   * 进店
   */
  enterShopTap: function (res) {
    wx.navigateTo({
      url: "../../../oldstore/pages/storeinformation/index?storeno=" + res.currentTarget.dataset.businessno+"&showtype=1"
    })
  },

  /**
   * 是否显示添加数量
   */
  showShopMask: function () {
    this.setData({
      showShopMask: 0
    })
  },
  /**
   * 用户点击商品减1
   */
  subtracttap: function (e) {
    var index = e.target.dataset.index;
    var count = this.data.goodcount;
    if (count <= 1) {
      return;
    } else {
      count--;
      this.setData({
        goodcount: count
      });
    }
  },

  /**
   * 用户点击商品加1
   */
  addtap: function (e) {
    var index = e.target.dataset.index;
    var count = this.data.goodcount;
    count++;
    this.setData({
      goodcount: count
    });
  },

  /**
   * 输入框
   */
  shoppingCartinput:function(e){
    Utils.logInfo(JSON.stringify(e));
    let goodcount = e.detail.value;
    this.setData({
      goodcount: goodcount
    })
  },

  /**
   * 点击确定 
   * getCustomerNo //买家no
   */
  determineTap: function () {
    let that = this;
    UserService.isLogin(function isLoginCallback(){
      let businessNo = UserService.getBusinessNo(); //买家id
      let qty = that.data.goodcount;  //添加数量
      let goodsNo = that.data.shopCarinf.itemNo; //宠物id
      let goodsType = 1; //添加购物车商品

      if (qty == 0) {
        wx.showToast({
          title: '请添加数量！',
          icon: "none"
        })
        return;
      }

      Utils.logInfo(businessNo + "---" + qty + "---" + "---" + goodsNo + "---" + goodsType);
      ShoppingCartService.addShoppingCart(qty, goodsNo, businessNo, goodsType, function callBakc(dataSource) {
        if (dataSource.root > 0) {
          wx.showToast({
            title: '添加成功！',
            icon: "success"
          })
        } else {
          wx.showToast({
            title: '添加失败！',
            icon: "none"
          })
        }
      })
      that.showShopMask();
    })
  }
})