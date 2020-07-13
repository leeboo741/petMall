
const Config = require("./config");
const config = require("./config");

let Url_Base;
if (Config.ENV_CURRENT == Config.ENV_DEV) {
  Url_Base = "http://192.168.3.111:7070"; // ---- 祥林
  // Url_Base = "http://192.168.3.233:7070"; // ---- 胡
} else if (config.ENV_CURRENT == config.ENV_RELEASE) {
  Url_Base = "https://market.taochonghui.com";
} else {
  Url_Base = "https://market.taochonghui.com";
}


const Url_Login = "/user"; // 登陆
const Url_Decode = "/login"; // 登陆
const Url_Register = "/register"; // 注册
const Url_GetCode = "/business/VerificationCode"; // 获取短信验证码
const Url_Auth = "/api/business/auth"; // 商家认证
const Url_Auth_ByAuthNo = "/api/business/auth/"; //根据单据编号查询

const Url_LoginBusiness = "/api/business/detail/"; // 转换卖家身份
const Url_Search = "/api/query/"; // 搜索接口

const Url_TotalMonth = "/business/payFlow/totalMonth"; //本月交易额

const Url_balance = "/api/balance/"; //查询用户余额 

const Url_BusinessFlow = "/api/business/flow"; //商家流水

const Url_Withdraw = "/api/withdraw"; //商家提现
/**
 * ----商城
 */
const Url_ItemShowTypeInfo = "/item/vo"; //商城页面数据显示（主粮零食等..）
const Url_ItemType = "/api/item/type/list"; //宠粮类型查询
const Url_Item_Brand = "/api/item/brand/list"; //粮宠品牌
const Url_Item_Classify = "/item/Classify"; //宠粮分类
const Url_Item_SetMeal = "/api/item/pack/list"; // 查询商品套餐分类
const Url_Item_Detail = "/api/item/detail/"; // 商品详情
const Url_Item_List = "/api/item/list"; // 查询商品列表
const Url_Item_Group = "/api/item/groupon/list"; // 查询团购商品列表


//商品评价
const Url_Item_More_Evaluate = "/api/item/appraise/list"; // 获取更多商品评价
const Url_Item_AddNew_Evaluate = "/api/item/appraise"; // 新增商品评价


/**
 * ----商家
 */
const Url_BusinessInfo = "/business/list"; //商家页面数据
const Url_Business_Recommend = "/api/business/recommended"; // 推荐商家
const Url_Business_Detail = "/api/business/detail/"; // 获取商家详情
const Url_Business_EvaluateList = "/businessDetail/petAppraise"; // 获取商家评价列表
const Url_Business_PetList = "/api/business/pet/list"; // 获取商家宠物列表

//分销
const Url_Description = "/description"; //申请成为分销商
const Url_DescriptionList = "/api/business/distribution"; //分销列表

/**
 * ----地址管理
 */
const Url_GetAddressList = "/api/business/receiving-address/list/"; // 获取收货地址列表
const Url_AddNewAddress = "/api/business/receiving-address"; // 添加新收货地址
const Url_EditAddress = "/api/business/receiving-address"; // 编辑收货地址
const Url_DeleteAddress = "/api/business/receiving-address/"; // 删除收货地址
const Url_GetDefaultAddress = "/api/business/receiving-address/default/"; // 获取默认收货地址

/**
 * ----收藏管理
 */
const Url_AddNew_Pet_Collection = "/pet/favorite"; // 新增宠物收藏
const Url_Delete_Pet_Collection = "/pet/favorite/"; // 删除宠物收藏
const Url_Get_Pet_Collection = "/pet/favorite"; // 查询宠物收藏

const Url_Get_BusinessFans = "/api/fans"; //获得用户粉丝

const Url_AddNew_Item_Collection = "/item/favorite"; // 新增商品收藏
const Url_Delete_Item_Collection = "/item/favorite/"; // 删除商品收藏
const Url_Get_Item_Collection = "/item/favorite"; // 查询商品收藏

/**
 * ----评价管理
 */
const Url_Evaluate = "/PetAppraise/petAppraise"; // 发布评价

/**
 * ----文件上传
 */
const Url_UploadFile = "/file/upload"; // 上传文件

/**
 * ----宠物
 */
const Url_Pet_List = "/api/market/pet/list"; // 附近
const Url_Pet_Newest = "/api/market/flea-market"; // 最新发布
const Url_Pet_UpScale = "/api/market/high-quality"; // 高端宠物
// const Url_Pet_Near = '/api/market/near'; // 

const Url_Pet_Preferential = "/PetFilter/discounts"; // 特惠抢购
const Url_Pet_Fine = "/PetFilter/petAll"; // 精品宠物
const Url_Pet_Filter = "/PetFilter/petFilter"; // 宠物筛选

const Url_Pet_HotSort = "/petSort/hotSort"; // 获取热门分类
const Url_Pet_Breed = "/api/pet/genre/list"; // 获取宠物品种
const Url_Pet_Sort = "/api/market/sort/list"; // 获取宠物分类 

const Url_Pet_Detail = "/api/market/pet/detail/"; // 获取宠物详情

//宠物评价
const Url_Pet_More_Evaluate = "/api/pet/appraise/list"; // 获取更多宠物评价
const Url_Pet_Addpj_Info = "/api/pet/appraise"; // 新增宠物评价


const Url_Pet_Release = "/api/pet/put-on-sale/new-put-on-sale"; // 发布宠物
const Url_Pet_Edit = "/api/pet/put-on-sale/update"; // 编辑宠物
// const Url_Pet_OnOrOff_Shelves = "/PetController/PetOut"; // 上架/下架宠物 
const Url_PetShelve = "/api/pet/put-on-sale/for-sale/"; //宠物上架
const Url_PetOffShelve = "/api/pet/put-on-sale/off-sale/"; //宠物下架
const Url_Pet_ReleaseList = "/businessDetail/businessDetail"; // 已发布宠物列表

/**
 * ----订单
 */
const Url_Order_AddNew_Pet = "/api/order/pet"; // 新增宠物订单
const Url_Order_AddNew_Item = "/api/order/item"; // 新增商品订单



function Url_Order_ConfirmSend_Item(orderNo, wayBill, expressCompany) {
  // const wayBillUrl = wayBill?"/way-bill/" + wayBill: "";
  // const expressUrl = expressCompany?"/express/" + expressCompany: "";
  const wayBillUrl = wayBill?"/way-bill/" + wayBill:"/way-bill/null";
  const expressUrl = expressCompany?"/express/" + expressCompany: "/express/null";
  return "/api/order/item/deliver/" + orderNo + wayBillUrl + expressUrl;
}
function Url_Order_ConfirmSend_Pet(orderNo, wayBill) {
  return "/api/order/pet/deliver/" + orderNo + "/way-bill/" + wayBill;
}
const Url_Order_ConfirmRecive_Pet = "/api/order/pet/sign-for/"; // 确认收货 宠物
const Url_Order_ConfirmRecive_Item = "/api/order/item/sign-for/"; // 确认收货 商品
const Url_Order_Refund_Pet = "/OrderState/refundsPet"; // 发起退款 宠物
const Url_Order_Refund_Item = "/OrderState/refundsItem"; // 发起退款 商品
const Url_Order_Refund_Detail = "/businessOrder/refundOrderDetail"; // 获取退款单详情
const Url_Order_Refund_Confirm_Pet = "/businessOrder/businessRefund"; // 确认退款 宠物
const Url_Order_Refund_Confirm_Item = "/businessOrder/businessRefundItem"; // 确认退款 商品

const Url_Order_FreightRates = "/api/pet/transport/price"; //获取运价
const Url_Order_ListTransportType = "/api/pet/transport/type"; //运输方式

function Url_Order_Detail_Pet(orderNo){
  return "/api/order/pet/" + orderNo;
}; // 获取宠物订单详情
function Url_Order_Detail_Item (orderNo){
  return "/api/order/item/" + orderNo;
}; // 获取商品订单详情
function Url_Order_Transport_Pet(orderNo) {
  return "/api/pet/transport/state/" + orderNo;
}


/**
 * ----支付
 */
const Url_Pay_Pet = "/pay/weChat/pet"; // 获取宠物订单支付信息
const Url_Pay_Item = "/pay/weChat/item"; // 获取商品订单支付信息
const Url_Pay_Server = "/pay/weChat/service"; // 获取服务订单支付信息

const Url_Item_QueryOrderPrice = "/api/order/item/price"; //获取商品订单价格

/**
 * 买家宠物订单
 */
const Url_Non_Payment = "/api/customer/pet/order/non-payment"; //买家宠物未支付订单
const Url_To_BeDelivered = "/api/customer/pet/order/to-be-delivered"; //买家宠物代发货订单
const Url_To_BeEvaluated = "/api/customer/pet/order/to-be-evaluated"; //买家宠物待评价订单
const Url_To_BeReceived = "/api/customer/pet/order/to-be-received"; //买家宠物带收货订单

/**
 * 买家商品订单
 */
const Url_UserItemOrder_Onpay = "/api/customer/item/order/non-payment"; //买家商品未支付订单
const Url_UserItemOrder_Delivered = "/api/customer/item/order/to-be-delivered"; //买家商品待发货订单
const Url_UserItemOrder_Evaluated = "/api/customer/item/order/to-be-evaluated"; //买家商品待评价订单
const Url_UserItemOrder_Received = "/api/customer/item/order/to-be-received"; //买家待收货订单

/**
 * 卖家宠物订单
 */
const Url_Business_No_Payment = "/api/business/pet/order/non-payment"; //卖家宠物未支付订单
const Url_BusinessTo_BeDelivered = "/api/business/pet/order/to-be-delivered"; //卖家宠物代发货订单
const Url_BusinessTo_BeEvaluated = "/api/business/pet/order/to-be-evaluated"; //卖家宠物待评价订单
const Url_BusinessTo_BeReceived = "/api/business/pet/order/to-be-received"; //卖家宠物带收货订单

/**
 * 卖家商品订单
 */
const Url_BusinessItemOrder_Onpay = "/api/business/item/order/non-payment"; //卖家商品未支付订单
const Url_BusinessItemOrder_Delivered = "/api/business/item/order/to-be-delivered"; //卖家商品待发货订单
const Url_BusinessItemOrder_Evaluated = "/api/business/item/order/to-be-evaluated"; //卖家商品待评价订单
const Url_BusinessItemOrder_Received = "/api/business/item/order/to-be-received"; //卖家待收货订单

/**
 * 保证金
 */
const Url_BusinessBond = "/api/business/bond"; //提交保证金申请
const Url_GetBusinessBond = "/api/business/bond/"; //获得保证金对象
const Url_QueryBondAmout = "/api/business/bond/amount"; //获取支付金额
const Url_Bond_PayParam = "/pay/weChat/bond"; //保证金支付参数

/**
 * 特色服务宠物图片
 */
const Url_pet1 = "/static/img/pet1.png";
const Url_pet2 = "/static/img/pet2.png";
const Url_pet3 = "/static/img/pet3.png";
const Url_pet4 = "/static/img/pet4.png";
const Url_pet5 = "/static/img/pet5.png";
const Url_pet6 = "/static/img/pet6.png";
const Url_pet7 = "/static/img/pet7.png";
const Url_pet8 = "/static/img/pet8.png";
const Url_pet9 = "/static/img/pet9.png";
const Url_Dzgj = "/static/img/gjdz.png"; //改价打折
const Url_Pettitleinfo = "/static/img/pettitleinfo.png";

/**
 * 认证图片
 */
const Url_bond_1 = "/static/img/bond_1.png";
const Url_bond_2 = "/static/img/bond_2.png";
const Url_explain_identifier = "/static/img/explain_identifier.png";
const Url_explain_license = "/static/img/explain_license.png";
const Url_explain_storefont = "/static/img/explain_storefont.png";


/**
 * 购物车
 */
const Url_AddShopCart = "/shoppingCart/addShopCart"; //添加购物车
const Url_delShopCart = "/shoppingCart/delShopCart"; //删除购物车
const Url_QueryShopCart = "/shoppingCart/queryShopCart"; //查询购物车
const Url_UpdateShopCart = "/shoppingCart/updateShopCart"; //修改购物车

const Url_BusinessDetail = "/api/business/detail"; //更新商家信息

/**收藏或者关注 */
const Url_BusinessFollow = "/api/business/follow"; //获取关注对象（可作为校验）
const Url_AddFollow = "/api/business/follow/follow"; //添加关注
const Url_BusinessFollowList = "/api/business/follow/list"; //关注或收藏列表  
const Url_BusinessUnfollow = "/api/business/follow/unfollow"; //取消关注


/**商品发布 */
const Url_UpdteItem = "/api/item/pu-on-sale"; //编辑商品
const Url_PutItem = "/api/item/pu-on-sale/new-put-on-sale"; //发布商品
const Url_OffSaleItem = "/api/item/pu-on-sale/pull-off-sale/"; //商品下架
const Url_OnSaleItem = "/api/item/pu-on-sale/put-on-sale/"; //商品上架

/**
 * 获取团购列表
 */
const Url_GroupList = "/api/pet/groupon/list";

/**
 * 服务
 */
const Url_Server_GetMyPet = '/api/business/my-pet/list/'; // 获取爱宠列表
const Url_Server_CountMyPet = "/api/business/my-pet/count/"; // 获取爱宠总数
const Url_Server_AddNewMyPet = '/api/business/my-pet'; // 新增爱宠
const Url_Server_DeleteMyPet = '/api/business/my-pet/'; // 删除爱宠
const Url_Server_GetPetSort = '/api/market/sort/list'; // 获取宠物一级分类
const Url_Server_GetPetGenre = '/api/pet/genre/list'; // 获取宠物二级分类
const Url_Server_AllBusinessCity = '/api/business/city'; // 获取所有有商家的城市列表
const Url_Server_GetBusinessList = "/api/business/list"; // 获取商家列表
const Url_Server_AddWorkLike = '/api/service/work-like'; // 给美容师作品点赞
const Url_Server_HairLength = '/api/service/hair'; // 服务宠物毛长
const Url_Server_Weight = '/api/service/weight'; // 服务宠物重量区间
const Url_Server_GetServerAgeZone = "/api/service/age"; // 获取服务年龄区间
const Url_Server_Price = "/api/service/price/get"; // 获取服务价格
const Url_Server_GetCoupon = '/api/coupon/usable/list'; // 获取可用优惠券列表
const Url_Server_GetAllServerType = '/api/service/type/list'; // 获取所有服务分类
const Url_Server_GetAllPetHairLength = '/api/service/hair/list'; // 获取所有宠物毛长
const Url_Server_ReleaseServer = "/api/service/info/insert"; // 发布服务
const Url_Server_EditServer = "/api/service/info/update"; // 编辑服务
function Url_Server_GroundingServer(serverId){
  return "/api/service/info/on/" + serverId;
}
function Url_Server_DismountServer(serverId) {
  return "/api/service/info/out/" + serverId;
}
function Url_Server_GetBusinessServerTypeList(businessNo) {
  return '/api/service/type/list/business/' + businessNo;
} // 获取商家服务类别列表
function Url_Server_GetBusinessServerListByServerNo(businessNo, serverTypeNo) {
  return '/api/service/info/business/' + businessNo + '/type/' + serverTypeNo;
} // 获取服务商对应的服务类型列表
const Url_Server_GetReleasedServerList = "/api/service/info/list"; // 已发布服务列表
const Url_Server_GetCustomerOrderList = '/api/service/order/list/buyer'; // 买家查询已预约服务列表
const Url_Server_GetBusinessOrderList = '/api/service/order/list/shop'; // 卖家查询已预约服务列表
const Url_Server_OrderServer = '/api/service/order'; // 服务下单
const Url_Server_OrderVerify = '/api/service/order/updateVerifyState'; // 核销服务
const Url_Server_AddNewEvaluate = "/api/service/appraise"; // 新增服务评价
const Url_Server_GetEvaluateList = "/api/service/appraise/list"; // 获取服务评价列表

/**
 * 积分流水
 */
const Url_BusinessCreditFlow = "/api/business/credit/flow";

/**
 * 获得优惠券列表
 */
const Url_BusinessCouponList = "/api/business/coupon/list";

/**
 * 订单总价
 */
const Url_Pet_OrderPrice = "/api/order/pet/price";

const Url_Coupon_ExchangeAble = "/api/business/coupon/list/type"; // 可兑换优惠券列表
const Url_Coupon_Exchange = '/api/business/coupon/exchange'; // 兑换优惠券

/**
 * 评测
 */
const Url_Assess_RecommondList = "/api/assess/recommend/list"; // 推荐评测列表
const Url_Assess_List = "/api/assess/info/list"; // 评测列表
const Url_Assess_Detail = "/api/assess/info/get"; // 评测详情
function Url_Assess_FeedbackList(assessNo, offset, limit) {
  return "/api/assess/feedback/list/" + assessNo + "/offset/" + offset + "/limit/" + limit;
} 

function Url_Baike_ArticleList(){
  return "/api/wiki/info/list";
}

function Url_Account_List(businessNo){
  return "/api/business/account/" + businessNo;
}
function Url_Account_Delete(accountNo) {
  return "/api/business/account/" + accountNo;
}
function Url_Account_Add() {
  return "/api/business/account";
}

module.exports = {
  Url_Base, // Base Url

  Url_Login, // 登陆
  Url_Decode, // 登陆
  Url_Register, // 注册
  Url_GetCode, // 获取短信验证码
  Url_Auth, // 商家认证
  Url_Auth_ByAuthNo, //根据单据编号查询

  Url_LoginBusiness, // 转变卖家身份
  Url_Search, // 搜索


  Url_ItemType, // 商城宠物类型
  Url_ItemShowTypeInfo, // 商城显示数据
  Url_Item_Brand, // 粮宠品牌
  Url_Item_Classify, // 宠粮分类
  Url_Item_SetMeal, // 商品套餐分类
  Url_Item_Detail, // 详情
  Url_Item_List, // 获取商品列表
  Url_Item_Group, // 获取团购商品列表
  Url_Item_More_Evaluate, // 获取更多商品评价
  Url_Item_AddNew_Evaluate, // 新增商品评价

  Url_BusinessInfo, //商家显示数据
  Url_Business_Recommend, // 推荐商家
  Url_Business_Detail, // 获取商家详情
  Url_Business_EvaluateList, // 获取商家评价列表，
  Url_Business_PetList, // 获取商家宠物列表

  Url_GetAddressList, // 获取收货地址列表
  Url_AddNewAddress, // 添加新收货地址
  Url_EditAddress, // 编辑收货地址
  Url_DeleteAddress, // 删除收货地址
  Url_GetDefaultAddress, // 获取默认收货地址

  Url_AddNew_Pet_Collection, // 新增宠物收藏
  Url_Delete_Pet_Collection, // 删除宠物收藏
  Url_Get_Pet_Collection, // 查询宠物收藏

  Url_AddNew_Item_Collection, // 新增商品收藏
  Url_Delete_Item_Collection, // 删除商品收藏
  Url_Get_Item_Collection, // 查询商品收藏

  Url_Evaluate, // 发布评价

  Url_UploadFile, // 上传文件

  Url_Pet_List, // 附近
  Url_Pet_Newest, // 最新发布
  Url_Pet_UpScale, // 高端宠物
  Url_Pet_Preferential, // 特惠抢购
  Url_Pet_Fine, // 精品宠物
  Url_Pet_Filter, // 宠物筛选
  Url_Pet_HotSort, // 获取热门分类
  Url_Pet_Breed, // 获取宠物品种
  Url_Pet_Sort, // 获取宠物分类
  Url_Pet_Detail, // 获取宠物详情
  Url_Pet_More_Evaluate, // 获取宠物更多评价

  Url_Pet_Addpj_Info, // 新增宠物评价


  Url_Pet_Release, // 发布宠物
  Url_Pet_Edit, // 编辑宠物
  Url_Pet_ReleaseList, // 已发布宠物列表

  Url_Order_AddNew_Pet, // 新增宠物订单
  Url_Order_AddNew_Item, // 新增商品订单

  Url_Order_ConfirmSend_Pet, // 确认 宠物发货
  Url_Order_ConfirmSend_Item, // 确认 商品发货
  Url_Order_ConfirmRecive_Pet, // 确认 宠物收货
  Url_Order_ConfirmRecive_Item, // 确认 商品收货
  Url_Order_Refund_Pet, // 发起退款 宠物
  Url_Order_Refund_Item, // 发起退款 商品
  Url_Order_Refund_Detail, // 获取退款单详情
  Url_Order_Refund_Confirm_Pet, // 确认退款 宠物
  Url_Order_Refund_Confirm_Item, // 确认退款 商品

  Url_Order_FreightRates, //获取运价
  Url_Order_ListTransportType, //运输方式

  Url_Order_Detail_Pet, // 获取宠物订单详情
  Url_Order_Detail_Item, // 获取商品订单详情

  Url_Order_Transport_Pet, // 获取宠物订单运输详情

  Url_Pay_Pet, // 获取宠物订单支付信息
  Url_Pay_Item, // 获取商品订单支付信息
  Url_Pay_Server, // 获取服务订单支付信息

  Url_TotalMonth, //本月交易额
  Url_balance, //查询用户余额

  Url_BusinessFlow, //商家流水
  Url_Withdraw, //商家提现


  Url_Description, //申请成为分销商
  Url_DescriptionList, //分销列表

  /**
   * 图片-------
   */
  Url_pet1,
  Url_pet2,
  Url_pet3,
  Url_pet4,
  Url_pet5,
  Url_pet6,
  Url_pet7,
  Url_pet8,
  Url_pet9,
  Url_Dzgj,
  Url_Pettitleinfo,
  //---认证图片-----
  Url_bond_1,
  Url_bond_2,
  Url_explain_identifier,
  Url_explain_license,
  Url_explain_storefont,

  Url_AddShopCart, //添加购物车
  Url_delShopCart, //删除购物车
  Url_QueryShopCart, //查询购物车
  Url_UpdateShopCart, //修改购物车

  Url_BusinessDetail, //更新商家信息

  Url_BusinessFollow, //获取关注对象（可作为校验）
  Url_AddFollow, //添加关注或收藏
  Url_Get_BusinessFans, //粉丝
  Url_BusinessFollowList, //关注或收藏列表  
  Url_BusinessUnfollow, //取消关注或收藏
  Url_PetShelve, //宠物上架
  Url_PetOffShelve, //宠物下架41

  Url_UpdteItem, //编辑商品
  Url_PutItem, //发布商品
  Url_OffSaleItem, //商品下架
  Url_OnSaleItem, //商品上架

  Url_BusinessCreditFlow, //积分流水
  Url_GroupList, //团购列表
  Url_BusinessCouponList, //优惠券列表

  Url_BusinessBond, //提交保证金申请
  Url_GetBusinessBond, //获得保证金对象
  Url_QueryBondAmout, //获取保证金支付
  Url_Bond_PayParam, //保证金参数

  Url_Pet_OrderPrice, //宠物订单总价
  Url_Item_QueryOrderPrice, //获得商品订单价格

  /**
   * 买家宠物订单
   */
  Url_Non_Payment, //未支付订单
  Url_To_BeDelivered, //代发货订单
  Url_To_BeEvaluated, //待评价订单
  Url_To_BeReceived, //带收货订单

  /**
   * 买家商品订单
   */
  Url_UserItemOrder_Onpay, //买家商品未支付订单
  Url_UserItemOrder_Delivered, //买家商品待发货订单
  Url_UserItemOrder_Evaluated, //买家商品待评价订单
  Url_UserItemOrder_Received, //买家待收货订单

  /**
   * 卖家宠物订单
   */
  Url_Business_No_Payment, //卖家宠物未支付订单
  Url_BusinessTo_BeDelivered, //卖家宠物代发货订单
  Url_BusinessTo_BeEvaluated, //卖家宠物待评价订单
  Url_BusinessTo_BeReceived, //卖家宠物带收货订单

  /**
   * 卖家商品订单
   */
  Url_BusinessItemOrder_Onpay, //卖家商品未支付订单
  Url_BusinessItemOrder_Delivered, //卖家商品待发货订单
  Url_BusinessItemOrder_Evaluated, //卖家商品待评价订单
  Url_BusinessItemOrder_Received, //卖家待收货订单
  

  Url_Server_GetMyPet,
  Url_Server_CountMyPet,
  Url_Server_AddNewMyPet,
  Url_Server_DeleteMyPet, // 
  Url_Server_GetPetSort,
  Url_Server_GetPetGenre,
  Url_Server_GetBusinessList,
  Url_Server_AllBusinessCity,
  Url_Server_AddWorkLike,
  Url_Server_HairLength,
  Url_Server_Weight,
  Url_Server_GetServerAgeZone,
  Url_Server_Price,
  Url_Server_GetCoupon,
  Url_Server_GetAllServerType,
  Url_Server_GetAllPetHairLength,
  Url_Server_ReleaseServer,
  Url_Server_EditServer,
  Url_Server_GroundingServer,
  Url_Server_DismountServer,
  Url_Server_GetBusinessServerListByServerNo,
  Url_Server_GetBusinessServerTypeList,
  Url_Server_GetReleasedServerList,
  Url_Server_GetCustomerOrderList,
  Url_Server_GetBusinessOrderList,
  Url_Server_OrderServer,
  Url_Server_OrderVerify,
  Url_Server_AddNewEvaluate,
  Url_Server_GetEvaluateList,

  Url_Coupon_ExchangeAble,
  Url_Coupon_Exchange,

  Url_Assess_RecommondList,
  Url_Assess_List,
  Url_Assess_Detail,
  Url_Assess_FeedbackList,

  Url_Baike_ArticleList,

  Url_Account_List, // 收款账户
  Url_Account_Delete, // 删除收款账户
  Url_Account_Add, // 新建收款账户
}