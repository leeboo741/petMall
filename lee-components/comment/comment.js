Component({
    properties: {
        isup: {
            type: Boolean,
            value: !1
        },
        showItems: {
            type: Boolean,
            value: !1
        },
        commentWorkerConfig: {
            type: Object,
            value: {
              avatar: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1801024385,1801535508&fm=11&gp=0.jpg",
                nickname: "宠物家回复"
            }
        },
        commentList: {
            type: Array,
            value: []
        }
    },
    ready: function() {
        var t = this.properties.commentList, e = !0, a = !1, i = void 0;
        try {
            for (var s, o = t[Symbol.iterator](); !(e = (s = o.next()).done); e = !0) {
                var n = s.value;
                n.isup = !1, n.showitem = !1;
            }
        } catch (t) {
            a = !0, i = t;
        } finally {
            try {
                e || null == o.return || o.return();
            } finally {
                if (a) throw i;
            }
        }
        this.setData({
            commentList: t
        }), console.log(t);
    },
    methods: {
        chakan: function(t) {
            var e = this.data.commentList, a = t.target.dataset.index, i = t.target.dataset.extraitems;
            i && i.length > 0 && (e[a].isup ? (e[a].isup = !1, e[a].showitem = !1, this.setData({
                commentList: e
            })) : (e[a].isup = !0, e[a].showitem = !0, this.setData({
                commentList: e
            })));
        },
        yulantupian:function(e){
          console.log(JSON.stringify(e));
          var a = e.currentTarget.dataset.tupian;
          wx.previewImage({
            urls: a
          });
        }
    }
    
});