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
    ],
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
    ],
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
    ],
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
    ],
  },
  onLoad: function () {
    
  },
})
