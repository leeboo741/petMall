let Get_New_Message_IntervalID = null;
const Get_New_Message_Loop_Time = 1000 * 10;

const Utils = require("../utils/util");
const UrlPath = require("../macros/urlPath.js");
const ResponseEnum = require("../services/handle/ResponseCodeEnum.js");
const RequestUtil = require("../utils/requestUtil.js");
const {
  RequestParamObj
} = require("../utils/requestParamObj.js");
const UserService=require("../services/userService.js");

/**
 * 请求 站内信列表
 * @param {*} offset 
 * @param {*} getResultCallback 
 */
function getAllMessageList(offset, limit, getResultCallback){
  let data = {
    offset: offset,
    limit: limit,
    businessNo: UserService.getBusinessNo()
  };
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Message_GetAll,
    data:data,
    success(res) {
      if (Utils.checkIsFunction(getResultCallback)) {
        getResultCallback(true,res.root);
      }
    },
    fail(res) {
      if (Utils.checkIsFunction(getResultCallback)) {
        getResultCallback(false,res);
      }
    },
    complete(res) {},
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取最新站内信数量
 * @param {*} completeCallback 
 */
function getNewMessageCount(completeCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Message_GetNewCount,
    data: {
      businessNo: UserService.getBusinessNo(),
      lastGetTime: getLastModifyMessageTime(),
    },
    success(res) {
      if (res.root != null && res.root > 0) {
        saveLastModifyMessageTime(Utils.formatTime(new Date()))
        saveHaveNewMessageStatus(true);
      }
    },
    fail(res) {

    },
    complete(res){
      if (Utils.checkIsFunction(completeCallback)) {
        completeCallback(getHaveNewMessageStatus())
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 获取最新站内信
 */
function getNewMessage(completeCallback){
  let requestParam = new RequestParamObj({
    url: UrlPath.Url_Base + UrlPath.Url_Message_GetNew,
    data: {
      businessNo: UserService.getBusinessNo(),
      lastGetTime: getLastModifyMessageTime(),
    },
    success(res) {
      if (res.root != null && res.root.length > 0) {
        saveLastModifyMessageTime(Utils.formatTime(new Date()))
        saveHaveNewMessageStatus(true);
      }
    },
    fail(res) {

    },
    complete(res){
      if (Utils.checkIsFunction(completeCallback)) {
        completeCallback(getHaveNewMessageStatus())
      }
    }
  })
  RequestUtil.RequestGET(requestParam);
}

/**
 * 开始轮询最新站内信消息
 */
function startGetNewMessageInterval(getResultCallback) {
  UserService.isLogin(function(){
    Get_New_Message_IntervalID = setInterval(function(){
      getNewMessageCount(function() {
        if (Utils.checkIsFunction(getResultCallback)) {
          getResultCallback(getHaveNewMessageStatus());
        }
      })
    }, Get_New_Message_Loop_Time)
  })
  
}

/**
 * 停止轮询最新站内信消息
 */
function stopGetNewMessageInterval() {
  if (Get_New_Message_IntervalID != null) {
    clearInterval(Get_New_Message_IntervalID);
    Get_New_Message_IntervalID = null;
  }
}

const LastModifyMessageTimeKey = "LastModifyTime";

/**
 * 保存最后同步时间
 * @param {*} time 
 */
function saveLastModifyMessageTime(time) {
  try {
    wx.setStorageSync(LastModifyMessageTimeKey, time);
  } catch (e) {

  }
}

const DefaultLastModifyMessageTime = "1900-01-01 00:00:00";

/**
 * 获取最后同步时间
 */
function getLastModifyMessageTime() {
  try{
    let lastTime = wx.getStorageSync(LastModifyMessageTimeKey);
    return lastTime;
  }catch (e){
    return DefaultLastModifyMessageTime;
  }
}

const HaveNewMessageStatusKey = "HaveNewMessage";

/**
 * 保存是否有新消息状态
 * @param {*} status 
 */
function saveHaveNewMessageStatus(status) {
  try {
    wx.setStorageSync(HaveNewMessageStatusKey, status);
  } catch (e) {

  }
}

/**
 * 获取是否有新消息
 */
function getHaveNewMessageStatus() {
  try{
    let haveNewMessage = wx.getStorageSync(HaveNewMessageStatusKey);
    return haveNewMessage;
  }catch (e){
    return false;
  }
}

module.exports= {
  getAllMessageList,
  getNewMessageCount,
  getNewMessage,
  startGetNewMessageInterval,
  stopGetNewMessageInterval,
  saveLastModifyMessageTime,
  getLastModifyMessageTime,
  saveHaveNewMessageStatus,
  getHaveNewMessageStatus,
}
