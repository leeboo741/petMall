
/**
 * 
 * 文件上传 服务
 * 
 */

const ResponseEnum = require("../services/handle/ResponseCodeEnum.js");
const RequestUtil = require("../utils/requestUtil.js");
const {
  UploadFileParamObj
} = require("../utils/uploadFileParamObj.js");
const UrlPath = require("../macros/urlPath.js");
const Util = require("../utils/util.js");
const Utils = require("../utils/util.js");

/**
 * 上传文件
 * @param fileAddress
 * @param uploadCallback
 * @parma onProgressCallback
 * @return uploadTask
 */
function fileUpload(fileAddress, uploadCallback, onProgressCallback) {
  let uploadTask = null;
  let fileUploadParam = new UploadFileParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_UploadFile,
    filePath: fileAddress, 
    name: "multipartFile", 
    header: { "Content-Type": "multipart/form-data" },
    success(res) {
      Utils.logInfo("upload success\n" + JSON.stringify(res));
      if (uploadCallback != null && typeof uploadCallback == "function") {
        uploadCallback(res);
      }
    },
    fail(res) {
      Utils.logInfo("upload fail\n" + JSON.stringify(res));
    },
    complete(res) {
      uploadTask.offProgressUpdate(
        function offProgressCallback(res) {
          Utils.logInfo("cancel progress: \n" + fileAddress);
        } 
      );
    },
    onProgressCallback(res) {
      if (onProgressCallback != null && typeof onProgressCallback == "function") {
        onProgressCallback(res);
      }
    }
  })
  uploadTask = RequestUtil.RequestUploadFile(fileUploadParam);
  return uploadTask;
}

module.exports={
  fileUpload: fileUpload
}