const ResponseHandler = require("../services/handle/responseHandle.js");
const UrlService=require("../macros/urlPath.js");


function getMailPetType(grade,limit,getDataCallback){
    wx.request({
      url: UrlService.Url_Base + UrlService.Url_ItemType,
      method:{
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
      },
      fail(res) {
        ResponseHandler.handleRequestFail();
      },
      complete(res) {

      }
    })
}




module.exports = {
  getMailPetType: getMailPetType
}