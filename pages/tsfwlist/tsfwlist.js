const Url_Path=require("../../macros/urlPath.js");

var app = getApp();

const ShareManager = require("../../services/shareService");
const Utils = require("../../utils/util.js");

Page({
  data: {
    picMini: Url_Path.Url_Base + Url_Path.Url_pet1,

    businessObj: null,
    specialServerList: null,

    selectedServerTypeNo: null,

    showRow: -1,
    showItemIndex: -1,
  },
  onLoad: function (res) {
    if (app.globalData.serviceSelectBusiness) {
      this.setData({
        businessObj: app.globalData.serviceSelectBusiness,
        selectedServerTypeNo: res.servertypeno
      })
      for (let index = 0; index < this.data.businessObj.business.serverTypes.length; index++) {
        let serverType = this.data.businessObj.business.serverTypes[index];
        if (serverType.serviceTypeNo == '3') {
          let specialServerList = [];
          let tempList = [];
          for (let serverIndex = 0; serverIndex < serverType.child.length; serverIndex++) {
            let tempServerType = serverType.child[serverIndex];
            if (this.data.selectedServerTypeNo && this.data.selectedServerTypeNo == tempServerType.serviceTypeNo) {
              this.setData({
                showRow: serverIndex / 2,
                showItemIndex: serverIndex % 2
              })
            }
            if (serverIndex % 2 == 0) {
              tempList = [];
              tempList.push(serverType.child[serverIndex]);
              if (serverIndex == serverType.child.length - 1) {
                specialServerList.push(tempList);
              }
            } else {
              tempList.push(serverType.child[serverIndex]);
              specialServerList.push(tempList);
            }
          }
          this.setData({
            specialServerList: specialServerList
          })
        }
      }
    }
  },
  onShow: function () {
 
  },
  tapMore: function (res) {
    this.setData({
      showRow: res.currentTarget.dataset.row,
      showItemIndex: res.currentTarget.dataset.index
    })
  },
  tapOrder: function (res) {
    let server = this.data.specialServerList[this.data.showRow][this.data.showItemIndex].services[res.currentTarget.dataset.index];
    Utils.logInfo("点击预约服务:",server);
    app.globalData.serviceSelectServer = server;
    wx.navigateTo({
      url: '/stationsubcontract/pages/appointment/index'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },
  
});