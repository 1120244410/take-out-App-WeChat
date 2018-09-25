// pages/products/products.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist: [],
    address: [],
    show: true,
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
  getOrderInfo() {
    // console.log(wx.getStorageSync("uid"))
    if (wx.getStorageSync("uid") == "") {
      return;
    } else {
      let uid = wx.getStorageSync("uid");
      wx.request({
        url: 'http://localhost:3000/user/orderInfo/getOrderInfo?uid=' + uid,
        dataType: "json",
        success: (res) => {
          // console.log(res.data)
          this.setData({
            orderlist: res.data,
            show: false
          })
        }
      })
    }
  },
  getDefaultAddress() {
    let uid = {
      uid: wx.getStorageSync("uid")
    };
    wx.request({
      url: 'http://localhost:3000/user/orderInfo/getDefaultAddress',
      method: "post",
      data: uid,
      success: (res) => {
        // console.log(res.data);
        this.setData({
          address: res.data,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getOrderInfo();
    this.getDefaultAddress();
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