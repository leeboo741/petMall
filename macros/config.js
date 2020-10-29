// enum
const Print_Console_Error = 0; // 只打印错误
const Print_Console_Debug = 1; // 打印调试信息 及 错误信息
const Print_Console_Info = 2; // 打印信息

const ENV_DEV = "develop"; // 开发环境
const ENV_RELEASE = "release"; // 生产环境
const ENV_DEV_Zhou = "develop_zhou"; // 周晓健
const ENV_DEV_Guo = 'develop_guo'; // 郭鹏程

// config
/**
 * 上一版本 1.0.23
 * 上一版本时间 2020.10.21
 * 新版本说明
 * 1. 修复驿站页面点击其他服务也跳转托运程序的bug
 */
const Version = "1.0.23";
const Version_Code = 28;

const Branch = 'master'; // 分支-主支

const Service_Phone = "4007778889"; // 默认服务电话

const Key_QQ_Map = "3ZOBZ-D6VKX-DP643-7JFJ7-CFEB6-U7F7F"; // 腾讯地图 app_key

const ENV_CURRENT = ENV_RELEASE; // 当前运行环境
const MINI_PROGRAME_APPID_PETTRANSPORT = "wxcbdaa290fc45a263"; // 托运小程序 appid

const Print_Console_Follow_Env = false; // 打印权限是否跟随环境
const Print_Console = Print_Console_Follow_Env?ENV_CURRENT != ENV_RELEASE : true; // 是否打印日志 打印权限跟随环境, 判断环境, 否则 true
const Print_Console_Level = Print_Console_Info; // 打印日志最低等级


module.exports={
  Service_Phone,
  
  Key_QQ_Map,
  MINI_PROGRAME_APPID_PETTRANSPORT,

  Version,
  Version_Code,
  Branch,

  Print_Console_Error,
  Print_Console_Debug,
  Print_Console_Info,

  Print_Console_Level,

  Print_Console,

  ENV_DEV,
  ENV_RELEASE,
  ENV_CURRENT,
  ENV_DEV_Zhou,
  ENV_DEV_Guo
}