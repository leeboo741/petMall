
const UrlService = require("../macros/urlPath.js");

const ResponseEnum = require("../services/handle/ResponseCodeEnum.js");
const RequestUtil = require("../utils/requestUtil.js");
const { RequestParamObj } = require("../utils/requestParamObj.js");

function getMailPetType(grade,limit,getDataCallback){
  let requestParam = new RequestParamObj({
    url: UrlService.Url_Base + UrlService.Url_ItemType,
    data: {
      grade: grade,
      limit: limit
    },
    success(res) {
      if (typeof getDataCallback == "function" && getDataCallback) {
        getDataCallback(res.root);
      }
    },
  })
  RequestUtil.RequestGET(requestParam)
}

module.exports = {
  getMailPetType: getMailPetType
}