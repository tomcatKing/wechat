Component({
  properties: {
    isnavigator: {
      type: Boolean,
      value: true
    }
  },
  //组件方法
  methods: {
    onInputEvent: function (event) {
      var value = event.detail.value;
      var detail = { "value": value };
      var options = {};
      //使用组件触发外部事件
      this.triggerEvent("searchinput", detail, options);
    }
  }
})