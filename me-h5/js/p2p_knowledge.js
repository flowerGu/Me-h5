/*
  *新增网贷知识
*/
$(function () {
  ajax({
    url: FINSNCISL_LIST_URL,
    data: {
      current: 1,
      type: 18
    },
    cb: function (data) {
      for(var i=0;i<data.list.length;i++){
        data.list[i].title = data.list[i].title.substring(0,16)+"..."
      }
      var tpl = $("#learn-data-list").html();
      var result = Mustache.render(tpl, data);
      $('body').append(result);
    }
  })
})
