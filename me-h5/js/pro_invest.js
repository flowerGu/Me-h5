
var most = parseFloat(localStorage.getItem('highest'));
var lastBuy = null;
var calcLastBuy = null;
var tokenid=getCookie('tokenid');
var id = getQueryString("id");
var status=getQueryString('status');
var product_type=decodeURI(window.location.href).split('?')[1].split('&');//产品类型
var productItem={};
product_type.forEach(function(item){
    var each=item.split('=');
    productItem[each[0]]=each[1]
});
var obj={
    step:0,//步进
    start_mon:0,//起投
    term:0,//封闭期
    year_income:0,//收益率
    surplus_invest_mone:0,	//剩余金额
    pre_investment:getCookie('highest')//最高可借
  };
(function(){
  var minHeight=$(document).height()<580?580:$(document).height();
  $('body').css({'minHeight':minHeight});
  $('.max_invest').text(parseFloat(obj.pre_investment).toFixed(2));
  $('.productDetail').attr('href',"productDetails.html?id=" + id);//项目详情
  $('.type-me').text(productItem['product-type']);//产品类型
  if(status==1){
    $('#buynow').on('click',function(){
      buynow();
    })
  }else{
      document.getElementById("buynow").setAttribute("disabled", true);
      $("#buynow").text("售空").css("background-color", 'rgb(159,159,159)');
  }
  $.ajax({
    type: "post",
    url: PROJECT_DETAIL_URL,
    data: { version: app_data.version, id: id },
    dataType: "json",
    success: function (data) {
      obj.step=data.stepping;//步进
      obj.start_mon=data.start_invest_money;
      obj.term=data.product_cycle;
      obj.year_income=data.years_income;
      obj.surplus_invest_mone=parseFloat(data.surplus_invest_mone).toFixed(2) || '0.00';
      $('.header>p').attr('id',data.id).text(data.protuct_name);
      $('.time_m').text(obj.term);//封闭期
      $('.start_invest').text(parseFloat(obj.start_mon).toFixed(2));//起借金额
      $('.retain_money').text(obj.surplus_invest_mone);//剩余可投金额
      $('.year_be>span').text(parseFloat(obj.year_income * 100).toFixed(2));
      var totalMoney=parseFloat(data.max_invest);
      var surplus=parseFloat(data.surplus_invest_mone);
      $('.process-bar-val').css({'width':(totalMoney-surplus)/totalMoney*100+'%'})
      //最后一笔
      if (data.lastBuy) {
        lastBuy = data.lastBuy;
        tipLastBuy();
        $('.invest_num').val(data.lastBuy);
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
        if(isNaN(Number(value)) || isNaN(value) || value=='0' || value==''){
          $(this).val(obj.start_mon);
          return false;
        }
        if(!lastBuy){
          value=parseFloat(value);
          var start_mon=parseFloat(obj.start_mon);
          var step=parseFloat(obj.step);
          $(this).val(parseInt((value - start_mon) / step) * step + start_mon);//不是最后一笔时，必须为步进的整数倍
        }
        calFn({
          invest:parseFloat($(this).val())
        })
      })
    },
    error: function (data) {
    }
  })
})()
function tipLastBuy(cancelBtn, okBtn) {
  tools.dialog({
    title: '提示',
    content: '<span>尊敬的客户：由于此项目的剩余可买金额小于起借金额，您将享有</span><span class="red-txt">一次性出借该项目剩余所有可买金额的特权</span><span>，是否确定出借？</span>',
    btn: ['确定', '取消'],
    cb: [okBtn === undefined ? false : okBtn, cancelBtn === undefined ? 'index.html' : cancelBtn]
  });
}
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
function calFn(opts){
  var remain_money =obj.surplus_invest_mone;//剩余可投金额
  var touzi =opts.invest;//出借金额
  var start_mon =parseFloat(obj.start_mon);//起借金额
  if(opts.minus && status==1 && !lastBuy){
    touzi=(touzi-parseFloat(obj.step)).toFixed(2);
    if(!lastBuy){
      $('.invest_num').val(parseInt(touzi));
    }else{
      $('.invest_num').val(touzi);
    }
  }
  if(opts.plus && status==1  && !lastBuy){
    touzi=(touzi+parseFloat(+obj.step)).toFixed(2);
    if(!lastBuy){
      $('.invest_num').val(parseInt(touzi));
    }else{
      $('.invest_num').val(touzi);
    }
  }
  if(!lastBuy){
    $('.invest_num').val(parseInt(touzi));
  }
  if (touzi < start_mon && !lastBuy && status==1) {
    tip_window('出借金额不能小于' + start_mon, '确定');
    $('.invest_num').val(start_mon);
    return false;
  }
  if (Math.max(obj.pre_investment, +lastBuy) < start_mon) {
    tip_window('出借金额不能大于最高可借', '取消');
      $('.invest_num').val(parseInt(obj.pre_investment));
    return false;
  }
  var s_result=(((((obj.year_income/12).toFixed(12))*(obj.term)).toFixed(10))*touzi).toFixed(2);
  $('.gain_num').text(s_result);
}
function buynow() {
  var retain_money = +$('.retain_money').text();//剩余可投金额
  var touzi;
  touzi = +$('.invest_num').val().trim();
  if (getCookie("tokenid") == null) {
    tip_windows('您还未登录', '登录', '取消', 'index.html');
    return false;
  }
  var balance = getCookie('balance');
  var trade_money = $('.invest_num').val();
  // 最后一笔验证
  if (lastBuy && lastBuy != touzi) {
    if (parseFloat(trade_money) > lastBuy) {
      $('.invest_num').val(lastBuy);
    }
  } else {
    if (touzi > retain_money) {
      tip_window('出借总额不能大于剩余金额', '取消');
      return false;
    }
  }
  $.post(JD_SAFEAUTH_JSON_URL,{
    version:app_data.version,
    tokenid:tokenid
  }).then(function(data){
    if(data.is_realname =='0'){
      window.location.href='idVerifi.html?me=1';
      return false;
    }
    if(!data.cus_address || !data.cus_email){
      tools.dialog({
        title:'尊敬的用户：',
        content:'您的个人信息不完善，请在个人设置中完善电子邮箱与通讯地址，否则您将无法收到出借合同。',
        btn:['去完善','稍后完善'],
        cb:['my_setting.html',undefined]
      });
      return false;
    }
    if(data.plat_trapwd_status=='0'){
      tools.dialog({
        title:'交易密码设置',
        content:'对不起：您还没有设置交易密码，请前去设置交易密码。',
        btn:['取消','交易密码设置'],
        cb:['','set_trade_pwd.html']
      })
    }else if(data.is_ratechart!='1'){
        tools.dialog({
          content:'Me金融风险评测问卷',
          btn:['取消','去评测'],
          align:true,
          cb:['','risk_level.html?tokenid='+tokenid+'&channel=1']
        })
    } else {
      toPay()
    }
    // else if(data.rate=='稳健型' && data.popup_rec!=1){
    // tools.dialog({
    //   title:'尊敬的用户',
    //   content:'您属于<span style="color:#ff4c4c">“稳健型”</span>的出借用户，偏好选择在保证本金安全的基础上，取得一定增值收入的出借模式。',
    //   btn:['我知道了','不再提示'],
    //   cb:[toPay,
    //       function(){
    //         $.post(ISPOPUP_JSON_URL,{
    //             tokenid:tokenid,
    //             type:2
    //         }).then(function(){
    //             if(data.code=='000'){
    //                 toPay();
    //             }
    //         })
    //       }]
    // })
    // $('.dialog').append('<img src="images/close.png" class="closeDialog"/>');
    // $('.dialog').on('click','.closeDialog',function(){
    //     $('.dialog,#backg').remove();
    // })
    // }

    })
  }
//支付
function toPay(){
    var pay_amount=$('.invest_num').val().trim();
    $.post(PAYREQUEST_JSON_URL,{
        version:app_data.version,
        tokenid:tokenid,
        saleplan_id:id,
        pay_amount:pay_amount,
        channel:app_data.type
    }).then(function(data){
        if(data.code=='000'){
            delete data.code;
            delete data.msg;
            delete data.tokenid;
            data.id=id;
            data.status=getQueryString('status');
            window.localStorage.setItem('proInvestUrl',window.location.href);
            window.localStorage.setItem('payRequestResult',JSON.stringify(data));
            window.location.href = "account_payment.html";
        }else{
            tip_window(data.msg,'确定');
        }
    })
}

