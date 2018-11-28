// pages/positionDetail/positionDetail.js
// var http = require('../../utils/http')
var app = getApp()
Page({
  data: {
    name: '', // 兼职名称
    salary: '', // 日薪
    city: '', // 兼职地址
    job_type: '', // 兼职类型
    job_num:0 ,//所需人数
    company: '', // 公司名称
    detail: '', // 兼职描述
    hr_tel:'', //联系电话
    date:'' , //兼职日期
    job_id:'',
    isApply:0,
    latitude: 0.1,//当前兼职工作具体地点经度
    longitude:0.1,//当前兼职工作具体地点纬度
    isHaveResume:false //是否有简历
  },

  onLoad: function (options) {
    var that = this;
    console.log(options);
    that.setData({
     job_id: options.job_id
   })
    app.apiPost(app.apiList.getPositionDetail, {
      job_id: that.data.job_id 
    }, function (res) {
      that.setData({ 
        name: res.name, // 兼职名称
        salary: res.salary, // 日薪
        city: res.city, // 兼职地址
        job_type: res.type, // 兼职类型
        job_num: res.number,
        company: res.company, // 公司名称
        detail: res.detail, // 兼职描述
        hr_tel: res.hr_tel, //联系电话
        date: res.date,  //兼职日期
        latitude: res.latitude, //当前兼职工作具体地点经度
        longitude: res.longitude //当前兼职工作具体地点纬度
        });
      }),
      that.isApply(); //是否已投递
    console.log('openid:' + app.globalData.openid)
    app.apiPost(app.apiList.isHaveResume, {
      openid: app.globalData.openid
    }, function (res) {
      console.log(res)
      if (res.have_resume == true) {
        that.setData({
          isHaveResume: res.have_resume,
        })
        console.log('isHaveResume1:' + that.data.isHaveResume)
      }
    })
  },

//是否已投递
isApply:function(){
  var that =this;
  if (app.globalData.openid){
    app.apiPost(app.apiList.isApply, {
      openid: app.globalData.openid,
      job_id: that.data.job_id
    }, function (res) {
      if (res.code == 1) {
        that.setData({
          isApply: 1
        })
        console.log(that.data.isApply)
      }
    })
  }
},

  //打开地图，导航
  openMap:function(){
    var that = this
    var location = that.data.city
    location += that.data.company 
    console.log(that.data.job_id)
    console.log(location)
    console.log(typeof (that.data.latitude))
    var city = that.data.city
    var latitude = that.data.latitude
    var longitude = that.data.longitude
    console.log(typeof (latitude))
    console.log(latitude)
    console.log(longitude)
  //获取当前经纬度
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {       
        // ​使用微信内置地图查看位置
        wx.openLocation({
          latitude: latitude,//要去的纬度-地址
          longitude: longitude,//要去的经度-地址
          name: city,
          address: location
        })
      }
    })
  },

  //投递简历
  applyForJob:function(e){
    //此处要先查询apply_job表中是否存在user_id = openid，job_id = job_id的一条记录，若存在，弹出已经投递过
    //若没有这条记录，要在apply_job表中插入一条数据，user_id = openid，job_id = job_id,status =0,弹出申请成功
   var that = this
   if(app.globalData.openid){
    console.log('isHaveResume2:'+ that.data.isHaveResume)
     if (that.data.isHaveResume == true){
       if (that.data.isApply == 1) {
         wx.showToast({
           title: '你已投递过!',
           duration: 2000
         })
       } else {
         app.apiPost(app.apiList.saveApply, {
           openid: app.globalData.openid,
           job_id: that.data.job_id
         }, function (res) {
           if (res.code == 1) {
             that.setData({
               isApply: 1
             }),
               wx.showToast({
                 title: '投递成功',
                 icon: "success",
                 duration: 2000,
                 success: function () {
                   setTimeout(function () {
                     wx.reLaunch({
                       url: '/pages/firstPage/firstPage',
                     });
                   }, 500);
                 }
               })
           } else {
             wx.showToast({
               title: '投递失败',
               icon: "fail",
               duration: 2000,
               fail: function () {
                 setTimeout(function () { }, 500);
               }
             })
           }
         })
       }
     }else{
       wx.showModal({
         title: '您还没有简历',
         content: '需要编辑简历吗?',
         success: function (sm) {
           if (sm.confirm) {
             wx.navigateTo({
               url: '/pages/edit-resume-base/edit-resume-base',
             });
           }
         }
       })
     }
   }else{
      wx.showModal({
        title: '您还未登录',
        content: '需要登录吗?',
        success: function (sm) {
          if (sm.confirm) {
            wx.switchTab({
              url: '/pages/my/my',
            });
          }
        }
      })
    }
  },

  //拨打电话
  calling: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.hr_tel, //此号码并非真实电话号码，仅用于测试  
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  }  
})

