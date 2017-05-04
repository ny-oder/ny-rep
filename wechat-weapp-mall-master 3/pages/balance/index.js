var app = getApp()
Page({
    data:{
        tele:"",
        verifyCore:"",
        focus:true,
        userCode:""
    },
    //发送短信
    sendSms : function(){
        var telePhone = this.data.tele;
        var reg = /^1[3|4|5|7|8][0-9]{9}$/;
        if(reg.test(telePhone)){
            var that = this;
            wx.request({        url:'https://wx.gdnybank.com/sdplatform/wx_small/sentMessage?phone='+telePhone+'&codes=bP06TU&smsCode=11',
            data: {},
            method: 'GET', 
            success: function(res){
                that.setData({
                    verifyCore:res.data.validateCode 
                })
            },
            fail: function() {
             wx.showModal({
                    title:"温馨提示",
                    content:"发送短信失败",
                    showCancel:false
                })
          }
            })
            
        }else{
            wx.showModal({
                title:"温馨提示",
                content:"请输入正确的手机号码",
                showCancel:false
            })
        }
    },
    //获得用户输入手机号
    getTele : function(e){
            this.setData({
                tele:e.detail.value
            })
    },
    //获得用户输入验证码
    getUserCode : function(e){
        this.setData({
            userCode : e.detail.value
        })
    },
    //查询余额
    quryBal : function(){
        var userCode = this.data.userCode;
        var tele = this.data.tele

        var regTel = /^1[3|4|5|7|8|][0-9]{9}$/;//手机正则
        var reg = /^[0-9]{4}$/;//验证码正则
       

        if(!regTel.test(tele)){
            wx.showModal({
                title : '温馨提示',
                content : '请输入正确的手机号码',
                showCancel : false
            })

        }
        var that = this;
        if(reg.test(userCode)){
            wx.request({
              url: 'https://wx.gdnybank.com/sdplatform/wx_small/getAcctBalByPhone?phone='+tele+'&code='+userCode+'&openId=o4q760EgF_0eql2k8y_CfIuBBwYw&validateCode='+userCode,
              data: {},
              method: 'GET', 
              success: function(res){
                  if(res.data.succ){
                      if(res.data.status == '3'){
                          wx.showModal({
                              title : '温馨提示',
                              content : res.data.msg,
                              showCancel : false
                          })
                      }
                      wx.navigateTo({
                          url: '../qryBalance/index?custName='+res.data.custName+'&rows='+JSON.stringify(res.data.rows[0]),
                          fail: function() {
                            wx.showModal({
                                title : '温馨提示',
                                content : '跳转页面失败',
                                showCancel : false
                            })
                          }
                      })
                  }else{
                      wx.showModal({
                          title : '温馨提示',
                          content : res.data.msg,
                          showCancel : false
                      })
                  }
                
              },
              fail: function() {
                wx.showModal({
                    title : '温馨提示',
                    content : '查询失败',
                    showCancel : false
                })
              }
            })
        }else{
            wx.showModal({
                title: '温馨提示',
                content: '请输入正确的验证码',
                showCancel: false
            })
        }
    }
    
})
