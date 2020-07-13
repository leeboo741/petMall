// enum
const Print_Console_Error = 0; // 只打印错误
const Print_Console_Debug = 1; // 打印调试信息 及 错误信息
const Print_Console_Info = 2; // 打印信息

const ENV_DEV = "Dev"; // 开发环境
const ENV_RELEASE = "Release"; // 生产环境

// config
const Version = "1.0.2";
const Version_Code = 3;

const Service_Phone = "4007778889"; // 默认服务电话

const Key_QQ_Map = "3ZOBZ-D6VKX-DP643-7JFJ7-CFEB6-U7F7F"; // 腾讯地图 app_key

const Print_Console = false; // 是否打印日志
const Print_Console_Level = Print_Console_Info; // 打印日志最低等级

const ENV_CURRENT = ENV_DEV; // 当前运行环境

module.exports={
  Service_Phone,
  
  Key_QQ_Map,

  Version,
  Version_Code,

  Print_Console_Error,
  Print_Console_Debug,
  Print_Console_Info,

  Print_Console_Level,

  Print_Console,

  ENV_DEV,
  ENV_RELEASE,
  ENV_CURRENT,
}