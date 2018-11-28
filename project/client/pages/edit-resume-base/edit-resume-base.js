// pages/edit-resume-base/edit-resume-base.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHaveResume: true,//第一次新建简历
    userName: '',//姓名
    genderlist: ['男', '女'],//性别
    genderindex: 0,//性别index
    edulevellist: ['学历不限', '大专', '本科', '硕士', '博士'],//学历
    edulevelindex: 2,//默认本科
    // edulevel:'',//学历
    birthday: '1990-01-01',//出生日期
    contact: '',//联系电话
    email: '',//联系邮箱
    myself: '',//自我介绍
    selfLen: 0,//自我介绍字数
    user: "输入您的姓名",    // 姓名placeholder
    userphone: "输入您的电话",
    useremail: "输入您的邮箱"
  },

  /*
   生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //检查页面层级
    app.util.checkPage();  
    var that =this; 
    if (app.globalData.isHaveResume ==true ) {
      wx.setNavigationBarTitle({
        title: '修改简历',
      }),
      that.init_resume(function(res){
        that.setData({
          userName: res.name,
          genderindex: res.gender,
          edulevelindex: res.education == '' ? 0 : res.education,
          // edulevel: res.education,
          birthday: res.birth ? res.birth : that.data.birthday,
          contact: res.tel,
          email: res.email,
          myself: res.introduction,
          selfLen: res.introduction.length,
        })
      })

    }
    // app.apiPost(app.apiList.saveResume, {
    //   openid: app.globalData.openid,
    //   type: 1,
    //   userImg: app.globalData.userInfo.avatarUrl
    // }, function (data) {
    //   console.log(data);
    //   if (data.code == 1) {
    //     let isHaveResume = {
    //       base_info: content
    //     }
    //     console.log(isHaveResume)
    //     app.globalData.isHaveResume = isHaveResume;     // 传递了对象

    //   } else {
    //     app.alert(data.alertMsg);
    //   }
    // })

  },

  init_resume: function (callback) {
    app.apiGet(app.apiList.getResume,{
      openid:app.globalData.openid
    },function(res){
      callback(res);
    })
  },
  //姓名
  // nameTap: function (e) {
  //     var eValue = e.detail.value;

  // },
  // 姓名获取焦点
  namefocus: function (e) {
    this.setData({
      user: ""
    })
  },
  //姓名失去焦点
  blurfocus: function (e) {
    this.setData({
      user: "输入您的姓名",
      userName: e.detail.value
    })
  },
  //性别
  bindPickerChangeSex: function (e) {
    this.setData({
      genderindex: e.detail.value
    })
  },
  //学历
  bindPickerChangeEduLevel: function (e) {
    this.setData({
      edulevelindex: e.detail.value
    })
  },
  
  //出生日期
  bindDateChangeBirthday: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  
  // 电话获取焦点
  phonefocus: function (e) {
    this.setData({
      userphone: ""
    })
  },
  //电话失去焦点
  phoneblur: function (e) {
    this.setData({
      userphone: "输入您的电话",
      contact: e.detail.value
    });
  },
  
  // 邮箱获取焦点
  emailfocus: function (e) {
    this.setData({
      useremail: ""
    })
  },
  //邮箱失去焦点
  emailblur: function (e) {
    this.setData({
      useremail: "输入您的邮箱",
      email: e.detail.value
    })
  },
  //介绍自己字数
  countSelfFun: function (e) { 
    var eValueLen = e.detail.value.length,
      eValue = e.detail.value;
    this.setData({
      selfLen: eValueLen,
      myself: eValue
    })
  },
  // //保存
  // submitResumeBaseTap: function () {

  //   this.setResumeBaseInfoFun();
  //   if ((this.data.userName == "") || (this.data.contact == "") || (this.data.email == "")) {
  //     wx.showModal({
  //       title: "校园兼职圈提示您",
  //       content: "请填写完整信息"
  //     });
  //   } else if (this.data.userName || this.data.contact || this.data.email) {
  //     if (new Date().getFullYear() < this.data.birthday.substring(0, 4)) {
  //       wx.showModal({
  //         title: "校园兼职圈提示您",
  //         content: "请填写真实出生时间"
  //       });
  //       if (new Date().getMonth() < this.data.birthday.substring(5, 7)) {
  //         wx.showModal({
  //           title: "校园兼职圈提示您",
  //           content: "请填写真实出生时间"
  //         });
  //       }
  //     } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.data.contact))) {
  //       wx.showModal({
  //         title: "校园兼职圈提示您",
  //         content: "手机号码格式不对！"
  //       });
  //     } else if (!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(this.data.email)) {
  //       wx.showModal({
  //         title: "校园兼职圈提示您",
  //         content: "邮箱格式不对！"
  //       });
  //     } else {
  //       wx.showToast({
  //         title: '保存成功！',
  //         icon: 'success',
  //         duration: 500
  //       })
  //       this.setResumeBaseInfoFun();
  //       //更新上一级页面
  //       var pages = getCurrentPages();
  //       var curPage = pages[pages.length - 2];
  //       curPage.setData({
  //         resumeBaseInfo: this.data
  //       });

  //       //返回上一个页面
  //       setTimeout(function () {
  //         wx.navigateBack({

  //         })
  //       }, 800);
  //     }
  //   }
  // },

  //保存简历基本信息
  setResumeBaseInfoFun: function () {
    let content = {
      userName: this.data.userName,
      genderindex: this.data.genderindex,
      edulevelindex: this.data.edulevelindex,
      birthday: this.data.birthday,
      contact: this.data.contact,
      email: this.data.email,
      myself: this.data.myself
    };
    app.apiPost(app.apiList.saveResume, {
      openid: app.globalData.openid,
      content: JSON.stringify(content)
    }, function (data) {
      console.log(data);
      if (data.code == 1) {
        app.globalData.isHaveResume = true;
        wx.showToast({
          title: '保存成功!',
          icon: 'success',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.redirectTo({
                   url: '/pages/my-resume/my-resume'
               });
            }, 500);
          }
        })
      } else {
        wx.showToast({
          title: '保存失败!',
          icon: 'none',
          duration: 2000,
          fail: function () {
            // setTimeout(function () {
            // },500);
          }
        })
      }
    })
  },
  //返回首页
  backIndewx: function () {
    if (app.globalData.isHaveResume == true){
      wx.redirectTo({
        url: '/pages/my-resume/my-resume',
      })
    }else{
      wx.switchTab({    // 跳转到**页面并且关闭其他页面
        url: '/pages/my/my',
      })
    }
   
  },
  //保存简历到数据库
  submitResumeBaseTap: function (e) {
    //TODO:判断返回的状态

    if ((this.data.userName == "") || (this.data.contact == "") || (this.data.email == "")) {
      wx.showModal({
        title: "校园兼职圈提示您",
        content: "请填写完整信息"
      });
    } else if (this.data.userName || this.data.contact || this.data.email) {
      if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.data.contact))) {
        wx.showModal({
          title: "校园兼职圈提示您",
          content: "手机号码格式不对！"
        });
      } else if (!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(this.data.email)) {
        wx.showModal({
          title: "校园兼职圈提示您",
          content: "邮箱格式不对！"
        });
      } else {
        this.setResumeBaseInfoFun();
      }
    }
  },
  
  //重置简历
  resetResumeBaseTap: function (e) {
    var that = this;
    if (app.globalData.isHaveResume == true) {
      that.init_resume(function (res) {
        that.setData({
          userName: res.name,
          genderindex: res.gender,
          edulevelindex: res.education == '' ? 0 : res.education,
          birthday: res.birth ? res.birth : that.data.birthday,
          contact: res.tel,
          email: res.email,
          myself: res.introduction,
          selfLen: res.introduction.length,
        })
      })
    }else{
      that.setData({
      userName: '',//姓名
      genderindex: 0,//性别index
      edulevelindex: 2,//默认本科
      birthday: '1990-01-01',//出生日期
      contact: '',//联系电话
      email: '',//联系邮箱
      myself: '',//自我介绍
      selfLen: 0,//自我介绍字数
      user: "输入您的姓名",    // 姓名placeholder
      userphone: "输入您的电话",
      useremail: "输入您的邮箱"
      })
    }
  }
})