/**
 * 优惠券对象
 */
class CouponEntity{
  constructor(obj){
    this.couponTypeID = obj.couponTypeID; // 优惠券 id
    this.title = obj.title; // 优惠券 标题
    this.preferentialType = obj.preferentialType; // 优惠券类型 1 折扣 2 抵用 3 领用
    this.discount = obj.discount; // 折扣率
    this.value = obj.value; // 抵用金额
    this.receiveId = obj.receiveId; // 可领用商品/服务 id
    this.receiveNum = obj.receiveNum; // 可领用商品/服务 数量
    this.couponCredit = obj.couponCredit; // 兑换积分
    this.expireNotice = obj.expireNotice; // 是否 提前4天提示过期
    this.atLeast = obj.atLeast; // 是否设置最低 金额
    this.leastAmount = obj.leastAmount; // 最低金额 
    this.forbidPreference = obj.forbidPreference; // 是否仅原价购买商品时可用
    this.quota = obj.quota; // 没人限领数量
    this.rangeType = obj.rangeType; // 适用商品/服务 范围 PART ALL
    this.businessType = obj.businessType; // 适用商家范围 PART ALL
    this.specifyItemIds = obj.specifyItemIds; // 指定可用商品id 逗号分隔
    this.specifyServiceIds = obj.specifyServiceIds; // 指定可用服务id 逗号分隔
    this.specifyBusinessIds = obj.specifyBusinessIds; // 指定可用商家id 逗号分隔

    this.floatDiscount = (this.discount / 10).toFixed(1);
    this.rangeStr = this.rangeType == 'ALL' ? '全部商品可用' : '部分商品可用';
    this.businessStr = this.businessType == 'ALL' ? '全部商家可用' : '部分商家可用';
  }
}

/**
 * 获取优惠券列表
 * @param {array<object>} objList 
 */
function getCouponListByObjList(objList) {
  let list = [];
  objList.forEach(item => {
    let coupon = new CouponEntity(item);
    list.push(coupon);
  });
  return list;
}


module.exports = {
  CouponEntity, // 优惠券对象
  getCouponListByObjList,  // 获取优惠券对象列表
}