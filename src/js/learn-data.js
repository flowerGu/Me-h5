/*
  *员工学习区客户资料区通用
  *type=u 客户资料区 title
  *type=w 员工学习区 title
*/
initData();

function initData() {
  if (getQueryString('type') == 'u') {
    initUser();
  } else if (getQueryString('type') == 'w') {
    initWorker();
  }
}
// 客户资料区
function initUser() {
  document.title = "客户资料区";
  ajax({
    url: MIANCLASSIFI_URL,
    data: {
      current: 1,
      type: 10,
      num: 50
    },
    cb: function (data) {
      rendData(data)
    }
  })
}
// 员工学习区
function initWorker() {
  document.title = "员工学习区";
  ajax({
    url: MIANCLASSIFI_URL,
    data: {
      current: 1,
      type: 9,
      num: 50
    },
    cb: function (data) {
      rendData(data)
    }
  })
}
// 处理数据
function rendData(d) {
  var tpl = $("#learn-data-list").html();
  var result = Mustache.render(tpl, d);
  $('body').append(result);
}