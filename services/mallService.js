const ResponseHandler = require("../services/handle/responseHandle.js");
const UrlService=require("../macros/urlPath.js");
const RequestUtil = require("../utils/requestUtil.js");

function getMailPetType(grade,limit,getDataCallback){
  RequestUtil.RequestGET({
    url: UrlService.Url_Base + UrlService.Url_ItemType,
    data: {
      grade: grade,
      limit: limit
    },
    success(res){
      ResponseHandler.handleResponse(res,
        function handleSuccessCallback(root,total) {
          if (typeof getDataCallback == "function" && getDataCallback) {
              getDataCallback(root);
          }
        }
      )
    }
  })
}

module.exports = {
  getMailPetType: getMailPetType
}