// pages/products/products.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pinfo: {},
    pid: "",
    count: 0,
    uid: wx.getStorageSync("uid"),
    total: "",
  },
  getProductOne() {
    wx.request({
      url: "http://localhost:3000/company/infoOperation/getProductOne?id=" + this.data.pid,
      dataType: "json",
      success: (res) => {
        // console.log(res.data);
        this.setData({
          pinfo: res.data[0],
        });
        wx.setNavigationBarTitle({
          title: this.data.pinfo.pname
        });
        wx.hideLoading();
      }
    })
  },
  add() {
    this.setData({
      count: this.data.count+1
    })
    let pform = {
      sid: this.data.pinfo.sid,
      pid: this.data.pid,
      total: this.data.pinfo.price,
      uid: this.data.uid,
      thumb: this.data.pinfo.thumb,
      pname: this.data.pinfo.pname,
      price: this.data.pinfo.price,
    }
    // console.log(pform);
    wx.request({
      url: 'http://localhost:3000/user/shopCar/insertInfo',
      method: "post",
      data: pform,
      success: (res) => {
        // console.log(res.data)
        if (res.data.length>0){
          let info = {
            id: res.data[0].id,
            num: res.data[0].num + 1,
            total: res.data[0].price * (res.data[0].num + 1)
          };
          wx.request({
            url: 'http://localhost:3000/user/shopCar/updateOne',
            method: "post",
            data: info,
            success:(res)=>{
              console.log(res.data)
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      pid: options.pid
    })
    wx.showLoading({
      title: '正在加载',
    })
    // console.log(this.data.pid);
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