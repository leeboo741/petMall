// pages/store/index.js
var city = require('../../utils/city.js');
const Page_path = require("../../macros/pagePath.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageHeight: null,
    titleSelectList: [
      {
        selectInfo: "南昌",
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
        recommendeImageUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615888&di=c28964589a162ad2e7d23f914e3121a8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F12%2F20180212000014_5jSev.jpeg",//头像
        recommendeName:"聚宠优品", //商户名称
        merchantStars:2,          //好评星星数
        merchantAddress:"江西南昌东湖区666号",  //地址
        merchantIntroduction:"家养泰迪",        //介绍
        petsImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615888&di=c28964589a162ad2e7d23f914e3121a8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F12%2F20180212000014_5jSev.jpeg",  //宠物图片
        tradingVolume:2,   //担保交易量
        petsName:"大宝",   //宠物名称
        petsPrice:1200     //价格
      },
      {
        recommendeImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615888&di=f8421b4c5a3e10e77581f072cdc2fbd1&imgtype=0&src=http%3A%2F%2Fpic.qjimage.com%2Feast027%2Fhigh%2Feast-ep-a21-9717711.jpg",
        recommendeName: "阿宝精",
        merchantStars: 3,
        merchantAddress: "江西南昌东湖区666号",
        merchantIntroduction: "家养泰迪",
        petsImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615888&di=c28964589a162ad2e7d23f914e3121a8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F12%2F20180212000014_5jSev.jpeg",
        tradingVolume: 7,   //担保交易量
        petsName: "大宝",   //宠物名称
        petsPrice: 1200   
      },
      {
        recommendeImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659641057&di=ace4c59f3a567531dab294b0166e5ccf&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1799409112%2C785386547%26fm%3D214%26gp%3D0.jpg",
        recommendeName: "终身售后",
        merchantStars: 4,
        merchantAddress: "江西南昌东湖区666号",
        merchantIntroduction: "家养泰迪",
        petsImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615888&di=c28964589a162ad2e7d23f914e3121a8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F12%2F20180212000014_5jSev.jpeg",
        tradingVolume: 5,   //担保交易量
        petsName: "大宝",   //宠物名称
        petsPrice: 1200   
      },
      {
        recommendeImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615886&di=3447ec5d60504cfbc492af5688394782&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201708%2F30%2F20170830102345_LXUSz.thumb.700_0.jpeg",
        recommendeName: "宠先生",
        merchantStars: 5,
        merchantAddress: "江西南昌东湖区666号",
        merchantIntroduction: "家养泰迪",
        petsImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615888&di=c28964589a162ad2e7d23f914e3121a8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F12%2F20180212000014_5jSev.jpeg",
        tradingVolume: 1,   //担保交易量
        petsName: "大宝",   //宠物名称
        petsPrice: 1200   
      },
      {
        recommendeImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615885&di=3a797e0890dc4602684f7d225d56febc&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2FDowns%2Fimages%2F2010%2F8%2F1%2Fsy_20100801110936765065.jpg",
        recommendeName: "大宝先生",
        merchantStars: 2,
        merchantAddress: "江西南昌东湖区666号",
        merchantIntroduction: "家养泰迪",
        petsImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615888&di=c28964589a162ad2e7d23f914e3121a8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F12%2F20180212000014_5jSev.jpeg",
        tradingVolume: 4,   //担保交易量
        petsName: "大宝",   //宠物名称
        petsPrice: 1200   
      },
      {
        recommendeImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615883&di=f8c406a57e3ba2c997aad313a03c0db4&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180801%2F00%2F1533055090-cfEqDAVYsC.jpg",
        recommendeName: "小包先生",
        merchantStars: 1,
        merchantAddress: "江西南昌东湖区666号",
        merchantIntroduction: "家养泰迪",
        petsImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615888&di=c28964589a162ad2e7d23f914e3121a8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F12%2F20180212000014_5jSev.jpeg",
        tradingVolume: 3,   //担保交易量
        petsName: "大宝",   //宠物名称
        petsPrice: 1200   
      },
      {
        recommendeImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615883&di=94c885120ed5aae2eb9877f75af93a53&imgtype=0&src=http%3A%2F%2Fimages.liqucn.com%2Fimg%2Fh1%2Fh969%2Fimg201709201023420_info300X300.jpg",
        recommendeName: "宠宝",
        merchantStars: 3,
        merchantAddress: "江西南昌东湖区666号",
        merchantIntroduction: "家养泰迪",
        petsImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615888&di=c28964589a162ad2e7d23f914e3121a8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F12%2F20180212000014_5jSev.jpeg",
        tradingVolume: 5,   //担保交易量
        petsName: "大宝",   //宠物名称
        petsPrice: 1200   
      },
      
    ], //推荐商家

    merchantInformationList:[  //商家信息
        {
          merchantImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615883&di=94c885120ed5aae2eb9877f75af93a53&imgtype=0&src=http%3A%2F%2Fimages.liqucn.com%2Fimg%2Fh1%2Fh969%2Fimg201709201023420_info300X300.jpg",
          merchantName:"阿宝精品宠物",
          merchantAddress:"江西省南昌市南昌县666号",
          merchantOnSale:"在售574只，担保交易量505只",
          merchantStars:3,
          merchantPraise:296,
          dogInforMation:[
            {
              dogImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615883&di=94c885120ed5aae2eb9877f75af93a53&imgtype=0&src=http%3A%2F%2Fimages.liqucn.com%2Fimg%2Fh1%2Fh969%2Fimg201709201023420_info300X300.jpg",
              dogName:"边境牧羊犬",
              dogPrice:3000,
              dogAddress:"江西南昌"
            },
            {
              dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615883&di=94c885120ed5aae2eb9877f75af93a53&imgtype=0&src=http%3A%2F%2Fimages.liqucn.com%2Fimg%2Fh1%2Fh969%2Fimg201709201023420_info300X300.jpg",
              dogName: "边境牧羊犬",
              dogPrice: 3000,
              dogAddress: "江西南昌"
            },
            {
              dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615883&di=94c885120ed5aae2eb9877f75af93a53&imgtype=0&src=http%3A%2F%2Fimages.liqucn.com%2Fimg%2Fh1%2Fh969%2Fimg201709201023420_info300X300.jpg",
              dogName: "边境牧羊犬",
              dogPrice: 3000,
              dogAddress: "江西南昌"
            }
          ]
        },

      {
        merchantImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615883&di=94c885120ed5aae2eb9877f75af93a53&imgtype=0&src=http%3A%2F%2Fimages.liqucn.com%2Fimg%2Fh1%2Fh969%2Fimg201709201023420_info300X300.jpg",
        merchantName: "阿宝精品宠物",
        merchantAddress: "江西省南昌市南昌县666号",
        merchantOnSale: "在售574只，担保交易量505只",
        merchantStars: 4,
        merchantPraise: 296,
        dogInforMation: [
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615883&di=94c885120ed5aae2eb9877f75af93a53&imgtype=0&src=http%3A%2F%2Fimages.liqucn.com%2Fimg%2Fh1%2Fh969%2Fimg201709201023420_info300X300.jpg",
            dogName: "边境牧羊犬",
            dogPrice: 3000,
            dogAddress: "江西南昌"
          },
           {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615883&di=94c885120ed5aae2eb9877f75af93a53&imgtype=0&src=http%3A%2F%2Fimages.liqucn.com%2Fimg%2Fh1%2Fh969%2Fimg201709201023420_info300X300.jpg",
            dogName: "边境牧羊犬",
            dogPrice: 3000,
            dogAddress: "江西南昌"
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615883&di=94c885120ed5aae2eb9877f75af93a53&imgtype=0&src=http%3A%2F%2Fimages.liqucn.com%2Fimg%2Fh1%2Fh969%2Fimg201709201023420_info300X300.jpg",
            dogName: "边境牧羊犬",
            dogPrice: 3000,
            dogAddress: "江西南昌"
          }
        ]
      },

      {
        merchantImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615883&di=94c885120ed5aae2eb9877f75af93a53&imgtype=0&src=http%3A%2F%2Fimages.liqucn.com%2Fimg%2Fh1%2Fh969%2Fimg201709201023420_info300X300.jpg",
        merchantName: "阿宝精品宠物",
        merchantAddress: "江西省南昌市南昌县666号",
        merchantOnSale: "在售574只，担保交易量505只",
        merchantStars: 5,
        merchantPraise: 296,
        dogInforMation: [
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615883&di=94c885120ed5aae2eb9877f75af93a53&imgtype=0&src=http%3A%2F%2Fimages.liqucn.com%2Fimg%2Fh1%2Fh969%2Fimg201709201023420_info300X300.jpg",
            dogName: "边境牧羊犬",
            dogPrice: 3000,
            dogAddress: "江西南昌"
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615883&di=94c885120ed5aae2eb9877f75af93a53&imgtype=0&src=http%3A%2F%2Fimages.liqucn.com%2Fimg%2Fh1%2Fh969%2Fimg201709201023420_info300X300.jpg",
            dogName: "边境牧羊犬",
            dogPrice: 3000,
            dogAddress: "江西南昌"
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571659615883&di=94c885120ed5aae2eb9877f75af93a53&imgtype=0&src=http%3A%2F%2Fimages.liqucn.com%2Fimg%2Fh1%2Fh969%2Fimg201709201023420_info300X300.jpg",
            dogName: "边境牧羊犬",
            dogPrice: 3000,
            dogAddress: "江西南昌"
          },
        ]
      }
    ],
    dataSourceType:[],  
    //是否隐藏蒙版
    maskVarietiesShow: true,
    maskFavoritegrainShow: true,
    maskbrandShow: true,
    showDropDownMessage: true ,  //是隐藏下拉框信息
    selectQualificationsDatas:[
      "不限","实名认证","商家认证","平台认证"
    ],
    selectReputation:[
      "不限","交易量","好评数"
    ],

    /////-------地理位置选择数据-------------
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    city: "上海市",
    hotcityList: [{ cityCode: 110000, city: '北京市' }, { cityCode: 310000, city: '上海市' }, { cityCode: 440100, city: '广州市' }, { cityCode: 440300, city: '深圳市' }, { cityCode: 330100, city: '杭州市' }, { cityCode: 320100, city: '南京市' }, { cityCode: 420100, city: '武汉市' }, { cityCode: 410100, city: '郑州市' }, { cityCode: 120000, city: '天津市' }, { cityCode: 610100, city: '西安市' }, { cityCode: 510100, city: '成都市' }, { cityCode: 500000, city: '重庆市' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.setData({
      pageHeight: app.globalData.pageHeight
    })
    this.getNowAddress();
    // 生命周期函数--监听页面加载
    var searchLetter = city.searchLetter;
    var cityList = city.cityList();
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var itemH = winHeight / searchLetter.length;
    var tempObj = [];
    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;
      tempObj.push(temp)
    }
    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj,
      cityList: cityList
    })
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
        maskVarietiesShow: !that.data.maskVarietiesShow, //蒙版点击
        maskFavoritegrainShow: true,   //其他两块蒙版是否隐藏
        maskbrandShow: true,            //其他两块蒙版是否隐藏
        showDropDownMessage:true,
        dataSourceType:[]
      })

    }

    if (selectType == 1) {
      that.setData({
        [uptwo]: !that.data.titleSelectList[1].showSelect,
        [upone]: true,
        [upthree]: true,
        dataSourceType: that.data.selectQualificationsDatas,
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
        dataSourceType: that.data.selectReputation,
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
  },

  /**
   * 城市选择--------------------------------------
   */
  clickLetter: function (e) {
    console.log(e.currentTarget.dataset.letter)
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },
  //选择城市
  bindCity: function (e) {
    var selectAddtess = "titleSelectList[" + 0 + "].selectInfo";  
    var selecticon = "titleSelectList[" + 0 + "].showSelect"; 
    this.setData({      
      [selectAddtess]: e.currentTarget.dataset.city,
      [selecticon]:true,
       maskVarietiesShow: true
       
     })
  },
  //选择热门城市
  bindHotCity: function (e) {
    var selectAddtess = "titleSelectList[" + 0 + "].selectInfo"; 
    var selecticon = "titleSelectList[" + 0 + "].showSelect";  
    this.setData({
      [selectAddtess]: e.currentTarget.dataset.city,
      [selecticon]: true,
      maskVarietiesShow: true, 
    })
  },
  //点击热门城市回到顶部
  hotCity: function () {
    this.setData({
      scrollTop: 0,
    })
  },
  //定位获取当前位置
  getNowAddress:function(){
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(JSON.stringify(res));
      }
    })
  },

  /**
   *  点击下拉信息选中
   */
  selectDataSourceTypeTap:function(res){
    var actionIndex = res.currentTarget.dataset.index;

    console.log(actionIndex);
  },
  
  /**
   * 点击头像查看商家信息
   */
  recommendedTap:function(res){
    let actionRes = encodeURIComponent(JSON.stringify(res.currentTarget.dataset.item));
    wx.navigateTo({
      url: Page_path.Page_Store_StoreInforMation + '?resinfo=' + actionRes
    })

  }
  
})