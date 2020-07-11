// var t = require("../../common/js/api"), e = require("../../utils/util");
const UserService = require("../../../services/userService.js");
const ServerManager = require("../../../services/serverManager.js");
const Utils = require("../../../utils/util.js");
const app = getApp();
const ShareManager = require("../../../services/shareService");

Page({
  data: {

    myPetList: [], // 我的宠物列表
    petSortList: [], // 宠物一级分类
    petGenreList: [], // 宠物二级分类
    currentTabIndex: 0,

    keyword: null, // 关键字
  },
  onLoad: function(res) {
    let that = this;
    this.getSort(function getSortCallback(sortResult) {
      that.setData({
        petSortList: sortResult
      })
      that.getGenre(that.data.currentTabIndex, that.data.keyword, function getGenreCallback(genreResult) {
        that.setData({
          petGenreList: genreResult
        })
      })
    })
  },
  onShow: function() {
    this.getMyPet();
  },
  /**
   * 删除宠物
   */
  deleteMyPet: function(petNo, deleteCallback) {
    let that = this;
    ServerManager.deletePet(petNo, function deleteMyPetCallback(result){
      Utils.logInfo("删除宠物:" + JSON.stringify(result));
      if (Utils.checkIsFunction(deleteCallback)) {
        deleteCallback(result);
      }
    })
  },
  /**
   * 获取我的宠物列表
   */
  getMyPet: function() {
    let that = this;
    UserService.isLogin(function isLoginCallback(){
      let businessNo = UserService.getBusinessNo();
      ServerManager.getMyPetList(businessNo, function getMyPetListCallback(petResult) {
        that.setData({
          myPetList: petResult
        })
      });
    })
  },
  /**
   * 获取一级分类
   */
  getSort: function(getSortCallback) {
    ServerManager.getPetSort(function getPetSortCallback(sortResult) {
      if (Utils.checkIsFunction(getSortCallback)) {
        getSortCallback(sortResult)
      }
    })
  },
  /**
   * 获取二级分类
   */
  getGenre: function(sortIndex, keyword,getGenreCallback) {
    ServerManager.getGenreList(this.data.petSortList[sortIndex].petSortNo, keyword, function getPetGenreCallback(genreResult) {
      if (Utils.checkIsFunction(getGenreCallback)) {
        getGenreCallback(genreResult)
      }
    })
  },
  /**
   * 选择一级分类
   */
  handleTabChange: function(res) {
    this.setData({
      currentTabIndex: res.detail.key
    })
    let that = this;
    that.setData({
      keyword: null
    })
    this.getGenre(this.data.currentTabIndex, that.data.keyword, function getGenreCallback(genreResult) {
      that.setData({
        petGenreList: genreResult
      })
    })
  },
  /**
   * 点击添加新宠
   */
  tapAddNewPet: function () {
    wx.navigateTo({
      url: "/stationsubcontract/pages/mypet/upmypet/index?showin=1"
    });
  },
  /**
   * 长按我的宠物
   */
  longTapMyPetAction: function(res){
    let index =res.currentTarget.dataset.index;
    let petObj = this.data.myPetList[index];
    let that = this;
    wx.showActionSheet({
      itemList: ["编辑", "删除"],
      success(res) {
        if (res.tapIndex == 0) {
          Utils.logInfo("爱宠编辑");
          app.globalData.editMyPet = petObj;
          wx.navigateTo({
            url: "/stationsubcontract/pages/mypet/upmypet/index?showin=1"
          });
        } else if (res.tapIndex == 1) {
          wx.showModal({
            title: '删除',
            content: '是否删除宠物:'+petObj.petName,
            confirmText: '删除',
            confirmColor: "#ee2c2c",
            success(res){
              if (res.confirm) {
                that.deleteMyPet(petObj.petNo, function deleteCallback(result) {
                  that.data.myPetList.splice(index, 1);
                  wx.showToast({
                    title: '删除成功',
                  })
                  that.setData({
                    myPetList: that.data.myPetList
                  })
                })
              }
            }
          })
        }
      }
    })
  },
  /**
   * 点击我的宠物
   */
  tapMyPet: function(res) {
    let index = res.currentTarget.dataset.index;
    let petObj = this.data.myPetList[index];
    app.globalData.serviceSelectPet = petObj;
    wx.navigateBack({
      
    })
  },

  /**
   * 搜索框输入
   * @param {*} res 
   */
  confirmSearch: function(res) {
    let that = this;
    that.data.keyword = res.detail.value;
    that.getGenre(that.data.currentTabIndex, that.data.keyword, function getGenreCallback(genreResult) {
      that.setData({
        petGenreList: genreResult
      })
    })
  },
  /**
   * 选择二级分类
   */
  tapPetGenre: function(res) {
    let index = res.currentTarget.dataset.index;
    let petGenreObj = this.data.petGenreList[index];
    let petSortObj = this.data.petSortList[this.data.currentTabIndex];
    let petObj = {
      petName: petGenreObj.petGenreName,
      petImg: petGenreObj.petGenreImg,
      petGenre: petGenreObj,
      petSort: petSortObj,
    };
    app.globalData.serviceSelectPet = petObj;
    wx.navigateBack({
      
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },
});