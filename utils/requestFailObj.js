
var RequestFailObj = function RequestFailObj(obj) {
  this.code = -1; // 错误码
  if (obj != null) {
    if (obj.code != null && typeof obj.code == "number") {
      this.code = obj.code;
    }
  }
}

module.exports = {
  RequestFailObj: RequestFailObj
}