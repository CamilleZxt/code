// pages/create-job/create-job.js

var util = require('../../utils/util.js'); 

var app = getApp();
Page({
  /**
   * 页面的初始数据
   */ 
  data: {
    isShow: true,//第一次新建简历
    jobName: '',//兼职名称 
    comName: '', //所属公司
    timelist: ['长期兼职', '短期兼职', '周末兼职'],//兼职周期
    timeindex: 2,//周末兼职
    typelist:[],//兼职类型
    typeindex: 0, //话务员
    cityName:'',//工作城市
    // date: '2018-06-10',
    date: util.formatTime2(new Date()), //工作日期
    salary:'',//日薪
    num:'',//所需人数
    hr_tel: '',//联系电话
    detail: '',//工作详情
    detailLen: 0,//工作详情字数
    job_name: "输入兼职名称",    // 兼职名称placeholder
    hr_phone: "输入联系电话", // 联系电话placeholder
    com: "输入公司名称",// 公司名称placeholder
    city: "输入工作城市",// 工作地点placeholder
    salary_text: "输入日薪",// 日薪placeholder
    num_text: "输入所需人数",// 所需人数placeholder
    latitude:'',
    longitude:''
  },

  /*
   生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //检查页面层级
    app.util.checkPage();  
    var that =this;
    //获取兼职类型列表
    that.getTypeList();
    //获取当前经纬度
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        that.setData({
          latitude : res.latitude,
          longitude : res.longitude 
        })
        //打印测试是否得到当前经纬度
        // console.log("经度" + this.data.latitude)
        // console.log("纬度" + this.data.longitude)
      }
    }),
      console.log("date" + util.formatTime2(new Date()))
  },

  init_resume: function (callback) {
    app.apiGet(app.apiList.getResume,{
      openid:app.globalData.openid
    },function(res){
      callback(res);
    })
  },



  //获取兼职类型list
  getTypeList:function(){
    var that = this
    app.apiGet(app.apiList.getTypelist,{},function(data)
    {
      if(data){
        var type1 = []
        for (var i = 0; i < data.data.length; i++){
          type1.push(data.data[i].name)
        }
        that.setData({
          typelist: type1
        })
      }
    })
  },


  // 姓名获取焦点
  namefocus: function (e) {
    this.setData({
      job_name: ""
    })
  },
  //姓名失去焦点
  nameblur: function (e) {
    this.setData({
      job_name: "输入兼职名称",
      jobName: e.detail.value
    })
  },

  //类型
  bindPickerChangeType: function (e) {
    this.setData({
     typeindex: e.detail.value
    })
  },
  //周期
  bindPickerChangeTime: function (e) {
    this.setData({
      timeindex: e.detail.value
    })
  },
  
  // 工作地点获取焦点
  cityfocus: function (e) {
    this.setData({
      city: ""
    })
  },
  //工作城市失去焦点
  cityblur: function (e) {
    this.setData({
      city: "输入工作城市",
      cityName: e.detail.value
    })
  },
  
  // 所属公司获取焦点
  comfocus: function (e) {
    this.setData({
      com: "" 
    })
  },
  //所属公司失去焦点
  comblur: function (e) {
    this.setData({
      com: "输入所属公司",
      comName: e.detail.value
    })
  },

  //工作日期
  bindDateChangeDate: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  
  // 日薪获取焦点
  salaryfocus: function (e) {
    this.setData({
      salary_text: ""
    })
  },
  //日薪失去焦点
  salaryblur: function (e) {
    this.setData({
      salary_text: "输入日薪",
      salary: e.detail.value
    })
  },

  // 所需人数获取焦点
  numfocus: function (e) {
    this.setData({
      num_text: ""
    })
  },
  //所需人数失去焦点
  numblur: function (e) {
    this.setData({
      num_text: "输入所需人数",
      num: e.detail.value
    })
  },

  // 电话获取焦点
  phonefocus: function (e) {
    this.setData({
      hr_phone: ""
    })
  },
  //电话失去焦点
  phoneblur: function (e) {
    this.setData({
      hr_phone: "输入联系电话",
      hr_tel: e.detail.value
    });
  },
  
  //工作详情字数
  countdetailFun: function (e) { 
    var eValueLen = e.detail.value.length,
      eValue = e.detail.value;
    this.setData({
      detailLen: eValueLen,
      detail: eValue
    })
  },
  
  //保存兼职基本信息
  setJobBaseInfoFun: function () {
    //打印测试是否得到当前经纬度
    // console.log("经度" + this.data.latitude)
    // console.log("纬度" + this.data.longitude)
    if (app.globalData.openid != null && app.globalData.token == true){
      let content = {
        openid: app.globalData.openid,
        jobName: this.data.jobName,
        jobtype: this.data.typelist[this.data.typeindex],
        jobtime: this.data.timelist[this.data.timeindex],
        comName: this.data.comName,
        cityName: this.data.cityName,
        date: this.data.date,
        salary: this.data.salary,
        num: this.data.num,
        hr_tel: this.data.hr_tel,
        detail: this.data.detail,
        latitude: this.data.latitude,
        longitude: this.data.longitude
      };
      app.apiPost(app.apiList.saveJob, {
        content: JSON.stringify(content)
      }, function (data) {
        console.log(data);
        if (data.code == 1) {
          wx.showToast({
            title: '发布成功!',
            icon: 'success',
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
            title: '发布失败!',
            icon: 'none',
            duration: 2000,
          })
        }
      })
    }
  },

  
  //返回首页
  back: function () {
    wx.switchTab({    // 跳转到**页面并且关闭其他页面
      url: '/pages/firstPage/firstPage',
    })
  },

  //保存简历到数据库
  submitJobBaseTap: function (e) {
    //TODO:判断返回的状态
    // 测试数据
    // console.log("before:" +this.data.jobName + this.data.hr_tel + this.data.salary + this.data.comName + this.data.num )
    if (app.globalData.openid != null && app.globalData.token == true){
      if ((this.data.jobName == "") || (this.data.hr_tel == "") || (this.data.salary == "") || (this.data.comName == "") || (this.data.num == "") || (this.data.cityName == "")) {
        wx.showModal({
          title: "校园兼职圈提示您",
          content: "请填写完整信息"
        });
      } else if (this.data.jobName || this.data.hr_tel || this.data.salary || this.data.comName || this.data.num || this.data.cityName) {
        if (!/^(([1-9]\d*)|0)$/.test(this.data.salary)) {
          wx.showModal({
            title: "校园兼职圈提示您",
            content: "日薪格式不对！"
          });

        } else if (!/^(([1-9]\d*)|0)$/.test(this.data.num)) {
          wx.showModal({
            title: "校园兼职圈提示您",
            content: "所需人数格式不对！"
          });
        } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.data.hr_tel))) {
          wx.showModal({
            title: "校园兼职圈提示您",
            content: "手机号码格式不对！"
          });
        } else {
          // 测试数据
          // console.log("after:" + this.data.jobName + this.data.hr_tel + this.data.salary + this.data.comName + this.data.num)
          this.setJobBaseInfoFun();
        }
      }
    }else{
      app.alert("请先登录!")
    }
 
  },


  //重置简历
  resetJobBaseTap: function (e) {
    var that = this;
    that.setData({
      jobName: '',//兼职名称
      comName: '', //所属公司
      timelist: ['长期兼职', '短期兼职', '周末兼职'],//兼职周期
      timeindex: 2,//周末兼职
      typelist: ['话务员', '促销员', '收银员'],//兼职类型
      typeindex: 0, //话务员
      cityName: '',//工作城市
      date: '2018-06-10',//工作日期
      salary: '',//日薪
      num: '',//所需人数
      hr_tel: '',//联系电话
      detail: '',//工作详情
      detailLen: 0,//工作详情字数
      job_name: "输入兼职名称",    // 兼职名称placeholder
      hr_phone: "输入联系电话", // 联系电话placeholder
      com: "输入公司名称",// 公司名称placeholder
      city: "输入工作城市",// 工作地点placeholder
      salary_text: "输入日薪",// 日薪placeholder
      num_text: "输入所需人数",// 所需人数placeholder
      latitude:0.0,
      longitude:0.0
    })
  },

  //选择位置位置
  chooseLocation: function (e) {
    console.log(e)
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
            longitude: res.longitude,
            latitude: res.latitude
        })
      },
      fail: function () {
       app.alert("调用地图失败!")
      }
    })
  }
})