//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bannerDataSource: [
      {
        imageUrl: "https://petimg.tyferp.com/weapp/banner01.jpg", // 图片地址
        link: "", // 内容地址
      },
      {
        imageUrl: "https://petimg.tyferp.com/weapp/banner02.jpg",
        link: "",
      },
      {
        imageUrl: "https://petimg.tyferp.com/weapp/banner03.jpg",
        link: "",
      }
    ], // banner
    fastActionList: [
      {
        actionName: "附近",
        iconPath: "../../resource/nearby.png",
        link: ""
      },
      {
        actionName: "狗狗",
        iconPath: "../../resource/dog.png",
        link: ""
      },
      {
        actionName: "猫猫",
        iconPath: "../../resource/cat.png",
        link: ""
      },
      {
        actionName: "小宠",
        iconPath: "../../resource/minority.png",
        link: ""
      },
      {
        actionName: "水族",
        iconPath: "../../resource/aquatic.png",
        link: ""
      },
    ], // 快速入口
    preferentialList: [
      {
        name: "柴犬",
        preferentialPrice: 1000,
        originalPrice: 3000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
      {
        name: "柴犬1",
        preferentialPrice: 1000,
        originalPrice: 3000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
      {
        name: "柴犬2",
        preferentialPrice: 1000,
        originalPrice: 3000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
      {
        name: "柴犬3",
        preferentialPrice: 1000,
        originalPrice: 3000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
      {
        name: "柴犬4",
        preferentialPrice: 1000,
        originalPrice: 3000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
    ], // 特惠抢购
    newestList: [
      {
        releaseDate: "2019-10-11",
        releaseTime: "12:11:11",
        name: "柴犬",
        price: 1000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
      {
        releaseDate: "2019-10-11",
        releaseTime: "12:11:11",
        name: "柴犬1",
        price: 1000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
      {
        releaseDate: "2019-10-11",
        releaseTime: "12:11:11",
        name: "柴犬2",
        price: 1000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
      {
        releaseDate: "2019-10-11",
        releaseTime: "12:11:11",
        name: "柴犬3",
        price: 1000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
      {
        releaseDate: "2019-10-11",
        releaseTime: "12:11:11",
        name: "柴犬4",
        price: 1000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
    ], // 最新上架
    fineList: [
      {
        name: "柴犬",
        price: 1000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
      {
        name: "柴犬1",
        price: 1000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
      {
        name: "柴犬2",
        price: 1000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
      {
        name: "柴犬3",
        price: 1000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
      {
        name: "柴犬4",
        price: 1000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
      {
        name: "柴犬5",
        price: 1000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
    ], // 精品
    upscaleList: [
      {
        name: "柴犬",
        price: 1000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
      {
        name: "柴犬1",
        price: 1000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
      {
        name: "柴犬2",
        price: 1000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
      {
        name: "柴犬3",
        price: 1000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
      {
        name: "柴犬4",
        price: 1000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
      {
        name: "柴犬5",
        price: 1000,
        province: "河北",
        city: "石家庄",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571057930011&di=3fb1a36f78f5b885f003d75560006e9b&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201604%2F25%2F20160425205546_4JwcA.thumb.700_0.jpeg"
      },
    ], // 高端宠物
    setMenuList: [
      {
        name: "小体型犬",
        info: "低至99元起",
        iconPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571133940215&di=713c8e2f8180fe6e01fee05dfdeb04d9&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160629%2F727e135d01e94ff2ace58fe150c6f5ea.jpg",
      },
      {
        name: "中体型犬",
        info: "低至99元起",
        iconPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571134040835&di=021c08edae9fa11bb2dbabfbb1cdf4f3&imgtype=0&src=http%3A%2F%2Fimg3.redocn.com%2Ftupian%2F20150106%2Fwangoupaidebandiangou_3802352.jpg",
      },
      {
        name: "大体型犬",
        info: "低至99元起",
        iconPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571133984395&di=77ec705a4112547d49654adee4752b03&imgtype=0&src=http%3A%2F%2Fpic39.nipic.com%2F20140325%2F2531170_234047950000_2.jpg",
      },
      {
        name: "猫咪套餐",
        info: "低至99元起",
        iconPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571134123613&di=4600106c840ff2762ac724df88ab39be&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F13%2F48%2F71%2F58fda68f998e7.png",
      },
    ], // 养宠套餐
  },
  onLoad: function () {
    
  },
})
