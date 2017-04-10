$(function () {
  var dd = $(document).height();
  if (dd < 560) {
    dd = 560
  }
  $('body').css("minHeight", dd); //设置body的高度
});
$("#tel").blur(function () {
  var tel = $('#tel').val().trim();
  var re = /^[1][3-8][0-9]{9}$/;
  if (re.test(tel)) {
    $(".reg1").css("display", "block").animate({ "height": "45px" })
  }
})
// 显示滑动验证码
function showImageCode() {
  $(".slide_block").attr("data-number", function () {
    var number = "";
    for (var i = 0; i < 10; i++) {
      number += Math.floor(Math.random() * 10);
    }
    return number;
  })
  $.ajax({
    url: GETSLIDEIMGAGE,
    type: "GET",
    dataType: "JSON",
    data: {
      check_code_key: $('.slide_block').attr("data-number"),
      version: '1.0'
    },
    success: function (data) {
      $("#J_slideQuestion").attr("src", GETSLIDEQUESTION + '?check_code_key=' + $('.slide_block').attr("data-number"))
      $("#J_slideAnswer").attr("src", GETSLIDEANSWER + '?check_code_key=' + $('.slide_block').attr("data-number"))
    }
  })
}
showImageCode()
// 拖拽滑块实现图形验证码
function drag() {
  var isSupportTouch = "ontouchend" in document ? true : false;       //检测浏览器是否支持touch事件
  var startEvent = isSupportTouch ? "touchstart" : "mousedown";
  var moveEvent = isSupportTouch ? "touchmove" : "mousemove";
  var endEvent = isSupportTouch ? "touchend" : "mouseup";
  var isMove = false;
  var isX;			    			//去除left值得坐标距离
  var listX = [0, 183];    //滑块移动范围
  var isTrue = false;     //是否验证通过
  var movedX;
  var pointX = {
    "0": [0, 31],
    "1": [31, 62],
    "2": [62, 93],
    "3": [93, 124],
    "4": [124, 155],
    "5": [155, 186]
  }
  $(".slide_block").on(startEvent, function (event) {
    event.preventDefault();
    if ($(".slide_block").hasClass('isPassed')) { return }
    $(".puzz_picture_box").fadeIn()
    isMove = true;
    var pagex = isSupportTouch ? event.originalEvent.targetTouches[0].pageX : event.pageX;
    isX = pagex - parseInt($(".slide_block").css("left"));
    $(document).off(moveEvent).on(moveEvent, function (event) {
      if ($(".slide_block").hasClass('isPassed')) { return }
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
      $(".drag_text").hide();
      if (isMove) {
        var nowX = isSupportTouch ? event.originalEvent.targetTouches[0].pageX : event.pageX;
        var x = nowX - isX;
        if (x > parseInt(listX[1])) { $(".slide_block").css({ left: parseInt(listX[1]) }); return }
        if (x < parseInt(listX[0])) { $(".slide_block").css({ left: parseInt(listX[0]) }); return }
        $(".slide_block").css({ left: x });
        $(".puzz_arrow").css({ left: x });
        for (var i in pointX) {
          $(".answer_puzz").find("li").eq(i).removeClass("isMoved")
          if (x > pointX[i][0] && x <= pointX[i][1]) {
            $(".answer_puzz").find("li").eq(i).addClass("isMoved")
          }
        }
      }
    }).off(endEvent).on(endEvent, function (event) {
      if ($(".slide_block").hasClass('isPassed')) { return }
      movedX = +$(".slide_block").css("left").replace("px", "");
      for (var i in pointX) {
        if (movedX > pointX[i][0] && movedX <= pointX[i][1]) {
          $(".slide_block").attr("data-choosed", i);
          $.ajax({
            url: SLIDEIMGISTRUE,
            data: {
              check_code_key: $('.slide_block').attr("data-number"),
              ans_posi: i
            },
            dataType: "JSON",
            success: function (data) {
              if (data.code == "000") {
                $(".slide_block").addClass('isPassed');
                $("#J_slideIsPass").attr("src", "./images/isPass_ok_03.jpg")
                $(".puzz_picture_box").fadeOut();
                $("#send_code").removeAttr("disabled")
              } else {
                showImageCode();
                $(".slide_block,.puzz_arrow").animate({ "left": "0px" });
                $("#J_slideIsPass").attr("src", "./images/isPass_no_03.jpg")
                $(".answer_puzz").find("li").removeClass("isMoved")
                $(".slide_block").removeAttr("data-choosed")
              }
            }
          })
        }
      }
      isMove = false;
    })
  })
}
drag();
// 点击隐藏题目
$(document).click(function (e) {
  if (!$(e.target).hasClass("puzz_picture_box") && !$(e.target).hasClass("slide_block") && !$(e.target).hasClass("change_puzz")) {
    $(".puzz_picture_box").hide();
  }
})
// 换一题
$(".change_puzz").click(function () {
  showImageCode();
})
var wait = 60;
function time(o) {
  if (wait == 0) {
    o.removeAttribute("disabled");
    // document.getElementById("send_code").style.backgroundColor = "#0393ee";
    o.value = "重新发送";
    wait = 60;
  } else {
    o.setAttribute("disabled", true);
    o.value = "" + wait + "s后重新发送";
    wait--;
    setTimeout(function () {
      time(o)
    },
      1000)
  }
}

function close_tab() {
  $("#zhezhao").css("display", "none");
  $(".reg_success").css("display", "none");
  self.location = 'index.html';
}

function cheackmobile() {
  var tel = $('#tel').val().trim();
  var re = /^[1][3-8][0-9]{9}$/;
  if (!re.test(tel)) {
    tip_window('用户手机号格式错误，请重新输入手机号', '取消')
    $('input[name=tel]').val('');

    return false;
  }
  return true;
}

function cheackinput() {

  var invitation = $('input[name=invitation]').val().trim();
  var ident = $('input[name=ident]').val().trim();
  var password = $('input[name=password]').val().trim();
  var repass = $('input[name=repassword]').val().trim();
  var res = /^\d{4}$/;
  var pwd_re = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/;

  var indent_re = /^\d+$/;
  var indent_yaoqing = /^[A-Za-z0-9]+$/;
  var tel = $('#tel').val().trim();
  var re = /^[1][3-8][0-9]{9}$/;
  if (!re.test(tel)) {
    tip_window('手机号输入错误', '取消')
    $('input[name=tel]').val('');
    // $('input[name=tel]').focus();
    return false;
  }
  if (!pwd_re.test(password)) {
    tip_window('设置的登录密码需要为6-16位数字、字母、符号组合，请重新输入', '取消')
    $('input[name=password]').val('');
    $('input[name=repassword]').val('');
    // $('input[name=password]').focus();
    return false;
  }
  var zhongwen = /[\u4E00-\u9FA5]/i;
  if (zhongwen.test(password)) {
    tip_window('设置的登录密码需要为6-16位数字、字母、符号组合，请重新输入', '取消');
    $('input[name=password]').val('');
    $('input[name=repassword]').val('');
    return false;
  }
  var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
  if (patrn.test(password)) {
    tip_window('设置的登录密码需要为6-16位数字、字母、符号组合，请重新输入', '取消');
    $('input[name=password]').val('');
    $('input[name=repassword]').val('');
    return false;
  }
  if (password != repass) {
    tip_window('两次密码输入不一致，请重新输入', '取消');
    $('input[name=password]').val('');
    $('input[name=repassword]').val('');
    return false;
  }
  if (!res.test(ident)) {
    tip_window('验证码错误，请重新输入', '取消')
    $('input[name=ident]').val('');
    return false;
  }
  if (!$(".slide_block").attr("data-choosed")) {
    tip_window('请进行滑动验证', '确定');
    return false;
  }
  return true;
}

function submit() {
  if (!cheackinput()) {
    return false;
  }
  var tel = $('#tel').val().trim();
  var ident = $('input[name=ident]').val().trim();
  var invitation = $('input[name=invitation]').val().trim();
  var password = $('input[name=password]').val().trim();
  var psds = hex_md5(password);


  $.ajax({
    type: "post",
    url: REGISTER_JSON_URL,
    data: {
      version: app_data.version,
      logintel: tel,
      password: psds,
      referral_code: invitation,
      checkcode: ident,
      channel: "h5"
    },
    success: function (data) {
      if (data.code == '000') {
        localStorage.setItem('respect_enjoy',data.respect_enjoy =='1');
        switch_channel.setItem({
          show_account: data.show_account,
          show_business: data.show_business == '1',
          show_show_transfers : data.show_transferSwitch =='1',
          show_vip:data.show_vip =='2' 
        });
        if (data.tokenid != '') {
          tokenid = data.tokenid
          custtype = "0";
          setCookie("tokenid", tokenid)
          localStorage.setItem("custtype", JSON.stringify(custtype));
          setCookie('tel_no', tel);
          window.localStorage.removeItem('app-first-data');//每个用户值显示一次标识
          parameters = {
            version: app_data.version,
            tokenid: tokenid,
            channel: "h5页面",
            tradestatus: 1
          };
          $.post(EQUIPMENT_JSON_URL, parameters);
          $.ajax({
            url: JD_SAFEAUTH_JSON_URL,
            type: 'post',
            data: {
              version: app_data.version,
              tokenid: tokenid
            },
            dataType: 'json',
            success: function (data) {
              var isBandData = {}
              isBandData.is_realname = data.is_realname;
              isBandData.is_binding = data.is_binding;
              isBandData.accredit_bid_status = data.accredit_bid_status;
              isBandData.trade_pwd_status = data.trade_pwd_status;
              isBandData.plat_trapwd_status = data.plat_trapwd_status;
              localStorage.setItem("isBandData", JSON.stringify(isBandData));
            }
          });
          $.ajax({
            url: JD_GETAMTLIMIT_URL,
            type: 'post',
            data: {
              version: app_data.version,
              tokenid: tokenid
            },
            dataType: 'json',
            success: function (data) {
              var isBandData = JSON.parse(localStorage.getItem("isBandData"));
              isBandData.recharge_low = data.list[0].recharge_low; //充值最低限额
              isBandData.recharge_high = data.list[0].recharge_high; //充值最高限额
              isBandData.recharge_hand_cost = data.list[0].recharge_hand_cost; //充值手续费
              isBandData.withdraw_low = data.list[0].withdraw_low; //提现最低限额
              isBandData.withdraw_high = data.list[0].withdraw_high; //提现最高限额
              isBandData.withdraw_hand_cost = data.list[0].withdraw_hand_cost; //提现手续费
              isBandData.payment_date = data.list[0].payment_date; //到账时间 T+1

              localStorage.setItem("isBandData", JSON.stringify(isBandData));
            }
          });
        }

        reg_success('注册成功', '我知道了', 'body')
      } else {
        tip_window(data.msg, '取消');
      }
    },
    error: function (data) {
      if (data.status == 500) {
        tip_window('服务器超时,请稍后再试', '取消')
      }
    }
  });
}
$('#send_code').on('click.sl',function(){
  $("#tel").blur();
  if ($("#tel").val() == "") {
    tip_window('手机号不能为空', '确定');
    return;
  }
  if (!$(".slide_block").attr("data-choosed")) {
    tip_window('请进行滑动验证', '确定');
    return;
  }
  if (!cheackmobile()) {
    return false;
  }
  var tel = $('#tel').val().trim();
    tools.sendCodeDialog({
				ele:'#send_code',
				url:GETSENDMSGCODE,
				check_code_key: $('.slide_block').attr("data-number"),
				ans_posi: $('.slide_block').attr("data-choosed"),
				logintel:tel,
				codeType:[11,'11_voice'],
				slideInit:[showImageCode,"#J_slideIsPass",".slide_block"]
			})

})

/**复选框 */
$('.checkboxWrap').on('click','#isCheck',function(){//checkbox框
	$(this).parent().toggleClass('checked');
	if($(this).prop('checked')){
		$('#submit').css('background-color',"#ff4c4c").removeAttr('disabled');
	}else{
		$('#submit').css('background-color',"#dddcdd").attr('disabled',true);
	}
})