// pages/me/addressManager/addNewAddress.js

const app = getApp();
const AddressManagerService = require("../../../services/addressManagerService.js");
const {AddressObj} = require("../../../entity/addressObj.js");
const UserService = require("../../../services/userService.js");

const ShareManager = require("../../../services/shareService");
const Utils = require("../../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageTitle: null,
    buttonTitle: null,
    pageHeight: null,
    editAddress: null, 
    type:null, // 类型 0 新增 1 修改

    contacts: null, // 输入 收件人
    phone: null, // 输入 电话
    region: null, // 输入 区域
    detailedAddress: null, // 输入 详细地址
    isDefault: false, // 输入 默认

    receivingNo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const tempEditAddress = app.editAddressObj;
    if (tempEditAddress == null) {
      this.setData({
        pageHeight: app.globalData.pageHeight,
        pageTitle: "新增收货地址",
        buttonTitle: "新增地址",
        type: 0,
        editAddress: {},
        contacts: "",
        phone: "",
        region: [],
        detailedAddress: "",
      })
    } else {
      this.setData({
        editAddress: tempEditAddress,
        pageHeight: app.globalData.pageHeight,
        pageTitle: "编辑收货地址",
        buttonTitle: "保存地址",
        type: 1,
        contacts: tempEditAddress.contacts,
        phone: tempEditAddress.phone,
        region: [
          tempEditAddress.province,
          tempEditAddress.city,
          tempEditAddress.county,
        ],
        detailedAddress: tempEditAddress.detailedAddress,
        isDefault: tempEditAddress.isDefault == 1? true: false
      })
    }
    app.editAddressObj = null;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return ShareManager.getDefaultShareCard();
  },

  /**
   * 输入联系人
   */
  inputAddressee: function (e) {
    this.data.contacts = e.detail.value
  },

  /**
   * 输入电话
   */
  inputPhone: function(e) {
    this.data.phone = e.detail.value
  },

  /**
   * 选择区域
   */
  selectRegion: function(e) {
    this.setData({
      region: e.detail.value
    })
  },

  /**
   * 输入详细地址
   */
  inputDetailAddress: function(e) {
    this.data.detailedAddress = e.detail.value
  },

  /**
   * 选择默认
   */
  checkDefault: function(e) {
    this.data.isDefault = e.detail.value
  },

  /**
   * 确认提交
   */
  tapToAddNew: function(e) {
    let that = this;
    UserService.isLogin(function isLoginCallback(){
      let addressObj = new AddressObj({
        province: that.data.region[0], // 省
        city: that.data.region[1], // 市
        county: that.data.region[2], // 区县
        detailedAddress: that.data.detailedAddress, // 详细地址
        contacts: that.data.contacts, // 联系人名称
        phone: that.data.phone, // 联系人电话
        isDefault: that.data.isDefault, // 是否默认地址
        // latitude: "", // 纬度
        // longitude : "", // 经度
        business: {
          businessNo: UserService.getBusinessNo()
        }
        // 地址 所属人
      })

      Utils.logInfo(JSON.stringify(addressObj))

      if (that.data.type == 0) {
        AddressManagerService.addNewAddress(addressObj,
          function addCallback(result) {
            Utils.logInfo("add new address \n" + JSON.stringify(result));
            wx.navigateBack({

            })
          }
        )
      } else {
        addressObj.receivingNo = that.data.editAddress.receivingNo;
        AddressManagerService.editAddress(addressObj,
          function editCallback(result) {
            Utils.logInfo("edit address \n" + JSON.stringify(result));
            wx.navigateBack({

            })
          }
        )
      }
    })
  },

  /**
   * 点击删除
   */
  tapToDelete: function() {
    let that = this;
    wx.showModal({
      title: '确认删除',
      content: "确认删除该地址",
      success(res) {
        if (res.confirm) {
          AddressManagerService.deleteAddress(that.data.editAddress.receivingNo,
            function deleteCallback(result) {
              Utils.logInfo("delete address \n" + JSON.stringify(result));
              wx.navigateBack({
                
              })
            }
          )
        }
      }
    })
    
  }
})