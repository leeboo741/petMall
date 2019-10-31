
// const Url_Base = "http://192.168.3.111:5050"; // Base Url ----- 刘
// const Url_Base = "http://192.168.3.200:8080"; // Base Url ---商城 卢
const Url_Base ="http://192.168.3.103:5050";    //---商家 罗

const Url_Login = "/login"; // 登陆
const Url_Register = "/register"; // 注册
const Url_GetCode = "/business/VerificationCode"; // 获取短信验证码

/**
 * ----商城
 */
const Url_ItemType = "/item/type";  //宠粮类型查询
const Url_ItemShowTypeInfo ="/item/vo/cs"; //商城页面数据显示（主粮..）


/**
 * ----商家
 */
const Url_BusinessInfo ="/business/list";  //商家页面数据

/**
 * ----地址管理
 */
const Url_GetAddressList = "/order/ReceivingAddress"; // 获取收货地址列表
const Url_AddNewAddress = "/order/ReceivingAddress/insert"; // 添加新收货地址
const Url_EditAddress = "/order/ReceivingAddress/update"; // 编辑收货地址
const Url_DeleteAddress = "/order/ReceivingAddress/"; // 删除收货地址

/**
 * ----评价管理
 */
const Url_Evaluate = "/PetAppraise/petAppraise"; // 发布评价

module.exports={
  Url_Base,  // Base Url
  
  Url_Login, // 登陆
  Url_Register, // 注册
  Url_GetCode, // 获取短信验证码

  Url_ItemType, //商城宠物类型

  Url_ItemShowTypeInfo, //商城显示数据
  Url_BusinessInfo,    //商家显示数据

  Url_GetAddressList, // 获取收货地址列表
  Url_AddNewAddress, // 添加新收货地址
  Url_EditAddress, // 编辑收货地址
  Url_DeleteAddress, // 删除收货地址

  Url_Evaluate, // 发布评价
}