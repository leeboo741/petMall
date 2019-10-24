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

module.exports={
  saveSearchHistory: saveSearchHistory,
  getSearchHistoryList: getSearchHistoryList,
  deleteSearchHistory: deleteSearchHistory
}