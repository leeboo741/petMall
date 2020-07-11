Component({
  properties: {
    isShow: {
      type: Boolean,
      value: !1
    },
    showClose: {
      type: Boolean,
      value: !0
    }
  },
  methods: {
    show: function () {
      this.setData({
        isShow: !0
      });
    },
    hide: function () {
      this.setData({
        isShow: !1
      });
    }
  }
});