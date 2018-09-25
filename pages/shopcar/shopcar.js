// pages/shopcar/shopcar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check: 0,
    listContent: [],
    total: 0,
    show: true
  },
  getCarList() {
    wx.request({
      url: 'http://localhost:3000/user/shopCar/getCarList',
      method: "post",
      dataType: 'json',
      success: (res) => {
        // console.log(res.data.code);
        if (res.data.code == 0) {
          this.setData({
            show: true,
            listContent : [],
          })
        } else {
          this.setData({
            show: false,
            listContent: res.data,
          });
          let good = this.data.listContent.filter(ele => ele.checkstate == 1);
          // console.log(good)
          this.setData({
            total: 0
          })
          good.forEach(ele => {
            this.setData({
              total: ele.total + this.data.total
            })
          })
        }
      }
    })
  },
  checkedAll() {
    let check = this.data.check;
    if (check === 0) {
      wx.request({
        url: 'http://localhost:3000/user/shopCar/updateCheckAll?check=' + (check + 1),
        success: (res) => {
          if (res.data) {
            this.getCarList();
            this.setData({
              check: this.data.check + 1,
            });
          }
        }
      })
    } else {
      wx.request({
        url: 'http://localhost:3000/user/shopCar/updateCheckAll?check=' + (check - 1),
        success: (res) => {
          if (res.data) {
            this.getCarList()
          }
          this.setData({
            check: this.data.check - 1,
            total: 0
          })
        }
      })
    }
  },
  count(event) {
    let pid = event.currentTarget.dataset.pid;
    let id = event.currentTarget.dataset.id;
    let good = this.data.listContent.filter(ele => ele.pid === pid);
    // console.log(event.currentTarget.dataset, good)
    if (good[0].checkstate == 1) {
      good[0].checkstate = 0;
      let info = {
        check: good[0].checkstate,
        id: id
      };
      wx.request({
        url: 'http://localhost:3000/user/shopCar/updateCheck',
        method: "post",
        data: info,
        success: (res) => {
          // console.log(good[0].total)
          this.setData({
            listContent: res.data,
            total: this.data.total - good[0].total
          })
        }
      })
    } else {
      good[0].checkstate = 1;
      let info = {
        check: good[0].checkstate,
        id: id
      };
      wx.request({
        url: 'http://localhost:3000/user/shopCar/updateCheck',
        method: "post",
        data: info,
        success: (res) => {
          this.setData({
            listContent: res.data,
            total: this.data.total + good[0].total
          })
        }
      })
    }
  },
  add(e) {
    let info = {
      id: e.currentTarget.dataset.id,
      num: e.currentTarget.dataset.num + 1,
      total: e.currentTarget.dataset.p * (e.currentTarget.dataset.num + 1)
    };
    wx.request({
      url: 'http://localhost:3000/user/shopCar/updateOne',
      method: "post",
      data: info,
      success: (res) => {
        if (res.data) {
          this.getCarList();
        }
      }
    })
  },
  decrease(e) {
    if (e.currentTarget.dataset.num <= 1) {
      return;
    }
    let info = {
      id: e.currentTarget.dataset.id,
      num: e.currentTarget.dataset.num - 1,
      total: e.currentTarget.dataset.p * (e.currentTarget.dataset.num - 1)
    };
    wx.request({
      url: 'http://localhost:3000/user/shopCar/updateOne',
      method: "post",
      data: info,
      success: (res) => {
        if (res.data) {
          this.getCarList();
        }
      }
    })
  },
  del(e) {
    let id = e.currentTarget.dataset.id;
    wx.request({
      url: 'http://localhost:3000/user/shopCar/deleteOne?id=' + id,
      success: (res) => {
        if(res.data){
          this.getCarList();
          this.data.total = 0;
        }
      }
    })
  },
  isZero() {
    if (this.data.total == 0) {
      wx.showToast({
        title: '没有选中商品',
        icon:'none',
      });
      setTimeout(function(){wx.hideToast()},1500)
    } else {
      wx.navigateTo({
        url: '/pages/sub-order/sub-order',
      })
    }
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
    this.getCarList();
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