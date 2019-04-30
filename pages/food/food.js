// pages/food/food.js
import {network} from "../../utils/network.js";
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //选择栏
    zh: 1,
    jg: 0,
    xl: 0,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    if(options.type){
      var type=options.type;
      that.setData({
        type:type
      });
    }
    //请求数据时的提示
    wx.showLoading({
      title: '数据获取中...',
    })

    //请求指定类型的数据
    network.getFoodList({
      type: that.data.type,
      success:function(res){
        wx.hideLoading();      
        that.setData({
          foods:res.data.data.list,
          //当前页
          this_page:res.data.data.pageNum,
          //总页数
          final_page:res.data.data.pages
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
    //如果当前页<最终页就触发加载事件
    var that=this;
    //当前页
    var this_page=that.data.this_page;
    //总页数
    var final_page=that.data.final_page;
    if(this_page>=final_page){
      wx.showToast({
        title: '下面没有数据了...',
        icon:"none"
      })
    }else{
      wx.showLoading({
        title: '数据获取中...',
      })
      var orderBy=that.data.zh

      network.getFoodList({
        type: that.data.type,
        pageNum: this_page+1,
        orderBy:that.data.orderBy,
        success:function(res){
          wx.hideLoading();
          var oldfoods=that.data.foods;
          var foodList=res.data.data.list;
          for(var index=0;index<foodList.length;index++){
            oldfoods.push(foodList[index]);
          }
          that.setData({
            foods: oldfoods,
            //当前页
            this_page: res.data.data.pageNum,
            //总页数
            final_page: res.data.data.pages
          })
        }
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onSelectEvent: function (event) {
    var that = this;
    var select_dom = event.target.dataset.select;
    //如果当前元素未被选择才能触发此事件
    if (that.data[select_dom] != 1) {
      if (select_dom === 'zh') {
        that.setData({
          orderBy:"food_id"
        })
        //获取当前页
        var this_page=that.data.this_page;
        var pageSize=this_page*10;
        var type=that.data.type;
        network.getFoodList({
          orderBy:"food_id",
          pageSize:pageSize,
          type:type,
          success:function(res){
            that.setData({
              foods:res.data.data.list
            })
          }
        })
        that.setData({
          zh: 1,
          jg: 0,
          xl: 0
        });
      } else if (select_dom === 'jg') {
        //获取当前页
        that.setData({
          orderBy: "food_price"
        })
        var this_page = that.data.this_page;
        var pageSize = this_page * 10;
        var type = that.data.type;
        network.getFoodList({
          orderBy: "food_price",
          pageSize: pageSize,
          type: type,
          success: function (res) {
            that.setData({
              foods: res.data.data.list
            })
          }
        })
        that.setData({
          zh: 0,
          jg: 1,
          xl: 0
        });
      } else {
        //获取当前页
        that.setData({
          orderBy: "food_count"
        })
        var this_page = that.data.this_page;
        var pageSize = this_page * 10;
        var type = that.data.type;
        network.getFoodList({
          orderBy: "food_count",
          pageSize: pageSize,
          type: type,
          success: function (res) {
            that.setData({
              foods: res.data.data.list
            })
          }
        })
        that.setData({
          zh: 0,
          jg: 0,
          xl: 1
        });
      }
    }
  },
  //添加购物车事件或查看详情事件
  onBindEventComment:function(event){
    var that=this;
    var play_type=event.currentTarget.dataset.type;
    var food_id=new Number(event.currentTarget.dataset.id);
    if(play_type==="add"){
      wx.showLoading({
        title: '添加美食到购物车中...',
      })
      //获取用户信息
      var user=app.getGlobalUserInfo();
      //获取code
      wx.login({
        success:function(res){
          network.addFoodToCart({
            code: res.code,
            food_id: food_id,
            success: function (res2) {
              if (res2.data.status=== 200) {
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
                });
              }
            }
          })
        }
      })
      
    }else{
      wx.navigateTo({
        url: '/pages/detail/detail?id='+food_id,
      })
    }
  }

})