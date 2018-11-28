//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('/utils/util.js')

App({
  globalData:{
    selectedCity:"马鞍山市",
    //设备信息
    systemInfo: null,
    //微信用户唯一id
    openid: wx.getStorageSync('openid') || null,
    //微信用户信息
    userInfo: wx.getStorageSync('userInfo') || null,
    //判断用户是否已有简历
    isHaveResume: wx.getStorageSync('isHaveResume') || null,
    //用于职位详情绑定数据
    positionDetail: null,
    //  用户登录状态
    token: false
  },
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl),
    console.log('小程序开始运行');
    this.init();
  },
  onShow: function () {
    console.log('在此小程序中');
  },
  onHide: function () {
    console.log('不在此小程序中');
  },
  onError: function (msg) {
    console.log('有错误:' + msg);
  },

  init: function () {

  },
  apiList: {
    //接口
    getOpenid: '/wxapp_savesession',//获取微信openid
    getResume: '/actionGetResume',//获取简历
    saveResume: '/actionSaveResume',// 保存简历
    saveOpinion: '/actionSaveOpinion',  //意见反馈接口
    getOpinion: '/actionGetOpinion',   //获取意见反馈
    deleteResume: '/actionDeleteResume',//删除简历
    isApply:'/actionIsApply',//判断是否已经投递
    saveApply:'/actionSaveApply',//保存申请
    getApplyMessagesList: '/actionGetApplyMessagesList',//获取已申请信息
    getAcceptMessagesList: '/actionGetAcceptMessagesList',  //获取已录取信息
    deleteMessages: '/actionDeleteMessages',//删除录取或申请信息
    saveJob: '/actionSaveJob',// 保存发布
    getPositionDetail:'/actionGetPositionDetail',  //获取职位信息
    getCreateMessagesList: '/actionGetCreateMessagesList',//获取待审核发布信息
    getPassMessagesList: '/actionGetPassMessagesList',//获取已审核发布信息
    deleteReleaseMessages: '/actionDeleteReleaseMessages',//删除待审核或已审核发布信息
    getApplyList:'/actionGetApplyList',//获取申请人列表
    isHaveResume: '/actionIsHaveResume',//判断是否有简历
    haveAccept:'/actionHaveAccept',//查看是否已录取
    isAccept:'/actionIsAccept',//同意录取
    getTypelist: '/actionGetTypelist',//获取兼职类型list 
    getSearchList: '/actionGetSearchList',//搜索接口

  },
  apiGet: function (url, data, callback) {

    wx.request({
      url: config.service.host + url,
      data: data,
      method: 'GET',
      dataType: 'json',
      header: { 'content-type': 'application/json;charset=UTF-8' },
      success: function (res) {
        callback(res.data)
      },
      fail: function (res) {
        console.log(url + '请求失败')
      },
      complete: function (res) {
        console.log(url + '请求完成')
        console.log(res);
      }
    })
  },
  apiPost: function (url, data, callback) {

    wx.request({
      url: config.service.host + url,
      data: data,
      method: 'POST',
      dataType: 'json',
      header: { "content-type": "application/x-www-form-urlencoded" },
      success: function (res) {
        callback(res.data)
      },
      fail: function (res) {
        console.log(url + '请求失败')
      },
      complete: function (res) {
        console.log(url + '请求完成')
        console.log(res);
      }
    })
  },
  alert: function (msg) {
    wx.showModal({
      content: msg,
      showCancel: false,
    });
  },
  loading: function () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
  },
  hideloading: function () {
    wx.hideLoading();
  },
  util
})