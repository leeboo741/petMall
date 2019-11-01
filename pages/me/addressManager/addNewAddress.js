// pages/me/addressManager/addNewAddress.js

const app = getApp();
const AddressManagerService = require("../../../services/addressManagerService.js");
const {AddressObj} = require("../../../entity/addressObj.js");
const UserService = require("../../../services/userService.js");

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

    addressNo: null,
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
    let addressObj = new AddressObj({
      province: this.data.region[0], // 省
      city: this.data.region[1], // 市
      county: this.data.region[2], // 区县
      detailedAddress: this.data.detailedAddress, // 详细地址
      contacts: this.data.contacts, // 联系人名称
      phone: this.data.phone, // 联系人电话
      isDefault: this.data.isDefault, // 是否默认地址
      // latitude: "", // 纬度
      // longitude : "", // 经度
      customer: {
        customerNo: UserService.getCustomerNo()
      } // 地址 所属人
    })

    if (this.data.type == 0) {
      AddressManagerService.addNewAddress(addressObj,
        function addCallback(result) {
          console.log("add new address \n" + JSON.stringify(result));
          wx.navigateBack({

          })
        }
      )
    } else {
      addressObj.addressNo = this.data.editAddress.addressNo;
      AddressManagerService.editAddress(addressObj,
        function editCallback(result) {
          console.log("edit address \n" + JSON.stringify(result));
          wx.navigateBack({

          })
        }
      )
    }
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
          AddressManagerService.deleteAddress(that.data.editAddress.addressNo,
            function deleteCallback(result) {
              console.log("delete address \n" + JSON.stringify(result));
              wx.navigateBack({
                
              })
            }
          )
        }
      }
    })
    
  }
})