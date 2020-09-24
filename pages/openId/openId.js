// pages/openId/openId.js
const axios = require("../../utils/axios");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getOpenId(){
    // const appid = "wx57156b3f9c5cf9c4";
    // const secret = "3cd3cb3f6f693b5e8010f57a59f2c48f";
    // 临时的凭证
    wx.login({
      success(res){
        if(res.code){
            // 调用 自身的服务器
          axios.get("http://127.0.0.1/getOpenId",{
            // appid,
            // secret,
            params:{
              code:res.code
            }
            
          }).then(res=>{
            console.log(res);
          })
        }
      }
    })
  },
  getDailyRetain(){
    wx.login({
      async success(res){
        if(res.code){
          const info = await axios.get("http://127.0.0.1/getDailyRetain",{
            params:{
              code:res.code
            }
          })
          console.log(info);
        }
      }
    })
     
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