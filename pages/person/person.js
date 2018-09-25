Page({
  data: {
    userinfo:{},
    uid:1,
  },
  isLogin(){
    if (wx.getStorageSync("uid") == ""){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      wx.navigateTo({
        url: '/pages/option/option',
      })
    }
  },
  pushdata(){
    let val = wx.getStorageSync('uid');
    // console.log(val);
    if (wx.getStorageSync('uid')=="") {
      this.setData({
        uid: 1
      })
      this.getUserInfo();
      // console.log("空字符串");
      return;
    }else{
      this.setData({
        uid:val
      })
      this.getUserInfo();
      // console.log("有值");
    }
    
  },
  getUserInfo(){
    wx.request({
      url: 'http://localhost:3000/user/account/getUserInfo',
      method: "post",
      data: {
        uid: this.data.uid,
      },
      success: (res) => {
        wx.hideLoading();
        this.setData({
          userinfo: res.data[0]
        });
      }
    })
  },
  onShow: function () {
    // this.onLoad();
    wx.showLoading({
      title: '请稍等',
    });
    this.pushdata();
  },
  onLoad:function(){
    // this.getUserInfo();
  }
})
