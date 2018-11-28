var WxSearch = require('../../wxSearch/wxSearch.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // city: app.globalData.selectedCity
  },

// touchend: function() {
//   wx.navigateTo({
//     url: '../switchcity/switchcity?city=' + this.data.city,
//   })
// },
/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
  var that = this; //初始化的时候渲染wxSearchdata 
  WxSearch.init(that, 233, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);       WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
},

wxSearchFn: function (e) {
  var that = this;
  WxSearch.wxSearchAddHisKey(that);
}, 
wxSearchInput: function (e) {
  var that = this;
  WxSearch.wxSearchInput(e, that);
},
wxSerchFocus: function (e) {
  var that = this;
  WxSearch.wxSearchFocus(e, that);
}, 
wxSearchBlur: function (e) {
  var that = this;
  WxSearch.wxSearchBlur(e, that);
}, 
wxSearchKeyTap: function (e) {
  var that = this;
  WxSearch.wxSearchKeyTap(e, that);
}, 
wxSearchDeleteKey: function (e) {
  var that = this;
  WxSearch.wxSearchDeleteKey(e, that);
},
wxSearchDeleteAll: function (e) {
  var that = this;
  WxSearch.wxSearchDeleteAll(that);
}, 
wxSearchTap: function (e) {
  var that = this;
  WxSearch.wxSearchHiddenPancel(that);
} ,
onShow: function () {
  this.setData({
    city: app.globalData.selectedCity
  })
}
})