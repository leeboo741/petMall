
const ResponseCodeEnum = require("../handle/ResponseCodeEnum.js");
/**
 * request Success 时 处理方法
 * @param resource 返回数据
 * @param handleSuccessCallback 处理后 成功时 回调
 * @param handleFailCallback 处理后 失败时 回调
 */
function handleResponse(resource, handleSuccessCallback, handleFailCallback) {
  /**
   * SUCCESS(10000L, "操作成功"),
     LOGIN_TIMEOUT(20001L, "登录超时"),
     LOGIN_FAILURE(20002L, "账号密码不正确"),
     USER_NOTEXISTS(20003L, "账号不存在"),
     USER_SAME_PASSWORD(20004L, "旧密码不能与新密码相同"),
     UNKNOW_EXCEPTION(90001L, "未知异常");
   */
  if (resource.code == ResponseCodeEnum.Res_Code.SUCCESS) {
    handleSuccessCallback(resource.root, resource.total);
  } else {
    wx.showToast({
      title: resource.errmsg,
      icon: 'none'
    })
    handleFailCallback(resource.code)
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