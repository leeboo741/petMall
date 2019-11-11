
const ResponseHandler = require("../services/handle/responseHandle.js");
const {RequestParamObj} = require("../utils/requestParamObj.js");  // 请求参数对象
const {RequestSuccessObj} = require("../utils/requestSuccessObj.js"); // 请求成功对象
const {RequestFailObj} = require("../utils/requestFailObj.js"); // 请求失败对象
const {UploadFileParamObj} = require("../utils/uploadFileParamObj.js"); // 上传参数对象


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
        function handleSuccessCallback(root, total, header, cookies) {
          if (typeof requestParam.success == "function" && requestParam.success) {
            let requestSuccessObj = new RequestSuccessObj(
              { "root": root, 
                "total": total, 
                "header": header, 
                "cookies": cookies
              }
            )
            requestParam.success(requestSuccessObj);
          }
        },
        function handleFailCallback(code, errMsg, header, cookies) {
          if (typeof requestParam.fail == "function" && requestParam.fail) {
            let requestFailObj = new RequestFailObj({
              "code": code,
              "header": header,
              "cookies": cookies,
              "errMsg": errMsg
            })
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
        function handleSuccessCallback(root, total, header, cookies) {
          if (typeof requestParam.success == "function" && requestParam.success) {
            let requestSuccessObj = new RequestSuccessObj(
              {
                "root": root,
                "total": total,
                "header": header,
                "cookies": cookies
              }
            )
            requestParam.success(requestSuccessObj);
          }
        },
        function handleFailCallback(code, errMsg, header, cookies) {
          if (typeof requestParam.fail == "function" && requestParam.fail) {
            let requestFailObj = new RequestFailObj({
              "code": code,
              "header": header,
              "cookies": cookies,
              "errMsg": errMsg
            })
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
        function handleSuccessCallback(root, total, header, cookies) {
          if (typeof requestParam.success == "function" && requestParam.success) {
            let requestSuccessObj = new RequestSuccessObj(
              {
                "root": root,
                "total": total,
                "header": header,
                "cookies": cookies
              }
            )
            requestParam.success(requestSuccessObj);
          }
        },
        function handleFailCallback(code, errMsg, header, cookies) {
          if (typeof requestParam.fail == "function" && requestParam.fail) {
            let requestFailObj = new RequestFailObj({
              "code": code,
              "header": header,
              "cookies": cookies,
              "errMsg": errMsg
            })
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
 * DELETE 请求
 * @param requestParamObj 对象 请求数据
 */
function RequestDELETE(requestParam) {
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
    method: "DELETE",
    header: requestParam.header,
    success(res) {
      ResponseHandler.handleResponse(res,
        function handleSuccessCallback(root, total, header, cookies) {
          if (typeof requestParam.success == "function" && requestParam.success) {
            let requestSuccessObj = new RequestSuccessObj(
              {
                "root": root,
                "total": total,
                "header": header,
                "cookies": cookies
              }
            )
            requestParam.success(requestSuccessObj);
          }
        },
        function handleFailCallback(code, errMsg, header, cookies) {
          if (typeof requestParam.fail == "function" && requestParam.fail) {
            let requestFailObj = new RequestFailObj({
              "code": code,
              "header": header,
              "cookies": cookies,
              "errMsg": errMsg
            })
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
 * 上传文件请求
 * @param uploadFileParam UploadFileParamObj 对象
 * @return uploadTask
 */
function RequestUploadFile(uploadFileParam) {
  if (uploadFileParam == null) {
    throw new Error("uploadFileParam 不能为空");
    return;
  }
  if (!(uploadFileParam instanceof UploadFileParamObj)) {
    throw new Error("请使用 UploadFileParamObj");
    return;
  }
  let uploadTask = null;
  uploadTask = wx.uploadFile({
    url: uploadFileParam.url,
    filePath: uploadFileParam.filePath,
    name: uploadFileParam.name,
    header: uploadFileParam.header,
    formData: uploadFileParam.formData, 
    success(res) {
      ResponseHandler.handleResponse(res,
        function handleSuccessCallback(root, total, header, cookies) {
          if (typeof uploadFileParam.success == "function" && uploadFileParam.success) {
            let requestSuccessObj = new RequestSuccessObj(
              {
                "root": root,
                "total": total,
                "header": header,
                "cookies": cookies
              }
            )
            uploadFileParam.success(requestSuccessObj);
          }
        },
        function handleFailCallback(code, errMsg, header, cookies) {
          if (typeof uploadFileParam.fail == "function" && uploadFileParam.fail) {
            let requestFailObj = new RequestFailObj({
              "code": code,
              "header": header,
              "cookies": cookies,
              "errMsg": errMsg
            })
            uploadFileParam.fail(requestFailObj);
          }
        },
      )
    },
    fail(res) {
      if (uploadFileParam.fail != null && typeof uploadFileParam.fail == "function") {
        let requestFailObj = new RequestFailObj()
        uploadFileParam.fail(requestFailObj);
      }
      ResponseHandler.handleRequestFail();
    },
    complete(res) {
      if (uploadFileParam.complete != null && typeof uploadFileParam.complete == "function") {
        uploadFileParam.complete(res);
      }
    }
  })
  uploadTask.onProgressUpdate(
    function upload(res){
      if (uploadFileParam.onProgressCallback != null && typeof uploadFileParam.onProgressCallback == "function") {
        uploadFileParam.onProgressCallback(res)
      }
    }
  )
  return uploadTask;
}

module.exports={
  RequestGET: RequestGET,
  RequestPUT: RequestPUT,
  RequestPOST: RequestPOST,
  RequestDELETE: RequestDELETE,
  RequestUploadFile: RequestUploadFile,
}