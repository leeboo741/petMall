

let shoppingcartList = null;

const SHOPPINGCART_KEY = 'SHOPPINGCART'
const SHOPPINGCART_CHANGE_NOTIFICATION_NAME = "SHOPPINGCART_CHANGE"

const notificationCenter = require("./notificationConter/notificationCenter")
/**
 * 获取购物车缓存数据
 */
function getShoppingcartList() {
  if (this.shoppingcartList == null) {
    try {
      let value = wx.getStorageSync(SHOPPINGCART_KEY);
      if (value == null || value.length <= 0) value = [];
      this.shoppingcartList = value;
      return value;
    } catch (e) {
      wx.showToast({
        title: 'getShoppingcartList error',
        icon: 'none'
      })
      return null;
    }
  } else {
    return this.shoppingcartList;
  }
}

/**
 * 更新购物车本地缓存
 * @param {*} shoppingcartList 
 */
function setShoppingcartList(shoppingcartList) {
  this.shoppingcartList = shoppingcartList;
  this.shoppingcartList.forEach(sectionItem => {
    let selected = false;
    sectionItem.list.forEach(rowItem => {
      if (rowItem.selected == true) {
        selected = true;
      }
    });
    sectionItem.selected = selected;
  });
  setTimeout(function(){
    try {
      wx.setStorageSync(SHOPPINGCART_KEY, shoppingcartList);
    } catch (error) {
      wx.showToast({
        title: 'setShoppingcartList error',
        icon: 'none'
      })
    }
  },0)
  notificationCenter.postNotification(SHOPPINGCART_CHANGE_NOTIFICATION_NAME, this.shoppingcartList);
}

/**
 * 添加进购物车 本地存储
 * @param {object} goodsItemDetail
 * @param {number} count 
 */
function saveGoodsToLocal(goodsItemDetail, count) {
   let shoppingcartList = this.getShoppingcartList();
   let tempCartItem = null;
   shoppingcartList.forEach(cartItem => {
     if (cartItem.business.businessNo == goodsItemDetail.item.business.businessNo) {
      tempCartItem = cartItem
     }
   });
   if (tempCartItem == null) {
    tempCartItem = {
      business: goodsItemDetail.item.business,
      list: [],
    };
    shoppingcartList.push(tempCartItem);
   } 
   let tempGoodsItem = null;
   tempCartItem.list.forEach(goodsItem => {
     if (goodsItem.goods.item.itemNo == goodsItemDetail.item.itemNo) {
       tempGoodsItem = goodsItem
     }
   });
   if (tempGoodsItem == null) {
    tempGoodsItem = {
      goods: goodsItemDetail,
      count: count
    }
    tempCartItem.list.push(tempGoodsItem);
   } else {
     tempGoodsItem.count = count;
   }
   this.setShoppingcartList(shoppingcartList)
}

/**
 * 获取本地购物车中的数量
 * @param {*} goodsItemDetail 
 */
function getLocalCount(goodsItemDetail) {
  let shoppingcartList = this.getShoppingcartList();
  let tempCartItem = null;
  shoppingcartList.forEach(cartItem => {
    if (cartItem.business.businessNo == goodsItemDetail.item.business.businessNo) {
      tempCartItem = cartItem;
    }
  })
  if (tempCartItem == null) {
    return null;
  }
  let tempGoodsItem = null
  tempCartItem.list.forEach(goodsItem => {
    if (goodsItem.goods.item.itemNo == goodsItemDetail.item.itemNo) {
      tempGoodsItem = goodsItem
    }
  })
  if (tempGoodsItem == null) {
    return null;
  }
  return tempGoodsItem.count;
}

/**
 * 更新本地购物车数据
 * @param {*} shoppingcartList 
 */
function updateShoppingcartToLocal(shoppingcartList) {
  this.setShoppingcartList(shoppingcartList);
}

/**
 * 删除选中的商品
 */
function deleteSelectedShoppingcart() {
  let tempShoppingcartList = this.getShoppingcartList();
  for (let i = tempShoppingcartList.length - 1; i >=0; i--) {
    let sectionItem = tempShoppingcartList[i];
    if (sectionItem.selected == true) {
      for (let j = sectionItem.list.length - 1; j >= 0; j--) {
        let rowItem = sectionItem.list[j];
        if (rowItem.selected == true){
          sectionItem.list.splice(j, 1);
        }
      }
      if (sectionItem.list.length <= 0) {
        tempShoppingcartList.splice(i, 1);
      }
    }
  }
  this.setShoppingcartList(tempShoppingcartList);
}

/**
 * 筛选选中的商品
 */
function getSelectedShoppingcart() {
  let selectShoppingcart = null;
  let tempShoppingcartList = this.getShoppingcartList();
  tempShoppingcartList.forEach(sectionItem => {
    if (sectionItem.selected == true) {
      selectShoppingcart = {
        business: sectionItem.business,
        list: []
      };
      sectionItem.list.forEach(rowItem => {
        if (rowItem.selected == true) {
          selectShoppingcart.list.push(rowItem)
        }
      });
    }
  });
  return selectShoppingcart;
}

module.exports = {
  SHOPPINGCART_CHANGE_NOTIFICATION_NAME,
  shoppingcartList,
  getShoppingcartList,
  setShoppingcartList,
  saveGoodsToLocal,
  updateShoppingcartToLocal,
  getLocalCount, 
  deleteSelectedShoppingcart, // 删除已选中的购物车, 订单完成后, 选中的购物车要删除掉
  getSelectedShoppingcart, // 选中已选择的购物车商品
}