//index.js
//获取应用实例
const app = getApp()

Page({
  onLoad: function () {
    
  },
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
    recommendStoreList: [
      {
        name: "萌宠小屋",
        province: "江西",
        city: "南昌",
        logoPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571141353757&di=bfa169b0ff9c44c88c56f15c45582967&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0132565a447811a801219741f137ba.jpeg"
      },
      {
        name: "萌宠小屋1",
        province: "江西",
        city: "南昌",
        logoPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571138693420&di=fee3aa2a043f375cdb1cbb90f9380c2a&imgtype=0&src=http%3A%2F%2Fd5.file.680.com%2FItem%2F2018-6%2F20%2F10596211_201862011416.jpg"
      },
      {
        name: "萌宠小屋2",
        province: "江西",
        city: "南昌",
        logoPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571138363687&di=18e750383ce1bb7e631e984f87897f57&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b9de5be67338a80120925291fad2.jpg%401280w_1l_2o_100sh.jpg"
      },
      {
        name: "萌宠小屋3",
        province: "江西",
        city: "南昌",
        logoPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571138363687&di=18e750383ce1bb7e631e984f87897f57&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b9de5be67338a80120925291fad2.jpg%401280w_1l_2o_100sh.jpg"
      },
      {
        name: "萌宠小屋4",
        province: "江西",
        city: "南昌",
        logoPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571138363687&di=18e750383ce1bb7e631e984f87897f57&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b9de5be67338a80120925291fad2.jpg%401280w_1l_2o_100sh.jpg"
      },
      {
        name: "萌宠小屋5",
        province: "江西",
        city: "南昌",
        logoPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571138363687&di=18e750383ce1bb7e631e984f87897f57&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b9de5be67338a80120925291fad2.jpg%401280w_1l_2o_100sh.jpg"
      },
      {
        name: "萌宠小屋6",
        province: "江西",
        city: "南昌",
        logoPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571138363687&di=18e750383ce1bb7e631e984f87897f57&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b9de5be67338a80120925291fad2.jpg%401280w_1l_2o_100sh.jpg"
      },
      {
        name: "萌宠小屋7",
        province: "江西",
        city: "南昌",
        logoPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571138363687&di=18e750383ce1bb7e631e984f87897f57&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b9de5be67338a80120925291fad2.jpg%401280w_1l_2o_100sh.jpg"
      },
    ], // 推荐商家
    hotTypeList: [
      {
        name: "美国短毛猫",
        iconPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571141715309&di=c3c817889f9dd036c5bc025c52be0b17&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F9fo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D70d3a6d20824ab18e043e93300cacafb%2F3b292df5e0fe99259e842aa435a85edf8cb171bd.jpg"
      },
      {
        name: "美国短毛猫1",
        iconPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571141715309&di=c3c817889f9dd036c5bc025c52be0b17&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F9fo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D70d3a6d20824ab18e043e93300cacafb%2F3b292df5e0fe99259e842aa435a85edf8cb171bd.jpg"
      },
      {
        name: "美国短毛猫2",
        iconPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571141715309&di=c3c817889f9dd036c5bc025c52be0b17&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F9fo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D70d3a6d20824ab18e043e93300cacafb%2F3b292df5e0fe99259e842aa435a85edf8cb171bd.jpg"
      },
      {
        name: "美国短毛猫3",
        iconPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571141715309&di=c3c817889f9dd036c5bc025c52be0b17&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F9fo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D70d3a6d20824ab18e043e93300cacafb%2F3b292df5e0fe99259e842aa435a85edf8cb171bd.jpg"
      },
      {
        name: "美国短毛猫4",
        iconPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571141715309&di=c3c817889f9dd036c5bc025c52be0b17&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F9fo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D70d3a6d20824ab18e043e93300cacafb%2F3b292df5e0fe99259e842aa435a85edf8cb171bd.jpg"
      },
      {
        name: "美国短毛猫5",
        iconPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571141715309&di=c3c817889f9dd036c5bc025c52be0b17&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F9fo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D70d3a6d20824ab18e043e93300cacafb%2F3b292df5e0fe99259e842aa435a85edf8cb171bd.jpg"
      },
      {
        name: "美国短毛猫6",
        iconPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571141715309&di=c3c817889f9dd036c5bc025c52be0b17&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F9fo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D70d3a6d20824ab18e043e93300cacafb%2F3b292df5e0fe99259e842aa435a85edf8cb171bd.jpg"
      },
      {
        name: "美国短毛猫7",
        iconPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571141715309&di=c3c817889f9dd036c5bc025c52be0b17&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F9fo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D70d3a6d20824ab18e043e93300cacafb%2F3b292df5e0fe99259e842aa435a85edf8cb171bd.jpg"
      },
    ], // 热门分类
    recommendGoodsList: [
      {
        name: "布偶猫",
        price: 2000,
        store: {
          name: "莎莎",
          logoPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571138693420&di=fee3aa2a043f375cdb1cbb90f9380c2a&imgtype=0&src=http%3A%2F%2Fd5.file.680.com%2FItem%2F2018-6%2F20%2F10596211_201862011416.jpg"
        },
        province: "云南",
        city: "昆明",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571142500505&di=7f83a91e6f0ac575e2b95feb01ef941a&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201706%2F28%2F20170628205251_n2iCd.jpeg"
      },
      {
        name: "秋田犬",
        price: 3000,
        store: {
          name: "田田",
          logoPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571141353757&di=bfa169b0ff9c44c88c56f15c45582967&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0132565a447811a801219741f137ba.jpeg"
        },
        province: "上海",
        city: "静安",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571142526663&di=43a1330a539f801e3a378919588f36a6&imgtype=0&src=http%3A%2F%2Fwww.pig66.com%2Fuploadfile%2F2017%2F1204%2F20171204053030929.png",
      },
      {
        name: "美短",
        price: 4000,
        store: {
          name: "旺旺",
          logoPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571138363687&di=18e750383ce1bb7e631e984f87897f57&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b9de5be67338a80120925291fad2.jpg%401280w_1l_2o_100sh.jpg"
        },
        province: "河南",
        city: "开封",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571142568961&di=40a2a5147b7dec086ec0d0a5f58636ab&imgtype=0&src=http%3A%2F%2Fwww.5jjc.net%2Ftu5jJDAzJDIyL1Qxc2NFN1hmQmYkNiQ2XyEhJDM.jpg",
      },
      {
        name: "二哈",
        price: 2000,
        store: {
          name: "妍妍",
          logoPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571142296864&di=91b3eda493c9e1b5a44af05943d0b150&imgtype=0&src=http%3A%2F%2Fwww.new-s.com.cn%2Fupload%2F20160713%2F69831468391032541.jpg"
        },
        province: "浙江",
        city: "杭州",
        imagePath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571142592265&di=7a06c842ea2fd44ed79c0819544ef6df&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180119%2Fd006418460834892a15ff56878abef36.jpeg",
      },
    ], // 为您推荐
  },
})
