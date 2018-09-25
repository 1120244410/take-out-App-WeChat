// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    msg: "",
  },
  hidebox(){
    setTimeout(()=>{
      this.setData({
        show:false,
      })
    },2000)
  },
  formSubmit(e){
    let form = e.detail.value
    wx.request({
      url: 'http://localhost:3000/user/account/check',
      method:"post",
      data:form,
      success:(res)=>{
        if(res.data == false){
          this.setData({
            show:true,
            msg:"信息有误"
          });
        } else{
          wx.setStorageSync("uid", res.data[0].uid)
          // console.log(res.data[0])
          wx.navigateBack({
            detail:1,
          })
        }
      }
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