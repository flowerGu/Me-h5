/**
 * Created by gupeiling on 2016/9/7.
 */
var tokenid = '';
var custtype = '';
document.onkeydown = function () {
  var event = event || window.event;
  if (event.keyCode == 13) {
    document.getElementById("submit").click();
  }
};
$(function () {
  var dd = $(window).height();
  $('body').css("height", dd);//设置body的高度
  var login_md = 'd56b699830e77ba53855679cb1d252da';
  $('.forget_a').attr("href", "findPwd.html?type=" + login_md + '&mth=' + Math.random())
})
function submit() {
  var tel = $("#tel").val().replace(/\s/g, '');
  if (tel.trim() == '') {
    tip_window('手机号不能为空', '取消')
    return false;
  }
  var re = /^[1][3-8][0-9]{9}$/;
  if (!re.test(tel.trim())) {
    tip_window('请输入11位有效手机号', '取消')
    return false;
  }
  var password = $('input[name=password]').val();
  if (password.trim() == '') {
    tip_window('密码不能为空', '取消')
    return false;
  }
  //本地不跨越
  var version = app_data.version;
  var logintel = tel;
  var psds = hex_md5(password);
  var isBandData = { 'is_realname': '', 'is_binding': '', 'accredit_bid_status': '', 'trade_pwd_status': '', 'recharge_low': '', 'recharge_high': '', 'withdraw_low': '', 'withdraw_hand_cost': '', 'payment_date': '', 'plat_trapwd_status': '' }
  $.ajax({
    type: "post",
    url: LOGIN_JSON_URL,
    data: {
      version: version,
      logintel: logintel,
      password: psds,
      channel: "h5"
    },
    async: false,
    success: function (data) {
      if (data.code == '999') {
        tip_window(data.msg, '取消');
        return false;
      }
      if (data.code == '000') {
        dellAllUserInfo();
        if (window.localStorage.getItem('fengxiantishi')) {
          localStorage.removeItem("fengxiantishi");
        }
        if(window.sessionStorage.getItem('fengxiantishi')){
          sessionStorage.removeItem("fengxiantishi");
        }
        localStorage.setItem('respect_enjoy',data.respect_enjoy =='1');
        switch_channel.setItem({
          show_account:data.show_account || '1',
          show_transfers: data.show_transferSwitch == 1,
          show_business:data.show_business == '1',
	        
          show_vip:data.show_vip =='2' //显示权利人，1：否，2是
        });
        if (data.tokenid != '') {
          tokenid = data.tokenid;
          custtype = data.custtype;
          setCookie("tokenid", tokenid);
          localStorage.setItem("custtype", JSON.stringify(custtype));
          var tel_no = $('#tel').val().trim().replace(/\s/g, '');
          setCookie('tel_no', tel_no);
          parameters = {
            version: app_data.version,
            tokenid: tokenid,
            channel: "h5页面",
            tradestatus: 2
          };
          $.post(EQUIPMENT_JSON_URL, parameters);
          $.post(JD_SAFEAUTH_JSON_URL, {
            version: app_data.version,
            tokenid: tokenid
          }, { async: false }).then(function (data) {
            if (data.code == '000') {
              if(data.idNumberUnstarred){
                setCookie('idCard',data.idNumberUnstarred);
                setCookie('userName',data.nameUnstarred);
              }
              isBandData.is_realname = data.is_realname;
              isBandData.is_binding = data.is_binding;
              isBandData.accredit_bid_status = data.accredit_bid_status;
              isBandData.trade_pwd_status = data.trade_pwd_status;
              isBandData.plat_trapwd_status = data.plat_trapwd_status;//账户交易密码
              isBandData.is_ratechart = data.is_ratechart;//是否风险测评
              $.post(JD_GETAMTLIMIT_URL, {
                version: app_data.version,
                tokenid: tokenid,
                way: 1,
                pay_channel: 2,
                is_new:1
              }, { async: false }).then(function (data2) {
                isBandData.recharge_low = '';
                isBandData.recharge_high = '';
                if (data2.list[0].recharge_low == null)
                  data2.list[0].recharge_low = 0
                if (data2.list[0].recharge_high == null)
                  data2.list[0].recharge_high = 0;
                if (data2.list[0].withdraw_low == null)
                  data2.list[0].withdraw_low = 0;
                if (data2.list[0].withdraw_hand_cost == null)
                  data2.list[0].withdraw_hand_cost = 0;
                isBandData.recharge_low = data2.list[0].recharge_low;//充值最低限额
                isBandData.recharge_high = data2.list[0].recharge_high;//充值最高限额
                isBandData.withdraw_low = data2.list[0].withdraw_low;//提现最低限额
                isBandData.withdraw_high = data2.list[0].withdraw_high;//提现最高限额
                isBandData.withdraw_hand_cost = data2.list[0].withdraw_hand_cost;//提现手续费
                isBandData.payment_date = data2.list[0].payment_date;//到账时间 T+1
                localStorage.setItem("isBandData", JSON.stringify(isBandData));
                if (getQueryString('redirect')) {
                  window.location.href = getQueryString('redirect');
                }
                else {
                  window.location.href = "index.html";
                }
              })

            }

          });
        }
      }
      if (data.code != '000') {
        tip_window(data.msg, '取消')
      }
    },
    error: function (data) {
      tip_window('服务器超时,请稍后再试', '取消')
    }
  });
}
var addSpace = function (vals, index) {
  vals = vals.split('')
  vals.splice(index, 0, ' ')
  return vals.join('');
}
$('#tel').keyup(function (e) {
  var text = this.value;
  var text_len = this.value.length;
  if (text_len > 3 && text[3] !== ' ') {
    this.value = addSpace(text, 3)
  }
  if (text_len > 8 && text[8] !== ' ') {
    this.value = addSpace(text, 8)
  }
}).bind('blur', function (e) {
  $(this).val($(this).val().replace(/\s/g, '').replace(/(\d{3})(\d{4})(\d{4})/g, "$1" + " " + "$2" + " " + "$3" + " "));
});