// grouppurchase/pages/grouplist/index.js
const UserService=require("../../../services/userService.js");
const GroupService=require("../../../services/groupService.js");
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const Limit = 20;
const ShareManager = require("../../../services/shareService");
const Utils = require("../../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupSource:[
        {
        imageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582967187139&di=39125aed1f118dcf0bd8fbefe43a52ed&imgtype=0&src=http%3A%2F%2Fimg.yxad.cn%2Fimages%2F20181022%2F0b8028a151d94e8c8c32ea7d0b64614c.jpeg", // 图片地址
          link: "", // 内容地址
        },
        {
          imageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582967206799&di=cb21d0ba57b648ac94c6f3d6df867f56&imgtype=0&src=http%3A%2F%2Fimg1.99114.com%2Fgroup10%2FM00%2FF5%2F13%2FrBADslooqcCAHqedAALirGSWv5k663.jpg",
          link: "",
        
        }
      ],  //swiper

    groupList:[
      
    ],
    offset: 0,
    loadState: LoadFootItemState.Loading_State_Empty, // 底部状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.startPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.offset = 0;
    let that = this;
    /**
     * 团购列表
     */
    let groupObj = {
      offset: 0,
      limit: Limit
    }
    GroupService.getGroupList(groupObj, function (result) {
      Utils.logInfo("团购专区 : \n" + JSON.stringify(result));
      that.setData({
        groupList: result
      })
      if (result.length > 0) {
        that.setData({
          loadState: LoadFootItemState.Loading_State_End
        })
      } else {
        that.setData({
          loadState: LoadFootItemState.Loading_State_Empty
        })
      }
      wx.stopPullDownRefresh();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.loadState == LoadFootItemState.Loading_State_End) {
      return;
    }
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    let that = this;

      let groupObj = {
        offset: 0,
        limit: Limit
      }
    GroupService.getGroupList(groupObj, function (result) {
      let tempList = that.data.groupList.concat(result);
        that.setData({
          groupList: tempList,
        })
        that.data.offset = that.data.offset + Limit;
      if (result.length > 0) {
          that.setData({
            loadState: LoadFootItemState.Loading_State_End
          })
        } else {
          that.setData({
            loadState: LoadFootItemState.Loading_State_Empty
          })
        }
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  }
})