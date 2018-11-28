// pages/my-resume/my-resume.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',//姓名
    genderlist: ['男', '女'],//性别
    genderindex: 0,//性别index
    edulevellist: ['学历不限', '大专', '本科', '硕士', '博士'],//学历
    edulevelindex: 2,//默认本科
    birthday: '1990-01-01',//出生日期
    contact: '',//联系电话
    email: '',//联系邮箱
    myself: '',//自我介绍
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //检查页面层级
      app.util.checkPage();
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
          })
        })
     }
  },

  //获取已有简历信息
  init_resume: function (callback) {
    app.apiGet(app.apiList.getResume, {
      openid: app.globalData.openid
    }, function (res) {
      callback(res);
    })
  },

  onShow: function(){
  },

  //修改简历信息
  editBaseInfoTap: function(){
    wx.navigateTo({
      url: '/pages/edit-resume-base/edit-resume-base',
    })
  },
})