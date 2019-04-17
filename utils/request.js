const host = "https://apish.centanet.com/v3/zfapi_apush/json/reply/";

function getGoodsList(keyword, pageindex, callback) {
  wx.request({
    url: host +'GetRegionPostsRequest',
    data: {
      ImageHeight:"400",
      ImageWidth:"600",
      IsHasPaNo:"false",
      PageCount:"20",
      PostType:"s",
      Keywords: keyword,
      PageIndex: pageindex,
      _: Date.now()
    },
    method: 'POST',
    header: { 'content-Type': 'application/json' },
    success: function (res) {
      if (res.data.ResultNo == 0) {
        callback(res.data.Result);
      }
    }
  })
}

module.exports = {
  getGoodsList: getGoodsList
}