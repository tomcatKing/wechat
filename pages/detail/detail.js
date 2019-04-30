// pages/detail/detail.js
import { network } from "../../utils/network.js";
var app = getApp();
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
    var that=this;
    console.log(options);
    var current_id=parseInt(options.id);
    network.getFoodDetail({
      id:current_id,
      success:function(res){
        that.setData({
          food:res.data.data
        })
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

  },
  onBindEvent:function(event){
    var that = this;
    var play_type = event.currentTarget.dataset.set;
    var food_id = new Number(that.data.food.food_id);
    console.log(event.currentTarget);
    console.log(play_type);
    if (play_type === "add") {
      //添加到购物车
      wx.showLoading({
        title: '添加美食到购物车中...',
        duration:2000
      })
      //获取用户信息
      var user = app.getGlobalUserInfo();
      if(user){
        wx.login({
          success:function(res){
            network.addFoodToCart({
              code: res.code,
              food_id: food_id,
              success: function (res2) {
                if (res2.data.status === 200) {
                  wx.showToast({
                    title: '已添加到购物车',
                    icon: "success",
                    duration: 1500
                  })
                } else {
                  wx.showToast({
                    title: '添加失败,'+res2.data.msg,
                    icon: "none",
                    duration: 1500
                  })
                }
              }
            })
          }
        })
      }else{
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    } else if (play_type ==="buy"){
      //如果用户存在
      var user = app.getGlobalUserInfo();
      if(!user){
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }

      //购买商品
      wx.navigateTo({
        url: '/pages/buy/buy?food_id='+food_id,
      })
    }
  }
})