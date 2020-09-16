// components/countButton/countButton.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count:{
      type: Number,
      value: 1
    },
    minValue:{
      type: Number,
      value: 1
    },
    maxValue:{
      type: Number,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    reduce: function() {
      let count = this.data.count -1;
      if (count < this.data.minValue) {
        count = this.data.minValue;
      }
      this.changeCount(count);
    },
    plus: function() {
      let count = this.data.count +1;
      if (this.data.maxValue != null) {
        if (count > this.data.maxValue) {
          count = this.data.maxValue;
        }
      }
      this.changeCount(count);
    },
    changeCount: function(count) {
      if (count != this.data.count) {
        this.setData({
          count: count
        })
        let callBackFunctionName = 'countchange'; // 触发事件 方法名
        let myEventDetail = {
          count: this.data.count
        }; // detail对象，提供给事件监听函数
        let myEventOption = {
          'bubbles': false, // 事件是否冒泡
          'composed': false, // 事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部
          'capturePhase': false, // 事件是否拥有捕获阶段
        }; // 触发事件的选项
        this.triggerEvent(callBackFunctionName, myEventDetail, myEventOption);
      }
    }
  },

  externalClasses: ["i-class"],
})
