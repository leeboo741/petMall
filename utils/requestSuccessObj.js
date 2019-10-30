
var RequestSuccessObj = function RequestSuccessObj(obj) {
  this.root = null; // 返回内容
  this.total = 0; // 返回总条数
  if (obj != null) {
    if (obj.root != null) {
      this.root = obj.root;
    }
    if (obj.total != null && typeof obj.total == "number") {
      this.total = obj.total;
    }
  }
}

module.exports = {
  RequestSuccessObj: RequestSuccessObj
}