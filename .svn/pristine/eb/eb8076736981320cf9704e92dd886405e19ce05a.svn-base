/**
 * Created by gupeiling on 2017/1/9.
 */
var jd = getQueryString('jd');//金盾
var zj = getQueryString('zj');//产品
var tokenid = getCookie('tokenid');
var originalBidId = getQueryString('originalBidId');//区分普通债转
if (jd) {//金盾
    var trade = JSON.parse(localStorage.getItem('trade'));
    var bid_id = trade.bid_id;
    var trade_id = trade.tradeid;
    $.ajax({
        url: BIDCOMPLETEDETAILS_JSON_URL,
        type: 'post',
        data: { version: app_data.version, tokenid: tokenid, bid_id: bid_id, trade_id: trade_id },
        dataType: 'json',
        success: function (data) {
            if (data.code == '000') {
                if (data.status.indexOf('出借中') > -1) {//出借中
                    data.payresultS = false;
                    $('.suc-tip').text(data.status);
                } else if (data.status == '出借成功') {
                    data.payresultS = true
                    $('.suc-tip').text('出借成功');
                    var template = document.getElementById('datas').innerHTML;
                    $('#dataW').append(Mustache.render(template, data));
                } else {//其他 出借失败
                    data.payresultS = false;
                    $('.suc-tip').text('出借失败');
                }
                $('.continue').click(function () {
                    $(this).attr('href', 'obj_invest.html?id=' + bid_id + '&status=' + trade.status);
                })
            }
        }
    })
} else if (zj) {
    var zj_trade = JSON.parse(localStorage.getItem('payRequestResult'));
    $.post(ZJQUERYPAYRESULT_JSON_URL, {
        version: app_data.version,
        tokenid: tokenid,
        tradeid: zj_trade.trade_id
    }).then(function (data) {
        if (data.code == '000') {
            //						data.yearRate=(parseFloat(data.yearRate)*100).toFixed(2);
            if (data.payresult == 1) {
                data.payresultS = true;
                $('.suc-tip').text("出借成功");
                var template = document.getElementById('zj_datas').innerHTML;
                $('#dataW').append(Mustache.render(template, data));
            } else if (data.payresult == 3) {
                data.payresultI = true;
                $('.suc-tip').text("出借中");
            }
            else {
                data.payresultE = true;
                $('.suc-tip').text("出借失败");
            }
            $('.continue').click(function () {
                var objStatus = JSON.parse(localStorage.getItem('payRequestResult'));
                $(this).attr('href', 'pro_invest.html?id=' + objStatus.id + '&status=' + objStatus.status);
            })
        }
    }, function (data) {
    })
} else{
    var zz = JSON.parse(localStorage.getItem('debtSell'));
    var html = originalBidId ? $('#Vip').html() : $('#zz_data').html();
    if (zz.status == 1) {
        zz.payresultS = true;
    }
    $('.continue').text(originalBidId ?'继续出借': '继续承接');//普通债转
    $('.continue').click(function () {
        var objStatus = JSON.parse(localStorage.getItem('payRequestResult'));
        $(this).attr('href', 'obj_invest.html?id=' + zz.id + '&status=' + zz.status);
    })
    $('#dataW').append(Mustache.render(html, zz));
    $('.suc-tip').text(zz.status == 0 ? '出借失败' : '出借成功');
}
function backFn() {//后退
    var locationUrl = null;
    var history = document.referrer;
    if (history.indexOf('having_record_no.html') > -1 || history.indexOf('having_project.html') > -1) {//跳转上一页
        window.location.href = history;
        return false;
    }
    if (jd) {//标的出借
        locationUrl = window.localStorage.getItem('objProInvestUrl');
    } else if(zj) {//产品出借
        locationUrl = window.localStorage.getItem('proInvestUrl');
    }else{//债转
        locationUrl = window.localStorage.getItem('zzProInvestUrl');
    }
    window.location.href = locationUrl == null ? '' : locationUrl;
}
