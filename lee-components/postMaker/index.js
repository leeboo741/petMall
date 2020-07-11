// components/postMaker/index.js
const app = getApp();
import drawQrcode from '../../libs/weapp.qrcode.esm.js'
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
            that.createNewImg(function() {
              wx.hideLoading();
            });
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
      drawQrcode({
        text: 'https://market.taochonghui.com/weapp/jump/business?type=poster&target=business_detail&businessno='+that.data.userInfo.business.businessNo,
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
          }, 0);
        },
        _this: this,
      })
    },
    //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
    createNewImg: function (createCallback) {
      var that = this;
      var context = wx.createCanvasContext('posterCanvas',that);
      // context.setFillStyle('#fff')
      context.setFillStyle('#ffe200');
      context.fillRect(0, 0, 1125, 2001)
      // 头部背景
      // var path = "/resource/poster/gobg.jpeg";
      // var path = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594464319876&di=a773ebd5082070c91da40af5f10358f0&imgtype=0&src=http%3A%2F%2Fpic.cifnews.com%2Fupload%2F201607%2F25%2F201607251522138753.jpg";
      // context.drawImage(path, 0, 0, 1125, 549);
      // 头像
      // var path1 = that.data.headImagePath;
      // console.log(path1,"path1")
      // 绘制头像
      // context.arc(558, 800, 150, 0, 2 * Math.PI) //画出圆
      // context.strokeStyle = "#ffe200";
      // context.clip(); //裁剪上面的圆形
      // context.drawImage(path1, 408, 650, 300, 300); // 在刚刚裁剪的园上画图
      
      // 店铺名称
      // 店铺名称背景
      var path3 = "/resource/poster/heise.png";
      // 绘制名称背景
      // context.drawImage(path3, 144, 1050, 840, 252);
      context.drawImage(path3, 144, 250, 840, 252);
      // 店铺名称文字
      var name = that.data.userInfo.business.businessName;
      // 绘制名称文字
      context.setFontSize(120);
      context.setFillStyle('#ffe200');
      context.setTextAlign('center');
      // context.fillText(name, 549, 1200);
      context.fillText(name, 549, 400);
      context.stroke();

      //绘制左下角文字背景图
      var path4 = "/resource/poster/wenziBg.png";
      // context.drawImage(path4, 75, 1560, 552, 246);
      context.drawImage(path4, 100, 800, 800, 500);
      context.setFontSize(36);
      context.setFillStyle('#333');
      context.setTextAlign('left');
      // context.fillText("淘宠惠", 105, 1620);
      context.fillText(that.data.userInfo.business.contact, 140, 900);
      context.stroke();
      context.setFontSize(36);
      context.setFillStyle('#333');
      context.setTextAlign('left');
      // context.fillText(name, 105, 1680);
      context.fillText("电话：" + that.data.userInfo.business.contactPhone, 140, 1000);
      context.stroke();
      context.setFontSize(36);
      context.setFillStyle('#333');
      context.setTextAlign('left');
      // context.fillText("欢迎您的光临", 105, 1740);
      context.fillText(that.data.userInfo.business.province + " " + that.data.userInfo.business.city + " " + that.data.userInfo.business.area, 140, 1100);
      context.stroke();
      context.setFontSize(36);
      context.setFillStyle('#333');
      context.setTextAlign('left');
      context.fillText(that.data.userInfo.business.detailAddress , 140, 1200);
      context.stroke();
      
      // 二维码
      context.drawImage(that.data.qrcodeImagePath, 744, 1455, 270, 270);
      // 二维码提示语 
      var path5 = "/resource/poster/wenxin.png";
      //绘制右下角扫码提示语
      context.drawImage(path5, 744, 1734, 270, 75);

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
