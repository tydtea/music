// pages/song/song.js
// 截止到传值。
const axios = require("../../utils/axios");
const moment = require("moment");
const pubsub = require("pubsub-js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    song:[],
    info:{},
    isPlay:false,// 是否处于播放状态。
    currentTime:"00:00",
    durationTime:"00:00",
    currentWidth:0,// "播放的红色区域的宽度"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function ({id}) {
    console.log("song",id)
    // 获得音乐详情
    const res = await axios.get("/song/detail",{
      params:{
        ids:id
      }
    });
    // 获取的数据
    const info = {
      name:res.songs[0].name,
      author:res.songs[0].ar[0].name,
      picUrl:res.songs[0].al.picUrl,
      dt:res.songs[0].dt// 总时长

    }
    // 更新数据状态
    this.setData({
      songs:res.songs,
      durationTime:moment(info.dt).format("mm:ss"),
      info
    })
    // 更新页面标题
    wx.setNavigationBarTitle({
      title: info.name
    })

    // 获得音频地址（音频数据源）
    const {data} = await axios.get("/song/url",{
      params:{
        id
      }
    })
    const songInfo = data[0];
    // 获得音频管理器
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    // 侦听音频播放
    this.backgroundAudioManager.onPlay(()=>{
      this.setData({
        isPlay:true
      })
      console.log("开始播放啦")
    })
    // 侦听音频暂停
    this.backgroundAudioManager.onPause(()=>{
      this.setData({
        isPlay:false
      })
      console.log("音乐暂停啦")
    })
    // 监听背景音频播放进度更新事件，只有小程序在前台时会回调
    this.backgroundAudioManager.onTimeUpdate(()=>{
      // console.log("正在播放",this.backgroundAudioManager.duration,this.backgroundAudioManager.currentTime);
      // 总时长
      const duration = this.backgroundAudioManager.duration;
      // 播放时间
      const currentTime = this.backgroundAudioManager.currentTime;
      //  红色区域 = 播放时间/总时间*灰色区域
      const currentWidth = currentTime/duration*450;
      this.setData({
        currentWidth,
        currentTime:moment(this.backgroundAudioManager.currentTime*1000).format("mm:ss")
      })
    })

    // 指定音频地址
    this.backgroundAudioManager.src = songInfo.url;
    // 指定音频标题
    this.backgroundAudioManager.title=info.name;
    // 播放音频
    this.backgroundAudioManager.play();
    // 
    this.setData({
      isPlay:true// 获得完数据之后，将音频处于播放状态。
    })

    // 通过按钮控制音乐的播放。
    // 红色区域/灰色区域 = 播放时间/总时间
    // 红色区域 = 播放时间/总时间*灰色区域

    // 生明一个订阅者，接收ID
    pubsub.subscribe("sendSongId",(msgName,songId)=>{
      console.log("得到了：",songId);
    })

  },
  // 切歌
  changeSong(e){
    // 创建一个发布者。
    pubsub.publish("change",e.currentTarget.dataset.type);
    // pubsub.publish("change",{d:1,b:2,c:3});
  },
  // 点击播放按钮
  changeIsPlay(){
    // 将isPlay进行取反操作
    this.setData({
      isPlay:!this.data.isPlay
    })
    // 更改音频管理器的状态。
    if(this.data.isPlay){
      // 播放
      this.backgroundAudioManager.play();
    }else{
      // 暂停
      this.backgroundAudioManager.pause();
    }
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