// pages/store/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleSelectList: [
      {
        selectInfo: "阿里地",
        showSelect: true,     //icon 切换
      },
      {
        selectInfo: "资质",
        showSelect: true,
      },
      {
        selectInfo: "信誉",
        showSelect: true,
      }
    ],
    recommendedBusinesses:[
      {
        recommendeImageUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615888&di=c28964589a162ad2e7d23f914e3121a8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F12%2F20180212000014_5jSev.jpeg",
        recommendeName:"聚宠优品"
      },
      {
        recommendeImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615888&di=f8421b4c5a3e10e77581f072cdc2fbd1&imgtype=0&src=http%3A%2F%2Fpic.qjimage.com%2Feast027%2Fhigh%2Feast-ep-a21-9717711.jpg",
        recommendeName: "阿宝精"
      },
      {
        recommendeImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659641057&di=ace4c59f3a567531dab294b0166e5ccf&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1799409112%2C785386547%26fm%3D214%26gp%3D0.jpg",
        recommendeName: "终身售后"
      },
      {
        recommendeImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615886&di=3447ec5d60504cfbc492af5688394782&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201708%2F30%2F20170830102345_LXUSz.thumb.700_0.jpeg",
        recommendeName: "宠先生"
      },
      {
        recommendeImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615885&di=3a797e0890dc4602684f7d225d56febc&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2FDowns%2Fimages%2F2010%2F8%2F1%2Fsy_20100801110936765065.jpg",
        recommendeName: "大宝先生"
      },
      {
        recommendeImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615883&di=f8c406a57e3ba2c997aad313a03c0db4&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180801%2F00%2F1533055090-cfEqDAVYsC.jpg",
        recommendeName: "小包先生"
      },
      {
        recommendeImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615883&di=94c885120ed5aae2eb9877f75af93a53&imgtype=0&src=http%3A%2F%2Fimages.liqucn.com%2Fimg%2Fh1%2Fh969%2Fimg201709201023420_info300X300.jpg",
        recommendeName: "宠宝"
      },
      
    ], //推荐商家
    dataSourceType:[],  
    //是否隐藏蒙版
    maskVarietiesShow: true,
    maskFavoritegrainShow: true,
    maskbrandShow: true,
    showDropDownMessage: true   //是隐藏下拉框信息
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
 * 头部下拉选择显示
 */
  titleSelectTap: function (e) {
    let that = this;
    var selectType = e.currentTarget.dataset.index;  //下标
    var upone = "titleSelectList[" + 0 + "].showSelect";  //数组进行字符串拼接 下拉提示信息1
    var uptwo = "titleSelectList[" + 1 + "].showSelect";    //下拉提示信息2
    var upthree = "titleSelectList[" + 2 + "].showSelect";  //下拉提示信息3
    this.setData({
      titleSelectIndex: selectType,
    })

    if (selectType == 0) {  //判断类型显示各个属性值
      that.setData({
        [upone]: !that.data.titleSelectList[0].showSelect,  //替换数组里的某个属性
        [uptwo]: true,     //下拉箭头方向
        [upthree]: true,   //下拉箭头方向
        dataSourceType: that.data.varieties, //数据切换
        maskVarietiesShow: !that.data.maskVarietiesShow, //蒙版重复点击
        maskFavoritegrainShow: true,   //其他两块蒙版是否隐藏
        maskbrandShow: true            //其他两块蒙版是否隐藏
      })

    }

    if (selectType == 1) {
      that.setData({
        [uptwo]: !that.data.titleSelectList[1].showSelect,
        [upone]: true,
        [upthree]: true,
        dataSourceType: that.data.favoriteGrain,
        maskFavoritegrainShow: !that.data.maskFavoritegrainShow,
        maskVarietiesShow: true,
        maskbrandShow: true
      })
    }

    if (selectType == 2) {
      that.setData({
        [upthree]: !that.data.titleSelectList[2].showSelect,
        [upone]: true,
        [uptwo]: true,
        dataSourceType: that.data.brand,
        maskbrandShow: !that.data.maskbrandShow,
        maskFavoritegrainShow: true,
        maskVarietiesShow: true
      })
    }

    if (that.data.titleSelectList[selectType].showSelect == true) {  //下拉信息显示
      that.setData({
        showDropDownMessage: true
      })
    } else {
      that.setData({
        showDropDownMessage: false
      })
    }

  },
  
  /**
 * 点击蒙版----------------------------------
 */
  maskVarietiesTap: function () {
    var upone = "titleSelectList[" + 0 + "].showSelect";  //数组进行字符串拼接
    let that = this;
    if (that.data.maskVarietiesShow == false) {
      that.setData({
        maskVarietiesShow: true,    //蒙版是否隐藏
        showDropDownMessage: true, //下拉信息
        [upone]: true    //下拉箭头是上还是下
      })
    }
  },

  maskFavoritegrainTap: function () {
    var uptwo = "titleSelectList[" + 1 + "].showSelect";
    let that = this;
    if (that.data.maskFavoritegrainShow == false) {
      that.setData({
        maskFavoritegrainShow: true,
        showDropDownMessage: true,
        [uptwo]: true
      })
    }
  },

  maskbrandTap: function () {
    var upthree = "titleSelectList[" + 2 + "].showSelect";
    let that = this;
    if (that.data.maskbrandShow == false) {
      that.setData({
        maskbrandShow: true,
        showDropDownMessage: true,
        [upthree]: true
      })
    }
  }
})