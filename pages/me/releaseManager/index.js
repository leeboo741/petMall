// pages/me/releaseManager/index.js

const LoadFootItemState = require("../../../lee-components/leeLoadingFootItem/loadFootObj.js");
const PageSize = 20;
const PagePath = require("../../../macros/pagePath.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 0, // 页码
    loadState: LoadFootItemState.Loading_State_Empty, // 底部状态
    releaseList: [
      {
        releaseDate: "2019-10-01", // 发布日期
        releaseTime: "10:00:00", // 发布时间
        pet: {
          name: "二哈", // 名称
          imagePaths: [
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571636005959&di=7ff3b634465f055ec8dfd13d6ba260df&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201601%2F13%2F20160113092540_fHGx5.thumb.700_0.jpeg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571636024235&di=47e5dc42c3ddf7d023b59ac29ed91305&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw640h400%2F20171211%2Fb238-fypnsip5822268.jpg"
          ], // 图片
          price: 1200, // 价格
          commissionRatio: 10, // 佣金比例
          sexy: "公", // 性别
          sterilized: false, // 是否绝育
          birthday: "2019-08-08", // 生日
          vaccine: {
            date: "2019-10-10", // 日期
            brand: "不知道", // 品牌
          }, // 疫苗
          repellent: {
            date: "2019-11-11", // 日期
            brand: "也不知道"
          }, // 驱虫
          identifier: "CKU1299123331233", // 编号
          parent: {
            father: {
              name: "豆豆",
              imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571635895590&di=ec1da7306e26aa418aa5a7b53a774fd0&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fzj%2Fpics%2Fhv1%2F172%2F4%2F2242%2F145787242.jpg"
            },
            mother: {
              name: "扁扁",
              imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571635911373&di=f6c1daf5b80fcb64df2512bbb81fa7f1&imgtype=0&src=http%3A%2F%2Fstatic.9377s.com%2Fuploads%2F2016-08%2F11%2F253edb04525a8472.jpg"
            }
          },
          describe: "不知道要描述些什么"
        }
      },
      {
        releaseDate: "2019-10-01", // 发布日期
        releaseTime: "10:00:00", // 发布时间
        pet: {
          name: "二哈", // 名称
          imagePaths: [
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571636005959&di=7ff3b634465f055ec8dfd13d6ba260df&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201601%2F13%2F20160113092540_fHGx5.thumb.700_0.jpeg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571636024235&di=47e5dc42c3ddf7d023b59ac29ed91305&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw640h400%2F20171211%2Fb238-fypnsip5822268.jpg"
          ], // 图片
          price: 1200, // 价格
          commissionRatio: 10, // 佣金比例
          sexy: "公", // 性别
          sterilized: false, // 是否绝育
          birthday: "2019-08-08", // 生日
          vaccine: {
            date: "2019-10-10", // 日期
            brand: "不知道", // 品牌
          }, // 疫苗
          repellent: {
            date: "2019-11-11", // 日期
            brand: "也不知道"
          }, // 驱虫
          identifier: "CKU1299123331233", // 编号
          parent: {
            father: {
              name: "豆豆",
              imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571635895590&di=ec1da7306e26aa418aa5a7b53a774fd0&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fzj%2Fpics%2Fhv1%2F172%2F4%2F2242%2F145787242.jpg"
            },
            mother: {
              name: "扁扁",
              imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571635911373&di=f6c1daf5b80fcb64df2512bbb81fa7f1&imgtype=0&src=http%3A%2F%2Fstatic.9377s.com%2Fuploads%2F2016-08%2F11%2F253edb04525a8472.jpg"
            }
          },
          describe: "不知道要描述些什么"
        }
      },
      {
        releaseDate: "2019-10-01", // 发布日期
        releaseTime: "10:00:00", // 发布时间
        pet: {
          name: "二哈", // 名称
          imagePaths: [
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571636005959&di=7ff3b634465f055ec8dfd13d6ba260df&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201601%2F13%2F20160113092540_fHGx5.thumb.700_0.jpeg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571636024235&di=47e5dc42c3ddf7d023b59ac29ed91305&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw640h400%2F20171211%2Fb238-fypnsip5822268.jpg"
          ], // 图片
          price: 1200, // 价格
          commissionRatio: 10, // 佣金比例
          sexy: "公", // 性别
          sterilized: false, // 是否绝育
          birthday: "2019-08-08", // 生日
          vaccine: {
            date: "2019-10-10", // 日期
            brand: "不知道", // 品牌
          }, // 疫苗
          repellent: {
            date: "2019-11-11", // 日期
            brand: "也不知道"
          }, // 驱虫
          identifier: "CKU1299123331233", // 编号
          parent: {
            father: {
              name: "豆豆",
              imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571635895590&di=ec1da7306e26aa418aa5a7b53a774fd0&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fzj%2Fpics%2Fhv1%2F172%2F4%2F2242%2F145787242.jpg"
            },
            mother: {
              name: "扁扁",
              imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571635911373&di=f6c1daf5b80fcb64df2512bbb81fa7f1&imgtype=0&src=http%3A%2F%2Fstatic.9377s.com%2Fuploads%2F2016-08%2F11%2F253edb04525a8472.jpg"
            }
          },
          describe: "不知道要描述些什么"
        }
      }
    ], // 已发布宠物列表

    tempDataSource: [
      {
        releaseDate: "2019-10-01", // 发布日期
        releaseTime: "10:00:00", // 发布时间
        pet: {
          name: "二哈", // 名称
          imagePaths: [
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571636005959&di=7ff3b634465f055ec8dfd13d6ba260df&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201601%2F13%2F20160113092540_fHGx5.thumb.700_0.jpeg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571636024235&di=47e5dc42c3ddf7d023b59ac29ed91305&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw640h400%2F20171211%2Fb238-fypnsip5822268.jpg"
          ], // 图片
          price: 1200, // 价格
          commissionRatio: 10, // 佣金比例
          sexy: "公", // 性别
          sterilized: false, // 是否绝育
          birthday: "2019-08-08", // 生日
          vaccine: {
            date: "2019-10-10", // 日期
            brand: "不知道", // 品牌
          }, // 疫苗
          repellent: {
            date: "2019-11-11", // 日期
            brand: "也不知道"
          }, // 驱虫
          identifier: "CKU1299123331233", // 编号
          parent: {
            father: {
              name: "豆豆",
              imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571635895590&di=ec1da7306e26aa418aa5a7b53a774fd0&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fzj%2Fpics%2Fhv1%2F172%2F4%2F2242%2F145787242.jpg"
            },
            mother: {
              name: "扁扁",
              imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571635911373&di=f6c1daf5b80fcb64df2512bbb81fa7f1&imgtype=0&src=http%3A%2F%2Fstatic.9377s.com%2Fuploads%2F2016-08%2F11%2F253edb04525a8472.jpg"
            }
          },
          describe: "不知道要描述些什么"
        }
      },
      {
        releaseDate: "2019-10-01", // 发布日期
        releaseTime: "10:00:00", // 发布时间
        pet: {
          name: "二哈", // 名称
          imagePaths: [
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571636005959&di=7ff3b634465f055ec8dfd13d6ba260df&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201601%2F13%2F20160113092540_fHGx5.thumb.700_0.jpeg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571636024235&di=47e5dc42c3ddf7d023b59ac29ed91305&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw640h400%2F20171211%2Fb238-fypnsip5822268.jpg"
          ], // 图片
          price: 1200, // 价格
          commissionRatio: 10, // 佣金比例
          sexy: "公", // 性别
          sterilized: false, // 是否绝育
          birthday: "2019-08-08", // 生日
          vaccine: {
            date: "2019-10-10", // 日期
            brand: "不知道", // 品牌
          }, // 疫苗
          repellent: {
            date: "2019-11-11", // 日期
            brand: "也不知道"
          }, // 驱虫
          identifier: "CKU1299123331233", // 编号
          parent: {
            father: {
              name: "豆豆",
              imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571635895590&di=ec1da7306e26aa418aa5a7b53a774fd0&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fzj%2Fpics%2Fhv1%2F172%2F4%2F2242%2F145787242.jpg"
            },
            mother: {
              name: "扁扁",
              imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571635911373&di=f6c1daf5b80fcb64df2512bbb81fa7f1&imgtype=0&src=http%3A%2F%2Fstatic.9377s.com%2Fuploads%2F2016-08%2F11%2F253edb04525a8472.jpg"
            }
          },
          describe: "不知道要描述些什么"
        }
      },
      {
        releaseDate: "2019-10-01", // 发布日期
        releaseTime: "10:00:00", // 发布时间
        pet: {
          name: "二哈", // 名称
          imagePaths: [
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571636005959&di=7ff3b634465f055ec8dfd13d6ba260df&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201601%2F13%2F20160113092540_fHGx5.thumb.700_0.jpeg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571636024235&di=47e5dc42c3ddf7d023b59ac29ed91305&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw640h400%2F20171211%2Fb238-fypnsip5822268.jpg"
          ], // 图片
          price: 1200, // 价格
          commissionRatio: 10, // 佣金比例
          sexy: "公", // 性别
          sterilized: false, // 是否绝育
          birthday: "2019-08-08", // 生日
          vaccine: {
            date: "2019-10-10", // 日期
            brand: "不知道", // 品牌
          }, // 疫苗
          repellent: {
            date: "2019-11-11", // 日期
            brand: "也不知道"
          }, // 驱虫
          identifier: "CKU1299123331233", // 编号
          parent: {
            father: {
              name: "豆豆",
              imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571635895590&di=ec1da7306e26aa418aa5a7b53a774fd0&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fzj%2Fpics%2Fhv1%2F172%2F4%2F2242%2F145787242.jpg"
            },
            mother: {
              name: "扁扁",
              imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571635911373&di=f6c1daf5b80fcb64df2512bbb81fa7f1&imgtype=0&src=http%3A%2F%2Fstatic.9377s.com%2Fuploads%2F2016-08%2F11%2F253edb04525a8472.jpg"
            }
          },
          describe: "不知道要描述些什么"
        }
      }
    ],

    tempTimeInterval: null,
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
    clearTimeout(this.data.tempTimeInterval);
    this.data.tempTimeInterval = null;
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
          releaseList: that.data.releaseList.concat(that.data.tempDataSource),
          loadState: LoadFootItemState.Loading_State_Normal
        })
      }
    }, 1000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }, 

  /**
   * 点击发布新宠
   */
  tapAddNewRelease: function () {
    wx.navigateTo({
      url: PagePath.Page_Me_ReleaseManager_ReleaseNew,
    })
  }
})