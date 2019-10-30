
const Url_Base = "http://192.168.3.111:5050"; // Base Url
// const Url_Base = "http://192.168.3.103:5050"; 

const Url_Login = "/login"; // 登陆
const Url_Register = "/register"; // 注册
const Url_GetCode = "/business/VerificationCode"; // 获取短信验证码

const Url_ItemType = "/item/type";  //

const Url_GetAddressList = "/order/ReceivingAddress"; // 获取收货地址列表
const Url_AddNewAddress = "/order/ReceivingAddress/insert"; // 添加新收货地址
const Url_EditAddress = "/order/ReceivingAddress/update"; // 编辑收货地址
const Url_DeleteAddress = "/order/ReceivingAddress/"; // 删除收货地址

module.exports={
  Url_Base,  // Base Url
  
  Url_Login, // 登陆
  Url_Register, // 注册
  Url_GetCode, // 获取短信验证码

  Url_ItemType,

  Url_GetAddressList, // 获取收货地址列表
  Url_AddNewAddress, // 添加新收货地址
  Url_EditAddress, // 编辑收货地址
  Url_DeleteAddress, // 删除收货地址
}