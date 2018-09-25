//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://localhost:3000/images/index/header/banner1.png',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1000,
    isloop:true,
    ptype:[],
    plist:[]
  },
  getCategory() {
    wx.request({
      url: 'http://localhost:3000/admin/category/getcategory',
      method: "post",
      dataType: "json",
      success:(res) => {
        // console.log(res.data[0].type)
        this.setData({
          ptype:res.data,
        })
        // console.log(this.data.ptype)
      }
    })
  },
  getHotGoods() {
    wx.request({
      url: 'http://localhost:3000/company/infoOperation/getProductsList',
      success:(res)=>{
        // console.log(res.data)
        this.setData({
          plist: res.data,
        })
        // console.log(this.data.plist)
      }
    })
  },
  onShow:function(){
    this.getCategory();
    this.getHotGoods();
  }
})
