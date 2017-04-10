/*理财头条*/
var type = getQueryString('type');
var dropDownPageOpts = {
  first: true,
  page: 1,
  enable: true,
  timer: null
}
/*读取理财头条列表*/
function getFinancialList() {
  ajax({
    url: FINSNCISL_LIST_URL,
    async: false,
    data: { version: app_data.version, type: 1, current: dropDownPageOpts.page },
    cb: function (data) {
      if (data.list == null || data.list.length === 0) {
        dropDownPageOpts.enable = false;
      }
      $(data.list).each(function (idx, item) {
        if (item.title.length > 10) {
          item.title = item.title.substr(0, 10);
          item.create_time = item.create_time.split(" ")[0];
        }
      });
      var templates = $("#financial_list").html();
      var result = Mustache.render(templates, data);
      $('#content_list').append(result);
      dropDownPageOpts.page++;
    }
  })
}
getFinancialList();
/*下拉加载*/
var financialDropload = $('#content_list').dropload({
  scrollArea: window,
  loadDownFn: function (data) {
    if (dropDownPageOpts.timer !== null) {
      window.clearTimeout(dropDownPageOpts.timer);
      dropDownPageOpts[1].timer = null;
    }
    dropDownPageOpts.timer = setTimeout(function () {
      dropDownPageOpts.timer = null;
      if (dropDownPageOpts.enable) {
        getFinancialList()
      }
      data.resetload();
    }, 1000);
  },
})
financialDropload.unlock();
