// pages/messages/messages.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, // tab切换 
    height: 1000,
    jobApply:[],
    jobApplyLen:0,
    jobAccept:[],
    jobAcceptLen: 0,
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    // app.loading();
    that.getApplyMessages();
    that.getAcceptMessages();
  },

  //下拉刷新
  onPullDownRefresh: function () {
    console.log('--------下拉刷新-------')
    this.getApplyMessages()
    this.getAcceptMessages()  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

      //app.loading();
      //this.getMesgFun();
    this.setData({
      height: that.currentTab = 0 ? that.data.jobApplyLen : that.data.jobAcceptLen
    })
    this.getApplyMessages();
    this.getAcceptMessages();
  },

  //滑动切换tab
  bindChangeTab: function (e) {
    this.setData({ currentTab: e.detail.current });
  },

  //点击tab切换
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  //获取已申请信息
  getApplyMessages:function(){
    var that = this;
    app.apiPost(app.apiList.getApplyMessagesList, {
      openid: app.globalData.openid
    }, function (data) {
      if(data){
        that.setData({
          jobApply: data.data,
          jobApplyLen: data.data.length
        });
        console.log("jobApply:" + that.data.jobApply)
        console.log("jobApplyLen:" + that.data.jobApplyLen)
      }else{
        that.setData({
          jobApply: [],
          jobApplyLen: 0
        });
      }
    })
  },

  //获取已录取信息
  getAcceptMessages:function(){
    var that = this;
    app.apiPost(app.apiList.getAcceptMessagesList, {
      openid: app.globalData.openid
    }, function (data) {
      if(data){
        that.setData({
          jobAccept: data.data,
          jobAcceptLen: data.data.length
        });
        console.log("jobAccept:" +that.data.jobAccept)
        console.log("jobAcceptLen:" + that.data.jobAcceptLen)
      }else{
        that.setData({
          jobAccept: [],
          jobAcceptLen: 0
        });
      }      
    })
  },
  
  //删除录取或申请
  toggleBtn:function(event){
    var that = this
    console.log(event.currentTarget.dataset.id)
    app.apiPost(app.apiList.deleteMessages,{
      job_id: event.currentTarget.dataset.id,
      openid: app.globalData.openid
    }, function (res) {
      if(res.code == 1){
        wx.showToast({
          title: '删除成功！',
          duration:2000
        })
        that.getApplyMessages()
        that.getAcceptMessages()
      }
    })
  }
})
