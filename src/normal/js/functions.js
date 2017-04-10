/**
 * 公用方法
 */
var _ = _ || {};
_.now = Date.now || function () {
  return new Date().getTime();
};

var tools = {
  _loading: null,
  validate: {
    tel: function (val) {
      return /\d{3}-\d{8}|\d{4}-\{7,8}$/.test(val);
    },
    bankCard: function (val) {
      return /^\d{16,21}$/.test(val);
    },
    mobile: function (val) {
      return /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/.test(val);
    },
    IDCard: function (val) {
      return /(^\d{18}$|^\d{17}(\d|X|x))$/.test(val);

    },
    email: function (val) {
      return /^[a-z0-9][a-z0-9._-]*@[a-z0-9_-]+(\.[a-z0-9_-]+)+$/i.test(val);
    },
    money: function (val) {
      return /^\d*(\.\d{0,2})$/.test(val);
    },
    name: function (val) {
      return /^[\u4e00-\u9fa5]{2,16}$|(^[\u4e00-\u9fa5]{2,16}·[\u4e00-\u9fa5]{2,16})$/.test(val);
    }
  },
  trimAll: function (val) {
    return val.replace(/\s+/g, "");
  },
  formatStr: function (str, separate, separateChar) {
    separate = separate ? separate : 4;
    separateChar = separateChar !== undefined ? separateChar : ' ';
    var reg = new RegExp('(\\d)(?=(\\d{' + separate + '})+(?!\\d))', 'g');
    return str.replace(reg, '$1' + separateChar);
  },
  loading: function (action) {
    tools._loading === null && (tools._loading = $('.loading'));
    switch (action) {
      case 'open':
      case 1:
        tools._loading.stop().addClass('active');
        break;
      case 'close':
      case 0:
        tools._loading.stop().removeClass('active');
        break;
    }
  },
  dateFormat: function (fmt, date) {
    date = date || new Date()
    var o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "H+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      "S": date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
};
tools.dialog = function (opts) {
  var html = '<div class="dialog active">' +
    '<div class="dialog-title"></div>' +
    '<div class="dialog-wrap-content"><div class="dialog-content"></div></div>' +
    '<div class="dialog-bottom clearfix"></div>' +
    '</div>'
  var $dialog = $(html),
    $bg = $('#backg');
  if ($bg.length === 0) {
    $bg = $('<div id="backg"/>');
    $(document.body).append($bg);
  }
  if (opts.title) {
    $dialog.find('.dialog-title').html(opts.title);
  }
  if (opts.content) {
    $dialog.find('.dialog-content').html(opts.content);
  }
  //按钮区域
  if (opts.btn) {
    if (typeof opts.btn === 'string') {
      opts.btn = [opts.btn];
    }
    if (opts.align) {
      $dialog.find('.dialog-content').addClass('text-center');
    }
    for (var i = 0, len = opts.btn.length; i < len; i++) {
      var btn = $('<input type="button" value=""/>').val(opts.btn[i]);

      btn.on('click', function () {
        $dialog.removeClass('active');
        $bg.css('display', 'none');
      });
      if (opts.cb !== undefined) {
        if ($.isFunction(opts.cb[i])) {
          btn.on('click', opts.cb[i]);
        }
        if (typeof opts.cb[i] === 'string') {
          (function (index) {
            btn.on('click', function () {
              location.href = opts.cb[index];
            });
          })(i);
        }
      }
      $dialog.find('.dialog-bottom').append(btn);
    }
  }
  else {
    $dialog.find('.dialog-bottom').remove();
  }

  $bg.css('display', 'block');
  $(document.body).append($dialog);
  //完成回调
  if ($.isFunction(opts.complate)) {
    opts.complate($dialog);
  }
  return $dialog;
};

tools.restDialog = function (opts) {//带图标的提示性弹框
  var str = '<div class="restDialogWrap">\
              <div class="restDialogBg">\
              </div>\
              <div class="restDialogContainer">\
                <p></p>\
              </div>\
              <img src = "images/close.png"/>\
            </div>';
  var $html = $(str);
  if (opts.img) {
    $html.children('.restDialogContainer').prepend("<img src='" + opts.img + "'>");
  }
  $html.find('p').html(opts.text || '');
  $(document.body).append($html);
  $html.children('img').on('click', function () {
    if (opts.cb) {
      if (typeof opts.cb == 'string') {
        window.location.href = opts.cb;
      } else if (typeof opts.cb == 'function') {
        opts.cb()
      }
    }
    $html.remove();
  })
}
$(function () {
  if ($('.loading').length === 0) {
    $(document.body).append($('<div class="loading"/>'));
  }
});

function reg_success(text, btn_value, main) {
  $(main).append("<div class=\"regi_success\"><div><img src=\"./images/reg_succes.png\"><br><SPAN style=\"color:#ff4c4c\">" + text + "</SPAN><p>快点出借项目吧，<br/>不让资金空闲一分钟</p><input type=\"button\" value=" + btn_value + " onclick=\"close_tab()\" style=\"width: 150px;height: 35px;background-color:#ff4c4c;color:#fff;border:none\" /></div></div><div id=\"zhezhao\"></div>");
  $("#zhezhao").css("display", "block");
  $(".regi_success").css("display", "block");
}

function tip_success(text, btn_value, btn_value2, main, url, url2) {
  $(main).append(
    "<div class=\"reg_success\">" +
    "<div><img src=\"./images/reg_succes.png\" style=\"margin-bottom:10px;\">" +
    "<br><SPAN>" + text + "</SPAN><input type=\"button\" value=" + btn_value + " onclick=\"close_window('" + url + "')\"  style=\"width:100%;margin-top:39px;line-height:29px;\" /></div><div><input type=\"button\" value=" + btn_value2 + " onclick=\"close_window('" + url2 + "')\"  style=\"width: 100%;margin-top:6px;line-height:29px;\" /></div></div><div id=\"zhezhao\"></div>");
  $("#zhezhao").css("display", "block");
  $(".reg_success").css("display", "block");
}
function tip_window(text, btn_value, url) {
  $("body").append('<div class="tip_window"><div><SPAN>' + text + '</SPAN><br/><br/><input type=\"button\" value=' + btn_value + ' onclick=\"close_window(\'' + url + '\')\" class="tip_window_close" /></div></div><div id=\"backg\"></div>');
  $("#backg").css("display", "block");
  $(".tip_window").css("display", "block");
}
function tip_error(code) {
  var tokenid = getCookie("tokenid");
  if (tokenid == null) {
    tip_windows('您还未登录！', '登录', '取消', 'index.html');
    return false;
  }
  if (code == '001') {
    tip_windows('登录已过期！', '登录', '取消', 'index.html');
    return false;
  }
  if (code == '999') {
    tip_window('操作失败！', '确定');
    return false;
  }
  if (code == 'PY003') {
    tip_window('没有绑卡', '取消');
    return false;
  }
  if (code == 'PY002') {
    tip_window('没有实名', '取消');
    return false;
  }

}
function userdirect() {//没有绑卡和没有设置交易密码时跳转

  var isBandData = JSON.parse(localStorage.getItem("isBandData"));
  if (isBandData.is_realname != '1') {
    tip_windows_conform('没有实名认证', '去实名', '取消', 'my_setting.html');
    return false;
  }
  if (isBandData.is_binding != '1') {
    tip_windows_conform('没有绑卡', '去绑卡', '取消', 'my_setting.html');
    return false;
  }
  if (isBandData.accredit_bid_status != '1') {//中金
    tip_windows_conform('没有授权', '去授权', '取消', 'my_setting.html');
    return false;
  }
  // if(isBandData.trade_pwd_status != '1'){
  //     tip_windows_conform('没有设置交易密码','去设置','取消','set_trade_pwd.html');
  //     return false;
  // }
  return true;
}
function close_window(url) {
  $("#backg").css("display", "none");
  $(".tip_window").css("display", "none");
  if (typeof url === 'string' && url.length > 0 && url !== 'undefined') {
    self.location = url;
  }
  //  if(document.getElementById("password"))
  //  document.getElementById("password").elements[0].focus();
}
function close_buy() {
  $("#backg").css("display", "none");
  $(".tip_window").css("display", "none");
  return false;
}
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

function tip_windows(text, btn1_value, btn2_value, url) {
  $("body").append("<div class=\"tip_window\"><div><span>" + text + "</SPAN><br/><br/><input type=\"button\" value=" + btn1_value + " onclick=\"location.href=\'login.html\'\"  style=\"width: 70px;height: 35px;margin-right:20px\" /><input type=\"button\" value=" + btn2_value + " onclick=\"close_window('" + url + "')\" style=\"width: 70px;height: 35px;\" /></div></div><div id=\"backg\"></div>");
  $("#backg").css("display", "block");
  $(".tip_window").css("display", "block");
}

function tip_windows_conform(text, btn1_value, btn2_value, conform_url, cansel_url, conform_callback, cansel_callback) {
  conform_callback = conform_callback || '';
  cansel_callback = cansel_callback || '';
  $("body").append('<div class=\"tip_window\"><div><span>' + text + '</span><br/><br/><input type=\"button\" class="tip_window_first_btn" value=' + btn1_value + " onclick=\"close_window('" + conform_url + "');" + conform_callback + "\"/><input type=\"button\" value=" + btn2_value + " onclick=\"close_window('" + cansel_url + "');" + cansel_callback + "\"/></div></div><div id=\"backg\"></div>");
  $("#backg").css("display", "block");
  $(".tip_window").css("display", "block");
}

function tip_risk_refer(text_title, text, btn1_value, btn2_value, conform) {
  $("body").append("<div class=\"tip_window\" style=\"width:62%;\"><div style=\"padding-top:10px\"><SPAN class=\"text_title\">" + text_title + "</SPAN><SPAN>" + text + "</SPAN><br/><input type=\"button\"class=\"risk_sbt\" value=" + btn2_value + " onclick=\"close_tip()\" style=\"height: 35px;margin-right:5px\" /><input type=\"button\"class=\"risk_sbt\" value=" + btn1_value + " onclick=\'" + conform + ";close_tip()\' style=\"height: 35px;\" /></div></div><div id=\"backg\"></div>");
  $("#backg").css("display", "block");
  $(".tip_window").css("display", "block");
}
function close_tip() {
  $("#backg").css("display", "none");
  $(".tip_window").css("display", "none");
}
function tip_tuichu(text, btn1_value, btn2_value, url) {
  $("body").append("<div class=\"tip_window\"><div><SPAN>" + text + "</SPAN><br/><br/><input type=\"button\" value=" + btn1_value + " onclick=\"loginOut()\"  style=\"width: 70px;height: 35px;margin-right:20px;\" /><input type=\"button\" value=" + btn2_value + " onclick=\"close_window('" + url + "')\" style=\"width: 70px;height: 35px;\" /></div></div><div id=\"backg\"></div>");
  $("#backg").css("display", "block");
  $(".tip_window").css("display", "block");
}
function setCookie(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
  if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
}
function getCookie(sKey) {
 return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}
function deleteCookie(name, path, domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT"
  }
}
function fixDate(date) {
  var base = new Date(0)
  var skew = base.getTime()
  if (skew > 0)
    date.setTime(date.getTime() - skew)
}
function clearCookie() {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  }
}

// 提交并跳转
function submit_redirect(url, data, type) {
  type = type === undefined ? 'post' : 'get';
  var from = document.createElement("form");
  from.action = url;
  from.method = 'post';
  from.style.display = 'none';
  if (type === 'get') {
    //$.param(data) 会报错
    url += '?';
    for (var x in data) {
      url += x + '=' + data[x] + '&';
    }

    from.action = url;
  }
  else {
    for (var x in data) {
      var opt = document.createElement("input");
      opt.name = x;
      opt.value = data[x];
      // alert(opt.name)
      from.appendChild(opt);
    }
  }
  document.body.appendChild(from);
  from.submit();
  return from;
}

function post_yb(URL, PARAMS) {
  var temp = document.createElement("form");
  temp.action = URL;
  temp.method = "post";
  temp.style.display = "none";
  for (var x in PARAMS) {
    var opt = document.createElement("textarea");
    opt.name = x;
    opt.value = PARAMS[x];
    // alert(opt.name)
    temp.appendChild(opt);
  }
  document.body.appendChild(temp);
  temp.submit();
  return temp;
}
function test_tokenid() {
  var tokenid = getCookie("tokenid");
  if (tokenid == null || tokenid == 'undefined') {
    tip_windows('您还未登录！', '登录', '取消', 'index.html');
    return false;
  }
  return true;
}
//授权
function shouquan() {
  var version = '1.0';
  var tokenid = getCookie("tokenid");
  $.ajax({
    url: AUTHORIZEAUTOTRANSFER_JSON_URL,
    type: 'post',
    data: {
      version: app_data.version,
      tokenid: tokenid
    },
    dataType: 'json',
    success: function (data) {
      // console.log(data);return false;
      if (data.code == '000') {
        post_yb(data.url, { req: data.req, sign: data.sign });
      } else if (data.code == 'PY002') {
        tip_window('未实名认证！', '去认证', 'idVerifi.html');
      }
    },
    error: function (data) {
      tip_window(data.msg, '确定');
    }
  });

  function getToken() {
    var tokenid = getCookie("tokenid");
    return tokenid;
  }


}
function pad(num, n) {
  return Array(n > num ? (n - ('' + num).length + 1) : 0).join(0) + num;
}
function judge_decimal(obj) {
  var invitate = $(obj).val();
  var tre = /^([1-9][\d]{0,13}|0)((\.[\d]{1,2})|(\.{1}))?$/;
  var max_len = Math.min(invitate.indexOf(".") + 3, invitate.length);
  if (invitate.indexOf(".") === -1) {
    max_len = Math.max(invitate.length - 1, 0);
  }
  else {
    max_len = Math.min(invitate.indexOf(".") + 3, invitate.length);
  }
  if (!tre.test(invitate)) {
    $(obj).val(invitate.substring(0, max_len));
  }
  //2个小数点
  if (invitate.indexOf(".", invitate.indexOf(".") + 1) > 0) {
    $(obj).val(invitate.substring(0, invitate.indexOf(".")));
  }
  var top10_inv = invitate.substring(0, Math.min(invitate.length, 9));
  // if(!invitate.substring(0,invitate.indexOf(".")) || invitate.length>9 || invitate>0){
  //  invitate=invitate.substring(0,9);
  //  $('#input_invitation').val(invitate);
  // }

  var inv_len = $(obj).val().length;
  if (inv_len <= 10) {
    var isdecimai = invitate.indexOf(".");
    if (invitate == '' || parseFloat(invitate) <= 0) {
      $(obj).val('');
    }
    // else if (isdecimai >= 0&&(invitate.length-isdecimai>1)) {
    //     $(obj).val(invitate.substring(0,max_len));
    // }
  }
  else {

    var isdecima2 = invitate.indexOf(".");
    if (isdecima2 == 10) {
      $(obj).val(invitate.substring(0, isdecima2));
    }
    else {
      $(obj).val(invitate.substring(0, 10));
    }
  }
}
//验证省份证输入框

//验证邮箱
function isEmail(str) {
  var reg = /^[a-z0-9][a-z0-9._-]*@[a-z0-9_-]+(\.[a-z0-9_-]+)+$/i;
  return reg.test(str);
}
function getLastDay(year, month) {//获取最后一天
  var day = new Date(year, month, 0);
  lastday = day.getDate();
  return lastday;
}
//获取URL参数，设置菜单选中
function GetRequest() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
    }
  }
  return theRequest;
  //var index = GetRequest().index;
  //alert(index);
}

function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

/**
 * 校验登录
 * todo 优化，这是原始的代码
 */
function checkLogin() {
  var tokenid = getCookie('tokenid');
  var startTime;
  var endTime;
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var today = date.getDate();
  if (tokenid == null) {
    tip_windows('您还未登录！', '登录', '取消', 'index.html');
    return false;
  }
  if (month < 10) {
    month = '0' + month;
  }
  var now_month = year + '-' + month;
  if (today < 10) {
    today = '0' + today;
  }
  if ((date.getMonth() + 1) == 1) {
    last_month = 12;
    year = year - 1;
  } else {
    last_month = '0' + (month - 1);
  }
  var last_month = year + '-' + last_month;
  $('#search_date').append("<option id='now_month'>" + now_month + "</option><option id='last_month'>" + last_month + "</option><option>全部</option>");
}

function initH(dom, target, minH, cb) {
  var timer, h;
  target = target === undefined ? window : target;
  timer = window.setInterval(function () {
    h = $(target).height();
    if (h > 200) {
      if (typeof cb === 'function') {
        cb($(dom), h);
      }
      else {
        if (h < minH) {
          h = minH;
        }
        if (minH) {
          if (minH < h) {
            minH = h;
          }
          $(dom).css('min-height', minH);
        }
        $(dom).height(h);
      }


      window.clearInterval(timer);
    }
  }, 50);
}

//设置body高度
var initbodyH = function (minH, dom) {
  initH(document.body, window, minH)
};
//返回上一页
function goBack() {
  history.back(-1);
}
//倒计时
function countdown(opts) {
  var $dom = typeof opts.dom === 'string' ? $(opts.dom) : opts.dom,
    text = opts.text || '重新发送({{time}})',
    retry = opts.retryTxt || '重新发送',
    preDoing = opts.preDoing,
    time;

  $dom.off('click.yyj').on('click.yyj', function () {
    if (!$dom.data('yue-timeout')) {
      if ($.isFunction(preDoing)) {
        if (preDoing() === false) {
          return false;
        }
      }
      time = opts.time || 60;
      $dom.addClass('disable');
      $dom.attr('disabled', 'disabled');
      $dom.val(text.replace(/\{\{time}}/ig, time.toString()));
      time = opts.time || 60;
      var timer = setInterval(function () {
        time--;
        if (time > 0) {
          $dom.val(text.replace(/\{\{time}}/ig, time.toString()));
        }
        else {
          window.clearInterval(timer);
          $dom.data('yue-timeout', false);
          $dom.val(retry);
          $dom.removeClass('disable');
          $dom.removeAttr('disabled');
          if ($.isFunction(opts.cb)) {
            opts.cb();
          }
        }
      }, 1000);
      $dom.data('yue-timeout', timer);
    }
  });

  $('#closeDialog').off('click.yyj').on('click.yyj', function () {
    window.clearInterval($dom.data('yue-timeout'));
    $dom.data('yue-timeout', false);
    $dom.val(retry);
    $('#code-input').val('');
    $dom.removeClass('disable');
    $dom.removeAttr('disabled');
    if ($.isFunction(opts.cancel)) {
      opts.cancel();
    }
  });

  // return null;
}
//form 转json
function form2json(form) {
  var obj = {};
  form = typeof form === 'string' ? $(form) : form;
  form = form.serializeArray();

  for (var i = 0, len = form.length; i < len; i++) {
    obj[form[i].name] = form[i].value;
  }
  return obj;
}

function toTemplate(tem) {
  var rtntem = document.getElementById(tem).innerHTML;
  return rtntem;
}

/**
 * 交易密码要调回上一页
 */
function goTradingPwd() {
  var currPage = location.href;
  location.href = 'pre_trading_password.html?callbackUrl=' + currPage;
}

/**
 * 去除头部，如果不是微信的话（APP调用）
 */
function removeHead() {
  if (!isWeiXin()) {
    $('.header').remove();
  }
}

/**
 * 删除所有信息，本地存储和cookie
 */
function dellAllUserInfo() {
  var messageid = localStorage.getItem('messageid');
  var fengxiantishi = localStorage.getItem('fengxiantishi');
  var sessionfengxiantishi = window.sessionStorage.getItem('fengxiantishi');
  var firstJD = window.localStorage.getItem('app-first-data');//第一次点击我的资产提示 开户江西存管
  window.localStorage.clear();
  var cookies = document.cookie.split("; ");
  if (messageid !== '') {
    localStorage.setItem("messageid", messageid);
  }
  if (sessionfengxiantishi) {
    window.sessionStorage.setItem('fengxiantishi', sessionfengxiantishi);
  }
  if (fengxiantishi) {
    window.localStorage.setItem("fengxiantishi", fengxiantishi);
  }
  if (firstJD === '1') {
    window.localStorage.setItem("app-first-data", "1");
  }
  for (var i = cookies.length - 1; i > -1; i--) {
    deleteCookie(cookies[i].split("=")[0]);
  }
}

/**
 * 金盾，江西 校验开户
 */
function checkOpenAccount(alert, limit) {
  var userData = JSON.parse(localStorage.getItem("user_detail"));
  limit = limit !== undefined ? limit : 5;

  if (userData === null) {
    return -1;
  }
  if (!userData.realname_status) { //没实名
    if (alert) {
      tip_window('您还没有实名认证。', '去实名', 'idVerifi.html');
    }
    return 0;
  }
  if (!userData.temp4) { //没开户
    if (alert && limit <= 1) {
      tip_window('您还没有开通银行存管，请开通存管账户。', '去开户', 'openAnAccount.html');
    }
    return 1;
  }
  if (!userData.temp8) { //绑卡
    if (alert && limit <= 2) {
      tip_window('您还没有绑定银行卡，请绑定银行卡。', '去绑卡', 'addNewCard.html');
    }
    return 2;
  }
  if (!userData.temp5) { //没有交易密码
    if (alert && limit <= 3) {
      tip_windows_conform('对不起，您还未设置交易密码，请先设置。', '去设置', '取消', '', '', 'window.goTradingPwd()');
    }
    return 3;
  }
  if (!userData.temp7) { //自动签约
    if (alert && limit <= 4) {
      tip_window('您还没有签约授权，请绑定银行卡。', '去授权', 'jd_authorization.html');
    }
    return 4;
  }
  return 5;
}

// 全局通用ajax
var tokenid = getCookie("tokenid");
var global_ajax_counter = 0;

/**
 * 封装的ajax
 * err:error callback
 * cb:success callback
 * dialog  999的时候不弹框，执行par.dialog()
 */
function ajax(par) {
  setTimeout(function () {
    tools.loading('open');
  }, 0);
  var cb = par.cb || function () {
  };
  var err = par.err || function () {
  };
  var opts = {
    async: true,
    global: false,//禁用全局的 loading
    type: 'post',
    data: {},
    beforeSend: function () {
      global_ajax_counter++;
    },
    error: function (xhr, error) {
      err(arguments);
      var errTxt;
      if (error === 'timeout') {
        errTxt = '服务器链接超时，请重试';
      }
      else {
        errTxt = '网络错误，请重试';
      }
      $.isFunction(par.dialog) ? par.dialog(errTxt) : tip_window(errTxt, '确定');
    },
    success: function (data) {
      if (data.code === '001') {
        tip_windows_conform('未登录', '登录', '取消', 'login.html?redirect=' + location.href, 'index.html');
        return false;
      }
      else if (data.code !== '000') {
        $.isFunction(par.dialog) ? par.dialog(data.msg, data.code) : tip_window(data.msg, '确定');
        return false;
      }
      cb(data);
    },
    complete: function () {
      global_ajax_counter--;
      if (global_ajax_counter === 0) {
        setTimeout(function () {
          tools.loading(0);
        }, 100);
      }
    }
  };
  $.extend(opts, par);
  opts.data.tokenid = tokenid;
  opts.data.version = app_data.version;
  // opts.data.client_type = app_data.type;
  opts.data.channel = app_data.type;
  $.ajax(opts);
}

//不是微信，去除头部
if (!isWeiXin()) {
  $(function () {
    $(document.body).addClass('app');
  });
}
if (window.jQuery) {
  $(document).ajaxSend(function () {
    tools.startTime = +new Date();
    tools.loading(1);
  });

  $(document).ajaxComplete(function () {
    var now = +new Date();
    if (now - tools.startTime < 500) {
      setTimeout(function () {
        tools.loading(0);
      }, 500);
    }
    else {
      tools.loading(0);
    }
  });
}

//百度统计
var _hmt = _hmt || [];
if (location.host.indexOf('me.mejinrong.com') === 0) {
  (function () {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?e923b002aba4a0bd4854fcbb95ca3880";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
}

_.throttle = function (func, wait, options) {//短时间内点击只执行第一次
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function () {
    previous = options.leading === false ? 0 : _.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    var now = _.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};
_.debounce = function (func, wait, immediate) {//短时间内点击只执行最后一次
  var timeout, args, context, timestamp, result;

  var later = function () {
    var last = _.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    context = this;
    args = arguments;
    timestamp = _.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};
function investDetail() {//风险测评个人信息提取成  公共方法
  var opts = {
    tokenid: getQueryString('tokenid'),
    quesType: getQueryString('quesType') ? getQueryString('quesType') : 0,
    channel: getQueryString('channel')//1:产品,2:标的,3:我的资产，4:个人设置,5:APP
  }
  $.post(JD_SAFEAUTH_JSON_URL, {
    version: app_data.version,
    tokenid: opts.tokenid
  }).then(function (data) {
    if (data.code == '000') {
      $('#phoneNumber').text(data.phone_number);
      if (data.is_realname == '1') {//实名
        $('#name').text(data.name);
        $('#id_number').text(data.id_number);
        $('#idType').text('身份证');
      } else {//未实名
        $('#name').text('_');
        $('#id_number').text('_');
        $('#idType').text('_');
      }
    }
  })
  return opts;
}
function isRate(myWealth) {//渠道风险测评弹框
  var a = true,
    bidObj = {},
    tokenid = getCookie('tokenid');
  //渠道风险测评弹框
  $.ajax({
    url: JD_SAFEAUTH_JSON_URL,
    type: 'post',
    data: {
      version: app_data.version,
      tokenid: tokenid
    },
    async: false,
    success: function (data) {
      if (data.code == '000') {
        if (data.is_ratechart != '1') {
          tools.dialog({
            content: 'Me金融风险评测问卷',
            btn: ['取消', '去评测'],
            align: true,
            cb: [myWealth == 3 ? setItem : '', 'risk_level.html?tokenid=' + tokenid + '&channel=' + myWealth]
          })
          a = false;
        }
        if (myWealth == 2) {//标的购买
          bidObj.isRated = a;
          bidObj.rate = data.rate;
          bidObj.popup_rec = data.popup_rec;
          bidObj.is_debtSell = data.is_debtSell;//债权
        }
      }
    },
    error: function (data) {
      tip_window('网络超时', '确定');
    }
  })
  return myWealth == 2 ? bidObj : a;

}
function setItem() {
  window.localStorage.setItem('isMyWeathPop', '1')
}

/**
 * 三项开关请求
 * @param {boolean} enforce 强制获取数据
 */
var switch_channel = {
  setItem: function (data) {
    var threeswitchquery = JSON.parse(window.sessionStorage.getItem('threeswitchquery'));
    if(threeswitchquery && threeswitchquery.time){
        data.time = threeswitchquery.time;
    }else{
       data.time = new Date().getTime();
    }
    if (data && typeof data === 'object') {
     var date = new Date().getTime();
      var threeswitchquery = JSON.parse(window.sessionStorage.getItem('threeswitchquery'));
      if((date - data.time) < 300001){
        window.sessionStorage.setItem('threeswitchquery', JSON.stringify(data))
      }else{
        data.time = date;
        switch_channel.getItem();
      }
    }
    
  },
  getItem: function (enforce) {
    var _data;
    var data = JSON.parse(window.sessionStorage.getItem('threeswitchquery'));
    if (!enforce && data != null && (new Date().getTime() - data.time) < 300001) {//5分钟
      _data = data;
    }
    else {
      ajax({
        url: THREE_SWITCH_QUERY_URL,
        async: false,
        err: function () {
          _data = {
            show_business: false,
            show_transfers: false,// 显示债权转让
            show_account: '1',//0中金 1江西 2me账户
            show_vip: false,
          }
        },
        cb: function (data) {
          var objs = {
            show_business: data.show_business == 1,
            show_transfers: data.show_transferSwitch == 1,
            show_account: data.show_account,//0中金 1江西 2me账户
            show_vip: data.show_vip == 2,//权利人： 1否，2是 
            time: new Date().getTime()
          };
          window.sessionStorage.setItem('threeswitchquery', JSON.stringify(objs))
          localStorage.setItem('respect_enjoy',data.respect_enjoy ==1);
          _data = objs;
        }
      });
    }
    if (typeof _data.show_account === 'string' && _data.show_account.indexOf('2') > -1) {
      $(document.body).addClass('switch-me-account');
    }
    if (_data.show_business) {
      $(document.body).addClass('switch-me-business');
    }
    return _data;
  }
};

// 底部菜单
function custFn(hl) {
  var custtype = JSON.parse(localStorage.getItem("custtype")),
    custObj = {
      tokenid: getCookie('tokenid'),
      custParams: ['1', '2', '3', '4', '7']//客户类型
    },
    html = $('<div class="page-nav"><a href="index.html" class="f_list"><i>X</i> <span>首页</span></a> <a href="me.html" class="f_san"><i>W</i> <span>Me</span></a> <a href="myWealth.html" class="f_me"><i>Z</i> <span>我的</span></a> <a href="more.html" class="f_more"><i>m</i> <span>更多</span></a></div>'),
    respect_enjoy = JSON.parse(localStorage.getItem('respect_enjoy'));//民信尊享开关
  if (custObj.tokenid != null && custObj.custParams.indexOf(custtype) > -1 && respect_enjoy) {
    html.find('.f_san').after('<a class="f_manager" href="wealth_manager.html"><i>Y</i>民信</a>');
    $('body').append(html);
  } else {
    $('body').append(html);
  }
  switch (hl) {
    case 1://首页
      $('.page-nav>.f_list').css({ 'color': '#ff4c4c' });
      break;
    case 2://标的
      $('.page-nav>.f_san').css({ 'color': '#ff4c4c' });
      break;
    case 3://民信
      $('.page-nav>.f_manager').css({ 'color': '#ff4c4c' });
      break;
    case 4://我的
      $('.page-nav>.f_me').css({ 'color': '#ff4c4c' });
      break;
    case 5://更多
      $('.page-nav>.f_more').css({ 'color': '#ff4c4c' });
      break;
  }

}

// 全局无数据
function addNoData(dom) {
  dom = dom || $(document.body);
  dom.append('<img src="images/no-data.png" class="global-no-data">');
}

// Polyfill
if (!String.prototype.repeat) {
  String.prototype.repeat = function (count) {
    'use strict';
    if (this == null) {
      throw new TypeError('can\'t convert ' + this + ' to object');
    }
    var str = '' + this;
    count = +count;
    if (count != count) {
      count = 0;
    }
    if (count < 0) {
      throw new RangeError('repeat count must be non-negative');
    }
    if (count == Infinity) {
      throw new RangeError('repeat count must be less than infinity');
    }
    count = Math.floor(count);
    if (str.length == 0 || count == 0) {
      return '';
    }
    // 确保 count 是一个 31 位的整数。这样我们就可以使用如下优化的算法。
    // 当前（2014年8月），绝大多数浏览器都不能支持 1 << 28 长的字符串，所以：
    if (str.length * count >= 1 << 28) {
      throw new RangeError('repeat count must not overflow maximum string size');
    }
    var rpt = '';
    for (; ;) {
      if ((count & 1) == 1) {
        rpt += str;
      }
      count >>>= 1;
      if (count == 0) {
        break;
      }
      str += str;
    }
    return rpt;
  }
}
// 格式化银行卡号
function formatCard(dom, val) {
  var v = val.replace(/\s*/g, "");
  if (v.length > 21) { return }
  var dom = (typeof dom == "string") ? $(dom) : dom;
  $(dom).val(v.replace(/(\d{4})(?=\d)/g, "$1" + " "));
}
// 去空格
function removeSpace(str) {
  return str.replace(/\s/g, "")
}

// 江西债转授权
function jd_transfer() {
  ajax({
    url: DEBT_ARGEEMENT_TRANSFER_URL,
    data: {
      MeretUrl: location.href,//返回交易页面链接
      successResult_url: location.href //协议签约后成功后跳转url
    },
    cb: function (data) {
      var url = data.target_url;
      delete data.version;
      delete data.tokenid;
      delete data.code;
      delete data.msg;
      delete data.target_url;
      delete data.totalNum;
      delete data.preNo;
      delete data.nextNo;
      delete data.num;

      data.SUCCESSRESULT_URL = decodeURIComponent(data.SUCCESSRESULT_URL);
      data.notifyUrl = decodeURIComponent(data.notifyUrl);
      data.retUrl = decodeURIComponent(data.retUrl);
      submit_redirect(url, data, 'get');
    }
  })
}
