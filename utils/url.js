// var prefix_url ="https://www.tomcatBbzzzs.cn/";
var prefix_url ="http://vqgigg.natappfree.cc/";
const common={
  //用户登录使用到的链接
  login_url:prefix_url+"user/login",
  //获取当前的用户信息,
  user_info_url:prefix_url+"user/info",
  //根据传入类型类型获取美食信息
  food_type_url:function(keyword,type,pageNum,orderBy,pageSize){
    var final_url=prefix_url+"food/list?1=1";
    if(keyword){
      final_url=final_url+"&keyword="+keyword;
    }
    if(type){
      final_url=final_url+"&type="+type;
    }
    if(pageNum){
      final_url =final_url+"&pageNum="+pageNum;
    }
    if(pageSize){
      final_url =final_url+"&pageSize="+pageSize;
    }
    if(orderBy){
      final_url =final_url+"&orderBy="+orderBy;
    }
    return final_url;
  },
  //根据传入的美食的id获取美食的详细信息
  food_detail_url:function(id){
    return prefix_url+"food/"+id;
  },
  //添加商品到购物车
  cart_add_url:function(code,food_id){
    return prefix_url+"cart/add?code="+code+"&food_id="+food_id;
  },
  //获取用户的购物车
  cart_list_url:function(code){
    return prefix_url+"cart/list?code="+code;
  },
  //通过传入食物删除购物车
  cart_delete_url:function(code,food_ids){
    return prefix_url+"cart/delete?code="+code+"&food_ids="+food_ids;
  },
  //更新购物车的数据
  cart_update_url:function(code,cart_id,food_num){
    return prefix_url+"cart/update?code="+code+"&cart_id="+cart_id+"&food_num="+food_num;
  },
  //获取指定的购物车数据
  cart_bylist_url:function(code,cart_ids){
    return prefix_url+"cart/bylist?code="+code+"&cart_ids="+cart_ids;
  },
  //获取用户的收货地址数据
  shipping_list_url:function(code){
    return prefix_url +"shipping/list?code="+code;
  },
  //删除用户的收货地址
  shipping_delete_url:function(code,shipping_id){
    return prefix_url + "shipping/delete?code=" + code +"&shippingId="+shipping_id;
  },
  //添加用户的收货地址
  shipping_add_url:function(){
    return prefix_url+"shipping/add";
  },
  //更新用户的收货地址
  shipping_update_url:function(){
    return prefix_url +"shipping/update";
  },
  //创建订单
  order_add_url:function(){
    return prefix_url+"order/add";
  },
  //支付订单
  order_pay_url:function(){
    return prefix_url+"order/pay";
  },
  //用户获取全部订单接口
  order_all_url:function(){
    return prefix_url+"order/list";
  },
  //用户获取待付款订单接口
  order_nopay_url:function(){
    return prefix_url +"order/nopaylist";
  },
  //用户获取所有待发货订单的接口
  order_ispay_url:function(){
    return prefix_url +"order/ispaylist";
  },
  //用户获取所有待收货订单的接口
  order_isship_list:function(){
    return prefix_url +"order/isshiplist";
  },
  //用户取消订单的接口
  order_cancel:function(){
    return prefix_url +"order/cancel";
  },
  //查询订单状态的接口
  order_status_get:function(){
    return prefix_url +"order/queryOrderPayStatus";
  }
}

export {common}