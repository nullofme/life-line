// page/index/index.js
var ages = require("../data/ages.js");
Page({
    data: {
        green: [],
        white: [],
        val_green: '',
        val_white: '',
        detail: '',
        button_show: false,
        top_show: true
    },
    input_age(e) {
        var color_id = e.currentTarget.dataset.id;
        if (e.detail.value > 290) {
            wx.showModal({
                title: '历史纪录最长290岁',
                content: '亲，要打破世界纪录嘛',
                success: (res) => {
                    if (res.confirm) {
                    } else {
                        this.setData({ ['val_' + color_id]: e.detail.value > 290 ? "" : e.detail.value })
                    }
                }
            })
        }
    },
    submit(e) {
        var arr1 = Number(e.detail.value.green);
        var arr2 = Number(e.detail.value.white);
        if (arr1 == '' || arr2 == "") {
            wx.showToast({
                title: '请输入全部对应的年龄值',
                icon: "none"
            });
            return;
        }
        if (arr1 > arr2) {
            wx.showToast({
                title: '亲，输入的年龄不能大于预计的年龄',
                icon: "none"
            });
            return;
        } else if (arr1 == arr2) {
            wx.showToast({
                title: `...over...end...` + ("\n") + `不要开玩笑`,
                icon: "none"
            });
            return;
        } else {
            this.setData({ green: arr1, white: arr2, button_show: true });
        }
        ages.map((item, index) => {
            for (var k in item) {
                var newstr = k.slice(4);
                if (arr1 >= newstr.substr(0, 3) && arr1 <= newstr.substr(4, 3)) {
                    this.setData({ detail: item[k] });
                }
            }
        })
    },
    deleteThis(e) {
        this.setData({ green: [], white: [], val_green: '', val_white: '', detail: '', button_show: false })
    },
    onLoad: function (options) {
    },
    onShareAppMessage() {
        this.setData({top_show:false});
        var that=this;
        return {
            title: "我" + this.data.green + "岁啦，你呢?来一起玩吧",
            complete(){
                that.setData({top_show:true})
            }
        }
    }
})