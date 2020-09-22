// pages/personal/personal.js
const axios = require("../../utils/axios")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    profile:wx.getStorageSync('profile')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setData({
      profile:wx.getStorageSync("profile")
    })

    const res = await axios.get("/user/record",{
      params:{
        uid:wx.getStorageSync('profile').userId,
        type:0
      }
    })


    console.log(res)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 去登陆界面
  goLogin(){
    if(!wx.getStorageSync("profile")){
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // if(wx.getStorageSync("phoneId")){
    //   console.log("已登陆")
    // }else{
    //   wx.redirectTo({
    //     url: '/pages/login/login',
    //   })
    // }
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