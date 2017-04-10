/**
 *
 */
var tokenid = getCookie("tokenid");
var showJd = getQueryString('jd') === '1';//是否金盾
var quest_url = showJd ? QUERY_DEPOSITORY : PROXYQUERYACCOUNT_JSON_URL;
//授权-中金
//授权-金盾
function jd_authorize(){
  location.href='jd_authorization.html';
}

function authorize(){
  if(showJd){
    jd_authorize();
  }
}

$(function () {
  if (checkLogin() === false) {
    return false;
  }
  $.post(quest_url, {
    version: app_data.version,
    tokenid: tokenid
  }).then(function (data) {
    if (data.code !== '000') {
      tip_window(data.msg, '确定');
      return;
    }
    if(data.plat_trapwd_status=='0'){//Me账户设置交易密码
      data.hastrade=false;
    }else{
      data.hastrade=true;
    }
    data.authorize_status = data.authorize_status === '1';
    if (data.authorize_status) {
      data.authorize_status_txt = '已授权';
    }
    else {
      data.authorize_status_txt = '未授权';
    }
    if(data.is_debtSell == '1'){
      data.is_debtSell = true;
    }else{
      data.is_debtSell = false;
    }
    if (showJd) {
      data.temp2 = data.temp2.replace(/^(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4 ');
      var result = Mustache.render($('#jdTpl').html(), data);
      if(data.id_number){
        $.post(BANK_LIST_URL,{
          version: app_data.version,
          tokenid: tokenid,
          cardType:2,
          current: 1
        }).then(function (data) {
          if (data.code !== '000') {
            tip_window(data.msg, '确定！');
            return;
          }
          window.localStorage.setItem('jd-Account-Cards',JSON.stringify(data.list));
          $(document.body).append(result);
          $('#jdtransfer').click(function(){//转让授权先判断有没有设置交易密码
                ajax({
                url:JD_GET_DETAIL_URL,
                async:false,
                cb:function(data){
                  if(data.temp5 == '' || data.temp5 ==null){
                    tip_windows_conform('对不起，您还未设置交易密码，请先设置。。', '去设置', '取消', '', '', 'window.goTradingPwd()');
                  }else{
                    window.jd_transfer()
                  }
                }
              })
          })
        })
      }
      else{
        $(document.body).append(result);
      }
      $('title,.header>span').text('存管账号');
      
    }
    else {
      var result = Mustache.render($('#zhTpl').html(), data);
      $(document.body).append(result);
      $('title,.header>span').text('Me账户');
    }
  }, function (data) {
    tip_window('网络错误，请重试', '确定');
  });

});