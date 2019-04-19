//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var that = this;
    // 登录获取openid
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code //返回code
        console.log("code:" + code);
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxaca007d3a798a1fa&secret=d87194c2e3ed65b8d82b9321850048f0&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var openid = res.data.openid //返回openid
            console.log("openid:" + openid);
            that.globalData.openId = openid;
          }
        })
      }
    })
  },
  // getUserInfo: function (cb) {
  //   var that = this
  //   if (this.globalData.personInfo) {
  //     typeof cb == "function" && cb(this.globalData.personInfo)
  //   } else {
  //     //调用登录接口
  //     wx.login({
  //       success: function () {
  //         wx.getUserInfo({
  //           success: function (res) {
  //             that.globalData.personInfo = res.userInfo
  //             typeof cb == "function" && cb(that.globalData.personInfo)
  //           }
  //         })
  //       }
  //     })
  //   }
  // },
  globalData: {
    openId:null,
  }
})