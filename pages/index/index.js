//index.js
//获取应用实例
/* 跳转示例
    wx.navigateTo({
      url: '../logs/logs'
    })
*/
const app = getApp();
const netRequest = require('../../utils/request.js');
Page({
  data: {
    userInfo: {},
    searchKeyword: "",
    currentPage: 1,
    sourceLeftList: [],  //放置返回数据的数组,设为空  
    sourceRightList: [],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //搜索输入监听
  bindKeywordInput: function (e) {

  },
  keywordSearch: function (e) {
    //点击搜索时重置数据
    this.setData({
      currentPage: 1,
      sourceLeftList: [],
      sourceRightList: []
    });
    this.fetchSearchList();
  },
  //列表数据获取
  fetchSearchList:function() {
    var that = this;
    netRequest.getGoodsList(this.data.searchKeyword, this.data.currentPage, function(data){
      console.log(data);
      if (data != null && data.length> 0) {
        let leftList = [];
        let rightList = [];
        for (var i = 0; i < data.length; i += 2) {
          leftList.push(data[i]);
          if (i + 1 < data.length) {
            rightList.push(data[i + 1]);
          }
        }
        that.setData({
          sourceLeftList: leftList, //获取数据数组  
          sourceRightList: rightList, //获取数据数组  
        });
      }
    });
  },
  //滚动到底部触发事件  
  searchScrollLower: function () {
    this.setData({
      currentPage: that.data.currentPage + 1,  //每次触发上拉事件，把searchPageNum+1    
    });
    this.fetchSearchList();
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    if (!this.hasUserInfo && this.canIUse) {
      getUserInfo();
    }

    //打开页面默认加载数据
    this.fetchSearchList();
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
