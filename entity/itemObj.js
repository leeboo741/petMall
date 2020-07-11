function itemObj(objData){   /**商品对象 */
  item={
    itemName: null,    //商品名称
    itemProfile: null, //商品简介
    petSort: { //宠物分类
      petSortNo: null,   //宠物分类主键
    },
    itemType: {  //商品类型
      itemTypeNo: null,  //类别主键
    },
    itemBrand: { //商品品牌
      itemBrandNo: null, //品牌主键
    },
    itemPack: {  //套餐分类
      itemPackNo: null,  //套餐主键
    },
    business:{  //商家
      businessNo:null,  //商家主键
    },
    itemStage: null, //宠粮对应宠物阶段
    grossWeight:null, //毛重
    itemValidity: null,  //保质
    petGenreStr: null, //品种
    retailPrice: null, //零售价
    marketPrice:null, //市场价
    commission:null,  //佣金比例
    coverImg:null,  //封面
    freeShipping:null,  //是否包邮   
  }
}


module.exports = {
  itemObj: itemObj,
}