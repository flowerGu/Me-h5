/**
 * 设置江西银行交易密码
 * todo 成功后设置 user_detail 里面的 temp5='1'
 */

//记录来源页面
var callbackUrl=getQueryString('callbackUrl');
if(callbackUrl!==null){
  window.localStorage.setItem('back-url-trading-password',callbackUrl);
}

$(function () {
  initbodyH();
  // 不能有& 否者android 和IOS会出BUG
  // 失败 :H5_HOST+"pre_trading_password.html?jd=1"
  // 成功 :H5_HOST+"pre_trading_password.html?success=1"
  var isJdCallback=getQueryString('jd')||getQueryString('success');
  if(isJdCallback){
    var back_url=window.localStorage.getItem('back-url-trading-password')||'my_setting.html';
    window.localStorage.removeItem('back-url-trading-password');
    if(getQueryString('success')==='1'){
      var user_datail=window.localStorage.getItem('user_detail');
      if(user_datail!==null){
        user_datail.temp5='1';
        window.localStorage.setItem('user_detail',JSON.stringify(user_datail));
      }
      tip_windows_conform('设置成功，快去看看标的吧','返回','去出借',back_url,'me.html');
      return;
    }
    else if(getQueryString('jd')==='1'){
      //重试的时候 跳转当前页面，防止刷新弹框
      tip_windows_conform('设置失败，再试试吧！','返回','重试',back_url,'pre_trading_password.html');
    }
  }
  
  var tokenid;
  if(getQueryString('tokenid')){
    tokenid=getQueryString('tokenid');
  }else{
    tokenid = getCookie("tokenid")
  }
  if(!tokenid){
    tip_window('您还未登录','确定');
    return false;
  }
  var telphone = getQueryString('phoneNum') || getCookie("tel_no")||'';
  //验证码
  var requestCheckCode = function (cb) {
    $.post(TOPAYJXCHECKCODE_JSON_URL, {
      version: app_data.version,
      tokenid: tokenid,
      phone_number: telphone,
      type: 23
    }).then(function (data) {
      if (data.code !== '000') {
        tip_window(data.msg, '确定');
      }
    }, function (data) {
      cb();
    });
  };

  var cancelCheckCode = countdown({
    dom: $('#btnCheckCode'),
    retryTxt: '点击重新发送',
    preDoing: function () { //倒计时条件判断
      var hasTel = typeof telphone === 'string' && telphone.length === 11;
      if (!hasTel) {
        return hasTel;
      }
      requestCheckCode(function () {
        requestCheckCode();
      });

      return hasTel;
    }
  });

  $('#telephone').val(telphone.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1****$3'));

  $('#form').on('submit', function () {
    var _this = $(this);
    var param = form2json(_this);
    if (param.name.trim() === '') {
      tip_window('请输入姓名', '确定');
      return false;
    }
    if (param.id_number.trim() === '') {
      tip_window('请输入正确的身份证号码', '确定');
      return false;
    }
    $.post(JD_SET_TRADEPWD_URL, {
      version: app_data.version,
      tokenid: tokenid,
      name: param.name,
      id_number: param.id_number,
      checkcode: param.checkcode
    }).then(function (data) {
      if (data.code === '000') {
        var $form = $('#jumpThirdPart');
        $form.attr('action', data.TARGET_URL);
        delete data.version;
        delete data.tokenid;
        delete data.code;
        delete data.msg;
        delete data.surename;
        delete data.cardid;
        //交易密码回调URL
        //data.RESETPWD_FURL = H5_HOST + 'pre_trading_password.html?id_number=' + param.id_number + '&name=' + 
        //data.BACKGROUND_URL = H5_HOST + 'my_setting.html?success=1';//成功

        var template = $('#jumpThirdPartTpl').html();
        $form.append(Mustache.render(template, data));
        $form.submit();
      } else {
        tip_window(data.msg, '确定');
      }
    }, function (data) {
      tip_window('网路错误', '确定');
    });
    return false;
  });
});