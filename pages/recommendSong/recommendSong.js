// pages/recommendSong/recommendSong.js
const axios = require("../../utils/axios");
const pubsub = require("pubsub-js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:0,
    month:0,
    recommendList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
     const times = new Date();
     this.setData({
       date:times.getDate(),
       month:times.getMonth()+1
     })


     // 调取推荐的数据
     const res = await axios.get("/recommend/songs");
     console.log(res);
     this.setData({
       recommendList:res.recommend
     })

     // 创建一个订阅者
     pubsub.subscribe("change",(msgName,type)=>{
       // type 为 next 下一首  type为pre是上一首
       /*
       思路：切歌
        1、点击上一首或下一首。发布消息，通过每日推荐，选择相对应的歌曲
        2、在每日推荐帮其查找对应的歌曲。
        3、查找到歌曲之后通知歌曲详情。将歌曲ID告知详情。
        4、详情得到ID后，可以查找歌曲具体的信息。
       */ 
       // 查找符合条件的下标
       let index = this.data.recommendList.findIndex(v=>v.id === this.songId);
        // 查找上一首ID
        if(type === "pre"){         
          index--;
          if(index<0){
            index=this.data.recommendList.length-1
          }
        }else{// 查找下一首ID
          // 查找符合条件的下标
          index++;
          if(index>(this.data.recommendList.length-1)){
            index=0;
          }
        }
        this.songId = this.data.recommendList[index].id;
        pubsub.publish("sendSongId",this.songId);
        // console.log(msgName,type)
     })

  },
  goSong(e){
    this.songId = e.currentTarget.id/1;
    wx.navigateTo({
      url: '../song/song?id='+this.songId,
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