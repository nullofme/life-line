// page/index/index.js
var ages = require("../data/ages.js");
Page({
    data: {
        array:["dhajk","daiji","qijei"],
        index:0
    },
    bindPickerChange(e){
this.setData({index:e.detail.value})
    }
})