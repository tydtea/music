class Axios{
  constructor(){
    this.defaultUrl = "http://localhost:3000";
    // this.defaultUrl = "http://zhangpeiyue1222.utools.club"
  }
  request(url,data={},method){
    return new Promise((resolve,reject)=>{
      wx.request({
        url:(url.includes("http://")?url:this.defaultUrl+url),
        data,
        header:{
          cookie:wx.getStorageSync('cookies').toString()
        },
        method,
        success(res){
          // 登陆操作
          if(data.isLogin){
            console.log(1111,res);
            if(res.cookies) wx.setStorageSync("cookies",res.cookies)
          }
          
          resolve(res.data);
        },
        fail(err){
          reject(err);
        }
      })
    })
    
  }
  get(url,config={}){
    return this.request(url,config.params,"get");
  }

}


module.exports = new Axios();