// pages/index/petstype/index.js
const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
Page({

  /**
   * 页面的初始数据
   */
  data: { 
      tempTimeInterval: null,
      pageIndex: 0, // 页码
      loadState: LoadFootItemState.Loading_State_Normal, // 底部状态
      petsTypeData:[],

     daoDataSource:[  //狗狗数据
       {
         petsImageUrl:"https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1571911423&di=928bca32867e3f6e200fdac87a807f9f&src=http://baiducdn.pig66.com/uploadfile/2017/0511/20170511114437649.jpg",
         petsName:"狗狗1"
       },

       {
         petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921505055&di=f63680d50722315ab05e17dbc5bfae74&imgtype=0&src=http%3A%2F%2Fimg.redocn.com%2F200903%2F2%2F556518_1235964346JSzk.jpg",
         petsName: "狗狗2"
       },

       {
         petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921505055&di=0de7ee22a16545163a5c41235641cdf1&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fuserup%2F5264%2F11032414444A2642246.jpg",
         petsName: "狗狗3"
       },

       {
         petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921505055&di=33b44e531fd989335b57e6ddf2f3d04a&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20181004%2F14%2F1538633447-dGzKPVQExw.jpg",
         petsName: "狗狗4"
       },

       {
         petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921505054&di=f7fc01dd2c40ae478ae850bfff0a850e&imgtype=0&src=http%3A%2F%2Fbaiducdn.pig66.com%2Fuploadfile%2F2017%2F0511%2F20170511114412732.jpg",
         petsName: "狗狗5"
       },

       {
         petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921505054&di=a172f0d200d6540f10379ed34c24404b&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fmobile%2F9%2F5719c7b9d1195.jpg",
         petsName: "狗狗6"
       },

       {
         petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921505054&di=c36d61ef3e40da6c16f8d69f72a81798&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180803%2F20%2F1533298975-elcqXbNvWi.jpg",
         petsName: "狗狗7"
       },

       {
         petsImageUrl: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2413738777,3582526063&fm=26&gp=0.jpg",
         petsName: "狗狗8"
       },

       {
         petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921505053&di=5b59928e9f0ccf6bfb427b491fba558a&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1511%2F04%2Fc54%2F14872545_1446644386856_mthumb.jpg",
         petsName: "狗狗9"
       },

       {
         petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921505053&di=ba9e491aa525ddd5906b07fe6c8e5c21&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180211%2F01%2F1518284684-oXQuiCrqSv.jpg",
         petsName: "狗狗10"
       },

       {
         petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921505052&di=6af51a3c6aee52c654c7c461a5775871&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170214%2F76bc1aeca8b049469248c5603dff0ac4_th.jpg",
         petsName: "狗狗11"
       },

       {
         petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921505052&di=5d3bcdeac5f5616c0d2ae9522b1e3f4d&imgtype=0&src=http%3A%2F%2Fbpic.ooopic.com%2F16%2F51%2F43%2F16514396-a7ee2af953a260e126058d5862c68f35.jpg",
         petsName: "狗狗12"
       }
     ],
      catDataSource: [  //猫猫数据
        {
          petsImageUrl: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=720442583,2314713918&fm=26&gp=0.jpg",
          petsName: "猫猫1"
        },

        {
          petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921872407&di=096123d808952b78132c16e22c93c151&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190114%2F18%2F1547463209-WnCxqYVUST.jpg",
          petsName: "猫猫2"
        },

        {
          petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921872407&di=6748ea9723208a335eb92d542a064a55&imgtype=0&src=http%3A%2F%2Fwww.pig66.com%2Fuploadfile%2F2017%2F1204%2F20171204120504252.png",
          petsName: "猫猫3"
        },

        {
          petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921872407&di=b46a2a3ffaf761da99cd678b27bb7859&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180803%2F20%2F1533300497-rVRKEFjhPt.jpg",
          petsName: "猫猫4"
        },

        {
          petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921872406&di=50ec0a58f5181640e35addda1c4481b5&imgtype=0&src=http%3A%2F%2Fpic24.nipic.com%2F20121030%2F10451159_151609561000_2.jpg",
          petsName: "猫猫5"
        },

        {
          petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921872406&di=16f49db158b08e5a47aa0ea2427c1ca3&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fpic%2F5%2Fb8%2F01ab1170601.jpg",
          petsName: "猫猫6"
        }, 
        
        {
          petsImageUrl: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3575797107,2186909601&fm=26&gp=0.jpg",
          petsName: "猫猫7"
        },

        {
          petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921872405&di=1e56e1ea472e66f643a46b656349e0e7&imgtype=0&src=http%3A%2F%2Fimg.ewebweb.com%2Fuploads%2F20190403%2F21%2F1554297061-sJMedFoZgk.jpg",
          petsName: "猫猫8"
        },

        {
          petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921872405&di=3a023301ae4ba0025770650f4428d5a6&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F53e30ccd2ed01.jpg",
          petsName: "猫猫9"
        },

        {
          petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921872405&di=0bc7d1de44d410c2cff0cfec8cbb368c&imgtype=0&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F120614%2F188906-120614163U856.jpg",
          petsName: "猫猫10"
        },

        {
          petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921872404&di=9180891d06a6dfd2be6172af451e4f59&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201411%2F05%2F20141105205804_Fy3wP.thumb.700_0.jpeg",
          petsName: "猫猫11"
        },

        {
          petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921872403&di=4a2f2264f7ecf510807f0fd7a00c1f32&imgtype=0&src=http%3A%2F%2Fi1.sinaimg.cn%2Fedu%2F2012%2F0413%2FU7516P42DT20120413140544.jpg",
          petsName: "猫猫12"
        }
    ],

    petDataSource: [  //小宠数据

        {
        petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921976064&di=cc5dccf978ab8fdf77b6b6659883959f&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F16%2F11%2F18%2F03a5ebd447c2d35b32ff1e69dee0f317.jpg",
          petsName: "小宠1"
        },

        {
          petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921976220&di=3beb26ed7d5fd5e6c84006a8485838d8&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F120620%2F201981-120620142308100.jpg",
          petsName: "小宠2"
        },

        {
          petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921976220&di=027d302500ebdf672e8521bdb5e38b5f&imgtype=0&src=http%3A%2F%2Fwww.pig66.com%2Fuploadfile%2F2017%2F1223%2F20171223041006689.png",
          petsName: "小宠3"
        },

        {
          petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921976220&di=8c475174db678b418ce5d3e7b6480068&imgtype=0&src=http%3A%2F%2Fwww.pig66.com%2Fuploadfile%2F2017%2F1223%2F20171223041021235.png",
          petsName: "小宠4"
        },

        {
          petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921976220&di=81580d3f4a34bb36236add10de3b4f3c&imgtype=0&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F121005%2F219049-12100519111038.jpg",
          petsName: "小宠5"
        },

        {
          petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571921976219&di=9524d9d64059a8570d110ffac13c5526&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fln%2Fpics%2Fhv1%2F157%2F92%2F2216%2F144119017.jpg",
          petsName: "小宠6"
        },
    ],

    shuiNationalityDataSource: [  //水族数据
        {
        petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571922022630&di=f8980eb2c47d412bc37888e16b84ab69&imgtype=0&src=http%3A%2F%2Fdimg04.c-ctrip.com%2Fimages%2F300j0q000000g7oh34687.png",
          petsName: "水族1"
        },

        {
          petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571922022629&di=c69a7ac3b382bc5c19761b5da3822357&imgtype=0&src=http%3A%2F%2Fpic33.nipic.com%2F20130922%2F12780960_145839403176_2.jpg",
          petsName: "水族2"
        },

        {
          petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571922022629&di=f2f3682b226afd1bd4d1c35165d693f4&imgtype=0&src=http%3A%2F%2Fpic3.40017.cn%2Fscenery%2Fdestination%2F2015%2F07%2F07%2F18%2FyZpzs0.jpg",
          petsName: "水族3"
        },

        {
          petsImageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571922022628&di=4ad0f414a4a512ec80141828f3602e06&imgtype=0&src=http%3A%2F%2Figuide.lvmama.com%2Fuploadfile%2F2010%2F1207%2F20101207123624617.jpg",
          petsName: "水族4"
        },

        {
          petsImageUrl: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1991588076,3299769024&fm=15&gp=0.jpg",
          petsName: "水族5"
        },

        {
          petsImageUrl: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4104569445,1624180589&fm=15&gp=0.jpg",
          petsName: "水族6"
        },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that=this;
      var type = options.type;
      if (type==1){
          that.setData({
            petsTypeData: that.data.daoDataSource
          })
      } else if (type == 2){
          that.setData({
            petsTypeData: that.data.catDataSource
          })
      } else if (type == 3) {
          that.setData({
            petsTypeData: that.data.petDataSource
          })
      }else{
          that.setData({
            petsTypeData: that.data.shuiNationalityDataSource
          })
      }
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
    if (this.data.loadState == LoadFootItemState.Loading_State_End) {
      return;
    }
    this.setData({
      loadState: LoadFootItemState.Loading_State_Loading,
    })
    let that = this;
    this.data.tempTimeInterval = setTimeout(function () {
      that.data.pageIndex = that.data.pageIndex + 1;
      if (that.data.pageIndex >= 5) {
        that.setData({
          loadState: LoadFootItemState.Loading_State_End
        })
      } else {
        that.setData({
          petsTypeData: that.data.petsTypeData.concat(that.data.petsTypeData),
          loadState: LoadFootItemState.Loading_State_Normal
        })
      }
    }, 1000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})