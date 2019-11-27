
/**
 * 
 * 搜索 结果 服务
 * 
 */

const {
  RequestParamObj
} = require("../utils/requestParamObj.js");
const RequestUtil = require("../utils/requestUtil.js");
const UrlPath = require("../macros/urlPath.js");
const Util = require("../utils/util.js");

const Key_SearchHistory = "searchHistory"

const SearchHistory_Max_Size = 15;

/**
 * 保存搜索关键字
 */
function saveSearchHistory(searchWord){
  let searchHistoryList = getSearchHistoryList();
  if (searchHistoryList != null) {
    if (searchHistoryList.length >= SearchHistory_Max_Size) {
      searchHistoryList.splice(0,1);
    }
  } else {
    searchHistoryList = [];
  }
  searchHistoryList.push(searchWord)
  let searchHistoryStr = JSON.stringify(searchHistoryList);
  try {
    wx.setStorageSync(Key_SearchHistory, searchHistoryStr);
  } catch (e) {

  }
}

/**
 * 获取搜索历史
 */
function getSearchHistoryList() {
  try {
    let searchHistoryList = JSON.parse(wx.getStorageSync(Key_SearchHistory));
    return searchHistoryList;
  } catch (e) {
    return null;
  }
}

/**
 * 清空搜索历史
 */
function deleteSearchHistory(deleteCallback){
  wx.removeStorage({
    key: Key_SearchHistory,
    success(res) {
      console.log("删除用户 success: \n" + JSON.stringify(res));
      if (deleteCallback && typeof deleteCallback == "function") {
        deleteCallback(true)
      }
    },
    fail(res) {
      console.log("删除用户 fail: \n" + JSON.stringify(res));
      if (deleteCallback && typeof deleteCallback == "function") {
        deleteCallback(false)
      }
    }
  })
}

/**
 * 获取搜索结果
 * @param param (searchKey, offset, limit)
 * @param getSearchResultCallback
 */
function getSearchResult(param, getSearchResultCallback) {
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Search,
    data: {
      search: param.searchKey,
      offset: param.offset,
      limit: param.limit,
    },
    success(res) {
      if (Util.checkIsFunction(getSearchResultCallback)) {
        getSearchResultCallback(res)
      }
    }
  });

  RequestUtil.RequestGET(requestParam);
}

module.exports={
  saveSearchHistory: saveSearchHistory,
  getSearchHistoryList: getSearchHistoryList,
  deleteSearchHistory: deleteSearchHistory,
  getSearchResult: getSearchResult
}