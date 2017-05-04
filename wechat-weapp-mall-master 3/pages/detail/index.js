var app = getApp()
Page({
        data: {
            duration: 2000,
            indicatorDots: true,
            autoplay: true,
            interval: 3000,
            loading: false,
            plain: false
    },
    onLoad: function(params) {
        var that = this;
        console.log(params)
        that.setData({d:params});
    }

})