//firstPage.js
//获取应用实例
var WxSearch = require('../../wxSearch/wxSearch.js');

var app = getApp(); 
Page({ 
    data: {
        searchValue:'',//搜索条件 
        searchBtnText:'搜索',
        viewHeight: 600,
        loadingText: '加载中...',// 
        loadingHidden: true,//默认隐藏更多
        // list: [],
        wxSearchData:"",
        city: "马鞍山市",
        jobData:[],   
        jobLen:0   
    },
    touchend: function () {
      wx.navigateTo({
        url: '../switchcity/switchcity?city=' + app.globalData.selectedCity,
      })
    },

    onLoad: function () {
      var that = this;
      that.setData({
        city: app.globalData.selectedCity
      })         
      //初始化的时候渲染wxSearchdata 第二个为你的search高度
      WxSearch.init(that, 48, ['快递员', '促销员', '传单员', '派送员', '家教', '收银员', '业余模特', '话务员', '送餐员']);

      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
        }
      });
      that.searchRetFun(that.data.city, that.data.wxSearchData.value);
      console.log(app.globalData.openid)
      wx.showShareMenu({
        withShareTicket: true
      })
    },
    onShow:function(){
      wx.showShareMenu({
        withShareTicket: true
      })
    },

    //转发，
    onShareAppMessage: function (options) {
      return {
        title: '校园兼职圈',
        desc: '在校大学生最方便的求职招聘平台!',
        // path: '/page/user?id=123'
        path:'/pages/firstPage/firstPage',
        success(e) {
          // shareAppMessage: ok,
          // shareTickets 数组，每一项是一个 shareTicket ，对应一个转发对象
          // 需要在页面onLoad()事件中实现接口
          wx.showShareMenu({
            // 要求小程序返回分享目标信息
            withShareTicket: true
          });
        },
        fail(e) {
          // shareAppMessage:fail cancel
          // shareAppMessage:fail(detail message) 
        },
        complete() { }
      }
    },

    //跳转到兼职详情页
    toggleBtn: function (event) {
      console.log(event.currentTarget.dataset.id)
      var job_id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/positionDetail/positionDetail?job_id=' + job_id
      })
    },
    
    //搜索结果
    searchRetFun: function (city, wxSearchData){
        var that = this;
        app.apiPost(app.apiList.getSearchList,{
            city:city,
            wxSearchData: wxSearchData ? wxSearchData:''
        },function(data){
          console.log(data)
          if(data.code == -1){
            that.setData({
              jobLen:0
            })
            console.log("jobLen:"+that.data.jobLen)
          }else{
            that.setData({ 
              jobData: data.data,
              jobLen:1
             })
            console.log("jobLen:" + that.data.jobLen)
          }
        })
    },

    //点击搜索按钮
    wxSearchFn: function (e) {
        var that = this;
        WxSearch.wxSearchAddHisKey(that);
        if (!this.data.searchValue){
            wx.showToast({
              title:"请输入关键字"
            });
        }else{
          if (that.data.searchBtnText == '搜索') {
            // app.loading();
            //初始化
            this.setData({
              loadingHidden: true,
              loadingText: '加载中...',
              jobData: [],
              searchBtnText: '返回'
            })
            //判断是否有wxSearchData.value
            if (that.data.wxSearchData.value) {
              that.searchRetFun(that.data.city, that.data.wxSearchData.value);
              that.setData({
                searchValue: that.data.wxSearchData.value
              })
            } else {
              that.searchRetFun(that.data.city, that.data.searchValue);
            }
          } else {
            // app.loading();
            that.setData({
              loadingHidden: true,
              loadingText: '加载中...',
              jobData: [],
              // searchPage: 1,
              searchBtnText: '搜索',
              searchValue: ''
            })
            that.data.wxSearchData.value = '';
            that.data.searchValue = '';
            that.searchRetFun(that.data.city, that.data.searchValue);

          }
        }
    },

    //搜索条件改变
    wxSearchInput: function (e) {
     
        var that = this
        WxSearch.wxSearchInput(e, that);
        if (e.detail.value == '' || e.detail.value == undefined) {
            that.setData({
                searchValue: ''
            })
        } else {
            that.setData({
                searchValue: e.detail.value
            })
        }  
        that.searchRetFun(that.data.city, that.data.wxSearchData.value);
    },
    searchConfirm: function(){
        this.wxSearchFn();
    },
    
    //获取搜索输入框焦点
    wxSearchFocus: function (e) {
        var that = this;
        console.log("wxSearchData："+that.data.wxSearchData);
        // this.data.wxSearchData.view.isShow = true;
        WxSearch.wxSearchFocus(e, that);
        that.setData({
          wxSearchData: that.data.wxSearchData
        });
        console.log(that.data);
    },

   //离开搜索输入框焦点
    wxSearchBlur: function (e) {
        var that = this
        console.log('wxSearchBlur')
        WxSearch.wxSearchBlur(e, that);
    },
    
    wxSearchKeyTap: function (e) {
        var that = this;
        WxSearch.wxSearchKeyTap(e, that);
        //  点击热门搜索标签的函数
        ///////////////////////////////////////////////////////////
        // app.loading();
        //初始化
        this.setData({
          loadingHidden: true,
          loadingText: '加载中...',
          jobData: [],
          // searchPage: 1,
          searchBtnText: '返回'
        })
        //判断是否有wxSearchData.value
        if (that.data.wxSearchData.value) {
          that.searchRetFun(that.data.city, that.data.wxSearchData.value);
          that.setData({
            searchValue: that.data.wxSearchData.value
          })
        } else {
          that.searchRetFun(that.data.city, that.data.searchValue);
        }
        // this.wxSearchFn();
    },
   
    wxSearchDeleteKey: function (e) {
        var that = this
        WxSearch.wxSearchDeleteKey(e, that);
    },
    wxSearchDeleteAll: function (e) {
        var that = this;
        WxSearch.wxSearchDeleteAll(that);
    },
    wxSearchTap: function (e) {
        var that = this
        WxSearch.wxSearchHiddenPancel(that);
    }
})