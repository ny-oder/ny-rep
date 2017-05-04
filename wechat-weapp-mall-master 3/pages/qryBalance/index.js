var app = getApp()
Page({
    data:{
        custName:"",
        rows:{}
    },
    onLoad : function(params){
        this.setData({
            custName : params.custName,
            rows : JSON.parse(params.rows)
        })
        
    }
})