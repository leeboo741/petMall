
// const Url_Base = "http://192.168.3.111:5050"; // Base Url ----- 刘
const Url_Base = "http://192.168.3.200:8080"; // Base Url ---商城 卢
// const Url_Base ="http://192.168.3.103:5050";    //---商家 罗

const Url_Login = "/login"; // 登陆
const Url_Register = "/register"; // 注册
const Url_GetCode = "/business/VerificationCode"; // 获取短信验证码

/**
 * ----商城
 */
const Url_ItemShowTypeInfo = "/item/vo"; //商城页面数据显示（主粮零食等..）
const Url_ItemType = "/item/type";  //宠粮类型查询
const Url_Item_Brand ="/item/Brand"; //粮宠品牌
const Url_Item_Classify = "/item/Classify"; //宠粮分类
const Url_Item_SetMeal = "/item/Pack"; // 查询商品套餐分类
const Url_Item_Detail = "/item/itemNoAndLimit"; // 获取宠物商品详情
const Url_Item_List = "/item"; // 查询商品列表

/**
 * ----商家
 */
const Url_BusinessInfo ="/business/list";  //商家页面数据
const Url_Business_Recommend = "/business/recommendedBusiness"; // 推荐商家
const Url_Business_Detail = "/business/businessDetail"; // 获取商家详情
const Url_Business_EvaluateList = "/businessDetail/petAppraise"; // 获取商家评价列表
const Url_Business_PetList = "/business/businessPet"; // 获取商家宠物列表

/**
 * ----地址管理
 */
const Url_GetAddressList = "/order/ReceivingAddress"; // 获取收货地址列表
const Url_AddNewAddress = "/order/ReceivingAddress/insert"; // 添加新收货地址
const Url_EditAddress = "/order/ReceivingAddress/update"; // 编辑收货地址
const Url_DeleteAddress = "/order/ReceivingAddress/"; // 删除收货地址

/**
 * ----收藏管理
 */
const Url_AddNew_Pet_Collection = "/pet/favorite"; // 新增宠物收藏
const Url_Delete_Pet_Collection = "/pet/favorite/"; // 删除宠物收藏
const Url_Get_Pet_Collection = "/pet/favorite"; // 查询宠物收藏

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
const Url_Pet_Newest = "/PetFilter/new"; // 最新发布
const Url_Pet_UpScale = "/PetFilter/high"; // 高端宠物
const Url_Pet_Preferential = "/PetFilter/discounts"; // 特惠抢购
const Url_Pet_Fine = "/PetFilter/petAll"; // 精品宠物
const Url_Pet_Filter = "/PetFilter/petFilter"; // 宠物筛选

const Url_Pet_HotSort = "/petSort/hotSort"; // 获取热门分类
const Url_Pet_Breed = "/petSort/petGenreNO"; // 获取宠物品种

const Url_Pet_Detail = "/PetDetail/detail"; // 获取宠物详情

/**
 * ----宠物商品
 */

module.exports={
  Url_Base,  // Base Url
  
  Url_Login, // 登陆
  Url_Register, // 注册
  Url_GetCode, // 获取短信验证码

  Url_ItemType, // 商城宠物类型
  Url_ItemShowTypeInfo, // 商城显示数据
  Url_Item_Brand, // 粮宠品牌
  Url_Item_Classify, // 宠粮分类
  Url_Item_SetMeal, // 商品套餐分类
  Url_Item_Detail, // 详情 -------
  Url_Item_List, // 获取商品列表

  Url_BusinessInfo,    //商家显示数据
  Url_Business_Recommend, // 推荐商家
  Url_Business_Detail, // 获取商家详情
  Url_Business_EvaluateList, // 获取商家评价列表，
  Url_Business_PetList, // 获取商家宠物列表

  Url_GetAddressList, // 获取收货地址列表
  Url_AddNewAddress, // 添加新收货地址
  Url_EditAddress, // 编辑收货地址
  Url_DeleteAddress, // 删除收货地址

  Url_AddNew_Pet_Collection, // 新增宠物收藏
  Url_Delete_Pet_Collection, // 删除宠物收藏----
  Url_Get_Pet_Collection, // 查询宠物收藏----

  Url_AddNew_Item_Collection, // 新增商品收藏----
  Url_Delete_Item_Collection, // 删除商品收藏----
  Url_Get_Item_Collection, // 查询商品收藏-----

  Url_Evaluate, // 发布评价

  Url_UploadFile, // 上传文件

  Url_Pet_Newest, // 最新发布
  Url_Pet_UpScale, // 高端宠物
  Url_Pet_Preferential, // 特惠抢购
  Url_Pet_Fine, // 精品宠物
  Url_Pet_Filter, // 宠物筛选
  Url_Pet_HotSort, // 获取热门分类
  Url_Pet_Breed, // 获取宠物品种
  Url_Pet_Detail, // 获取宠物详情

}