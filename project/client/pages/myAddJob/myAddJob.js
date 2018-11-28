//myAddJob.js
//获取应用实例
// var WxSearch = require('../../wxSearch/wxSearch.js');

var app = getApp();  
Page({ 
    data: {
      height: 1000,
      currentTab:0,
      jobCreate:[],
      jobCreateLen:0,
      jobPass:[],
      jobPassLen:0
         
    },
    onLoad: function () {
      var that = this;
        // app.loading();
      that.getCreateMessages();
      that.getPassMessages()
    }, 

    //下拉刷新
    onPullDownRefresh: function () {
      console.log('--------下拉刷新-------')
      this.getCreateMessages()
      this.getPassMessages()   
    },

    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function () {
      //app.loading();
      //this.getMesgFun();
      this.getCreateMessages();
      this.getPassMessages();
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
 
   //跳转到处理录取页面
    acceptUsers: function (event) {
      console.log("job_id:" + event.currentTarget.dataset.id)
      wx.navigateTo({
        url: '/pages/jobAccept/jobAccept?job_id='+ event.currentTarget.dataset.id,
      })
    },

    //获取待审核发布信息
  getCreateMessages: function () {
      var that = this;
      app.apiPost(app.apiList.getCreateMessagesList, {
        openid: app.globalData.openid
      }, function (data) {
        if (data) {
          console.log(data.data)
          console.log(data.data.length)
          that.setData({
            jobCreate: data.data,
            jobCreateLen: data.data.length
          });
          console.log("jobCreate:" + that.data.jobCreate)
          console.log("jobCreateLen:" + that.data.jobCreateLen)
        } else {
          that.setData({
            jobCreate: [],
            jobCreateLen: 0
          });
        }
      })
    },

    //获取已审核发布信息
    getPassMessages: function () {
      var that = this;
      app.apiPost(app.apiList.getPassMessagesList, {
        openid: app.globalData.openid
      }, function (data) {
        if (data) {
          console.log(data.data)
          console.log(data.data.length)
          that.setData({
            jobPass: data.data,
            jobPassLen: data.data.length
          });
          console.log("jobPass:" + that.data.jobPass)
          console.log("jobPassLen:" + that.data.jobPassLen)
        } else {
          that.setData({
            jobPass: [],
            jobPassLen: 0
          });
        }
      })
    },

    //删除待审核或已审核发布信息
    toggleBtn: function (event) {
      var that = this
      console.log(event.currentTarget.dataset.id)
      wx.showModal({
        title: '提示',
        content: '确定要删除吗？',
        success: function (sm) {
          if (sm.confirm) {
            app.apiPost(app.apiList.deleteReleaseMessages, {
              job_id: event.currentTarget.dataset.id,
              openid: app.globalData.openid
            }, function (data) {
              if (data.code == 1) {
                wx.showToast({
                  title: '删除成功!',
                  icon: 'success',
                  duration: 2000,
                  success: function () {
                    setTimeout(function () {
                      that.getCreateMessages()
                      that.getPassMessages()
                    }, 500);
                  }
                })
              } else {
                wx.showToast({
                  title: '删除失败!',
                  icon: 'none',
                  duration: 2000,
                  fail: function () {
                    setTimeout(function () {},500);
                  }
                })
              }
            })
          }
        }
      })
    }
})