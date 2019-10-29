
const ResponseHandle = require("../services/handle/responseHandle.js");

/**
 * GET 请求
 * @param requestParam 请求数据
 * {
 *  @param url 请求地址
 *  @param data 参数
 *  @param success 接口调用成功回调
 *  @param fail 接口调用失败回调
 *  @param complete 接口调用完成回调
 *  @param header 请求头
 * }
 */
function RequestGET(requestParam) {
  wx.request({
    url: requestParam.url,
    data: requestParam.data,
    header: requestParam.header,
    success(res) {
      if (requestParam.success != null && typeof requestParam.success == "function") {
        requestParam.success(res);
      }
    },
    fail(res) {
      if (requestParam.fail != null && typeof requestParam.fail == "function") {
        requestParam.fail(res);
      }
      ResponseHandle.handleRequestFail();
    },
    complete(res) {
      if (requestParam.complete != null && typeof requestParam.complete == "function") {
        requestParam.complete(res);
      }
    }
  })
}

/**
 * PUT 请求
 * @param requestParam 请求数据
 * {
 *  @param url 请求地址
 *  @param data 参数
 *  @param success 接口调用成功回调
 *  @param fail 接口调用失败回调
 *  @param complete 接口调用完成回调
 *  @param header 请求头
 * }
 */
function RequestPUT(requestParam) {
  wx.request({
    url: requestParam.url,
    data: requestParam.data,
    header: requestParam.header,
    method: "PUT",
    success(res) {
      if (requestParam.success != null && typeof requestParam.success == "function") {
        requestParam.success(res);
      }
    },
    fail(res) {
      if (requestParam.fail != null && typeof requestParam.fail == "function") {
        requestParam.fail(res);
      }
      ResponseHandle.handleRequestFail();
    },
    complete(res) {
      if (requestParam.complete != null && typeof requestParam.complete == "function") {
        requestParam.complete(res);
      }
    }
  })
}

/**
 * POST 请求
 * @param requestParam 请求数据
 * {
 *  @param url 请求地址
 *  @param data 参数
 *  @param success 接口调用成功回调
 *  @param fail 接口调用失败回调
 *  @param complete 接口调用完成回调
 *  @param header 请求头
 * }
 */
function RequestPOST(requestParam) {
  wx.request({
    url: requestParam.url,
    data: requestParam.data,
    method: "POST",
    header: requestParam.header,
    success(res) {
      if (requestParam.success != null && typeof requestParam.success == "function") {
        requestParam.success(res);
      }
    },
    fail(res) {
      if (requestParam.fail != null && typeof requestParam.fail == "function") {
        requestParam.fail(res);
      }
      ResponseHandle.handleRequestFail();
    },
    complete(res) {
      if (requestParam.complete != null && typeof requestParam.complete == "function") {
        requestParam.complete(res);
      }
    }
  })
}

module.exports={
  RequestGET: RequestGET,
  RequestPUT: RequestPUT,
  RequestPOST: RequestPOST,
}