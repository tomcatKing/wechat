import { common } from "url.js";
const network = {
  //获取用户信息
  getUserInfoByCode:function(param){
    var url=common.user_info_url;
    wx.request({
      url:url,
      data:{
        code:param.code,
      },
      success:function(res){
        param.success(res);
      }
    })
  },

  //params.type,params.success
  getFoodList:function(params){
    var url=common.food_type_url(params.keyword,params.type,params.pageNum,params.orderBy,params.pageSize);
    wx.request({
      url:url,
      success:function(res){
        params.success(res);
      }  
    })
  },
  //获取指定的美食的详细信息
  getFoodDetail:function(params){
    var url = common.food_detail_url(params.id);
    wx.request({
      url:url,
      success:function(res){
        params.success(res);
      }
    })
  },
  //将指定的美食添加到指定用户的购物车
  addFoodToCart:function(params){
    var url = common.cart_add_url(params.code,params.food_id);
    wx.request({
      url:url,
      success:function(res){
        params.success(res);
      }
    })
  },
  //获取指定用户的所有购物车
  cartList:function(params){
    var url = common.cart_list_url(params.code);
    wx.request({
      url: url,
      success: function (res) {
        params.success(res);
      }
    })
  },
  //删除用户的指定的购物车
  deleteCart:function(params){
    var url=common.cart_delete_url(params.code,params.food_ids);
    wx.request({
      url:url,
      success:function(res){
        params.success(res);
      }
    })
  },
  //更新用户的购物车
  updateCart:function(params){
    var url=common.cart_update_url(params.code,params.cart_id,params.food_num);
    wx.request({
      url:url,
      success:function(res){
        params.success(res);
      }
    })
  },
  //获取用户的指定的购物车
  cartByList:function(params){
    var url = common.cart_bylist_url(params.code,params.cart_ids);
    wx.request({
      url:url,
      success:function(res){
        params.success(res);
      }
    })
  },
  //获取用户的所有的收货地址
  shippingList:function(params){
    var url = common.shipping_list_url(params.code);
    wx.request({
      url:url,
      success:function(res){
        params.success(res);
      }
    })
  },
  //删除用户的指定的收货地址
  shippingDelete:function(params){
    var url = common.shipping_delete_url(params.code,params.shipping_id);
    wx.request({
      url:url,
      success:function(res){
        params.success(res);
      }
    })
  },
  //添加收货地址的方法
  shippingAdd:function(params){
    var url = common.shipping_add_url();
    wx.request({
      url:url,
      method:"post",
      data: {
        code:params.code,
        shipping:params.shipping
      },
      success:function(res){
        params.success(res);
      }
    })
  },
  //修改收货地址的方法
  shippingUpdate:function(params){
    var url = common.shipping_update_url();
    wx.request({
      url:url,
      method:"POST",
      data:{
        code: params.code,
        shipping: params.shipping
      },
      success:function(res){
        params.success(res);
      }
    })
  },
  //创建订单的方法
  orderAdd:function(params){
    var url = common.order_add_url();
    wx.request({
      url:url,
      method:"GET",
      data:{
        code:params.code,
        cart_ids:params.cart_ids,
        shipping_id:params.shipping_id,
        order_desc:params.order_desc
      },
      success:function(res){
        params.success(res);
      }
    })
  },
  //支付订单的方法
  orderPay:function(params){
    var url = common.order_pay_url();
    wx.request({
      url:url,
      method:"GET",
      data:{
        orderNo:params.order_no,
        code:params.code
      },
      success:function(res){
        params.success(res);
      }
    })
  },
  //获取全部订单的方法
  orderList:function(params){
    var url = common.order_all_url();
    wx.request({
      url: url,
      method: "GET",
      data: {
        code: params.code
      },
      success: function (res) {
        params.success(res);
      }
    })
  },
  //获取待付款订单的方法
  noPayOrders:function(params){
    var url = common.order_nopay_url();
    wx.request({
      url: url,
      method: "GET",
      data: {
        code: params.code
      },
      success: function (res) {
        params.success(res);
      }
    })
  },
  //获取所有待发货的订单
  isPayOrders: function (params) {
    var url = common.order_ispay_url();
    wx.request({
      url: url,
      method: "GET",
      data: {
        code: params.code
      },
      success: function (res) {
        params.success(res);
      }
    })
  },
  //获取所有待收货的订单
  isShipOrders: function (params) {
    var url = common.order_isship_list();
    wx.request({
      url: url,
      method: "GET",
      data: {
        code: params.code
      },
      success: function (res) {
        params.success(res);
      }
    })
  },
  //取消订单
  delOrder:function(params){
    var url = common.order_cancel();
    wx.request({
      url: url,
      method: "GET",
      data: {
        code: params.code,
        order_no:params.order_no
      },
      success: function (res) {
        params.success(res);
      }
    })
  },
  //获取订单状态
  getOrderStatus:function(params){
    var url = common.order_status_get();
    wx.request({
      url: url,
      method: "GET",
      data: {
        code: params.code,
        order_no: params.order_no
      },
      success: function (res) {
        params.success(res);
      }
    })
  }
}

export { network }