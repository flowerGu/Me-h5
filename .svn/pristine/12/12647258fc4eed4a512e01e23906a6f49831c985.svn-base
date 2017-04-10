/**
 * 首页
 */

//banner
ajax({
  url: BANNER_JSON_URL,
  cb: function (data) {
    $('.swiper-wrapper').html(Mustache.render($('#banner').html(), data))
    new Swiper('.swiper-container', {
      loop: true,
      pagination: '.swiper-pagination',
      autoplay: 5000
    });
  }
});

// 统计
ajax({
  url: STATISTICS_URL,
  data: {
    client_type: app_data.type
  },
  cb: function (data) {
    $('#statistics').html(Mustache.render($('#statistics_tpl').html(), data))
  }
});

// 图标菜单
ajax({
  url: GETICONLIST_JSON_URL,
  data: {
    type: app_data.type
  },
  cb: function (data) {
    $('#icon_menu').html(Mustache.render($('#icon_menu_tpl').html(), data));
  }
});

// 处理数据供mustache判断
function processData(list, type) {

  //江西金盾产品状态
  var products_type = ['承接', '出借', '已满标', '回款中', '已结束'];

  for (var i = list.length - 1; i > -1; i--) {
    list[i].progress = ((list[i].totalMoney - list[i].surplusInvestMoney) / list[i].totalMoney) * 100;
    list[i].status1 = list[i].status == 1 ? true : false;
    list[i].status2 = list[i].status == 2 ? true : false;
    if(type === 'transfers'){
      list[i].loan_purpose_cd += list[i].borrowNum.substr(0,4) + '...';
    }
    if (list[i].statusNew) {
      list[i].enabled = list[i].statusNew == '1';
      if (list[i].loan_type === '转让') {
        list[i].statusNew = list[i].statusNew==1?'承接':list[i].statusNew=='2'?'已满标':'转让完成'
      }
      else {
        list[i].statusNew = products_type[parseInt(list[i].statusNew, 10)];
      }
    }
    if(list[i].loan_type){//债转 标的保留两位小数
      list[i].surplusInvestMoney =parseFloat(list[i].surplusInvestMoney).toFixed(2)
      list[i].totalMoney =parseFloat(list[i].totalMoney).toFixed(2)
    }
  }
}

// product list
ajax({
  url: THREE_SWITCH_INDEX,
  cache: false,
  cb: function (data) {
    var threeswitchquery = JSON.parse(window.sessionStorage.getItem('threeswitchquery'));
    var respect_enjoy = switch_channel.getItem().respect_enjoy;
    if(threeswitchquery){
      var show_vip = threeswitchquery.show_vip?true:false;
    }
    switch_channel.setItem({
      show_business: data.show_business == '1',
      show_transfers: data.show_debttransfer == '1',
      show_account: data.show_account,
      show_vip:show_vip,
    });
    if(data.newProducts && data.newProducts.length>0 && data.newShowBusiness!='0'){
        $('.switch-new-me-business').show();
        processData(data.newProducts);
        $('#new_prod_list').html(Mustache.render($('#new_prod_list_tpl').html(), data));
      }
    if (switch_channel.getItem().show_business) {
      processData(data.products);
      $('#prod_list').html(Mustache.render($('#prod_list_tpl').html(), data));
    }
    if (switch_channel.getItem().show_transfers) {
      if(data.transfers && data.transfers.length == 0){
        // no data
      }else{
        $('#jx_transfers_list').parent().removeClass('hide');
        processData(data.transfers, 'transfers');
        $('#jx_transfers_list').html(Mustache.render($('#jx_transfers_list_tpl').html(), data));
      }
    }
    processData(data.bids);
    $('#jx_list').html(Mustache.render($('#jx_list_tpl').html(), data));
  }
});

$('#prod_list,#new_prod_list').on('click', '>a', function () {
  setCookie('highest', $(this).data('investment'));
  window.location.href = "pro_invest.html?id=" + $(this).data('id') + "&status=" + $(this).data('status') + '&product-type=' + $(this).data('productType');
  return false;
});

// 菜单
custFn(1);

//客户关怀
(function(){
  var idCard = getCookie('idCard');
  var plate_app = navigator.userAgent.toLowerCase().indexOf('mobile')>-1;
    birthdayNow = JSON.parse(localStorage.getItem('birthdayNow')),
    month_user = tokenid && idCard?idCard.substr(-8,2):'',//客户月份
    date_user = tokenid && idCard?idCard.substr(-6,2):'',//客户日期
    date_system = new Date();
    month_system = date_system.getMonth()<9?'0'+(date_system.getMonth()+1):date_system.getMonth()+1;
    date_system = date_system.getDate()<10?'0'+date_system.getDate():date_system.getDate().toString();
    birthday_user = month_user+date_user;
    newDate_system = month_system+date_system;
  if(idCard && plate_app && !birthdayNow && birthday_user == newDate_system){
      $('.wishWrap').removeClass('hide');
      $('.wishContainer>p').text(getCookie('userName'));
      $('.wishWrap>.close').on('click',function(){
        $(this).parent().addClass('hide');
        localStorage.setItem('birthdayNow',true);
        riskTip();
      })
  }else{
    riskTip();
  }
})()
function riskTip(){
  //登录成功之后清除风险提示记录
  if (!window.localStorage.getItem('fengxiantishi') && !window.sessionStorage.getItem('fengxiantishi')) {
    $('.system-message-fengxian').show();
    $('.system-message-fengxian').find('.broadBg').show();
  }
  $('.checkboxWrap').on('click', function () {
    if ($(this).hasClass('checked')) {
      $(this).removeClass('checked');
      $('#J_zdl').css({ 'background': '#ccc' })
    } else {
      $(this).addClass('checked');
      $('#J_zdl').css({ 'background': '#fe3652' })
    }
  });
  $('#J_zdl').on('click', function () {
    if ($('.checkboxWrap').hasClass('checked')) {
      window.sessionStorage.setItem('fengxiantishi', true);
      $('.system-message-fengxian').hide();
      $('.system-message-fengxian').find('.broadBg').hide();
      return false;
    }
  });
  $('#J_no_tips').on('click', function () {
    if ($('.checkboxWrap').hasClass('checked')) {
      window.localStorage.setItem('fengxiantishi', true);
      $('.system-message-fengxian').hide();
      $('.system-message-fengxian').find('.broadBg').hide();
      return false;
    }
  });
  //风险提示书留痕
  $("#J_zdl,#J_no_tips").on("click", function () {
    if ($('.checkboxWrap').hasClass("checked") && tokenid) {
      ajax({
        url: CONFIRM_AGREEMENT_URL,
        data: {
          channel: 'h5'
        },
        cb: function (data) {
        }
      })
    }
  })
  //系统消息
  var messageid = window.localStorage.getItem('messageid');
  ajax({
    url: SYSTEMMESSAGE_JSON_URL,
    data: {
      type: app_data.type
    },
    cb: function (data) {
      if (!!data.content && (messageid == null || (messageid !== null && messageid !== data.messageid))) {
        $('.system-message .broadWrap h2').text(data.title);
        if (data.content && data.content.length > 120) {
          data.content = data.content.substr(0, 120) + '...';
        }
        $('.system-message .broadWrap div').append(data.content);
        var regRN = /\r\n/g;
        $('.broadWrap div').text().replace(regRN, "<br />");

        $('.system-message .broadBg').css({
          'display': 'block'
        });
        $('.system-message .broadWrap').addClass('showTop');
        setTimeout(function () {
          $('.system-message .closebroad').animate({
            "opacity": 1
          }, 600);
        }, 500)
        $('.system-message .closebroad').click(function () {
          window.localStorage.setItem('messageid', data.messageid);
          $(this).animate({
            "opacity": 0
          }, 300, function () {
            $('.system-message .broadWrap').removeClass('showTop');
            setTimeout(function () {
              $('.system-message .broadBg').css({
                'display': 'none'
              })
            }, 400);
          })
        })
      }
    }
  });
} 
    


