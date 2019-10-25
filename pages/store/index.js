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
        merchantImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063571&di=0bccd3e717c8d8bf148f02e38f9cca26&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F120620%2F201981-120620142308100.jpg",  //头像
        merchantName: "阿宝精品",                                //商家名称
        merchantAddress: "江西省南昌市南昌县666号",               //商家地址
        merchantOnSale: "在售574只，担保交易量505只",             //交易数量介绍
        merchantStars: 3,                                       //评价星星数
        tradingVolume: 5,                                       //担保交易量
        merchantIntroduction:"最帅宝宝",                         //宠物介绍
        merchantPraise:296,                                     //好评数
        label:0,                                                //标签（0实名认证  1平台认证  2商家认证）
        dogInforMation: [
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063571&di=927a863a0899b6e8e2562efee970caa1&imgtype=0&src=http%3A%2F%2Fwww.pig66.com%2Fuploadfile%2F2017%2F1223%2F20171223041006689.png",                                                            //宠物图片
            dogName: "边境牧羊犬1",                                //宠物品种
            dogPrice: 3000,                                      //宠物价格
            dogAddress: "江西南昌",                               //宠物地址
            petsName: "大宝"                                      //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063570&di=dc3942f265da34441b08990dd317a6c3&imgtype=0&src=http%3A%2F%2Fwww.pig66.com%2Fuploadfile%2F2017%2F1223%2F20171223041021235.png",
            dogName: "边境牧羊犬2",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "小宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063570&di=b9a99d1329117890de16f08b5cc15602&imgtype=0&src=http%3A%2F%2Fpic3.58cdn.com.cn%2Fp1%2Fbig%2Fn_v20c0e8f44827e4295b857bcabb4ab1d62.jpg",
            dogName: "边境牧羊犬3",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "中宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063570&di=b9a99d1329117890de16f08b5cc15602&imgtype=0&src=http%3A%2F%2Fpic3.58cdn.com.cn%2Fp1%2Fbig%2Fn_v20c0e8f44827e4295b857bcabb4ab1d62.jpg",
            dogName: "边境牧羊犬4",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "中宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063570&di=b9a99d1329117890de16f08b5cc15602&imgtype=0&src=http%3A%2F%2Fpic3.58cdn.com.cn%2Fp1%2Fbig%2Fn_v20c0e8f44827e4295b857bcabb4ab1d62.jpg",
            dogName: "边境牧羊犬5",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "中宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063570&di=b9a99d1329117890de16f08b5cc15602&imgtype=0&src=http%3A%2F%2Fpic3.58cdn.com.cn%2Fp1%2Fbig%2Fn_v20c0e8f44827e4295b857bcabb4ab1d62.jpg",
            dogName: "边境牧羊犬6",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "中宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063570&di=b9a99d1329117890de16f08b5cc15602&imgtype=0&src=http%3A%2F%2Fpic3.58cdn.com.cn%2Fp1%2Fbig%2Fn_v20c0e8f44827e4295b857bcabb4ab1d62.jpg",
            dogName: "边境牧羊犬7",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "中宝"   //宠物名称
          }
        ]
      },
      {
        merchantImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063570&di=e00823c082ab5f764b74fcb5ddee3b3b&imgtype=0&src=http%3A%2F%2Fimg1.juimg.com%2F171214%2F330841-1G21421502628.jpg",
        merchantName: "阿宝精品",
        merchantAddress: "江西省南昌市南昌县666号",
        merchantOnSale: "在售574只，担保交易量505只",
        merchantStars: 3,
        tradingVolume: 5,   //担保交易量
        merchantIntroduction: "最帅宝宝",
        merchantPraise: 296,                                     //好评数
        label:2,                                                //标签（0实名认证  1平台认证  2商家认证）
        dogInforMation: [
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063570&di=baa38330196796a72dbe7a13725bc906&imgtype=0&src=http%3A%2F%2Fpic2.58cdn.com.cn%2Fmobile%2Fbig%2Fn_v29a7ff73d703e4979b7d51358c65fd996.jpg",
            dogName: "边境牧羊犬8",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "大宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063570&di=102e44086b4fca60be6530368f832759&imgtype=0&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F121005%2F219049-12100519111038.jpg",
            dogName: "边境牧羊犬9",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "小宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063569&di=2749abcd4743034fcf345e86794e139e&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fln%2Fpics%2Fhv1%2F157%2F92%2F2216%2F144119017.jpg",
            dogName: "边境牧羊犬10",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "中宝"   //宠物名称
          }
        ]
      },
      {
        merchantImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063569&di=1a731c062c4d1cf2b4416a4848bed7ef&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fitbbs%2F1402%2F14%2Fc10%2F31249913_1392366826778_mthumb.jpg",
        merchantName: "阿宝精品",
        merchantAddress: "江西省南昌市南昌县666号",
        merchantOnSale: "在售574只，担保交易量505只",
        merchantStars: 3,
        tradingVolume: 5,   //担保交易量
        merchantIntroduction: "最帅宝宝",
        merchantPraise: 296,                                     //好评数
        label: 0,                                                //标签（0实名认证  1平台认证  2商家认证）
        dogInforMation: [
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063568&di=5434a33e5a58aca67d92137ef6ae6fd9&imgtype=0&src=http%3A%2F%2Fpic2.58cdn.com.cn%2Fmobile%2Fbig%2Fn_v1bkuyfvpaquovrkvembya_22e4e0b640348b34.jpg",
            dogName: "边境牧羊犬11",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "大宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063568&di=9e7daf936caf375469c3d0168a680bbc&imgtype=0&src=http%3A%2F%2Fimg006.hc360.cn%2Fm1%2FM02%2F9E%2F68%2FwKhQcFQ-Cz6EaOX8AAAAABJm3-g293.jpg",
            dogName: "边境牧羊犬12",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "小宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063567&di=eb6b9e6a8b8d8d869750425e0e14d62a&imgtype=0&src=http%3A%2F%2Ftct.ganjistatic1.com%2Fgjfsqq%2F65067eb0a18e4550acd61a0d03c37722_600-0_6-0.jpg",
            dogName: "边境牧羊犬13",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "中宝"   //宠物名称
          }
        ]
      },
      {
        merchantImage: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2905796729,1432118608&fm=26&gp=0.jpg",
        merchantName: "阿宝精品",
        merchantAddress: "江西省南昌市南昌县666号",
        merchantOnSale: "在售574只，担保交易量505只",
        merchantStars: 3,
        tradingVolume: 5,   //担保交易量
        merchantIntroduction: "最帅宝宝",
        merchantPraise: 296,                                     //好评数
        label: 2,                                                //标签（0实名认证  1平台认证  2商家认证）
        dogInforMation: [
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063567&di=756203da759e7ec9961f851968e7af4c&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201601%2F26%2F20160126200901_PBz2A.thumb.700_0.jpeg",
            dogName: "边境牧羊犬14",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "大宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063566&di=40bdf89bb6171a2f3ae9f7a3407ad417&imgtype=0&src=http%3A%2F%2Fpic5.58cdn.com.cn%2Fmobile%2Fbig%2Fn_v1bl2lwtpa35yvrq3iaiha_4b902c3d9f8abab8.jpg",
            dogName: "边境牧羊犬15",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "小宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063566&di=9355fca1027d6935548eccce9620e869&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fy5%2FM05%2FC9%2FE3%2FwKhQUVYrUPKEBVMNAAAAAI1QT_U470.jpg",
            dogName: "边境牧羊犬16",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "中宝"   //宠物名称
          }
        ]
      },
      {
        merchantImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063565&di=6430433c351af1a2116ea0fb9221b0c7&imgtype=0&src=http%3A%2F%2Ftct.ganjistatic1.com%2Fgjfsqq%2F38f312f6c3624dadb2b747110918929d_600-0_6-0.png",
        merchantName: "阿宝精品",
        merchantAddress: "江西省南昌市南昌县666号",
        merchantOnSale: "在售574只，担保交易量505只",
        merchantStars: 3,
        tradingVolume: 5,   //担保交易量
        merchantIntroduction: "最帅宝宝",
        merchantPraise: 296,                                     //好评数
        label: 1,                                                //标签（0实名认证  1平台认证  2商家认证）
        dogInforMation: [
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063564&di=7acb0a58f5e8db118d68e56b0ed7dd48&imgtype=0&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F110915%2F8880-11091500191087.jpg",
            dogName: "边境牧羊犬17",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "大宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063564&di=5efb12dce24c1f3c8e1eaec426d02bc1&imgtype=0&src=http%3A%2F%2Ftct.ganjistatic1.com%2Fgjfsqq%2Fb3d7b6faadd94c5491fd85ef5d78880d_600-0_6-0.png",
            dogName: "边境牧羊犬18",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "小宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805063563&di=687bb2e28307037e4c8c8b4e16789e80&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F53e85bc3bb3d0.jpg",
            dogName: "边境牧羊犬19",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "中宝"   //宠物名称
          }
        ]
      },
      {
        merchantImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805162393&di=45bb433dfc41ece1ef28baa698d4b48e&imgtype=0&src=http%3A%2F%2Fimg010.hc360.cn%2Fhb%2FMTQ1OTM5MzYwNTAzMjM5ODY2NTg4OQ%3D%3D.jpg",
        merchantName: "阿宝精品",
        merchantAddress: "江西省南昌市南昌县666号",
        merchantOnSale: "在售574只，担保交易量505只",
        merchantStars: 3,
        tradingVolume: 5,   //担保交易量
        merchantIntroduction: "最帅宝宝",
        merchantPraise: 296,                                     //好评数
        label: 0,                                                //标签（0实名认证  1平台认证  2商家认证）
        dogInforMation: [
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805162393&di=45bb433dfc41ece1ef28baa698d4b48e&imgtype=0&src=http%3A%2F%2Fimg010.hc360.cn%2Fhb%2FMTQ1OTM5MzYwNTAzMjM5ODY2NTg4OQ%3D%3D.jpg",
            dogName: "边境牧羊犬20",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "大宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805162393&di=d04400c4529f6f5ed8623fb2d046a100&imgtype=0&src=http%3A%2F%2Ftct.ganjistatic1.com%2Fgjfsqq%2Fb1428b52e20e4eb0aab30708d699dc3d_600-0_6-0.jpg",
            dogName: "边境牧羊犬21",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "小宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805162392&di=9cbbfd16b4ffb005c6ead65f199aa329&imgtype=0&src=http%3A%2F%2Fimg.lelezone.com%2Fthumb%2Fp%2Fimgs%2F10%2F10461%2F10461_6.jpg",
            dogName: "边境牧羊犬22",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "中宝"   //宠物名称
          }
        ]
      },
      {
        merchantImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805162392&di=8cc6f45c734232e9ff17829657d564e7&imgtype=0&src=http%3A%2F%2Ftct.ganjistatic1.com%2Fgjfsqq%2F51d7ba36ffb647358b581ffac2998404_600-0_6-0.jpg",
        merchantName: "阿宝精品",
        merchantAddress: "江西省南昌市南昌县666号",
        merchantOnSale: "在售574只，担保交易量505只",
        merchantStars: 3,
        tradingVolume: 5,   //担保交易量
        merchantIntroduction: "最帅宝宝",
        merchantPraise: 296,                                     //好评数
        label: 1,                                                //标签（0实名认证  1平台认证  2商家认证）
        dogInforMation: [
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805162392&di=bacc587e3272b53405876e2c327c185b&imgtype=0&src=http%3A%2F%2Fpic24.nipic.com%2F20120907%2F8259641_151152245183_2.jpg",
            dogName: "边境牧羊犬23",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "大宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805162392&di=192be818f757e93e9ea6a92ac7591d14&imgtype=0&src=http%3A%2F%2Fpic4.58cdn.com.cn%2Fmobile%2Fbig%2Fn_v1bkujjdz3lvevs2lxpnma.jpg",
            dogName: "边境牧羊犬24",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "小宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805162392&di=066f50be2363659851ad07ec67f4faed&imgtype=0&src=http%3A%2F%2Fpic8.nipic.com%2F20100723%2F4943220_075234451520_2.jpg",
            dogName: "边境牧羊犬25",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "中宝"   //宠物名称
          }
        ]
      }
      
    ], //推荐商家

    merchantInformationList:[  //商家信息
        {
        merchantImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805162391&di=e89f1a5722ddd218653f641845b9eee2&imgtype=0&src=http%3A%2F%2Fpic36.nipic.com%2F20131127%2F4184180_154351633000_2.jpg",
          merchantName:"阿宝精品宠物",
          merchantAddress:"江西省南昌市南昌县666号",
          merchantOnSale:"在售574只，担保交易量505只",
          merchantStars:3,
          tradingVolume: 5,   //担保交易量
          merchantIntroduction: "最帅宝宝",
          merchantPraise: 296,                                     //好评数
          label: 0,                                                //标签（0平台认证  1商家认证  2实名认证）
          dogInforMation:[
            {
              dogImage:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805162391&di=7b7ca067e920f0f6fc00ee4d070178dc&imgtype=0&src=http%3A%2F%2Fpic42.huitu.com%2Fres%2F20151205%2F347437_20151205224646401500_1.jpg",
              dogName:"边境牧羊犬1",
              dogPrice:3000,
              dogAddress:"江西南昌",
              petsName: "大宝"   //宠物名称
            },
            {
              dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805162390&di=437a085b4ba485ad8ca82842b9165d72&imgtype=0&src=http%3A%2F%2Fimg006.hc360.cn%2Fhb%2FMTQ2ODA4NTAxMDkyMC05NDkxMDA4Mg%3D%3D.jpg",
              dogName: "边境牧羊犬2",
              dogPrice: 3000,
              dogAddress: "江西南昌",
              petsName: "小宝"   //宠物名称
            },
            {
              dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805162390&di=55f6dd9fa559e5a2e77d8dc633c77141&imgtype=0&src=http%3A%2F%2Fimg.11665.com%2Fimg_p4%2Fi1%2FTB1xRQXMVXXXXa.aXXXXXXXXXXX_%2521%25210-item_pic.jpg",
              dogName: "边境牧羊犬3",
              dogPrice: 3000,
              dogAddress: "江西南昌",
              petsName: "中宝"   //宠物名称
            }
          ]
        },

      {
        merchantImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805162389&di=13a0e0daede591bb461e397af7e95117&imgtype=0&src=http%3A%2F%2Fpic3.58cdn.com.cn%2Fmobile%2Fbig%2Fn_v21c7ff824cbd84baf831ab590e14f6fb1.jpg",
        merchantName: "阿宝精品宠物",
        merchantAddress: "江西省南昌市南昌县666号",
        merchantOnSale: "在售574只，担保交易量505只",
        merchantStars: 3,
        tradingVolume: 5,   //担保交易量
        merchantIntroduction: "最帅宝宝",
        merchantPraise: 296,                                     //好评数
        label: 2,                                                //标签（0平台认证  1商家  2实名认证）
        dogInforMation: [
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805162386&di=147d2711916337f3293d8658352ce1aa&imgtype=0&src=http%3A%2F%2Fimg2.pclady.com.cn%2Fpclady%2F1012%2F08%2F630870_05.jpg",
            dogName: "边境牧羊犬4",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "大宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805162385&di=6001eb1695a40e126e5f807af6daf716&imgtype=0&src=http%3A%2F%2Fimg1.doubanio.com%2Fview%2Fcommodity_story%2Fmlarge%2Fpublic%2Fp7438439.jpg",
            dogName: "边境牧羊犬5",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "小宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805162384&di=1836371083f015d1f1d6f29c63521f08&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fblog%2F201505%2F14%2F20150514180916_B2hPM.jpeg",
            dogName: "边境牧羊犬6",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "中宝"   //宠物名称
          }
        ]
      },

      {
        merchantImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805162384&di=119655e69e8922bbc0b0db597df78328&imgtype=0&src=http%3A%2F%2Fpic3.58cdn.com.cn%2Fp1%2Fbig%2Fn_v1bkujjd4qljtvopwulu4q_f27ea18ea2fdc0fc.png",
        merchantName: "阿宝精品宠物",
        merchantAddress: "江西省南昌市南昌县666号",
        merchantOnSale: "在售574只，担保交易量505只",
        merchantStars: 3,
        tradingVolume: 5,   //担保交易量
        merchantIntroduction: "最帅宝宝",
        merchantPraise: 296,                                     //好评数
        label: 1,                                                //标签（0实名认证  1平台认证  2商家认证）
        dogInforMation: [
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805162384&di=fcdb6be0280d84aabc0faffbeb7a8ea5&imgtype=0&src=http%3A%2F%2Fuimg.liecdn.cn%2Fimage%2Fpost%2Fdb%2F19%2Fde%2Ffd%2Fdb19defd5de849bd4db43a8e17b4cfdb.jpg",
            dogName: "边境牧羊犬7",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "大宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805162384&di=e66584dd4eac8f1925f41e91a7d9fd44&imgtype=0&src=http%3A%2F%2Fpic34.nipic.com%2F20131028%2F2455348_174456891000_2.jpg",
            dogName: "边境牧羊犬8",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "小宝"   //宠物名称
          },
          {
            dogImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571805162384&di=b29711c3ff3e31454774a50683b10ae9&imgtype=0&src=http%3A%2F%2Fpic3.58cdn.com.cn%2Fp1%2Fbig%2Fn_v1bl2lwtinvztvo3fogbaq_4b902c3d9f8abab8.jpg",
            dogName: "边境牧羊犬9",
            dogPrice: 3000,
            dogAddress: "江西南昌",
            petsName: "中宝"   //宠物名称
          }
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

  },
  
  /**
   * 点击宠物图片查看详情  Page_Store_PetsInforMation
   */
  petsInforTap:function(res){
    let actionIndex = encodeURIComponent(JSON.stringify(res.currentTarget.dataset.index));
    let actionItem = encodeURIComponent(JSON.stringify(res.currentTarget.dataset.item));
    wx.navigateTo({
      url: Page_path.Page_Store_PetsInforMation + '?petsindex=' + actionIndex + "&petsitem=" + actionItem
    })
  }

})