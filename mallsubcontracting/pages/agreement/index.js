// mallsubcontracting/pages/agreement/index.js

const ShareManager = require("../../../services/shareService");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleNameType:"",
    fuwuxieyi:[
      {
        title:"一、关于未发货要求退款",
        concat: "鉴于宠物活体是非标准化的个性商品，且涉及到不同品种的不同地区繁育舍，因此买家下单后不接受无理由退款。但考虑到买家体验，买家下单后一小时内申请退款的平台支持全额退款，若超过一小时后由于各种原因（如不想要了、家人不让养等等）确实需要退货的，若确认宠物尚未发出的，平台会和您进行退货沟通，在未发货的情况下您须同意买家退货，同时买家将承担宠物零售价20%的退货费用作为您的补偿。",
        showConcatNR: []
      },
      {
        title: "二、关于支付定金要求退款",
        concat: "若您和买家下单约定为定金的（买家下单宠物描述中有明确说明为定金且不支持退款的），平台将不支持买家退款。定金作为您的补偿。",
        showConcatNR: []
      },
      {
        title: "三、关于无理由拒收要求退款",
        concat: "若宠物发出之后，买家无理由拒收宠物的，平台将无法支持买家的任何退款退货要求。若因此造成宠物的损伤或者产生的其它费用，将由买家自行承担责任。",
        showConcatNR: []
      },
      {
        title: "四、关于提前确认收货",
        concat: "收到宠物后买家一旦确认收货代表同意并授权平台可以提前打款给卖家并提前结束平台担保交易保障。但为向买家提供更好的服务体验，确认收货后72小时内如果产生纠纷可联系平台客服帮忙解决，平台尽可能和卖家沟通保障买家的合法诉求。",
        showConcatNR: []    
      },
      {
        title: "五、关于担保交易保障",
        concat: "买家平台下单付款享受平台七天健康担保期（从卖家上传发货凭证开始计算七个自然日）担保期间如果出现如下情况全额退款，卖家必须接受：",
        showConcatNR:[
          "1、宠物犬被确诊为犬瘟热、犬细小病毒、传染性肝炎、犬冠状病毒；宠物猫被确诊为猫瘟、猫艾滋、猫鼻支；",
          "2、宠物担保期内死亡（人为导致死亡除外）",
          "3、收到宠物已经死亡"
        ],
        showConcatNRbottom: "申请退款需要买家提供正规宠物医院（具备合法有效的宠物医院营业执照）出具的正规确诊证明、死亡证明、检验报告，所有相关证明需具备职业兽医执照的医生开具并签字，加盖医院公章视为有效。收到宠物24小时内如果发现如下情况可要求退换同品质同种类宠物，卖家必须接受：",
        showConcatNRbottomNR:[{
          show: "1、买家收到宠物确认有明显品种差异，可要求退换，来回运费均由卖家承担",
          showifn:[]
        },
        {
          show: "2、买家收到宠物发现如下严重货不对版情况，可以要求退换，来回运费均由卖家承担：",
          showifn: [
            " a、毛色明显不符（照片和实物的合理色差除外）",

            "b、性别不符",

            "c、年龄不符（与描述年龄差距在6个月以上）",
            "d、与血统信息描述不符",

            "e、与绝育信息描述不符",

            "f、宠物有明显残疾（腿瘸、眼瞎、耳聋）"
            ] 
         }    

        ]
      }
    ],
    fuwuxieyiSix:[
      {
        titleName:" 1、关于洗澡",
        content:"不能因为犬/猫有体味或脏就擅自带去宠物店洗澡或者喷香水，需要等三针疫苗注射完后一周，身体完全健康的情况下方可洗澡，如买家擅自为狗狗洗澡或喷香水导致犬/猫感冒并引起其他疾病的视为买家主动放弃担保交易保障。"
      },
      {
        titleName: "2、关于遛狗、玩耍",
        content: "大部分犬/猫三针疫苗没有打齐之前，自身免疫力不强，如买家擅自带去公共场地或与其他犬/猫接触导致感染视为买家主动放弃担保交易保障。"
      },
      {
        titleName: "3、关于喂食",
        content: "建议犬/猫食用犬/猫专用粮，泡软后给犬/猫食用，犬/猫在3个月前，如买家擅自给犬/猫喂食骨头、牛奶、巧克力、葡萄、洋葱等除狗/猫粮外的食物导致犬/猫出现不良反应视为买家主动放弃担保交易保障。"
      },
      {
        titleName: "4、关于笼子、饲养",
        content: "犬/猫的每天活动时间不得超过2个小时，出门请务必要将犬/猫关进笼子里，如因买家离开家时没有将犬/猫关进笼子里导致犬/猫误食地上垃圾或者硬物视为买家主动放弃担保交易保障。"
      },
      {
        titleName: "5、关于不可抗力",
        content: "由于战争、政府行为、地震、山洪、泥石流、海啸和其它自然灾害或刑事案件的发生造成宠物死亡、受伤或者失踪视为买家主动放弃担保交易保障。"
      }
    ],
    fuwuxieyiSeven:[
      "1、您在此同意并接受平台有权按照本协议处理您与买家之间的纠纷；同时本平台按照本协议处理您与买家的纠纷是免责的。若您对本平台处理的结果不满意，可以通过法律途径解决与买家的争议，平台将予以协助。若您的争议通过司法途径解决的，本平台将根据司法机关生效的文书，视情形协助执行。",
      "2、对于本协议未规定的内容，平台有权站在中立的立场依据您与买家提供的相关证据对争议事项做出独立裁决，同时平台据此做出的裁决是免责的，若您对本平台处理的结果不满意，可以通过法律途径解决与买方的争议，平台将予以协助。若争议通过司法途径解决的，本平台将根据司法机关生效的文书，视情形协助执行。",
      "3、本平台买卖双方若发生争议，双方举证的费用（包括但不限于检测费等）分担方式为：若举证证明卖家存在过错的，则由卖家承担举证费用；若举证证明是买家存在过错的，则举证费用由买家承担。同时为了达到费用最小化，本平台建议举证费用不超过宠物零售价格的30%且不超过1000元，若举证费用超过这一标注，除非举证方有证据证明该费用的合理性，否则过错方可以拒绝承担超额部分。",
      "4、平台担保交易结束（包括买家提前确认收货的情形），视为平台已履行完毕平台承担的义务。平台担保交易结束后，卖家与买家达成新的协议或者产生退换货等情形时，由卖家与买家双方协商，平台将不承担任何责任。"
    ],


    sjgf:[  
     {
        title: "7天首页推荐商家奖励",
        head: "•当周完成三笔担保交易（买家确认收货或者过了担保期才算 完成交易）",
        box:[
          {
           
          }
        ]
     },
      {
        title: "永久封号处理",
        head: "账户封号、权益清零",
        box: [
          {
            boxHead: "•绕开平台私下交易，被买家举报如下内容的",
            boxContent: [
              "1）	买家私下交易付款后直接拉黑或不予发货等诈骗行为",
              "2）	其它平台认为的应该永久封号的行为"
            ]
          },
          {
            boxHead: "•发布内容侵权或非法，被商家举报如下行为的",
            boxContent: [
              "1）	买家私下交易付款后直接拉黑或不予发货等诈骗行为",
              "2）	为经授权盗用平台其它商家发布宠物图片或视频，且拒不修改 的行为",
              "3）	发布平台禁止发布品种",
              "4）	其它平台认为的应该禁止发布内容"
            ]
          },
          {
            boxHead: "•触发平台风控",
            boxContent: [
              "1）	处于平台封号状态用户通过换马甲重新注册被平台风控系统判定为之前封号用户的",
              "2）	利用平台漏洞，窃取平台用户数据或权益等非法行为",
              "3）	冒充平台从事诈骗活动的行为",
              "4）	累计达到三次临时封号处理",
              "5）	其它平台认为的应该纳入风控的行为"
            ]
          }
        ]
      },
      {
        title: "临时封号处理",
        head: "",
        box: [
          {
            boxHead: "•绕开平台私下交易，有如下行为的",
            boxContent: [
              "1）	卖家以线下打折、额外付运费、诋毁平台等方式诱导用户私下 飞单的行为（发生私下交易主动到平台备案的除外）",
              "2）	收到宠物严重货不对版且拒绝妥善解决的行为",
              "3）	收到宠物患有高致死性疾病且拒绝妥善解决的行为",
              "4）	故意隐瞒宠物缺陷，以次充好且拒绝妥善解决的行为",
              "5）	卖家态度恶劣，言语漫骂且拒绝道歉的行为",
              "6）	其它平台认为的应该临时封号的行为"
            ]
          },
          {
            boxHead: "•发布内容侵权或非法，有如下行为的",
            boxContent: [
              "1）	平台私聊诱导客户加微信（含手机号）的行为",
              "2）	平台私聊诱导客户到其它平台交易的行为",
              "3）	平台发布宠物描述信息中包含微信号且拒绝修改的行为",
              "4）	发布和宠物明显无关图片或视频且拒绝修改的行为",
              "5）	其它平台认为的应该禁止发布内容"
            ]
          }
        ]
      },
     {
       title: "承担退款交易手续费",
        head: "",
        box: [
          {
            boxHead: "•平台交易，被买家举报如下行为的",
            boxContent: [
              "1）	平台交易付款后将宠物出售给其它用户导致交易退款的行为",
              "2）	平台交易付款后商家额外加价导致交易退款的行为"
            ]
          }
        ]
      },
      {
        title: "收取违约金",
        head: "",
        box: [
          {
            boxHead: "•被买家举报或者被平台发现飞单行为",
            boxContent: [
              "买家（来源宠物市场）直接将交易款项转到卖家个人账户（包括以现金的方式），未从平台上交易的飞单行为，平台将 通过聊天记录、转款信息等资料证实，查证属实的，首次平台 将通过短信、微信或电话告知方式予以追回应缴佣金并封号7天 警告处理。卖家被警告后若再次发生飞单行为，平台将有权要 求卖家支付1000元 / 笔违约金（卖家私下收到款项后72小时内 向平台报备并及时支付平台佣金除外），卖家应在3个自然日内 支付违约金，否则平台有权扣划商户的保证金用于支付违约金。",
            ]
          }
        ]
      },
      {
        title: "其它须知",
        head: "",
        box: [
          {
            boxHead: "",
            boxContent: [
              "•1）平台商家应严格按照与平台签订的相关协议以及法律的规定， 合规经营。若商家违反相关协议或者法律规定给平台造成损失的， 商家应向平台足额赔偿，同时平台有权直接从商家的保证金中划拨 赔偿金额至平台账户，划拨后若剩余保证金低于《“淘宠惠”QA》 协议中约定的数额的，商家应在三个工作日内补足，若商家不补足 的，则平台有权采取临时封号或者其他措施。",
              "•2）平台商家在此承诺：若依据相关协议或法律规定（如买方为 无民事行为人等），商家应当履行向买家退款等义务（包括但不限 于部分退款、赔偿等义务）时，商家应当在合理期限内履行完毕相 关义务。若商家不履行相关义务，则平台有权代为履行并从商家的 保证金中划转相应金额至买家账户。划拨后商家若剩余保证金低于《“淘宠惠”QA》协议中约定的数额的，商家应在三个工作日内 补足，若商家不补足的，则平台有权采取临时封号或者其他措施。"
             
            ]
          }
        ]
      }
    ],
    showSk: "•3）本平台指定的收款账户为：河北民生银行合作路支行：6232 5810 0070 0753户名：淘宠惠河北物联网科技有限公司平台商家应尽到适当的审慎义务，不要将款项转入非平台指定的收 款账户，否则造成的一切损失由商家自己承担。",
  }, 



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      titleNameType: options.titlename
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
    return ShareManager.getDefaultShareCard();
  },
})