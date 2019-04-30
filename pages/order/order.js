// pages/order/order.js
import { network } from "../../utils/network.js";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all:1,
    dfk:0,
    dfh:0,
    dsh:0,
    show_detail:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user = app.getGlobalUserInfo();
    if (user) {
      //与服务器进行信息同步
      wx.login({
        success: function (res) {
          network.getUserInfoByCode({
            code: res.code,
            success: function (res2) {
              if (res2.data.status === 200) {
                var type = options.select;
                var select_btn = type;
                if (select_btn === "all") {
                  wx.login({
                    success:function(ol){
                      network.orderList({
                        code: ol.code,
                        success: function (res3) {
                          var mydata = res3.data.data;
                          if (mydata.length == 0) {
                            that.setData({
                              orders: null
                            })
                          } else {
                            var orders = mydata;
                            that.setData({
                              orders: orders
                            })
                          }
                        }
                      });

                      that.setData({
                        all: 1,
                        dfk: 0,
                        dfh: 0,
                        dsh: 0
                      });
                    }
                  });
                   
                } else if (select_btn === "dfk") { 
                  wx.login({
                    success: function (nO) {    
                      var code = nO.code;
                      network.noPayOrders({
                        code: code,
                        success: function (res3) {
                          if(res3.data.data){
                            var mydata = res3.data.data;
                            if (mydata.length == 0) {
                              that.setData({
                                orders: null
                              })
                            } else {
                              var orders = mydata;
                              that.setData({
                                orders: orders
                              })
                            }
                          }
                        }
                      });  
                      that.setData({
                        all: 0,
                        dfk: 1,
                        dfh: 0,
                        dsh: 0
                      });
                    }
                  });

                } else if (select_btn === "dfh") {
                  wx.login({
                    success:function(iO){
                      var cpde=iO.code;
                      network.isPayOrders({
                        code: code,
                        success: function (res2) {
                          if (res2)
                            var mydata = res2.data.data;
                          if (mydata.length == 0) {
                            that.setData({
                              orders: null
                            })
                          } else {
                            var orders = mydata;
                            that.setData({
                              orders: orders
                            })
                          }
                        }
                      })
                      that.setData({
                        all: 0,
                        dfk: 0,
                        dfh: 1,
                        dsh: 0
                      });
                    }
                  })
                  
                } else {
                  wx.login({
                    success:function(iS){
                      var code=iS.code;
                      network.isShipOrders({
                        code: code,
                        success: function (res2) {
                          var mydata = res2.data.data;
                          if (mydata.length == 0) {
                            that.setData({
                              orders: null
                            })
                          } else {
                            var orders = mydata;
                            that.setData({
                              orders: orders
                            })
                          }
                        }
                      })
                      that.setData({
                        all: 0,
                        dfk: 0,
                        dfh: 0,
                        dsh: 1
                      });
                    }
                  })
                }
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  //用户切换选择部分
  onSelectEvent:function(event){
    var that=this;
    var select_btn=event.currentTarget.dataset.set;
    if (select_btn === "all") {
      wx.login({
        success: function (res) {
          var code = res.code;
          network.orderList({
            code: code,
            success: function (res2) {
              if(res2.data.data){
                var mydata = res2.data.data;
                if (mydata.length == 0) {
                  that.setData({
                    orders: null
                  })
                } else {
                  var orders = mydata;
                  that.setData({
                    orders: orders
                  })
                }
              }
            }
          })
        }
      })
      that.setData({
        all: 1,
        dfk: 0,
        dfh: 0,
        dsh: 0
      });
    } else if (select_btn === "dfk") {
      wx.login({
        success: function (res) {
          var code = res.code;
          network.noPayOrders({
            code: code,
            success: function (res2) {
              var mydata = res2.data.data;
              if (mydata.length == 0) {
                that.setData({
                  orders: null
                })
              } else {
                var orders = mydata;
                that.setData({
                  orders: orders
                })
              }
            }
          })
        }
      })
      that.setData({
        all: 0,
        dfk: 1,
        dfh: 0,
        dsh: 0
      });
    } else if (select_btn === "dfh") {
      wx.login({
        success: function (res) {
          var code = res.code;
          network.isPayOrders({
            code: code,
            success: function (res2) {
              var mydata = res2.data.data;
              if (mydata.length == 0) {
                that.setData({
                  orders: null
                })
              } else {
                var orders = mydata;
                that.setData({
                  orders: orders
                })
              }
            }
          })
        }
      })
      that.setData({
        all: 0,
        dfk: 0,
        dfh: 1,
        dsh: 0
      });
    } else {
      wx.login({
        success: function (res) {
          var code = res.code;
          network.isShipOrders({
            code: code,
            success: function (res2) {
              var mydata = res2.data.data;
              if (mydata.length == 0) {
                that.setData({
                  orders: null
                })
              } else {
                var orders = mydata;
                that.setData({
                  orders: orders
                })
              }
            }
          })
        }
      })
      that.setData({
        all: 0,
        dfk: 0,
        dfh: 0,
        dsh: 1
      });
    }
  },
  //用户取消订单事件
  onDelEvent:function(event){
    wx.showLoading({
      title: '正在删除购物车商品..',
    })
    var that = this;
    var order_no = event.currentTarget.dataset.id;
    wx.login({
      success:function(res){
        var code=res.code;
        network.delOrder({
          code:code,
          order_no:order_no,
          success:function(res2){
            if (res2.data.msg === "OK") {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1500
              })
              //把被删除的数据从数组中移除
              var orders = that.data.orders;
              for (var index = 0; index < orders.length; index++) {
                var order = orders[index];
                if (order.order_no === order_no) {
                  carts.splice(index, 1);
                  break;
                }
              }
              that.setData({
                orders: orders
              })
            } else {
              wx.showToast({
                title: '删除失败',
                icon: "none",
                duration: 1500
              })
            }
    
          }
        });
      }
    })
    
  },
  //用户查看订单详情事件
  onDetailEvent:function(event){
    var that = this;
    var order_no = event.currentTarget.dataset.id;
    var orders=that.data.orders;
    for(var index=0;index<orders.length;index++){
      var order=orders[index];
      console.log(order);
      if(order.order_no===order_no){
        that.setData({
          order:order,
          show_detail: true
        })
      }
    }
  },
  //用户付款事件
  onPayEvent:function(event){
    var that = this;
    var order_no = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/ewm/ewm?order_no='+order_no+"&order_status="+10,
    })
  },
  //回到订单页面
  showDetailEvent:function(){
    this.setData({
      show_detail:false
    })
  }
})