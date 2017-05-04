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
    onLoad: function() {

        var that = this
        wx.request({
            url: 'https://m.gdnybank.com/ts100101.html',
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                if(res.data.status == '0000'){
                     that.setData({
                    rebby: res.data.data.prdList
                    })
                }else{
                   wx.showModal({
                   title:res.data.status,
                   content:res.data.error_message,
                   showCancel:false
                   })
                }
               
            }
        })
    },
    navigateFn : function(){
       console.log(e)
    }

})