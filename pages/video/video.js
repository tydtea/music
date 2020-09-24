// pages/video/video.js
const axios = require("../../utils/axios");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      vid:"",// 当前播放的视频ID
      groupList:[],
      activeTagId:"",
      videoList:[],// 视频列表
      triggered:false,
      offset:0
  },

  /**
   * 生命周期函数--监听页面加载  vuex  xp  xml j2ee .net c# gulp  webpack
   * node vue-cli:服务代理   路由 uniapp  node->提供服务。 原生 koa express.
   * express 
   */
  onLoad: async function (options) {
    // 调用视频标签列表
    const res = await axios.get("/video/group/list");
    this.setData({
      activeTagId:res.data[0].id,
      groupList:res.data.splice(0,30),
      
    })

   this.getVideoGroup();

    // token:令牌。 后端提供接口。 token authorization  that _this
    // cookie
    // console.log(videoList);
  },
  changeVid(e){
    // 更改VID
    this.setData({
      vid:e.currentTarget.dataset.vid
    })

    if(this.videoContext) this.videoContext.pause();
    // 传递的参数 video 组件ID
    this.videoContext = wx.createVideoContext(e.currentTarget.dataset.vid);
    this.videoContext.play();



  },
  // 滚动到底部
  async handleScrollLower(){

// 获得标签下的视频
    wx.showLoading({
      title: '加载中……',
    })
    const {datas} =  await axios.get("/video/group",{
      params:{
        id:this.data.activeTagId,
        offset:this.data.offset++
      }
    })
    wx.hideLoading();
    this.setData({
      videoList:[
        ...this.data.videoList,
        ...datas
      ]
    })

      // console.log("123")

  },
  // 下拉
  async handleRefresher(){
     
    // 获得标签下的视频
    wx.showLoading({
      title: '加载中……',
    })
    const {datas} =  await axios.get("/video/group",{
      params:{
        id:this.data.activeTagId
      }
    })
    wx.hideLoading();
    this.setData({
      videoList:datas
    })

    this.setData({
      triggered:false
    })
    console.log("456")
  },
  async getVideoGroup(){
    // 获得标签下的视频
    wx.showLoading({
      title: '加载中……',
    })
    this.setData({
      videoList:[]
    })
    const {datas} =  await axios.get("/video/group",{
      params:{
        id:this.data.activeTagId
      }
    })
    wx.hideLoading();
    this.setData({
      videoList:datas
    })
  },
  changeTagId(e){
    this.setData({
      activeTagId:e.currentTarget.dataset.id
    })
    this.getVideoGroup();
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
  onShareAppMessage: function (e) {
      console.log(1111,e);
      if(e.from === "button"){
        return {
          title:e.target.dataset.title,
          path:"/pages/video/video",
          imageUrl:e.target.dataset.img
        }
      }else{
        return {
          title:"我现在在上海",
          path:"/pages/video/video",
          imageUrl:"/static/images/nvsheng.jpg"
        }
      }
     
  }
})