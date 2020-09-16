const shoppingcartManager = require("../../services/shoppingcartManager");
const notificationCenter = require("../../services/notificationConter/notificationCenter");
const { SHOPPINGCART_CHANGE_NOTIFICATION_NAME } = require("../../services/shoppingcartManager");

// components/shoppingcart/shoppingcart.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    }, // 是否展示
    ableCloseOut: {
      type: Boolean,
      value: true
    }, // 是否允许点击mask关闭
    goods: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 数量按钮 - 数量改变响应
     * @param {*} e 
     */
    changeCount: function(e) {
      this.data.count = e.detail.count;
    },
    /**
     * 点击 加入购物车
     */
    tapAddToShoppingcart: function() {
      let callBackFunctionName = 'addtocart'; // 触发事件 方法名
      let myEventDetail = {
        count: this.data.count
      }; // detail对象，提供给事件监听函数
      let myEventOption = {
        'bubbles': false, // 事件是否冒泡
        'composed': false, // 事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部
        'capturePhase': false, // 事件是否拥有捕获阶段
      }; // 触发事件的选项
      this.triggerEvent(callBackFunctionName, myEventDetail, myEventOption);
      shoppingcartManager.saveGoodsToLocal(this.data.goods, this.data.count);
      this.close();
    },
    /**
     * 点击蒙层
     */
    tapMask: function() {
      if (this.data.ableCloseOut) {
        this.close();
      }
    },
    /**
     * 关闭页面
     */
    close: function(){
      this.setData({
        show: false
      })
      let callBackFunctionName = 'close'; // 触发事件 方法名
      let myEventDetail = {
        show: false
      }; // detail对象，提供给事件监听函数
      let myEventOption = {
        'bubbles': false, // 事件是否冒泡
        'composed': false, // 事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部
        'capturePhase': false, // 事件是否拥有捕获阶段
      }; // 触发事件的选项
      this.triggerEvent(callBackFunctionName, myEventDetail, myEventOption);
    }
  },

  /**
   * 属性监听
   */
  observers: {
    "show": function(show){
      if (show) {
        let tempCount =  shoppingcartManager.getLocalCount(this.data.goods);
        if (tempCount != null) {
          this.setData({
            count: shoppingcartManager.getLocalCount(this.data.goods)
          })
        }
      }
    }
  },
  /**
   * 所在页面声明周期
   */
  pageLifetimes: {
    show: function () {
      // 页面被展示
      let that = this;
      notificationCenter.addNormalNotificationObserver(SHOPPINGCART_CHANGE_NOTIFICATION_NAME,function(res){
        that.setData({
          count: shoppingcartManager.getLocalCount(that.data.goods)
        })
      },this);
    },
    hide: function () {
      // 页面被隐藏
      notificationCenter.removeNotificationObserver(SHOPPINGCART_CHANGE_NOTIFICATION_NAME, this);
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
})
