/*
  江西大额提现查询支行功能
  单独提取地址选择器
*/
initbodyH();

var addressSelect = function (target, cb) {
  target = target || '#province,#city,#area';
  var wrap = $('#dialogArea');
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
    '</div>';

  if (wrap.length === 0) {
    wrap = $(wrapDiv);
    $(document.body).append(wrap);
  }

  var template = '{{#list}}<li data-parent-id="{{pcCode}}" data-pc-type="{{pcType}}"><span>{{pcName}}</span></li>{{/list}}';


  var list = wrap.find('.dialog-list')
  // 值 存放
  var contentSelect = [];
  $.each((wrap.data('target') || target).split(','), function (index, item) {
    contentSelect[index] = $(item);
  });
  var currSelect;
  var maxLen = contentSelect.length - 1;
  var dialogVal = wrap.find('.area-value').children('span');

  //
  var parameters;

  function init() {
    currSelect = 0;
    parameters = [{ parentId: 0, pcType: 1 }];

    list.html('');

    dialogVal.each(function () {
      $(this).text('');
    });

    getData(parameters[0]);
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
        getData(parameters[0]);
        return;
      }
      currSelect--;
      contentSelect[currSelect].text('');
      dialogVal.eq(currSelect).text('');
      parameters.splice(parameters.length - 1, 1);
      getData(parameters[currSelect]);
    });

  function getData(opts) {
    ajax({
      url: GETPROVINCECITY_JSON_URL,
      cache: true,
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

  list.on('click', '>li', function () {
    var _this = $(this);
    var txt = _this.children('span').text();
    //contentSelect[currSelect].is('input')
    contentSelect[currSelect].val(txt);
    dialogVal.eq(currSelect).text(txt);
    if (currSelect === maxLen) {
      wrap.removeClass('active');
      cb(wrap.find('.area-value').text());

      var source = $('[data-target="#dialogArea"]');
      source.removeClass('active');
      source.find('.arrow-right.active').removeClass('active');
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


addressSelect('.js-province,.js-citiy', function (data) {
  $('.js-bank-address').val(data);
});

$(".js-bank-address").click(function () {
  $("#dialogArea").addClass("active");
})
/*数据准备*/
$("#query_bank_name").val(window.localStorage.getItem("bankName"))
/*重置逻辑*/
$("#reset_btn").click(function () {
  $(".js-province,.js-citiy,#key_word,#bank_address").val('');
})
/*查询逻辑*/
$("#search_submit").click(function () {
  if ($(".js-province").val() == "" || $(".js-citiy").val() == "") {
    tip_window("请选择银行所在地", "确定");
    return;
  }
  ajax({
    url: BANK_CNAPS_URL,
    data: {
      province: $(".js-province").val(),
      city: $(".js-citiy").val(),
      keyword: $("#key_word").val(),
      bankname: window.localStorage.getItem("bankName"),
      count: 20
    },
    cb: function (data) {
      // 显示查询结果
      window.location = location.href + '#query_result';
      if (data.jsonArray.length == 0) {
        $(".query_warn_result").show();
        $(".query_result ul").html('');
      } else {
        var html = '';
        $(".query_warn_result").hide();
        for (var i = 0; i < data.jsonArray.length; i++) {
          html += "<li bankCode = " + data.jsonArray[i].bankCode + ">" + data.jsonArray[i].lname + "</li>"
        }
        $(".query_result ul").html(html);
      }
    }
  })
})
/*code跳转逻辑*/
$(".query_result").on("click", "li", function () {
  if (getQueryString('m')) {
    window.location.href = "JX_tixian.html?num=" + $(this).attr("bankCode") + "&m=" + getQueryString('m');
  } else {
    window.location.href = "JX_tixian.html?num=" + $(this).attr("bankCode");
  }

})
/*手动输入*/
$("#hand_write").click(function () {
  if (getQueryString('m')) {
    window.location.href = "JX_tixian.html?m=" + getQueryString('m');
  }else{
     window.location.href = "JX_tixian.html";
  }
  
}) 