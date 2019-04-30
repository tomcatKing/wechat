// pages/ewm/ewm.js
import { network } from "../../utils/network.js";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_status:10,
    qrPath:"http://img.zcool.cn/community/016986582abab6a84a0e282b6a0f40.gif"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("触发页面加载事件!!");
    //获取当前登录用户信息
    var that = this;
    var user = app.getGlobalUserInfo();
    var order_no = options.order_no;
    that.setData({
      order_no:order_no
    })
    if (user) {
      //与服务器进行信息同步
      wx.login({
        success: function (res) {
          network.getUserInfoByCode({
            code: res.code,
            success: function (res2) {
              if(res2.data.status===200){
                var order_status = options.order_status;
                that.setData({
                  order_no: order_no,
                  order_status: order_status
                })

                //请求支付
                wx.login({
                  success: function (userInfo) {
                    var code = userInfo.code;
                    network.orderPay({
                      order_no: order_no,
                      code: code,
                      success: function (res) {
                        that.setData({
                          qrPath:res.data.data.qrUrl
                        });
                      }
                    })
                  }
                });

                //查询订单是否曾成功


              }else{
                wx.showToast({
                  title: '抱歉!!当前用户信息已过期.请重新授权...',
                  icon: "none",
                  duration: 1500
                });
                wx.navigateTo({
                  url: '/pages/login/login',
                });
              }
            }
          });
        }
      });
    }else{
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
    //获取订单状态
    var that=this;
    var myTimer=setInterval(function(){
      console.log("触发订单监听事件!!");
      wx.login({
        success:function(res){
          if(that.data.order_no){
            network.getOrderStatus({
              code:res.code,
              order_no:that.data.order_no,
              success:function(res2){
                if(res2.data.status===200){
                  that.setData({
                    order_status:20
                  });
                  clearInterval(myTimer);
                }
              }
            });
          }else{
            console.log("页面加载未完毕!!");
          }
        }
      });
    },5000);
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
  //页面跳转
  switchTab:function(event){
    var url=event.currentTarget.dataset.url;
    wx.switchTab({
      url: url,
    })
  }
})