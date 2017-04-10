'use strict';
var tokenid = getCookie("tokenid");
var showToOpenAccount = false;// 江西开户
(function () {
    ajax({
        url: JD_SAFEAUTH_JSON_URL,
        cb: function (data) {
            if (data.cus_email != null)
                setCookie('cus_email', data.cus_email);
            if (data.is_realname == '0') {
                setCookie('is_realname', data.is_realname);
            }
        }
    });

    ajax({
        url: JD_GET_DETAIL_URL,
        async: false,
        cb: processDetail
    });

    var switchs = switch_channel.getItem();
    if(switchs.show_account.indexOf('0')>-1){//中金
        $('.ditch-zj').removeClass('hide');
    }
    if(switchs.show_account.indexOf('2')>-1){//Me账户
        $('.ditch-me').removeClass('hide');
    }    
    // 处理  JD_GET_DETAIL_URL
    function processDetail(data) {
        if (data.head_url == '') {//默认头像
            data.head_url = 'images/user/face.png';
        }
        if (data.total_assets === '') {
            data.total_assets = '0.00';
        } else {
            data.total_assets = (+data.total_assets).toFixed(2);
        }
        //已充值的金额
        var mymoney = setCookie("mymoney", data.charge_amount);
        localStorage.setItem("user_detail", JSON.stringify(data));
        data.tel_no = getCookie('tel_no');
        data.earning = Math.abs(data.earning);
        if (data.privnum == '') {
            data.privnum = 0;
        }
        data.balance = data.balance === '' ? '0.00' : (+data.balance).toFixed(2);

        if (data.jd_balance === '') {
            data.jd_balance = '0.00';
        }
        if (data.zj_balance === '') {
            data.zj_balance = '0.00';
        }
        data.earning = (+data.earning).toFixed(2);
        if (!data.previous_earning) {
            data.previous_earning = '0.00';
        }
        if (data.isPopup == '1' && (+data.zj_total_assets) > 0) {
            showToOpenAccount = true;
        }
        setCookie('balance', data.zj_balance); //中金的余额
        setCookie('jdBalance', data.jd_balance); //金盾余额
        setCookie('phone_number', data.phone_number);
        setCookie('withdrawal_amount', data.withdrawal_amount);//已提现金额
        if (data.realname_status === '0') {
            data.realname_status = false;
        }
        var url = 'openAnAccount.html';
        if (data.realname_status !== '1') {
            url = 'idVerifi.html?jd=1';
        }
        document.getElementsByClassName('content')[0].innerHTML = template('tpl', data);
        //data.isSign 签到
        if (showToOpenAccount) {//江西开户弹框
            openJXDiaolg();
        } else {//风险测评弹框
            $('.modal-backdrop,#dialog_jx_open').removeClass('in');
            if (!localStorage.getItem('isMyWeathPop') && localStorage.getItem('noTest') != 1) {//点击去测评后
                isRate('3');
            }
        }
    }

    // 刷新按钮
    $('#js_refresh_data').on('click', function () {
        var that = $(this);
        if(that.hasClass('disabled-refresh')){
            return false;
        }
        that.addClass('disabled-refresh');
        ajax({
            url: REFRESHBALANCE_JSON_URL,
            err: function () {
                that.off('click').end().removeClass('disabled-refresh');
            },
            cb: function (data) {
                that.removeClass('disabled-refresh');
                tip_window(data.msg, '确定');
                $('#js_balance').text(data.balance);
                $('#js_total_assets').text(data.total_assets);
            }
        })
    });

    // H5上传图片
    $('#js_change_face').on('change', function (e) {
        if (!e.target.files[0]) {
            return false;
        }
        new html5ImgCompress(e.target.files[0], {
            before: function (file) {
                if (file.type.indexOf('image') === -1) {
                    tip_window('请选择图片', '确定');
                    return false;
                }
            },
            done: function (file, base64) {
                // ajax和服务器通信上传base64图片等操
                var form = new FormData();
                form.append('headImage', file);
                form.append('tokenid', tokenid);
                form.append('version', app_data.version);
                ajax({
                    url: SAVEHEADIMAGE_JSON_URL,
                    data: form,
                    processData: false,
                    cache: false,
                    contentType: false,
                    cb: function (data) {
                        var fr = new FileReader();
                        fr.readAsDataURL(file);
                        fr.onload = function (e) {
                            file = null;
                            $('#js_face').attr('src', e.target.result);
                        };
                    }
                })
            },
            fail: function (file) {//压缩失败
                console.log('压缩失败...');
                file = null;
            },
            complete: function (file) {//压缩完成
                file = null;
            },
            notSupport: function (file) {//浏览器不支持！
                // 不支持操作，例如PC在这里可以采用swfupload上传
                file = null;
            }
        });
    });

    // 江西银行开户弹框
    function openJXDiaolg() {
        var dialog = $('#dialog_jx_open');
        dialog
            .find('button')
            .on('click', function () { // 点击开户按钮
                window.localStorage.setItem('app-first-data', '1');
                ajax({
                    url: ISPOPUP_JSON_URL,
                    cb: function (data) {
                        showToOpenAccount = false;
                        tools.dialog({
                            title: '开户成功',
                            content: '恭喜您，进入银行存管时代！',
                            align: true,
                            btn: ['去绑卡', '取消'],
                            cb: [url, '']
                        });
                    }
                })
            });

        dialog
            .find('label')
            .on('click', function () {
                var checkbox = $(this).find('.custom-checkbox');

                if (checkbox.hasClass('active')) {
                    checkbox.removeClass('active');
                    dialog.find('button')
                        .attr('disabled', 'disabled')
                        .removeClass('btn-danger')
                        .addClass('btn-disable');
                } else {
                    checkbox.addClass('active');
                    dialog.find('button')
                        .removeAttr('disabled')
                        .removeClass('btn-disable')
                        .addClass('btn-danger');
                }

            });
        dialog.addClass('in');
        $('.modal-backdrop').addClass('in');
    }

    custFn(4);//主菜单
})()