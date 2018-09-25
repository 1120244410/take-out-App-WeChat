// pages/pay-done/pay-done.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    list: {},
    guess: {},
    oid: wx.getStorageSync("oid"),
    uid: wx.getStorageSync("uid")
  },
  getNewOrder() {
    // console.log(wx.getStorageSync("oid"))
    // console.log(wx.getStorageSync("uid"))
    let info = {
      oid: this.data.oid,
      uid: this.data.uid
    };
    wx.request({
      url: 'http://localhost:3000/user/orderInfo/getNewOrder',
      method: "post",
      data: info,
      success: (res) => {
        console.log(res.data[0].totals)
        this.setData({
          list: res.data[0],
          total: res.data[0].totals
        })
      }
    })
  },
  getProductOne() {
    let id = 2;
    wx.request({
      url: 'http://localhost:3000/company/infoOperation/getProductOne?id=' + id,
      success: (res) => {
        console.log(res.data)
        this.setData({
          guess: res.data[0]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getNewOrder();
    this.getProductOne();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})