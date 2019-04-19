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
    this.setData({
      searchKeyword: e.detail.value
    })
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
          sourceLeftList: that.data.sourceLeftList.concat(leftList), //获取数据数组  
          sourceRightList: that.data.sourceRightList.concat(rightList), //获取数据数组  
        });
      }
    });
  },
  //滚动到底部触发事件  
  searchScrollLower: function () {
    var that = this;
    this.setData({
      currentPage: that.data.currentPage + 1,  //每次触发上拉事件，把searchPageNum+1    
    });
    this.fetchSearchList();
  },
  onLoad: function () {
    //打开页面默认加载数据
    this.fetchSearchList();
  }
})
