/**
 * 资产明细
 */
var tokenid = getCookie("tokenid"),
  user_detail = JSON.parse(window.localStorage.getItem('user_detail')),
  switchChannel = JSON.parse(window.sessionStorage.getItem('threeswitchquery')),
  bank_size = 0,
  ditch = getQueryString('ditch');//渠道

window.onload = function () {
  if (checkLogin() != undefined) {//检查是否登录
    return false;
  }
  switch (ditch) {
    case 'jx':
      getDataJd();//江西
      $('.header>p').text('江西存管');
      $('#jd').addClass('active');
      $('#lookassets').attr('href', 'assets_data.html?jd=1').text('查看江西资金明细');
      break;
    case 'me':
      getDataZh();//Me账户
      $('.header>p').text('Me账户');
      $('#zh').addClass('active');
      $('#lookassets').attr('href', 'assets_data.html?zh=1').text('查看我的资金明细');
      break;
    case 'zj':
      getDataZj();
      $('.header>p').text('中金托管');
      $('#tab-zj').removeClass('hide');
      $('#lookassets').hide();
  }
}
if (!switchChannel.show_business && ditch == 'me') {
  $('#zh').find('a:eq(0)').remove();
  $('#zh').find('a').css({ 'width': '100%' });
}
//判断 交易密码
//江西充值不需要设置交易密码
//中金开户就完成交易密码设置了
if (user_detail.temp5 !== '1') {
  $('#hasTradingPwd').on('click', function () {
    tip_windows_conform('交易密码设置,对不起：您还没有设置交易密码，请前去设置交易密码。', '取消', '交易密码设置', '', 'pre_trading_password.html');
    return false;
  })
}
//中金获取数据
function getDataZj() {
  ajax({
    url: ZJ_ASSETSDETAIL_URL,
    cb: function (data) {
      if (data.code !== '000') {
        tip_window(data.msg, '确定');
        return;
      }
      $('#zjBenifit').text(data.earning);
      $('#zjBalance').text(data.balance);
      delete data.code;
      delete data.msg;
      delete data.version;
      delete data.tokenid;
      window.localStorage.setItem('zj-assets', JSON.stringify(data));
      $('#totalAssetsZj').text((data.balance || 0) + '元');
    },
    err: function (data, status, xhr) {
      tip_window('网络错误，请重试', '确定');
    }
  });
}
//江西，Me账户切换显示
function changePane(channel) {
  if (channel == 1) {//江西高亮
    $('#nav li:eq(0),#jd').addClass('active');
    if (switchChannel.show_account.indexOf('0') > -1) {//中金是否显示
      getDataZj();
      var winHeight = window.screen.height;
      var eleZj = document.getElementById('tab-zj');
      setTimeout(function () {//设置中金内容高度
        eleZj.style.height = (winHeight - eleZj.offsetTop) + 'px';
      }, 300)
      $('#tab-zj').removeClass('hide');
    } else {
      $('#tab-zj').addClass('hide');
    }
    $('#jdBenifit,#jdBalance').removeClass('hide');
    $('#zhBenifit,#zhBalance').addClass('hide');

  } else {//Me账户高亮
    $('#nav li:eq(1),#zh').addClass('active');
    $('#jdBenifit,#jdBalance,#tab-zj').addClass('hide');
    $('#zhBenifit,#zhBalance').removeClass('hide');

  }
}
//金盾
function getDataJd() {
  ajax({
    url: JD_ASSETSDETAIL_JSON_URL,
    cb: function (data) {
      if (data.code !== '000') {
        tip_window(data.msg, '确定');
        return;
      }
      delete data.code;
      delete data.msg;
      delete data.version;
      delete data.tokenid;
      window.localStorage.setItem('jd-assets', JSON.stringify(data));
      $('#jdBenifit').text(data.earning);
      $('#jdBalance').text(data.balance);
    },
    err: function (data) {
      tip_window('网络错误，请重试', '确定');
    }
  });
}
function getDataZh() {//账户
  $.post(PROXYASSETSDETAIL_JSON_URL, {
    version: app_data.version,
    tokenid: tokenid
  }).then(function (data) {
    if (data.code == '000') {
      $('#zhBenifit').text(data.earning);
      $('#zhBalance').text(data.balance);
      delete data.code;
      delete data.msg;
      delete data.version;
      delete data.tokenid;
      window.localStorage.setItem('zh-assets', JSON.stringify(data));
    } else {
      tip_window(data.msg, '确定');
    }
  }, function (data) {
    tip_window('网络错误，请重试', '确定');
  })
}
function canBuy(obj) {
  //充值时调用是否有可购买理财产品
  ajax({
    url: CANBUY,
    async: false,
    cb: function (data) {
      if (obj == 'jxcz') {//江西充值
        if (!data.canBuyBid) {
          tools.dialog({
            title: '提示',
            content: '抱歉，暂无可出借项目，您是否继续充值',
            btn: ['取消', '确定'],
            cb: [undefined, 'chongzhi.html']
          })
          return false;
        } else {
          window.location.href = 'chongzhi.html';
        }
      } else if (obj == 'cz') {//江西充值
        //清除支付页面 充值入口 标识
        if (sessionStorage.getItem('redirect')) {
          sessionStorage.removeItem('redirect')
        }
        if (!data.canBuyProduct) {
          tools.dialog({
            title: '提示',
            content: '抱歉，暂无可出借项目，您是否继续充值',
            btn: ['取消', '确定'],
            cb: [undefined, jumpTarget]
          })
          return false;
        } else {
          jumpTarget()
        }
      }
    }
  })
}

function jumpTarget(ele) {
  var isBandData = JSON.parse(window.localStorage.getItem('isBandData'));
  if (isBandData.plat_trapwd_status == '0') {
    tools.dialog({
      title: '交易密码设置',
      content: '对不起：您还没有设置交易密码，请前去设置交易密码。',
      btn: ['取消', '交易密码设置'],
      cb: ['', 'set_trade_pwd.html']
    })
    return false;
  }

  //Me账户充值提现 判断银行卡张数 跳转
  $.post(BANK_LIST_URL, {
    version: app_data.version,
    tokenid: tokenid,
    cardType: 3,
    current: 1
  }).then(function (data) {
    if (data.code == '000') {
      if (data.bank_size == '0') {
        window.location.href = ele == 'tx' ? 'account_withdraw_first.html' : 'account_chargeAmount.html';
      } else {
        window.location.href = ele == 'tx' ? 'account_withdraw.html' : 'account_charge.html?type=1';
      }
    }
  })

}

//JD_ASSETSDETAIL_JSON_URL 只允许有金盾账号的访问，否则500