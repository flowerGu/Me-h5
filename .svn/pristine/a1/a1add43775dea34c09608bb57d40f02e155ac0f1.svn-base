'use strict';

var disabled = false;
var userId = getQueryString('id');
var btnSendEmail = $('#btnSendEmail');
var updateEmailLink = $('#js_modify_email');
var id=getQueryString('id');
ajax({
  url: JD_SAFEAUTH_JSON_URL,
  async:false,
  cb:function (data) {
    if (data.cus_email) {//有邮箱
      $('#emailAddress').text(data.cus_email);
      btnSendEmail.val('确认发送');
      updateEmailLink
          .attr('href', 'set_email.html?email=' + data.cus_email + '&id=' + id)
          .text('修改邮箱');
      setCookie('cus_email', data.cus_email);
      // 是标的   60s可发送一次合同邮件
      countdown({
        dom:btnSendEmail,
        text:'确认发送({{time}}s)',
        retry:'确认发送',
        preDoing:function (data) {
          ajax({
            url: APPLYSIGN_JSON_URL,
            data:{
              id: userId
            },
            cb:function (data) {
              tip_window(data.msg, '确定');
            }
          });
          return true;
        }
      });

    } else {
      btnSendEmail.val('设置电子邮箱');
      btnSendEmail.on('click',function(){
        window.location.href= 'set_email.html?id=' + id;
      })
      // updateEmailLink
      //     .attr('href', 'set_email.html?id=' + getQueryString('id'))
      //     .val('');
    }
  }
});


