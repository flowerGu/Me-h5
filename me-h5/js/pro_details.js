/**
 * 
 */
$(function () {
  'use strict';
  var id = getQueryString("id");
  window.location.href = "../productDetails.html?id="+id;
  //var result = Mustache.render($('#tpl').html());
  var jsData = JSON.parse(localStorage.getItem('product-detail-2'));

  var renderData = function (data) {
    //$('#maindata').append(result);
    if (jsData) {//是H5端
      $('#toDebt').attr('href', '../debtList.html?orderId=' + id);
    }
    var years_income = (+data.years_income * 100).toFixed(2) + '%';
    $('#product_cycle,#product_cycle_1,#product_cycle_2').text(data.product_cycle);
    $('#years_income_0,#years_income_1,#years_income_2').text(years_income);
  };
  if (id) { //app
    $.post(PROJECT_DETAIL_URL, {
      version: app_data.version,
      id: id
    }).then(function (data) {
      renderData(data);
    }, function () {
      tip_window('网络错误，请刷新重试', '取消');
    });
  } else {
    renderData(jsData || window.backupData);
  }
});
