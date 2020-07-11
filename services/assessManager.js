const {
  RequestParamObj
} = require("../utils/requestParamObj.js");
const RequestUtil = require("../utils/requestUtil.js");
const UrlPath = require("../macros/urlPath.js");
const Util = require("../utils/util.js");

/**
 * 获取推荐评测列表
 */
function getRecommondAssessList(getRecommondAssessListCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Assess_RecommondList,
    success: function (res) {
      if (typeof getRecommondAssessListCallback == "function" && getRecommondAssessListCallback) {
        getRecommondAssessListCallback(res.root);
      }
    }
  });
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取评测列表
 * @param offset
 * @param limit
 */
function getAssessList(offset, limit, getAssessListCallback, failCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Assess_List,
    data: {
      offset: offset,
      limit: limit
    },
    success(res) {
      if (Util.checkIsFunction(getAssessListCallback)) {
        getAssessListCallback(res.root);
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

/**
 * 获取评测反馈列表
 * @param assessNo
 * @param offset
 * @param limit
 * @param getFeedbackCallback
 */
function getAssessFeedback(assessNo, offset, limit, getFeedbackCallback, failCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Assess_FeedbackList(assessNo, offset, limit),
    success(res) {
      if (Util.checkIsFunction(getFeedbackCallback)) {
        getFeedbackCallback(res.root)
      }
    },
    fail(res) {
      if (Util.checkIsFunction(failCallback)) {
        failCallback(res.root)
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取评测详情
 */
function getAssessDetail(assessId, getAssessDetailCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Assess_Detail,
    data: {
      assessId: assessId
    },
    success(res) {
      if (Util.checkIsFunction(getAssessDetailCallback)) {
        getAssessDetailCallback(res.root);
      }
    },
  })
  RequestUtil.RequestGET(requestParam);
}

module.exports={
  getRecommondAssessList: getRecommondAssessList,
  getAssessList: getAssessList,
  getAssessDetail: getAssessDetail,
  getAssessFeedback: getAssessFeedback,
}