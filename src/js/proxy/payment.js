// 'use strict';
/**
 * 
 */
(function () {
  var payRequestResult = JSON.parse(window.localStorage.getItem('payRequestResult'));
  if (payRequestResult == null) {
    window.location.href = 'index.html';
    return;
  }
  delete payRequestResult.version;
  // 更新余额
  ajax({
    url: PROXYASSETSDETAIL_JSON_URL,
    async: false,
    cb: function (data) {
      payRequestResult.balance = data.balance;
    }
  })
  //上一页的订单信息
  $('#trade_id').val(payRequestResult.trade_id);
  $('#orderInfo').text(payRequestResult.product_info || '数据异常');
  $('#trade_amount').text(parseFloat(payRequestResult.trade_amount).toFixed(2) + '元' || '数据异常');
  $('#pay_amount').text(parseFloat(payRequestResult.pay_amount).toFixed(2) + '元' || '数据异常');
  $('#js_balance').text((parseFloat(payRequestResult.balance).toFixed(2) || 0) + '元');
  //有默认银行卡
  if (payRequestResult.defaultBankInfo || app.selectCard) {
    var card = payRequestResult.defaultBankInfo || app.selectCard;
    $('#js_val_quick').val(card.bank_id);
    $('#js_text_quick').text(card.bank_name);
    $('#js_limit_quick').text(parseFloat(card.recharge_high_limit).toFixed(2));
    $('#js_bank_num_quick').text(card.bank_num);
  }
  else {
    //展开银行卡选择  为了添加新卡
  }
  if (payRequestResult.balance > 0) {//"0"
    $('.radio').eq(0).addClass('active');
    $('[name="payway"]')[0].checked = true;
  } else {
    $('.js-drop-down.js-radio').children('.radio').addClass('active');
    $('[name="payway"]')[1].checked = true;
  }

  $('#listDropDown').on('click', 'ul>li', function () {
    $('#listDropDown').removeClass('active');
    $('.js-drop-down').removeClass('active');
    $('.js-drop-down').find('.arrow-right').removeClass('active');

    var json = $(this).data('json');
    if (json) {
      app.selectCard = json;
      $('#js_val_quick').val(app.selectCard.bank_id);
      $('#js_text_quick').text(app.selectCard.bank_name);
      $('#js_bank_num_quick').text(app.selectCard.bank_num);
      $('#js_limit_quick').text(parseFloat(app.selectCard.recharge_high_limit).toFixed(2));
    } else {
      // if ($(this).children('#toAddCard').length === 1) {
      //   location.href = 'account_charge.html?type=0';
      // }
    }
  });

  app.method.addCheckCode({
    cb: function (val, method) {
      method.hide();
    }
  });
  var btnGetCheckCode = $('#getCheckCode');

  function balancePay(data) {
    if (parseFloat(payRequestResult.balance) < parseFloat(payRequestResult.pay_amount)) {
      tip_window("余额不足，请选择快捷支付", '确定');
      return false;
    }

    ajax({
      url: PROXY_BLANCE_PAY_URL,
      data: data,
      cb: function (_data) {

        $('#tel-span').text(tel_no.substr(0, 3) + '****' + tel_no.substr(-4));

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
              url: PROXY_BLANCE_PAY_URL,
              async: false,
              data: data,
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
                trade_pwd: _data.trade_pwd,
                trade_id: data.trade_id,
                sms_code: code,
                confirm_type: '3'
              },
              cb: function (data2) {
                window.localStorage.setItem('zj_trade', data.trade_id)
                window.location.href = 'obj_invest_success.html?zj=1';
              }
            })
          });

      }
    });
  }

  function quickPay(_data) {
    _data.term_info = 'null_MAC/null_SIM';
    _data.term_type = 'wap';
    _data.oper_type = '2';
    ajax({
      url: PROXY_PAY_CHECKCODE_URL,
      data: _data,
      cb: function (data) {

        $('#tel-span').text(app.selectCard.rese_mobile.substr(0, 3) + '****' + app.selectCard.rese_mobile.substr(-4));

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
              url: PROXY_PAY_CODEREPLAY_URL,
              async: false,
              data: {
                operation_id: data.order_no,
                operation_type: '2',
                bank_code: data.bank_code
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
                trade_pwd: _data.trade_pwd,
                trade_id: data.order_no,
                sms_code: code,
                confirm_type: '2',
                bank_code: data.bank_code,
              },
              cb: function (data2) {
                window.localStorage.setItem('zj_trade', data.order_no)
                window.location.href = 'obj_invest_success.html?zj=1';
              }
            })
          });
      }
    });

  }

  // 提交
  var process = _.debounce(function (from) {
    var data = form2json($(from));
    data.trade_pwd = '';
    $('#openKeyboard').children('input').each(function (index, item) {
      data.trade_pwd += item.value;
    });
    if (!data.payway) {
      tip_window("请选择支付方式", '确定');
      return false;
    }
    if (data.trade_pwd.length < 6) {
      tip_window("请输入正确的交易密码", '确定');
      return false;
    }
    else {
      data.trade_pwd = hex_md5(data.trade_pwd);
    }

    // ajax({
    //   url:
    // })
    if (data.payway === '0') {
      delete data.payway;
      delete data.bank_id;
      balancePay(data);
    }
    else {
      delete data.payway;
      if ($.trim(data.bank_id) === '') {
        tip_window("请您添加银行卡", '确定');
        $('.js-drop-down.js-radio').trigger('click');
        return false;
      }
      if (parseFloat(payRequestResult.pay_amount) > app.selectCard.recharge_high_limit) {
        tip_window("支付金额大于该卡支付限额", '确定');
        return false;
      }
      quickPay(data);
    }

    return false;
  }, 400);
  $('#form').on('submit', function () {
    process(this);
    return false;
  });
})();
