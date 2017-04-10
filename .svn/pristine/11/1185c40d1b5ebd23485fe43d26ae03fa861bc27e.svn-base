/**
 * 订单查询
 *
 */
var pageParm = {
    current: 1,
    hasnextpage: true
};
var tokenid = getCookie("tokenid");

function add_list(data,hasnextpage, current) {
  console.log(hasnextpage);

	if (hasnextpage == 'true') {
		    $.ajax({
		        type: "post",
		        url: JDMANAGERORDERS_JSON_URL,
		        data: data,
		        success: function (data) {
		            if (data.code == '000') {
		                if (data.list.length > 0) {
		                    $(data.list).each(function (idx, item) {
		                        // item.invest_money=(item.invest_money)/10000+'万';
		                        if (item.is_online_user == "0") {
		                            item.is_online_user = true;
		                        } else {
		                            item.is_online_user = false;
		                        }
		                        item.expire_profit = parseFloat(item.expire_profit).toFixed(2);
		                        if (item.status == 2) {
		                            item.wancheng = false;
		                            item.wan_status = 2;
		                        }
		                        else {
		                            item.wancheng = true;
		                            item.wan_status = 1;
		                        }
		                        if (item.temp1 == '2') {//jd
		                            item.jd = true;
		                            if (item.status == '5') {//购买成功
		                                item.bid_status5 = true;
		                            } else {//标的流标
		                                item.bid_status5 = false;
		                            }
		                        } else {
		                            item.jd = false;
		                        }
		                        item.years_income = (item.years_income * 100).toFixed(2) + '%'
		                    });
		                    if (data.hasnextpage == 'true') {
		                        current++;
		                    }
		                    $('#page_in').val(current);
	                        $('#hasnextpage_in').val(data.hasnextpage);
	                        $.get('./templates/my_account.tpl', {"time": new Date().getTime()}, function (template) {
		                        var result = Mustache.render(template, data);
		                        $('#prject_in').append(result);
		                    });
		                }
		            }
		        },
		        error: function (data) {
		        }
		    });
	}else if($('#page_in').val()=='1') {
            var num = getCookie('tel_no');
            var viewtext = {
                buttontext: "立即邀请",
                buttonurl: "invited_register.html?num=" + num,
                message_text: "说声抱歉，您暂无资产"
            };
            $.get('./templates/no_list.tpl', {"time": new Date().getTime()}, function (template) {
                var result = Mustache.render(template, viewtext);
                $("#prject_in").append(result);
            });
        }
}
$(function () {
    var tokenid = getCookie("tokenid");
    add_list({
        version: app_data.version,
        tokenid: tokenid,
        current: 1,
        order_form: 2
    },'true',1);
});
$(function () {
    if (Array.prototype.indexOf === undefined) {
        Array.prototype.indexOf = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        };
    }

    if (Array.prototype.remove === undefined) {
        Array.prototype.remove = function (val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
    }

    $('.bg-sendcode').click(function () {
        classie.toggle(this, 'active');
        classie.toggle(document.getElementById('menu_right'), 'cbp-spmenu-open');
        $(this).hide();
    })

    var min_invest_amount_value = '',
        max_invest_amount_value = '',
        min_remaining_time_value = '',
        max_remaining_time_value = '';

    document.getElementById('search_btn').onclick = function () {
        $('.bg-sendcode').show();
        classie.toggle(this, 'active');
        classie.toggle(document.getElementById('menu_right'), 'cbp-spmenu-open');
        var product_id_arr = [];
        $.ajax({
            type: "post",
            async: false,
            url: NEWPRODUCTS_JSON_URL,
            data: {
                version: app_data.version,
                tokenid: tokenid
            },
            success: function (data) {
                if (data.code == '000') {
                    if ($('#NEWPRODUCTS').html() == '') {
                        var arr = [];
                        for (var i = 0; i < 8; i++) {
                            //console.log(data.list[i]);
                            if (i % 3 == 2) {
                                arr.push('<li id="' + data.list[i].product_id + '" style="float:left;width:6rem;margin-bottom:.8rem;background:#E9E9E9;border-radius:6px;text-align:center;height:2.2rem;line-height:2.2rem;">' + data.list[i].product_name + '</li>')
                            } else {
                                arr.push('<li id="' + data.list[i].product_id + '" style="float:left;width:6rem;margin-bottom:.8rem;margin-right:1.4rem;background:#E9E9E9;border-radius:6px;text-align:center;height:2.2rem;line-height:2.2rem;">' + data.list[i].product_name + '</li>')
                            }
                        }
                        arr.push('<li id="all" style="float:left;width:6rem;margin-bottom:.8rem;background:#E9E9E9;border-radius:6px;text-align:center;height:2.2rem;line-height:2.2rem;">全部</li>')
                        $('#NEWPRODUCTS').append(arr.join(''));
                    }
                    $('#min_invest_amount').off('input').on('input', function () {
                        min_invest_amount_value = $(this).val();
                    })
                    $('#max_invest_amount').off('input').on('input', function () {
                        max_invest_amount_value = $(this).val();
                    });
                    $('#min_remaining_time').off('input').on('input', function () {
                        min_remaining_time_value = $(this).val();
                    })
                    $('#max_remaining_time').off('input').on('input', function () {
                        max_remaining_time_value = $(this).val();
                    });

                    $('#NEWPRODUCTS li,#touzi_time>li').off('click').on('click', function () {
                        if ($(this).attr('id') == 'all') {
                            if ($(this).css('background-color') == 'rgb(245, 0, 77)') {
                                $(this).parent('ul').find('li').css({
                                    'background': '#E9E9E9',
                                    'color': '#000'
                                });
                                $(this).attr('data-all', false);
                                //product_id_arr = [];
                            } else {
                                $(this).parent('ul').find('li').css({
                                    'background': '#F5004D',
                                    'color': '#fff'
                                });
                                $(this).attr('data-all', true);
                                $('#NEWPRODUCTS li').each(function (idx, item) {
                                    if ($(item).attr('id') != 'all') {
                                        product_id_arr.push($(item).attr('id'));
                                    }
                                });

                            }

                        }
                        else {

                            if ($(this).parent().attr('id') == 'NEWPRODUCTS') {
                                if ($(this).css('background-color') == 'rgb(245, 0, 77)') {
                                    $(this).css({
                                        'background': '#E9E9E9',
                                        'color': '#000'
                                    });
                                    $('#NEWPRODUCTS li#all').css({
                                        'background': '#E9E9E9',
                                        'color': '#000'
                                    });
                                    $('#NEWPRODUCTS li#all').attr('data-all', false);
                                    product_id_arr.remove($(this).attr('id'));
                                } else {
                                    $(this).css({
                                        'background': '#F5004D',
                                        'color': '#fff'
                                    });
                                    product_id_arr.push($(this).attr('id'));
                                }

                            } else {
                                if ($(this).css('background-color') == 'rgb(245, 0, 77)') {

                                    $(this).css({
                                        'background': '#E9E9E9',
                                        'color': '#000'
                                    });
                                    $(this).attr('data-click', false);
                                } else {
                                    $('#touzi_time>li').css({
                                        'background': '#E9E9E9',
                                        'color': '#000'
                                    }).attr('data-click', false);
                                    $(this).css({
                                        'background': '#F5004D',
                                        'color': '#fff'
                                    });
                                    $(this).attr('data-click', true);
                                }

                            }
                        }
                    })
                }
            }
        });
        $('#reset_btn').off('click').on('click', function () {
            $('#min_remaining_time').val('');
            $('#max_remaining_time').val('');
            $('#min_invest_amount').val('');
            $('#max_invest_amount').val('');
            $('#name').val('');
            $('#phone_number').val('');
            product_id_arr = [];
            $('#NEWPRODUCTS li,#touzi_time li').css({
                'background': '#E9E9E9',
                'color': '#000'
            });
            $('#NEWPRODUCTS li#all').attr('data-all', false);
            $('#touzi_time li').attr('data-click', false);
        });
        $('#search_submit').off('click').on('click', function () {
            if (min_invest_amount_value > max_invest_amount_value) {
                tip_window('最低价不能大于最高价', '取消');
                $('#reset_btn').trigger('click');
                return false;
            }

            if (parseFloat(min_remaining_time_value) > parseFloat(max_remaining_time_value)) {
                tip_window('到期天数区间不正确', '取消')
                $('#reset_btn').trigger('click');
                return false;
            }
            if(parseFloat(max_remaining_time_value)>3699){
              tip_window('到期最大天数为3699天','取消');
            }
            var product_id = '';
            if (product_id_arr.length) {
                product_id = product_id_arr.join(',');
            }
            if ($('#NEWPRODUCTS li#all').attr('data-all') == 'true') {
                product_id = '';
            }

            var invest_date = $('#touzi_time>li[data-click="true"]').attr('id') || '';

            $("#prject_in").html('');
            var search_par={
                version: app_data.version,
                tokenid: tokenid,
                current: 1,
                status: 0,
                order_form: 2,
                min_remaining_time: $('#min_remaining_time').val(),
                max_remaining_time: $('#max_remaining_time').val(),
                min_invest_amount: $('#min_invest_amount').val(),
                max_invest_amount: $('#max_invest_amount').val(),
                name: $('#name').val(),
                phone_number: $('#phone_number').val(),
                product_id: product_id,
                invest_date:invest_date
            };
            add_list(search_par,'true', 1);
            classie.toggle(this, 'active');
            classie.toggle(document.getElementById('menu_right'), 'cbp-spmenu-open');
            $('.bg-sendcode').hide();
        });
    };

    // dropload
var prject_in_dropload = $('#prject_in').dropload({
    scrollArea: window,
    domDown: {
        domClass: 'dropload-down',
        domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
        domUpdate: '<div class="dropload-update">↓释放加载</div>',
        domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
    },
    loadDownFn: function (me) {
        var current = $('#page_in').val();
        var hasnextpage = $('#hasnextpage_in').val();
        setTimeout(function () {
            if (hasnextpage == 'true') {
                var tokenid = getCookie("tokenid");
                var invest_date = $('#touzi_time li[data-click="true"]').attr('id') || '';
                product_id_arr = [];
                var product_id = '';
                if (product_id_arr.length) {
                    product_id = product_id_arr.join(',');
                }
                if ($('#NEWPRODUCTS li#all').attr('data-all') == 'true') {
                    product_id = '';
                }
                add_list({
                    version: app_data.version,
                    tokenid: tokenid,
                    current: current,
                    order_form: 2,
                    min_remaining_time: $('#min_remaining_time').val(),
                    max_remaining_time: $('#max_remaining_time').val(),
                    min_invest_amount: $('#min_invest_amount').val(),
                    max_invest_amount: $('#max_invest_amount').val(),
                    name: $('#name').val(),
                    phone_number: $('#phone_number').val(),
                    product_id: product_id,
                    invest_date: invest_date
                },$('#hasnextpage_in').val(), current);
            }
            me.resetload();
        }, 1000);
    }

    })
prject_in_dropload.unlock();



})
