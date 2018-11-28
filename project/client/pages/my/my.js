// pages/my/my.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShow: false,     //是否拿到用户信息，否则显示默认头像
        //myself: ''
        faceImg:"",      // 头像
        user: false,   // 是否显示注册/登录或者用户名
        username:"",    // 判断是否是登录状态，
        usersetting:true,     //    退出当前账户
    },
 
    onLoad: function () {
      if (wx.getStorageSync("token") == true)
      {
        this.login();
      }

    },
    onShow: function(){
        //获取我的简介
        if (app.globalData.isHaveResume !== null) {
          console.log(app.globalData.isHaveResume)
            // this.setData({
            //     myself: app.globalData.isHaveResume.base_info.myself
            // })
        }
    },
    getUserInfo: function () {
      var that=this;
      if (wx.getStorageSync("token") == false) {
        wx.setStorageSync('token', true);
        wx.reLaunch({
          url: "/pages/my/my",
        })
      }
      wx.getUserInfo({
        success: function (res) {
          wx.hideLoading();
          app.globalData.userInfo = res.userInfo;
          wx.setStorageSync('userInfo', res.userInfo);
          app.globalData.token = true;
          wx.setStorageSync('token', true);
          that.setData({
            userInfo: res.userInfo,
            isShow: true
          });
        }

      })

    },

    //编辑资料
    editInfoTap: function () {
        wx.navigateTo({
            url: '/pages/edit-my/edit-my',
        })
    },

    //简历
    resumeTap: function () {
      if (app.globalData.token){
        if (!app.globalData.isHaveResume){
          wx.navigateTo({
                url: '/pages/edit-resume-base/edit-resume-base',
          });
        }else{
            wx.navigateTo({
                url: '/pages/my-resume/my-resume'
            });
        }
      }
      else{
        wx.showToast({
          title: '请先登录',
          icon:"none"
        })
      }
    },


    //我的申请
    myDeliveryTap: function () {
      // if (wx.getStorageSync("token") == "true" || app.globalData.token == "true") { 
      //     wx.switchTab({
      //       url: '/pages/messages/messages'
      //   });
      // }else{
      //   app.alert("请先登录!");
      // }
      
      //测试/messages界面
      if (app.globalData.openid){
        wx.navigateTo({
          url: '/pages/messages/messages',
        });
      }else{
        wx.showToast({
          title: '请先登录!',
        })
      }
    },
    
    //删除简历
    deleteResumeTap: function(){
      if (!app.globalData.isHaveResume) {
        wx.showModal({
          title: '您还没有简历！',
          content: '请完善简历！',
          success: function(res) {
            if(res.confirm){
              wx.navigateTo({
                url: '/pages/edit-resume-base/edit-resume-base'
              })
            }   
          }
        })
      } else {
        wx.navigateTo({
          url: '/pages/delete-resume/delete-resume'
        });
      }
    },

    deliveryComments:function(){
      if(app.globalData.openid){
        wx.navigateTo({
          url: '../opinion/opinion',
        })
      }else{
        wx.showToast({
          title: '请先登录!',
        })
      }
      
    },

    //我的发布
    addJobs:function(){
      if (app.globalData.openid){
        wx.navigateTo({
          url: '../myAddJob/myAddJob',
        })
      }else{
        wx.showToast({
          title: '请先登录!',
        })
      }
    },

    //微信登录
    login:function(){
      var that=this;
      wx.showLoading({
        title: '登录中...',
      })
      wx.login({
        success: function (res) {
          app.apiPost(app.apiList.getOpenid, {
            code: res.code
          }, function (data) {
            wx.setStorageSync('openid', data.open_id );
            app.globalData.openid = data.open_id;
            app.globalData.isHaveResume = data.have_resume;
            that.getUserInfo();
          });
        },
        fail: function (res) {
          console.log('微信登录请求失败')
        },
      })
    }
})