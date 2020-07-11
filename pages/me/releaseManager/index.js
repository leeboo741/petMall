// pages/me/releaseManager/index.js

const Limit = 20;
const app = getApp();
const Util = require("../../../utils/util.js");
const Utils = require("../../../utils/util")
const Url_Path = require("../../../macros/urlPath.js");
const PagePath = require("../../../macros/pagePath.js");
const PetService = require("../../../services/petService.js");
const UserService = require("../../../services/userService.js");
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const PetFilterObj = require("../../../entity/petFilterObj.js");
const PetStore = require("../../../services/storeService.js");
const MallService = require("../../../services/mallService.js");
const CommdityReleaseService = require("../../../services/commodityReleaseService.js");
const ServerManager = require("../../../services/serverManager.js");
const ShareManager = require("../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gjdzpng: Url_Path.Url_Base + Url_Path.Url_Dzgj, //打折改价图片
    showTop: true,
    pageIndex: 0, // 页码
    loadState: LoadFootItemState.Loading_State_Empty, // 底部状态
    releaseList: [], // 已发布宠物列表
    goodsList: [], // 商品列表
    serviceList: [], // 服务列表
    switchType: 0, //切换    0、已发布宠物  1、已发布商品 2. 已发布服务

    showGoodsMask: 0, //商品列表蒙版
    afterPrice: { //修改商品价格信息

    },
    serviceafterPrice: {}, //修改服务价格
    gaiPrice: "", //改价后金额
    showSelect: true, //是否隐藏显示框
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.startPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.data.offset = 0;
    let that = this;
    UserService.isLogin(function isLoginCallback(){
      if (that.data.switchType == 0) {
        that.requestReleasePetList(that.data.offset,
          function getResultCallback(data) {
            Utils.logInfo("release list : \n" + JSON.stringify(data));
            that.setData({
              releaseList: data,
            })
            that.data.offset = that.data.offset + Limit;
            if (data.length >= Limit) {
              that.setData({
                loadState: LoadFootItemState.Loading_State_Normal
              })
            } else if (data.length < Limit && data.length > 0) {
              that.setData({
                loadState: LoadFootItemState.Loading_State_End
              })
            } else {
              that.setData({
                loadState: LoadFootItemState.Loading_State_Empty
              })
            }
            wx.stopPullDownRefresh();
          }
        )
      } else if (that.data.switchType == 1) {
        Utils.logInfo("商品下拉");
        that.getBusinessReleaseMall(that.data.offset,
          function getResultCallback(data) {
            Utils.logInfo("goods list : \n" + JSON.stringify(data));
            that.setData({
              goodsList: data,
            })
            that.data.offset = that.data.offset + Limit;
            if (data.length >= Limit) {
              that.setData({
                loadState: LoadFootItemState.Loading_State_Normal
              })
            } else if (data.length < Limit && data.length > 0) {
              that.setData({
                loadState: LoadFootItemState.Loading_State_End
              })
            } else {
              that.setData({
                loadState: LoadFootItemState.Loading_State_Empty
              })
            }
          }, function(res) {
            wx.stopPullDownRefresh();
          }
        )
      } else {
        Utils.logInfo("服务下拉");
        that.getServerReleaselist(that.data.offset, function callback(data) {
          that.setData({
            serviceList: data,
          })
          that.data.offset = that.data.offset + Limit;
          that.setData({
            loadState: LoadFootItemState.Loading_State_End
          })
          // if (data.length >= Limit) {
          //   that.setData({
          //     loadState: LoadFootItemState.Loading_State_Normal
          //   })
          // } else if (data.length < Limit && data.length > 0) {
          //   that.setData({
          //     loadState: LoadFootItemState.Loading_State_End
          //   })
          // } else {
          //   that.setData({
          //     loadState: LoadFootItemState.Loading_State_Empty
          //   })
          // }
        }, function(res) {
          wx.stopPullDownRefresh();
        })
      }
    }, function notLoginCallback(){
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      wx.stopPullDownRefresh();
    })
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.loadState == LoadFootItemState.Loading_State_End ||
      this.data.loadState == LoadFootItemState.Loading_State_Loading) {
      return;
    }
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    let that = this;
    UserService.isLogin(function isLoginCallback(){
      if (that.data.switchType == 0) {
        that.requestReleasePetList(that.data.offset,
          function getResultCallback(data) {
            let tempList = that.data.releaseList.concat(data);
            that.setData({
              releaseList: tempList
            })
            that.data.offset = that.data.offset + Limit;
            if (data.length >= Limit) {
              that.setData({
                loadState: LoadFootItemState.Loading_State_Normal
              })
            } else {
              that.setData({
                loadState: LoadFootItemState.Loading_State_End
              })
            }
          }
        )
      } else if (that.data.switchType == 1) {
        that.getBusinessReleaseMall(that.data.offset,
          function getResultCallback(data) {
            let tempList = that.data.goodsList.concat(data);
            that.setData({
              goodsList: tempList
            })
            that.data.offset = that.data.offset + Limit;
            if (data.length >= Limit) {
              that.setData({
                loadState: LoadFootItemState.Loading_State_Normal
              })
            } else {
              that.setData({
                loadState: LoadFootItemState.Loading_State_End
              })
            }
          }, function(res){
            loadState: LoadFootItemState.Loading_State_Normal
          }
        )
      } else {
        Utils.logInfo("服务上滑");
        that.getServerReleaselist(that.data.offset, function callback(data) {
          let tempList = that.data.serviceList.concat(data);
          that.setData({
            serviceList: tempList
          })
          that.data.offset = that.data.offset + Limit;
          if (data.length >= Limit) {
            that.setData({
              loadState: LoadFootItemState.Loading_State_Normal
            })
          } else {
            that.setData({
              loadState: LoadFootItemState.Loading_State_End
            })
          }
        }, function(res){
          that.setData({
            loadState: LoadFootItemState.Loading_State_Normal
          })
        })
      }
    }, function notLoginCallback(){
      that.setData({
        loadState: LoadFootItemState.Loading_State_Normal
      })
    })
  },

  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },

  /**
   * 点击宠物
   */
  tapPetItem: function(e) {
    let index = e.currentTarget.dataset.index;
    let pet = this.data.releaseList[index];
    Utils.logInfo(pet);

    wx.navigateTo({
      url: PagePath.Page_Store_PetsInforMation + '?petno=' + pet.pet.petNo
    })
  },

  /**
   * 点击商品
   */
  tapGoodsItem: function(e) {
    let index = e.currentTarget.dataset.index;
    let goodsItem = this.data.goodsList[index];
    Utils.logInfo(goodsItem);
    wx.navigateTo({
      url: PagePath.Page_Mall_CommodityInformation + "?itemno=" + goodsItem.item.itemNo
    })
  },

  /**
   * 宠物点击上架
   */
  tapOnShelves: function(e) {
    wx.showLoading({
      title: '请稍等...',
    })
    let index = e.currentTarget.dataset.index;
    let tempPet = this.data.releaseList[index];
    let that = this;
    PetService.onOrOffShelves({
        petNo: tempPet.pet.petNo,
        itemState: 1,
      },
      function resultCallback(result) {
        Utils.logInfo("上架 :\n" + JSON.stringify(result));
        if (result.root == "操作成功") {
          wx.showToast({
            title: '上架成功',
            icon: 'none'
          })
          that.data.releaseList[index].pet.petState = 1;
          that.setData({
            releaseList: that.data.releaseList
          })
          that.onShow();
        } else {
          wx.showToast({
            title: '上架插入失败',
            icon: 'none'
          })
        }
      }
    )

  },

  /**
   * 宠物点击下架
   */
  tapOffShelves: function(e) {
    wx.showLoading({
      title: '请稍等...',
    })
    let index = e.currentTarget.dataset.index;
    let tempPet = this.data.releaseList[index];
    let that = this;
    PetService.onOrOffShelves({
        petNo: tempPet.pet.petNo,
        itemState: 0,
      },
      function resultCallback(result) {
        Utils.logInfo("下架 :\n" + JSON.stringify(result));
        if (result.root == "操作成功") {
          wx.showToast({
            title: '下架成功',
            icon: 'none'
          })
          that.data.releaseList[index].pet.petState = 0;
          that.setData({
            releaseList: that.data.releaseList
          })
        } else {
          wx.showToast({
            title: '下架插入失败',
            icon: 'none'
          })
        }
      }
    )
  },

  /**
   * 宠物列点击编辑
   */
  tapEdit: function(e) {
    let tempEditPet = this.data.releaseList[e.currentTarget.dataset.index];
    PetService.getPetDetail(tempEditPet.pet.petNo, function callback(res){
      app.globalData.editReleasePet = res.root;
      wx.navigateTo({
        url: PagePath.Page_Me_ReleaseManager_ReleaseNew + "?type=1",
      })
    })
  },

  /**
   * 点击发布新宠
   */
  tapAddNewRelease: function () {
    let that = this;
    UserService.isLogin(function isLoginCallback() {
      wx.reLaunch({
        url: PagePath.Page_Me_ReleaseManager_Eleaseproducts + "?type=0",
      })
    }, null)
  },

  /**1
   * 请求宠物数据
   * @param offset
   * @param getReleasePetCallback
   */

  requestReleasePetList: function(offset, getReleasePetCallback) {
    PetStore.getStorePetList(PetFilterObj.getPetList({
        businessNo: UserService.getBusinessNo(),
        offset: offset,
        limit: Limit,
        petState: null
      }),

      function getResultCallback(result) {
        if (Util.checkIsFunction(getReleasePetCallback)) {
          getReleasePetCallback(result.root)
        }
      }
    )
  },

  /**
   * 切换已发布列表
   */
  showSelectList: function() {
    let that = this;
    this.setData({
      showSelect: !that.data.showSelect
    })
  },

  /**
   * 选择列表
   */
  selectSignTap: function(res) {
    let that = this;
    let index = res.currentTarget.dataset.index
    if (index == 0) {
      that.setData({
        switchType: 0
      })
      wx.startPullDownRefresh();
    } else if (index == 1) {
      that.setData({
        switchType: 1
      })
      wx.startPullDownRefresh();
    } else {
      that.setData({
        switchType: 2
      })
      wx.startPullDownRefresh();
    }
    this.setData({
      showSelect: true
    })
  },

  /**
   * 隐藏选框
   */
  hiddenSelectTap: function() {
    this.setData({
      showSelect: true
    })
  },

  /**
   * 商品列表操作
   */
  goodsOperation: function(e) {
    let that = this;
    let index = e.currentTarget.dataset.index; //按钮下标
    let infoindex = e.currentTarget.dataset.goodsindex; //商品下标
    wx.setStorageSync("businessReleaseMall", that.data.goodsList[infoindex])
    wx.navigateTo({
      url: "../../../mallsubcontracting/pages/productreleasedetails/index?type=1"
    })
  },

  /**
   * 商品上下架
   */
  goodsUpperAndLower: function(e) {
    let that = this;
    let infoindex = e.currentTarget.dataset.goodsindex; //商品下标
    let itemState = e.currentTarget.dataset.itemstate; //判断商品状态
    let itemNo = e.currentTarget.dataset.itemno; //商品id
    if (itemState == 1) { //下下架操作
      CommdityReleaseService.commodityUpperShelf(itemNo, function(result) {
        if (result.root == "操作成功") {
          wx.showToast({
            title: '下架成功',
          })
          that.data.goodsList[infoindex].item.itemState = 0;
          that.setData({
            goodsList: that.data.goodsList
          })
        } else {
          wx.showToast({
            title: '下架失败',
            icon: 'none'
          })
        }

      })
    } else { //上架操作
      CommdityReleaseService.commodityLowerShelf(itemNo, function(result) {
        if (result.root == "操作成功") {
          wx.showToast({
            title: '上架成功',
          })
          that.data.goodsList[infoindex].item.itemState = 1;
          that.setData({
            goodsList: that.data.goodsList
          })
        } else {
          wx.showToast({
            title: '上架失败',
            icon: 'none'
          })
        }
      })
    }
  },

  /**
   * 服务上下架
   */
  serviceUpAndDown: function(e) {
    let index = e.currentTarget.dataset.index;
    let state = e.currentTarget.dataset.state;
    let serviceId = e.currentTarget.dataset.serviceid;
    let that = this;
    that.requestServerUpAndDown(state, serviceId, function(res){
      let str = "serviceList[" + index + "].state";
      that.setData({
        [str]: !state
      }) 
    })
  },

  /**
   * 
   */
  tapEditService: function(e) {
    let index = e.currentTarget.dataset.index;
    app.globalData.editService = this.data.serviceList[index];
    wx.navigateTo({
      url: "/mallsubcontracting/pages/publishingservice/index",
    })
  },


  /**
   * 改价输入框
   */
  gaiPriceTap: function(e) {
    let value = e.detail.value;
    this.setData({
      gaiPrice: value
    })
  },

  /**
   * 折率输入框
   */
  zheTap: function(e) {
    let value = e.detail.value;
    let that = this;
    this.setData({
      gaiPrice: (that.data.afterPrice.goodsPrice * value * 0.1).toFixed(2)
    })
  },

  /**
   * 取消
   */
  cancelTap: function() {
    this.setData({
      showGoodsMask: 0,
    })
  },

  /**
   * 确定goodsInfo.goodsIndex
   */
  determineTap: function() {
    let that = this;
    if (that.data.gaiPrice == "" || that.data.gaiPrice == null) {
      wx.showToast({
        title: '请输入修改金额！',
        icon: "none"
      })
      return;
    }
    Utils.logInfo(that.data.afterPrice.goodsIndex);
    var showgaiPrice = "goodsList[" + that.data.afterPrice.goodsIndex + "].goodsPrice";
    this.setData({
      showGoodsMask: 0,
      [showgaiPrice]: that.data.gaiPrice
    })
  },

  goTop: function(e) { // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  onPageScroll: function(res) {
    let that = this;
    let scrollTop = res.scrollTop;
    if (scrollTop > wx.getSystemInfoSync().windowHeight) {
      that.setData({
        showTop: false
      })
    } else {
      that.setData({
        showTop: true
      })
    }
  },


  /**
   * 获得商品发布列表
   */
  getBusinessReleaseMall: function(offset, callBack, completeCallback) {
    let param = {
      businessNo: UserService.getBusinessNo(),
      offset: offset,
      limit: Limit,
    }
    MallService.getItemList(param, function(data) {
      callBack(data.root)
    }, function(res) {
      if (Util.checkIsFunction(completeCallback)) {
        completeCallback(res);
      }
    })
  },

  /**
   * 获取已发布服务列表
   */
  getServerReleaselist: function(offset, callback, completeCallback) {
    ServerManager.getReleasedServerList(UserService.getBusinessNo(), offset, Limit, -1, function getReleaseCallback(result) {
      if (Util.checkIsFunction(callback)) {
        callback(result)
      }
    }, null,function(res) {
      if (Util.checkIsFunction(completeCallback)) {
        completeCallback(res);
      }
    })
  },

  /**
   * 请求服务上下架
   * 
   * @param state
   * @param serviceId
   * @param index
   * @param resultCallback
   */
  requestServerUpAndDown: function(state, serviceId, resultCallback){
    if (state) {
      ServerManager.dismountServer(serviceId, function(res){
        if (Util.checkIsFunction(resultCallback)) {
          resultCallback(res);
        }
      });
    } else {
      ServerManager. groundingServer(serviceId, function(res){
        if (Util.checkIsFunction(resultCallback)) {
          resultCallback(res);
        }
      })
    }
  }

})