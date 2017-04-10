// 'use strict';
/**
 * 
 */


var tokenid = getCookie('tokenid');
var tel_no = getCookie('tel_no');
var chan_limit_amount = 0;
(function () {
  initbodyH();
  if(!tokenid){
    tip_windows_conform('未登录','登录','取消','login.html?redirect=account_withdraw_first.html','index.html');
    return;
  }
  var infact_widthdraw = $('#infact_ti');
  var balance=0;
  var ti_cost = $('#ti_cost');
  var val_low;
  var val_free = 2;
  var max_amount;//min(余额和最大值)
  // var val_max = 0;

  ajax({
    url: PROXY_WITHDRAW_COMMON_INFO_URL,
    cb: function (data) {
      max_amount = Math.min(parseFloat(data.balance),parseFloat(data.max_amount));
      $('#tip-span').text(max_amount);
      balance = data.balance;
      val_low = parseFloat(data.start_amount);
      $('#ti_low').text(val_low.toFixed(2));
      
      chan_limit_amount = +data.chan_limit_amount || 0;
      ti_cost.text(parseFloat(data.fee).toFixed(2));
      $('#myDate').text(data.describe);
      val_free = +data.fee;
    }
  });

  var txt_withdraw = $('#withdrawal_amount');
  var input_withdraw = $('#invitation');

  //归0
  function setZero(){
    
  }

  input_withdraw.on('input', function () {
    var val = parseFloat(this.value);
    if (isNaN(val)) {
      txt_withdraw.text('0');
      infact_widthdraw.text('0')
      return;
    }
    // if (val > val_max) {
    //   val = val_max;
    //   this.value = val;
    // }
    txt_withdraw.text(val.toFixed(2));
    infact_widthdraw.text((val - val_free).toFixed(2))
  });

  if(input_withdraw.val() !== ''){
    input_withdraw.trigger('input');
  }

  $('#main').on('submit', function () {
    if(val_low === undefined){
      tip_window('正在加载数据', '确定');
      return false;
    }
    var val = input_withdraw.val().trim();
    if(val === ''){
      tip_window('请输入提现金额', '确定');
      return false;
    }
    val = parseFloat(val);
    if (isNaN(val)) {
      tip_window('请输入正确的金额', '确定');
      return false;
    }
    if(val<+val_low){
      tip_window('最低提现金额' + val_low, '确定');
      return false;
    }
    if(+balance<val){
      tip_window('余额不足', '确定');
      return false;
    }
    if(val > max_amount){
      tip_window('输入的金额大于最高可提现金额', '确定');
      return false;
    }

    window.sessionStorage.setItem('proxy-withdraw',JSON.stringify({
      val:val,
      balance:balance,
      chan_limit_amount:chan_limit_amount,
      max_amount:max_amount
    }));
    window.location.href="account_withdraw.html?first=1";
    return false;
  });

})();



