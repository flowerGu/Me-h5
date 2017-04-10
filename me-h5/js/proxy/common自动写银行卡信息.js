//'use strict';
/**
 * 账户页面几个共用js
 */
var app = app || {};
app.method = {};
var tokenid = getCookie('tokenid');
var tel_no = getCookie('tel_no');

initH('#main,body', window, undefined, function (dom, h) {
  $(document.body).height(h);
  $('#main').height(h - $('input.fixed-bottom').height());
});

// 去除300ms
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

// 模拟单选 radio
$('.js-radio').on('click', function () {
  var _this = $(this);
  var radio = _this.children('label.radio');
  if (radio.hasClass('active')) {
    return;
  }
  //非通用代码
  if (!$(this).hasClass('js-drop-down')) {
    var otherRadio = $('.js-drop-down.js-radio');
    otherRadio.hasClass('active') && otherRadio.trigger('click');
  }
  $('label.radio.active').removeClass('active');
  var radiobox = _this.children('label.radio').addClass('active').children('input')[0];
  if (radiobox) {
    radiobox.checked = true;
  }
});

//弹框通用关闭事件   弹框的 .back 不要 return false
$(document.body).on('click','.wrap-dialog>.header>.back',function(){
  var dom = $(this).parent().parent();
  dom.removeClass('active');
  $('[data-target="#'+ dom[0].id +'"]')
  .removeClass('active')
  .find('.arrow-right').removeClass('active');
});

//下拉
$('.js-drop-down').on('click', function () {
  var _this = $(this);
  var href = _this.data('href');
  if (href) {
    window.location.href = href;
    return;
  }

  var target = $(_this.data('target'));

  if (_this.hasClass('active')) {
    _this.removeClass('active');
    target.removeClass('active');
    _this.find('.arrow-right').removeClass('active');
  }
  else {
    _this.addClass('active');
    target.addClass('active');
    _this.find('.arrow-right').addClass('active');
  }
  
  //分行 支行选择
  if (_this.data('target') === '#dialog_bank_subbranch') {
    target.data('type',_this.data('type'));
    target.data('target',_this.data('val'));
    app.method.addSubbranch();
    target.find('>.dialog-wrap-input>input').focus();
  }
  // 地区选择
  if (_this.data('target') === '#dialogArea') {
    target.data('target',_this.data('val'));
  }
});

// 自定义密码输入
(function () {
  var $pwd = $('#openKeyboard');
  if($pwd.length === 0){
    return;
  }
  var $keyboard = $('#keyboardDiv');
  var $pwdInput = $pwd.children('input');
  var currIndex = 0;
  $keyboard.keyboard({
    cb: function (val) {
      switch (val) {
        case 'del':
          if (currIndex < 1) {
            return;
          }
          $pwdInput[--currIndex].value = '';
          break;
        case 'close':
          $keyboard.keyboard('hide');
          break;
        default:
          if (currIndex > 5) {
            return;
          }
          $pwdInput[currIndex++].value = val;
          if (currIndex === 6) {
            $keyboard.keyboard('hide');
          }
          break;
      }
    },
    ready: function (dom) {
      // console.log('键盘安装完成');
    }
  });

  $pwd.on('click', function () {
    $keyboard.keyboard('show');
  })
})();

// 用户下拉银行卡列表
(function ($) {
  // div显示和隐藏
  var dialog = $('#dialogBanklist');
  // if(dialog.length === 0){
  //   return;
  // }
  function handleSelect() {
    var val = $(this).data('val');
    var data = $(this).data('text');

    if (val) {
      $('#bankType').val(data).data('id', val);
    }
    dialog.removeClass('active');
    $('[data-target="#dialogBanklist"]').removeClass('active');
    //return false;
  }

  $('.wrap-dialog>.header>.back').on('click', handleSelect);
  $('#banklist').on('click', 'li', handleSelect)

  // html 插入
  var strBankList = '{{#list}}<li data-json="{{json}}">' +
    '<img src="images/backlogo/{{bank_code}}.png" alt="">' +
    '<span>{{bank_name}} {{bank_num}}</span>' +
    '</li>{{/list}}';
  ajax({
    url: BANK_LIST_URL,
    data: {
      current: 1,
      cardType: 3,
      count: 30
    },
    async:false,
    cb: function (data) {
      if (data.code !== '000') {
        tip_window(data.msg, '确定');
        return;
      }
      if (data.list.length === 0) {
        $('.second-text.two-line').children('span').eq(0).addClass('hide');
        return false;
      }
      for (var len = data.list.length - 1; len > -1; len--) {
        var bank_num = data.list[len].bank_num;
        data.list[len].bank_num = bank_num.substr(-8);
        data.list[len].json=JSON.stringify(data.list[len]);
        //默认银行卡
        if (app.selectCard === undefined && data.list[len].default_bank_code === '1') {
          app.selectCard = data.list[len];
        }
      }
      // 默认银行卡
      if(app.selectCard === undefined && data.list.length>0){
        app.selectCard = data.list[0];
      }
      if(app.selectCard !== undefined){
        $('#js_val_quick').val(app.selectCard.bank_id);
        $('#js_text_quick').text(app.selectCard.bank_name + app.selectCard.bank_num);
        $('#js_limit_quick').text(parseFloat(app.selectCard.recharge_high_limit).toFixed(2));
        $('#js_bank_num_quick').text(app.selectCard.card_no);
        $('#js_bank_name_quick').text(app.selectCard.bank_name);
        // 原大额字段
        $('.js-bank-address').val(app.selectCard.province + app.selectCard.citiy);
        $('js-province').val(app.selectCard.province);
        $('js-citiy').val(app.selectCard.citiy);
        $('#sub_bank_name1,#sub_bank_name').val(app.selectCard.sub_bank_name);
        $('#branch_name1,#branch_name').val(app.selectCard.branch_name);
      }

      var result = Mustache.render(strBankList, data);
      $('.js-wrap-bank-list').each(function (index, item) {
        if ($(item).children('li').length > 0) {
          $(result).insertBefore($(item).children('li'));
        }
        else {
          $(item).html(result);
        }
      });
    }
  })
})(window.jQuery);

/**
 * 支持银行卡列表
 * class="js-drop-down" data-target="#dialog_bank_subbranch" data-type="2" data-val="#sub_bank_name"
 */
(function ($) {
  
  /**
   *   <div id="dialogSupportBankList" class="wrap-page wrap-dialog">
        <div class="header">
          <span>银行列表</span>
          <a class="back"></a>
        </div>
        <ul id="supportBankList" class="container has-border bank-card-list border-full wrap-bank-list"></ul>
      </div>
   */
  var wrap = $('#dialogSupportBankList');
  if (wrap.length === 0) {
    return;
  }
  // html 插入
  var strBankList = '{{#list}}<li data-val="{{bank_code}}" data-bank-name="{{bank_name}}" data-text="{{bank_name}}">' +
    '<img src="images/backlogo/{{bank_code}}.png" alt="">' +
    '<span>{{bank_name}}</span>' +
    '</li>{{/list}}';
  ajax({
    url: PROXY_BANK_INFO_LIST_URL,
    cb: function (data) {
      var result = Mustache.render(strBankList, data);
      wrap.children('ul').each(function (index, item) {
        if ($(item).children('li').length > 0) {
          $(result).insertBefore($(item).children('li'));
        }
        else {
          $(item).html(result);
        }
      });
    }
  });

  wrap.children('ul').on('click','>li',function(){
    var text=$(this).data('text');
    var val=$(this).data('val');
    var original=$('[data-target="#dialogSupportBankList"]');
    $(original.data('text')).val(text);
    $(original.data('val')).val(val);
    wrap.children('.header').children('.back').trigger('click');
  })

})(window.jQuery);

/**
 * 插入弹框验证码  移植的
 * #tel-span  手机号插入
 * #code-input 短信验证码 输入
 * #getCheckCode 发送按钮
 * #closeDialog 关闭按钮
 * #confirm 确认按钮
 * 
 * app.method.addCheckCode()
 */
app.method.addCheckCode = function (action, opts) {
  var dom = $('#form_checkcode');
  if (action === undefined || typeof action === 'object') {
    opts = action;
    action = 'init';
  }
  var method = {
    init: function () {
      if (dom.length > 0) {
        return;
      }
      var str = '<form id="form_checkcode" name="form_checkcode" class="wrap-dialog-checkcode">' +
        '<div class="bg-sendcode"></div>' +
        '<div class="sendcode-wrap">' +
        '<img src="images/send.png" />' +
        '<p class="msgp">短信安全验证</p>' +
        '<p class="tipp">短信将发送至：<span id="tel-span"></span></p>' +
        '<div class="codewrap">' +
        '<input type="text" placeholder="短信验证码" id="code-input" />' +
        '<input type="button" value="点击发送" class="sendcodebtn" id="getCheckCode" data-first="1">' +
        '</div>' +
        '<input type="button" value="取消" id="closeDialog" class="sendcancel">' +
        '<input type="button" value="确认" id="confirm" class="sendconfirm">' +
        '</div>' +
        '</form>';

      $(document.body).append(str);

      dom = $('#form_checkcode');
      dom.find('#closeDialog').on('click', method.hide)
      // dom.find('#confirm').on('click',function(){
      //   opts.cb($('#code-input').val(),method);
      // });  
    },
    show: function () {
      dom.addClass('active');
      $('#code-input').focus();
    },
    hide: function () {
      dom = dom || $('#form_checkcode');
      dom.removeClass('active');
    }
  };

  if (typeof method[action] === 'function') {
    method[action]();
  }

};


/**
 * 插入地区选择
 * #dialogArea 最外面的div
 * app.method.addAddress(值存放的选择器，逗号分隔)
 */
app.method.addAddress = function (target, cb) {
  target = target || '#province,#city,#area';
  var wrapDiv = '<div id="dialogArea" class="wrap-area-select wrap-dialog-list wrap-dialog" data-target="' + target + '">' +
    '<div class="header whitebg">' +
    '<div>区域选择</div>' +
    '<a href="javascript:;" class="back"></a>' +
    '</div>' +
    '<div class="area-value">' +
    '<span class="province">请选择</span>' +
    '<span class="city"></span>' +
    '<span class="area"></span>' +
    '</div>' +
    '<ul class="dialog-list"></ul>' +
    '</div>'
  var wrap = $(wrapDiv);
  $(document.body).append(wrap);

  var template = '{{#list}}<li data-parent-id="{{pcCode}}" data-pc-type="{{pcType}}"><span>{{pcName}}</span></li>{{/list}}';

  
  var list = wrap.find('.dialog-list')
  // 值 存放
  var contentSelect = [];
  $.each((wrap.data('target')||target).split(','), function (index, item) {
    contentSelect[index] = $(item);
  });
  var currSelect = 0;
  var maxLen = contentSelect.length - 1;
  var dialogVal = wrap.find('.area-value').children('span');

  //
  var parameters;

  function init() {

    parameters = [{ parentId: 0, pcType: 1 }];

    list.html('');

    dialogVal.each(function () {
      $(this).text('');
    })
  }
  init();
  //后退按钮
  wrap
    .children('.header')
    .children('.back')
    .off('click')
    .on('click', function () {
      if (currSelect === 0) {
        wrap.removeClass('active');
        init();
        return;
      }
      currSelect--;
      contentSelect[currSelect].text('');
      dialogVal.eq(currSelect).text('');
      parameters.splice(parameters.length - 1, 1);
      getData(parameters[currSelect]);
    })


  var getData = function (opts) {
    ajax({
      url: GETPROVINCECITY_JSON_URL,
      data: {
        parentId: opts.parentId,
        pcType: opts.pcType
      },
      cb: function (data) {
        var result = Mustache.render(template, data);
        list.html(result);
      }
    });
  }
  getData(parameters[0]);

  list.on('click', '>li', function () {
    var _this = $(this);
    var txt = _this.children('span').text();
    //contentSelect[currSelect].is('input')
    contentSelect[currSelect].val(txt);
    dialogVal.eq(currSelect).text(txt);
    if (currSelect === maxLen) {
      wrap.removeClass('active');
      cb(wrap.find('.area-value').text());
      init();
      return;
    }
    currSelect++;
    parameters[currSelect] = {
      parentId: _this.data('parent-id'),
      pcType: +_this.data('pcType') + 1
    }
    getData(parameters[currSelect])
  });
}

/**
 * 分行 支行选择
 * data-target="#dialog_bank_subbranch"
 * @opts {Object}
 *app.method.addSubbranch({
    target:'',
    type:'1',
    cb:function(val){}
  });
 */
app.method.addSubbranch = function (opts) {
 
  var wrap = $('#dialog_bank_subbranch');
  var wrapStr = '<div id="dialog_bank_subbranch" class="wrap-dialog-list wrap-dialog">' +
    '<div class="header whitebg">' +
    '<span>开户分行</span>' +
    '<a class="back"></a>' +
    '<a class="btn-right">确认</a>' +
    '</div>' +
    '<div class="dialog-wrap-input">' +
    '<input type="text" name="value" placeholder="请输入信息" max-length="30">' +
    '</div>' +
    '<ul class="dialog-list"></ul>' +
    '<div class="dialog-error"></div>'+
  '</div>';

  if (wrap.length > 0) {
    wrap.find('>.header>span').text(wrap.data('type') == '2' ? '开户分行' : '开户支行');
  }
  else {
    wrap = $(wrapStr);
    $(document.body).append(wrap);

    var str = '{{#think_address}}<li><span>{{.}}</span></li>{{/think_address}}';
    var input = wrap.children('.dialog-wrap-input').children('input');
    var ul = wrap.children('.dialog-list');
    var errDiv = wrap.children('.dialog-error');

    wrap
      .children('.header')
      .children('.back')
      .on('click', function () {
        init();
      });
    wrap
      .children('.header')
      .children('.btn-right')
      .on('click', function () {
        var val = wrap.children('.dialog-wrap-input').children('input').val().trim();
        if(val === ''){
          errDiv.text('请输入' + (wrap.data('type') == '2'?'分':'支') + '行信息');
          return false;
        }
        $(wrap.data('target')).val(val);
        wrap.children('.header').children('a').trigger('click');
      });
    ul.on('click', '>li', function () {
      var val = $(this).text();
      $(wrap.data('target')).val(val);
      //opts.cb(val);
      wrap.children('.header').children('a').trigger('click');
    
    });

    function init() {
      ul.html('');
      input.val('');
      errDiv.text('');
    }

    function getData() {
      var val = input.val().trim();
      if (val.length === 0 || !/^[\u4e00-\u9fa5]+$/.test(val)) {
        return false;
      }
      ajax({
        url: BRANCH_BANK_INFO_URL,
        dialog: function (errTxt) {
          ul.html('');
          errDiv.text(errTxt);
        },
        data: {
          type: wrap.data('type') || '1', //默认获取分行信息
          address: val
        },
        cb: function (data) {
          console.log(data);
          errDiv.text('');
          ul.html(Mustache.render(str, data));
        }
      })
    }
    
    input.on('input', _.debounce(getData, 300));
  }

  

  //input.focus();


}


