// pages/login/login.js
const axios = require("../../utils/axios");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"15101125517",
    password:""
  },
  handlerChange(e){
    this.setData({
      [e.currentTarget.id]:e.detail.value
    })
      // console.log(e.detail.value,e.currentTarget.id);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
  },
  navigateBackTo(){
    wx.navigateBack()
  },
  async goLogin(){
      // 实现登陆
      const res = await axios.get("/login/cellphone",{
        params:{
          phone:this.data.phone,
          password:this.data.password,
          isLogin:true
        }
      })
      if(res.code === 200){
          // 将手机号保存，并跳转至个人中心
          wx.setStorageSync('profile', res.profile);
          wx.switchTab({
            url: '/pages/personal/personal',
          })
        
      }else if(res.code === 502){
        wx.showToast({
          title: res.message,
          icon:"none"
        })
      }else if(res.code === 400){
        wx.showToast({
          title: '手机号错误',
          icon:"none"
        })
      }
      console.log(res);
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