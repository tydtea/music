// pages/index/index.js
const axios = require("../../utils/axios")
Page({

  /**
   * 页面的初始数据
   */
  data: {
     banners:[],
     // 推荐歌曲列表
     recommendList:[],
     // 排行榜
     topList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log("options",options)
    // 轮播图
    const res = await axios.get("/banner",{
      params:{
        type:2
      }
    })
    this.setData({
      banners:res.banners
    })

    // 推荐歌曲
    const recommendList = await axios.get("/personalized",{
      params:{
        limit:15
      }
    })
    this.setData({
      recommendList:recommendList.result
    })

    // 优化三
    // 将 axios.all 批量发送请求。
    // 优化二
    // const topList = await axios.get("http://127.0.0.1/top/list");
    // console.log(topList)
    // this.setData({
    //   topList
    // })

    // 优化一  必须看明白。
    const idxArr = [0,1,2,3,4];
    const topArr = [];
    while(idxArr.length){
      const idx = idxArr.shift(0);
      const topList = await axios.get("/top/list",{
        params:{
          idx
        }
      })
      const {id,name,tracks} = topList.playlist;
      topArr.push({
        id,
        name,
        tracks:tracks.splice(0,3)
      })
    }
    this.setData({
      topList:topArr
    })

    // 未优化排行榜

    // const topList0 = await axios.get("/top/list",{
    //   params:{
    //     idx:0
    //   }
    // })
    // const topList1 = await axios.get("/top/list",{
    //   params:{
    //     idx:1
    //   }
    // })
    // const topList2 = await axios.get("/top/list",{
    //   params:{
    //     idx:2
    //   }
    // })
    // const topList3 = await axios.get("/top/list",{
    //   params:{
    //     idx:3
    //   }
    // })
    // const topList4 = await axios.get("/top/list",{
    //   params:{
    //     idx:4
    //   }
    // })
    
    // const topArr = [
    //   {
    //     id:topList0.data.playlist.id,
    //     name:topList0.data.playlist.name,
    //     tracks:topList0.data.playlist.tracks.splice(0,3)
    //   },
    //   {
    //     id:topList1.data.playlist.id,
    //     name:topList1.data.playlist.name,
    //     tracks:topList1.data.playlist.tracks.splice(0,3)
    //   },
    //   {
    //     id:topList2.data.playlist.id,
    //     name:topList2.data.playlist.name,
    //     tracks:topList2.data.playlist.tracks.splice(0,3)
    //   },
    //   {
    //     id:topList3.data.playlist.id,
    //     name:topList3.data.playlist.name,
    //     tracks:topList3.data.playlist.tracks.splice(0,3)
    //   },
    //   {
    //     id:topList4.data.playlist.id,
    //     name:topList4.data.playlist.name,
    //     tracks:topList4.data.playlist.tracks.splice(0,3)
    //   }
      
    // ]
    // this.setData({
    //   topList:topArr
    // })

    // console.log(topList0.data.playlist);





    // this.setData({
    //   banners:res.data.banners,
    //   recommendList:recommendList.data.result
    // })






    // wx.request({
    //   url: 'http://localhost:3000/banner?type=2',
    //   success:(res)=>{
    //     this.setData({
    //       banners:res.data.banners
    //     })
    //     // console.log(res);
    //   }
    // })
  },
  goCommendSong(){
    wx.navigateTo({
      url: '../../song/pages/recommendSong/recommendSong',
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