//app.js
App({
  //用户信息
  userInfo:null,
  setGlobalUserInfo:function(user){
    wx.setStorageSync("userInfo", user);
  },

  //获取用户信息
  getGlobalUserInfo:function(){
    return wx.getStorageSync("userInfo");
  },
  globalData: {
    
  }
})