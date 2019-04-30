// pages/login/login.js
var app=getApp();
import {common} from "../../utils/url.js";

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
    console.log("保存的用户信息为:");
    console.log(app.getGlobalUserInfo());
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

  },
  //用户授权
  getUser:function(event){
    console.log(event);
    if(event.detail.userInfo){
      //获取用户的头像
      var user_img = event.detail.userInfo.avatarUrl;
      //登录用户信息
      wx.login({
        success:function(res){
          //此时,写后台成功,保存这个code
          var code=res.code;
          wx.request({
            url:common.login_url+"?code="+code+"&img="+user_img,
            method:"POST",
            success:function(result){
              //用户已授权
              wx.showToast({
                title: '授权成功',
                icon: "success",
                duration: 1500
              });
              console.log(result);
              //保存用户信息到本地缓存,可以用作小程序端的拦截器
              app.setGlobalUserInfo(event.detail.userInfo);
              console.log("保存的用户信息为:");
              console.log(app.getGlobalUserInfo());
              //返回上一页
              wx.navigateBack({
                delta:1
              })
            },
            fail:function(){
              wx.showToast({
                title: '抱歉,记录用户信息失败.请重新授权',
                icon: "none",
                duration: 1500
              });
            }
          });
        }
      });
    }else{
      //用户未授权
     wx.showToast({
       title: '抱歉,授权失败',
       icon:"none",
       duration:1500
     });
    }
  }
})