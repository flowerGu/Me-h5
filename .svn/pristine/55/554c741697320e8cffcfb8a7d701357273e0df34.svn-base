/**
 *
 */

$(document)
  .on('click.change.title', '[data-toggle="tab"]', function () {
    document.title = $(this).text();
  });

var dropDownPageOpts = [//江西
  { // jd
    first: true,
    page: 1,
    enable: true,
    timer: null
  }, {// Me
    first: true,
    page: 1,
    enable: true,
    timer: null
  }, {// 债转
    first: true,
    page: 1,
    enable: true,
    timer: null
  }
];

// 处理数据供mustache判断
function processData(list) {
  //江西金盾产品状态
  var products_type = ['承接', '出借', '已满标', '回款中', '已结束'];
  for (var i = list.length - 1; i > -1; i--) {
    list[i].progress = ((list[i].totalMoney - list[i].surplusInvestMoney) / list[i].totalMoney) * 100;
    list[i].status1 = list[i].status == 1 ? true : false;
    list[i].status2 = list[i].status == 2 ? true : false;
    if (list[i].statusNew) {
      list[i].enabled = list[i].statusNew == '1';
      if (list[i].loan_type === '转让' && list[i].borrowNum) {
        list[i].loan_purpose_cd += list[i].borrowNum.substr(0, 4) + '...';
        list[i].statusNew = list[i].statusNew == 1 ? '承接' : list[i].statusNew == '2' ? '已满标' : '转让完成';
      }
      else {
        list[i].statusNew = products_type[parseInt(list[i].statusNew, 10)];
      }
      if (list[i].loan_type) {//债转 标的保留两位小数
        list[i].surplusInvestMoney = parseFloat(list[i].surplusInvestMoney).toFixed(2)
        list[i].totalMoney = parseFloat(list[i].totalMoney).toFixed(2)
      }
    }
  }
}

// 获取江西数据
function getJxData() {
  ajax({
    url: BIDS_JSON_URL,
    data: {
      current: dropDownPageOpts[0].page
    },
    cb: function (data) {
      if (data.list == null || data.list.length === 0) {
        dropDownPageOpts[0].enable = false;
        if (dropDownPageOpts[0].first) {
          $('#jx_list').html($('#nodata_tpl').html());
        }
        return;
      }
      dropDownPageOpts[0].page++;
      processData(data.list);
      //
      $('#jx_list').append(Mustache.render($('#jx_list_tpl').html(), data));
      dropDownPageOpts[0].first = false;
    }
  })
}

// 获取Me账户数据
function getMeData() {
  ajax({
    url: PRODUCTS_JSON_URL,
    data: {
      current: dropDownPageOpts[1].page
    },
    cb: function (data) {
      dropDownPageOpts[1].page++;
      if (dropDownPageOpts[1].first && data.list.length == 0) {//第一页无数据
        $('#prod_list').html($('#nodata_tpl').html());
        dropDownPageOpts[1].enable = false;
        return;
      }
      if (data.list.length > 0 && data.hasnextpage == 'false') {//下一页无数据
        dropDownPageOpts[1].enable = false;
      }
      processData(data.list);
      $('#prod_list').append(Mustache.render($('#prod_list_tpl').html(), data));
      dropDownPageOpts[1].first = false;
    }
  });
}

// 获取债转数据
function getTransferData() {
  ajax({
    url: BIDS_TRANSFER_URL,
    data: {
      current: dropDownPageOpts[2].page
    },
    cb: function (data) {
      dropDownPageOpts[2].page++;
      if (!data.list instanceof Array || data.list.length === 0) {
        dropDownPageOpts[2].enable = false;
        if (dropDownPageOpts[2].first) {
          $('#transfer_list').html($('#nodata_tpl').html());
        }
        return;
      }
      processData(data.list);
      $('#transfer_list').append(Mustache.render($('#transfer_list_tpl').html(), data));
      dropDownPageOpts[2].first = false;
    }
  })
}

/**获取VIP数据*/
function getVipData() {
  ajax({
    url: VIP_BIDS,
    data: {
      current: dropDownPageOpts[2].page
    },
    cb: function (data) {
      dropDownPageOpts[2].page++;
      if (!data.list instanceof Array || data.list.length === 0) {
        dropDownPageOpts[2].enable = false;
        if (dropDownPageOpts[2].first) {
          $('#vip_list').html($('#nodata_tpl').html());
        }
        return;
      }
      processData(data.list);
      $('#vip_list').append(Mustache.render($('#vip_list_tpl').html(), data));
      dropDownPageOpts[2].first = false;
    }
  })
}

(function () {

  //默认显示类型
  var type = getQueryString('type'),
      showItem = 0,
      tokenid = getCookie('tokenid');
  //menu
  custFn(2);
  getJxData();
  tokenid && getTransferData();
  var switchs = switch_channel.getItem();
  var showTag = $.extend(true,showTag,switchs);
  delete showTag.show_account;
  delete showTag.time;
  delete showTag.respect_enjoy;
  for(var i in showTag){
    if(showTag[i]==true){
      showItem+=1;
    }
  }
  (function(){
    if(showItem>0 && tokenid){
      $('body').addClass('has-tab');
      $('.nav-tabs').css('display','flex');
    }
  })()
  
  if (!switchs.show_transfers && !switchs.show_business && !switchs.show_vip) {//只有标的
    // $('.nav-tabs').hide()
    // $('body').removeClass('has-tab');
  }
  if (!switchs.show_transfers && switchs.show_business) {//标的，me
    $('.nav-tabs').children('li').eq(1).remove()
  }
  if (!switchs.show_vip) {//显示权利人
    $('.nav-tabs').find('.switch-vip-list').remove();
  } else if(tokenid){
    getVipData();
    var vipDropload = $('#prod_list').dropload({
      scrollArea: window,
      loadDownFn: function (me) {
        if (dropDownPageOpts[1].timer !== null) {
          window.clearTimeout(dropDownPageOpts[1].timer);
          dropDownPageOpts[1].timer = null;
        }
        dropDownPageOpts[1].timer = setTimeout(function () {
          dropDownPageOpts[1].timer = null;
          if (dropDownPageOpts[1].enable && tokenid) {
            getMeData();
          }
          me.resetload();
        }, 1000);
      },
    });
    vipDropload.unlock();
  }

  // 显示账户
  if (switchs.show_business && tokenid) {
    if (type !== null && type === 'me') {
      $('.nav-tabs').children('li.switch-me-business').children('a').tab('show');
    }
    getMeData();
    $('header>span').text('出借列表');
    $('#prod_list').on('click', '>a', function () {
      setCookie('highest', $(this).data('investment'));
      window.location.href = "pro_invest.html?id=" + $(this).data('id') + "&status=" + $(this).data('status') + '&product-type=' + $(this).data('productType');
      return false;
    });

    var meDropload = $('#prod_list').dropload({
      scrollArea: window,
      loadDownFn: function (me) {
        if (dropDownPageOpts[1].timer !== null) {
          window.clearTimeout(dropDownPageOpts[1].timer);
          dropDownPageOpts[1].timer = null;
        }
        dropDownPageOpts[1].timer = setTimeout(function () {
          dropDownPageOpts[1].timer = null;
          if (dropDownPageOpts[1].enable && getMeData) {
            getMeData();
          }
          me.resetload();
        }, 1000);
      },
    });
    meDropload.unlock();
  }




  // 债转
  if (type !== null && type === 'transfer') {
    if (switchs.show_transfers && tokenid) {
      $('.nav-tabs').children('li').eq(1).children('a').tab('show');
    }
  }
  var transferDropload = $('#transfer_list').dropload({
    scrollArea: window,
    loadDownFn: function (me) {
      if (dropDownPageOpts[0].timer !== null) {
        window.clearTimeout(dropDownPageOpts[0].timer);
        dropDownPageOpts[0].timer = null;
      }
      dropDownPageOpts[0].timer = setTimeout(function () {
        dropDownPageOpts[0].timer = null;
        if (dropDownPageOpts[0].enable && tokenid) {
          getTransferData();
        }
        me.resetload();
      }, 1000);
    },
  });
  transferDropload.unlock();
  // }

  var dropload = $('#jx_list').dropload({
    scrollArea: window,
    loadDownFn: function (me) {
      if (dropDownPageOpts[0].timer !== null) {
        window.clearTimeout(dropDownPageOpts[0].timer);
        dropDownPageOpts[0].timer = null;
      }
      dropDownPageOpts[0].timer = setTimeout(function () {
        dropDownPageOpts[0].timer = null;
        if (dropDownPageOpts[0].enable) {
          getJxData();
        }
        me.resetload();
      }, 1000);
    },
  });
  dropload.unlock();
})();
