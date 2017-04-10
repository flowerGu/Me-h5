$(function () {
  initbodyH(400);
  checkLogin();
  var userData = JSON.parse(window.localStorage.getItem('user_detail'));
  if (userData === null) {
    ajax({
      url: JD_GET_DETAIL_URL,
      async: false,
      cb: function (data) {
        userData = data;
        localStorage.setItem("user_detail", JSON.stringify(data));
      }
    })
  }
  var tokenid = getCookie("tokenid");
  var telphone = getCookie("tel_no");
  $('.checkboxWrap ').on('click', '#isCheck', function () {//checkbox框
    $(this).parent().toggleClass('checked');
    if ($(this).prop('checked')) {
      $('.btn-success').css('background-color',"#ff4c4c");
    } else {
      $('.btn-success').css('background-color', "rgb(159, 159, 159)");
    }
  })
  //从实名页面跳转过来的
  var data = JSON.parse(window.localStorage.getItem('data-open-JXYH-account'));
  var realName = false;
  if (data === null) {//已经实名的用户
    realName = true;
    data = JSON.parse(window.localStorage.getItem('user_data'));
    //没有从我的设置页进，而是从我的账户点击弹框直接进了来
    if (data == null) {
      $.post(JD_SAFEAUTH_JSON_URL, {
        version: app_data.version,
        tokenid: tokenid
      }).then(function (data) {
        if (data.code !== '000') {
          tip_window(data.msg, '确定');
          return;
        }
        $('#name').val(data.name);
        $('#id_number').val(data.id_number);
      }, function (data) {
        tip_window('网络错误，请刷新重试', '确定');
        return;
      });
    }

  }
  if (data !== null) {
    $('#name').val(data.name);
    $('#id_number').val(data.id_number);
  }
  $('#telephone').val(telphone.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1****$3'));

  //验证码
  countdown({
    dom: $('#btnCheckCode'),
    retryTxt: '点击重新发送',
    preDoing: function () { //倒计时条件判断
      var hasTel = typeof telphone === 'string' && telphone.length === 11;
      if (!hasTel) {
        return hasTel;
      }
      $.post(TOPAYJXCHECKCODE_JSON_URL, {
        version: app_data.version,
        tokenid: tokenid,
        phone_number: telphone,
        type: 16
      }).then(function (data) {
        if (data.code !== '000') {
          tip_window(data.msg, '确定');
        }
      }, function (data) {
        //再发一次？
      });

      return hasTel;
    },
    cb: function () { //倒计时结束
    }
  });

  //格式化银行卡号
  $("#bank_id").on("input", function () {
    formatCard($(this), $(this).val())
  })

  $('#J_open').on('click', function () {
    var _this = $(this);
    var name = $('#name').val().trim();
    var id_number = $('#id_number').val().trim().toUpperCase();
    var bank_id = tools.trimAll($('#bank_id').val());
    if (!$('#isCheck').prop('checked')) {
      return false;
    }
    if (bank_id === '') {
      tip_window("请输入银行卡！", '确定');
      return false;
    }
    if (!tools.validate.bankCard(bank_id)) {
      tip_window("银行卡格式错误！", '确定');
      return false;
    }
    ajax({
      url: JX_ACCOUNT_NEW_URL,
      data: {
        tokenid: tokenid,
        name: name,
        id_number: id_number,
        bank_id: bank_id,
        phone_number: telphone
      },
      cb: function (result) {
        var actionUrl = result.actionUrl;
          delete result.tokenid;
					delete result.version;
					delete result.code;
					delete result.msg;
					delete result.resultCode;
					delete result.result;
					delete result.actionUrl;
					delete result.nextNo;
					delete result.channel;
					delete result.num;
					delete result.preNo;
					delete result.totalNum;
					post_yb(actionUrl,result);
      }
    });
    return false;
  });
});