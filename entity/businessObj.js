
function businessFollow(data) {
  let follow = {
    business: {
      businessNo: null     //商家NO
    },
    followBusiness: {
      businessNo: null    //被关注商家no
    },
    pet: {
      petNo: null  //宠物No
    },
    item: {
      itemNo: null  //商品No
    },
    followType: null   //关注类型（1、商家 2、宠物 3、商品）
  }

  if (data.business==null){
    follow.business=null
  }else{
    follow.business.businessNo = data.business.businessNo
  }   

  if (data.followBusiness==null){
    follow.followBusiness=null
  }else{
    follow.followBusiness.businessNo = data.followBusiness.businessNo
  }

  if (data.pet==null){
    follow.pet=null
  }else{
    follow.pet.petNo = data.pet.petNo
  }

  if (data.item == null) {
    follow.item = null
  } else {
    follow.item.itemNo = data.item.itemNo
  }

  if (data.followType)
    follow.followType = data.followType

  return follow;
}


/**
 * 查询收藏列表
 */
function businessFollowList(data){
 let queryFollowParam={
    businessNo:null,
    queryType:null,
    offset:0,
    limit:20
  }

  if (data.businessNo)
    queryFollowParam.businessNo = data.businessNo

  if (data.queryType)
    queryFollowParam.queryType = data.queryType


  if (data.offset)
    queryFollowParam.offset = data.offset


  if (data.limit)
    queryFollowParam.limit = data.limit


  return queryFollowParam;
}

module.exports = {
  businessFollow: businessFollow,
  businessFollowList: businessFollowList
}