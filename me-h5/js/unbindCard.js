"use strict";
checkLogin();
var type = getQueryString('type');
var telephone = getCookie('tel_no');
var tokenid = getCookie('tokenid');

// var userData = JSON.parse(window.localStorage.getItem('user_data'));
// var info = JSON.parse(window.localStorage.getItem('jd-Account-Cards'));
var info;
ajax({
  url: JD_SAFEAUTH_JSON_URL,
  async: false,
  cb: function (data) {
    info = [{
      bank_num: data.bankList[0].bank_num,
      bank_name:data.bankList[0].bank_name,
      realName: data.name,
      idNum: data.id_number,
      balance:data.balance
    }];
  }
});

$(function () {
  initbodyH(530);
  if(!tokenid){
    tip_window('您还未登录','确定');
    return false;
  }
  if ($.isArray(info) && info.length > 0) {
    info = info[0];//
    if (info.bank_num.length > 8) {
      info.bank_num = info.bank_num.substr(-8);
    }
    info.showTel = telephone.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1****$3');

    if (info.balance === '') {
      info.balance = '暂无数据';
    }
  }
  else {
    tip_window('无银行卡数据', '确定');
  }

  var tpl = document.getElementById('tpl').innerHTML;
  var result = Mustache.render(tpl, info);
  $('form').append(result);

  $('#form').on('submit', function () {
    var checkcode = $('#checkcode').val().trim();
    if(checkcode === ''){
      tip_window('请输入验证码', '确定');
      return false;
    }

    $.post(JXYH_UNBIND_CARD, {
      version: app_data.version,
      tokenid: tokenid,
      remark: $('[name="reason"]:checked').val(),
      checkcode: checkcode
    }).then(function (data) {
      if (data.code !== '000') {
        tip_window(data.msg, '确定');
        return;
      }
      window.localStorage.removeItem('jd-Account-Cards');
      tip_windows_conform('解绑成功，是否要绑定新卡？', '返回我的账户', '绑定新卡', 'my_setting.html', 'addNewCard.html');

    }, function () {
      tip_window('网路错了，稍候再试', '确定');
    });

    return false;
  });

  //JXYH_UNBIND_CARD
  //获取验证码
  countdown({
    dom: $('#send_code'),
    retryTxt: '点击重新发送',
    preDoing: function () { //倒计时条件判断
      var hasTel = typeof telephone === 'string' && telephone.length === 11;
      if (!hasTel) {
        return hasTel;
      }
      $.post(TOPAYJXCHECKCODE_JSON_URL, {
        version: app_data.version,
        tokenid: tokenid,
        phone_number: telephone,
        type: 17
      }).then(function (data) {
        if (data.code === '000') {

        }
        else {
          tip_window(data.msg, '确定');
        }
      }, function (data) {

      });

      return hasTel;
    },
    cb: function () { //倒计时结束
    }
  });
});

