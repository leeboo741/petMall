
const ResponseCodeEnum = require("../handle/ResponseCodeEnum.js");
/**
 * request Success 时 处理方法
 * @param resource 返回数据
 * @param handleSuccessCallback 处理后 成功时 回调
 * @param handleFailCallback 处理后 失败时 回调
 */
function handleResponse(resource, handleSuccessCallback, handleFailCallback) {
  console.log("handleResponse resource:\n" + JSON.stringify(resource));
  if (resource.statusCode != 200) {
    wx.showToast({
      title: '请求失败：' + resource.statusCode,
      icon: 'none'
    })
    handleFailCallback(resource.statusCode)
    return;
  }
  if (resource.data.code == ResponseCodeEnum.Res_Code.SUCCESS) {
    if (handleSuccessCallback != null && typeof handleSuccessCallback == "function") {
      handleSuccessCallback(resource.data.root, resource.data.total);
    }
  } else {
    wx.showToast({
      title: resource.data.errMsg,
      icon: 'none'
    })
    if (handleFailCallback != null && typeof handleFailCallback == "function") {
      handleFailCallback(resource.data.code)
    }
  }
}

/**
 * request fail 时 处理方法
 */
function handleRequestFail() {
  wx.showToast({
    title: '系统异常',
    icon: 'none'
  })
}

module.exports={
  handleResponse: handleResponse, // request Success 时 处理方法
  handleRequestFail: handleRequestFail, // request Fail 时 处理方法
}