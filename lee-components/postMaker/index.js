// components/postMaker/index.js
const app = getApp();
import drawQrcode from '../../libs/weapp.qrcode.esm.js'
import util from '../../utils/util.js';
const UserManager = require("../../services/userService");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    canvasWidth: {
      type: Number,
      value: 1125
    },
    canvasHeight: {
      type: Number,
      value: 2001
    },
    showPoster:{
      type: Number,
      value: false,
    },
    userInfo: {
      type: Object,
      value: {},
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    posterImagePath: "",
    qrcodeImagePath: "",
    storeHeadImg: null,
  },

  /**
   * 属性监听
   */
  observers: {
    "showPoster": function (showPoster) {
      if (showPoster) {
        if (!this.data.posterImagePath || this.data.posterImagePath.length <= 0) {
          let that = this;
          wx.showLoading({
            title: '生成中,请稍等',
          })
          this.createQRCode(function(qrpath) {
            that.data.qrcodeImagePath = qrpath;
            if (that.data.userInfo.business.headImg) {
              that.downloadHeadImg(that.data.userInfo.business.headImg, function(success, data){
                if (success) {
                  that.setData({
                    storeHeadImg: data.tempFilePath
                  })
                  that.createNewImg(function() {
                    wx.hideLoading();
                  });
                } else {
                  wx.hideLoading();
                  wx.showToast({
                    title: '加载店铺图像失败',
                    icon: 'none'
                  })
                }
              })
            } else {
              that.createNewImg(function() {
                wx.hideLoading();
              });
            }
          })
        }
      } else {
        let callBackFunctionName = 'watch-close'; // 触发事件 方法名
        let myEventDetail = false; // detail对象，提供给事件监听函数
        let myEventOption = {
          'bubbles': false, // 事件是否冒泡
          'composed': false, // 事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部
          'capturePhase': false, // 事件是否拥有捕获阶段
        }; // 触发事件的选项
        this.triggerEvent(callBackFunctionName, myEventDetail, myEventOption);
      }
    },

  },
  /**
   * 组件的方法列表
   */
  methods: {
    saveResult: function(result) {
      let callBackFunctionName = 'save-poster'; // 触发事件 方法名
      let myEventDetail = result; // detail对象，提供给事件监听函数
      let myEventOption = {
        'bubbles': false, // 事件是否冒泡
        'composed': false, // 事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部
        'capturePhase': false, // 事件是否拥有捕获阶段
      }; // 触发事件的选项
      this.triggerEvent(callBackFunctionName, myEventDetail, myEventOption);
    },
    /**
     * 保存海报
     */
    savePosterAction: function(res){
      console.log('保存海报到相册');
      var that = this
      wx.saveImageToPhotosAlbum({
        filePath: that.data.posterImagePath,
        success(res) {
          wx.showModal({
            content: '海报已保存到相册，快去分享吧~',
            showCancel: false,
            confirmText: '好的',
            confirmColor: '#333',
            success: function (res) {
              if (res.confirm) {
                that.saveResult(true);
                that.setData({
                  showPoster: false
                })
              }
            }
          })
        },
        fail(res){
          that.saveResult(false);
          wx.showToast({
            title: '保存海报失败!',
            icon: 'none'
          })
          that.setData({
            showPoster: false
          })
        }
      })
    },
    tapPoster: function(res) {
      this.setData({
        showPoster: false
      })
    },
    createQRCode: function(createQRCodeCallback) {
      let that = this;
      let text = 'https://market.taochonghui.com/weapp/jump/business?type=poster&target=business_detail&businessno='+that.data.userInfo.business.businessNo;
      if (UserManager.getBusinessNo()) {
        text = text + "&sharebusinessno=" + UserManager.getBusinessNo();
      }
      if (UserManager.getUserOpenId()) {
        text = text + "&shareopenid=" + UserManager.getUserOpenId();
      }
      drawQrcode({
        text:  text,
        width: 200,
        height: 200,
        padding: 12, 
        canvasId: 'myQrcode',// 生成二维码四周自动留边宽度，不传入默认为0
        callback: () => {
          //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
          setTimeout(function () {
            wx.canvasToTempFilePath({
              canvasId: 'myQrcode',
              success: function (res) {
                var tempFilePath = res.tempFilePath;
                // 接下来就可以直接调用微信小程序的api保存到本地或者将这张二维码直接画在海报上面去，看各自需求
                if (createQRCodeCallback && typeof createQRCodeCallback === 'function') {
                  createQRCodeCallback(tempFilePath)
                }
              }
            },that);
          }, 1000);
        },
        _this: this,
      })
    },

    downloadHeadImg: function(path, callback) {
      wx.downloadFile({
        url: path,
        success(res) {
          if (util.checkIsFunction(callback)) {
            callback(true, res);
          }
        },
        fail(res) {
          if (util.checkIsFunction(callback)) {
            callback(false, res);
          }
        }
      })
    },

    //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
    createNewImg: function (createCallback) {

      const postWidth = 1125;
      const postHeight = 2001;
      const zero = 0;
      const postPadding = 60;
      const labelPadding = 20;

      const whiteColor = "#fff";
      const blackColor = "#000";
      const redColor = "#ee2c2c";
      const yellowColor = "#ffe200";
      const gray = "#808080";
      const lightGray = "#D3D3D3";

      let that = this;
      let context = wx.createCanvasContext('posterCanvas',that);
      // 海报背景设置
      context.setFillStyle(whiteColor); // 背景色
      context.fillRect(zero, zero, postWidth, postHeight); //海报尺寸
      // 头部商城信息栏
      // 商城logo
      const mallLogoPath = "/resource/tchlog.png";
      const logoWidth = 200;
      const mallLogoPath_x = postPadding;
      const mallLogoPath_y = postPadding * 2;
      context.drawImage(mallLogoPath, mallLogoPath_x, mallLogoPath_y, logoWidth, logoWidth);

      // 商城名称
      const mallName = '淘宠惠一站式服务中心';
      const mallNameFontSize = 50;
      const mallNameColor = gray;
      const mallName_x = postPadding * 2 + logoWidth;
      const mallName_y = postPadding * 3
      context.setFontSize(mallNameFontSize);
      context.setFillStyle(mallNameColor);
      context.setTextAlign('left');
      context.fillText(mallName, mallName_x, mallName_y);
      context.stroke();

      // 商城 slogon1
      const mallSlogon1 = '买宠物，卖宠物，可靠有保障';
      const slogon1FontSize = 40;
      const slogon1Color = lightGray;
      const slogon1_x = mallName_x;
      const slogon1_y = mallName_y + mallNameFontSize + labelPadding;
      context.setFontSize(slogon1FontSize);
      context.setFillStyle(slogon1Color);
      context.setTextAlign('left');
      context.fillText(mallSlogon1, slogon1_x , slogon1_y);
      context.stroke();

      // 商城 slogon2
      const mallSlogon2 = '服务更专业，用品更丰富';
      const slogon2FontSize = 40;
      const slogon2Color = lightGray;
      const slogon2_x = mallName_x;
      const slogon2_y = slogon1_y + slogon1FontSize + labelPadding;
      context.setFontSize(slogon2FontSize);
      context.setFillStyle(slogon2Color);
      context.setTextAlign('left');
      context.fillText(mallSlogon2, slogon2_x,  slogon2_y);
      context.stroke();

      // 店铺主图
      const storeHeadImagePath = that.data.storeHeadImg? that.data.storeHeadImg : mallLogoPath;
      const storeHeadImage_x = postPadding;
      const storeHeadImage_y = slogon2_y + slogon2FontSize + postPadding;
      const storeImgWidth = postWidth - (postPadding * 2);
      context.drawImage(storeHeadImagePath, storeHeadImage_x, storeHeadImage_y, storeImgWidth, storeImgWidth);

      // 店铺名称
      const storeName = that.data.userInfo.business.businessName;
      const storeNameFontSize = 50;
      const storeNameColor = gray;
      const storeName_x = postPadding;
      const storeName_y = storeHeadImage_y + storeImgWidth + postPadding;
      context.setFontSize(storeNameFontSize);
      context.setFillStyle(storeNameColor);
      context.setTextAlign('left');
      context.fillText(storeName, storeName_x,  storeName_y);
      context.stroke();
      
      // 店铺电话
      const storePhone = that.data.userInfo.business.contactPhone;
      const storePhoneFontSize = 40;
      const storePhoneColor = gray;
      const storePhone_x = postWidth - postPadding;
      const storePhone_y = storeName_y;
      context.setFontSize(storePhoneFontSize);
      context.setFillStyle(storePhoneColor);
      context.setTextAlign('right');
      context.fillText(storePhone, storePhone_x , storePhone_y);
      context.stroke();

      // 店铺地址
      const storeAddress1 = "地址：" + that.data.userInfo.business.province + " " + that.data.userInfo.business.city + " " + that.data.userInfo.business.area;
      const storeAddressFontSize = 40;
      const storeAddressColor = gray;
      const storeAddress1_x = postPadding;
      const storeAddress1_y = storeName_y + storeNameFontSize + postPadding;
      context.setFontSize(storeAddressFontSize);
      context.setFillStyle(storeAddressColor);
      context.setTextAlign('left');
      context.fillText(storeAddress1, storeAddress1_x, storeAddress1_y);
      context.stroke();
      const storeAddress2 = that.data.userInfo.business.detailAddress;
      const storeAddress2_x = postPadding + 120;
      const storeAddress2_y = storeAddress1_y + storeAddressFontSize + labelPadding;
      context.setFontSize(storeAddressFontSize);
      context.setFillStyle(storeAddressColor);
      context.setTextAlign('left');
      context.fillText(storeAddress2, storeAddress2_x,  storeAddress2_y);
      context.stroke();

      // 二维码提示语
      const codeTitle = "长按或扫描二维码进入店铺";
      const codeTitleFontSize = 40;
      const codeTitleColor = gray;
      const codeTitle_x = postPadding;
      const codeTitle_y = storeAddress2_y + storeAddressFontSize + postPadding + 60;
      context.setFontSize(codeTitleFontSize);
      context.setFillStyle(codeTitleColor);
      context.setTextAlign('left');
      context.fillText(codeTitle, codeTitle_x, codeTitle_y);
      context.stroke();

      // slogon3
      const slogon3 = "最快一小时送达，越淘越优惠";
      const slogon3FontSize = 40;
      const slogon3Color = gray;
      const slogon3_x = postPadding;
      const slogon3_y = codeTitle_y + codeTitleFontSize + labelPadding;
      context.setFontSize(slogon3FontSize);
      context.setFillStyle(slogon3Color);
      context.setTextAlign('left');
      context.fillText(slogon3, slogon3_x, slogon3_y);
      context.stroke();

      // 二维码
      const qrcodePath = that.data.qrcodeImagePath;
      const qrcodeWith = 280;
      const qrcode_x =  postWidth - postPadding - qrcodeWith;
      const qrcode_y = storeAddress2_y + storeAddressFontSize;
      context.drawImage(qrcodePath, qrcode_x, qrcode_y, qrcodeWith, qrcodeWith);

      // 绘制图片
      context.draw(true, () => {
        //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
        setTimeout(function () {
          wx.canvasToTempFilePath({
            canvasId: 'posterCanvas',
            success: function (res) {
              var tempFilePath = res.tempFilePath;
              that.setData({
                posterImagePath: tempFilePath
              });
            },
            fail: function (res) {
              console.log(res);
            },
            complete(res) {
              if (createCallback && typeof createCallback === 'function') {
                createCallback()
              }
            }
          },that);
        }, 2000);
      });
      
    },
  },

  created: function() {

  }
})
