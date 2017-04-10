/**
 * 资金记录
 */
checkLogin();
initbodyH();
var tokenid = getCookie("tokenid"),
  first = true,
  $box = $('#main'),
  dropDownPageOpts = {
    page: 1,
    enable: true
  };

var lastDate;//最后一次时间

var processData = function (data) {
  var payTypeArr = [
    '败',
    '出',// 出借
    '充',// 充值//2
    '提',// 提现
    '续',// 手续费
    '特',// 本金收益//5
    '回',// 回款
    '冻',// 出借冻结//7
    '解',// 解冻返款
    '成',// 出借成功
    '赎',// 赎回
    '包',// 红包
    '转',// 转让 12
    '接',// 承接   
  ];
  //添加月份条 当前时间 //'yyyy-MM'
  var _date = new Date(),
    year = _date.getFullYear() + '',
    month = _date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  var date = year + '-' + month;//添加月份条

  for (var i = 0, len = data.list.length; i < len; i++) {

    if (data.list[i].option_type !== '') {
      //金额保留2位+正负号
      data.list[i].operation_amount = parseFloat(data.list[i].operation_amount).toFixed(2);
      //显示+号的    充值、本金收益、回款
      if (data.list[i].status !== '1' && data.list[i].status !== '2') {//成功状态
        if ([2, 5, 6, 10, 11, 12].indexOf(parseFloat(data.list[i].option_type)) > -1) {
          data.list[i].operation_amount = '+' + data.list[i].operation_amount;
        }//显示-号的  出借、提现、手续费
        else if ([1, 3, 4, 9, 13].indexOf(parseFloat(data.list[i].option_type)) > -1) {
          data.list[i].operation_amount = '-' + data.list[i].operation_amount;
        }
      }
      if (data.list[i].option_type == 30) {//提现资金冻结
        data.list[i].bg_num = 7;
        data.list[i].option_type = payTypeArr[7];
      } else {
        data.list[i].bg_num = data.list[i].option_type;
        data.list[i].option_type = payTypeArr[parseInt(data.list[i].option_type, 10)];
      }
    }

    data.list[i].create_reldate = (data.list[i].create_date.split(":")[0] + ":" + data.list[i].create_date.split(":")[1]).substring(5);
    data.list[i].create_date = data.list[i].create_date;



    //资金类型
    //成功失败 0-success
    //  data.list[i].status = data.list[i].status == 0;

    //添加月份条
    if (lastDate !== date && data.list[i].create_date.substr(0, 7) === date) {
      lastDate = date;
      data.list[i].dateTag = '本月';
    }
    else if (lastDate !== data.list[i].create_date.substr(0, 7)) {
      lastDate = data.list[i].create_date.substr(0, 7);
      if (year !== data.list[i].create_date.substr(0, 4)) {//年份切换
        data.list[i].dateTag = data.list[i].create_date.substr(0, 4) + '年' + data.list[i].create_date.substr(5, 2) + '月';
      }
      else {//月份切换
        data.list[i].dateTag = data.list[i].create_date.substr(5, 2) + '月';
      }
    }
  }

  $box
    .append(Mustache.render($('#tpl').html(), data));
  // .find('.month-tag').eq(0)
  // .addClass('fixed');

};

var addData = function (cb) {
  if (!dropDownPageOpts.enable) {
    $('.dropload-load').text('没有更多数据了');
    setTimeout(function () {
      if ($.isFunction(cb)) {
        cb();
      }
    }, 1000);
    return;
  }
  $.post(JD_CAPITAL_RECORDS, {
    version: app_data.version,
    tokenid: tokenid,
    current: dropDownPageOpts.page++
  })
    .then(function (data) {
      if (data.code !== '000') {
        tip_window(data.msg, '确定！');
        return;
      }
      if (data.hasnextpage === 'false' || (data.list && data.list.length === 0)) {
        dropDownPageOpts.enable = false;
        if (!data || (first && (data.list && data.list.length === 0))) {//没有一条数据
          dropDownPageOpts.enable = false;
          $box.append(Mustache.render($('#tpl').html(), data));
          return;
        }
        if ($.isFunction(cb)) {
          $('.dropload-load').text('没有更多数据了');
          setTimeout(function () {
            cb();
          }, 1000);
        }
      }
      first = false;
      processData(data);

      if ($.isFunction(cb)) {
        cb();
      }
    }, function (data) {
      tip_window('网络超时', '确定！');
      if ($.isFunction(cb)) {
        cb();
      }
    });
}

var dropload = $('#main').dropload({
  scrollArea: window,
  loadDownFn: function (me) {
    addData(function () {
      me.resetload();
    });
  }
});
dropload.unlock();

if (tokenid != null) {
  addData(function () { });
}



