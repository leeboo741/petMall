// pages/store/petsinformation/index.js
const Page_path = require("../../../macros/pagePath.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      dataSourceInforMation:[],
      showPetsInfo:[],
      label: [
        "平台认证", "实名认证", "已纳押金", "商家认证"
      ],
      petsInforDataSource:[
        {
            petsName:"边境牧羊犬",
            petsBirthday:"2019-10-23",
            petsSex:"母",
            releaseTime:"1小时前",
            sterilization:"否",
            grade:"宠物级",
            introduce:"售出不是终止，服务才是我们的终止！",
            petsPrice:1688,
            originalPrice:3888,
            petsImages:[
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571827141234&di=9bee65181c4bc940a1a1f7b3c087c654&imgtype=0&src=http%3A%2F%2Fwww.pig66.com%2Fuploadfile%2F2017%2F1223%2F20171223041006689.png",
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571827141233&di=b626fde4a27398620bb1f326ea5bf372&imgtype=0&src=http%3A%2F%2Fwww.pig66.com%2Fuploadfile%2F2017%2F1223%2F20171223041021235.png",
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571827141233&di=4be9231e6ca93d356f154a1b7cd0d1ce&imgtype=0&src=http%3A%2F%2Fpic3.58cdn.com.cn%2Fp1%2Fbig%2Fn_v20c0e8f44827e4295b857bcabb4ab1d62.jpg"
            ]
            
        },

        {
            petsName: "边境牧羊犬",
            petsBirthday: "2019-10-23",
            petsSex: "母",
            releaseTime: "1小时前",
            sterilization: "否",
            grade: "宠物级",
            introduce: "售出不是终止，服务才是我们的终止！",
            petsPrice: 1688,
            originalPrice: 3888,
            petsImages: [
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571827141233&di=1f3896fb62d490d24706f4ee121b34a9&imgtype=0&src=http%3A%2F%2Fimg1.juimg.com%2F171214%2F330841-1G21421502628.jpg", 
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571827141232&di=d4315a74250a957a799de7d2dee2b2fc&imgtype=0&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F121005%2F219049-12100519111038.jpg", 
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571827141232&di=9acf9b4ae07ad17abb234371af1ec266&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1402%2F14%2Fc10%2F31249913_1392366826778_mthumb.jpg"
            ]

        },

        {
            petsName: "边境牧羊犬",
            petsBirthday: "2019-10-23",
            petsSex: "公",
            releaseTime: "1小时前",
            sterilization: "否",
            grade: "宠物级",
            introduce: "售出不是终止，服务才是我们的终止！",
            petsPrice: 1688,
            originalPrice: 3888,
            petsImages: [
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571827141232&di=4e0363e3962cbf5ddd16b0d20c04380d&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190504%2F20%2F1556971805-WhbrNjGwyp.jpg", 
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571827141231&di=02b08fb9594c0c17fa702cfa2856afe8&imgtype=0&src=http%3A%2F%2Ftct.ganjistatic1.com%2Fgjfsqq%2F65067eb0a18e4550acd61a0d03c37722_600-0_6-0.jpg", 
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571827141228&di=b6fbdac85624019e3d073b2f22434a4d&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fy5%2FM05%2FC9%2FE3%2FwKhQUVYrUPKEBVMNAAAAAI1QT_U470.jpg"
            ]

        },

        {
          petsName: "边境牧羊犬",
          petsBirthday: "2019-10-23",
          petsSex: "母",
          releaseTime: "1小时前",
          sterilization: "否",
          grade: "宠物级",
          introduce: "售出不是终止，服务才是我们的终止！",
          petsPrice: 1688,
          originalPrice: 3888,
          petsImages: [
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571827141233&di=1f3896fb62d490d24706f4ee121b34a9&imgtype=0&src=http%3A%2F%2Fimg1.juimg.com%2F171214%2F330841-1G21421502628.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571827141232&di=d4315a74250a957a799de7d2dee2b2fc&imgtype=0&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F121005%2F219049-12100519111038.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571827141232&di=9acf9b4ae07ad17abb234371af1ec266&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1402%2F14%2Fc10%2F31249913_1392366826778_mthumb.jpg"
          ]

        },

        {
          petsName: "边境牧羊犬",
          petsBirthday: "2019-10-23",
          petsSex: "母",
          releaseTime: "1小时前",
          sterilization: "否",
          grade: "宠物级",
          introduce: "售出不是终止，服务才是我们的终止！",
          petsPrice: 1688,
          originalPrice: 3888,
          petsImages: [
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571827141233&di=1f3896fb62d490d24706f4ee121b34a9&imgtype=0&src=http%3A%2F%2Fimg1.juimg.com%2F171214%2F330841-1G21421502628.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571827141232&di=d4315a74250a957a799de7d2dee2b2fc&imgtype=0&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F121005%2F219049-12100519111038.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571827141232&di=9acf9b4ae07ad17abb234371af1ec266&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1402%2F14%2Fc10%2F31249913_1392366826778_mthumb.jpg"
          ]

        },

        {
          petsName: "边境牧羊犬",
          petsBirthday: "2019-10-23",
          petsSex: "母",
          releaseTime: "1小时前",
          sterilization: "否",
          grade: "宠物级",
          introduce: "售出不是终止，服务才是我们的终止！",
          petsPrice: 1688,
          originalPrice: 3888,
          petsImages: [
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571827141233&di=1f3896fb62d490d24706f4ee121b34a9&imgtype=0&src=http%3A%2F%2Fimg1.juimg.com%2F171214%2F330841-1G21421502628.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571827141232&di=d4315a74250a957a799de7d2dee2b2fc&imgtype=0&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F121005%2F219049-12100519111038.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571827141232&di=9acf9b4ae07ad17abb234371af1ec266&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1402%2F14%2Fc10%2F31249913_1392366826778_mthumb.jpg"
          ]

        }

      ],

      delivery:[   //配送
        {
          type:"自提",
          price:0
        },

        {
          type: "汽运",
          price: 200
        },

        {
          type: "空运",
          price: 600
        },
      ],


    service: [   //服务
        "100%实拍","先行赔付","平台认证"
    ],


    evaluationInformation: [
      {
        userName: "刘大仙",
        userImageUrl: "http://img005.hc360.cn/m6/M09/94/6B/wKhQolb07DuEFsI8AAAAAEyvm8c183.jpg",
        evaluationTime: "两天前",
        starsNumber: 3,
        information: "（默认好评）通过平台担保交易买到一只皇家幼猫BK34奶糕粮2Kg"
      },

      {
        userName: "杨大仙",
        userImageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        evaluationTime: "2019-10-18",
        starsNumber: 4,
        information: "（默认好评）通过平台担保交易买到一只皇家幼猫BK34奶糕粮2Kg"
      },

      {
        userName: "李大仙",
        userImageUrl: "http://pic4.58cdn.com.cn/zhuanzh/n_v2bbebe75ef9264afda39b5b5b482144ee.jpg?w=750&h=0",
        evaluationTime: "2019-10-15",
        starsNumber: 5,
        information: "（默认好评）通过平台担保交易买到一只皇家幼猫BK34奶糕粮2Kg"
      },

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let requestIndex = JSON.parse(decodeURIComponent(options.petsindex));
      let requestItem = JSON.parse(decodeURIComponent(options.petsitem));
      console.log(requestItem);
      let that=this;
      that.setData({
        showPetsInfo: that.data.petsInforDataSource[requestIndex],
        dataSourceInforMation: requestItem
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
   * 点击头像查看商家信息
   */
  recommendedTap: function (res) {
    let actionRes = encodeURIComponent(JSON.stringify(res.currentTarget.dataset.item));
    wx.navigateTo({
      url: Page_path.Page_Store_StoreInforMation + '?resinfo=' + actionRes
    })

  },

  /**
   * 点击跟多评价
   */
  evaluateTap: function () {
    wx.navigateTo({
      url: Page_path.Page_Mall_Evaluate
    })
  },

  /**
   * 担保购买
   */
  goShopTap: function (res) {
   
      console.log("点击担保购买！");
  }
})