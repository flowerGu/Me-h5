var tokenid = getCookie('tokenid');
var jsonData = null;//服务器数据缓存
$.ajax({
    url: JD_SAFEAUTH_JSON_URL,
    type: 'post',
    data: {
        version: app_data.version,
        tokenid: tokenid
    },
    dataType: 'json',
    success: function (data) {
        if (data.code == "000") {
            var isBandData = JSON.parse(localStorage.getItem("isBandData"));
            isBandData.is_realname = data.is_realname;
            isBandData.is_binding = data.is_binding;
            isBandData.accredit_bid_status1 = data.temp7; //江西授权
            localStorage.setItem("isBandData", JSON.stringify(isBandData));

            setCookie('cus_email', data.cus_email);
            data.email = data.cus_email;
            data.head_sculpture_href = getCookie('head_sculpture_href');
            if (data.is_binding == '1') {
                data.is_binding = '已授权';
                data.isbing = true;
            } else {
                data.is_binding = '未授权';
            }
            if (data.temp7 == '1') { //江西是否签约授权
                data.accredit_bid_status1 = '已授权';
                data.bid_status = true;
            } else {
                data.accredit_bid_status1 = '未授权';
                data.bid_status = false;
            }
            // if (data.is_realname == '1') {
            // 	data.real_type = true;
            // } else {
            // 	data.real_type = false;
            // }
            //没开户（实名）
            if (data.is_realname !== '1') {
                data.realname_link = true;
                data.jxyhDetailsUrl = 'idVerifi.html?jd=1';
            }
            //已经实名 判断开户
            if (data.is_realname === '1') {
                data.realname_link = false;

                //金盾没开户
                if (data.jd_bank_id.length === 0) {
                    data.jxyhDetailsUrl = 'openAnAccount.html';
                } else {//已开户，去详情
                    data.jxyhDetailsUrl = 'account_details.html?jd=1';
                }
                if (data.pay_is_bind == '0') {//Me账户没开通
                    data.zh_status = false;
                } else {
                    data.zh_status = true;
                }
            }
            if (data.cus_email !== '') {
                var cus_email = data.cus_email;
                var b = cus_email.split('@')[1];
                var a = cus_email.split('@')[0].substr(0, 1);
                data.cus_email = a + '**@' + b;
            }
            data.is_ratechart = data.is_ratechart == '1' ? true : false;//风险等级
            if (data.cus_address.trim() == '' || data.cus_address.trim() == null || typeof (data.cus_address.trim()) == 'undefined') {
                setCookie('cus_address', '');
            } else {
                var address_arr = data.cus_address.split('@');
                data.cus_address = address_arr[0] + ' ' + address_arr[1];
                setCookie('cus_address', address_arr[2]);
            }

            if (data.jd_bank_id == '' || data.jd_bank_id == null) {
                data.jd_bank_id_status = false;
            } else {
                data.jd_bank_id_status = true;
            }
            if (data.bankSize == null) {
                data.bankSize = 0;
            }
            if (data.bankSize == '0') {
                data.banknum = true;
            } else {
                data.banknum = false;
            }
            if (data.is_risk_assessment == '1') {
                data.is_risk_assessment = true
            } else {
                data.is_risk_assessment = false;
            }
            localStorage.setItem("user_data", JSON.stringify(data));
            jsonData = data;
            var template = document.getElementById('tpl').innerHTML;
            var result = Mustache.render(template, data);
            $('#main').append(result);
            if(switch_channel.getItem().show_account && switch_channel.getItem().show_account.indexOf('2')> -1){
                $("#J_meAccount").removeClass("hide");
            }   
        } else if (data.code == "001") {
            tip_windows('您还未登录！', '登录', '取消', 'index_no_login.html');
        } else {
            tip_window(data.msg, '确定');
            return;
        }
    }
});


function shiming() {
    var data_type = $('#m_safe').data("type");
    if (data_type === 2) {
        window.location.href = 'openAnAccount.html';
    }
    if (data_type === 0) {
        window.location.href = 'idVerifi.html';
    }
}

function goPage(url, zh) {
    if (!zh) {
        window.location.href = url;
    }
}