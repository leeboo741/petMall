const Nearby_RequestType_Enum = {
  Newest: "1",
  Fine: "2",
  UpScale: '3',
  All: "4",
}

const Order_Type_Enum = {
  UnPay: 1, // 待付款
  UnSend: 2, // 待发货
  Send: 3, // 已发货
  UnEvaluate: 4, // 待评价
  Refund: 5, // 退款
} // 订单状态

module.exports = {
  Nearby_RequestType_Enum, // nearby 页面 请求类型
  Order_Type_Enum, // 订单状态
}