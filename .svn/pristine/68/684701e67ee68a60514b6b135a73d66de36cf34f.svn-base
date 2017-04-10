var length=0;
var totalLength=localStorage.getItem('cus_sum_num')
function addnext(opts,hasnextpage,isbtn) {

	if (hasnextpage == 'true') {
		$.ajax({
						url: CAPITALRECORD_JSON_URL,
						type: 'post',
						data: opts,
						dataType: 'json',
						success: function (data) {
              var result = data.list;
              if (result == null) {
                return false;
              }
              if (result.length > 0) {
                var last = 0;
                $.each(result, function (i, item) {
                  if (item.gender == '1') {//男
                    item.sex_nan = true;
                  } else if (item.gender == '2') {//女
                    item.sex_nv = true;
                  } else {//未知
                    item.sex_weizhi = true;
                  }
                  if (item.investMoneyTotal == '') {//投资金额
                    item.investMoneyTotal = 0;
                  }
                  if (item.gender == '1') {
                    item.gendersex = true;
                  }
                  if (item.gender == '2') {
                    item.gendersexy = true;
                  }
                  if (parseFloat(item.investMoneyTotal) >= 50) {//投资大于50万
                    item.over50 = true;
                  }
                  if (parseFloat(item.investMoneyTotal) >= 20) {//投资大于20万
                    item.over20 = true;
                    item.investMoneyTotal = parseFloat(item.investMoneyTotal).toFixed(2);
                  }
                  if (parseFloat(item.investMoneyTotal) < 20) {
                    item.small20 = true;
                  }
                  if (item.expire10_product == '') {//到期
                    item.expire10_product = '无';
                  }
                  if (item.investEarlyTime == '') {//在多少天内有到期的产品
                    item.investEarlyTime = '无';
                  }
                })
                length=length+data.list.length;
                $.get('./templates/custom_list.tpl', { "time": new Date().getTime() }, function (template) {
                  var result = Mustache.render(template, data);
                  if(isbtn) {//按钮操作--》筛选第一页
                    $("#list_data").html('');
                    length = data.list.length;
                  }
                  $('#cusNumCount').text(length);
                  $("#list_data").append(result);
                  opts.current++;
                  $('#current').val(opts.current);
                  $('#hasnextpage').val(data.hasnextpage);

                });
              } else {
                $('#cusNumCount').text(totalLength);
                var without=$("#data_list").find('p.without');
                if(without){
                  $("#data_list").find('p.without').remove();
                }
                $('#list_data').html('');
                $('#cusNumCount').text('0');
              }
			},
			error: function (data) {
				tip_window(data.msg, '确定');
			}
				});
	} else {
          $('#cusNumCount').text($('#list_data tr').length);
	}

}
$(function () {
  search(1,'true');
  $("#cusNumCount").html(localStorage.getItem("cus_sum_num"))
	$('#sel-sex li').click(function () {//选择 性别
		if ($(this).hasClass('check')) {
			$(this).removeClass('check');
		} else {
			$(this).addClass('check').siblings().removeClass('check');
		}
	 })
	$('#order-ul li').click(function () {//选择
        $(this).toggleClass('moretol').addClass('lesstom');
        var index=$(this).index();
        if(index == 0){//剩余天数
          if ($(this).attr('remain_day_sort') == 'asc' || $(this).attr('remain_day_sort') == ''){
            $(this).attr('remain_day_sort', 'desc');
          }else{
            $(this).attr('remain_day_sort', 'asc');
          }
        }
        if (index == 1) {//金额排序
          if ($(this).attr('invest_money_sort') == 'asc' || $(this).attr('invest_money_sort') == '') {
            $(this).attr('invest_money_sort', 'desc');
          }else{
            $(this).attr('invest_money_sort', 'asc');
          }
        }
	 })
	$('#reset').click(function () {//重置
    $('input').val('');
		$('#sel-sex li').removeClass('check');
		$('#order-ul li').each(function () {
			$(this).removeClass();
			if ($(this).index() == 0) {
				$(this).attr('remain_day_sort', 'asc');
			}
			if ($(this).index() == 1) {
				$(this).attr('invest_money_sort', 'asc');
			}
		});
	});
})
function search(current,hasnextpage,isBtn) {//查询条件判断

		var minInvest = parseFloat($('input[name=minInvestMoneyTotal]').val().trim());//最低价
		var maxInvest = parseFloat($('input[name=maxInvestMoneyTotal]').val().trim());//最高价
		var min_remaining_time = parseFloat($('input[name=min_remaining_time]').val().trim());//到期1
		var max_remaining_time = parseFloat($('input[name=max_remaining_time]').val().trim());//到期2
    btn=isBtn;
		if (minInvest && maxInvest) {
      if (minInvest > maxInvest) {
        tip_window('最低价不能大于最高价', '取消')
        return false;
      }
		}
		if(maxInvest && maxInvest>10000000){
      tip_window('最高价不能大于1000万','取消');
      return false;
    }
		if (minInvest < 0 || maxInvest < 0) {
      tip_window('金额区间不能为负数', '取消');
      return false;
		}
		if (min_remaining_time != '' && max_remaining_time != '') {
      if (min_remaining_time > max_remaining_time) {
        tip_window('到期天数区间不正确', '取消')
        return false;
      }
		}
		if(max_remaining_time && max_remaining_time>3655){
      tip_window('到期天数不能大于3655天', '取消');
      return false;
    }
		if (min_remaining_time < 0 || max_remaining_time < 0) {
		  tip_window('到期天数不能为负数', '取消')
		}
  var condition = form2json('form');
  condition.current=current;
  condition.tokenid = getCookie("tokenid");
  condition.version = app_data.version;
  condition.sex = $('#sel-sex').find('li.check').attr('data-type');
  $('#order-ul li').each(function () {
    var index = $(this).index();
    if($(this).hasClass('moretol') || $(this).hasClass('lesstom')){
      if (index == 0) {
        if(!$(this).siblings().hasClass('moretol') && !$(this).siblings().hasClass('lesstom')){//只按到期天数排序
          $(this).siblings().attr('invest_money_sort', '');
        }
        condition.remain_day_sort = $(this).attr('remain_day_sort');
      }
      if (index == 1) {
        if(!$(this).siblings().hasClass('moretol') && !$(this).siblings().hasClass('lesstom')){//只按金额排序
          $(this).siblings().attr('remain_day_sort', '');
        }
        condition.invest_money_sort = $(this).attr('invest_money_sort');
      }
    }else{
      if (index == 0) {
        condition.remain_day_sort = $(this).attr('remain_day_sort');
      }
      if (index == 1) {
        condition.invest_money_sort = $(this).attr('invest_money_sort');
      }
    }
  });
	addnext(condition,hasnextpage,btn);

}

