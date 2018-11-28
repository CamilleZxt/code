//jobAccept.js
//获取应用实例
var app = getApp(); 
Page({  
    data: {
        name:'',//申请人姓名
        user_id:'',//申请人id
        applyData:[], 
        applyDataLen:0,
        job_id:'',
        isAccept:0,   //是否已录取 0同意录取 1已录取
        openid:'' //当前dataset的openid
  
    },
    onLoad: function (options) {
      var that = this;
      console.log(options);
      console.log(options.job_id);
      that.setData({
        job_id: options.job_id
      })
      //获取申请人列表
      app.apiPost(app.apiList.getApplyList, {
        job_id: that.data.job_id
      }, function (data) {
        if (data){
          console.log(data)
          that.setData({
            applyData: data.data,
            applyDataLen: data.data.length
          });
        }else{
          that.setData({
            applyData:[],
            applyDataLen: 0
          });
        }
      })



    },

    //查看申请人简历信息
    hisResume: function (e) {
      var that = this
      console.log("openid:" + e.currentTarget.dataset.id)
      //判断申请人是否有简历
      app.apiPost(app.apiList.isHaveResume, {
        openid: e.currentTarget.dataset.id
      }, function (res) {
        if (res.have_resume == true) {
          wx.navigateTo({
            url: '/pages/hisResume/hisResume?openid=' + e.currentTarget.dataset.id,
          })         
        }else{
          wx.showToast({
            title: '此简历已不存在！',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },

    acceptHe:function(e){
      var that = this
      console.log("acceptHe:job_id:" + that.data.job_id)
      console.log("acceptHe:openid:" + e.currentTarget.dataset.id)
      that.setData({
        openid: e.currentTarget.dataset.id
      })
      //查看是否已录取
      app.apiPost(app.apiList.haveAccept,{
        openid: e.currentTarget.dataset.id,
        job_id: that.data.job_id
      },function(res){
        
        if(res.code == 1){
          console.log("haveAccept:" + res)
          that.setData({
            isAccept: 1
          })
          wx.showToast({
            title: '已经录取过！',
            icon: "success"
          })  
        }else{
          app.apiPost(app.apiList.isAccept, {
            openid: e.currentTarget.dataset.id,
            job_id: that.data.job_id
          }, function (res) {
            console.log("isAccept："+res)
            if (res.code == 1) {
              that.setData({
                isAccept: 1
              })
              wx.showToast({
                title: '成功录取！',
                icon: "success"
              })
            } else {
              that.setData({
                isAccept: 0
              })
              wx.showToast({
                title: '录取失败！',
                icon: "none"
              })
            }
          })
        }       
      })
    }  
})