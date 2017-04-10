/**
 *
 */

var index_url = getQueryString("status");
var tokenid = getCookie("tokenid");
var userData = JSON.parse(window.localStorage.getItem('user_data'));
var hasJX = false;

function openZJ() {
    $.post(CPCNREGISTER_JSON_URL, {
        version: app_data.version,
        tokenid: tokenid
    }).then(function (data) {
        if (data.code !== '000') {
            tip_window(data.msg, '确定');
            return;
        }
        post_yb(data.url, { message: data.message, signature: data.signature });
    }, function (data) {
        tip_window('网路错误,请刷新重试', '确定');
    });
}

function addCardZJ() {
    $.post(CPCNBINDBANK_JSON_URL, {
        version: app_data.version,
        tokenid: tokenid
    }).then(function (data) {
        if (data.code != '000') {
            tip_window(data.msg, '确定');
            return false;
        }
        post_yb(data.url, { message: data.message, signature: data.signature });
    }, function (data) {
        tip_window('网络错误，请重试', '确定');
    });
}
//绑卡
function addCard(type) {
    //todo 取消注释以开启江西
    // if (type === 'jd') {//金盾
    //   if (!userData.temp4) {
    //     tip_window('您还没有开通银行存管，请开通存管账户。', '去开户', 'openAnAccount.html');
    //     return;
    //   }
    //   location.href = 'addNewCard.html';
    // }
    // else {//中金
    if (userData.zj_status !== '1') {
        tip_windows_conform('您还没有开通中金支付。', '取消', '去开户', '', userData.is_realname === '1' ? '' : 'idVerifi.html', '', userData.is_realname === '1' ? 'openZJ()' : '');
        return;
    }
    tip_windows_conform('为保护用户资金安排，在中金绑卡时，需要使用银行预留手机号。', '取消', '继续', '', '', '', 'window.addCardZJ()');
    // }
}

$(function () {
    checkLogin();
    //对应接口给的银行code
    var bankLogo = [
        '100',
        '102',
        '103',
        '104',
        '105',
        '301',
        '302',
        '303',
        '304',
        '305',
        '306',
        '307',
        '308',
        '309',
        '310',
        '311',
        '316',
        '317',
        '401',
        '403'
    ];
    var dropDownPageOpts = {
        page: 1,
        enable: true
    };
    //$("#xiahuaxian ul li").eq(index_url).addClass('li_xiahuaxian').siblings("li").removeClass("li_xiahuaxian");
    // $('#main').find('.tab_div').eq(index_url).css({
    // 			'display': "block"
    // });

    // $("#xiahuaxian ul li").click(function () { //tab切换
    // 			$(this).addClass("li_xiahuaxian").siblings("li").removeClass("li_xiahuaxian");
    // 			var index = $(this).index();
    // 			$("#main").find('.tab_div').css('display', 'none');
    // 			$("#main").find('.tab_div').eq(index).css({
    //     'display': "block"
    // 			});
    // });

    //管理按钮
    $('#showDelBtn').on('click', function () {
        var _this = $(this);
        if (_this.data('active')) {
            _this.data('active', false);
            _this.text('管理');
        } else {
            _this.data('active', true);
            _this.text('取消');
        }

        $('#card_info')
            .children('.removeable')
            .toggleClass('active');
    });
    //删除
    $('#card_info').on('click', '.removeable>.card_del', function () {
        //未来可能有多张江西银行卡？
        tip_windows_conform('解绑提示，解绑前请先确定是否有在途交易！如有在途交易则不能解绑。', '再想想', '确定', '', 'unbindCard.html');
    });
    //添加银行卡
    $('#btn_add_new_card').on('click', function () {
        window.addCard('zj');
        return false;
    })
    var red_card_arr = ["工商银行", "招商银行", "华夏银行", "中信银行", "广发银行", "北京银行", "平安银行", "中国银行"];
    var addData = function (cb) {
        if (!dropDownPageOpts.enable) {
            $('.dropload-load').text('没有更多数据了');
            setTimeout(function () {
                if ($.isFunction(cb)) {
                    cb();
                }
            }, 1000);
            return;
        }
        $.post(BANK_LIST_URL, {
            version: app_data.version,
            tokenid: tokenid,
            cardType:3,//金盾的不会再此页面显示  直接到绑卡 和 解绑页面
            current: dropDownPageOpts.page++
        }).then(function (data) {
            if (data.code !== '000') {
                tip_window(data.msg, '确定！');
                return;
            }
            if (data.list && data.list.length === 0) {
                dropDownPageOpts.enable = false;

                if ($.isFunction(cb)) {
                    $('.dropload-load').text('没有更多数据了');
                    setTimeout(function () {
                        cb();
                    }, 1000);
                }
                return;
            }
            //显示的数据，
            var showBankList = [],
                jxyhCardList = [];
            //data.bank_num = '**** **** **** ' + data.bank_num.substr(-4);
            $(data.list).each(function (idx, item) {
                // console.log(red_card_arr)
                var bank_name = item['bank_name'];
                if (bankLogo.indexOf(item.bank_code) === -1) {
                    item.bank_code = 'default';
                }

                if (item.bank_belong === '2') { //银行
                    item.trusteeship_type = true;
                    item.trusteeship_type_txt = '银行存管';
                    // showBankList.splice(0, 0, item);  不显示银行存管的卡
                    jxyhCardList.push(item);
                    window.hasJX = true;
                } else if (item.bank_belong == '3' || item.bank_belong=='4' || item.bank_belong=='5') {//代付
                    item.bankMe = true; //
                    item.trusteeship_type_txt = 'Me账户';
                    showBankList.push(item);
                } else if(item.bank_belong ==='1'){
                    item.trusteeship_type_txt = '中金';
                    showBankList.push(item);
                }
                if ($.inArray(bank_name, red_card_arr) >= 0) {
                    item['red'] = true;
                } else {
                    item['blue'] = true;
                }
            });
            data.bankList = showBankList;
            window.localStorage.setItem('jd-Account-Cards', JSON.stringify(jxyhCardList));
            jxyhCardList = null;

            var template = document.getElementById('bankListTpl').innerHTML;
            var result = Mustache.render(template, data);
            $("#card_info").append(result);

            var isBandData = JSON.parse(localStorage.getItem("isBandData"));
            if (index_url == '0' && isBandData.is_realname == '0') {
                isBandData.is_realname = data.is_realname;
                localStorage.setItem("isBandData", JSON.stringify(isBandData));
            }
            if (index_url == '1' && isBandData.is_binding == "0") {
                isBandData.is_binding = data.is_binding;
                localStorage.setItem("isBandData", JSON.stringify(isBandData));
            }
            if (index_url == '2' && isBandData.accredit_bid_status == "0") {
                isBandData.accredit_bid_status = data.accredit_bid_status;
                localStorage.setItem("isBandData", JSON.stringify(isBandData));
            }
            if ($.isFunction(cb)) {
                cb();
            }
        }, function (data) {
            tip_window('网络超时', '确定！');
            if ($.isFunction(cb)) {
                cb();
            }
        });
    }
    //下拉刷新
    var dropload = $('#card_info').dropload({
        scrollArea: window,
        loadDownFn: function (me) {
            addData(function () {
                me.resetload();
            });
        }
    });
    dropload.unlock();

    if (tokenid == null) {
        tip_window('您未登录！', '去登录', 'login.html');
    } else {
        addData();
    }
});

function autosign() {
    var tokenid = getCookie('tokenid');
    $.ajax({
        url: CPCNAUTOTRANSFER_JSON_URL,
        type: 'post',
        data: {
            version: app_data.version,
            tokenid: tokenid
        },
        dataType: 'json',
        success: function (data) {
            if (data.code != '000') {
                if (!userdirect()) {
                    return false;
                }
            } else {

                post_yb(data.url, {
                    message: data.message,
                    signature: data.signature
                });
            }
        },
        error: function (data) {

        }
    });
}

function resertpass() {
    if (!userdirect()) {
        return false;
    }
    window.location.href = 'modify_trade_pwd.html'
}

function setpass() {
    var isBandData = JSON.parse(localStorage.getItem("isBandData"));
    if (isBandData.is_binding != '1') {
        tip_windows_conform('没有实名认证', '去实名', '取消', 'my_setting.html');
        return false;
    }
    var isBandData = JSON.parse(localStorage.getItem("isBandData"));
    if (isBandData.trade_pwd_status == '1') {
        tip_window('已设置交易密码', '确定');
        return false;
    }
    window.location.href = 'set_trade_pwd.html'
}