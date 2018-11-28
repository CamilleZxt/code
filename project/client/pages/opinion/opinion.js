// pages/opinion/opinion.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conTextPla:"请填写10个字以上的问题描述",
    // conval:"",
    opinionLen:0,
    myOpinion: '',//自我介绍
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.init_opinion(function (res) {
      that.setData({
        myOpinion: res.opinion,
        opinionLen: res.opinion.length,
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  init_opinion: function (callback) {
    app.apiGet(app.apiList.getOpinion, {
      openid: app.globalData.openid
    }, function (res) {
      callback(res);
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  opTextFocus:function(e){
    this.setData({
      conTextPla:""
    });
  },
  opTextBlur: function (e) {

    this.setData({
      conTextPla: "请填写100个字以内的问题描述",
    });
  },
  setCon:function(e){
    var eValueLen = e.detail.value.length
    this.setData({
      myOpinion: e.detail.value,
      opinionLen: eValueLen
    });
  },
  // 提交
  submit: function (e) {
    if (this.data.myOpinion){
      app.apiPost(app.apiList.saveOpinion, {
          // channel:1,
        openid: app.globalData.openid,
        opinion: this.data.myOpinion
        // content: JSON.stringify(content)
        }, function (data) {
          if(data.code == 1){
              wx.showToast({  
                title: '提交成功!',
                icon: 'success',
                duration: 2000,
                success:function(){
                  setTimeout(function(){
                     wx.switchTab({
                       url: '/pages/my/my',
                    });
                  },500);
                }
            })
          }else{
            wx.showToast({
              title: '提交失败!',
              icon:"none",
              duration: 2000,
              fail: function () {
                setTimeout(function () {
                  wx.switchTab({
                    url: '/pages/opinion/opinion',
                  });
                }, 500);
              }
            })
          }
        })
    }else{
      app.alert("请填写完整意见信息");
    }
  },
})