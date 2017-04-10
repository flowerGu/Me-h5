// 'use strict';
/**
 * 提现（首次 非首次）
 */

app.method.addSubbranch();
app.method.addAddress('.js-province,.js-citiy', function (data) {
  $('.js-bank-address').val(data);
});

var max_amount = Infinity;//平台最大提现金额 （非首次提现用到）

// 是否首次判断
var first = getQueryString('first') === '1';
if (first) {
  var info = window.sessionStorage.getItem('proxy-withdraw');
  if (info === null) {
    window.location.href = 'assets.html';
    //return;
  }
  ajax({
    url: PROXYASSETSDETAIL_JSON_URL,
    cb: function (data) {
      if (data.idNum && data.name) {
        $('#js_id_num').val(data.idNum);
        $('#js_account_name').val(data.name);

        $('#id_num')
          .val('****' + data.idNum.substr(-4))
          .attr('readonly', 'readonly')
          .removeAttr('name');

        $('#account_name')
          .val('*'.repeat(data.name.length - 1) + data.name.substr(-1))
          .attr('readonly', 'readonly')
          .removeAttr('name');
      }
    }
  });

  info = JSON.parse(info);
  $('#js-val-amount').val(info.val);
  $('.js-amount').text(info.val);
  if (info.chan_limit_amount) {
    max_amount = +info.chan_limit_amount;
  }

  app.method.addSubbranch();
  $('#js_first_widthdraw')[0].className = 'show';
  //当前页面点击添加卡 跳转来的
  if (info.balance === -1) {
    ajax({
      url: PROXY_WITHDRAW_COMMON_INFO_URL,
      async: false,
      cb: function (data) {
        $('#js_balance').text(data.balance + '元');
        info.chan_limit_amount = data.chan_limit_amount;
        info.max_amount = data.max_amount;
      }
    });
  }
  else {
    $('#js_balance').text(info.balance + '元');
  }
  //判断大额
  info.chan_limit_amount = parseFloat(info.chan_limit_amount);
  info.max_amount = parseFloat(info.max_amount);
  if (!isNaN(info.chan_limit_amount) && !isNaN(info.max_amount)) {
    max_amount = Math.min(info.chan_limit_amount, info.max_amount);
  }
  else if (!isNaN(info.chan_limit_amount)) {
    max_amount = info.chan_limit_amount;
  }
  else if (!isNaN(info.max_amount)) {
    max_amount = info.max_amount;
  }
  $("#card_no").on("input",function(){
    formatCard($(this),$(this).val())
  })
}
else {
  var widthdraw_start = $('#js_val_widthdraw_start');
  var real_account = $('#js_real_account');
  var js_widthdraw = $('#js_widthdraw_money');
  var fee = 0;
  var balance = 0;

  //选择银行卡事件
  var $bankList = $('#listDropDown');
  $bankList.on('click', 'ul>li', function () {
    $bankList.removeClass('active');
    $bankList.siblings('.js-drop-down').removeClass('active');
    $bankList.siblings('.js-drop-down').find('.arrow-right').removeClass('active');
    var _this = $(this);
    if (_this.hasClass('js-add-new-card')) {
      var money = $('#widthdraw_amount').val().trim();
      if (money === '') {
        tip_window("请先输入提现金额", '确定');
        return false;
      }
      if (isNaN(parseFloat(money))) {
        tip_window("提现金额格式错误", '确定');
        return false;
      }
      window.sessionStorage.setItem('proxy-withdraw', JSON.stringify({
        val: money,
        balance: -1
      }));
      location.href = 'account_withdraw.html?first=1'
    }
    else {
      app.selectCard = _this.data('json');
      $('#js_val_quick').val(app.selectCard.bank_id);
      $('#js_bank_name_quick').text(app.selectCard.bank_name);
      $('#js_bank_num_quick').text(app.selectCard.bank_num);
      $('#js_limit_quick').text(Math.min(+app.selectCard.withd_high_limit, +max_amount).toFixed(2));
      $('#js_val_widthdraw_start').text(parseFloat(app.selectCard.withd_low_limit).toFixed(2));
    }

  });
  //非首次提现 准备
  ajax({
    url: PROXY_WITHDRAW_INIT_URL,
    async: false,
    cb: function (data) {
      balance = data.balance;
      data.max_amount = parseFloat(data.max_amount);
      data.chan_limit_amount = parseFloat(data.chan_limit_amount);
      if (!isNaN(data.max_amount)) {
        max_amount = Math.min(data.max_amount, max_amount);
      }
      if (!isNaN(data.chan_limit_amount)) {
        max_amount = Math.min(data.chan_limit_amount, max_amount);
      }

      $('#prompt_lan').text(data.prompt_lan);
      fee = parseFloat(data.fee);
      $('#fee').text(fee.toFixed(2));

      if (data.default_bank_info) {
        app.selectCard = data.default_bank_info;
        app.selectCard.chan_limit_amount = +app.selectCard.chan_limit_amount;
        //银行卡id
        $('#js_val_quick').val(app.selectCard.bank_id);
        //最大可提
        $('#js_limit_quick').text(Math.min(+app.selectCard.withd_high_limit, +max_amount).toFixed(2));
        $('#js_bank_num_quick').text(app.selectCard.bank_num);
        $('#js_bank_name_quick').text(app.selectCard.bank_name);
        $('#js_val_widthdraw_start').text(parseFloat(app.selectCard.withd_low_limit).toFixed(2));
      }else if(defaultFirstInfo){
        $('#js_bank_name_quick').text(defaultFirstInfo.bank_name);
        $('#js_bank_num_quick').text(defaultFirstInfo.bank_num);
        $('#js_val_quick').val(defaultFirstInfo.bank_id);
        $('#js_limit_quick').text(Math.min(+defaultFirstInfo.withd_high_limit, +max_amount).toFixed(2));
        $('#js_val_widthdraw_start').text(parseFloat(defaultFirstInfo.withd_low_limit).toFixed(2));
        app.selectCard = defaultFirstInfo;
      }
    }
  });

  $('#widthdraw_amount')
    .on('input', function () {
      var val = parseFloat(this.value);
      if (isNaN(val)) {//val < fee
        js_widthdraw.text('0.00');
        real_account.text('0.00');
        return;
      }
      //大额提现
      var temp = max_amount;
      if (app.selectCard && !isNaN(parseFloat(app.selectCard.chan_limit_amount))) {
        temp = +app.selectCard.chan_limit_amount;
      }
      js_widthdraw.text(val.toFixed(2));
      real_account.text((val - fee).toFixed(2))
    })
    .trigger('input');
  $('#js_widthdraw')[0].className = 'show';
}


// 校验-首次
function first_verify(data) {
  if (!first) {
    return false;
  }
  if (!tools.validate.IDCard(data.id_num)) {
    tip_window("身份证号格式错误", '确定');
    return false;
  }
  if (!tools.validate.name(data.account_name)) {
    tip_window("姓名格式错误", '确定');
    return false;
  }
  data.card_no = tools.trimAll(data.card_no);
  if (data.card_no.length === 0) {
    tip_window("请输入银行卡号", '确定');
    return false;
  }
  if (!tools.validate.bankCard(data.card_no)) {
    tip_window("银行卡号格式错误", '确定');
    return false;
  }
  if (data.rese_mobile.length === 0) {
    tip_window("请输入预留手机号", '确定');
    return false;
  }
  if (!tools.validate.mobile(data.rese_mobile)) {
    tip_window("预留手机号格式错误", '确定');
    return false;
  }
  if (data.province === '' || data.citiy === '') {
    tip_window("请输入银行所在地信息", '确定');
    return false;
  }
  if ($.trim(data.sub_bank_name) === '') {
    tip_window("请输入银行分行", '确定');
    return false;
  }
  if ($.trim(data.branch_name) === '') {
    tip_window("请输入银行支行", '确定');
    return false;
  }
}
// 校验-非首次
function verify(data) {
  //基本没这个问题
  
  if (app.selectCard === undefined) {
    tip_window("请选择银行卡", '确定');
    return false;
  }
  if (isNaN(data.amount)) {
    tip_window("金额格式错误", '确定');
    return false;
  }
  if (+data.amount > app.selectCard.high_limit) {
    tip_window("提现金额大于该卡最大可提金额", '确定');
    return false;
  }
  if (data.province === '' || data.citiy === '') {
    tip_window("请输入银行所在地信息", '确定');
    return false;
  }
  if (data.sub_bank_name === '') {
    tip_window("请输入分行信息", '确定');
    return false;
  }
  if (data.branch_name === '') {
    tip_window("请输入支行信息", '确定');
    return false;
  }
}

// 插入短信弹框
app.method.addCheckCode({
  cb: function (val, method) {
    console.log(val);
    method.hide();
  }
});

// 
var btnGetCheckCode = $('#getCheckCode');

// process submit business
function submit_first(_data) {
  $('#tel-span').text(tel_no.substr(0, 3) + '****' + tel_no.substr(-4));
  // 提交
  ajax({
    url: PROXY_WITHDRAW_URL,
    data: _data,
    cb: function (data) {

      //显示短信输入框
      countdown({
        dom: btnGetCheckCode,
        cancel: function () {
          btnGetCheckCode.data('first', 1);
        },
        preDoing: function () {
          if (btnGetCheckCode.data('first') === 1) {
            btnGetCheckCode.data('first', 'false')
            return true;
          }
          //获取验证码
          ajax({
            url: PROXY_WITHDRAW_SMS_URL,
            async: false,
            data: {
              type: 31,
              trade_id: data.apply_serialno,
              phone_number: tel_no
            },
            cb: function () {
              return true;
            },
            err: function () {
              return false;
            }
          });
        }

      });

      app.method.addCheckCode('show');
      btnGetCheckCode.trigger('click');

      // 短信弹框的确认按钮
      $('#form_checkcode')
        .find('.sendconfirm')
        .off('click')
        .on('click', function () {
          var code = $('#form_checkcode').find('#code-input').val().trim();
          if (code === '') {
            tip_window("请输入短信验证码", '确定');
            return false;
          }
          ajax({
            url: PROXY_PAY_COFIRM_URL,
            data: {
              trade_pwd: data.trade_pwd,
              trade_id: data.apply_serialno,
              sms_code: code,
              confirm_type: '4'
            },
            cb: function (data) {
              window.sessionStorage.removeItem('proxy-withdraw');
              app.method.addCheckCode('hide');
              tip_windows_conform('提现成功', '返回我的', '去看看', 'myWealth.html', 'record.html');
            }
          })
        });
    }
  });
}
function submit_other(_data) {
  if (_data.amount < +app.selectCard.withd_low_limit) {
    tip_window("您输入的金额小于最低提现金额", '确定');
    return false;
  }
  if (_data.amount > Math.min(+app.selectCard.withd_high_limit, +max_amount)) {
    tip_window("您输入的金额大于最大可提现金额", '确定');
    return false;
  }
  
  $('#tel-span').text(app.selectCard.rese_mobile.substr(0, 3) + '****' + app.selectCard.rese_mobile.substr(-4));
  ajax({
    url: PROXY_WITHDRAW_URL,
    data: _data,
    cb: function (data) {
      //显示短信输入框
      countdown({
        dom: btnGetCheckCode,
        cancel: function () {
          btnGetCheckCode.data('first', 1);
        },
        preDoing: function () {
          if (btnGetCheckCode.data('first') === 1) {
            btnGetCheckCode.data('first', 'false');
            return true;
          }
          //获取验证码
          ajax({
            url: PROXY_WITHDRAW_SMS_URL,
            async: false,
            data: {
              type: 31,
              trade_id: data.apply_serialno
            },
            cb: function () {
              return true;
            },
            err: function () {
              return false;
            }
          });

        }
      });

      app.method.addCheckCode('show');
      btnGetCheckCode.trigger('click');

      // 短信弹框的确认按钮
      $('#form_checkcode')
        .find('.sendconfirm')
        .off('click')
        .on('click', function () {
          var code = $('#form_checkcode').find('#code-input').val().trim();
          if (code === '') {
            tip_window("请输入短信验证码", '确定');
            return false;
          }
          ajax({
            url: PROXY_PAY_COFIRM_URL,
            data: {
              trade_pwd: data.trade_pwd,
              trade_id: data.apply_serialno,
              sms_code: code,
              confirm_type: '4',
              bank_id: app.selectCard.bank_id
            },
            cb: function (data) {
              app.method.addCheckCode('hide');
              tip_windows_conform('提现成功', '返回我的', '去看看', 'myWealth.html', 'record.html');
            }
          })
        });
    }
  });
}


// 提交
var process = _.debounce(function () {
  var data = form2json($(this));
  data.trade_pwd = '';
  $('#openKeyboard').children('input').each(function (index, item) {
    data.trade_pwd += item.value;
  });

  // 去空格
  data.sub_bank_name = $.trim(data.sub_bank_name);
  data.branch_name = $.trim(data.sub_bank_name);

  if (first) {
    data = $.extend(data, form2json('#js_first_widthdraw'));
    data.amount = $.trim(data.amount);
    data.amount = parseFloat(data.amount);

    if (first_verify(data) === false) {
      return false;
    }
  } else {
    data = $.extend(data, form2json('#js_widthdraw'));
    data.amount = $.trim(data.amount);
    if (data.amount === '') {
      tip_window("请输入提现金额", '确定');
      return false;
    }
    data.amount = parseFloat(data.amount);

    if (verify(data) === false) {
      return false;
    }
    data.bank_code = app.selectCard.bank_code;
  }
  if (data.trade_pwd.length < 6) {
    tip_window("请输入交易密码", '确定');
    return false;
  }
  data.trade_pwd = hex_md5(data.trade_pwd);

  first ? submit_first(data) : submit_other(data);
  return false;
}, 400);
$('#common').on('submit', function () {
  process();
  return false;
});

