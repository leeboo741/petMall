Component({
    properties: {
        isdianzen: {
            type: Boolean,
            value: !1
        },
        currentId: {
            type: String,
            value: ""
        },
        dianzanList: {
            type: Array,
            value: []
        },
        zuopinList: {
            type: Array,
            value: [ {
                imgUrl: "http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/miniprogram/15669824668310726070.png",
                workerId: 18,
                userPraise: 1,
                praiseCount: 2015,
                id: 7,
                title: "家庭泰迪装"
            }, {
                imgUrl: "http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/miniprogram/15669824668310726070.png",
                workerId: 18,
                userPraise: 0,
                praiseCount: 2041,
                id: 7,
                title: "金毛美容装"
            }, {
                imgUrl: "http://dev-pet-avatar.oss-cn-beijing.aliyuncs.com/miniprogram/15669824668310726070.png",
                workerId: 18,
                userPraise: 0,
                praiseCount: 2501,
                id: 7,
                title: "慧慧泰迪装"
            } ]
        }
    },
    methods: {
        dianzan: function(e) {
            var r = e.currentTarget.dataset.index, i = e.currentTarget.dataset.id, t = e.currentTarget.dataset.userpraise;
            this.triggerEvent("dianzan", {
                id: i,
                userPraise: t,
                index: r
            });
        }
    }
});