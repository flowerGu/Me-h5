var lastBuy = null;
	calcLastBuy = null,
	id = getQueryString("id"),
	status='',
	tokenid = getCookie('tokenid'),
	pay_type = null,
	year_reat = null,
 	obj={
		step:0,//步进
		start_mon:0,//起投
		term:0,//封闭期
		year_income:0,//收益率
		surplus_invest_mone:0,	//剩余金额
		pre_investment:0//最高可借
	},
	loan_type='',
	is_debtSell = null,
	originalBidId = null,//区分标的 VIP债转
	vipZz = getQueryString('zz');//VIP 二次三次 债转
(function(){
	var minHeight=$(document).height()<580?580:$(document).height();
	$('body').css({'minHeight':minHeight});
})()
function tipLastBuy(cancelBtn,okBtn){
		tools.dialog({
			title: '提示',
			content: '<span>尊敬的客户：由于此项目的剩余可买金额小于起借金额，您将享有</span><span class="red-txt">一次性出借该项目剩余所有可买金额的特权</span><span>，是否确定出借？</span>',
			btn: ['确定', '取消'],
			cb: [okBtn === undefined? false:okBtn, cancelBtn===undefined?'index.html':cancelBtn ]
		});
}
ajax({
	url: BIDONEDETAILS_JSON_URL,
	data: {
		bid_id: id,
		invest_amount: 1000
	},
	cb: function (data) {
		if(data.code=='000'){
			obj.step=data.stepping;
			obj.start_mon=data.start_invest_money;
			obj.term=data.loan_times;
			obj.year_income=data.year_reat;
			obj.surplus_invest_mone=parseFloat(data.surplus_invest_money).toFixed(2) || '0.00';
			obj.pre_investment=parseFloat(data.max_invest).toFixed(2) || '0.00';
			status=data.statusNew;
			loan_type = data.loan_type;
			originalBidId = data.originalBidId;
			pay_type = data.pay_type;
			year_reat = parseFloat(data.year_reat);
			if(loan_type !='转让' && vipZz!=1){
				$('.textTip>img').show();
				$('.textTip>img').click(function(){											
						tools.dialog({
							title:'提示',
							content:'此协议年化利率并非平台承诺收益。市场有风险，出借须谨慎。',
							btn:['确认'],
							cb:[undefined]
						})						
					$('.dialog>.dialog-title').css({'text-align':'center'});					
				})
			}
			if(loan_type == '转让' || vipZz == 1){//债转
				var protocol = data.bid_type == 'C2' ? 'protocol_diya_transfer.html' : 'protocol_transfer.html';
				$('.bidTransfer').attr('href', protocol).text('《债权转让协议》');//债转协议跳转
				$('#priceTip').text('当前债权价值(元)');
				$('#discountTip').text('折价金额(元)');
				$('#buynow').text(status==1?'立即承接':status=='2'?'已满标':'转让完成');
				$('.max_invest').text(data.bondMoney);
				$('.discount>p').eq(1).removeClass('gain_num').text(data.discountAmount);
			}else{//标的
				$('#buynow').text(['','立即出借','已满标','回款中','已结束'][status]);
				$('.max_invest').text(obj.pre_investment);//最高可借
				var bidsProtocol = {
					'惠农贷': 'bidDeal.html',
					'高端贷': 'bidDeal_high.html',
					'房e贷': 'bidDeal_house.html'
				}
				$('.bidTransfer').attr('href', 'about_app/' + bidsProtocol[loan_type]);//标的协议跳转
			}
			if(status==1){
				$('#buynow').on('click',function(){
					if ($('#isCheck').prop('checked')) {
					buynow();
					}
				})
			}else{
				$("#buynow").css("background-color", '#dddcdd');
			}
			var zz = (loan_type == '转让'|| vipZz ==1)?'zz':'';//债转跳详情
			$('.productDetail').attr('href',"bidsecdetails.html?id="+id+"&status="+status+'&zz='+zz );
			$('.id-p').attr('id', data.bid_id).text(data.loan_title);
			$('.time_m').text(obj.term);//封闭期
			$('.start_invest').text(parseFloat(obj.start_mon).toFixed(2));//起借金额
			$('.type-jx').text(vipZz == 1?'转让':data.loan_type);
			var totalMoney=parseFloat(data.max_invest);
			var surplus=parseFloat(data.surplus_invest_money);
			$('.process-bar-val').css({'width':(totalMoney-surplus)/totalMoney*100+'%'})
			//最后一笔
			if (data.lastBuy) {
				lastBuy = data.lastBuy;
				$('.invest_num').val(data.lastBuy);					
				tools.dialog({
					title: '提示',
					content: '<span>尊敬的客户：由于此项目的剩余可买金额小于起借金额，您将享有</span><span class="red-txt">一次性出借该项目剩余所有可买金额的特权</span><span>，是否确定出借？</span>',
					btn: ['确定', '取消'],
					cb: [false, 'me.html']
				});					
				$('.invest_num').attr('disabled',true).css({'background-color':'#fff'});
				calFn({
					invest:parseFloat(data.lastBuy)
				})
			}else {
				$('.invest_num').val(obj.start_mon);
				calFn({
					invest:obj.start_mon
				});
			}
			$('.invest_num').on('change',function(){//直接修改金额
				var value=$(this).val();
				if(isNaN(Number(value)) || isNaN(value) || value=='0' || value == ""){
					$(this).val(obj.start_mon);
					calFn({
						invest:parseFloat(obj.start_mon)
					})
					return false;
				}
				if(!lastBuy){
					value=parseFloat(value);
					var start_mon=parseFloat(obj.start_mon);
					var step=parseFloat(obj.step);
					if((loan_type == '转让' || vipZz ==1)&& status ==1 && value>= obj.surplus_invest_mone){//转让 全部购买
						$(this).val(obj.surplus_invest_mone);
					}else{
						$(this).val(parseInt((value - start_mon) / step) * step + start_mon);//不是最后一笔时，必须为步进的整数倍
						calFn({
							invest:(parseInt((value - start_mon) / step) * step + start_mon)
						})
					}
				}
				calFn({
					invest:parseFloat($(this).val())
				})
			})
			$('.retain_money').text(obj.surplus_invest_mone);//剩余可投金额
			$('.mostest').text(obj.pre_investment);
			$('.year_be>span').text((parseFloat(obj.year_income) * 100).toFixed(3));

		}
}
})

$('.decre').on('click',function(){//递减
	calFn({
		invest:parseFloat($('.invest_num').val()),
		minus:true
	})
})
$('.incre').on('click',function(){//递增
	calFn({
		invest:parseFloat($('.invest_num').val()),
		plus:true
	})
})
function calFn(opts){//计算器
	if(!$('body').find('.gain_num')){//债转不计算
		return false;
	}
	var remain_money =obj.surplus_invest_mone;//剩余可投金额
	var touzi =parseFloat(opts.invest);//出借金额
	var start_mon =parseFloat(obj.start_mon);//起借金额
	if(status == 1){//可购买
		if(!lastBuy){
			if(opts.plus  && touzi<remain_money){//加
				touzi=touzi+parseFloat(obj.step);
				if(touzi > remain_money){
					//一种情况是，剩余金额不是步进的整数倍:eg:剩余金额为37448.58,37400+100>37448.58,重置为剩余金额
					touzi = remain_money;
				}
			}else if(opts.minus){//减 ->减步进
				touzi=touzi-parseFloat(obj.step);
			}
			if(touzi>= remain_money){//出借金额大于剩余金额时
				if(parseFloat(remain_money.split('.')[1])>1){//小数位大于0
					$('.invest_num').val(remain_money);
				}else{//整数
					$('.invest_num').val(parseInt(remain_money));
				}
			}else{
				$('.invest_num').val(parseInt((touzi) / obj.step) * obj.step);
			}
		}else{//最后一笔购买
			$('.invest_num').val(touzi);
		}
	}
	if (Math.max(obj.pre_investment, +lastBuy) < touzi) {
		if(status==1){
			tip_window('出借金额不能大于最高可借', '取消');
		}
		$('.invest_num').val(parseInt(obj.surplus_invest_mone));
		if(parseFloat(obj.surplus_invest_mone)>parseFloat(obj.pre_investment)){
			touzi = parseFloat(obj.pre_investment);
		}else{
			touzi = parseFloat(obj.surplus_invest_mone);
		}
		
		// return false;
	}
	if (touzi < start_mon && !lastBuy && status==1) {
		tip_window('出借金额不能小于' + start_mon, '确定');
		$('.invest_num').val(start_mon);
		touzi = start_mon;
		// return false;
	}
	if(pay_type=='等额本息'){
		var month_reat = parseFloat(obj.year_income/12).toFixed(4);
		var s_result = parseFloat(touzi*month_reat*(Math.pow(1+parseFloat(month_reat),obj.term))/((Math.pow(1+parseFloat(month_reat),obj.term)-1))*obj.term-touzi).toFixed(2);
	}else{
		var s_result = (((((obj.year_income/12).toFixed(12))*(obj.term)).toFixed(10))*touzi).toFixed(2);
	}
	if($('body').find($('.gain_num'))){
		$('.gain_num').text(s_result);
	}

}
function tip_buy(text, btn1_value, btn2_value) {
	$("body").append("<div class=\"tip_window tip1\"><div><SPAN>" + text + "</SPAN><br/><br/><input type=\"button\" value=" + btn1_value + " onclick=\"insurebuy()\"  style=\"width: 70px;height: 35px;margin-right:20px\" /><input type=\"button\" value=" + btn2_value + " onclick=\"close_buy()\" style=\"width: 70px;height: 35px;\" /></div></div><div id=\"backg\"></div>");
	$("#backg").css("display", "block");
	$(".tip1").css("display", "block");
}
function buynow() {
	if (tokenid == null) {
		tip_windows('你还未登录', '登录', '取消', 'index.html');
		return false;
	}
	ajax({
		url: JD_GET_DETAIL_URL,
		cb: function (data) {
			var realname_status = data.realname_status;//实名？
			var temp4 = data.temp4;//江西是否开户
			var jdBalance = data.jd_balance;//金盾余额
			var temp5 = data.temp5;//交易密码？
			if (realname_status != 1) {
				tip_windows_conform('您还未实名', '去实名', '取消', 'idVerifi.html')
				return false;
			}
			if (temp4 == '' || temp4 == '0') {
				tip_windows_conform('您还没有开通银行存管，请开通存管账户。', '去开户', '取消', 'openAnAccount.html');
				return false;
			}
			var trade_money = $('.invest_num').val();
			if (temp5 == '' || temp5 == '0') {
				tip_windows_conform('对不起，您还未设置交易密码，请先设置。。', '去设置', '取消', '', '', 'window.goTradingPwd()');
				return false;
			}
			if (jdBalance === '' || (parseFloat(jdBalance) < parseFloat(trade_money))) {
				tip_windows_conform('对不起，您的余额不足，请先充值。', '去充值', '取消', 'chongzhi.html');
				return false;
			}
			var isPass=isRate(2);
            if(!isPass.isRated){//是否风险测评
                return false;
            }
            is_debtSell = isPass.is_debtSell;
			topayDialog();
			// if (isPass.rate == '稳健型' && isPass.popup_rec != 1) {
			// 	tools.dialog({
			// 		title: '尊敬的用户',
			// 		content: '您属于<span style="color:#ff4c4c">“稳健型”</span>的出借用户，偏好选择在保证本金安全的基础上，取得一定增值收入的出借模式。',
			// 		btn: ['我知道了', '不再提示'],
			// 		cb: [topayDialog,
			// 			function () {
			// 				$.post(ISPOPUP_JSON_URL, {
			// 					tokenid: tokenid,
			// 					type: 2
			// 				}).then(function () {
			// 					if (data.code == '000') {
			// 						topayDialog();
			// 					}
			// 				})
			// 			}]
			// 	})
			// 	$('.dialog').append('<img src="images/close.png" class="closeDialog"/>');
			// 	$('.dialog').on('click', '.closeDialog', function () {
			// 		$('.dialog,#backg').remove();
			// 	})
			// } else {
			// 	topayDialog();
			// }
		}
	});
}
function topayDialog(){
	if( is_debtSell == 0 && (loan_type=='转让' || vipZz ==1)){
		tools.dialog({
			title:'Me金融提示您',
			content:'尊敬的用户，请先同意债权转让授权协议。',
			btn:['去授权'],
			cb:[jd_transfer]
		})
		return false;
	}
    if(lastBuy){
        if(parseFloat($('.invest_num').val()) > lastBuy){			
				tipLastBuy(undefined,function(){
					$('.invest_num').val(lastBuy);
					tip_windows_conform('您确定要出借吗？', '取消', '出借', '', '', '', 'highLoan()');
				})
        }else{
            tip_windows_conform('您确定要出借吗？', '取消', '出借', '', '', '', 'highLoan()');
        }
    }else{
        tip_windows_conform('您确定要出借吗？', '取消', '出借', '', '', '', 'highLoan()');
    }
}
function highLoan(){//添加高端贷校验
	if(loan_type == '高端贷'){
		tools.dialog({
			title:'Me金融提示您：',
			content:'该产品由借款人采用等额本息方式按月回款，每月实际回款金额请以合同约定的回款计划为准，建议您循环出借获取更高收益。',
			btn:['确定','取消'],
			cb:[showsend,undefined]
		})
	}else{
		showsend()
	}
}
function insurebuy() {
	var code = $('#code-input').val().trim();
	var operationamount = $('.invest_num').val();
	if (operationamount == '' || operationamount == 0) {
		tip_window('请输入操作金额', '取消')
		return false;
	}
	if (code == '') {
		tip_window('验证码不能为空', '取消')
		return false;
	}
	if((loan_type == '转让'|| vipZz ==1) || originalBidId){//债权转让
		$('#confirm').attr('disabled',true);
		ajax({
			url:BIDTRANSFERTOPAY,
			data:{
				operationamount: operationamount,
				channel:app_data.type,
				bid_trans_id:id,
				checkcode:code
			},
			cb:function(data){
				$('#confirm').attr('disabled',false);
				if(data.code =='000'){
					delete data.tokenid;
					delete data.version;
					delete data.msg;
					data.status = status;
					data.id = id;
					localStorage.setItem('debtSell',JSON.stringify(data));
					window.localStorage.setItem('zzProInvestUrl',window.location.href)
					window.location.href = (originalBidId && !vipZz)?'obj_invest_success.html?zz=1&originalBidId=1':'obj_invest_success.html?zz=1'
				}
			},
			dialog: function (msg, code) {
				$('#confirm').attr('disabled', false);
				hide()
				if (code == "PY028") {
					tools.dialog({
						title: 'Me金融提示您',
						content: msg,
						btn: ['知道了', '去了解'],
						cb: [undefined, "about_app/risk_tip_book.html" ]
					})
				} else if (code == "PY027") {
					tip_window(msg, '知道了');
				} else if (code == "PY029") {
					tools.dialog({
						title: 'Me金融提示您',
						content: msg,
						btn: ['我知道了', '重新评测'],
						cb: [undefined, function () { window.location.href = "risk_level.html?channel=5&tokenid=" + tokenid }]
					})
				} else {
					tip_window(msg, '确定');
					return false;
				}
			},
			err:function(data){
				$('#confirm').attr('disabled',false);
			}
		})
	}else{//标的购买
		$('#confirm').attr('disabled',true);
		var objtradeData = {};
		objtradeData.operationamount = operationamount;
		objtradeData.bid_id = id;
		objtradeData.checkcode = code;
		objtradeData.channel = app_data.type;
		localStorage.setItem("objtradeData", JSON.stringify(objtradeData));
		ajax({
			url: BIDTOPAY_JSON_URL,
			data: objtradeData,
			cb: function (data) {
				$('#confirm').attr('disabled',false);
				if (data.code == '000') {
					var tradeid = data.tradeid;
					var trade = { bid_id:id, tradeid: tradeid, status:status };
					localStorage.setItem("trade", JSON.stringify(trade));
					window.localStorage.setItem('objProInvestUrl',window.location.href);
					delete data.version;
					delete  data.code;
					delete  data.msg;
					delete  data.tokenid;
					delete  data.tradeid;
					delete  data.surename;
					delete  data.cardid;
					var target = data.TARGET_URL;
					delete  data.TARGET_URL;
					delete data.nextNo;
					delete data.num;
					delete data.preNo;
					delete data.totalNum;
					delete data.version;
					post_yb(target, data);
				} else if (data.code == 'PY002') {
					tip_window('未实名认证', '去认证', 'idVerifi.html?status=0');
					return false;
				} else if (data.code == 'PY003') {//未綁定銀行卡
					tip_window('未绑定银行卡', '去绑定', 'my_setting.html');
					return false;
				} else if (data.code == 'PY007') {//餘額不足
					tip_window('未授权', '去授权', 'my_setting.html');
					return false;
				} else if (data.code == 'PY001') {
					tip_window('余额不足', '去充值', 'chongzhi.html');
					return false;
				} else if (data.code == 'PY005') {//自動轉賬授權
					tip_window('网络超时', '确定');
					return false;
				}else {
					tip_window(data.msg, '确定');
					return false;
				}
			},
			dialog: function (msg, code) {
				$('#confirm').attr('disabled', false);
				hide();
				if (code == "PY028") {
					tools.dialog({
						title: 'Me金融提示您',
						content: msg,
						btn: ['知道了', '去了解'],
						cb: [undefined, function () { window.location.href = "about_app/risk_tip_book.html" }]
					})
				} else if (code == "PY027") {
					tip_window(msg, '知道了');
				} else if (code == "PY029") {
					tools.dialog({
						title: 'Me金融提示您',
						content: msg,
						btn: ['我知道了', '重新评测'],
						cb: [undefined, function () { window.location.href = "risk_level.html?channel=5&tokenid=" + tokenid }]
					})
				} else {
					tip_window(msg, '确定');
					return false;
				}
			},
			err: function (data) {
				$('#confirm').attr('disabled',false);
			}
		});
	}

}
function hide() {
	$('.bg-sendcode').fadeOut();
	$('.sendcode-wrap').fadeOut();
}
function showsend() {
	$('.bg-sendcode').fadeIn();
	$('.sendcode-wrap').fadeIn();
	var phone = getCookie('tel_no');
	phone = phone.substr(0, 3) + "*".repeat(4) + phone.substr(7)
	$('#tel-span').text(phone);
}
var time = 60;
function send() {
	if (time == 0) {
		$('.sendcodebtn').val('重新发送').removeAttr('disabled').css({ 'background': '#ff4c4c' });
		time = 60;
	} else {
		$('.sendcodebtn').val(time + 's后重发').attr('disabled', true).css({ 'background': '#8f8f8f' });
		time--;
		setTimeout(send, 1000);
	}
}
function topaycheckcode() {
	var topay = {};
	topay.phone_number = getCookie('tel_no');
	topay.type = 22;
	ajax({
		url: TOPAYJXCHECKCODE_JSON_URL,
		data: topay,
		cb: function (data) {
			if (data.code == '000') {
				send();
			} else {
				tip_window(data.msg, '取消');
			}
		}
	})
}
function backFn(){
	var history=document.referrer;
	if(history.indexOf('obj_invest_success.html')>-1 || history.indexOf('obj_invest.html')>-1 || history==''){//如果是购买结果页，则返回首页
		window.location.href='index.html';
	}else if(history){//返回上一页
		window.location.href=history;
	}
}
$('#isCheck').prop('checked', false);
$('.checkboxWrap ').on('click', '#isCheck', function () {//checkbox框
	$(this).parent().toggleClass('checked');
	if ($(this).prop('checked') && status == 1) {
		$('#buynow').css('background-color', "#ff4c4c");
	} else {
		$('#buynow').css('background-color', "rgb(221, 220, 221)");
	}
})