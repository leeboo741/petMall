const ResponseEnum = require("../services/handle/ResponseCodeEnum.js");
const RequestUtil = require("../utils/requestUtil.js");
const { RequestParamObj } = require("../utils/requestParamObj.js");
const UrlPath = require("../macros/urlPath.js");
const Util = require("../utils/util.js");
const PetManager = require("../services/petService.js");

/**
 * 获取品种列表
 */
function getBreedList(petSortNo, getResultCallback, failCallback) {
  PetManager.getBreed(petSortNo, function getBreedCallback(result){
    if (Util.checkIsFunction(getResultCallback)) {
      getResultCallback(result)
    }
  },function getFailCallback(res) {
    if (Util.checkIsFunction(failCallback)) {
      failCallback(res);
    }
  })
}

/**
 * 获取文章列表
 */
function getArticleList(petSortNo, wikiType, offset, limit, getResultCallback, failCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Baike_ArticleList(),
    data: {
      petGenreNo: petSortNo,
      wikiType: wikiType,
      offset: offset,
      limit: limit,
    },
    success(res) {
      if (Util.checkIsFunction(getResultCallback)) {
        getResultCallback(res);
      }
    },
    fail(res) {
      if (Util.checkIsFunction(failCallback)) {
        failCallback(res);
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

module.exports={
  getBreedList: getBreedList,
  getArticleList: getArticleList
}