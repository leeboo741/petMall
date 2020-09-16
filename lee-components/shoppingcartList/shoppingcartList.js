const shoppingcartManager = require("../../services/shoppingcartManager");
const notificationCenter = require("../../services/notificationConter/notificationCenter");
const { SHOPPINGCART_CHANGE_NOTIFICATION_NAME } = require("../../services/shoppingcartManager");
const app = getApp();
const pagePath = require("../../macros/pagePath");
// components/shoppingcartList/shoppingcartList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: true
    }, // 是否展示
  },

  /**
   * 组件的初始数据
   */
  data: {
    dataSource: null, // 数据源
    selectAll: false, // 是否选中全部
    totalAmount: 0.00, // 总计金额 
    updateCountIntervalIDDict: {}, // 修改数量定时器列表
    paddingTop: null,
  },

  /**
   * 外部样式类
   */
  externalClasses: ["i-class"],

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 点击商家栏 勾选框
     * 选中, 全选商家名下所有商品,取消购物车中其他商家选中状态, 并重新计算总价
     * 取消, 取消商家名下所有商品选中状态, 并重新计算总价
     * @param {*} e 
     */
    tapStoreSelect: function(e) {
      let sectionIndex = e.currentTarget.dataset.section;
      let sectionItem = this.data.dataSource[sectionIndex];
      sectionItem.selected = !(sectionItem.selected==null?false:sectionItem.selected);
      sectionItem.list.forEach(rowItem => {
        rowItem.selected = sectionItem.selected
      });
      if (sectionItem.selected == true) {
        this.data.dataSource.forEach((tempSectionItem,tempIndex) => {
          if (tempIndex != sectionIndex) {
            tempSectionItem.selected = false;
            tempSectionItem.list.forEach(tempRowItem => {
              tempRowItem.selected = false;
            })
          }
        })
      }
      this.setData({
        dataSource: this.data.dataSource,
      })
      this.calculateAmount();
      shoppingcartManager.updateShoppingcartToLocal(this.data.dataSource);
    },

    /**
     * 点击商品栏 勾选框
     * 选中, 判断所属商家是否选中，未选中，提示是否选择当前商家的商品，是继续，否中止
     * 继续 选中当前商家，取消购物车中其他商家和商品的选中状态
     * 取消， 判断所属商家名下是否还有选中商品， 没有， 取消商家选中状态
     * @param {*} e 
     */
    tapGoodsSelected: function(e) {
      let sectionIndex = e.currentTarget.dataset.section;
      let rowIndex = e.currentTarget.dataset.row;
      let sectionItem = this.data.dataSource[sectionIndex];
      let rowItem = sectionItem.list[rowIndex];
      sectionItem.selected = sectionItem.selected==null? false: sectionItem.selected;
      if (sectionItem.selected == false) {
        sectionItem.selected = true;
        rowItem.selected = true;
        this.data.dataSource.forEach((tempSectionItem, tempSectionIndex) => {
          if (tempSectionIndex != sectionIndex) {
            tempSectionItem.selected = false;
            tempSectionItem.list.forEach(tempRowItem => {
              tempRowItem.selected = false;
            });
          }
        })
      } else {
        rowItem.selected = !(rowItem.selected==null?false:rowItem.selected);
        if (rowItem.selected == false) {
          let allUnSelected = true;
          sectionItem.list.forEach(tempRowItem => {
            if (tempRowItem.selected == true) {
              allUnSelected = false;
            }
          })
          sectionItem.selected = !allUnSelected;
        }
      }
      this.setData({
        dataSource: this.data.dataSource,
      })
      this.calculateAmount();
      shoppingcartManager.updateShoppingcartToLocal(this.data.dataSource);
    },

    /**
     * 删除商品
     * @param {*} e 
     */
    deleteGoods: function(e) {
      let that = this;
      let sectionIndex = e.currentTarget.dataset.section;
      let rowIndex = e.currentTarget.dataset.row;
      let sectionItem = this.data.dataSource[sectionIndex];
      let rowItem = sectionItem.list[rowIndex];
      wx.showModal({
        title: '是否删除该商品',
        content: '确定从购物车删除商品: ' + rowItem.goods.item.itemName,
        confirmColor: '#ee2c2c',
        confirmText:'删除',
        success(res) {
          if (res.confirm) {
            sectionItem.list.splice(rowIndex, 1);
            if (sectionItem.list.length <= 0) {
              that.data.dataSource.splice(sectionIndex, 1);
            }
            that.setData({
              dataSource: that.data.dataSource
            })
            that.calculateAmount();
            shoppingcartManager.updateShoppingcartToLocal(that.data.dataSource);
          }
        }
      })
    },

    /**
     * 修改商品数量
     * 重新计算总价
     * @param {*} e 
     */
    changeCount: function(e) {
      let sectionIndex = e.currentTarget.dataset.section;
      let rowIndex = e.currentTarget.dataset.row;
      let rowItem = this.data.dataSource[sectionIndex].list[rowIndex];
      rowItem.count = e.detail.count;
      this.calculateAmount();
      shoppingcartManager.updateShoppingcartToLocal(this.data.dataSource);
    },

    /**
     * 计算总价
     */
    calculateAmount: function(){
      let amount = 0;
      this.data.dataSource.forEach(tempSectionItem => {
        tempSectionItem.list.forEach(tempRowItem => {
          if (tempRowItem.selected == true) {
            amount += tempRowItem.count * tempRowItem.goods.item.retailPrice;
          }
        });
      });
      amount = amount.toFixed(2);
      this.setData({
        totalAmount: amount
      })
    },

    /**
     * 点击商家
     * 跳转商家详情页面
     * @param {*} e 
     */
    tapStore: function(e) {
      let sectionIndex = e.currentTarget.dataset.section;
      let sectionItem = this.data.dataSource[sectionIndex];
      wx.navigateTo({
        url: pagePath.Page_Store_StoreInforMation + '?storeno=' + sectionItem.business.businessNo
      })
    },

    /**
     * 点击商品
     * 跳转商品详情页面
     * @param {*} e 
     */
    tapGoods: function(e) {
      let sectionIndex = e.currentTarget.dataset.section;
      let rowIndex = e.currentTarget.dataset.row;
      let sectionItem = this.data.dataSource[sectionIndex];
      let rowItem = sectionItem.list[rowIndex]
      wx.navigateTo({
        url: pagePath.Page_Mall_CommodityInformation + "?itemno=" + rowItem.goods.item.itemNo
      })
    },

    /**
     * 空页面 前去购买按钮点击
     * 跳转商城首页
     */
    tapToShop: function(){
      wx.switchTab({
        url: pagePath.Page_Mall_Index,
        success: (res) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
    },

    /**
     * 提交订单
     * 所有 有被选中的商品的商家 及其 名下所有选中的商品
     */
    tapBuy: function() {
      let selectShoppingcartItem = shoppingcartManager.getSelectedShoppingcart();
      if (selectShoppingcartItem==null) {
        wx.showToast({
          title: '请选择商品',
          icon: 'none'
        })
        return;
      } 
      app.globalData.selectedShoppingcart = selectShoppingcartItem;
      wx.navigateTo({
        url: '/mallsubcontracting/pages/shoppingcart/itemShoppingpayment/itemShoppingpayment',
      })
    }
  },
  
  created: function () {
    // 在组件实例刚刚被创建时执行
  },
  /**
   * 组件所在页面的生命周期
   */
  pageLifetimes: {
    show: function () {
      // 页面被展示
      this.setData({
        paddingTop: app.globalData.naviHeight,
        dataSource: shoppingcartManager.getShoppingcartList()
      })
      this.calculateAmount();
      let that = this;
      notificationCenter.addNormalNotificationObserver(SHOPPINGCART_CHANGE_NOTIFICATION_NAME, function(info) {
        that.setData({
          dataSource: shoppingcartManager.getShoppingcartList()
        })
      },this)
    },
    hide: function () {
      // 页面被隐藏
      notificationCenter.removeNotificationObserver(SHOPPINGCART_CHANGE_NOTIFICATION_NAME, this);
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
})
