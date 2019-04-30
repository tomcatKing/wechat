// pages/user/user.js
var app=getApp();
import { network } from "../../utils/network.js";
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
    var that = this;
    //判断当前用户是否已经登录
    var user = app.getGlobalUserInfo();
    if (user) {
      //这里需要在服务器进行用户信息同步
      wx.login({
        success:function(res){
          network.getUserInfoByCode({
            code:res.code,
            success:function(res2){
              if(res2.status!=200){
                wx.navigateTo({
                  url: '/pages/login/login',
                });
              }
            }
          })
        }
      });
     
      wx.showLoading({
        title: '用户信息加载中...',
      });
      that.setData({
        user_name:user.nickName,
        avatarUrl:user.avatarUrl       
      })
      wx.showToast({
        title: '加载完成',
        icon:'none',
        duration:1000
      })
    } else {
      wx.showToast({
        title: '您还没有授权登录,即将前往授权登录!!',
        icon: "loading",
        duration: 2000
      })
      wx.navigateTo({
        url: '/pages/login/login',
      })
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
  //用户选择事件
  onSelectEvent:function(event){
    var that = this;
    //如果当前用户没有登录,就不要触发了
    var user = app.getGlobalUserInfo();
    if(user){
      var select_title=event.currentTarget.dataset.select;
      if (select_title ==="dpj"){
        wx.showToast({
          title: '此功能暂时不提供!!',
          icon:"none",
          duration:2500
        })
      } else {
        wx.navigateTo({
          url: '/pages/order/order?select='+select_title
        });
      }
    }else{
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  }
})