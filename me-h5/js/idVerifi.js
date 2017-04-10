/**
 * 实名认证
 */

var tokenid = getCookie("tokenid");
var zj = getQueryString('zj') === '1';
var jd = getQueryString('jd') === '1';
var me = getQueryString('me') === '1';
var name, id_number;
if (!zj && !jd) {//没中金了，默认来源金盾
  jd = true;
}

//跳转中金
function goCICC() {
  $.post(CPCNREGISTER_JSON_URL, {
    version: app_data.version,
    tokenid: tokenid,
    userName: name,
    identificationNumber: id_number
  })
    .then(function (data) {
      if (data.code !== '000') {
        tip_window(data.msg, '确定');
        return;
      }
      post_yb(data.url, { message: data.message, signature: data.signature });
    }, function (data) {
      tip_window('网路错误,请刷新重试', '确定');
    });
}

//跳转金盾-江西
function goJD() {
  window.localStorage.setItem('data-open-JXYH-account', JSON.stringify({ name: name, id_number: id_number }));
  location.href = 'openAnAccount.html';
}

function cheackmobile() {
  var name = $("#realName").val().trim();
  var id_number = $("#id_number").val().trim().toUpperCase();
  if (tools.validate.IDCard(id_number) && tools.validate.name(name)) {
    $('.keybordWrap').hide();
    document.getElementById("submit").removeAttribute("disabled");
    $('#submit').removeClass('disable');
  } else {
    if (tools.validate.IDCard(id_number)) {
      $('.keybordWrap').hide();
    }
    $('#submit').addClass('disable');
    document.getElementById("submit").setAttribute("disabled", true);
  }
}

function next() {
  if(!me){
     $.post(CHECK_ID_NUMBER_URL, {
      version: app_data.version,
      tokenid: tokenid,
      name: name,
      id_number: id_number
    }).then(function (data) {
      if (data.code !== '000') {
        tip_window(data.msg, '确定');
        return;
      }
      if (zj) {
        window.goCICC();
      }
      else if (jd) {
        window.goJD();
      }
      else {
        tip_windows_conform('请选择渠道，请选择中金认证或江西银行认证！', '中金', '江西银行', '', '', 'window.goCICC()', 'window.goJD()');
      }
    // window.goCICC();

    }, function () {
      tip_window('网路错误', '确定');
    });
  }else{
    goMe();
  }
}
function goMe(){
  ajax({
    url:realname_pc,
    data:{
      name:name,
      idNumber:id_number
    },
    cb:function(data){
      window.location.href= document.referrer;
    }
  })
}
$(function () {
  initbodyH();
  cheackmobile();
  $('input[name=id_number]').click(function () {
    $('.keybordWrap').toggle();
  })
  $('input[name=name]').click(function () {
    $('.keybordWrap').hide()
  })
  var id = '';
  $('.keybordWrap ul li').click(function () {
    if ($(this).attr('data-type') == 'del') { //删除键
      var id_input = $('input[name=id_number]').val();
      if (id_input.length >= 1 && id_input != '') {
        id_input = id_input.substr(0, id_input.length - 1);
        $('input[name=id_number]').val(id_input)
      }
    }
    id_input = $('input[name=id_number]').val();
    if ($(this).attr('data-type') == 'num') { //数字键
      if (id_input.length >= 18) {
        return false;
      }
      id_input = id_input + ($(this).html());
      $('input[name=id_number]').val(id_input)
    }
    cheackmobile()
  });

  $('#mainForm').on('submit', function () {
    name = $("#realName").val().trim();
    id_number = $("#id_number").val().trim().toUpperCase();
    if (name == '') {
      tip_window("姓名不能为空！", '确定');
      return false;
    }
    if (id_number == '') {
      tip_window("身份证号不能为空！", '确定');
      return false;
    }
    if (!tools.validate.IDCard(id_number)) {
      tip_window("身份证号格式不对！", '确定');
      return false;
    }

    next();
    return false;
  });
});
