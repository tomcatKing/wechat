// pages/buy/buy.js
import { network } from "../../utils/network.js";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否为添加收货地址操作
    is_add_address:false,
    is_update_address:false,
    region: ['广东省', '广州市', '海珠区']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断用户是否登录,安全性考虑
    var that=this;
    var user = app.getGlobalUserInfo();
    if (user) {
      wx.showLoading({
        title: '数据加载中...',
      });
      //于服务器的redis统一时长
      //获取服务器上的真实用户信息,通过在获取购物车信息
      wx.login({
        success:function(res){
          network.getUserInfoByCode({
            code: res.code,
            success: function (res2) {
              if (res2.data.status === 200) {
                var cart_ids = options.cart_ids;
               //传递过来的对象数组
                cart_ids = cart_ids.substr(1, cart_ids.length);
                console.log(cart_ids);

                //这里不能使用之前的code,不然后台报错.获取指定的购买数据
                wx.login({
                  success:function(cb){
                    network.cartByList({
                      code: cb.code,
                      cart_ids: cart_ids,
                      success: function (res2) {
                        //循环得到总的价格
                        var totalPrice = 0;
                        var carts = res2.data.data;
                        for (var index = 0; index < carts.length; index++) {
                          var cart = carts[index];
                          totalPrice += parseInt(cart.totalPrice);
                        }
                        that.setData({
                          carts: carts,
                          totalPrice: totalPrice
                        })
                        wx.showToast({
                          title: '加载订单完成...',
                          icon: "none",
                          duration: 1500
                        });
                      }
                    });
                  }
                })
                
                wx.login({
                  success:function(sl){
                    //获取用户的收货地址,如果没有,提示添加
                    network.shippingList({
                      code: sl.code,
                      success: function (res2) {
                        that.setData({
                          shippings: res2.data.data.list,
                          this_page: res2.data.data.pageNum,
                          page_count: res2.data.data.pages
                        });
                        wx.showToast({
                          title: '加载收货地址完成...',
                          icon: "none",
                          duration: 1500
                        });
                      }
                    });
                  }
                })
               
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
      })  
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
  //操作用户收货地址事件
  onShippingEvent:function(event){
    var that=this;
    var shipping_id=event.currentTarget.dataset.id;
    console.log("当前的id:["+shipping_id+"]");
    var type = event.currentTarget.dataset.type;
    if(type==="edit"){
      var shippings = that.data.shippings;
      var rec_name_val="";
      var rec_phone_val="";
      var region=[];
      var rec_address_val="";
      for(var index=0;index<shippings.length;index++){
        var shipping=shippings[index];
        if(shipping.shipping_id===shipping_id){
          rec_name_val= shipping.receiver_name;
          rec_phone_val = shipping.receiver_phone;
          region[0] = shipping.receiver_province;
          region[1] = shipping.receiver_city;
          region[2] = shipping.receiver_district;
          rec_address_val = shipping.receiver_address;
        }
      }
      console.log(rec_name_val+","+rec_phone_val+","+rec_address_val);
      that.setData({
        rec_address_id: shipping_id,
        is_select_address:true,
        is_update_address:true,
        is_add_address:false,
        rec_name_val:rec_name_val,
        rec_phone_val:rec_phone_val,
        region:region,
        rec_address_val:rec_address_val
      });
    }else{
      wx.showLoading({
        title: '删除收货地址中...',
      })
      wx.login({
        success:function(res){
          var code=res.code;
          network.shippingDelete({
            code:code,
            shipping_id: shipping_id,
            success:function(res2){
              //用户删除成功
              if(res2.data.msg==="OK"){
                //移除这条数据
                var shippings = that.data.shippings;
                for (var index = 0; index < shippings.length;index++){
                  var shipping = shippings[index];
                  //如果二者相等
                  if (shipping.shipping_id === shipping_id){
                    shippings.slice(index,1);
                    break;
                  }
                }
                that.setData({
                  carts:carts
                });
                wx.showToast({
                  title: '删除收货地址成功',
                  icon:"success",
                  duration:1500
                })
              }else{
                wx.showToast({
                  title: '删除收货地址失败',
                  icon:"none",
                  duration:1500
                })
              }
            }
          });
        }
      })
    }
  },
  //更改守护地址
  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },
  //添加收货地址
  onAddAddressEvent: function () {
    console.log("事件触发")
    var that = this;
    var rec_name = that.data.rec_name_val;
    var rec_phone = that.data.rec_phone_val;
    var rec_address = that.data.rec_address_val;
    console.log(rec_name + "," + rec_phone + "," + rec_address);
    if (!rec_name || !rec_phone || !rec_address || rec_name === "" || rec_phone === "" || rec_address === "") {
      wx.showToast({
        title: '数据不够完整...',
        icon: "none"
      })
      return;
    }
    wx.showLoading({
      title: '添加数据中...',
    })
    //数据合法时
    var region=that.data.region;
    var receiver_province=region[0];
    var receiver_city=region[1];
    var receiver_district=region[2];
    var shipping={};
    shipping.receiver_name = rec_name;
    shipping.receiver_phone = rec_phone;
    shipping.receiver_province = receiver_province;
    shipping.receiver_city = receiver_city;
    shipping.receiver_district = receiver_district;
    shipping.receiver_address = rec_address;
    //添加方法
    wx.login({
      success:function(res){
        var code=res.code;
        network.shippingAdd({
          code:code,
          shipping:shipping,
          success:function(res2){
            if(res2.data.msg==="OK"){
              wx.showToast({
                title: '收货地址添加成功',
                duration:1500
              })
              that.setData({
                is_select_address:false
              })
            }else{
              wx.showToast({
                title: '收货地址添加失败',
                icon:"none",
                duration:1500
              })
            }
          }
        });
      }
    })
    wx.hideLoading();
  },
  //输入框失去焦点时触发
  onBlurEvent: function (event) {
    var that = this;
    var type = event.currentTarget.dataset.val;
    var val = event.detail.value;
    console.log("当前输入框:[" + type + "],值:[" + val + "]");
    if (type === "rec_name") {
      if (val.trim() === "") {
        wx.showToast({
          title: '输入值不能为空',
          icon: "none",
          duration: 1500
        })
        that.setData({
          rec_name: true
        });
        return;
      }
      that.setData({
        rec_name_val: val,
        rec_name: false
      })
    } else if (type === "rec_phone") {
      if (val.trim() === "") {
        wx.showToast({
          title: '输入值不能为空',
          icon: "none",
          duration: 1500
        })
        that.setData({
          rec_phone: true
        });
        return;
      }
      that.setData({
        rec_phone_val: val,
        rec_phone: false
      })
    } else {
      if (val.trim() === "") {
        wx.showToast({
          title: '输入值不能为空',
          icon: "none",
          duration: 1500
        })
        that.setData({
          rec_address: true
        });
        return;
      }
      that.setData({
        rec_address_val: val,
        rec_address: false
      })
    }
  },
  //点击切换到添加收货地址
  transAddEvent:function(){
    var that=this;
    that.setData({
      is_select_address:true,
      is_add_address:true,
      is_update_address:false,
    })
  },
  //更新收货地址
  onUpdateAddressEvent:function(){
    var that=this;
    that.setData({
      update_loading:true
    })
    var address_id=that.data.rec_address_id;
    var rec_name = that.data.rec_name_val;
    var rec_phone = that.data.rec_phone_val;
    var rec_address = that.data.rec_address_val;
    var region=that.data.region;
    if(rec_name==="" || rec_phone==="" || rec_phone==="" || rec_address===""){
      wx.showToast({
        title: '数据不够完整',
        icon:"none"
      })
      return;
    }
    var shipping={};
    shipping.shipping_id=address_id;
    shipping.receiver_name=rec_name;
    shipping.receiver_phone=rec_phone;
    shipping.receiver_province=region[0];
    shipping.receiver_city=region[1];
    shipping.receiver_district=region[2];
    shipping.receiver_address=rec_address;

    wx.login({
      success:function(res){
        var code=res.code;
        network.shippingUpdate({
          code:code,
          shipping:shipping,
          success:function(res2){
            if(res.data.msg==="OK"){
              wx.showToast({
                title: '修改收货地址成功',
              })
              that.setData({
                update_loading:false,
                is_update_address:false,
                is_select_address:false
              })
            }else{
              wx.showToast({
                title: '修改收货地址失败',
                icon:"none"
              })
            }
          }
        })
      }
    })
  },
  //点击返回按钮后的效果
  onReturnEvent:function(){
    var that=this;
    that.setData({
      is_update_address: false,
      is_select_address: false,
      is_add_address:false
    })
  },
  //选择收货地址
  onSelectShoppingEvent:function(event){
    var that=this;
    console.log("选择收货地址为:" + event.currentTarget.dataset.id);
    that.setData({
      shipping_id:event.currentTarget.dataset.id
    });
  },
  //给商家留言
  onMsgBlurEvent:function(event){
    var order_desc = event.detail.value;
    this.setData({
      order_desc:order_desc
    })
  },
  //创建订单并前往支付页面
  addOrderEvent:function(){
    var that = this;
    var carts = that.data.carts;
    var cart_ids = "";
    for (var index = 0; index < carts.length; index++) {
      var cur = carts[index];
      if (index !== carts.length - 1) {
        cart_ids = cart_ids + cur.cart_id + ",";
      } else {
        cart_ids = cart_ids + cur.cart_id;
      }
    }
    var shipping_id = that.data.shipping_id;
    var order_desc=that.data.order_desc;
    if(shipping_id==null){
      wx.showToast({
        title: '请选择收货地址',
        icon:'none',
        duration:2000
      })
      return;
    }

    if(order_desc==undefined){
      wx.login({
        success:function(res){
          var code=res.code;
          network.orderAdd({
            code:code,
            cart_ids:cart_ids,
            shipping_id:shipping_id,
            success: function (res2) {
              if (res2.data.msg === "OK") {
                var order_no = res2.data.data.order_no;
                wx.navigateTo({
                  url: '/pages/ewm/ewm?order_no=' + order_no,
                })
              } else {
                wx.showToast({
                  title: '不好意思,服务器繁忙.响应失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        }
      })
    }else{
      wx.login({
        success: function (res) {
          var code = res.code;
          network.orderAdd({
            code: code,
            cart_ids: cart_ids,
            shipping_id: shipping_id,
            order_desc:order_desc,
            success: function (res2) {
              if(res2.data.msg==="OK"){
                var order_no=res2.data.data.order_no;
                wx.navigateTo({
                  url: '/pages/ewm/ewm?order_no='+order_no,
                })
              }else{
                wx.showToast({
                  title: '不好意思,服务器繁忙.响应失败',
                  icon:'none',
                  duration:2000
                })
              }
            }
          })
        }
      })
    }
    

  }
})