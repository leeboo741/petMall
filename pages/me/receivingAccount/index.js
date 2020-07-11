// pages/me/receivingAccount/index.js
const AccountManager = require("../../../services/accountManager.js");
const UserManager = require("../../../services/userService.js");
const Util = require("../../../utils/util.js");
const Utils = require("../../../utils/util")
const ShareManager = require("../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    aliPayAccount: null,
    wechatPayAccount: null,

    accountList: [], // 账户列表
    newAccount: {}, // 要添加的账户

    accountTypeList: [
      {
        accountTypeName: "支付宝",
        accountTypeValue: AccountManager.Account_Type_AliPay
      },
      {
        accountTypeName: "微信",
        accountTypeValue: AccountManager.Account_Type_Wechat
      },
      {
        accountTypeName: "银行卡",
        accountTypeValue: AccountManager.Account_Type_BankCard
      }
    ],
    selectAccountTypeName: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.showLoading({
      title: '请稍等...',
    })
    this.requestAccountList(function getResultCallback(result) {
      wx.hideLoading();
      that.setData({
        accountList: result
      })
    });
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
   * 选择账户类型
   */
  selectAccountType: function (e) {
    var newAccount = this.data.newAccount;
    var selectAccountType = this.data.accountTypeList[e.detail.value];
    var selectAccountTypeName = AccountManager.getAccountNameByType(selectAccountType.accountTypeValue);
    newAccount.accountType = selectAccountType.accountTypeValue;
    if (newAccount.accountType != AccountManager.Account_Type_BankCard) {
      newAccount.name = null;
      newAccount.bankName = null;
    }
    this.setData({
      newAccount: newAccount,
      selectAccountTypeName: selectAccountTypeName,
    })
  },

  /**
   * 输入账号
   */
  inputAccountNumber: function (e) {
    var newAccount = this.data.newAccount;
    newAccount.accountNum = e.detail.value;
    this.setData({
      newAccount: newAccount
    })
  },

  /**
   * 输入银行名称
   */
  inputBankName: function(e) {
    var newAccount = this.data.newAccount;
    newAccount.bankName = e.detail.value;
    this.setData({
      newAccount: newAccount
    })
  },

  /**
   * 输入收款人名称
   */
  inputReceivingName: function (e) {
    var newAccount = this.data.newAccount;
    newAccount.name = e.detail.value;
    this.setData({
      newAccount: newAccount
    })
  },

  /**
   * 点击新建
   */
  tapAdd: function (e) {
    let that = this;
    var accountObj = this.getSubmitAccountObj(this.data.newAccount);
    if (accountObj != null) {
      this.requestAddAccount(accountObj, function addAccountCallback(result){
        Utils.logInfo(result);
        wx.showToast({
          title: '新建账户成功',
        })
        that.data.accountList.push(accountObj);
        that.setData({
          accountList: that.data.accountList,
          newAccount: null,
          selectAccountTypeName: null
        })
        that.requestAccountList(function getResultCallback(result) {
          that.setData({
            accountList: result
          })
        });
      })
    }
  },

  /**
   * 点击账户
   */
  tapAccount: function(e) {
    let that = this;
    var index = e.currentTarget.dataset.index;
    var accountObj = this.data.accountList[index];
    wx.showActionSheet({
      itemList: ["删除账户"],
      success(res) {
        if (res.tapIndex == 0) {
          wx.showModal({
            title: '确定删除',
            content: '是否要删除账户:' + accountObj.accountNum,
            success(modelRes) {
              if (modelRes.confirm) {
                that.requestDelete(accountObj.accountNo, function deleteResultCallback(){
                  that.data.accountList.splice(index,1);
                  that.setData({
                    accountList: that.data.accountList
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
   * 检查新增数据
   */
  getSubmitAccountObj: function(newAccount) {
    if (newAccount.accountType == null) {
      wx.showToast({
        title: '请选择账户类型',
        icon: 'none'
      })
      return null;
    }
    if (Util.checkEmpty(newAccount.accountNum)) {
      wx.showToast({
        title: '请输入账号|卡号',
        icon: 'none'
      })
      return null;
    }
    if (Util.checkEmpty(newAccount.name)) {
      wx.showToast({
        title: '请输入收款人名称',
        icon: 'none'
      })
      return null;
    }
    switch(newAccount.accountType) {
      case AccountManager.Account_Type_BankCard:
        if (Util.checkEmpty(newAccount.bankName)) {
          wx.showToast({
            title: '请输入银行名称',
            icon: 'none',
          })
          return null;
        }
        break;
      default: 
        break;
    }
    newAccount.business = UserManager.getLocalBusinessInfo();
    return newAccount;
  },

  /**
   * 请求列表数据
   */
  requestAccountList: function(getAccountListCallback) {
    AccountManager.getAccountList(UserManager.getBusinessNo(), function getResultCallback(result){
      if (Util.checkIsFunction(getAccountListCallback)) {
        getAccountListCallback(result)
      }
    })
  },

  /**
   * 请求添加
   */
  requestAddAccount: function(accountObj, addAccountCallback){
    AccountManager.addAccount(accountObj, function addResultCallback(result){
      if (Util.checkIsFunction(addAccountCallback)) {
        addAccountCallback(result)
      }
    })
  },

  /**
   * 请求删除
   */
  requestDelete: function(accountNo, deleteAccountCallback) {
    AccountManager.deleteAccount(accountNo, function deleteResultCallback(result){
      if (Util.checkIsFunction(deleteAccountCallback)) {
        deleteAccountCallback(result)
      }
    })
  }

  
})