// pages/shopcart/shopcart.js
const ShoppingCartService=require("../../../services/shoppingCartService.js");
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const UserService=require("../../../services/userService.js");
const PageSize = 20;
const ShareManager = require("../../../services/shareService");
const Utils = require("../../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    'goodList': [
      
    ],
    'checkAll': false,
    'totalCount': 0,
    'totalPrice': 0,
    administration:false,//管理 
    selectInfo:[],  //所选择
    loadState: LoadFootItemState.Loading_State_Empty, // 底部状态
    start:0,  //页码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    UserService.isLogin(function isLoginCallback(){
      wx.startPullDownRefresh();
    }, null);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.calculateTotal();
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this;
    UserService.isLogin(function isLogin(){
      ShoppingCartService.queryShoppingCart(UserService.getBusinessNo(), 0, PageSize, function callBack(dataSource) {
        that.setData({
          goodList: dataSource
        })
        that.data.start = that.data.start + PageSize;
        if (dataSource.length >= PageSize) {
          that.setData({
            loadState: LoadFootItemState.Loading_State_Normal
          })
        } else if (dataSource.length < PageSize && dataSource.length > 0) {
          that.setData({
            loadState: LoadFootItemState.Loading_State_End
          })
        } else {
          that.setData({
            loadState: LoadFootItemState.Loading_State_Empty
          })
        }
        wx.stopPullDownRefresh();
      })
    }, function notLoginCallback() {
      wx.stopPullDownRefresh();
    })
    
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
    UserService.isLogin(function isLoginCallback() {
      ShoppingCartService.queryShoppingCart(UserService.getBusinessNo(), that.data.start, PageSize, function callBack(dataSource) {
        let goodList = that.data.goodList.concat(dataSource);
        that.setData({
          goodList: goodList
        })
        that.data.start = that.data.start + PageSize;
        if (dataSource.length >= PageSize) {
          that.setData({
            loadState: LoadFootItemState.Loading_State_Normal
          })
        } else {
          that.setData({
            loadState: LoadFootItemState.Loading_State_End
          })
        }
      })
    }, function notLoginCallback(){
      that.setData({
        loadState: LoadFootItemState.Loading_State_Normal
      })
    })
    wx.stopPullDownRefresh();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },

  /**
   * 计算商品总数
   */
  calculateTotal: function () {
    var goodList = this.data.goodList;
    var totalCount = 0;
    var totalPrice = 0;
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      if (good.checked) {
        totalCount += good.qty;
        totalPrice += good.qty * good.goodsPrice;
      }
    }
    totalPrice = totalPrice.toFixed(2);
    this.setData({
      'totalCount': totalCount,
      'totalPrice': totalPrice
    })
  },

  /**
   * 用户点击商品减1
   */
  subtracttap: function (e) {
    var index = e.target.dataset.index;
    var goodsType = e.target.dataset.goodstype;
    var goodList = this.data.goodList;
    var goodsType = e.target.dataset.goodstype;
    var businessNo = e.target.dataset.businessno;
    var goodsNo = e.target.dataset.goodsno;
    var qty = goodList[index].qty;
    if (qty <= 1) {
      return;
    } else {
      goodList[index].qty--;
      let goodsCount = goodList[index].qty;
      this.setData({
        'goodList': goodList
      });
      this.calculateTotal();
      this.updateShoppingCartByqty(goodsCount,goodsType, businessNo, goodsNo);
    }
  },

  /**
   * 用户点击商品加1
   */
  addtap: function (e) {
    var index = e.target.dataset.index;
    var goodList = this.data.goodList;
    var goodsType = e.target.dataset.goodstype;
    var businessNo = e.target.dataset.businessno;
    var goodsNo = e.target.dataset.goodsno;
    
    var qty = goodList[index].qty;
    goodList[index].qty++;
    let goodsCount = goodList[index].qty;
    this.setData({
      'goodList': goodList
    });
    this.calculateTotal();
    this.updateShoppingCartByqty(goodsCount,goodsType, businessNo, goodsNo);
    
  },

  /**
   * 用户选择购物车商品
   */
  checkboxChange: function (e) {
    Utils.logInfo('checkbox发生change事件，携带value值为：', e.detail.value);
    Utils.logInfo(JSON.stringify(e));
    var checkboxItems = this.data.goodList;
    var values = e.detail.value;
    for (var i = 0; i < checkboxItems.length; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0; j < values.length; ++j) {
        if (i == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    var checkAll = false;
    if (checkboxItems.length == values.length) {
      checkAll = true;
    }

    this.setData({
      'goodList': checkboxItems,
      'checkAll': checkAll,
       selectInfo: values
    });
    this.calculateTotal();
  },

  /**
   * 用户点击全选
   */
  selectalltap: function (e) {
    Utils.logInfo('用户点击全选，携带value值为：', e.detail.value);
    var value = e.detail.value;
    var checkAll = false;
    if (value && value[0]) {
      checkAll = true;
    }

    var goodList = this.data.goodList;
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      good['checked'] = checkAll;
    }

    this.setData({
      'checkAll': checkAll,
      'goodList': goodList,
    });
    this.calculateTotal();
  },

  /**
   * 管理购物车
   */
  administrationTap:function(){
    let that=this;
    this.setData({
      administration:!that.data.administration
    })
  },

  /**
   * 删除购物车
   */
  delteShopTap:function(){  
    let that=this;
    if (this.data.totalCount<=0){
        return ;
    }

    let selects=[];
    if (this.data.checkAll==true){
        that.data.goodList.forEach(function (item, index) {  
          let selectInfose = {}
          selectInfose.businessNo = item.businessNo;
          selectInfose.goodsNo = item.goodsNo;
          selectInfose.goodsType = item.goodsType;
          selects.push(selectInfose);
        })
    }else{  
        that.data.goodList.forEach(function(item,index){  
          for (let i = 0; i <= that.data.selectInfo.length; i++) {
            Utils.logInfo(that.data.selectInfo[i]);
            let goodsIndex = parseInt(that.data.selectInfo[i]);
            if (goodsIndex==index){
              let selectInfose = {}
              selectInfose.businessNo = item.businessNo;
              selectInfose.goodsNo = item.goodsNo;
              selectInfose.goodsType = item.goodsType;
              selects.push(selectInfose);
              }
            }
        }) 
   }
    wx.showModal({
      title: '提示',
      content: '您确定要删除吗？',
      success(res) {
        if (res.confirm) {
          ShoppingCartService.delShoppingCart(selects, function (dataSource) {
            Utils.logInfo(JSON.stringify(dataSource));
            if (dataSource.root == 10000) {
              wx.showToast({
                title: '删除成功！',
              })
              that.setData({
                totalCount:0,
                checkAll:false
              })
              that.onLoad();
            } else {
              wx.showToast({
                title: '删除失败！',
                icon:"none"
              })
            }
          })
        } else if (res.cancel) {
          Utils.logInfo('用户点击取消')
        }
      }
    })

  },

  /**
   * 修改添加数量
   */
  updateShoppingCartByqty: function (goodsCount,goodsType, businessNo, goodsNo){
    let that=this;
    ShoppingCartService.updateShoppingCart(goodsCount, goodsType, businessNo, goodsNo,
    function(dataSource){})
  }


})