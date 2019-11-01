
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

/**
 * 上传文件
 * @param fileAddress
 */
function fileUpload(fileAddress, uploadCallback) {
  let fileUploadParam = new UploadFileParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_UploadFile,
    filePath: fileAddress, 
    name: "multipartFile", 
    header: { "Content-Type": "multipart/form-data" },
    success(res) {
      console.log("upload success\n" + JSON.stringify(res));
    },
    fail(res) {
      console.log("upload fail\n" + JSON.stringify(res));
    },
    complete(res) {
      console.log("upload complete\n" + JSON.stringify(res));
    }
  })
  RequestUtil.RequestUploadFile(fileUploadParam);
}

module.exports={
  fileUpload: fileUpload
}