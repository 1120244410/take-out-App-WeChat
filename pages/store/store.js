// pages/store/store.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ptype:[],
    stype:"",
    plist:[]
  },
  getCategory:function(e) {
    wx.request({
      url: 'http://localhost:3000/admin/category/getcategory',
      method: "post",
      dataType: "json",
      success: (res) => {
        // console.log(res.data[0].type)
        this.setData({
          ptype: res.data,
        })
        // console.log(this.data.ptype)
      }
    })
  },
  getPointStore:function(e) {
    wx.request({
      url: 'http://localhost:3000/company/infoOperation/getPointStore',
      method: "post",
      dataType: "json",
      data:{
        stype:this.data.stype
      },
      success: (res) => {
        // console.log(res.data[0].type)
        this.setData({
          plist: res.data,
        })
        // console.log(this.data.ptype)
        wx.setNavigationBarTitle({
          title: this.data.stype
        })
      }
    })
  },
  changePoint:function(event){
    this.setData({
      stype: event.currentTarget.dataset.stype
    })
    this.getPointStore();
  },
  hotSort:function(e) {
    wx.request({
      url: 'http://localhost:3000/company/infoOperation/hotSort',
      method: "post",
      dataType: "json",
      data: {
        stype:this.data.stype
      },
      success: (res) => {
        // console.log(res.data[0].type)
        this.setData({
          plist: res.data,
        })
        // console.log(this.data.ptype)
      }
    })
  },
  priceSort: function (e) {
    wx.request({
      url: 'http://localhost:3000/company/infoOperation/priceSort',
      method: "post",
      dataType: "json",
      data: {
        stype: this.data.stype
      },
      success: (res) => {
        // console.log(res.data[0].type)
        this.setData({
          plist: res.data,
        })
        // console.log(this.data.ptype)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      stype:options.sid
    });
    // console.log(stype);
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
    this.getCategory();
    this.getPointStore();
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