// pages/cart/cart.js
import { network } from "../../utils/network.js";
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPrice:0,
    //0-未选择,1-已选择
    totalStatus:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //判断当前用户是否已经登录
    var user = app.getGlobalUserInfo();
    if(user){
      wx.showLoading({
        title: '数据获取中...',
      })
      //获取用户编码
      wx.login({
        success:function(res){
          //获取服务器上的真实用户信息,通过在获取购物车信息
          network.getUserInfoByCode({
            code:res.code,
            success:function(res2){
              if(res2.data.status===200){
                //这里才是正确的业务逻辑
                network.cartList({
                  code: res.code,
                  success: function (res2) {
                    if (res2.data.data) {
                      var cartdatas= res2.data.data;
                      var carts = [];
                      //0-未勾选,1-已勾选
                      console.log(cartdatas.length);
                      for (var index = 0; index < cartdatas.length; index++) {
                        var current_cart = cartdatas[index];
                        current_cart.status = 0;
                        carts.push(current_cart);
                      }
                      that.setData({
                        carts: carts
                      })
                      wx.hideLoading();
                    }
                  }
                });
              }else{
                wx.showToast({
                  title: '抱歉!!当前用户信息已过期.请重新授权...',
                  icon:"none",
                  duration:1500
                });
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              }
            }
          })  
        }
      }) 
    }else{
      wx.showToast({
        title: '您还没有授权登录,即将前往授权登录!!',
        icon:"loading",
        duration:2000
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
    var that = this;
    //判断当前用户是否已经登录
    var user = app.getGlobalUserInfo();
    if (user) {
      wx.showLoading({
        title: '数据获取中...',
      })
      //获取用户编码
      wx.login({
        success: function (res) {
          network.cartList({
            code: res.code,
            success: function (res2) {
              if(res2.data.data){
                var cartdatas = res2.data.data;
                var carts = [];
                //0-未勾选,1-已勾选
                for (var index = 0; index < cartdatas.length; index++) {
                  var current_cart = cartdatas[index];
                  current_cart.status = 0;
                  carts.push(current_cart);
                }
                that.setData({
                  carts: carts
                })
              }
              wx.hideLoading();
            }
          });
        }
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
  onSelectEvent:function(event){
    var that=this;
    var status=event.currentTarget.dataset.status;
    status==1 ? status=0 :status=1;
    var cart_id=event.currentTarget.dataset.id;
    var current_carts = that.data.carts;
    //更改指定购物车记录的状态
    for(var index=0;index<current_carts.length;index++){
      var current_cart=current_carts[index];
      //如果二者相等
      if(current_cart.cart_id==cart_id){
        current_cart.status=status;
      }
    }
    //重新设置结果
    that.setData({
      carts:current_carts
    })
    //调用一个计算总价的方法
    that.countTotalPrice();
  },
  countTotalPrice:function(){
    //获取被勾选的购物车,以及它的数量,以及它的单价
    var that=this;
    var carts=that.data.carts;
    var totalPrice=0;
    for(var index=0;index<carts.length;index++){
      var curr_cart=carts[index];
      //如果已经被勾选
      if(curr_cart.status==1){
        var curr_num=curr_cart.food_num;
        var curr_price=curr_cart.food_price;
        totalPrice+=curr_num*curr_price;
      }
    }
    that.setData({
      totalPrice:totalPrice
    })
  },
  //全选
  onSelectsEvent:function(){
    var that = this;
    var totalStatus = that.data.totalStatus;
    totalStatus == 1 ? totalStatus = 0 : totalStatus = 1;

    var current_carts = that.data.carts;
    //更改指定购物车记录的状态
    for (var index = 0; index < current_carts.length; index++) {
      var current_cart = current_carts[index];
      //如果二者相等
      current_cart.status = totalStatus;
    }
    //重新设置结果
    that.setData({
      totalStatus:totalStatus,
      carts: current_carts
    })
    //调用一个计算总价的方法
    that.countTotalPrice();
  },
  //修改商品数量
  onUpdateNumEvent:function(event){
    var that=this;
    var id = event.currentTarget.dataset.id;
    var type = event.currentTarget.dataset.type;
    var current_carts = that.data.carts;
    if(type==="add"){
      for (var index = 0; index < current_carts.length; index++) {
        var current_cart = current_carts[index];
        //如果二者相等
        if (current_cart.cart_id == id) {
          current_cart.food_num=current_cart.food_num+1;
        }
      }
    }else{
      for (var index = 0; index < current_carts.length; index++) {
        var current_cart = current_carts[index];
        //如果二者相等
        if (current_cart.cart_id == id) {
          var this_num = current_cart.food_num;
          this_num > 1 ? current_cart.food_num = this_num - 1 : current_cart.food_num =this_num;
        }
      }
    }
    //重新定义变量
    that.setData({
      carts:current_carts
    })
    //计算总价
    that.countTotalPrice();
  },

  //删除购物车
  deleteCart:function(event){
    wx.showLoading({
      title: '正在删除购物车商品..',
    })
    var that = this;
    var food_id = event.currentTarget.dataset.id;
    //这里我就不判断用户了,因为加载时已经判断了
    wx.login({
      success:function(res){
        var code=res.code;
        var food_ids=food_id+"";
        network.deleteCart({
          code:code,
          food_ids:food_ids,
          success:function(res2){
            if(res2.data.msg==="OK"){
              wx.showToast({
                title: '删除成功',
                icon:'success',
                duration:1500
              })
              //把被删除的数据从数组中移除
              var carts=that.data.carts;
              for(var index=0;index<carts.length;index++){
                var cart=carts[index];
                if (cart.food_id == food_id){
                  carts.splice(index,1);
                  break;
                }
              }
              that.setData({
                carts:carts
              })
            }else{
              wx.showToast({
                title: '删除失败',
                icon:"none",
                duration:1500
              })
            }
          }
        })
      }
    })
  },
  //购买商品的方法
  onBuyEvent:function(){
    var that=this;
    //获取所有被选中的美食,将cart_id和food_num传过去
    var carts=that.data.carts;
    var cart_ids="";
    for(var index=0;index<carts.length;index++){
      var cart=carts[index];
      //如果该商品已经被勾选
      if(cart.status===1){
        //在这里更新购物车信息
        wx.login({
          success:function(res){
            var code=res.code;
            network.updateCart({
              code: code,
              cart_id: cart.cart_id,
              food_num: cart.food_num,
              success: function (res2) {
                console.log("更新购物车成功");
                console.log(res2);
              }
            })
          }
        })
        cart_ids =cart_ids+","+cart.cart_id;
      }
    }
    //如果没有变化,说明没有商品被勾选
    if(cart_ids===""){
      wx.showToast({
        title: '请选择需要购买的商品',
        icon:"none",
        duration:2000
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/buy/buy?cart_ids='+cart_ids
    })
  }
})