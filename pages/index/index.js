//index.js
//获取应用实例
const apwp = getApp()

Page({
  data: {
   imgs:[
     "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1554184193&di=3817ee9c5bf6d328feb109354031ecf4&src=http://a3.peoplecdn.cn/01ed5030c90d5cc1e17010290b13a21a.png",
     "https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1554184347&di=b1b6fe3dc7a4b2a9e51cc4097b8d1f20&src=http://m1.tuniucdn.com/filebroker/cdn/vnd/20/4d/204d0f196986e89bcf27b34aa62cfa85_w450_h300_c1_t0.jpg",
     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554194466733&di=3a890d6cf0c9837565db5ec96d414f4f&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F34fae6cd7b899e512cc0b85649a7d933c8950d21.jpg"
   ],
    selectContext:[
      {
        name:"甜品",
        url:"/pages/food/food?type=1",
        img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554195086129&di=da4c62fed9ae585c241d342658116f8d&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F29%2F22%2F82%2F594a792e830d6.png"
      },
      {
        name: "瓜果",
        url: "/pages/food/food?type=2",
        img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554195317084&di=922153bfebfdcb83b7acb66e9d9578b1&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F32%2F38%2F43%2F59342c7ccfe08.png"
      },
      {
        name: "蛋糕",
        url: "/pages/food/food?type=3",
        img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554195220525&di=e9ac3dab585ffc355dfe7bb40bfcc3f6&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F07%2F85%2F23%2Fs_1024_58d0d7189a627.png"
      },{
        name: "饮料",
        url: "/pages/food/food?type=4",
        img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3400943493,2642439568&fm=26&gp=0.jpg"
      }
    ],
    itemdatas: [
      {
        moreurl: "/pages/food/food?type=4",
        img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553781995183&di=c4fb6e292acabd6eabf88303e9c2b5e3&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F09fa513d269759ee607a9e7fb9fb43166d22df58.jpg",
        name: "大雄的早餐推荐"
      },
      {
        moreurl: "/pages/food/food?type=1",
        img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554196610932&di=dc22bb4f39737b4a184fd983f5d0c1a8&imgtype=0&src=http%3A%2F%2F04.imgmini.eastday.com%2Fmobile%2F20170819%2F20170819193646_5dc022261a9b2e2a98d7c656650d21f8_1.jpeg",
        name: "胖虎的美食宝典"
      },
      {
        moreurl: "/pages/food/food?type=2",
        img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553782124667&di=f4c1026e2b09aea7a236d07af535eaa0&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F58%2F08%2F20300543669348147383082073760.jpg",
        name: "小夫的营养均衡"
      },
      {
        moreurl: "/pages/food/food?type=2",
        img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554196470598&di=3045eccde548c8f18526ba2dd8662029&imgtype=0&src=http%3A%2F%2Fd.ifengimg.com%2Fw600%2Fp0.ifengimg.com%2Fpmop%2F2018%2F0516%2F3E422668BE108310BDEFF507BC4F2BBC904C908D_size22_w640_h577.jpeg",
        name: "静香的美食方案"
      },
      {
        moreurl: "/pages/food/food?type=3",
        img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554196413778&di=4cd936ef2c93110cf1610c7e705efadb&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201605%2F09%2F20160509084019_VGQLe.jpeg",
        name: "哆啦A梦的推荐"
      }
    ]
  },
  onLoad: function () {
  
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //导航点击事件
  onBindEvent: function (event){
    console.log(event);
    wx.navigateTo({
      url: event.currentTarget.dataset.url,
    })
  }
})
