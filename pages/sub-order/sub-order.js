// pages/sub-order/sub-order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[],
    uid:wx.getStorageSync("uid"),
    listContent:[],
    total:0
  },
  getDefaultAddress() {
    let uid = { uid: this.data.uid };
    wx.request({
      url: 'http://localhost:3000/user/orderInfo/getDefaultAddress',
      method:"post",
      data:uid,
      success:(res)=>{
        // console.log(res.data)
        this.setData({
          address:res.data
        })
      }
    })
  },
  getCarList() {
    wx.request({
      url: 'http://localhost:3000/user/orderInfo/getCarList?uid=' + this.data.uid,
      success:(res)=>{
        this.setData({
          listContent:res.data,
          total: res.data[0].total
        })
      }
    })
  },
  creatOrder() {
    wx.request({
      url: 'http://localhost:3000/user/orderInfo/createOrder',
      method: "post",
      data: {
        uid: this.data.uid,
        list: this.data.listContent,
        totals: this.data.total,
      },
      success:(res)=>{
        wx.setStorageSync("oid", res.data);
        // console.log(wx.getStorageSync("oid"))
        if (res.data) {
          this.clearChecked();
          wx.redirectTo({
            url: '/pages/pay-done/pay-done',
          })
        } else {
          wx.showToast({
            title: '订单创建失败',
            icon: "none"
          });
          setTimeout(function(){wx.hideToast()},1500)
        }
      }
    })
  },
  clearChecked() {
    wx.request({
      url: 'http://localhost:3000/user/shopCar/clearChecked?uid=' + this.data.uid,
      // success:(res)=>{
      //   console.log(res.data);
      // }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDefaultAddress();
    this.getCarList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})