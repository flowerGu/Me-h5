/*
*-------------待完成
* 1.分通道切换显示联行行号
* 2.判断是否已经有联行行号
* 3.提现方法添加联行行号
* 4.封装弹框方法
*/

checkLogin();

var tokenid = getCookie("tokenid");
var telephone = getCookie("tel_no");
var isBandData = JSON.parse(localStorage.getItem("isBandData"));
var userData = JSON.parse(localStorage.getItem("user_detail"));
var balance = userData.jd_balance.length > 0 ? parseFloat(userData.jd_balance) : 0; //余额
var withdraw_hand_cost;
var jdQuota = {}; //江西限额
var dom_money;
var ti_cost;
var cnaps_isvalid = null;

$(function () {

  if (!userData.temp4) { //没开户
    tip_window('您还没有开通银行存管，请开通存管账户。', '去开户', userData.realname_status === '0' ? 'idVerifi.html' : 'openAnAccount.html');
    return;
  }
  if (!userData.temp5) { //没有交易密码
    tip_windows_conform('对不起，您还未设置交易密码，请先设置。', '去设置', '取消', '', '', 'window.goTradingPwd()');
    return;
  }
  if (getQueryString('jd') !== null) {
    tip_windows_conform('提现完成，快点去查看吧', '返回我的账户', '去看看', 'myWealth.html', 'record.html');
  }
  initbodyH();
  dom_money = $('#invitation');
  dom_money.on('input', function () {
    judge_decimal('#invitation');
    ti_actual();
  });

  $('#tel-span').text(telephone.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1****$3'));

  countdown({
    dom: $('#getCheckCode'),
    preDoing: function () {
      ajax({
        url: TOPAYJXCHECKCODE_JSON_URL,
        data: {
          version: app_data.version,
          tokenid: tokenid,
          phone_number: telephone,
          type: 21
        },
        cb: function () {
          //获取短信验证码成功
        }
      })
      return true;
    }
  });

  //var withdrawal_amount =getCookie('withdrawal_amount');
  var ti_low;

  var infact_account;
  var tokenid = getCookie('tokenid');

  ajax({
    url: JD_GETAMTLIMIT_URL,
    data: {
      version: app_data.version,
      tokenid: tokenid,
      pay_channel: 3,
      way: 2
    },
    cb: function (data) {
      window.localStorage.setItem("bankName", data.list[0].bank_name)
      //江西银行只绑一张卡
      jdQuota = data.list[0];
      ti_low = jdQuota.withdraw_low;
      withdraw_hand_cost = jdQuota.withdraw_hand_cost;
      ti_cost = jdQuota.withdraw_hand_cost.toFixed(2);
      cnaps_isvalid = data.cnaps_isvalid; // 1-有效 0-无效
      $('#myDate').text(jdQuota.payment_date);
      $('#ti_low').text(ti_low); //最低可提
      $('#widthdraw_way').text(data.withdraw_passway);
      if (jdQuota.withdraw_high > balance) {
        $('#tip-span').text(balance);
      } else {
        $('#tip-span').text(jdQuota.withdraw_high);
      }
      // 是否显示银行联行行号查询
      if (data.withdraw_passway == "银联通道") {
        $(".cnaps_show").hide();
      } else {
        if (data.bank_cnaps && cnaps_isvalid == 1) {
          $(".cnaps_show").hide();
          $("#widthdraw_cnaps").val(data.bank_cnaps);
        } else {
          $(".cnaps_show").show();
        }
      }
    }
  })

  $('#infact_ti').text(infact_account);

  //
  $('#go_tixian').on('click', function () {
    var checkcode = $('#code-input').val().trim();
    if (checkcode === '') {
      tip_window('请输入短信验证码', '确定');
      return;
    }
    withdraw(checkcode);
  });
  $('#closeDialog').on('click', function () {
    $('.bg-sendcode').fadeOut();
    $('.sendcode-wrap').fadeOut();
  })
  // 联行行号查询
  $(".code_search").click(function () {
    if ($("#invitation").val() == "") {
      window.location.href = "query_bank_branch.html";
    } else {
      window.location.href = "query_bank_branch.html?m=" + $("#invitation").val();
    }
  })
});

function ti_actual() { //即时输入页面显示金额
  var money = parseFloat(dom_money.val());
  var infact = money - jdQuota.withdraw_hand_cost;
  $('#withdrawal_amount').html(money);

  if (parseFloat(dom_money.val()) >= 2) {
    infact = infact.toFixed(3);
    infact = infact.substring(0, infact.lastIndexOf('.') + 3) // 123456.78
    $('#infact_ti').text(infact);
    $('#ti_cost').text(jdQuota.withdraw_hand_cost.toFixed(2));
  } else {
    $('#ti_cost').text('0.00');
    $('#infact_ti').text('0.00');
    $('#withdrawal_amount').text('0.00');
  }
}
// 填充金额及联行行号
if (getQueryString('m')) {
  $("#invitation").val(getQueryString('m'));
}

if (getQueryString('num')) {
  $("#widthdraw_cnaps").val(getQueryString('num'));
}
//submit
function tixian() {
  var money = dom_money.val().trim();
  if (money == '') {
    tip_window('您输入的金额小于最低提现金额', '确定');
    //dom_money.val('');
    return false;
  }
  var type_blance = parseFloat(money);
  var infact = type_blance - jdQuota.withdraw_hand_cost;
  if (type_blance > balance) {
    tip_windows_conform('您的余额不足', '去充值', '取消', 'chongzhi.html', '');
    $('#withdrawal_amount').html('0.00');
    return false;
  }
  if (type_blance < jdQuota.withdraw_low) {
    tip_window('您输入的金额小于最低提现金额', '确定');
    return false;
  }
  if (type_blance > jdQuota.withdraw_high) {
    tip_window('您输入的金额大于最高提现金额，请输入小于5000万的金额', '确定');
    return false;
  }
  if (checkOpenAccount(true, 3) < 4) {
    return false;
  }
  var withdraw_passway = $('#widthdraw_way').text();//渠道
  var widthdraw_cnaps = $('#widthdraw_cnaps').val().trim();//联行行号
  if (withdraw_passway == '人行通道' && widthdraw_cnaps == '') {
    tip_window('联行行号不能为空', '确定');
    return false;
  }
  if(withdraw_passway == '人行通道' && (widthdraw_cnaps.length != 12 || isNaN(+widthdraw_cnaps))){
    tip_window('联行行号必须为12位数字', '确定');
    return false;
  }
  tip_window_zj('提现金额：' + type_blance + '元<br>手续费：' + withdraw_hand_cost + '元<br>实际到账：' + infact + '元', '确定', '取消');
}
//提现
function withdraw(checkcode) {
  var type_blance = parseFloat(dom_money.val());
  ajax({
    url: JXYH_WITH_DRAW_URL,
    data: {
      fee: ti_cost,
      amount: type_blance,
      is_large: 0,
      checkcode: checkcode,
      bank_cnaps: $('#widthdraw_cnaps').val().trim()
    },
    cb: function (data) {
      var url = data.TARGET_URL;
      delete data.version;
      delete data.tokenid;
      delete data.code;
      delete data.msg;
      delete data.cardid;
      delete data.surename;
      delete data.nextNo;
      delete data.totalNum;
      delete data.num;
      delete data.preNo;
      delete data.TARGET_URL;
      post_yb(url, data);
    },
    dialog: function (msg, code) {
      if (code == 'PY002') { //没有实名认证
        tip_window(msg, '确定', 'my_setting.html');
      } else if (code == 'PY003') { //没有绑卡
        tip_window(msg, '确定', 'my_setting.html');
      } else if (code == 'PY007') { //没有认证
        tip_window(msg, '确定', 'my_setting.html');
      } else if (code == 'JX013') {
        $('.bg-sendcode').hide();
        $('.sendcode-wrap').hide();
        tools.restDialog({
          img: "./images/dialog_warn.png",
          text: msg
        })
      } else {
        tip_window(msg, '确定');
      }
    }
  })
}

function pre_tixian() {//显示发送验证码弹框
  $('.bg-sendcode').fadeIn();
  $('.sendcode-wrap').fadeIn();
  $('.tip_window').css('display', 'none');
  $('#backg').remove();
}

function tip_window_zj(text, btn_value1, btn_value2, url) {//提现确认框
  $("body").append("<div class=\"tip_window\" ><div><span style=\"display:block;width:100%;text-align:center;position:absolute;left:0;top:15px;\">提现确认</span></br><SPAN>" + text + "</SPAN><br/><br/><input type=\"button\" value=" + btn_value1 + " onclick=\"pre_tixian()\" style=\"width: 60px;height: 35px;margin-right:10px\" /><input type=\"button\" value=" + btn_value2 + " onclick=\"close_window('" + url + "')\" style=\"width: 60px;height: 35px;\" /></div></div><div id=\"backg\"></div>");
  $("#backg").css("display", "block");
  $(".tip_window").css("display", "block");
}
