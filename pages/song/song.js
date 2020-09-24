// pages/song/song.js
const axios = require("../../utils/axios");
const moment = require("moment");
const pubsub = require("pubsub-js");
// 获得全局唯一app实例
// const app = getApp();
const globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChange:false,// 设置一个中间值。true,点击中或拖拽中
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
    const channel = this.getOpenerEventChannel();
    channel.on("two",(a,b,c,d)=>{
      console.log("song.js->two",a,b,c,d);
    })



    console.log("song",getCurrentPages());
     globalData.backgroundAudioManager.onEnded(()=>{
       console.log("播放完毕");
       pubsub.publish("change","next");

     })
    // 更新完播放时间之后，更改 isChange 为false
     globalData.backgroundAudioManager.onSeeked(()=>{
       this.data.isChange = false;
       console.log("onSeeked");
     })
     
     // 侦听音频播放
     globalData.backgroundAudioManager.onPlay(()=>{
       console.log("播放")
      //  globalData.backgroundAudioManager.paused ?
      globalData.isPlay = true;
       this.setData({
         isPlay:true
       })
     })
     // 侦听音频暂停
     globalData.backgroundAudioManager.onPause(()=>{
       console.log("暂停")
       globalData.isPlay = false;
       this.setData({
         isPlay:false
       })
     })
     // 监听背景音频播放进度更新事件，只有小程序在前台时会回调
    //  globalData.backgroundAudioManager.onTimeUpdate(()=>{
    //     this.upCurrentTime();
    //  })

    globalData.backgroundAudioManager.onTimeUpdate(this.upCurrentTime);

    //  globalData.backgroundAudioManager.onTimeUpdate(()=>{
    //   // console.log("正在播放",this.backgroundAudioManager.duration,this.backgroundAudioManager.currentTime);
    //   // 总时长
    //   const duration = globalData.backgroundAudioManager.duration;
    //   // 播放时间
    //   const currentTime = globalData.backgroundAudioManager.currentTime;
    //   //  红色区域 = 播放时间/总时间*灰色区域
    //   const currentWidth = currentTime/duration*450;
    //   this.setData({
    //     currentWidth,
    //     currentTime:moment(globalData.backgroundAudioManager.currentTime*1000).format("mm:ss")
    //   })
    // })
    // 获得歌曲详情（包含地址信息）
    this.init(id);
    // 通过按钮控制音乐的播放。
    // 红色区域/灰色区域 = 播放时间/总时间
    // 红色区域 = 播放时间/总时间*灰色区域

    // 生明一个订阅者，接收ID
    pubsub.subscribe("sendSongId",(msgName,songId)=>{
      console.log("得到了：",songId);
      this.init(songId);
    })

  },
  upCurrentTime(){
    if(this.data.isChange){
        return ;
    }
    // 总时长
    const duration = globalData.backgroundAudioManager.duration;
    // 播放时间
    const currentTime = globalData.backgroundAudioManager.currentTime;
    //  红色区域 = 播放时间/总时间*灰色区域
    const currentWidth = currentTime/duration*450;
    this.setData({
      currentWidth,
      currentTime:moment(globalData.backgroundAudioManager.currentTime*1000).format("mm:ss")
    })

  },
  // 初始化
  async init(id){

    console.log(globalData.songId);
    // 判断是否重复进入该歌曲
    if(id === globalData.songId){
      this.setData({
        info:globalData.info
      })
      // 更新页面标题
      wx.setNavigationBarTitle({
        title: globalData.info.name
      })
      
      this.upCurrentTime();
     



      console.log(1111,globalData.backgroundAudioManager.paused)
      this.setData({
        isPlay: !globalData.backgroundAudioManager.paused//globalData.isPlay //true// 获得完数据之后，将音频处于播放状态。
      })
      return;
    }
    globalData.songId = id;
    // 获得音乐详情
    const res = await axios.get("/song/detail",{
      params:{
        ids:id
      }
    });
    // 获取的数据
    globalData.info = {
      name:res.songs[0].name,
      author:res.songs[0].ar[0].name,
      picUrl:res.songs[0].al.picUrl,
      dt:res.songs[0].dt,// 总时长
      durationTime:moment(res.songs[0].dt).format("mm:ss"),
    }
    // 更新数据状态
    this.setData({
      songs:res.songs,// 可以删除不用的
      info:globalData.info
    })
    // 更新页面标题
    wx.setNavigationBarTitle({
      title: globalData.info.name
    })

    // 获得音频地址（音频数据源）
    const {data} = await axios.get("/song/url",{
      params:{
        id
      }
    })
    // 包含歌曲的地址信息。
    const songInfo = data[0];
    // 指定音频地址
    globalData.backgroundAudioManager.src = songInfo.url;
    // 指定音频标题
    globalData.backgroundAudioManager.title=globalData.info.name;
    // 播放音频
    globalData.backgroundAudioManager.play();
    // 
    this.setData({
      isPlay:true// 获得完数据之后，将音频处于播放状态。
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
    // 获得通讯渠道。
    const channel = this.getOpenerEventChannel();
    // 触发函数。
    channel.emit("one",1,2,3,4);
    // // 将isPlay进行取反操作
    // this.setData({
    //   isPlay:!this.data.isPlay
    // })
    // // 更改音频管理器的状态。
    // if(this.data.isPlay){
    //   // 播放
    //   globalData.backgroundAudioManager.play();
    // }else{
    //   // 暂停
    //   globalData.backgroundAudioManager.pause();
    // }
  },
  change(event){
      this.data.isChange = true;
    // 红色区域/灰色区域 = 播放时间/总时间
      const currentTime = event.detail.value/450*(globalData.info.dt/1000);
      globalData.backgroundAudioManager.seek(currentTime);
      // this.data.isChange = false;
      console.log("结束 ",event.detail)
  },
  changing(){
    this.data.isChange = true;
    // console.log("正在拖拽");
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
    pubsub.unsubscribe("sendSongId");
     console.log("页面卸载啦");
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