
const ResponseHandler = require("../services/handle/responseHandle.js");
const {RequestParamObj} = require("../utils/requestParamObj.js");  // 请求参数对象
const {RequestSuccessObj} = require("../utils/requestSuccessObj.js"); // 请求成功对象
const {RequestFailObj} = require("../utils/requestFailObj.js"); // 请求失败对象


/**
 * GET 请求
 * @param requestParamObj 对象 请求数据
 */
function RequestGET(requestParam) {
  if (requestParam == null) {
    throw new Error("requestParam 不能为空");
    return;
  }
  if (!(requestParam instanceof RequestParamObj)) {
    throw new Error("请使用 RequestParamObj");
    return;
  }
  wx.request({
    url: requestParam.url,
    data: requestParam.data,
    header: requestParam.header,
    success(res) {
      ResponseHandler.handleResponse(res,
        function handleSuccessCallback(root, total) {
          if (typeof requestParam.success == "function" && requestParam.success) {
            let requestSuccessObj = new RequestSuccessObj({ "root": root, "total": total})
            requestParam.success(requestSuccessObj);
          }
        },
        function handleFailCallback(code) {
          if (typeof requestParam.fail == "function" && requestParam.fail) {
            let requestFailObj = new RequestFailObj({"code": code})
            requestParam.fail(requestFailObj);
          }
        },
      )
    },
    fail(res) {
      if (requestParam.fail != null && typeof requestParam.fail == "function") {
        let requestFailObj = new RequestFailObj()
        requestParam.fail(requestFailObj);
      }
      ResponseHandler.handleRequestFail();
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
 * @param requestParamObj 对象 请求数据
 */
function RequestPUT(requestParam) {
  if (requestParam == null) {
    throw new Error("requestParam 不能为空");
    return;
  }
  if (!(requestParam instanceof RequestParamObj)) {
    throw new Error("请使用 RequestParamObj");
    return;
  }
  wx.request({
    url: requestParam.url,
    data: requestParam.data,
    header: requestParam.header,
    method: "PUT",
    success(res) {
      ResponseHandler.handleResponse(res,
        function handleSuccessCallback(root, total) {
          if (typeof requestParam.success == "function" && requestParam.success) {
            let requestSuccessObj = new RequestSuccessObj({ "root": root, "total": total })
            requestParam.success(requestSuccessObj);
          }
        },
        function handleFailCallback(code) {
          if (typeof requestParam.fail == "function" && requestParam.fail) {
            let requestFailObj = new RequestFailObj({ "code": code })
            requestParam.fail(requestFailObj);
          }
        },
      )
    },
    fail(res) {
      if (requestParam.fail != null && typeof requestParam.fail == "function") {
        let requestFailObj = new RequestFailObj()
        requestParam.fail(requestFailObj);
      }
      ResponseHandler.handleRequestFail();
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
 * @param requestParamObj 对象 请求数据
 */
function RequestPOST(requestParam) {
  if (requestParam == null) {
    throw new Error("requestParam 不能为空");
    return;
  }
  if (!(requestParam instanceof RequestParamObj)) {
    throw new Error("请使用 RequestParamObj");
    return;
  }
  wx.request({
    url: requestParam.url,
    data: requestParam.data,
    method: "POST",
    header: requestParam.header,
    success(res) {
      ResponseHandler.handleResponse(res,
        function handleSuccessCallback(root, total) {
          if (typeof requestParam.success == "function" && requestParam.success) {
            let requestSuccessObj = new RequestSuccessObj({ "root": root, "total": total })
            requestParam.success(requestSuccessObj);
          }
        },
        function handleFailCallback(code) {
          if (typeof requestParam.fail == "function" && requestParam.fail) {
            let requestFailObj = new RequestFailObj({ "code": code })
            requestParam.fail(requestFailObj);
          }
        },
      )
    },
    fail(res) {
      if (requestParam.fail != null && typeof requestParam.fail == "function") {
        let requestFailObj = new RequestFailObj()
        requestParam.fail(requestFailObj);
      }
      ResponseHandler.handleRequestFail();
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