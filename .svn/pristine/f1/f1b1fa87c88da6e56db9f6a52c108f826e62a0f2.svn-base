/*
 @  根据hash判断显示是首次还是非首次
 @  初始化短信弹窗，非首次初始化信息
 @  type:0首充
*/    
var defaultFirstInfo = null;
function changeDiaplay() {
  if (getQueryString('type') == '0') {
    $("#J_Charge").removeClass("show").addClass("hide");
    $("#J_firstCharge").removeClass("hide").addClass("show");
    // url跳转取值
    if (getQueryString('amount') !== null) { $("#J_chargeNum").html((+getQueryString('amount')).toFixed(2) + "元").attr("amount", (+getQueryString('amount')).toFixed(2)) };
    // 支付页面跳转,localstorage取值
    if (window.localStorage.getItem("payRequestResult") && document.referrer.indexOf("account_payment.html") > -1) {
      $("#J_chargeNum").html(JSON.parse(window.localStorage.getItem("payRequestResult")).pay_amount + "元").attr("amount", JSON.parse(window.localStorage.getItem("payRequestResult")).pay_amount)
    };
    firstChargeInint();
  } else if (getQueryString('type') == '1') {
    $("#J_Charge").removeClass("hide").addClass("show");
    $("#J_firstCharge").removeClass("show").addClass("hide");
    // chargeInit();
  }
  app.method.addCheckCode();
};
changeDiaplay();

/*
  @ 非首次页面数据准备
*/
function chargeInit() {
  ajax({
    url: PROXY_RECHARGE_INIT_URL,
    data: {
      version: app_data.version,
      tokenid: getCookie("tokenid")
    },
    cb: function (data) {
      if (data.code == "000") {
        var defaultBankInfo = data.defaultBankInfo;//展示默认信息
        if(defaultBankInfo.bank_name){
          $("#J_bankName").html(defaultBankInfo.bank_name).attr({
            "bankId": defaultBankInfo.bank_id,
            "mobile": defaultBankInfo.rese_mobile
          });
        }else if(defaultFirstInfo){
          $("#J_bankName").html(defaultFirstInfo.bank_name).attr({
            "bankId": defaultFirstInfo.bank_id,
            "mobile": defaultFirstInfo.rese_mobile
          });
        }
        
        $("#J_accountLeft").html(parseFloat(data.balance).toFixed(2) + "元");
        $(".bank-number").html(defaultBankInfo.bank_num?defaultBankInfo.bank_num.substr(defaultBankInfo.bank_num.length - 8, 8):defaultFirstInfo.bank_num);
        $("#J_chargeMost").html((+defaultBankInfo.recharge_high_limit).toFixed(2) + "元").attr("chargeMax", defaultBankInfo.recharge_high_limit);
        $("#J_chargeStart").attr("placeholder", (+data.recharge_min).toFixed(2) + "元起充").attr("chargeMin", data.recharge_min);
        
      } else {
        //
      }
    }
  })
}
/*
  姓名脱敏
*/
function nameData(str) {
  var x = "";
  for (var i = 0; i < str.length - 1; i++) {
    x += "*";
  }
  return x + str.substr(str.length - 1)
}
/*
  @ 首次页面数据准备
*/
function firstChargeInint() {
  //首次充值页面取余额
  ajax({
    url: PROXYASSETSDETAIL_JSON_URL,
    data: {
      version: app_data.version,
      tokenid: getCookie("tokenid")
    },
    cb: function (data) {
      if (data.code == "000") {
        $("#J_chargeBalance").html(parseFloat(data.balance).toFixed(2))
        if (data.idNum && data.name) {
          $("#J_idVal").val('****' + data.idNum.substr(data.idNum.length - 4, 4)).attr({
            "readonly": "readonly",
            "idNum": data.idNum
          })
          $("#J_nameVal").val(nameData(data.name)).attr({
            "readonly": "readonly",
            "name": data.name
          })
        } else {
          //新用户，手动输入身份证号姓名
        }
      }
    }
  })
}
/* 
 @ 点击选择用户银行卡
*/
$('#listDropDown').on('click', 'ul>li', function () {
  $('#listDropDown').removeClass('active');
  $('.js-drop-down').removeClass('active');
  $('.js-drop-down').find('.arrow-right').removeClass('active');
  $("#J_bankName").html($(this).attr("bankname")).attr({
    "bankId": $(this).attr("bankId"),
    "mobile": $(this).attr("mobile")
  });
  if ($(this).attr("chargeMost")) {
    $("#J_chargeMost").html($(this).attr("chargeMost") + ".00元").attr({
      "chargemax": $(this).attr("chargeMost")
    });
  };
  $(".bank-number").html($(this).attr("bankNumber"));
});

/*
@ 读取用户拥有的银行卡列表
*/
function readCard(data) {
  var bankList = data.list;
  var bankArr = [];
  for (var i = 0; i < data.list.length; i++) {
    bankArr.push('<li bankName="' + data.list[i].bank_name + '" bankId="' + data.list[i].bank_id + '" chargeMost="' + data.list[i].recharge_high_limit + '" mobile="' + data.list[i].rese_mobile + '" bankNumber="' + data.list[i].bank_num.substr(data.list[i].bank_num.length - 8, 8) + '"> \
              <img src="images/backlogo/'+ data.list[i].bank_code + '.png" alt=""> \
              <span>'+ data.list[i].bank_name + '(' + data.list[i].bank_num.substr(data.list[i].bank_num.length - 4, 4) + ')</span> \
            </li>')
  }
  $("#J_userBankList").prepend(bankArr.join(""));
}
ajax({
  url: BANK_LIST_URL,
  data: {
    version: app_data.version,
    current: 1,
    cardType: 3,
    tokenid: getCookie("tokenid")
  },
  dataType: "JSON",
  cb: function (data) {
    if (data.code == "000") {
      readCard(data);
      if(data.list.constructor == Array && data.list.length>0){
        defaultFirstInfo = data.list[0];
      }
      if (getQueryString('type') == '1') {
        chargeInit();
      }
    }
  }
})
/*
  @ 点击绑定银行卡，走首次充值逻辑
*/
$("#J_addCard").click(function () {
  var chargeAmount = $(".charge_start").val();
  if (chargeAmount == "") { tip_window('请输入充值金额', '取消'); return }
  if (isNaN(+chargeAmount)) { tip_window('充值金额不正确', '取消'); return }
  if (chargeAmount < parseFloat($("#J_chargeStart").attr("chargeMin"))) { tip_window('您输入的金额小于最低充值金额', '取消'); return }
  window.location.href = 'account_charge.html?type=0&amount=' + $(".charge_start").val();
})
/*
  @ 用户填写金额校验
*/
$("#J_chargeStart").keyup(function () {
  if (isNaN(+$("#J_chargeStart").val())) { tip_window("输入金额格式不正确，请重新输入", "取消") }
  judge_decimal('#J_chargeStart');
})
/*
 @ 格式化银行卡号
*/
$("#J_cardVal").on("input",function(){
  formatCard($(this),$(this).val())
})
/*
  @ charge充值方法 firstCharge非首次充值方法
  @ 点击确认统一验证表单
*/
function charge() {
  // 金额校验
  var amount = $("#J_chargeStart").val();
  var trdPas = "";
  $('#openKeyboard').children('input').each(function (index, item) {
    trdPas += item.value;
  });
  if (amount == "") { tip_window('请输入充值金额', '取消'); return }
  if (isNaN(+amount)) { tip_window('充值金额不正确', '取消'); return }
  if (amount < parseFloat($("#J_chargeStart").attr("chargeMin"))) { tip_window('您输入的金额小于最低充值金额', '取消'); return }
  if (amount > parseFloat($("#J_chargeMost").attr("chargeMax"))) { tip_window('您输入的金额大于最高充值金额，请输入小于' + $("#J_chargeMost").attr("chargeMax") + '元的金额', '取消'); return }
  if (amount == "" || isNaN(+amount)) { tip_window('充值金额不正确', '取消'); return }
  if (trdPas == "") { tip_window('请输入交易密码', '取消'); return }
  if (trdPas.length !== 6) { tip_window('请输入正确的交易密码', '取消'); return }
  //未完成
  ajax({
    url: PROXY_PAY_CHECKCODE_URL,
    data: {
      tokenid: getCookie("tokenid"),
      bank_id: $("#J_bankName").attr("bankid"),
      term_type: "wap",
      term_info: "null_MAC/null_SIM",
      oper_type: "1",
      amount: amount,
      trade_pwd: hex_md5(trdPas)
    },
    cb: function (data) {
      if (data.code == "000") {
        $("#tel-span").html($("#J_bankName").attr("mobile").substr(0, 3) + "****" + $("#J_bankName").attr("mobile").substr(7));
        app.method.addCheckCode('show'); //显示短信验证码
        $("#getCheckCode").click();
        localStorage.setItem("order_id", data.order_no);
        localStorage.setItem("bank_code", data.bank_code);
      }
    }
  })

}
function firstCharge() {
  var idVal = $("#J_idVal").attr("idnum") || $("#J_idVal").val(),
    nameVal = $("#J_nameVal").attr("name") || $("#J_nameVal").val(),
    cardVal = removeSpace($("#J_cardVal").val()),
    telVal = $("#J_telVal").val(),
    trdPas = "";
  $('#openKeyboard').children('input').each(function (index, item) {
    trdPas += item.value;
  });
  if (!tools.validate.IDCard(idVal)) { tip_window('请输入正确的身份证号', '取消'); return }
  if (!tools.validate.name(nameVal)) { tip_window('请输入正确的姓名', '取消'); return }
  if (!tools.validate.bankCard(cardVal)) { tip_window('请输入正确的银行卡号', '取消'); return }
  if (!tools.validate.mobile(telVal)) { tip_window('请输入正确的手机号', '取消'); return }
  if (trdPas == "") { tip_window('请输入交易密码', '取消'); return }
  if (trdPas.length !== 6) { tip_window('请输入正确的交易密码', '取消'); return }
  var firstChargeData = {
    version: app_data.version,
    tokenid: getCookie("tokenid"),
    rese_mobile: telVal,                //预留手机号
    card_no: cardVal,                   //银行卡
    term_type: "wap",                   //来源-wap
    term_info: "null_MAC/null_SIM",     //设备信息
    trade_pwd: hex_md5(trdPas),         //交易密码
    accont_name: nameVal,               //姓名
    id_num: idVal                       //身份证
  }
  //操作类型、金额、trade_id传值判断
  if (getQueryString('amount') !== null) {
    firstChargeData.oper_type = "1";
    firstChargeData.amount = $("#J_chargeNum").attr("amount");
  } else {
    firstChargeData.oper_type = "2";
    firstChargeData.trade_id = JSON.parse(window.localStorage.getItem("payRequestResult")).trade_id;
  }
  ajax({
    url: PROXY_RECHARGE_CHECKCODE_URL,
    data: firstChargeData,
    cb: function (data) {
      if (data.code == "000") {
        $("#tel-span").html($("#J_telVal").val().substr(0, 3) + "****" + $("#J_telVal").val().substr(7));
        app.method.addCheckCode('show');
        $("#getCheckCode").click();
        localStorage.setItem("order_id", data.order_no);
        localStorage.setItem("bank_code", data.bank_code);
      }
    }
  })
}
/*
  @ 短信验证码倒计时
  @ 重发短信验证码
*/
countdown({
  dom: "#getCheckCode",
  preDoing: function () {
    if ($("#getCheckCode").attr("data-first") == "1") {
      $("#getCheckCode").attr("data-first", "0");
      return true;
    } else {
      var operation_type = (window.localStorage.getItem("payRequestResult") && document.referrer.indexOf("account_payment.html") > -1) ? "2" : "1"
      ajax({
        url: PROXY_PAY_CODEREPLAY_URL,
        async: false,
        data: {
          tokenid: getCookie("tokenid"),
          operation_id: localStorage.getItem("order_id"),
          operation_type: operation_type,
          bank_code: localStorage.getItem("bank_code")
        },
        cb: function (data) {
          if (data.code == "000") {
            // 重发短信验证码,重新设置order_no
            if (data.order_no) {
              localStorage.setItem("order_id", data.order_no);
            }
            return true;
          } else {
            tip_window(result_msg, "取消");
            return false;
          }
        }
      })
    }
  },
  cancel: function () {
    $("#getCheckCode").attr("data-first", "1");
  }
})

//点击确认签约，发送短信验证码
var process = _.debounce(function () {
  if (getQueryString('type') == '0') {
    firstCharge();
  } else {
    charge();
  }
}, 400);
$("#submit").click(process)
/*
 @ 弹出短信验证码 点击确认 确认支付/payconfirm.json接口
 @ 需要区别类型 充值/充值购买
*/
$("#confirm").click(function () {
  trdPas = "";
  $('#openKeyboard').children('input').each(function (index, item) {
    trdPas += item.value;
  });
  var confirm_type = (window.localStorage.getItem("payRequestResult") && document.referrer.indexOf("account_payment.html") > -1) ? "2" : "1";
  if ($("#code-input").val() == "") { tip_window('请输入短信验证码', '确定'); return }
  ajax({
    url: PROXY_PAY_COFIRM_URL,
    data: {
      tokenid: getCookie("tokenid"),
      trade_pwd: hex_md5(trdPas),
      trade_id: localStorage.getItem("order_id"),
      sms_code: $("#code-input").val(),
      confirm_type: confirm_type
    },
    cb: function (data) {
      if (data.code == "000") {
        app.method.addCheckCode('hide');
        var redirect = sessionStorage.getItem('redirect');
        if (redirect) {//购买页时添加 充值优化，回退到支付页
          
          tools.dialog({
            title:'提示',
            content:'充值成功',
            align:'center',
            btn:['继续出借'],
            cb:[redirect]
          })
          $('.dialog-bottom>input').css({'margin-left':"-8px"})
          console.log($('.dialog-bottom>input').size)
        } else if(confirm_type == 2){
          window.localStorage.setItem('zj_trade', data.order_no || localStorage.getItem("order_id"));
          window.location.href = 'obj_invest_success.html?zj=1';
        }else{//正常充值入口
          tip_windows_conform('充值成功', '返回我的首页', '去出借', 'myWealth.html', 'index.html');
        }
      } else {
        $("#code-input").val("");
        tip_window(data.result_msg, "取消")
      }
    }
  })
})